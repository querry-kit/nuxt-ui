<template>
  <USelect
    class="w-16"
    size="sm"
    value-key="value"
    :model-value="filter.operator"
    :items="operators"
    @update:model-value="(operator) => update({ operator })"
  />
  <UInputNumber
    class="w-28"
    size="sm"
    :model-value="Number(filter.value)"
    @update:model-value="(value) => update({ value: value ?? void 0 })"
  />
</template>

<script setup>
import { FilteringFieldOperator } from "../../../../types/table";
defineProps({
  filter: { type: Object, required: true },
  update: { type: Function, required: true }
});
const operators = [
  { value: FilteringFieldOperator.Equals, label: "=" },
  { value: FilteringFieldOperator.NotEquals, label: "\u2260" },
  { value: FilteringFieldOperator.GreaterThan, label: ">" },
  { value: FilteringFieldOperator.GreaterThanOrEqual, label: "\u2265" },
  { value: FilteringFieldOperator.LessThan, label: "<" },
  { value: FilteringFieldOperator.LessThanOrEqual, label: "\u2264" }
];
</script>
