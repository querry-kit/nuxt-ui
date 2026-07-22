<template>
  <span ref="trigger">
    <slot name="trigger" :open="open" :toggle="toggle" :active="hasFilters">
      <UButton
        variant="ghost"
        :aria-label="t('filtering.title')"
        :color="hasFilters ? 'primary' : 'neutral'"
        :icon="icon"
        @click="toggle"
      />
    </slot>
  </span>
  <UPopover
    v-model:open="open"
    :reference="trigger"
    :content="{ align: 'start', side: 'bottom', sideOffset: 8 }"
    :modal="false"
  >
    <template #content>
      <div class="min-w-80 p-2.5" :class="ui?.content">
        <slot name="header" :filtering="filtering" :clear="clear" :toggle-mode="toggleMode">
          <FilteringHeader
            :filtering="filtering"
            :has-filters="hasFilters"
            :texts="texts"
            :clear="clear"
            :toggle-mode="toggleMode"
          />
        </slot>
        <slot name="items" :filters="filtering.filters" :remove="remove" :update="update">
          <FilteringItems
            :filters="filtering.filters"
            :fields="fields"
            :has-filters="hasFilters"
            :remove="remove"
            :update="update"
          >
            <template #item="itemProps">
              <slot name="item" v-bind="itemProps">
                <FilteringItem
                  :filter="itemProps.filter"
                  :field="itemProps.field"
                  :texts="texts"
                  :remove="itemProps.remove"
                  :update="itemProps.update"
                />
              </slot>
            </template>
          </FilteringItems>
        </slot>
        <USeparator v-if="hasFilters" class="my-2" />
        <slot name="add" :fields="availableFields" :add="add">
          <FilteringAdd :fields="availableFields" :texts="texts" :add="add" />
        </slot>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useTableI18n } from '../../../composables/use-table-i18n';
import type { TableTextOverrides } from '../../../texts';
import { FilteringMode, type FilterField, type Filtering, type FilteringField } from '../../../types/table';
import { createFilter } from '../../../utils/filtering';
import { canHandleTableShortcut } from '../../../utils/keyboard';
import FilteringAdd from './add.vue';
import FilteringHeader from './header.vue';
import FilteringItem from './item/index.vue';
import FilteringItems from './items.vue';

const props = withDefaults(
  defineProps<{
    fields: FilterField[];
    icon?: string;
    shortcuts?: boolean;
    texts?: TableTextOverrides;
    ui?: { content?: string };
  }>(),
  { icon: 'i-tabler-filter', shortcuts: true },
);
const filtering = defineModel<Filtering>('filtering', { required: true });
const trigger = ref<HTMLElement>();
const open = ref(false);
const t = useTableI18n(props.texts);
const hasFilters = computed(() => filtering.value.filters.length > 0);
const availableFields = computed(() => props.fields.filter((field) => !field.disabled));
const toggle = () => (open.value = !open.value);
const clear = () => (filtering.value = { operator: FilteringMode.Intersect, filters: [] });
const toggleMode = () =>
  (filtering.value = {
    ...filtering.value,
    operator: filtering.value.operator === FilteringMode.Intersect ? FilteringMode.Union : FilteringMode.Intersect,
  });
const add = (id: string) => {
  const field = props.fields.find((field) => field.value === id);
  if (field) filtering.value = { ...filtering.value, filters: [...filtering.value.filters, createFilter(field)] };
};
const remove = (id: string) =>
  (filtering.value = { ...filtering.value, filters: filtering.value.filters.filter((filter) => filter.id !== id) });
const update = (id: string, patch: Partial<FilteringField>) =>
  (filtering.value = {
    ...filtering.value,
    filters: filtering.value.filters.map((filter) => (filter.id === id ? { ...filter, ...patch } : filter)),
  });
const onKeydown = (event: KeyboardEvent) => {
  if (canHandleTableShortcut(event) && props.shortcuts && event.shiftKey && event.key.toLowerCase() === 'f') {
    event.preventDefault();
    toggle();
  }
};
onMounted(() => document.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
</script>
