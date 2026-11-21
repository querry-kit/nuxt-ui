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

<script setup>
import { useTableI18n } from "../../../composables/use-table-i18n";
const props = defineProps({
  hasMore: { type: Boolean, required: true },
  loading: { type: Boolean, required: false },
  error: { type: null, required: false },
  texts: { type: null, required: false }
});
const emit = defineEmits(["load"]);
const t = useTableI18n(props.texts);
</script>
