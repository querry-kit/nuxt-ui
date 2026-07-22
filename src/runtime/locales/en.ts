/** English defaults used when an application does not provide vue-i18n. */
export const defaultTableTexts = {
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
    pin: 'Pin column',
    left: 'Left',
    right: 'Right',
    center: 'Unpin',
    visibility: 'Toggle column visibility',
  },
  pagination: { summary: 'Showing {start}–{end} of {total}' },
} as const;

export type TableTextKey =
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

export type TableTextOverrides = DeepTextOverrides<TableTexts>;

/** vue-i18n payload with a collision-safe package namespace. */
export default {
  '@querry-kit': { table: defaultTableTexts },
} as const;
