<template>
  <UCheckbox
    :model-value="Boolean(filter.value)"
    @update:model-value="(value: boolean) => update({ value: Boolean(value) })"
  />
</template>

<script setup lang="ts">
import type { FilteringField } from '../../../../types/table';

defineProps<{
  filter: FilteringField;
  update: (patch: Partial<FilteringField>) => void;
}>();
</script>
