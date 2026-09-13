<template>
  <ul v-if="hasFilters" class="flex flex-col gap-2">
    <li v-for="filter in filters" :key="filter.id" class="flex items-center gap-2">
      <slot
        name="item"
        :filter="filter"
        :field="fieldFor(filter.field)"
        :remove="() => remove(filter.id)"
        :update="(patch) => update(filter.id, patch)"
      />
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  filters: { type: Array, required: true },
  fields: { type: Array, required: true },
  hasFilters: { type: Boolean, required: true },
  remove: { type: Function, required: true },
  update: { type: Function, required: true }
});
const fieldFor = (id) => props.fields.find((field) => field.value === id);
</script>
