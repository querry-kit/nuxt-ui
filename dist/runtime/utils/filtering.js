import { FilterFieldType, FilteringFieldOperator } from "../types/table.js";
export function createFilter(field) {
  const id = globalThis.crypto?.randomUUID?.() ?? `${field.value}-${Date.now()}`;
  const base = { id, field: field.value, type: field.type };
  if (field.type === FilterFieldType.Boolean) return { ...base, value: true };
  if (field.type === FilterFieldType.Number) return { ...base, operator: FilteringFieldOperator.Equals, value: 0 };
  return { ...base, operator: FilteringFieldOperator.In, value: [] };
}
