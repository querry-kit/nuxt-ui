/** English fallback strings used when neither `texts` nor host-app i18n provides a value. */
export declare const defaultTableTexts: {
    readonly grouping: {
        readonly title: "Group by";
        readonly field: "Select grouping field";
        readonly noFields: "No grouping fields available";
        readonly add: "Add grouping";
        readonly remove: "Remove grouping";
        readonly clear: "Clear grouping";
        readonly reorder: "Reorder {field}";
        readonly moveUp: "Move group up";
        readonly moveDown: "Move group down";
        readonly count: "{formattedCount} items";
        readonly rowLabel: "{label} {countLabel}";
        readonly loading: "Loading group…";
        readonly itemsLoading: "Loading items…";
        readonly error: "Unable to load group.";
        readonly retry: "Retry";
        readonly loadMore: "Load more";
        readonly empty: "No items";
        readonly null: "No value";
        readonly noGroups: "No matching groups";
        readonly rootError: "Could not load groups";
        readonly itemsError: "Could not load items";
        readonly expandAll: "Expand all groups";
        readonly collapseAll: "Collapse all groups";
    };
    readonly search: {
        readonly placeholder: "Search";
    };
    readonly toolbar: {
        readonly close: "Close";
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
        readonly lookupPlaceholder: "Select options";
        readonly lookupError: "Options could not be loaded.";
        readonly operatorField: "Operator for {field}";
        readonly valueField: "{field}";
        readonly operators: {
            readonly in: "∈";
            readonly notIn: "∉";
            readonly equals: "=";
            readonly not: "≠";
            readonly gt: ">";
            readonly gte: "≥";
            readonly lt: "<";
            readonly lte: "≤";
        };
        readonly operatorDescriptions: {
            readonly in: "Is one of";
            readonly notIn: "Is not one of";
            readonly equals: "Equals";
            readonly not: "Does not equal";
            readonly gt: "Greater than";
            readonly gte: "Greater than or equal to";
            readonly lt: "Less than";
            readonly lte: "Less than or equal to";
        };
    };
    readonly options: {
        readonly title: "Table options";
        readonly reset: "Reset layout";
        readonly pin: "Pin column";
        readonly left: "Pin left";
        readonly right: "Pin right";
        readonly center: "Unpin";
        readonly visibility: "Toggle column visibility";
    };
    readonly pagination: {
        readonly pageSize: "Items per page";
        readonly summary: "Showing {start}–{end} of {total}";
        readonly mode: "Row loading mode";
        readonly paginated: "Pagination";
        readonly infinite: "Infinite scroll";
        readonly loaded: "Loaded {count} of {total}";
        readonly loadMore: "Load more";
        readonly loading: "Loading rows…";
        readonly error: "Unable to load rows.";
        readonly retry: "Retry";
    };
};
type TextPaths<T> = {
    [Key in keyof T & string]: T[Key] extends string ? Key : `${Key}.${TextPaths<T[Key]>}`;
}[keyof T & string];
/** Dot-delimited keys under the host application's querrykit.table namespace. */
export type TableTextKey = TextPaths<TableTexts>;
export type TableTexts = typeof defaultTableTexts;
type DeepTextOverrides<Value> = {
    [Key in keyof Value]?: Value[Key] extends string ? string : DeepTextOverrides<Value[Key]>;
};
/** Nested text overrides accepted by every public table component. */
export type TableTextOverrides = DeepTextOverrides<TableTexts>;
export {};
