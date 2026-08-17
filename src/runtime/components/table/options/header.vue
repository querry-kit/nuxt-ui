<template>
  <div class="mb-4 flex items-center gap-2">
    <UIcon :name="icon('options.header')" />
    {{ t('options.title') }}
  </div>
</template>

<script setup lang="ts">
import { useTableI18n } from '../../../composables/use-table-i18n';
import { useTableIcons } from '../../../composables/use-table-icons';
import type { TableIconOverrides } from '../../../icons';
import type { TableTextOverrides } from '../../../texts';

const props = defineProps<{ texts?: TableTextOverrides; icons?: TableIconOverrides }>();
const t = useTableI18n(props.texts);
const icon = useTableIcons(props.icons);
</script>
