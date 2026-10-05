<template>
  <UCheckbox
    :aria-label="label ?? filter.field"
    :model-value="Boolean(filter.value)"
    @update:model-value="(value: boolean) => update({ value: Boolean(value) })"
  />
</template>

<script setup lang="ts">
import type { FilteringField } from '../../../../types/table';

defineProps<{
  filter: FilteringField;
  label?: string;
  update: (patch: Partial<FilteringField>) => void;
}>();
</script>
