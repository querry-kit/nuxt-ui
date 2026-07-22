<template>
  <div class="mb-4 flex items-center gap-2">
    <UIcon name="i-tabler-adjustments" />
    {{ t('options.title') }}
  </div>
</template>

<script setup lang="ts">
import { useTableI18n } from '../../../composables/use-table-i18n';
import type { TableTextOverrides } from '../../../texts';

const props = defineProps<{ texts?: TableTextOverrides }>();
const t = useTableI18n(props.texts);
</script>
