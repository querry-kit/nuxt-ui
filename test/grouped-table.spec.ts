import type { GroupBranch, GroupNode } from '@querry-kit/nuxt';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { computed, reactive, ref } from 'vue';
import QTableGrouped from '../src/runtime/components/table/grouped/index.vue';
import type { GroupedTableState } from '../src/runtime/types/grouped-table';

const scroll = vi.hoisted(() => ({ load: undefined as (() => Promise<void>) | undefined }));

vi.mock('@vueuse/core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vueuse/core')>()),
  useInfiniteScroll: (_element: unknown, load: () => Promise<void>, options: { canLoadMore: () => boolean }) => {
    scroll.load = async () => {
      if (options.canLoadMore()) await load();
    };
  },
  useIntersectionObserver: (
    _element: unknown,
    update: (entries: Array<{ isIntersecting: boolean }>) => void,
    options: { root: () => HTMLElement | null },
  ) => {
    options.root();
    update([{ isIntersecting: true }]);
  },
}));

type Item = { id: string; status: string; priority: string; title: string };
const item = { id: '01', status: 'open', priority: 'high', title: 'First task' };

function branch(): GroupBranch<Item> {
  return { items: [], children: [], hasMore: false, loading: false, error: undefined };
}

const stubs = {
  UTable: {
    props: ['data', 'columns', 'getRowId', 'meta', 'sorting'],
    emits: ['update:sorting'],
    methods: {
      sortState(index: number) {
        return ['asc', 'desc', false][index % 3];
      },
    },
    template: `
      <table>
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="column.id">
              <slot :name="column.id + '-header'" :column="{
                getCanSort: () => column.enableSorting,
                getIsSorted: () => sortState(index),
                getToggleSortingHandler: () => () => $emit('update:sorting', [{ id: column.id, desc: false }])
              }" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in data" :key="getRowId(entry)" :class="meta.class.tr({ original: entry })">
            <td v-for="column in columns" :key="column.id"
              :class="column.meta?.class?.td({ row: { original: entry } })"
              :colspan="column.meta?.colspan?.td({ row: { original: entry } })"
              :data-value="column.accessorFn?.(entry)"
            >
              <slot :name="column.id + '-cell'" :row="{ original: entry }" />
            </td>
          </tr>
        </tbody>
      </table>
    `,
  },
  UButton: {
    props: ['label', 'disabled'],
    template: '<button :disabled="disabled">{{ label }}<slot /></button>',
  },
  UAlert: {
    props: ['title', 'actions'],
    template:
      '<div role="alert">{{ title }} <button @click="actions[0].onClick()">{{ actions[0].label }}</button></div>',
  },
  UTooltip: { template: '<div><slot /></div>' },
  UPagination: {
    props: ['page'],
    emits: ['update:page'],
    template: '<button @click="$emit(\'update:page\', page + 1)">Next page</button>',
  },
  USelect: {
    emits: ['update:modelValue'],
    template: `<button @click="$emit('update:modelValue', 1)">Rows per page</button>`,
  },
};

function fixture() {
  const open: GroupNode<Item> = {
    ...branch(),
    path: [{ field: 'status', value: 'open' }],
    key: 'open',
    field: 'status',
    value: 'open',
    count: 8,
    loaded: true,
    expanded: true,
  };
  const high: GroupNode<Item> = {
    ...branch(),
    path: [...open.path, { field: 'priority', value: 'high' }],
    key: 'high',
    field: 'priority',
    value: 'high',
    count: 6,
    loaded: true,
    expanded: false,
    items: [item],
  };
  open.children.push(high);
  const root = reactive({ ...branch(), children: [open], items: [item] });
  const table = {
    root,
    groups: computed(() => root.children),
    allGroupsExpanded: ref(false),
    grouping: ref(['status', 'priority']),
    loadingMode: ref<'pagination' | 'infinite'>('pagination'),
    sorting: ref([]),
    columnPinning: ref({ left: ['title'], right: ['status'] }),
    itemsPerPage: ref(2),
    getItemPage: vi.fn(() => ({ page: 1, totalItems: 6, requestedPage: 3 })),
    loadItemsPage: vi.fn(async () => {}),
    loadMoreGroups: vi.fn(async () => {}),
    loadMoreItems: vi.fn(async () => {}),
    toggleGroup: vi.fn(async () => {
      root.children[0]!.children[0]!.expanded = true;
    }),
    setAllGroupsExpanded: vi.fn(async (expanded: boolean) => {
      table.allGroupsExpanded.value = expanded;
    }),
  } satisfies GroupedTableState<Item>;
  return { table, open: root.children[0]!, high: root.children[0]!.children[0]! };
}

