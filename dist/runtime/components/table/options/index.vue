<template>
  <ControlPanel
    v-model:open="open"
    popover-class="qk-table-options-popover"
    :title="t('options.title')"
    :texts="texts"
    anchored
    :popover-body-class="['p-2.5', ui?.content]"
    :body-class="ui?.content"
  >
    <template #trigger="{ dialog }">
      <slot name="trigger" :open="open" :toggle="toggle">
        <UTooltip v-if="!dialog" :text="t('options.title')">
          <UButton
            color="neutral"
            variant="ghost"
            :aria-label="t('options.title')"
            :icon="icon ?? tableIcon('options.trigger')"
            @click="toggle"
          />
        </UTooltip>
        <UButton
          v-else
          color="neutral"
          variant="ghost"
          :aria-label="t('options.title')"
          :icon="icon ?? tableIcon('options.trigger')"
        />
      </slot>
    </template>
    <template #header>
      <slot name="header" :columns="orderedColumns" :can-reset="canReset" :reset="resetLayout">
        <OptionsHeader :can-reset="canReset" :texts="texts" :icons="icons" @reset="resetLayout" />
      </slot>
    </template>
    <slot name="items" :columns="orderedColumns" :move="move" :toggle-visibility="toggleVisibility" :pin="pin">
      <OptionsItems
        v-model:column-order="columnOrder"
        v-model:invisible-columns="invisibleColumns"
        v-model:column-pinning="columnPinning"
        :columns="columns"
        :texts="texts"
        :icons="icons"
      >
        <template #item="itemProps">
          <slot name="item" v-bind="itemProps">
            <OptionsItem
              :column="itemProps.column"
              :visible="itemProps.visible"
              :texts="texts"
              :icons="icons"
              :show-drag-handle="columns.length > 1"
              :toggle-visibility="itemProps.toggleVisibility"
            />
          </slot>
        </template>
      </OptionsItems>
    </slot>
  </ControlPanel>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useTableI18n } from "../../../composables/use-table-i18n";
import { useTableIcons } from "../../../composables/use-table-icons";
import ControlPanel from "../toolbar/control-panel.vue";
import { canHandleTableShortcut } from "../../../utils/keyboard";
import OptionsHeader from "./header.vue";
import OptionsItem from "./item.vue";
import OptionsItems from "./items.vue";
const props = defineProps({
  columns: { type: Array, required: true },
  icon: { type: String, required: false },
  shortcuts: { type: Boolean, required: false, default: true },
  texts: { type: null, required: false },
  icons: { type: null, required: false },
  ui: { type: Object, required: false }
});
const columnOrder = defineModel("columnOrder", { type: Array, ...{ required: true } });
const invisibleColumns = defineModel("invisibleColumns", { type: Array, ...{ required: true } });
const columnPinning = defineModel("columnPinning", { type: Object, ...{ required: true } });
const t = useTableI18n(() => props.texts);
const tableIcon = useTableIcons(props.icons);
const open = ref(false);
const orderedColumns = computed(
  () => columnOrder.value.map((id) => props.columns.find((column) => column.id === id)).filter((column) => Boolean(column))
);
const canReset = computed(
  () => columnOrder.value.length !== props.columns.length || props.columns.some(({ id }, index) => columnOrder.value[index] !== id) || invisibleColumns.value.length > 0 || Boolean(columnPinning.value.left?.length || columnPinning.value.right?.length)
);
const toggle = () => open.value = !open.value;
const resetLayout = () => {
  columnOrder.value = props.columns.map(({ id }) => id);
  invisibleColumns.value = [];
  columnPinning.value = {};
};
const toggleVisibility = (id) => {
  const column = props.columns.find((item) => item.id === id);
  if (column?.enableHiding === false) return;
  invisibleColumns.value = invisibleColumns.value.includes(id) ? invisibleColumns.value.filter((item) => item !== id) : [...invisibleColumns.value, id];
};
const pin = (id, side) => {
  const left = (columnPinning.value.left ?? []).filter((item) => item !== id);
  const right = (columnPinning.value.right ?? []).filter((item) => item !== id);
  if (side === "left") left.push(id);
  if (side === "right") right.push(id);
  columnPinning.value = { left, right };
};
const move = (from, to) => {
  const next = [...columnOrder.value];
  const [item] = next.splice(from, 1);
  if (item) next.splice(to, 0, item);
  columnOrder.value = next;
};
const onKeydown = (event) => {
  if (canHandleTableShortcut(event) && props.shortcuts && event.shiftKey && event.key.toLowerCase() === "o") {
    event.preventDefault();
    toggle();
  }
};
onMounted(() => document.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => document.removeEventListener("keydown", onKeydown));
</script>

<style>
.qk-table-options-popover{min-width:min(20rem,calc(100vw - 1rem))}
</style>
