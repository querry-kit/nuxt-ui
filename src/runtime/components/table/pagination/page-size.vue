<template>
  <USelect
    class="w-24"
    size="sm"
    value-key="value"
    :model-value="itemsPerPage"
    :items="items"
    @update:model-value="(value: number | string) => setItemsPerPage(Number(value))"
  />
</template>

<script setup lang="ts">
defineProps<{
  itemsPerPage: number;
  items: Array<{ value: number; label: string }>;
  setItemsPerPage: (value: number) => void;
}>();
</script>