describe('QTableGrouped', () => {
  it('renders nested group rows and routes paging and retry to the correct branch', async () => {
    const { table, open, high } = fixture();
    const columns = [
      { id: 'title', header: 'Title', width: 220 },
      { id: 'priority', header: 'Priority' },
    ];
    const wrapper = mount(QTableGrouped<Item>, {
      props: {
        table,
        columns,
        availableColumns: [...columns, { id: 'status', header: 'Status' }],
        getId: (row) => row.id,
        label: 'Tasks',
      },
      global: { stubs },
    });
    expect(wrapper.find('[aria-label="open 8 items"]').exists()).toBe(true);
    expect(wrapper.text()).not.toContain('First task');
    await wrapper
      .get('[aria-label="high 6 items"]')
      .element.closest('td')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flushPromises();
    expect(table.toggleGroup).toHaveBeenCalledWith(high.path);
    expect(wrapper.text()).toContain('First task');
    await wrapper.get('button[aria-label="Expand all groups"]').trigger('click');
    expect(table.setAllGroupsExpanded).toHaveBeenCalledWith(true);
    expect(wrapper.find('button[aria-label="Collapse all groups"]').exists()).toBe(true);
    await wrapper
      .findAll('button')
      .find((button) => button.text() === 'Next page')
      ?.trigger('click');
    expect(table.loadItemsPage).toHaveBeenCalledWith(high.path, 2);

    table.root.error = new Error('root failed');
    high.error = new Error('page failed');
    open.error = new Error('group failed');
    await flushPromises();
    const retries = wrapper.findAll('button').filter((button) => button.text() === 'Retry');
    expect(retries).toHaveLength(3);
    for (const button of retries) await button.trigger('click');
    expect(table.loadMoreGroups).toHaveBeenCalledWith();
    expect(table.loadMoreGroups).toHaveBeenCalledWith(open.path);
    expect(table.loadItemsPage).toHaveBeenCalledWith(high.path, 3);

    table.loadingMode.value = 'infinite';
    await flushPromises();
    await retries[1]?.trigger('click');
    expect(table.loadMoreItems).toHaveBeenCalledWith(high.path);

    table.grouping.value = [];
    await flushPromises();
    expect(wrapper.text()).toContain('First task');
    await wrapper.get('[role="alert"] button').trigger('click');
    expect(table.loadMoreItems).toHaveBeenCalledWith([]);
    wrapper.unmount();
  });

  it('renders custom leading cells, sorts, and loads the next records only in infinite mode', async () => {
    const { table, high } = fixture();
    high.expanded = true;
    high.hasMore = true;
    table.root.hasMore = true;
    const wrapper = mount(QTableGrouped<Item>, {
      props: {
        table,
        columns: [
          { id: 'status', header: 'Status' },
          { id: 'priority', header: 'Priority' },
          { id: 'title', header: 'Title', sortable: false },
        ],
        getId: (row) => row.id,
        label: 'Tasks',
        showBranch: true,
      },
      slots: {
        'leading-header': ({ items }) => String(items.length) + ' visible',
        leading: ({ item, node }) => item?.id ?? node?.key ?? '',
        branch: ({ node }) => 'Extra ' + node.key,
      },
      global: { stubs },
      attachTo: document.body,
    });
    expect(wrapper.text()).toContain('1 visible');
    expect(wrapper.text()).toContain('Extra open');
    expect(wrapper.text()).toContain('Extra high');
    expect(wrapper.find('td[colspan="4"]').exists()).toBe(true);
    wrapper.vm.$.exposed?.focus();
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Tasks');
    await wrapper.get('button[aria-label="high 6 items"]').trigger('click');
    await wrapper
      .findAll('thead button')
      .find((button) => button.text() === 'Status')
      ?.trigger('click');
    expect(table.sorting.value).toEqual([{ id: 'status', desc: false }]);

    table.loadingMode.value = 'infinite';
    await flushPromises();
    expect(table.loadMoreItems).toHaveBeenCalledWith(high.path);
    await wrapper
      .findAll('button')
      .find((button) => button.text() === 'Load more')
      ?.trigger('click');
    expect(table.loadMoreItems).toHaveBeenCalledTimes(2);
    await scroll.load?.();
    expect(table.loadMoreItems).toHaveBeenCalledTimes(2);

    table.grouping.value = [];
    await flushPromises();
    await scroll.load?.();
    expect(table.loadMoreItems).toHaveBeenCalledWith([]);

    table.loadingMode.value = 'pagination';
    await flushPromises();
    await wrapper
      .findAll('button')
      .find((button) => button.text() === 'Rows per page')
      ?.trigger('click');
    expect(table.itemsPerPage.value).toBe(1);
    await wrapper
      .findAll('button')
      .find((button) => button.text() === 'Next page')
      ?.trigger('click');
    expect(table.loadItemsPage).toHaveBeenCalledWith([], 2);

    table.root.error = new Error('flat page failed');
    await flushPromises();
    await wrapper.get('[role="alert"] button').trigger('click');
    expect(table.loadItemsPage).toHaveBeenCalledWith([], 3);
    wrapper.unmount();
  });
});
