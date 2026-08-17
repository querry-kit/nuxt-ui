<template>
  <span class="text-muted grow truncate text-sm">{{ column.header }}</span>
  <UPopover>
    <UButton color="neutral" size="xs" variant="ghost" :icon="icon('options.pin')" :aria-label="t('options.pin')" />
    <template #content>
      <div class="flex p-1">
        <UButton size="xs" variant="ghost" :label="t('options.left')" @click="pin('left')" />
        <UButton size="xs" variant="ghost" :label="t('options.center')" @click="pin('center')" />
        <UButton size="xs" variant="ghost" :label="t('options.right')" @click="pin('right')" />
      </div>
    </template>
  </UPopover>
  <USwitch
    :aria-label="t('options.visibility')"
    :disabled="column.enableHiding === false"
    :model-value="visible"
    @update:model-value="toggleVisibility"
  />
</template>

<script setup lang="ts">
import { useTableI18n } from '../../../composables/use-table-i18n';
import { useTableIcons } from '../../../composables/use-table-icons';
import type { TableIconOverrides } from '../../../icons';
import type { TableTextOverrides } from '../../../texts';
import type { ColumnDefinition } from '../../../types/table';
import type { PinSide } from './items.vue';

const props = defineProps<{
  column: ColumnDefinition;
  visible: boolean;
  texts?: TableTextOverrides;
  icons?: TableIconOverrides;
  pin: (side: PinSide) => void;
  toggleVisibility: () => void;
}>();
const t = useTableI18n(props.texts);
const icon = useTableIcons(props.icons);
</script>
