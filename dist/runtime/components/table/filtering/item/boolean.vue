<template>
  <UCheckbox
    :aria-label="label ?? filter.field"
    :model-value="Boolean(filter.value)"
    @update:model-value="(value) => update({ value: Boolean(value) })"
  />
</template>

<script setup>
defineProps({
  filter: { type: Object, required: true },
  label: { type: String, required: false },
  update: { type: Function, required: true }
});
</script>
