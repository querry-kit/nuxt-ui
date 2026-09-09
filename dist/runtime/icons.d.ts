/** Default Iconify names used by the table controls. */
export declare const defaultTableIcons: {
    readonly search: {
        readonly input: "i-tabler-search";
    };
    readonly sorting: {
        readonly trigger: "i-tabler-arrows-sort";
        readonly header: "i-tabler-arrows-sort";
        readonly clear: "i-tabler-cancel";
        readonly add: "i-tabler-plus";
        readonly ascending: "i-tabler-sort-ascending";
        readonly descending: "i-tabler-sort-descending";
        readonly remove: "i-tabler-x";
    };
    readonly filtering: {
        readonly trigger: "i-tabler-filter";
        readonly header: "i-tabler-filter-2";
        readonly intersect: "i-tabler-layers-intersect-2";
        readonly union: "i-tabler-layers-union";
        readonly clear: "i-tabler-cancel";
        readonly add: "i-tabler-plus";
        readonly remove: "i-tabler-x";
    };
    readonly options: {
        readonly trigger: "i-tabler-adjustments";
        readonly header: "i-tabler-adjustments";
        readonly pin: "i-tabler-pin";
        readonly unpin: "i-tabler-pin-off";
        readonly drag: "i-tabler-grip-vertical";
        readonly visible: "i-tabler-eye";
        readonly hidden: "i-tabler-eye-off";
    };
};
export type TableIcons = typeof defaultTableIcons;
export type TableIconKey = 'search.input' | 'sorting.trigger' | 'sorting.header' | 'sorting.clear' | 'sorting.add' | 'sorting.ascending' | 'sorting.descending' | 'sorting.remove' | 'filtering.trigger' | 'filtering.header' | 'filtering.intersect' | 'filtering.union' | 'filtering.clear' | 'filtering.add' | 'filtering.remove' | 'options.trigger' | 'options.header' | 'options.pin' | 'options.unpin' | 'options.drag' | 'options.visible' | 'options.hidden';
type DeepIconOverrides<Value> = {
    [Key in keyof Value]?: Value[Key] extends string ? string : DeepIconOverrides<Value[Key]>;
};
/** Nested Iconify-name overrides accepted by the table controls. */
export type TableIconOverrides = DeepIconOverrides<TableIcons>;
export {};
