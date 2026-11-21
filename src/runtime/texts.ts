/** English fallback strings used when neither `texts` nor host-app i18n provides a value. */
export const defaultTableTexts = {
  grouping: {
    title: 'Group by',
    field: 'Select grouping field',
    noFields: 'No grouping fields available',
    add: 'Add grouping',
    remove: 'Remove grouping',
    clear: 'Clear grouping',
    reorder: 'Reorder {field}',
    moveUp: 'Move group up',
    moveDown: 'Move group down',
    count: '{count} items',
    loading: 'Loading group…',
    error: 'Unable to load group.',
    retry: 'Retry',
    loadMore: 'Load more',
    empty: 'No items',
    null: 'No value',
    noGroups: 'No matching groups',
    rootError: 'Could not load groups',
    itemsError: 'Could not load items',
    expandAll: 'Expand all groups',
    collapseAll: 'Collapse all groups',
  },
  search: { placeholder: 'Search' },
  sorting: {
    title: 'Sort',
    field: 'Select field',
    add: 'Add sort',
    clear: 'Clear sorting',
    remove: 'Remove sort',
    toggle: 'Toggle sort direction',
  },
  filtering: {
    title: 'Filter',
    field: 'Select field',
    add: 'Add filter',
    clear: 'Clear filters',
    remove: 'Remove filter',
    mode: 'Toggle filter mode',
  },
  options: {
    title: 'Table options',
    reset: 'Reset layout',
    pin: 'Pin column',
    left: 'Pin left',
    right: 'Pin right',
    center: 'Unpin',
    visibility: 'Toggle column visibility',
  },
  pagination: { summary: 'Showing {start}–{end} of {total}' },
} as const;

export type TableTextKey =
  | 'grouping.title'
  | 'grouping.field'
  | 'grouping.noFields'
  | 'grouping.add'
  | 'grouping.remove'
  | 'grouping.clear'
  | 'grouping.reorder'
  | 'grouping.moveUp'
  | 'grouping.moveDown'
  | 'grouping.count'
  | 'grouping.loading'
  | 'grouping.error'
  | 'grouping.retry'
  | 'grouping.loadMore'
  | 'grouping.empty'
  | 'grouping.null'
  | 'grouping.noGroups'
  | 'grouping.rootError'
  | 'grouping.itemsError'
  | 'grouping.expandAll'
  | 'grouping.collapseAll'
  | 'search.placeholder'
  | 'sorting.title'
  | 'sorting.field'
  | 'sorting.add'
  | 'sorting.clear'
  | 'sorting.remove'
  | 'sorting.toggle'
  | 'filtering.title'
  | 'filtering.field'
  | 'filtering.add'
  | 'filtering.clear'
  | 'filtering.remove'
  | 'filtering.mode'
  | 'options.title'
  | 'options.reset'
  | 'options.pin'
  | 'options.left'
  | 'options.right'
  | 'options.center'
  | 'options.visibility'
  | 'pagination.summary';

export type TableTexts = typeof defaultTableTexts;
type DeepTextOverrides<Value> = {
  [Key in keyof Value]?: Value[Key] extends string ? string : DeepTextOverrides<Value[Key]>;
};

/** Nested text overrides accepted by every public table component. */
export type TableTextOverrides = DeepTextOverrides<TableTexts>;
