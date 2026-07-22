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
            v-if="search !== undefined"
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

<script setup lang="ts">
import { useTableI18n } from '../composables/use-table-i18n';
import type { TableTextOverrides } from '../locales';
import type {
  ColumnDefinition,
  ColumnPinning,
  FilterField,
  Filtering,
  SortingField,
  SortingState,
} from '../types/table';

const props = defineProps<{
  breadcrumbItems?: Array<Record<string, unknown>>;
  sortableFields?: SortingField[];
  filterFields?: FilterField[];
  columnDefinitions?: ColumnDefinition[];
  searchPlaceholder?: string;
  /** Explicit text overrides. These take precedence over vue-i18n and English defaults. */
  texts?: TableTextOverrides;
  shortcuts?: boolean;
  ui?: { root?: string; primary?: string; secondary?: string };
}>();
const search = defineModel<string | undefined>('search');
const sorting = defineModel<SortingState>('sorting');
const filtering = defineModel<Filtering>('filtering');
const columnOrder = defineModel<string[]>('columnOrder');
const invisibleColumns = defineModel<string[]>('invisibleColumns');
const columnPinning = defineModel<ColumnPinning>('columnPinning');
const t = useTableI18n(props.texts);
const setSearch = (value: string | number | undefined) => (search.value = value == null ? undefined : String(value));
</script>
