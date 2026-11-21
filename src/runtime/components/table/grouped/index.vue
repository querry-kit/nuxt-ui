<template>
  <div class="flex min-h-0 min-w-0 flex-1 flex-col">
    <UAlert
      v-if="root.error"
      class="m-4 shrink-0"
      color="error"
      variant="soft"
      :title="grouping.length ? t('grouping.rootError') : t('grouping.itemsError')"
      :actions="[{ label: t('grouping.retry'), onClick: retry }]"
    />
    <div
      ref="viewport"
      class="@container min-h-0 flex-1 overflow-auto [scrollbar-gutter:stable]"
      tabindex="0"
      role="region"
      :aria-label="label"
      @click="toggleGroupRow"
    >
      <UTable
        v-model:sorting="sorting"
        sticky
        :empty="grouping.length ? t('grouping.noGroups') : t('grouping.empty')"
        :data="rows"
        :columns="slots.leading ? [leadingColumn, ...displayColumns] : displayColumns"
        :column-pinning="displayPinning"
        :sorting-options="{ manualSorting: true }"
        :loading="root.loading"
        :get-row-id="getRowId"
        :meta="rowMeta"
        :style="grouping.length ? { '--q-grouped-table-width': `${groupedTableWidth}px` } : undefined"
        :ui="{
          root: 'overflow-visible',
          ...ui,
          base: [
            ui?.base,
            grouping.length
              ? 'min-w-(--q-grouped-table-width) w-full table-fixed overflow-visible'
              : 'w-full overflow-visible',
          ]
            .filter(Boolean)
            .join(' '),
        }"
      >
        <template v-if="slots['leading-header']" #grouped-leading-header>
          <slot name="leading-header" :items="visibleItems" />
        </template>
        <template v-if="slots.leading" #grouped-leading-cell="{ row }">
          <GroupedBranchControls
            v-if="row.original.kind === 'controls'"
            :table="table"
            :node="row.original.node"
            :viewport="viewport"
            :leaf="row.original.leaf"
            :texts="texts"
          >
            <slot name="branch" :node="row.original.node" />
          </GroupedBranchControls>
          <slot
            v-else
            name="leading"
            :item="row.original.kind === 'item' ? row.original.item : undefined"
            :node="row.original.kind === 'group' ? row.original.node : undefined"
          />
        </template>
        <template v-for="item in displayColumns" :key="item.id" #[`${item.id}-header`]="{ column }">
          <UButton
            v-if="column.getCanSort()"
            class="text-highlighted p-0 font-semibold"
            color="neutral"
            variant="ghost"
            :label="String(item.header)"
            :trailing-icon="sortIcon(column.getIsSorted())"
            @click="column.getToggleSortingHandler()?.($event)"
          />
          <template v-else>
            {{ item.header }}
          </template>
        </template>
        <template v-for="column in displayColumns" :key="column.id" #[`${column.id}-cell`]="{ row }">
          <GroupedBranchControls
            v-if="row.original.kind === 'controls' && !slots.leading && column.id === orderedColumns[0]?.id"
            :table="table"
            :node="row.original.node"
            :viewport="viewport"
            :leaf="row.original.leaf"
            :texts="texts"
          >
            <slot name="branch" :node="row.original.node" />
          </GroupedBranchControls>
          <template v-else-if="row.original.kind === 'group'">
            <button
              v-if="column.id === row.original.node.field"
              type="button"
              class="text-default focus-visible:outline-primary inline-flex max-w-full cursor-pointer items-center gap-1 rounded-md py-1 text-xs font-medium focus-visible:outline-2"
              data-group-toggle
              :aria-expanded="row.original.node.expanded"
              :aria-label="groupLabel(row.original.node)"
              @click="table.toggleGroup(row.original.node.path)"
            >
              <UIcon
                class="size-4 shrink-0"
                aria-hidden="true"
                :name="icon(row.original.node.expanded ? 'grouping.expanded' : 'grouping.collapsed')"
              />
              <span class="min-w-0 truncate">
                <slot name="group-value" :node="row.original.node">
                  {{ row.original.node.value ?? t('grouping.null') }}
                </slot>
              </span>
              <span class="text-muted shrink-0 tabular-nums">{{ row.original.node.count }}</span>
            </button>
            <slot v-else name="group-cell" :node="row.original.node" :field="column.id" />
          </template>
          <slot
            v-else-if="row.original.kind === 'item' && !grouping.includes(column.id)"
            name="cell"
            :field="column.id"
            :item="row.original.item"
          >
            {{ row.original.item[column.id] }}
          </slot>
        </template>
      </UTable>
    </div>
    <footer v-if="grouping.length" class="border-default flex flex-wrap items-center gap-3 border-t px-4 py-3">
      <slot name="footer-start" />
      <UTooltip :text="bulkGroupLabel">
        <UButton
          color="neutral"
          size="sm"
          variant="ghost"
          :icon="allGroupsExpanded ? icon('grouping.collapseAll') : icon('grouping.expandAll')"
          :aria-label="bulkGroupLabel"
          :disabled="!groups.length || root.loading"
          :loading="changingGroups"
          @click="toggleAllGroups"
        />
      </UTooltip>
      <QTableGroupLoadMore
        :texts="texts"
        :has-more="root.hasMore && !root.error && !changingGroups"
        :loading="root.loading"
        @load="loadGroups"
      />
      <slot name="footer-end" />
    </footer>
    <GroupedPagination v-else :table="table" :branch="root" :path="[]" :texts="texts">
      <slot name="footer-start" />
    </GroupedPagination>
  </div>
