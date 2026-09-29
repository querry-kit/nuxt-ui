<template>
  <div class="flex flex-col gap-4">
    <VueDraggable v-model="items" handle=".drag-handle" tag="ul" class="flex flex-col" :animation="150">
      <template v-for="item in items" :key="item.id">
        <template v-if="item.type === 'item'">
          <slot
            name="item"
            :column="item"
            :index="columnOrder.indexOf(item.id)"
            :visible="!invisibleColumns.includes(item.id)"
            :pin="(side) => pin(item.id, side)"
            :toggle-visibility="() => toggleVisibility(item.id)"
          />
        </template>
        <OptionsItemPlaceholder
          v-else-if="item.type === 'placeholder'"
          :side="item.side"
          :column-pinning="columnPinning"
          :column-order="columnOrder"
          :texts="texts"
          :icons="icons"
        />
        <li v-else>
          <USeparator class="py-2" />
        </li>
      </template>
    </VueDraggable>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import OptionsItemPlaceholder from "./item-placeholder.vue";
const props = defineProps({
  columns: { type: Array, required: true },
  texts: { type: null, required: false },
  icons: { type: null, required: false }
});
const columnOrder = defineModel("columnOrder", { type: Array, ...{ required: true } });
const invisibleColumns = defineModel("invisibleColumns", { type: Array, ...{ required: true } });
const columnPinning = defineModel("columnPinning", { type: Object, ...{ required: true } });
const orderedColumns = computed(
  () => columnOrder.value.map((id) => props.columns.find((column) => column.id === id)).filter((column) => Boolean(column))
);
const placeholderLeft = { type: "placeholder", id: "__options-placeholder-left", side: "left" };
const placeholderCenter = { type: "placeholder", id: "__options-placeholder-center", side: "center" };
const placeholderRight = { type: "placeholder", id: "__options-placeholder-right", side: "right" };
const separatorLeft = { type: "separator", id: "__options-separator-left" };
const separatorRight = { type: "separator", id: "__options-separator-right" };
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
const items = computed({
  get() {
    const leftIds = columnPinning.value.left ?? [];
    const rightIds = columnPinning.value.right ?? [];
    const leftColumns = orderedColumns.value.filter((column) => leftIds.includes(column.id));
    const rightColumns = orderedColumns.value.filter((column) => rightIds.includes(column.id));
    const centerColumns = orderedColumns.value.filter(
      (column) => !leftIds.includes(column.id) && !rightIds.includes(column.id)
    );
    return [
      placeholderLeft,
      ...leftColumns.map((column) => ({ type: "item", ...column })),
      separatorLeft,
      placeholderCenter,
      ...centerColumns.map((column) => ({ type: "item", ...column })),
      separatorRight,
      ...rightColumns.map((column) => ({ type: "item", ...column })),
      placeholderRight
    ];
  },
  set(value) {
    const separators = value.map((item, index) => item.type === "separator" ? index : -1).filter((index) => index >= 0);
    if (separators.length !== 2) return;
    const [leftEnd, centerEnd] = separators;
    const groups = [value.slice(0, leftEnd), value.slice(leftEnd + 1, centerEnd), value.slice(centerEnd + 1)];
    const ids = groups.map((group) => group.filter((item) => item.type === "item").map((item) => item.id));
    const [left = [], center = [], right = []] = ids;
    columnOrder.value = [...left, ...center, ...right];
    columnPinning.value = { left, right };
  }
});
</script>
