import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import { h, markRaw, nextTick } from 'vue';
import QTableFiltering from '../src/runtime/components/table/filtering/index.vue';
import QTableOptions from '../src/runtime/components/table/options/index.vue';
import QTableSorting from '../src/runtime/components/table/sorting/index.vue';
import QTableToolbar from '../src/runtime/components/table/toolbar/index.vue';
import { FilterFieldType, FilteringMode, type TableIconOverrides } from '../src/runtime/types/table';

const stubs = {
  UButton: { props: ['label'], template: '<button v-bind="$attrs">{{ label }}<slot /></button>' },
  UCheckbox: { template: '<input type="checkbox" v-bind="$attrs" />' },
  UIcon: true,
  UInput: true,
  UInputNumber: true,
  UPopover: { template: '<div><slot /><slot name="content" /></div>' },
  USelect: true,
  USelectMenu: true,
  USeparator: true,
  USwitch: true,
  UBreadcrumb: true,
  QTableSorting: true,
  QTableFiltering: true,
  QTableOptions: true,
};

const mounted: Array<{ unmount: () => void }> = [];
const track = <T extends { unmount: () => void }>(wrapper: T): T => {
  mounted.push(wrapper);
  return wrapper;
};

afterEach(() => {
  mounted.splice(0).forEach((wrapper) => wrapper.unmount());
});

