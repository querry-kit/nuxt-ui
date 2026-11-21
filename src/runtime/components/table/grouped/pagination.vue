<template>
  <QTablePagination
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    :texts="texts"
    :aria-busy="branch.loading"
    :total-items="totalItems"
    :shortcuts="!scrolling && !path.length"
    :ui="{
      root: path.length ? 'shrink-0 gap-2! py-1!' : 'shrink-0',
      right: 'min-w-0 max-w-full flex-wrap [&_[data-slot=list]]:flex-wrap',
    }"
  >
    <template #left="{ start, end }">
      <slot />
      <p
        class="text-muted"
        aria-live="polite"
        :class="[path.length ? 'text-xs' : 'text-sm', { 'animate-pulse': branch.loading }]"
      >
        {{
          t('pagination.summary', {
            start: scrolling ? Number(branch.items.length > 0) : start,
            end: scrolling ? branch.items.length : end,
            total: totalItems,
          })
        }}
      </p>
    </template>
    <template v-if="scrolling" #page-size />
    <template v-if="scrolling || path.length" #pagination>
      <QTableGroupLoadMore
        v-if="scrolling"
        :texts="texts"
        :size="path.length ? 'sm' : undefined"
        :has-more="branch.hasMore && !branch.error"
        :loading="branch.loading"
        @load="loadMore"
      />
      <UPagination v-else v-model:page="page" size="sm" :items-per-page="itemsPerPage" :total="totalItems" />
    </template>
  </QTablePagination>
</template>

<script setup lang="ts" generic="TItem extends Record<string, unknown>">
import type { GroupBranch, GroupPath } from '@querry-kit/nuxt';
import { computed } from 'vue';
import QTablePagination from '../pagination/index.vue';
import { useTableI18n } from '../../../composables/use-table-i18n';
import type { TableTextOverrides } from '../../../texts';
import QTableGroupLoadMore from '../group/load-more.vue';

import type { GroupedTableState } from '../../../types/grouped-table';

const { table, path, texts } = defineProps<{
  table: GroupedTableState<TItem>;
  path: GroupPath;
  branch: GroupBranch<TItem>;
  texts?: TableTextOverrides;
}>();
const t = useTableI18n(texts);
const { loadingMode, itemsPerPage } = table;
const scrolling = computed(/** Uses the shared row loading mode. */ () => loadingMode.value === 'infinite');
const totalItems = computed(
  /** Counts every matching record in this branch. */ () => table.getItemPage(path).totalItems,
);
const page = computed({
  /** Reads the page independently for each leaf. */
  get: () => table.getItemPage(path).page,
  /** Loads only this leaf's requested page. */
  set: (value) => void table.loadItemsPage(path, value),
});

/** Appends the next item batch for this branch. */
function loadMore(): void {
  void table.loadMoreItems(path);
}
</script>
