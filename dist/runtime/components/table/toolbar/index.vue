<template>
  <DefineBreadcrumb>
    <slot name="breadcrumb" :items="breadcrumbItems">
      <UBreadcrumb v-if="breadcrumbItems?.length" :items="breadcrumbItems" />
    </slot>
  </DefineBreadcrumb>

  <DefineSearch>
    <slot name="search" :search="search" :set-search="setSearch">
      <UInput
        v-if="search !== void 0"
        class="qk-table-toolbar-search"
        :icon="icon('search.input')"
        :model-value="search"
        :placeholder="searchPlaceholder ?? t('search.placeholder')"
        @update:model-value="setSearch"
      />
    </slot>
  </DefineSearch>

  <DefineOptions>
    <slot name="options" :sorting="sorting" :filtering="filtering" :column-order="columnOrder">
      <QTableSorting
        v-if="sortableFields?.length && sorting"
        v-model:sorting="sorting"
        :fields="sortableFields"
        :shortcuts="shortcuts"
        :texts="texts"
        :icons="icons"
      />
      <QTableFiltering
        v-if="filterFields?.length && filtering"
        v-model:filtering="filtering"
        :fields="filterFields"
        :shortcuts="shortcuts"
        :texts="texts"
        :icons="icons"
      />
      <QTableOptions
        v-if="columnDefinitions?.length && columnOrder && invisibleColumns && columnPinning"
        v-model:column-order="columnOrder"
        v-model:invisible-columns="invisibleColumns"
        v-model:column-pinning="columnPinning"
        :columns="columnDefinitions"
        :shortcuts="shortcuts"
        :texts="texts"
        :icons="icons"
      />
    </slot>
  </DefineOptions>

  <div :class="ui?.root">
    <template v-if="isSmall">
      <UDashboardToolbar
        :class="ui?.primary"
        :ui="{ left: 'qk-table-toolbar-breadcrumb', right: 'qk-table-toolbar-actions' }"
      >
        <template #left>
          <Breadcrumb />
        </template>
        <template #right>
          <slot name="new" />
        </template>
      </UDashboardToolbar>
      <UDashboardToolbar class="qk-table-toolbar-scrollbar-none" :class="ui?.secondary">
        <template #left>
          <Search />
        </template>
        <template #right>
          <Options />
        </template>
      </UDashboardToolbar>
    </template>

    <UDashboardToolbar v-else :class="[ui?.primary, ui?.secondary]">
      <template #left>
        <Breadcrumb />
      </template>
      <template #right>
        <Search />
        <Options />
        <slot name="new" />
      </template>
    </UDashboardToolbar>
  </div>
</template>

<script setup>
import { breakpointsTailwind, createReusableTemplate, useBreakpoints, useMounted } from "@vueuse/core";
import { computed } from "vue";
import { useTableI18n } from "../../../composables/use-table-i18n";
import { useTableIcons } from "../../../composables/use-table-icons";
const mounted = useMounted();
const smallBreakpoint = useBreakpoints(breakpointsTailwind).smaller("sm");
const isSmall = computed(() => mounted.value && smallBreakpoint.value);
const [DefineBreadcrumb, Breadcrumb] = createReusableTemplate();
const [DefineSearch, Search] = createReusableTemplate();
const [DefineOptions, Options] = createReusableTemplate();
const props = defineProps({
  breadcrumbItems: { type: Array, required: false },
  sortableFields: { type: Array, required: false },
  filterFields: { type: Array, required: false },
  columnDefinitions: { type: Array, required: false },
  searchPlaceholder: { type: String, required: false },
  texts: { type: null, required: false },
  icons: { type: null, required: false },
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
const icon = useTableIcons(props.icons);
const setSearch = (value) => search.value = value == null ? void 0 : String(value);
</script>

<style>
.qk-table-toolbar-breadcrumb{min-width:0;overflow-x:auto;white-space:nowrap}.qk-table-toolbar-actions{flex-shrink:0!important}.qk-table-toolbar-scrollbar-none{scrollbar-width:none}.qk-table-toolbar-scrollbar-none::-webkit-scrollbar{display:none}.qk-table-toolbar-search{max-width:8rem}@media (min-width:40rem){.qk-table-toolbar-search{max-width:10rem}}@media (min-width:48rem){.qk-table-toolbar-search{max-width:none}}
</style>
