import type { Component } from 'vue';

export type SortingState = Array<{ id: string; desc: boolean }>;
export type SortingField = { value: string; label: string; disabled?: boolean };

export enum FilterFieldType {
  Boolean = 'boolean',
  Number = 'number',
  Enum = 'enum',
  Select = 'select',
}

export enum FilteringMode {
  Intersect = 'AND',
  Union = 'OR',
}
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

export type FilterFieldBase = { value: string; label: string; disabled?: boolean };
export type FilterFieldBoolean = FilterFieldBase & { type: FilterFieldType.Boolean };
export type FilterFieldNumber = FilterFieldBase & { type: FilterFieldType.Number };
export type FilterChoice = { value: string | number; label: string };
export type FilterFieldEnum = FilterFieldBase & {
  type: FilterFieldType.Enum;
  values: FilterChoice[];
  component?: Component;
};
export type FilterFieldSelect = FilterFieldBase & { type: FilterFieldType.Select; component: Component };
export type FilterField = FilterFieldBoolean | FilterFieldNumber | FilterFieldEnum | FilterFieldSelect;
export type FilteringField = {
  id: string;
  field: string;
  type: FilterFieldType;
  operator?: FilteringFieldOperator;
  value?: string | number | boolean | Array<string | number>;
};
export type Filtering = { operator: FilteringMode; filters: FilteringField[] };
export type ColumnDefinition = { id: string; header: string; enableHiding?: boolean; disabled?: boolean };
export type ColumnPinning = { left?: string[]; right?: string[] };
