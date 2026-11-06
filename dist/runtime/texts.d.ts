/** English fallback strings used when neither `texts` nor host-app i18n provides a value. */
export declare const defaultTableTexts: {
    readonly grouping: {
        readonly title: "Group by";
        readonly field: "Select grouping field";
        readonly add: "Add grouping";
        readonly remove: "Remove grouping";
        readonly clear: "Clear grouping";
        readonly moveUp: "Move group up";
        readonly moveDown: "Move group down";
        readonly count: "{count} items";
        readonly loading: "Loading group…";
        readonly error: "Unable to load group.";
        readonly retry: "Retry";
        readonly loadMore: "Load more";
        readonly empty: "No items";
        readonly null: "No value";
    };
    readonly search: {
        readonly placeholder: "Search";
    };
    readonly sorting: {
        readonly title: "Sort";
        readonly field: "Select field";
        readonly add: "Add sort";
        readonly clear: "Clear sorting";
        readonly remove: "Remove sort";
        readonly toggle: "Toggle sort direction";
    };
    readonly filtering: {
        readonly title: "Filter";
        readonly field: "Select field";
        readonly add: "Add filter";
        readonly clear: "Clear filters";
        readonly remove: "Remove filter";
        readonly mode: "Toggle filter mode";
    };
    readonly options: {
        readonly title: "Table options";
        readonly pin: "Pin column";
        readonly left: "Pin left";
        readonly right: "Pin right";
        readonly center: "Unpin";
        readonly visibility: "Toggle column visibility";
    };
    readonly pagination: {
        readonly summary: "Showing {start}–{end} of {total}";
    };
};
export type TableTextKey = 'grouping.title' | 'grouping.field' | 'grouping.add' | 'grouping.remove' | 'grouping.clear' | 'grouping.moveUp' | 'grouping.moveDown' | 'grouping.count' | 'grouping.loading' | 'grouping.error' | 'grouping.retry' | 'grouping.loadMore' | 'grouping.empty' | 'grouping.null' | 'search.placeholder' | 'sorting.title' | 'sorting.field' | 'sorting.add' | 'sorting.clear' | 'sorting.remove' | 'sorting.toggle' | 'filtering.title' | 'filtering.field' | 'filtering.add' | 'filtering.clear' | 'filtering.remove' | 'filtering.mode' | 'options.title' | 'options.pin' | 'options.left' | 'options.right' | 'options.center' | 'options.visibility' | 'pagination.summary';
export type TableTexts = typeof defaultTableTexts;
type DeepTextOverrides<Value> = {
    [Key in keyof Value]?: Value[Key] extends string ? string : DeepTextOverrides<Value[Key]>;
};
/** Nested text overrides accepted by every public table component. */
export type TableTextOverrides = DeepTextOverrides<TableTexts>;
export {};
