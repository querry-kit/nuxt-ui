/** English fallback strings used when neither `texts` nor host-app i18n provides a value. */
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

/** Nested text overrides accepted by every public table component. */
export type TableTextOverrides = DeepTextOverrides<TableTexts>;
