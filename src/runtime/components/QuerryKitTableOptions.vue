<template>
  <span ref="trigger">
    <slot name="trigger" :open="open" :toggle="toggle"
      ><UButton color="neutral" variant="ghost" :aria-label="t('options.title')" :icon="icon" @click="toggle"
    /></slot>
  </span>
  <UPopover
    v-model:open="open"
    :reference="trigger"
    :content="{ align: 'start', side: 'bottom', sideOffset: 8 }"
    :modal="false"
  >
    <template #content>
      <div class="min-w-80 p-2.5" :class="ui?.content">
        <slot name="header" :columns="orderedColumns"
          ><div class="mb-4 flex items-center gap-2">
            <UIcon name="i-tabler-adjustments" />{{ t('options.title') }}
          </div></slot
        >
        <slot name="items" :columns="orderedColumns" :move="move" :toggle-visibility="toggleVisibility" :pin="pin">
          <ul class="flex flex-col gap-1">
            <li
              v-for="(column, index) in orderedColumns"
              :key="column.id"
              class="flex items-center gap-2 rounded p-1.5"
              draggable="true"
              @dragover.prevent
              @drop="move(draggedIndex, index)"
              @dragstart="draggedIndex = index"
            >
              <UIcon name="i-tabler-grip-vertical" class="text-dimmed cursor-grab" />
              <span class="text-muted grow truncate text-sm">{{ column.header }}</span>
              <slot
                name="item"
                :column="column"
                :index="index"
                :visible="!invisibleColumns.includes(column.id)"
                :pin="(side: PinSide) => pin(column.id, side)"
                :toggle-visibility="() => toggleVisibility(column.id)"
              >
                <UPopover
                  ><UButton
                    color="neutral"
                    icon="i-tabler-pin"
                    size="xs"
                    variant="ghost"
                    :aria-label="t('options.pin')" /><template #content
                    ><div class="flex p-1">
                      <UButton
                        size="xs"
                        variant="ghost"
                        :label="t('options.left')"
                        @click="pin(column.id, 'left')"
                      /><UButton
                        size="xs"
                        variant="ghost"
                        :label="t('options.center')"
                        @click="pin(column.id, 'center')"
                      /><UButton
                        size="xs"
                        variant="ghost"
                        :label="t('options.right')"
                        @click="pin(column.id, 'right')"
                      /></div></template
                ></UPopover>
                <USwitch
                  :aria-label="t('options.visibility')"
                  :disabled="column.enableHiding === false"
                  :model-value="!invisibleColumns.includes(column.id)"
                  @update:model-value="toggleVisibility(column.id)"
                />
              </slot>
            </li>
          </ul>
        </slot>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useTableI18n } from '../composables/use-table-i18n';
import type { TableTextOverrides } from '../locales';
import type { ColumnDefinition, ColumnPinning } from '../types/table';
import { canHandleTableShortcut } from '../utils/keyboard';

type PinSide = 'left' | 'center' | 'right';
const props = withDefaults(
  defineProps<{
    columns: ColumnDefinition[];
    icon?: string;
    shortcuts?: boolean;
    texts?: TableTextOverrides;
    ui?: { content?: string };
  }>(),
  { icon: 'i-tabler-adjustments', shortcuts: true },
);
const columnOrder = defineModel<string[]>('columnOrder', { required: true });
const invisibleColumns = defineModel<string[]>('invisibleColumns', { required: true });
const columnPinning = defineModel<ColumnPinning>('columnPinning', { required: true });
const t = useTableI18n(props.texts);
const trigger = ref<HTMLElement>();
const open = ref(false);
const draggedIndex = ref(0);
const orderedColumns = computed(() =>
  columnOrder.value
    .map((id) => props.columns.find((column) => column.id === id))
    .filter((column): column is ColumnDefinition => Boolean(column)),
);
const toggle = () => (open.value = !open.value);
const toggleVisibility = (id: string) => {
  const column = props.columns.find((item) => item.id === id);
  if (column?.enableHiding === false) return;
  invisibleColumns.value = invisibleColumns.value.includes(id)
    ? invisibleColumns.value.filter((item) => item !== id)
    : [...invisibleColumns.value, id];
};
const pin = (id: string, side: PinSide) => {
  const left = (columnPinning.value.left ?? []).filter((item) => item !== id);
  const right = (columnPinning.value.right ?? []).filter((item) => item !== id);
  if (side === 'left') left.push(id);
  if (side === 'right') right.push(id);
  columnPinning.value = { left, right };
};
const move = (from: number, to: number) => {
  const next = [...columnOrder.value];
  const [item] = next.splice(from, 1);
  if (item) next.splice(to, 0, item);
  columnOrder.value = next;
};
const onKeydown = (event: KeyboardEvent) => {
  if (canHandleTableShortcut(event) && props.shortcuts && event.shiftKey && event.key.toLowerCase() === 'o') {
    event.preventDefault();
    toggle();
  }
};
onMounted(() => document.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
</script>
