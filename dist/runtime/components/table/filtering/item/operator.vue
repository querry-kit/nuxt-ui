<template>
  <USelect
    class="w-16"
    size="sm"
    value-key="value"
    :aria-label="t('filtering.operatorField', { field: label ?? filter.field })"
    :aria-description="description"
    :model-value="filter.operator"
    :items="operators"
    @update:model-value="(operator) => update({ operator })"
  />
</template>

<script setup>
import { computed } from "vue";
import { useTableI18n } from "../../../../composables/use-table-i18n";
const props = defineProps({
  filter: { type: Object, required: true },
  label: { type: String, required: false },
  texts: { type: null, required: false },
  comparison: { type: Boolean, required: true },
  update: { type: Function, required: true }
});
const choices = ["in", "notIn"];
const comparisons = ["equals", "not", "gt", "gte", "lt", "lte"];
const t = useTableI18n(() => props.texts);
const operators = computed(
  () => (props.comparison ? comparisons : choices).map((value) => ({
    value,
    label: t(`filtering.operators.${value}`)
  }))
);
const description = computed(() => {
  const value = operators.value.find((item) => item.value === props.filter.operator)?.value;
  return value && t(`filtering.operatorDescriptions.${value}`);
});
</script>