</template>

<script setup lang="ts" generic="TItem extends Record<string, unknown>">
import type { TableColumn, TableProps } from '@nuxt/ui';
import type { GroupNode } from '@querry-kit/nuxt';
import { useInfiniteScroll } from '@vueuse/core';
import { computed, ref, useTemplateRef } from 'vue';
import { useTableI18n } from '../../../composables/use-table-i18n';
import { useTableIcons } from '../../../composables/use-table-icons';
import type { TableIconOverrides } from '../../../icons';
import type { TableTextOverrides } from '../../../texts';
import type { GroupedTableColumn, GroupedTableState } from '../../../types/grouped-table';
import QTableGroupLoadMore from '../group/load-more.vue';
import GroupedBranchControls from './branch-controls.vue';
import GroupedPagination from './pagination.vue';

const props = defineProps<{
  table: GroupedTableState<TItem>;
  columns: readonly GroupedTableColumn[];
  availableColumns?: readonly GroupedTableColumn[];
  getId: (item: TItem) => string | number;
  label: string;
  flexibleColumn?: string;
  showBranch?: boolean;
  ui?: TableProps<DisplayRow>['ui'];
  texts?: TableTextOverrides;
  icons?: TableIconOverrides;
}>();

const slots = defineSlots<{
  cell?: (props: { field: string; item: TItem }) => unknown;
  'group-value'?: (props: { node: GroupNode<TItem> }) => unknown;
  'group-cell'?: (props: { node: GroupNode<TItem>; field: string }) => unknown;
  branch?: (props: { node: GroupNode<TItem> }) => unknown;
  'leading-header'?: (props: { items: TItem[] }) => unknown;
  leading?: (props: { item?: TItem; node?: GroupNode<TItem> }) => unknown;
  'footer-start'?: () => unknown;
  'footer-end'?: () => unknown;
}>();

const { table } = props;
const { root, groups, allGroupsExpanded, grouping, loadingMode, sorting, columnPinning } = table;
const viewport = useTemplateRef('viewport');
const t = useTableI18n(props.texts);
const icon = useTableIcons(props.icons);
const changingGroups = ref(false);
const bulkGroupLabel = computed(() => t(allGroupsExpanded.value ? 'grouping.collapseAll' : 'grouping.expandAll'));

defineExpose({ focus: () => viewport.value?.focus() });

