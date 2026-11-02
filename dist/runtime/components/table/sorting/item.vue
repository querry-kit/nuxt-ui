<template>
  <li class="group flex items-center gap-2">
    <UIcon v-if="showDragHandle" class="drag-handle text-dimmed shrink-0 cursor-grab" :name="icon('options.drag')" />
    <span class="text-muted grow truncate text-sm">{{ label }}</span>
    <UTooltip :text="t('sorting.toggle')">
      <UButton
        color="neutral"
        size="sm"
        variant="soft"
        :icon="sort.desc ? icon('sorting.descending') : icon('sorting.ascending')"
        :aria-label="t('sorting.toggle')"
        @click="toggleDirection"
      />
    </UTooltip>
    <UTooltip :text="t('sorting.remove')">
      <UButton
        color="error"
        size="sm"
        variant="outline"
        :icon="icon('sorting.remove')"
        :aria-label="t('sorting.remove')"
        @click="remove"
      />
    </UTooltip>
  </li>
</template>

<script setup>
import { computed } from "vue";
import { useTableI18n } from "../../../composables/use-table-i18n";
import { useTableIcons } from "../../../composables/use-table-icons";
const props = defineProps({
  sort: { type: null, required: true },
  fields: { type: Array, required: true },
  texts: { type: null, required: false },
  icons: { type: null, required: false },
  remove: { type: Function, required: true },
  toggleDirection: { type: Function, required: true },
  showDragHandle: { type: Boolean, required: true }
});
const t = useTableI18n(props.texts);
const icon = useTableIcons(props.icons);
const label = computed(() => props.fields.find((field) => field.value === props.sort.id)?.label ?? props.sort.id);
</script>
