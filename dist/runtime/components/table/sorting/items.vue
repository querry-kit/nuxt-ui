<template>
  <VueDraggable
    v-if="hasSorting"
    v-model="sorting"
    handle=".drag-handle"
    tag="ul"
    class="flex flex-col gap-2"
    :animation="150"
  >
    <template v-for="(sort, index) in sorting" :key="sort.id">
      <slot
        name="item"
        :sort="sort"
        :index="index"
        :remove="() => remove(sort.id)"
        :toggle-direction="() => toggleDirection(sort.id)"
        :show-drag-handle="sorting.length > 1"
      />
    </template>
  </VueDraggable>
</template>

<script setup>
import { VueDraggable } from "vue-draggable-plus";
defineProps({
  hasSorting: { type: Boolean, required: true },
  remove: { type: Function, required: true },
  toggleDirection: { type: Function, required: true }
});
const sorting = defineModel("sorting", { type: Array, ...{ required: true } });
</script>
