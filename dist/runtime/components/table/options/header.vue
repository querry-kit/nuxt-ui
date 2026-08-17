<template>
  <div class="mb-4 flex items-center gap-2">
    <UIcon :name="icon('options.header')" />
    {{ t("options.title") }}
  </div>
</template>

<script setup>
import { useTableI18n } from "../../../composables/use-table-i18n";
import { useTableIcons } from "../../../composables/use-table-icons";
const props = defineProps({
  texts: { type: null, required: false },
  icons: { type: null, required: false }
});
const t = useTableI18n(props.texts);
const icon = useTableIcons(props.icons);
</script>
