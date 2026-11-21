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

<script setup>
defineProps({
  page: { type: Number, required: true },
  itemsPerPage: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  disabled: { type: Boolean, required: false },
  setPage: { type: Function, required: true }
});
</script>
