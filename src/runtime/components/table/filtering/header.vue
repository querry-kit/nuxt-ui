<template>
  <div class="mb-4 flex items-center justify-between gap-2">
    <span class="flex items-center gap-2">
      <UIcon name="i-tabler-filter-2" />
      {{ t('filtering.title') }}
    </span>
    <div class="flex gap-1">
      <UButton
        color="neutral"
        size="xs"
        variant="outline"
        :aria-label="t('filtering.mode')"
        :icon="filtering.operator === FilteringMode.Intersect ? 'i-tabler-layers-intersect-2' : 'i-tabler-layers-union'"
        @click="toggleMode"
      />
      <UButton
        v-if="hasFilters"
        color="error"
        icon="i-tabler-cancel"
        size="xs"
        variant="outline"
        :aria-label="t('filtering.clear')"
        @click="clear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTableI18n } from '../../../composables/use-table-i18n';
import type { TableTextOverrides } from '../../../texts';
import { FilteringMode, type Filtering } from '../../../types/table';

const props = defineProps<{
  filtering: Filtering;
  hasFilters: boolean;
  texts?: TableTextOverrides;
  clear: () => void;
  toggleMode: () => void;
}>();
const t = useTableI18n(props.texts);
</script>
