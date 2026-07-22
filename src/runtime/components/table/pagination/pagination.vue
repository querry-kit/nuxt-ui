<template>
  <UPagination :page="page" :items-per-page="itemsPerPage" :total="totalItems" @update:page="setPage" />
</template>

<script setup lang="ts">
defineProps<{
  page: number;
  itemsPerPage: number;
  totalItems: number;
  setPage: (value: number) => void;
}>();
</script>
