<template>
  <USelect
    class="w-16"
    size="sm"
    value-key="value"
    :model-value="filter.operator"
    :items="operators"
    @update:model-value="(operator: string) => update({ operator: operator as FilteringFieldOperator })"
  />
  <UInputNumber
    class="w-28"
    size="sm"
    :model-value="Number(filter.value)"
    @update:model-value="(value: number | undefined) => update({ value: value ?? undefined })"
  />
</template>

<script setup lang="ts">
import { FilteringFieldOperator, type FilteringField } from '../../../../types/table';

defineProps<{
  filter: FilteringField;
  update: (patch: Partial<FilteringField>) => void;
}>();
const operators = [
  { value: FilteringFieldOperator.Equals, label: '=' },
  { value: FilteringFieldOperator.NotEquals, label: '≠' },
  { value: FilteringFieldOperator.GreaterThan, label: '>' },
  { value: FilteringFieldOperator.GreaterThanOrEqual, label: '≥' },
  { value: FilteringFieldOperator.LessThan, label: '<' },
  { value: FilteringFieldOperator.LessThanOrEqual, label: '≤' },
];
</script>
