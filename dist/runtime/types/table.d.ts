import type { FilterFieldDefinition, FilteringField as QueryKitFilteringField, FilteringFieldOperator as QueryKitFilteringFieldOperator, FilteringMode as QueryKitFilteringMode, FilteringState as QueryKitFilteringState, SortingField as QueryKitSortingField, SortingRule } from '@querry-kit/nuxt/types';
import type { Component } from 'vue';
/** Ordered sort instructions; `desc: false` represents ascending order. */
export type SortingState = SortingRule[];
/** A selectable field in the sorting control. */
export type SortingField = QueryKitSortingField<{
    disabled?: boolean;
}>;
/** Editor variants supported by the filtering control. */
export declare const FilterFieldType: {
    readonly Boolean: "boolean";
    readonly Number: "number";
    readonly Enum: "enum";
    readonly Select: "select";
};
export type FilterFieldType = (typeof FilterFieldType)[keyof typeof FilterFieldType];
/** Combines filters either as an intersection (`AND`) or union (`OR`). */
export declare const FilteringMode: {
    readonly Intersect: "AND";
    readonly Union: "OR";
};
export type FilteringMode = QueryKitFilteringMode;
/** Operators emitted for number, enum and select filter values. */
export declare const FilteringFieldOperator: {
    readonly In: "in";
    readonly NotIn: "notIn";
    readonly Equals: "equals";
    readonly NotEquals: "not";
    readonly LessThan: "lt";
    readonly LessThanOrEqual: "lte";
    readonly GreaterThan: "gt";
    readonly GreaterThanOrEqual: "gte";
};
export type FilteringFieldOperator = QueryKitFilteringFieldOperator;
/** Shared metadata for a selectable filter field. */
export type FilterFieldBase = FilterFieldDefinition<FilterFieldType, {
    disabled?: boolean;
}>;
/** Boolean filter field, initialized with `true`. */
export type FilterFieldBoolean = FilterFieldBase & {
    type: typeof FilterFieldType.Boolean;
};
/** Numeric filter field, initialized with equality and `0`. */
export type FilterFieldNumber = FilterFieldBase & {
    type: typeof FilterFieldType.Number;
};
/** A labelled option for enum-style filters. */
export type FilterChoice = {
    value: string | number;
    label: string;
};
/** Enum filter field with optional replacement editor component. */
export type FilterFieldEnum = FilterFieldBase & {
    type: typeof FilterFieldType.Enum;
    values: FilterChoice[];
    component?: Component;
};
/** Select filter field with a consumer-provided editor component. */
export type FilterFieldSelect = FilterFieldBase & {
    type: typeof FilterFieldType.Select;
    component: Component;
};
/** Union of every filter-field definition accepted by the control. */
export type FilterField = FilterFieldBoolean | FilterFieldNumber | FilterFieldEnum | FilterFieldSelect;
/** A single Query Kit-compatible filtering instruction. */
export type FilteringField = QueryKitFilteringField<FilterFieldType, FilteringFieldOperator, string | number | boolean | Array<string | number>>;
/** Filtering state emitted by `QTableFiltering`. */
export type Filtering = QueryKitFilteringState<FilteringField>;
/** A displayable table column and its visibility constraints. */
export type ColumnDefinition = {
    id: string;
    header: string;
    enableHiding?: boolean;
    disabled?: boolean;
};
/** IDs pinned at the beginning or end of a table. */
export type ColumnPinning = {
    left?: string[];
    right?: string[];
};
