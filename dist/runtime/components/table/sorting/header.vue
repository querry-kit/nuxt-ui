<template>
  <div class="mb-4 flex items-center justify-between gap-2">
    <span class="flex items-center gap-2">
      <UIcon name="i-tabler-arrows-sort" />
      {{ t("sorting.title") }}
    </span>
    <UButton
      v-if="hasSorting"
      color="error"
      icon="i-tabler-cancel"
      size="xs"
      variant="outline"
      :aria-label="t('sorting.clear')"
      @click="clear"
    />
  </div>
</template>

<script setup>
import { useTableI18n } from "../../../composables/use-table-i18n";
const props = defineProps({
  hasSorting: { type: Boolean, required: true },
  texts: { type: null, required: false },
  clear: { type: Function, required: true }
});
const t = useTableI18n(props.texts);
</script>
