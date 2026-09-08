<template>
  <UCheckbox
    :model-value="Boolean(filter.value)"
    @update:model-value="(value) => update({ value: Boolean(value) })"
  />
</template>

<script setup>
defineProps({
  filter: { type: Object, required: true },
  update: { type: Function, required: true }
});
</script>
