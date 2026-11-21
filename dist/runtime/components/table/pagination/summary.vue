<template>
  <span v-if="totalItems" class="text-muted hidden text-sm sm:block">
    {{
      summary ?? t("pagination.summary", {
  start: formatNumber(start),
  end: formatNumber(end),
  total: formatNumber(totalItems)
})
    }}
  </span>
</template>

<script setup>
import { useTableI18n, useTableNumber } from "../../../composables/use-table-i18n";
const props = defineProps({
  totalItems: { type: Number, required: true },
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  summary: { type: String, required: false },
  texts: { type: null, required: false }
});
const formatNumber = useTableNumber();
const t = useTableI18n(() => props.texts);
</script>
