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
        :pin="(side: PinSide) => pin(column.id, side)"
        :toggle-visibility="() => toggleVisibility(column.id)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ColumnDefinition } from '../../../types/table';

export type PinSide = 'left' | 'center' | 'right';

defineProps<{
  columns: ColumnDefinition[];
  invisibleColumns: string[];
  move: (from: number, to: number) => void;
  pin: (id: string, side: PinSide) => void;
  toggleVisibility: (id: string) => void;
}>();
const draggedIndex = ref(0);
</script>
