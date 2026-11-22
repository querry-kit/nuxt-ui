<template>
  <slot
    name="pagination"
    :path="path"
    :page="page"
    :total-items="totalItems"
    :items-per-page="itemsPerPage"
    :loaded-items="branch.items.length"
    :loading="branch.loading"
    :error="branch.error"
    :infinite="scrolling"
    :has-more="branch.hasMore"
    :set-page="setPage"
    :set-items-per-page="setItemsPerPage"
    :load-more="loadMore"
  >
    <QTablePagination
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      :texts="texts"
      :aria-busy="branch.loading"
      :total-items="totalItems"
      :shortcuts="!scrolling && !path.length"
      :ui="{
  root: path.length ? 'shrink-0 gap-2! py-1!' : 'shrink-0'
}"
    >
      <template v-if="$slots.default" #start><slot /></template>
      <template #summary="{ start, end }">
        <p
          class="text-muted"
          aria-live="polite"
          :class="[path.length ? 'text-xs' : 'text-sm', { 'animate-pulse': branch.loading }]"
        >
          {{
            t("pagination.summary", {
  start: formatNumber(scrolling ? Number(branch.items.length > 0) : start),
  end: formatNumber(scrolling ? branch.items.length : end),
  total: formatNumber(totalItems)
})
          }}
        </p>
      </template>
      <template v-if="scrolling" #page-size />
      <template v-if="scrolling || path.length" #pagination>
        <QTableGroupLoadMore
          v-if="scrolling"
          :texts="texts"
          :has-more="branch.hasMore && !branch.error"
          :loading="branch.loading"
          @load="loadMore"
        />
        <UPagination v-else v-model:page="page" size="sm" :items-per-page="itemsPerPage" :total="totalItems" />
      </template>
      <template v-if="$slots.end" #right>
        <slot name="end" />
      </template>
    </QTablePagination>
  </slot>
</template>

<script setup>
import { computed } from "vue";
import QTablePagination from "../pagination/index.vue";
import { useTableI18n, useTableNumber } from "../../../composables/use-table-i18n";
import QTableGroupLoadMore from "../group/load-more.vue";
const { table, path, texts } = defineProps({
  table: { type: Object, required: true },
  path: { type: Array, required: true },
  branch: { type: Object, required: true },
  texts: { type: null, required: false }
});
const formatNumber = useTableNumber();
const t = useTableI18n(() => texts);
const { loadingMode, itemsPerPage } = table;
const scrolling = computed(
  /** Uses the shared row loading mode. */
  () => loadingMode.value === "infinite"
);
const totalItems = computed(
  /** Counts every matching record in this branch. */
  () => table.getItemPage(path).totalItems
);
const page = computed({
  /** Reads the page independently for each leaf. */
  get: () => table.getItemPage(path).page,
  /** Loads only this leaf's requested page. */
  set: setPage
});
function setPage(value) {
  void table.loadItemsPage(path, value);
}
function setItemsPerPage(value) {
  itemsPerPage.value = value;
}
function loadMore() {
  void table.loadMoreItems(path);
}
</script>
