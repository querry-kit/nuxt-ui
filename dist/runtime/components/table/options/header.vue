<template>
  <div class="mb-4 flex items-center gap-2">
    <UIcon name="i-tabler-adjustments" />
    {{ t("options.title") }}
  </div>
</template>

<script setup>
import { useTableI18n } from "../../../composables/use-table-i18n";
const props = defineProps({
  texts: { type: null, required: false }
});
const t = useTableI18n(props.texts);
</script>
