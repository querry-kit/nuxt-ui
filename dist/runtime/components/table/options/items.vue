<template>
  <ul class="flex flex-col gap-1">
    <li
      v-for="(column, index) in columns"
      :key="column.id"
      class="flex items-center gap-2 rounded p-1.5"
      draggable="true"
      @dragover.prevent
      @drop="move(draggedIndex, index)"
      @dragstart="draggedIndex = index"
    >
      <UIcon name="i-tabler-grip-vertical" class="text-dimmed cursor-grab" />
      <slot
        name="item"
        :column="column"
        :index="index"
        :visible="!invisibleColumns.includes(column.id)"
        :pin="(side) => pin(column.id, side)"
        :toggle-visibility="() => toggleVisibility(column.id)"
      />
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
defineProps({
  columns: { type: Array, required: true },
  invisibleColumns: { type: Array, required: true },
  move: { type: Function, required: true },
  pin: { type: Function, required: true },
  toggleVisibility: { type: Function, required: true }
});
const draggedIndex = ref(0);
</script>
