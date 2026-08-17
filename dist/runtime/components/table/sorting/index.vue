<template>
  <span ref="trigger">
    <slot name="trigger" :open="open" :toggle="toggle" :active="hasSorting">
      <UButton
        variant="ghost"
        :aria-label="t('sorting.title')"
        :color="hasSorting ? 'primary' : 'neutral'"
        :icon="icon ?? tableIcon('sorting.trigger')"
        @click="toggle"
      />
    </slot>
  </span>
  <UPopover
    v-model:open="open"
    :reference="trigger"
    :content="{ align: 'start', side: 'bottom', sideOffset: 8 }"
    :modal="false"
  >
    <template #content>
      <div class="w-80 p-2.5" :class="ui?.content">
        <slot name="header" :sorting="sorting" :clear="clear">
          <SortingHeader :has-sorting="hasSorting" :texts="texts" :icons="icons" :clear="clear" />
        </slot>
        <slot name="items" :sorting="sorting" :remove="remove" :toggle-direction="toggleDirection" :move="move">
          <SortingItems
            :sorting="sorting"
            :has-sorting="hasSorting"
            :remove="remove"
            :toggle-direction="toggleDirection"
          >
            <template #item="itemProps">
              <slot name="item" v-bind="itemProps">
                <SortingItem
                  :sort="itemProps.sort"
                  :fields="fields"
                  :texts="texts"
                  :icons="icons"
                  :remove="itemProps.remove"
                  :toggle-direction="itemProps.toggleDirection"
                />
              </slot>
            </template>
          </SortingItems>
        </slot>
        <USeparator v-if="hasSorting && availableFields.length" class="my-2" />
        <slot name="add" :available-fields="availableFields" :add="add">
          <SortingAdd :fields="availableFields" :texts="texts" :icons="icons" :add="add" />
        </slot>
      </div>
    </template>
  </UPopover>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useTableI18n } from "../../../composables/use-table-i18n";
import { useTableIcons } from "../../../composables/use-table-icons";
import { canHandleTableShortcut } from "../../../utils/keyboard";
import SortingAdd from "./add.vue";
import SortingHeader from "./header.vue";
import SortingItem from "./item.vue";
import SortingItems from "./items.vue";
const props = defineProps({
  fields: { type: Array, required: true },
  icon: { type: String, required: false },
  shortcuts: { type: Boolean, required: false, default: true },
  texts: { type: null, required: false },
  icons: { type: null, required: false },
  ui: { type: Object, required: false }
});
const sorting = defineModel("sorting", { type: Array, ...{ required: true } });
const trigger = ref();
const open = ref(false);
const t = useTableI18n(props.texts);
const tableIcon = useTableIcons(props.icons);
const hasSorting = computed(() => sorting.value.length > 0);
const availableFields = computed(
  () => props.fields.filter((field) => !field.disabled && !sorting.value.some((sort) => sort.id === field.value))
);
const toggle = () => open.value = !open.value;
const clear = () => sorting.value = [];
const add = (id) => {
  if (!sorting.value.some((sort) => sort.id === id)) sorting.value = [...sorting.value, { id, desc: false }];
};
const remove = (id) => sorting.value = sorting.value.filter((sort) => sort.id !== id);
const toggleDirection = (id) => sorting.value = sorting.value.map((sort) => sort.id === id ? { ...sort, desc: !sort.desc } : sort);
const move = (from, to) => {
  const next = [...sorting.value];
  const [item] = next.splice(from, 1);
  if (item) next.splice(to, 0, item);
  sorting.value = next;
};
const onKeydown = (event) => {
  if (canHandleTableShortcut(event) && props.shortcuts && event.shiftKey && event.key.toLowerCase() === "s") {
    event.preventDefault();
    toggle();
  }
};
onMounted(() => document.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => document.removeEventListener("keydown", onKeydown));
</script>
