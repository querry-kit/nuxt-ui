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

<script setup lang="ts">
import { ref } from 'vue';
import { useTableI18n } from '../../../composables/use-table-i18n';
import type { TableTextOverrides } from '../../../texts';
import type { FilterField } from '../../../types/table';

const props = defineProps<{
  fields: FilterField[];
  texts?: TableTextOverrides;
  add: (id: string) => void;
}>();
const t = useTableI18n(props.texts);
const selected = ref<string>();
const addSelected = () => {
  if (selected.value) props.add(selected.value);
  selected.value = undefined;
};
</script>
