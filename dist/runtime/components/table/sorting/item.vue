<template>
  <span class="text-muted grow truncate text-sm">{{ label }}</span>
  <UButton
    color="neutral"
    size="sm"
    variant="soft"
    :aria-label="t('sorting.toggle')"
    :icon="sort.desc ? 'i-tabler-sort-descending' : 'i-tabler-sort-ascending'"
    @click="toggleDirection"
  />
  <UButton
    color="error"
    icon="i-tabler-x"
    size="sm"
    variant="outline"
    :aria-label="t('sorting.remove')"
    @click="remove"
  />
</template>

<script setup>
import { computed } from "vue";
import { useTableI18n } from "../../../composables/use-table-i18n";
const props = defineProps({
  sort: { type: null, required: true },
  fields: { type: Array, required: true },
  texts: { type: null, required: false },
  remove: { type: Function, required: true },
  toggleDirection: { type: Function, required: true }
});
const t = useTableI18n(props.texts);
const label = computed(() => props.fields.find((field) => field.value === props.sort.id)?.label ?? props.sort.id);
</script>
