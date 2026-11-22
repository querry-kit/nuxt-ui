<template>
  <FilteringOperator :filter="filter" :label="label" :texts="texts" :comparison="true" :update="update" />
  <UInputNumber
    class="w-28"
    size="sm"
    :aria-label="t('filtering.valueField', { field: label ?? filter.field })"
    :model-value="Number(filter.value)"
    @update:model-value="(value) => update({ value: value ?? void 0 })"
  />
</template>

<script setup>
import {} from "../../../../types/table";
import { useTableI18n } from "../../../../composables/use-table-i18n";
import FilteringOperator from "./operator.vue";
const props = defineProps({
  filter: { type: Object, required: true },
  label: { type: String, required: false },
  texts: { type: null, required: false },
  update: { type: Function, required: true }
});
const t = useTableI18n(() => props.texts);
</script>
