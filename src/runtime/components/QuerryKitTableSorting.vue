<template>
  <UPopover v-model:open="open" :content="{ align: 'start', side: 'bottom', sideOffset: 8 }" :modal="false">
    <slot name="trigger" :open="open" :toggle="toggle" :active="hasSorting">
      <UButton
        variant="ghost"
        :aria-label="t('sorting.title', 'Sort')"
        :color="hasSorting ? 'primary' : 'neutral'"
        :icon="icon"
        @click="toggle"
      />
    </slot>
    <template #content>
      <div class="w-80 p-2.5" :class="ui?.content">
        <slot name="header" :sorting="sorting" :clear="clear">
          <div class="mb-4 flex items-center justify-between gap-2">
            <span class="flex items-center gap-2"
              ><UIcon name="i-tabler-arrows-sort" />{{ t('sorting.title', 'Sort') }}</span
            >
            <UButton
              v-if="hasSorting"
              color="error"
              icon="i-tabler-cancel"
              size="xs"
              variant="outline"
              :aria-label="t('sorting.clear', 'Clear sorting')"
              @click="clear"
            />
          </div>
        </slot>
        <slot name="items" :sorting="sorting" :remove="remove" :toggle-direction="toggleDirection" :move="move">
          <ul v-if="hasSorting" class="flex flex-col gap-2">
            <li v-for="(sort, index) in sorting" :key="sort.id" class="flex items-center gap-2">
              <span class="text-muted grow truncate text-sm">{{ labelFor(sort.id) }}</span>
              <slot
                name="item"
                :sort="sort"
                :index="index"
                :remove="() => remove(sort.id)"
                :toggle-direction="() => toggleDirection(sort.id)"
              >
                <UButton
                  color="neutral"
                  size="sm"
                  variant="soft"
                  :aria-label="t('sorting.toggle', 'Toggle sort direction')"
                  :icon="sort.desc ? 'i-tabler-sort-descending' : 'i-tabler-sort-ascending'"
                  @click="toggleDirection(sort.id)"
                />
                <UButton
                  color="error"
                  icon="i-tabler-x"
                  size="sm"
                  variant="outline"
                  :aria-label="t('sorting.remove', 'Remove sort')"
                  @click="remove(sort.id)"
                />
              </slot>
            </li>
          </ul>
        </slot>
        <USeparator v-if="hasSorting && availableFields.length" class="my-2" />
        <slot name="add" :available-fields="availableFields" :add="add">
          <div v-if="availableFields.length" class="flex gap-2">
            <USelect
              v-model="selected"
              class="w-full"
              size="sm"
              value-key="value"
              :items="availableFields"
              :placeholder="t('sorting.field', 'Select field')"
            />
            <UButton
              icon="i-tabler-plus"
              size="sm"
              :aria-label="t('sorting.add', 'Add sort')"
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
import type { SortingField, SortingState } from '../types/table';
import { canHandleTableShortcut } from '../utils/keyboard';

const props = withDefaults(
  defineProps<{ fields: SortingField[]; icon?: string; shortcuts?: boolean; ui?: { content?: string } }>(),
  { icon: 'i-tabler-arrows-sort', shortcuts: true },
);
const sorting = defineModel<SortingState>('sorting', { required: true });
const open = ref(false);
const selected = ref<string>();
const t = useTableI18n();
const hasSorting = computed(() => sorting.value.length > 0);
const availableFields = computed(() =>
  props.fields.filter((field) => !field.disabled && !sorting.value.some((sort) => sort.id === field.value)),
);
const labelFor = (id: string) => props.fields.find((field) => field.value === id)?.label ?? id;
const toggle = () => (open.value = !open.value);
const clear = () => (sorting.value = []);
const add = (id: string) => {
  if (!sorting.value.some((sort) => sort.id === id)) sorting.value = [...sorting.value, { id, desc: false }];
};
const addSelected = () => {
  if (selected.value) add(selected.value);
  selected.value = undefined;
};
const remove = (id: string) => (sorting.value = sorting.value.filter((sort) => sort.id !== id));
const toggleDirection = (id: string) =>
  (sorting.value = sorting.value.map((sort) => (sort.id === id ? { ...sort, desc: !sort.desc } : sort)));
const move = (from: number, to: number) => {
  const next = [...sorting.value];
  const [item] = next.splice(from, 1);
  if (item) next.splice(to, 0, item);
  sorting.value = next;
};
const onKeydown = (event: KeyboardEvent) => {
  if (canHandleTableShortcut(event) && props.shortcuts && event.shiftKey && event.key.toLowerCase() === 's') {
    event.preventDefault();
    toggle();
  }
};
onMounted(() => document.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
</script>
