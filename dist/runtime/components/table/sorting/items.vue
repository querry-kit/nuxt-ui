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

<script setup>
defineProps({
  sorting: { type: Array, required: true },
  hasSorting: { type: Boolean, required: true },
  remove: { type: Function, required: true },
  toggleDirection: { type: Function, required: true }
});
</script>
