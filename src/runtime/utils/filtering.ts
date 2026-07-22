import { FilterFieldType, FilteringFieldOperator, type FilterField, type FilteringField } from '../types/table';

export function createFilter(field: FilterField): FilteringField {
  const id = globalThis.crypto?.randomUUID?.() ?? `${field.value}-${Date.now()}`;
  const base = { id, field: field.value, type: field.type };
  if (field.type === FilterFieldType.Boolean) return { ...base, value: true };
  if (field.type === FilterFieldType.Number) return { ...base, operator: FilteringFieldOperator.Equals, value: 0 };
  return { ...base, operator: FilteringFieldOperator.In, value: [] };
}
