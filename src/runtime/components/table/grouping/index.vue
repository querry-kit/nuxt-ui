<template>
  <UPopover>
    <UButton
      variant="ghost"
      :aria-label="t('grouping.title')"
      :color="grouping.length ? 'primary' : 'neutral'"
      :icon="icon('grouping.trigger')"
    />
    <template #content>
      <div class="min-w-64 space-y-2 p-3">
        <slot name="header" :grouping="grouping">
          <h3 class="text-sm font-medium">{{ t('grouping.title') }}</h3>
        </slot>
        <ol class="space-y-2">
          <li v-for="(field, index) in grouping" :key="field" class="flex items-center gap-2">
            <span class="min-w-0 flex-1 truncate">
              {{ fields.find((item) => item.value === field)?.label ?? field }}
            </span>
            <UButton
              size="xs"
              variant="ghost"
              :aria-label="t('grouping.moveUp')"
              :icon="icon('grouping.up')"
              :disabled="index === 0"
              @click="move(index, -1)"
            />
            <UButton
              size="xs"
              variant="ghost"
              :aria-label="t('grouping.moveDown')"
              :icon="icon('grouping.down')"
              :disabled="index === grouping.length - 1"
              @click="move(index, 1)"
            />
            <UButton
              size="xs"
              variant="ghost"
              :aria-label="t('grouping.remove')"
              :icon="icon('grouping.remove')"
              @click="remove(field)"
            />
          </li>
        </ol>
        <div v-if="available.length" class="flex gap-2">
          <USelect
            v-model="selected"
            class="min-w-0 flex-1"
            value-key="value"
            :items="available"
            :placeholder="t('grouping.field')"
            :aria-label="t('grouping.field')"
          />
          <UButton
            :aria-label="t('grouping.add')"
            :icon="icon('grouping.add')"
            :disabled="!selected"
            @click="addSelected"
          />
        </div>
        <UButton v-if="grouping.length" variant="ghost" :label="t('grouping.clear')" @click="grouping = []" />
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTableI18n } from '../../../composables/use-table-i18n';
import { useTableIcons } from '../../../composables/use-table-icons';
import type { TableTextOverrides } from '../../../texts';
import type { TableIconOverrides } from '../../../icons';
import type { GroupingField } from '../../../types/table';

/** Ordered scalar grouping control; the application owns the selected state. */
const props = defineProps<{
  fields: readonly GroupingField[];
  texts?: TableTextOverrides;
  icons?: TableIconOverrides;
}>();
const grouping = defineModel<string[]>('grouping', { required: true });
const selected = ref<string>();
const t = useTableI18n(props.texts);
const icon = useTableIcons(props.icons);
const available = computed(() =>
  props.fields.filter((field) => !field.disabled && !grouping.value.includes(field.value)),
);
const addSelected = () => {
  if (available.value.some((field) => field.value === selected.value))
    grouping.value = [...grouping.value, selected.value!];
  selected.value = undefined;
};
const remove = (field: string) => {
  grouping.value = grouping.value.filter((value) => value !== field);
};
const move = (index: number, direction: number) => {
  const next = [...grouping.value];
  const target = index + direction;
  if (target < 0 || target >= next.length) return;
  [next[index], next[target]] = [next[target]!, next[index]!];
  grouping.value = next;
};
</script>
