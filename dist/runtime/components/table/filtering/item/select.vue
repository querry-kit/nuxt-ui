<template>
  <USelect
    class="w-16"
    size="sm"
    value-key="value"
    :model-value="filter.operator"
    :items="operators"
    @update:model-value="(operator) => update({ operator })"
  />
  <component
    :is="field?.component"
    class="w-48"
    size="sm"
    :model-value="filter.value"
    multiple
    @update:model-value="(value) => update({ value })"
  />
</template>

<script setup>
import { FilteringFieldOperator } from "../../../../types/table";
defineProps({
  filter: { type: Object, required: true },
  field: { type: Object, required: false },
  update: { type: Function, required: true }
});
const operators = [
  { value: FilteringFieldOperator.In, label: "\u2208" },
  { value: FilteringFieldOperator.NotIn, label: "\u2209" }
];
</script>
