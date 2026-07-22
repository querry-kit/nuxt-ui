<template>
  <span class="text-muted grow truncate text-sm">{{ field?.label ?? filter.field }}</span>
  <FilteringItemBoolean v-if="filter.type === FilterFieldType.Boolean" :filter="filter" :update="update" />
  <FilteringItemNumber v-else-if="filter.type === FilterFieldType.Number" :filter="filter" :update="update" />
  <FilteringItemSelect
    v-else-if="field?.type === FilterFieldType.Select"
    :filter="filter"
    :field="field as FilterFieldSelect | undefined"
    :update="update"
  />
  <FilteringItemEnum v-else :filter="filter" :field="field as FilterFieldEnum | undefined" :update="update" />
  <UButton
    color="error"
    icon="i-tabler-x"
    size="sm"
    variant="outline"
    :aria-label="t('filtering.remove')"
    @click="remove"
  />
</template>

<script setup lang="ts">
import { useTableI18n } from '../../../../composables/use-table-i18n';
import type { TableTextOverrides } from '../../../../texts';
import {
  FilterFieldType,
  type FilterField,
  type FilterFieldEnum,
  type FilterFieldSelect,
  type FilteringField,
} from '../../../../types/table';
import FilteringItemBoolean from './boolean.vue';
import FilteringItemEnum from './enum.vue';
import FilteringItemNumber from './number.vue';
import FilteringItemSelect from './select.vue';

const props = defineProps<{
  filter: FilteringField;
  field?: FilterField;
  texts?: TableTextOverrides;
  remove: () => void;
  update: (patch: Partial<FilteringField>) => void;
}>();
const t = useTableI18n(props.texts);
</script>
