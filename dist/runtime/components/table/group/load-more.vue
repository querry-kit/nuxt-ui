<template>
  <slot v-if="hasMore || error" :has-more="hasMore" :loading="loading" :error="error" :load="load" :attrs="$attrs">
    <UButton
      size="sm"
      v-bind="$attrs"
      variant="ghost"
      :loading="loading"
      :disabled="loading"
      :label="t(error ? 'grouping.retry' : 'grouping.loadMore')"
      @click="load"
    />
  </slot>
</template>

<script setup>
import { useTableI18n } from "../../../composables/use-table-i18n";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  hasMore: { type: Boolean, required: true },
  loading: { type: Boolean, required: false },
  error: { type: null, required: false },
  texts: { type: null, required: false }
});
const emit = defineEmits(["load"]);
const load = () => emit("load");
const t = useTableI18n(() => props.texts);
</script>
