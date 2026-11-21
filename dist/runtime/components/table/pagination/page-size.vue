<template>
  <USelect
    class="w-24"
    size="sm"
    value-key="value"
    :model-value="itemsPerPage"
    :items="items"
    @update:model-value="(value) => setItemsPerPage(Number(value))"
  />
</template>

<script setup>
defineProps({
  itemsPerPage: { type: Number, required: true },
  items: { type: Array, required: true },
  setItemsPerPage: { type: Function, required: true }
});
</script>
