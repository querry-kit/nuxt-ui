<template>
  <USelect
    class="w-24"
    size="sm"
    value-key="value"
    :aria-label="t('pagination.pageSize')"
    :model-value="itemsPerPage"
    :items="items"
    @update:model-value="(value) => setItemsPerPage(Number(value))"
  />
</template>

<script setup>
import { useTableI18n } from "../../../composables/use-table-i18n";
const props = defineProps({
  itemsPerPage: { type: Number, required: true },
  texts: { type: null, required: false },
  items: { type: Array, required: true },
  setItemsPerPage: { type: Function, required: true }
});
const t = useTableI18n(() => props.texts);
</script>
