<template>
  <span v-if="totalItems" class="text-muted hidden text-sm sm:block">
    {{
      summary ??
      t('pagination.summary', {
        start,
        end,
        total: totalItems,
      })
    }}
  </span>
</template>

<script setup lang="ts">
import { useTableI18n } from '../../../composables/use-table-i18n';
import type { TableTextOverrides } from '../../../texts';

const props = defineProps<{
  totalItems: number;
  start: number;
  end: number;
  summary?: string;
  texts?: TableTextOverrides;
}>();
const t = useTableI18n(props.texts);
</script>
