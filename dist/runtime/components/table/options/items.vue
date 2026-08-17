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
      <UIcon class="text-dimmed cursor-grab" :name="icon('options.drag')" />
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
import { useTableIcons } from "../../../composables/use-table-icons";
const props = defineProps({
  columns: { type: Array, required: true },
  invisibleColumns: { type: Array, required: true },
  icons: { type: null, required: false },
  move: { type: Function, required: true },
  pin: { type: Function, required: true },
  toggleVisibility: { type: Function, required: true }
});
const icon = useTableIcons(props.icons);
const draggedIndex = ref(0);
</script>
