<template>
  <ul v-if="hasSorting" class="flex flex-col gap-2">
    <li v-for="(sort, index) in sorting" :key="sort.id" class="flex items-center gap-2">
      <slot
        name="item"
        :sort="sort"
        :index="index"
        :remove="() => remove(sort.id)"
        :toggle-direction="() => toggleDirection(sort.id)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { SortingState } from '../../../types/table';

defineProps<{
  sorting: SortingState;
  hasSorting: boolean;
  remove: (id: string) => void;
  toggleDirection: (id: string) => void;
}>();
</script>
