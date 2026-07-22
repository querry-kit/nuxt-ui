<template>
  <UPopover v-model:open="open" :content="{ align: 'start', side: 'bottom', sideOffset: 8 }" :modal="false">
    <slot name="trigger" :open="open" :toggle="toggle" :active="hasFilters">
      <UButton
        variant="ghost"
        :aria-label="t('filtering.title', 'Filter')"
        :color="hasFilters ? 'primary' : 'neutral'"
        :icon="icon"
        @click="toggle"
      />
    </slot>
    <template #content>
      <div class="min-w-80 p-2.5" :class="ui?.content">
        <slot name="header" :filtering="filtering" :clear="clear" :toggle-mode="toggleMode">
          <div class="mb-4 flex items-center justify-between gap-2">
            <span class="flex items-center gap-2"
              ><UIcon name="i-tabler-filter-2" />{{ t('filtering.title', 'Filter') }}</span
            >
            <div class="flex gap-1">
              <UButton
                color="neutral"
                size="xs"
                variant="outline"
                :aria-label="t('filtering.mode', 'Toggle filter mode')"
                :icon="
                  filtering.operator === FilteringMode.Intersect
                    ? 'i-tabler-layers-intersect-2'
                    : 'i-tabler-layers-union'
                "
                @click="toggleMode"
              />
              <UButton
                v-if="hasFilters"
                color="error"
                icon="i-tabler-cancel"
                size="xs"
                variant="outline"
                :aria-label="t('filtering.clear', 'Clear filters')"
                @click="clear"
              />
            </div>
          </div>
        </slot>
        <slot name="items" :filters="filtering.filters" :remove="remove" :update="update">
          <ul v-if="hasFilters" class="flex flex-col gap-2">
            <li v-for="filter in filtering.filters" :key="filter.id" class="flex items-center gap-2">
              <span class="text-muted grow truncate text-sm">{{ fieldFor(filter.field)?.label ?? filter.field }}</span>
              <slot
                name="item"
                :filter="filter"
                :field="fieldFor(filter.field)"
                :remove="() => remove(filter.id)"
                :update="(patch: Partial<FilteringField>) => update(filter.id, patch)"
              >
                <UCheckbox
                  v-if="filter.type === FilterFieldType.Boolean"
                  :model-value="Boolean(filter.value)"
                  @update:model-value="(value: boolean) => update(filter.id, { value: Boolean(value) })"
                />
                <template v-else-if="filter.type === FilterFieldType.Number">
                  <USelect
                    class="w-16"
                    size="sm"
                    value-key="value"
                    :model-value="filter.operator"
                    :items="numberOperators"
                    @update:model-value="
                      (operator: string) => update(filter.id, { operator: operator as FilteringFieldOperator })
                    "
                  />
                  <UInputNumber
                    class="w-28"
                    size="sm"
                    :model-value="Number(filter.value)"
                    @update:model-value="
                      (value: number | undefined) => update(filter.id, { value: value ?? undefined })
                    "
                  />
                </template>
                <template v-else>
                  <USelect
                    class="w-16"
                    size="sm"
                    value-key="value"
                    :model-value="filter.operator"
                    :items="setOperators"
                    @update:model-value="
                      (operator: string) => update(filter.id, { operator: operator as FilteringFieldOperator })
                    "
                  />
                  <component
                    :is="(fieldFor(filter.field) as FilterFieldSelect).component"
                    v-if="fieldFor(filter.field)?.type === FilterFieldType.Select"
                    class="w-48"
                    size="sm"
                    :model-value="filter.value"
                    multiple
                    @update:model-value="(value: string[] | number[]) => update(filter.id, { value })"
                  />
                  <component
                    :is="(fieldFor(filter.field) as FilterFieldEnum).component"
                    v-else-if="(fieldFor(filter.field) as FilterFieldEnum | undefined)?.component"
                    class="w-48"
                    size="sm"
                    :model-value="filter.value"
                    multiple
                    @update:model-value="(value: string[] | number[]) => update(filter.id, { value })"
                  />
                  <USelectMenu
                    v-else
                    class="w-48"
                    label-key="label"
                    size="sm"
                    value-key="value"
                    :model-value="filter.value"
                    :items="(fieldFor(filter.field) as FilterFieldEnum | undefined)?.values ?? []"
                    multiple
                    @update:model-value="(value: string[] | number[]) => update(filter.id, { value })"
                  />
                </template>
                <UButton
                  color="error"
                  icon="i-tabler-x"
                  size="sm"
                  variant="outline"
                  :aria-label="t('filtering.remove', 'Remove filter')"
                  @click="remove(filter.id)"
                />
              </slot>
            </li>
          </ul>
        </slot>
        <USeparator v-if="hasFilters" class="my-2" />
        <slot name="add" :fields="availableFields" :add="add">
          <div class="flex gap-2">
            <USelect
              v-model="selected"
              class="w-full"
              size="sm"
              value-key="value"
              :items="availableFields"
              :placeholder="t('filtering.field', 'Select field')"
            /><UButton
              icon="i-tabler-plus"
              size="sm"
              :aria-label="t('filtering.add', 'Add filter')"
              :disabled="!selected"
              @click="addSelected"
            />
          </div>
        </slot>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useTableI18n } from '../composables/use-table-i18n';
import {
  FilterFieldType,
  FilteringFieldOperator,
  FilteringMode,
  type FilterField,
  type FilterFieldEnum,
  type FilterFieldSelect,
  type Filtering,
  type FilteringField,
} from '../types/table';
import { createFilter } from '../utils/filtering';
import { canHandleTableShortcut } from '../utils/keyboard';

const props = withDefaults(
  defineProps<{ fields: FilterField[]; icon?: string; shortcuts?: boolean; ui?: { content?: string } }>(),
  { icon: 'i-tabler-filter', shortcuts: true },
);
const filtering = defineModel<Filtering>('filtering', { required: true });
const open = ref(false);
const selected = ref<string>();
const t = useTableI18n();
const hasFilters = computed(() => filtering.value.filters.length > 0);
const availableFields = computed(() => props.fields.filter((field) => !field.disabled));
const numberOperators = [
  { value: FilteringFieldOperator.Equals, label: '=' },
  { value: FilteringFieldOperator.NotEquals, label: '≠' },
  { value: FilteringFieldOperator.GreaterThan, label: '>' },
  { value: FilteringFieldOperator.GreaterThanOrEqual, label: '≥' },
  { value: FilteringFieldOperator.LessThan, label: '<' },
  { value: FilteringFieldOperator.LessThanOrEqual, label: '≤' },
];
const setOperators = [
  { value: FilteringFieldOperator.In, label: '∈' },
  { value: FilteringFieldOperator.NotIn, label: '∉' },
];
const fieldFor = (id: string) => props.fields.find((field) => field.value === id);
const toggle = () => (open.value = !open.value);
const clear = () => (filtering.value = { operator: FilteringMode.Intersect, filters: [] });
const toggleMode = () =>
  (filtering.value = {
    ...filtering.value,
    operator: filtering.value.operator === FilteringMode.Intersect ? FilteringMode.Union : FilteringMode.Intersect,
  });
const add = (id: string) => {
  const field = fieldFor(id);
  if (field) filtering.value = { ...filtering.value, filters: [...filtering.value.filters, createFilter(field)] };
};
const addSelected = () => {
  if (selected.value) add(selected.value);
  selected.value = undefined;
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
