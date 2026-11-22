<template>
  <UModal
    v-if="isSmall"
    v-model:open="open"
    :title="title"
    modal
    :content="{ 'aria-modal': true }"
    :close="false"
    :scrollable="false"
    :ui="{
  content: 'qk-table-toolbar-dialog',
  wrapper: 'sr-only'
}"
  >
    <slot name="trigger" :dialog="true" />
    <template #actions>
      <div class="qk-table-toolbar-dialog-header">
        <slot name="header" />
      </div>
    </template>
    <template #body>
      <div :class="bodyClass">
        <slot />
      </div>
    </template>
    <template #footer="{ close }">
      <UButton color="neutral" variant="outline" :label="t('toolbar.close')" @click="close" />
    </template>
  </UModal>

  <template v-else>
    <span v-if="anchored" ref="anchor">
      <slot name="trigger" :dialog="false" />
    </span>
    <UPopover
      v-model:open="open"
      :reference="anchor"
      :content="popoverContent"
      :ui="{ content: popoverClass }"
      :modal="anchored ? false : void 0"
    >
      <template v-if="!anchored" #default>
        <slot name="trigger" :dialog="false" />
      </template>
      <template #content>
        <div :class="popoverBodyClass">
          <slot name="header" />
          <slot />
        </div>
      </template>
    </UPopover>
  </template>
</template>

<script setup>
import { computed, inject, useTemplateRef } from "vue";
import { useTableI18n } from "../../../composables/use-table-i18n";
import { toolbarSmallKey } from "./context";
const props = defineProps({
  title: { type: String, required: true },
  anchored: { type: Boolean, required: false },
  popoverClass: { type: String, required: true },
  popoverBodyClass: { type: Array, required: true },
  bodyClass: { type: String, required: false },
  texts: { type: null, required: false }
});
defineSlots();
const open = defineModel("open", { type: Boolean, ...{ required: true } });
const isSmall = inject(toolbarSmallKey);
const anchor = useTemplateRef("anchor");
const t = useTableI18n(() => props.texts);
const popoverContent = computed(
  () => props.anchored ? { align: "start", side: "bottom", sideOffset: 8, "aria-label": props.title } : void 0
);
</script>

<style>
.qk-table-toolbar-dialog{max-height:calc(100dvh - 2rem);overflow:hidden;width:calc(100% - 2rem)}.qk-table-toolbar-dialog>[data-slot=footer],.qk-table-toolbar-dialog>[data-slot=header]{flex-shrink:0}.qk-table-toolbar-dialog>[data-slot=body]{min-height:0;overflow-y:auto;overscroll-behavior:contain}.qk-table-toolbar-dialog>[data-slot=footer]{justify-content:flex-end}.qk-table-toolbar-dialog-header{width:100%}.qk-table-toolbar-dialog-header>*{margin-bottom:0}
</style>
