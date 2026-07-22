<template>
  <div class="mb-4 flex items-center justify-between gap-2">
    <span class="flex items-center gap-2">
      <UIcon name="i-tabler-arrows-sort" />
      {{ t('sorting.title') }}
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

<script setup lang="ts">
import { useTableI18n } from '../../../composables/use-table-i18n';
import type { TableTextOverrides } from '../../../texts';

const props = defineProps<{
  hasSorting: boolean;
  texts?: TableTextOverrides;
  clear: () => void;
}>();
const t = useTableI18n(props.texts);
</script>
