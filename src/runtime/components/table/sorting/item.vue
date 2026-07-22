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

<script setup lang="ts">
import { computed } from 'vue';
import { useTableI18n } from '../../../composables/use-table-i18n';
import type { TableTextOverrides } from '../../../texts';
import type { SortingField, SortingState } from '../../../types/table';

const props = defineProps<{
  sort: SortingState[number];
  fields: SortingField[];
  texts?: TableTextOverrides;
  remove: () => void;
  toggleDirection: () => void;
}>();
const t = useTableI18n(props.texts);
const label = computed(() => props.fields.find((field) => field.value === props.sort.id)?.label ?? props.sort.id);
</script>
