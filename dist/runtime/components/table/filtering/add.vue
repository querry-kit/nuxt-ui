<template>
  <div class="flex gap-2">
    <USelect
      v-model="selected"
      class="w-full"
      size="sm"
      value-key="value"
      :items="fields"
      :placeholder="t('filtering.field')"
    />
    <UButton
      icon="i-tabler-plus"
      size="sm"
      :aria-label="t('filtering.add')"
      :disabled="!selected"
      @click="addSelected"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTableI18n } from "../../../composables/use-table-i18n";
const props = defineProps({
  fields: { type: Array, required: true },
  texts: { type: null, required: false },
  add: { type: Function, required: true }
});
const t = useTableI18n(props.texts);
const selected = ref();
const addSelected = () => {
  if (selected.value) props.add(selected.value);
  selected.value = void 0;
};
</script>
