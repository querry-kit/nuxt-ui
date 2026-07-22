import type { Component } from 'vue';

/** Ordered sort instructions; `desc: false` represents ascending order. */
export type SortingState = Array<{ id: string; desc: boolean }>;
/** A selectable field in the sorting control. */
export type SortingField = { value: string; label: string; disabled?: boolean };

/** Editor variants supported by the filtering control. */
export enum FilterFieldType {
  Boolean = 'boolean',
  Number = 'number',
  Enum = 'enum',
  Select = 'select',
}

/** Combines filters either as an intersection (`AND`) or union (`OR`). */
export enum FilteringMode {
  Intersect = 'AND',
  Union = 'OR',
}
/** Operators emitted for number, enum and select filter values. */
export enum FilteringFieldOperator {
  In = 'in',
  NotIn = 'notIn',
  Equals = 'equals',
  NotEquals = 'not',
  LessThan = 'lt',
  LessThanOrEqual = 'lte',
  GreaterThan = 'gt',
  GreaterThanOrEqual = 'gte',
}

/** Shared metadata for a selectable filter field. */
export type FilterFieldBase = { value: string; label: string; disabled?: boolean };
/** Boolean filter field, initialized with `true`. */
export type FilterFieldBoolean = FilterFieldBase & { type: FilterFieldType.Boolean };
/** Numeric filter field, initialized with equality and `0`. */
export type FilterFieldNumber = FilterFieldBase & { type: FilterFieldType.Number };
/** A labelled option for enum-style filters. */
export type FilterChoice = { value: string | number; label: string };
/** Enum filter field with optional replacement editor component. */
export type FilterFieldEnum = FilterFieldBase & {
  type: FilterFieldType.Enum;
  values: FilterChoice[];
  component?: Component;
};
/** Select filter field with a consumer-provided editor component. */
export type FilterFieldSelect = FilterFieldBase & { type: FilterFieldType.Select; component: Component };
/** Union of every filter-field definition accepted by the control. */
export type FilterField = FilterFieldBoolean | FilterFieldNumber | FilterFieldEnum | FilterFieldSelect;
/** A single Query Kit-compatible filtering instruction. */
export type FilteringField = {
  id: string;
  field: string;
  type: FilterFieldType;
  operator?: FilteringFieldOperator;
  value?: string | number | boolean | Array<string | number>;
};
/** Filtering state emitted by `QuerryKitTableFiltering`. */
export type Filtering = { operator: FilteringMode; filters: FilteringField[] };
/** A displayable table column and its visibility constraints. */
export type ColumnDefinition = { id: string; header: string; enableHiding?: boolean; disabled?: boolean };
/** IDs pinned at the beginning or end of a table. */
export type ColumnPinning = { left?: string[]; right?: string[] };
