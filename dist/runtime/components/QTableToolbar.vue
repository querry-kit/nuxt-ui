<template>
  <div class="flex flex-col gap-2" :class="ui?.root">
    <div class="flex min-w-0 items-center justify-between gap-2" :class="ui?.primary">
      <div class="min-w-0 overflow-x-auto whitespace-nowrap">
        <slot name="breadcrumb" :items="breadcrumbItems">
          <UBreadcrumb v-if="breadcrumbItems?.length" :items="breadcrumbItems" />
        </slot>
      </div>
      <div class="flex shrink-0 items-center gap-1.5">
        <slot name="new" />
      </div>
    </div>
    <div class="flex flex-wrap items-center justify-between gap-2" :class="ui?.secondary">
      <div class="min-w-48 grow">
        <slot name="search" :search="search" :set-search="setSearch">
          <UInput
            v-if="search !== void 0"
            icon="i-tabler-search"
            :model-value="search"
            :placeholder="searchPlaceholder ?? t('search.placeholder')"
            @update:model-value="setSearch"
          />
        </slot>
      </div>
      <div class="flex shrink-0 items-center gap-1">
        <slot name="options" :sorting="sorting" :filtering="filtering" :column-order="columnOrder">
          <QTableSorting
            v-if="sortableFields?.length && sorting"
            v-model:sorting="sorting"
            :fields="sortableFields"
            :shortcuts="shortcuts"
            :texts="texts"
          />
          <QTableFiltering
            v-if="filterFields?.length && filtering"
            v-model:filtering="filtering"
            :fields="filterFields"
            :shortcuts="shortcuts"
            :texts="texts"
          />
          <QTableOptions
            v-if="columnDefinitions?.length && columnOrder && invisibleColumns && columnPinning"
            v-model:column-order="columnOrder"
            v-model:invisible-columns="invisibleColumns"
            v-model:column-pinning="columnPinning"
            :columns="columnDefinitions"
            :shortcuts="shortcuts"
            :texts="texts"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTableI18n } from "../composables/use-table-i18n";
const props = defineProps({
  breadcrumbItems: { type: Array, required: false },
  sortableFields: { type: Array, required: false },
  filterFields: { type: Array, required: false },
  columnDefinitions: { type: Array, required: false },
  searchPlaceholder: { type: String, required: false },
  texts: { type: null, required: false },
  shortcuts: { type: Boolean, required: false },
  ui: { type: Object, required: false }
});
const search = defineModel("search", { type: null });
const sorting = defineModel("sorting", { type: Array });
const filtering = defineModel("filtering", { type: Object });
const columnOrder = defineModel("columnOrder", { type: Array });
const invisibleColumns = defineModel("invisibleColumns", { type: Array });
const columnPinning = defineModel("columnPinning", { type: Object });
const t = useTableI18n(props.texts);
const setSearch = (value) => search.value = value == null ? void 0 : String(value);
</script>
