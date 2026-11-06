<template>
  <UButton
    v-if="hasMore || error"
    variant="ghost"
    :loading="loading"
    :disabled="loading"
    :label="t(error ? 'grouping.retry' : 'grouping.loadMore')"
    @click="emit('load')"
  />
</template>

<script setup lang="ts">
import { useTableI18n } from '../../../composables/use-table-i18n';
import type { TableTextOverrides } from '../../../texts';

/** Load-more/retry action for either child groups or leaf records. */
const props = defineProps<{ hasMore: boolean; loading?: boolean; error?: unknown; texts?: TableTextOverrides }>();
const emit = defineEmits<{ load: [] }>();
const t = useTableI18n(props.texts);
</script>
