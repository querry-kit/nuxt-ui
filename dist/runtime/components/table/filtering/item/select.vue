<template>
  <USelect
    class="w-16"
    size="sm"
    value-key="value"
    :aria-label="label ?? filter.field"
    :model-value="filter.operator"
    :items="operators"
    @update:model-value="(operator) => update({ operator })"
  />
  <component
    :is="field?.component"
    class="qk-table-filtering-value"
    size="sm"
    :aria-label="label ?? filter.field"
    :model-value="filter.value"
    multiple
    @update:model-value="(value) => update({ value })"
  />
</template>

<script setup>
import { FilteringFieldOperator } from "../../../../types/table";
defineProps({
  filter: { type: Object, required: true },
  label: { type: String, required: false },
  field: { type: Object, required: false },
  update: { type: Function, required: true }
});
const operators = [
  { value: FilteringFieldOperator.In, label: "\u2208" },
  { value: FilteringFieldOperator.NotIn, label: "\u2209" }
];
</script>
