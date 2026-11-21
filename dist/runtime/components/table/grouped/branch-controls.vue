<template>
  <div ref="controls" class="sticky left-0 w-[100cqw]">
    <div v-if="node.error" role="alert" class="text-error flex items-center gap-2 px-4 py-2 text-sm">
      <span>{{ t("grouping.error") }}</span>
      <UButton size="xs" variant="ghost" :label="t('grouping.retry')" @click="load" />
    </div>
    <template v-if="!node.error || leaf && node.items.length">
      <slot />
      <GroupedPagination v-if="leaf" :texts="texts" :table="table" :path="node.path" :branch="node" />
      <QTableGroupLoadMore v-else :texts="texts" :has-more="node.hasMore" :loading="node.loading" @load="load" />
    </template>
  </div>
</template>

<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { ref, useTemplateRef, watch } from "vue";
import GroupedPagination from "./pagination.vue";
import { useTableI18n } from "../../../composables/use-table-i18n";
import QTableGroupLoadMore from "../group/load-more.vue";
const { table, node, viewport, leaf, texts } = defineProps({
  table: { type: Object, required: true },
  node: { type: Object, required: true },
  viewport: { type: null, required: true },
  leaf: { type: Boolean, required: true },
  texts: { type: null, required: false }
});
const t = useTableI18n(texts);
const controls = useTemplateRef("controls");
const visible = ref(false);
useIntersectionObserver(
  controls,
  /** Loads further leaf records only once their footer approaches the shared viewport. */
  ([entry]) => visible.value = Boolean(entry?.isIntersecting),
  {
    /** Observes the table viewport once it is mounted. */
    root: () => viewport,
    rootMargin: "48px 0px"
  }
);
async function load() {
  if (!leaf) await table.loadMoreGroups(node.path);
  else if (table.loadingMode.value === "infinite") await table.loadMoreItems(node.path);
  else {
    const { page, requestedPage } = table.getItemPage(node.path);
    await table.loadItemsPage(node.path, requestedPage ?? page);
  }
}
watch(
  /** A visible footer may remain in view after an append, so re-check once loading finishes. */
  () => visible.value && leaf && table.loadingMode.value === "infinite" && node.hasMore && !node.loading && !node.error,
  /** Delegates stale-response and duplicate-request handling to the grouped table. */
  (ready) => {
    if (ready) void load();
  }
);
</script>
