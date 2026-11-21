<template>
  <UPopover :ui="{ content: 'qk-table-grouping-popover' }">
    <UButton
      variant="ghost"
      :color="grouping.length ? 'primary' : 'neutral'"
      :aria-label="t('grouping.title')"
      :icon="icon('grouping.trigger')"
    />
    <template #content>
      <div class="space-y-2 p-3">
        <div class="mb-4 flex items-center justify-between gap-2">
          <slot name="header" :grouping="grouping">
            <h3 class="flex items-center gap-2 text-sm font-medium">
              <UIcon :name="icon('grouping.trigger')" />
              {{ t("grouping.title") }}
            </h3>
          </slot>
          <UButton
            v-if="grouping.length"
            color="error"
            size="xs"
            variant="outline"
            :icon="icon('grouping.clear')"
            :aria-label="t('grouping.clear')"
            @click="grouping = []"
          />
        </div>
        <VueDraggable v-model="grouping" class="space-y-2" tag="ol" handle=".drag-handle" :animation="150">
          <li v-for="(field, index) in grouping" :key="field" class="flex items-center gap-2">
            <UButton
              v-if="grouping.length > 1"
              class="drag-handle shrink-0 cursor-grab touch-none"
              color="neutral"
              size="xs"
              variant="ghost"
              aria-keyshortcuts="ArrowUp ArrowDown"
              :icon="icon('options.drag')"
              :aria-label="t('grouping.reorder', { field: fieldLabel(field) })"
              @keydown.up.prevent.stop="move($event, index, -1)"
              @keydown.down.prevent.stop="move($event, index, 1)"
            />
            <span class="text-muted min-w-0 flex-1 truncate text-sm">{{ fieldLabel(field) }}</span>
            <UButton
              color="error"
              size="sm"
              variant="outline"
              :aria-label="t('grouping.remove')"
              :icon="icon('grouping.remove')"
              @click="remove(field)"
            />
          </li>
        </VueDraggable>
        <USeparator v-if="grouping.length" class="my-2" />
        <form class="flex gap-2" @submit.prevent="addSelected">
          <USelect
            v-model="selected"
            class="w-full"
            size="sm"
            value-key="value"
            :items="available"
            :placeholder="t(available.length ? 'grouping.field' : 'grouping.noFields')"
            :aria-label="t('grouping.field')"
            :disabled="!available.length"
          />
          <UButton
            size="sm"
            type="submit"
            :aria-label="t('grouping.add')"
            :icon="icon('grouping.add')"
            :disabled="!selectedField"
          />
        </form>
      </div>
    </template>
  </UPopover>
</template>

<script setup>
import { computed, nextTick, ref } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { useTableI18n } from "../../../composables/use-table-i18n";
import { useTableIcons } from "../../../composables/use-table-icons";
const props = defineProps({
  fields: { type: Array, required: true },
  texts: { type: null, required: false },
  icons: { type: null, required: false }
});
const grouping = defineModel("grouping", { type: Array, ...{ required: true } });
const selected = ref();
const t = useTableI18n(props.texts);
const icon = useTableIcons(props.icons);
const available = computed(
  () => props.fields.filter((field) => !field.disabled && !grouping.value.includes(field.value))
);
const selectedField = computed(() => available.value.find((field) => field.value === selected.value));
const fieldLabel = (field) => props.fields.find((item) => item.value === field)?.label ?? field;
const addSelected = () => {
  if (selectedField.value) grouping.value = [...grouping.value, selectedField.value.value];
  selected.value = void 0;
};
const remove = (field) => {
  grouping.value = grouping.value.filter((value) => value !== field);
};
const move = (event, index, direction) => {
  const next = [...grouping.value];
  const target = index + direction;
  if (target < 0 || target >= next.length) return;
  const handle = event.currentTarget;
  [next[index], next[target]] = [next[target], next[index]];
  grouping.value = next;
  void nextTick(() => handle.focus());
};
</script>

<style>
.qk-table-grouping-popover{min-width:min(30rem,calc(100vw - 1rem))}
</style>
