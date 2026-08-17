<template>
  <span class="text-muted grow truncate text-sm">{{ label }}</span>
  <UButton
    color="neutral"
    size="sm"
    variant="soft"
    :icon="sort.desc ? icon('sorting.descending') : icon('sorting.ascending')"
    :aria-label="t('sorting.toggle')"
    @click="toggleDirection"
  />
  <UButton
    color="error"
    size="sm"
    variant="outline"
    :icon="icon('sorting.remove')"
    :aria-label="t('sorting.remove')"
    @click="remove"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTableI18n } from '../../../composables/use-table-i18n';
import { useTableIcons } from '../../../composables/use-table-icons';
import type { TableIconOverrides } from '../../../icons';
import type { TableTextOverrides } from '../../../texts';
import type { SortingField, SortingState } from '../../../types/table';

const props = defineProps<{
  sort: SortingState[number];
  fields: SortingField[];
  texts?: TableTextOverrides;
  icons?: TableIconOverrides;
  remove: () => void;
  toggleDirection: () => void;
}>();
const t = useTableI18n(props.texts);
const icon = useTableIcons(props.icons);
const label = computed(() => props.fields.find((field) => field.value === props.sort.id)?.label ?? props.sort.id);
</script>
