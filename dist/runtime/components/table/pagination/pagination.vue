<template>
  <UPagination :page="page" :items-per-page="itemsPerPage" :total="totalItems" @update:page="setPage" />
</template>

<script setup>
defineProps({
  page: { type: Number, required: true },
  itemsPerPage: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  setPage: { type: Function, required: true }
});
</script>
