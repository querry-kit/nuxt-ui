<template>
  <USelect
    class="w-16"
    size="sm"
    value-key="value"
    :model-value="filter.operator"
    :items="operators"
    @update:model-value="(operator: string) => update({ operator: operator as FilteringFieldOperator })"
  />
  <component
    :is="field?.component"
    v-if="field?.component"
    class="w-48"
    size="sm"
    :model-value="filter.value"
    multiple
    @update:model-value="(value: string[] | number[]) => update({ value })"
  />
  <USelectMenu
    v-else
    class="w-48"
    label-key="label"
    size="sm"
    value-key="value"
    :model-value="filter.value"
    :items="field?.values ?? []"
    multiple
    @update:model-value="(value: string[] | number[]) => update({ value })"
  />
</template>

<script setup lang="ts">
import { FilteringFieldOperator, type FilterFieldEnum, type FilteringField } from '../../../../types/table';

defineProps<{
  filter: FilteringField;
  field?: FilterFieldEnum;
  update: (patch: Partial<FilteringField>) => void;
}>();
const operators = [
  { value: FilteringFieldOperator.In, label: '∈' },
  { value: FilteringFieldOperator.NotIn, label: '∉' },
];
</script>
