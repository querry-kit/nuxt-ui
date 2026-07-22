<template>
  <span ref="trigger">
    <slot name="trigger" :open="open" :toggle="toggle">
      <UButton color="neutral" variant="ghost" :aria-label="t('options.title')" :icon="icon" @click="toggle" />
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
        <slot name="header" :columns="orderedColumns">
          <OptionsHeader :texts="texts" />
        </slot>
        <slot name="items" :columns="orderedColumns" :move="move" :toggle-visibility="toggleVisibility" :pin="pin">
          <OptionsItems
            :columns="orderedColumns"
            :invisible-columns="invisibleColumns"
            :move="move"
            :pin="pin"
            :toggle-visibility="toggleVisibility"
          >
            <template #item="itemProps">
              <slot name="item" v-bind="itemProps">
                <OptionsItem
                  :column="itemProps.column"
                  :visible="itemProps.visible"
                  :texts="texts"
                  :pin="itemProps.pin"
                  :toggle-visibility="itemProps.toggleVisibility"
                />
              </slot>
            </template>
          </OptionsItems>
        </slot>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useTableI18n } from '../../../composables/use-table-i18n';
import type { TableTextOverrides } from '../../../texts';
import type { ColumnDefinition, ColumnPinning } from '../../../types/table';
import { canHandleTableShortcut } from '../../../utils/keyboard';
import OptionsHeader from './header.vue';
import OptionsItem from './item.vue';
import OptionsItems from './items.vue';

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