describe('table controls', () => {
  it('mounts sorting with its existing v-model contract and fields', async () => {
    const wrapper = track(
      mount(QTableSorting, {
        props: {
          sorting: [{ id: 'name', desc: false }],
          fields: [
            { value: 'name', label: 'Name' },
            { value: 'createdAt', label: 'Created' },
          ],
        },
        slots: {
          add: ({ add }) => h('button', { onClick: () => add('createdAt') }, 'Add'),
          items: ({ move, remove, toggleDirection }) =>
            h(
              'button',
              {
                onClick: () => {
                  toggleDirection('name');
                  move(0, 0);
                  remove('missing');
                },
              },
              'Items',
            ),
        },
        global: { stubs },
      }),
    );
    expect(wrapper.text()).toContain('Sort');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 's', shiftKey: true }));
    await wrapper.vm.$nextTick();
    await wrapper.findAll('button').at(-1)?.trigger('click');
    await wrapper.findAll('button').at(-2)?.trigger('click');
    expect(wrapper.emitted('update:sorting')).toBeTruthy();
  });

  it('adds a selected sort through the default control', async () => {
    const wrapper = track(
      mount(QTableSorting, {
        props: { sorting: [], fields: [{ value: 'name', label: 'Name' }] },
        global: { stubs },
      }),
    );

    await wrapper.findComponent({ name: 'USelect' }).vm.$emit('update:modelValue', 'name');
    await nextTick();
    await wrapper.get('button[aria-label="Add sort"]').trigger('click');

    expect(wrapper.emitted('update:sorting')?.[0]).toEqual([[{ id: 'name', desc: false }]]);
  });

  it('resolves nested sorting icons and keeps the flat trigger icon authoritative', async () => {
    const wrapper = track(
      mount(QTableSorting, {
        props: {
          sorting: [{ id: 'name', desc: false }],
          fields: [
            { value: 'name', label: 'Name' },
            { value: 'createdAt', label: 'Created' },
          ],
          icon: 'flat-sort-trigger',
          icons: {
            sorting: {
              trigger: 'nested-sort-trigger',
              header: 'custom-sort-header',
              clear: 'custom-sort-clear',
              add: 'custom-sort-add',
              ascending: 'custom-sort-ascending',
              descending: 'custom-sort-descending',
              remove: 'custom-sort-remove',
            },
          },
        },
        global: { stubs },
      }),
    );

    expect(wrapper.html()).toContain('flat-sort-trigger');
    expect(wrapper.html()).not.toContain('nested-sort-trigger');
    expect(wrapper.html()).toContain('custom-sort-header');
    expect(wrapper.html()).toContain('custom-sort-clear');
    expect(wrapper.html()).toContain('custom-sort-add');
    expect(wrapper.html()).toContain('custom-sort-ascending');
    expect(wrapper.html()).toContain('custom-sort-remove');

    await wrapper.setProps({ sorting: [{ id: 'name', desc: true }] });
    expect(wrapper.html()).toContain('custom-sort-descending');
  });

  it('mounts filtering with Query Kit AND/OR state and field definitions', async () => {
    const wrapper = track(
      mount(QTableFiltering, {
        props: {
          filtering: {
            operator: FilteringMode.Intersect,
            filters: [{ id: 'active', field: 'active', type: FilterFieldType.Boolean, value: true }],
          },
          fields: [{ value: 'active', label: 'Active', type: FilterFieldType.Boolean }],
        },
        slots: {
          header: ({ clear, toggleMode }) =>
            h(
              'button',
              {
                onClick: () => {
                  toggleMode();
                  clear();
                },
              },
              'Header',
            ),
          add: ({ add }) => h('button', { onClick: () => add('active') }, 'Add'),
          items: ({ remove, update }) =>
            h(
              'button',
              {
                onClick: () => {
                  update('active', { value: false });
                  remove('active');
                },
              },
              'Items',
            ),
        },
        global: { stubs },
      }),
    );
    expect(wrapper.text()).toContain('Header');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'f', shiftKey: true }));
    await wrapper.vm.$nextTick();
    await wrapper.findAll('button').at(-1)?.trigger('click');
    await wrapper.findAll('button').at(-2)?.trigger('click');
    await wrapper.findAll('button').at(-3)?.trigger('click');
    expect(wrapper.emitted('update:filtering')).toBeTruthy();
  });

  it('adds a selected filter through the default control', async () => {
    const wrapper = track(
      mount(QTableFiltering, {
        props: {
          filtering: { operator: FilteringMode.Intersect, filters: [] },
          fields: [{ value: 'active', label: 'Active', type: FilterFieldType.Boolean }],
        },
        global: { stubs },
      }),
    );

    await wrapper.findComponent({ name: 'USelect' }).vm.$emit('update:modelValue', 'active');
    await nextTick();
    await wrapper.get('button[aria-label="Add filter"]').trigger('click');

    expect(wrapper.emitted('update:filtering')?.[0]?.[0]).toMatchObject({
      filters: [{ field: 'active', type: FilterFieldType.Boolean, value: true }],
    });
  });

  it('resolves nested filtering icons, including both filter modes', async () => {
    const wrapper = track(
      mount(QTableFiltering, {
        props: {
          filtering: {
            operator: FilteringMode.Intersect,
            filters: [{ id: 'active', field: 'active', type: FilterFieldType.Boolean, value: true }],
          },
          fields: [
            { value: 'active', label: 'Active', type: FilterFieldType.Boolean },
            { value: 'rank', label: 'Rank', type: FilterFieldType.Number },
          ],
          icons: {
            filtering: {
              trigger: 'custom-filter-trigger',
              header: 'custom-filter-header',
              intersect: 'custom-filter-intersect',
              union: 'custom-filter-union',
              clear: 'custom-filter-clear',
              add: 'custom-filter-add',
              remove: 'custom-filter-remove',
            },
          },
        },
        global: { stubs },
      }),
    );

    expect(wrapper.html()).toContain('custom-filter-trigger');
    expect(wrapper.html()).toContain('custom-filter-header');
    expect(wrapper.html()).toContain('custom-filter-intersect');
    expect(wrapper.html()).toContain('custom-filter-clear');
    expect(wrapper.html()).toContain('custom-filter-add');
    expect(wrapper.html()).toContain('custom-filter-remove');

    await wrapper.setProps({ filtering: { operator: FilteringMode.Union, filters: [] } });
    expect(wrapper.html()).toContain('custom-filter-union');
  });

  it('renders each default filter editor variant', () => {
    const customEditor = markRaw({ template: '<button>Custom editor</button>' });
    const wrapper = track(
      mount(QTableFiltering, {
        props: {
          filtering: {
            operator: FilteringMode.Intersect,
            filters: [
              { id: 'boolean', field: 'active', type: FilterFieldType.Boolean, value: true },
              { id: 'number', field: 'rank', type: FilterFieldType.Number, value: 3 },
              { id: 'enum-menu', field: 'status', type: FilterFieldType.Enum, value: ['open'] },
              { id: 'enum-component', field: 'priority', type: FilterFieldType.Enum, value: ['high'] },
              { id: 'select', field: 'owner', type: FilterFieldType.Select, value: ['ada'] },
            ],
          },
          fields: [
            { value: 'active', label: 'Active', type: FilterFieldType.Boolean },
            { value: 'rank', label: 'Rank', type: FilterFieldType.Number },
            {
              value: 'status',
              label: 'Status',
              type: FilterFieldType.Enum,
              values: [{ value: 'open', label: 'Open' }],
            },
            {
              value: 'priority',
              label: 'Priority',
              type: FilterFieldType.Enum,
              values: [],
              component: customEditor,
            },
            { value: 'owner', label: 'Owner', type: FilterFieldType.Select, component: customEditor },
          ],
        },
        global: { stubs },
      }),
    );

    expect(wrapper.text()).toContain('Custom editor');
  });

  it('mounts options with order, visibility and pinning models', async () => {
    const wrapper = track(
      mount(QTableOptions, {
        props: {
          columns: [{ id: 'name', header: 'Name' }],
          columnOrder: ['name'],
          invisibleColumns: [],
          columnPinning: {},
        },
        slots: {
          items: ({ move }) => h('button', { onClick: () => move(0, 0) }, 'Move'),
          item: ({ column, pin, toggleVisibility }) =>
            h(
              'button',
              {
                onClick: () => {
                  pin('left');
                  toggleVisibility();
                },
              },
              column.header,
            ),
        },
        global: { stubs },
      }),
    );
    expect(wrapper.text()).toContain('Table options');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', shiftKey: true }));
    await wrapper.vm.$nextTick();
    await wrapper.findAll('button').at(-1)?.trigger('click');
    await wrapper.findAll('button').at(-2)?.trigger('click');
    expect(wrapper.text()).toContain('Move');
  });

  it('uses default options controls for visibility, pinning, and reordering', async () => {
    const wrapper = track(
      mount(QTableOptions, {
        props: {
          columns: [
            { id: 'name', header: 'Name' },
            { id: 'email', header: 'Email' },
            { id: 'fixed', header: 'Fixed', enableHiding: false },
          ],
          columnOrder: ['name', 'email', 'fixed'],
          invisibleColumns: [],
          columnPinning: {},
        },
        global: { stubs },
      }),
    );

    await wrapper.findComponent({ name: 'USwitch' }).vm.$emit('update:modelValue', false);
    await wrapper.setProps({ invisibleColumns: ['name'] });
    await wrapper.findComponent({ name: 'USwitch' }).vm.$emit('update:modelValue', true);
    await wrapper.get('button').trigger('click');
    const rows = wrapper.findAll('li');
    await rows[1]!.trigger('dragstart');
    await rows[0]!.trigger('drop');
    await wrapper
      .findAll('button')
      .find((button) => button.text() === 'Left')
      ?.trigger('click');

    expect(wrapper.emitted('update:invisibleColumns')).toBeTruthy();
    expect(wrapper.emitted('update:columnOrder')).toBeTruthy();
    expect(wrapper.emitted('update:columnPinning')).toBeTruthy();
  });

  it('resolves nested options icons', () => {
    const wrapper = track(
      mount(QTableOptions, {
        props: {
          columns: [{ id: 'name', header: 'Name' }],
          columnOrder: ['name'],
          invisibleColumns: [],
          columnPinning: {},
          icons: {
            options: {
              trigger: 'custom-options-trigger',
              header: 'custom-options-header',
              pin: 'custom-options-pin',
              drag: 'custom-options-drag',
            },
          },
        },
        global: { stubs },
      }),
    );

    expect(wrapper.html()).toContain('custom-options-trigger');
    expect(wrapper.html()).toContain('custom-options-header');
    expect(wrapper.html()).toContain('custom-options-pin');
    expect(wrapper.html()).toContain('custom-options-drag');
  });

  it('passes all public toolbar models to consumer slots', () => {
    const wrapper = track(
      mount(QTableToolbar, {
        props: {
          search: 'Ada',
          sorting: [],
          filtering: { operator: FilteringMode.Intersect, filters: [] },
          columnOrder: ['name'],
          invisibleColumns: [],
          columnPinning: {},
          sortableFields: [{ value: 'name', label: 'Name' }],
          filterFields: [{ value: 'active', label: 'Active', type: FilterFieldType.Boolean }],
          columnDefinitions: [{ id: 'name', header: 'Name' }],
          breadcrumbItems: [{ label: 'People' }],
        },
        slots: { new: '<span>Create</span>' },
        global: { stubs },
      }),
    );
    expect(wrapper.text()).toContain('Create');
  });

  it('forwards nested icons to the default toolbar controls', () => {
    const icons = {
      search: { input: 'custom-search' },
      sorting: { trigger: 'custom-sorting' },
      filtering: { trigger: 'custom-filtering' },
      options: { trigger: 'custom-options' },
    } satisfies TableIconOverrides;
    const wrapper = track(
      mount(QTableToolbar, {
        props: {
          search: '',
          sorting: [],
          filtering: { operator: FilteringMode.Intersect, filters: [] },
          columnOrder: ['name'],
          invisibleColumns: [],
          columnPinning: {},
          sortableFields: [{ value: 'name', label: 'Name' }],
          filterFields: [{ value: 'active', label: 'Active', type: FilterFieldType.Boolean }],
          columnDefinitions: [{ id: 'name', header: 'Name' }],
          icons,
        },
        global: {
          stubs: {
            ...stubs,
            QTableSorting: { name: 'QTableSorting', props: ['icons'], template: '<div />' },
            QTableFiltering: { name: 'QTableFiltering', props: ['icons'], template: '<div />' },
            QTableOptions: { name: 'QTableOptions', props: ['icons'], template: '<div />' },
          },
        },
      }),
    );

    expect(wrapper.html()).toContain('custom-search');
    expect(wrapper.findComponent({ name: 'QTableSorting' }).props('icons')).toEqual(icons);
    expect(wrapper.findComponent({ name: 'QTableFiltering' }).props('icons')).toEqual(icons);
    expect(wrapper.findComponent({ name: 'QTableOptions' }).props('icons')).toEqual(icons);
  });

  it('does not open controls while a consumer is typing', async () => {
    const wrapper = track(
      mount(QTableSorting, {
        props: { sorting: [], fields: [{ value: 'name', label: 'Name' }] },
        global: { stubs },
      }),
    );
    const input = document.createElement('input');
    document.body.append(input);

    input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 's', shiftKey: true }));
    await nextTick();

    expect(wrapper.text()).not.toContain('Clear sorting');
  });
});
