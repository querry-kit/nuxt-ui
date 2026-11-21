<template>
  <USelectMenu
    v-bind="$attrs"
    v-model:search-term="search"
    value-key="value"
    label-key="label"
    :model-value="selection"
    :placeholder="t('filtering.lookupPlaceholder')"
    :items="items"
    :loading="results.loading.value || selected.loading.value"
    multiple
    ignore-filter
    @update:model-value="update"
  />
  <span v-if="results.error.value || selected.error.value" role="status" class="text-error text-sm">
    {{ t("filtering.lookupError") }}
  </span>
</template>

<script setup>
import { refDebounced } from "@vueuse/core";
import { computed, onMounted, ref, shallowRef, watch } from "vue";
import { useTableI18n } from "../../../composables/use-table-i18n";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  source: { type: Object, required: true },
  maxSelections: { type: Number, required: false },
  texts: { type: null, required: false }
});
const selection = defineModel({ type: Array, ...{ required: true } });
const search = ref("");
const t = useTableI18n(props.texts);
function load(input, request) {
  const options = shallowRef([]);
  const loading = ref(false);
  const error = ref(false);
  onMounted(
    () => watch(
      [input, () => props.source],
      async ([value, source], _, onCleanup) => {
        let current = true;
        onCleanup(() => current = false);
        loading.value = true;
        error.value = false;
        try {
          const choices = await request(source, value);
          if (current) options.value = choices;
        } catch {
          if (current) {
            options.value = [];
            error.value = true;
          }
        } finally {
          if (current) loading.value = false;
        }
      },
      { immediate: true }
    )
  );
  return { options, loading, error };
}
const results = load(refDebounced(search, 250), (source, term) => source.search(term));
const selected = load(selection, (source, ids) => ids.length ? source.resolve(ids) : []);
const limit = computed(() => props.maxSelections ?? Infinity);
const items = computed(() => {
  const byValue = /* @__PURE__ */ new Map();
  const selectedValues = new Set(selection.value);
  for (const option of [...selected.options.value, ...results.options.value]) byValue.set(option.value, option);
  return [...byValue.values()].map((option) => ({
    ...option,
    disabled: selection.value.length >= limit.value && !selectedValues.has(option.value)
  }));
});
function update(values) {
  if (values.length <= limit.value || values.length < selection.value.length) selection.value = values;
}
</script>
