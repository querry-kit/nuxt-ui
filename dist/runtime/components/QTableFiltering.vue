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
          <div class="mb-4 flex items-center justify-between gap-2">
            <span class="flex items-center gap-2"><UIcon name="i-tabler-filter-2" />{{ t("filtering.title") }}</span>
            <div class="flex gap-1">
              <UButton
                color="neutral"
                size="xs"
                variant="outline"
                :aria-label="t('filtering.mode')"
                :icon="
  filtering.operator === FilteringMode.Intersect ? 'i-tabler-layers-intersect-2' : 'i-tabler-layers-union'
"
                @click="toggleMode"
              />
              <UButton
                v-if="hasFilters"
                color="error"
                icon="i-tabler-cancel"
                size="xs"
                variant="outline"
                :aria-label="t('filtering.clear')"
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
                :update="(patch) => update(filter.id, patch)"
              >
                <UCheckbox
                  v-if="filter.type === FilterFieldType.Boolean"
                  :model-value="Boolean(filter.value)"
                  @update:model-value="(value) => update(filter.id, { value: Boolean(value) })"
                />
                <template v-else-if="filter.type === FilterFieldType.Number">
                  <USelect
                    class="w-16"
                    size="sm"
                    value-key="value"
                    :model-value="filter.operator"
                    :items="numberOperators"
                    @update:model-value="
  (operator) => update(filter.id, { operator })
"
                  />
                  <UInputNumber
                    class="w-28"
                    size="sm"
                    :model-value="Number(filter.value)"
                    @update:model-value="
  (value) => update(filter.id, { value: value ?? void 0 })
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
  (operator) => update(filter.id, { operator })
"
                  />
                  <component
                    :is="fieldFor(filter.field).component"
                    v-if="fieldFor(filter.field)?.type === FilterFieldType.Select"
                    class="w-48"
                    size="sm"
                    :model-value="filter.value"
                    multiple
                    @update:model-value="(value) => update(filter.id, { value })"
                  />
                  <component
                    :is="fieldFor(filter.field).component"
                    v-else-if="fieldFor(filter.field)?.component"
                    class="w-48"
                    size="sm"
                    :model-value="filter.value"
                    multiple
                    @update:model-value="(value) => update(filter.id, { value })"
                  />
                  <USelectMenu
                    v-else
                    class="w-48"
                    label-key="label"
                    size="sm"
                    value-key="value"
                    :model-value="filter.value"
                    :items="fieldFor(filter.field)?.values ?? []"
                    multiple
                    @update:model-value="(value) => update(filter.id, { value })"
                  />
                </template>
                <UButton
                  color="error"
                  icon="i-tabler-x"
                  size="sm"
                  variant="outline"
                  :aria-label="t('filtering.remove')"
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
              :placeholder="t('filtering.field')"
            /><UButton
              icon="i-tabler-plus"
              size="sm"
              :aria-label="t('filtering.add')"
              :disabled="!selected"
              @click="addSelected"
            />
          </div>
        </slot>
      </div>
    </template>
  </UPopover>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useTableI18n } from "../composables/use-table-i18n";
import {
  FilterFieldType,
  FilteringFieldOperator,
  FilteringMode
} from "../types/table";
import { createFilter } from "../utils/filtering";
import { canHandleTableShortcut } from "../utils/keyboard";
const props = defineProps({
  fields: { type: Array, required: true },
  icon: { type: String, required: false, default: "i-tabler-filter" },
  shortcuts: { type: Boolean, required: false, default: true },
  texts: { type: null, required: false },
  ui: { type: Object, required: false }
});
const filtering = defineModel("filtering", { type: Object, ...{ required: true } });
const trigger = ref();
const open = ref(false);
const selected = ref();
const t = useTableI18n(props.texts);
const hasFilters = computed(() => filtering.value.filters.length > 0);
const availableFields = computed(() => props.fields.filter((field) => !field.disabled));
const numberOperators = [
  { value: FilteringFieldOperator.Equals, label: "=" },
  { value: FilteringFieldOperator.NotEquals, label: "\u2260" },
  { value: FilteringFieldOperator.GreaterThan, label: ">" },
  { value: FilteringFieldOperator.GreaterThanOrEqual, label: "\u2265" },
  { value: FilteringFieldOperator.LessThan, label: "<" },
  { value: FilteringFieldOperator.LessThanOrEqual, label: "\u2264" }
];
const setOperators = [
  { value: FilteringFieldOperator.In, label: "\u2208" },
  { value: FilteringFieldOperator.NotIn, label: "\u2209" }
];
const fieldFor = (id) => props.fields.find((field) => field.value === id);
const toggle = () => open.value = !open.value;
const clear = () => filtering.value = { operator: FilteringMode.Intersect, filters: [] };
const toggleMode = () => filtering.value = {
  ...filtering.value,
  operator: filtering.value.operator === FilteringMode.Intersect ? FilteringMode.Union : FilteringMode.Intersect
};
const add = (id) => {
  const field = fieldFor(id);
  if (field) filtering.value = { ...filtering.value, filters: [...filtering.value.filters, createFilter(field)] };
};
const addSelected = () => {
  if (selected.value) add(selected.value);
  selected.value = void 0;
};
const remove = (id) => filtering.value = { ...filtering.value, filters: filtering.value.filters.filter((filter) => filter.id !== id) };
const update = (id, patch) => filtering.value = {
  ...filtering.value,
  filters: filtering.value.filters.map((filter) => filter.id === id ? { ...filter, ...patch } : filter)
};
const onKeydown = (event) => {
  if (canHandleTableShortcut(event) && props.shortcuts && event.shiftKey && event.key.toLowerCase() === "f") {
    event.preventDefault();
    toggle();
  }
};
onMounted(() => document.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => document.removeEventListener("keydown", onKeydown));
</script>
