<template>
  <USelect
    class="w-16"
    size="sm"
    value-key="value"
    :aria-label="label ?? filter.field"
    :model-value="filter.operator"
    :items="operators"
    @update:model-value="(operator: string) => update({ operator: operator as FilteringFieldOperator })"
  />
  <component
    :is="field?.component"
    class="qk-table-filtering-value"
    size="sm"
    :aria-label="label ?? filter.field"
    :model-value="filter.value"
    multiple
    @update:model-value="(value: string[] | number[]) => update({ value })"
  />
</template>

<script setup lang="ts">
import { FilteringFieldOperator, type FilterFieldSelect, type FilteringField } from '../../../../types/table';

defineProps<{
  filter: FilteringField;
  label?: string;
  field?: FilterFieldSelect;
  update: (patch: Partial<FilteringField>) => void;
}>();
const operators = [
  { value: FilteringFieldOperator.In, label: '∈' },
  { value: FilteringFieldOperator.NotIn, label: '∉' },
];
</script>