type DisplayRow =
  | { kind: 'item'; key: string; item: TItem }
  | { kind: 'group'; key: string; node: GroupNode<TItem> }
  | { kind: 'controls'; key: string; node: GroupNode<TItem>; leaf: boolean };

/** Gives each item a stable key independent of the current sort, page, or parent group. */
function itemRow(item: TItem): DisplayRow {
  return { kind: 'item', key: `item:${props.getId(item)}`, item };
}

/** Puts open groups, their records, and branch controls in a single row sequence. */
function appendGroup(rows: DisplayRow[], node: GroupNode<TItem>): void {
  rows.push({ kind: 'group', key: `group:${node.key}`, node });
  if (!node.expanded) return;

  const leaf = node.path.length === grouping.value.length;
  if (leaf) rows.push(...node.items.map(itemRow));
  else for (const child of node.children) appendGroup(rows, child);

  if (leaf || node.hasMore || node.loading || node.error || (props.showBranch && slots.branch)) {
    rows.push({ kind: 'controls', key: `controls:${node.key}`, node, leaf });
  }
}

const rows = computed<DisplayRow[]>(
  /** Renders the server tree without issuing requests for collapsed groups. */
  () => {
    if (!grouping.value.length) return root.items.map(itemRow);
    const visible: DisplayRow[] = [];
    for (const node of groups.value) appendGroup(visible, node);
    return visible;
  },
);
const visibleItems = computed(() => rows.value.flatMap((row) => (row.kind === 'item' ? [row.item] : [])));
const displayPinning = computed(
  /** Lets grouping columns precede left-pinned fields without freezing the group columns on small screens. */
  () =>
    grouping.value.length
      ? {
          left: slots.leading ? [leadingId] : [],
          right: (columnPinning.value.right ?? []).filter(
            /** Keeps only non-group columns pinned at the right edge. */
            (id) => !grouping.value.includes(id),
          ),
        }
      : { ...columnPinning.value, left: [...(slots.leading ? [leadingId] : []), ...(columnPinning.value.left ?? [])] },
);
const orderedColumns = computed(
  /** Keeps grouping columns visible and ordered by group depth, even if saved as hidden. */
  () => {
    const leading = [...grouping.value, ...(grouping.value.length ? (columnPinning.value.left ?? []) : [])];
    const ids = new Set([...leading, ...props.columns.map(/** Reads the visible column ID. */ ({ id }) => id)]);
    return [...ids].flatMap(
      /** Resolves only visible columns and the required grouping fields. */
      (id) => {
        const allowed = grouping.value.includes(id) ? (props.availableColumns ?? props.columns) : props.columns;
        const column = allowed.find(/** Matches a declared column ID. */ (entry) => entry.id === id);
        return column ? [column] : [];
      },
    );
  },
);
const leadingId = 'grouped-leading';
const leadingWidth = 48;

function groupedColumnWidth(column: GroupedTableColumn): number {
  return column.width ?? 150;
}

