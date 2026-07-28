<template>
  <span class="text-muted grow truncate text-sm">{{ field?.label ?? filter.field }}</span>
  <FilteringItemBoolean v-if="filter.type === FilterFieldType.Boolean" :filter="filter" :update="update" />
  <FilteringItemNumber v-else-if="filter.type === FilterFieldType.Number" :filter="filter" :update="update" />
  <FilteringItemSelect
    v-else-if="field?.type === FilterFieldType.Select"
    :filter="filter"
    :field="field"
    :update="update"
  />
  <FilteringItemEnum v-else :filter="filter" :field="field" :update="update" />
  <UButton
    color="error"
    icon="i-tabler-x"
    size="sm"
    variant="outline"
    :aria-label="t('filtering.remove')"
    @click="remove"
  />
</template>

<script setup>
import { useTableI18n } from "../../../../composables/use-table-i18n";
import {
  FilterFieldType
} from "../../../../types/table";
import FilteringItemBoolean from "./boolean.vue";
import FilteringItemEnum from "./enum.vue";
import FilteringItemNumber from "./number.vue";
import FilteringItemSelect from "./select.vue";
const props = defineProps({
  filter: { type: Object, required: true },
  field: { type: Object, required: false },
  texts: { type: null, required: false },
  remove: { type: Function, required: true },
  update: { type: Function, required: true }
});
const t = useTableI18n(props.texts);
</script>
