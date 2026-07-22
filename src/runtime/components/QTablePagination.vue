<template>
  <footer class="border-default flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3" :class="ui?.root">
    <div class="flex items-center gap-2" :class="ui?.left">
      <slot
        name="left"
        :page="page"
        :items-per-page="itemsPerPage"
        :total-items="totalItems"
        :start="rowStart"
        :end="rowEnd"
      >
        <span v-if="totalItems" class="text-muted hidden text-sm sm:block">{{
          summary ??
          t('pagination.summary', {
            start: rowStart,
            end: rowEnd,
            total: totalItems,
          })
        }}</span>
      </slot>
    </div>
    <div class="flex items-center gap-1.5" :class="ui?.right">
      <slot name="page-size" :items-per-page="itemsPerPage" :set-items-per-page="setItemsPerPage">
        <USelect
          class="w-24"
          size="sm"
          value-key="value"
          :model-value="itemsPerPage"
          :items="pageSizeItems"
          @update:model-value="(value: number | string) => setItemsPerPage(Number(value))"
        />
      </slot>
      <slot
        name="pagination"
        :page="page"
        :page-count="pageCount"
        :first="first"
        :previous="previous"
        :next="next"
        :last="last"
      >
        <UPagination
          :page="page"
          :items-per-page="itemsPerPage"
          :total="totalItems"
          @update:page="(value: number) => (page = value)"
        />
      </slot>
      <slot name="right" :page="page" :page-count="pageCount" />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { useTableI18n } from '../composables/use-table-i18n';
import type { TableTextOverrides } from '../locales';
import { canHandleTableShortcut } from '../utils/keyboard';

const props = withDefaults(
  defineProps<{
    totalItems?: number;
    pageSizes?: number[];
    summary?: string;
    texts?: TableTextOverrides;
    shortcuts?: boolean;
    ui?: { root?: string; left?: string; right?: string };
  }>(),
  { totalItems: 0, pageSizes: () => [1, 2, 10, 25, 50, 100], shortcuts: true },
);
const page = defineModel<number>('page', { required: true });
const itemsPerPage = defineModel<number>('itemsPerPage', { required: true });
const t = useTableI18n(props.texts);
const pageCount = computed(() => Math.max(1, Math.ceil(props.totalItems / itemsPerPage.value)));
const rowStart = computed(() => (props.totalItems === 0 ? 0 : (page.value - 1) * itemsPerPage.value + 1));
const rowEnd = computed(() => Math.min(rowStart.value - 1 + itemsPerPage.value, props.totalItems));
const pageSizeItems = computed(() => props.pageSizes.map((value) => ({ value, label: String(value) })));
const first = () => (page.value = 1);
const previous = () => (page.value = Math.max(1, page.value - 1));
const next = () => (page.value = Math.min(pageCount.value, page.value + 1));
const last = () => (page.value = pageCount.value);
const setItemsPerPage = (value: number) => {
  itemsPerPage.value = value;
  page.value = Math.min(page.value, Math.max(1, Math.ceil(props.totalItems / value)));
};
const onKeydown = (event: KeyboardEvent) => {
  if (!canHandleTableShortcut(event) || !props.shortcuts || !event.shiftKey) return;
  if (event.ctrlKey && event.key === 'ArrowLeft') first();
  else if (event.ctrlKey && event.key === 'ArrowRight') last();
  else if (event.key === 'ArrowLeft') previous();
  else if (event.key === 'ArrowRight') next();
  else return;
  event.preventDefault();
};
onMounted(() => document.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
</script>
