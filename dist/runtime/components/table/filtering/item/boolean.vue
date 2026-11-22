<template>
  <UCheckbox
    :aria-label="t('filtering.valueField', { field: label ?? filter.field })"
    :model-value="Boolean(filter.value)"
    @update:model-value="(value) => update({ value: Boolean(value) })"
  />
</template>

<script setup>
import { useTableI18n } from "../../../../composables/use-table-i18n";
const props = defineProps({
  filter: { type: Object, required: true },
  label: { type: String, required: false },
  texts: { type: null, required: false },
  update: { type: Function, required: true }
});
const t = useTableI18n(() => props.texts);
</script>