const groupedTableWidth = computed(
  /** Reserves the same scroll width before and after groups or pages are opened. */
  () =>
    orderedColumns.value.reduce(
      /** Adds each visible column's width. */ (total, column) => total + groupedColumnWidth(column),
      slots.leading ? leadingWidth : 0,
    ),
);
const flexibleColumn = computed(() => {
  const id = props.flexibleColumn ?? orderedColumns.value[0]?.id;
  return id && displayPinning.value.right?.includes(id) ? grouping.value[0] : id;
});
const leadingColumn: TableColumn<DisplayRow> = {
  id: leadingId,
  size: leadingWidth,
  enableSorting: false,
  meta: {
    class: {
      th: 'first:pl-3 w-12 bg-default',
      /** Lets group controls span the table without inheriting sticky positioning. */
      td: ({ row }) => {
        if (row.original.kind === 'controls') return 'static! p-0 first:pl-0';
        return row.original.kind === 'group' ? 'first:pl-3 w-12 bg-inherit' : 'first:pl-3 w-12 bg-default';
      },
    },
    colspan: {
      /** Spans the leading cell and all visible resource columns on control rows. */
      td: ({ row }) => (row.original.kind === 'controls' ? String(orderedColumns.value.length + 1) : '1'),
    },
  },
};
const displayColumns = computed(() =>
  orderedColumns.value.map((column, index): TableColumn<DisplayRow> & { id: string; header: string } => {
    const { id, header, align, groupedCellClass, sortable } = column;
    const alignment = align === 'right' ? 'text-right tabular-nums' : '';
    const groupedWidth = grouping.value.length ? groupedColumnWidth(column) : undefined;
    const cellLayout = groupedWidth ? (groupedCellClass ?? 'truncate') : '';
    const showControls = !slots.leading && index === 0;
    return {
      id,
      header,
      size: groupedWidth,
      enableSorting: sortable ?? true,
      sortDescFirst: false,
      /** Enables TanStack's sorting controls while the API orders the rows. */
      accessorFn: (row) => (row.kind === 'item' ? row.item[id] : undefined),
      meta: {
        class: {
          th: alignment,
          td: ({ row }) => {
            if (row.original.kind === 'controls') return showControls ? 'static! p-0 first:pl-0' : 'hidden';
            return [alignment, cellLayout, row.original.kind === 'group' && 'bg-inherit'].filter(Boolean).join(' ');
          },
        },
        colspan: showControls
          ? { td: ({ row }) => (row.original.kind === 'controls' ? String(orderedColumns.value.length) : '1') }
          : undefined,
        style: groupedWidth && id !== flexibleColumn.value ? { th: { width: `${groupedWidth}px` } } : undefined,
      },
    };
  }),
);
const rowMeta: TableProps<DisplayRow>['meta'] = {
  class: {
    /** Distinguishes group rows from individual records. */
    tr: (row) => (row.original.kind === 'group' ? 'cursor-pointer bg-elevated hover:bg-accented' : ''),
  },
};

/** Supplies the resource or branch key to TanStack Table. */
function getRowId(row: DisplayRow): string {
  return row.key;
}

/** Makes the group value, count, and expansion state available to keyboard and screen reader users. */
function groupLabel(node: GroupNode<TItem>): string {
  return `${node.value ?? t('grouping.null')} ${t('grouping.count', { count: node.count })}`;
}

/** Makes the entire group row activate the same disclosure button used by the keyboard. */
function toggleGroupRow(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof Element) || target.closest('button, a, input, select, textarea')) return;
  target.closest('tbody tr')?.querySelector<HTMLButtonElement>('button[data-group-toggle]')?.click();
}

/** Displays the current server sort direction at the column header. */
function sortIcon(direction: false | 'asc' | 'desc'): string {
  if (direction === 'asc') return icon('sorting.columnAscending');
  if (direction === 'desc') return icon('sorting.columnDescending');
  return icon('sorting.trigger');
}

useInfiniteScroll(
  viewport,
  /** Appends flat rows near the end of the shared viewport. */ () => table.loadMoreItems([]),
  {
    distance: 48,
    /** Group leaves load through their own visible control rows. */
    canLoadMore: () =>
      loadingMode.value === 'infinite' && !grouping.value.length && root.hasMore && !root.loading && !root.error,
  },
);

/** Retries the failed batch while retaining already loaded rows or groups. */
function retry(): void {
  if (grouping.value.length) loadGroups();
  else if (loadingMode.value === 'infinite') void table.loadMoreItems([]);
  else {
    const { page, requestedPage } = table.getItemPage();
    void table.loadItemsPage([], requestedPage ?? page);
  }
}

/** Appends the next batch of top-level groups. */
function loadGroups(): void {
  void table.loadMoreGroups();
}

/** Expands or collapses the current group tree through the headless table. */
async function toggleAllGroups(): Promise<void> {
  changingGroups.value = true;
  try {
    await table.setAllGroupsExpanded(!allGroupsExpanded.value);
  } finally {
    changingGroups.value = false;
  }
}
</script>
