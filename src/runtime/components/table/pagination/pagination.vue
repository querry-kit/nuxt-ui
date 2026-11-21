<template>
  <UPagination
    :page="page"
    :items-per-page="itemsPerPage"
    :total="totalItems"
    :disabled="disabled"
    :ui="{ list: 'flex-wrap' }"
    @update:page="setPage"
  />
</template>

<script setup lang="ts">
defineProps<{
  page: number;
  itemsPerPage: number;
  totalItems: number;
  disabled?: boolean;
  setPage: (value: number) => void;
}>();
</script>
