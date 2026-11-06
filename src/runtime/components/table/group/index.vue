<template>
  <section class="border-default rounded-md border">
    <UButton
      class="w-full justify-start"
      variant="ghost"
      :aria-expanded="expanded"
      :icon="icon(expanded ? 'grouping.expanded' : 'grouping.collapsed')"
      @click="emit('toggle')"
    >
      <slot name="header" :label="label" :count="count" :expanded="expanded">
        <span class="min-w-0 truncate">{{ label }}</span>
        <span class="text-muted">{{ t('grouping.count', { count }) }}</span>
      </slot>
    </UButton>
    <div v-if="expanded" class="space-y-2 p-3">
      <p v-if="loading" role="status">{{ t('grouping.loading') }}</p>
      <div v-if="error" role="alert">
        <span>{{ t('grouping.error') }}</span>
        <UButton variant="ghost" :label="t('grouping.retry')" @click="emit('retry')" />
      </div>
      <slot :loading="loading" :error="error" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useTableI18n } from '../../../composables/use-table-i18n';
import { useTableIcons } from '../../../composables/use-table-icons';
import type { TableIconOverrides } from '../../../icons';
import type { TableTextOverrides } from '../../../texts';

/** Controlled accessible group header and slotted branch content. */
const props = defineProps<{
  label: string;
  count: number;
  expanded: boolean;
  loading?: boolean;
  error?: unknown;
  texts?: TableTextOverrides;
  icons?: TableIconOverrides;
}>();
const emit = defineEmits<{ toggle: []; retry: [] }>();
const t = useTableI18n(props.texts);
const icon = useTableIcons(props.icons);
</script>
