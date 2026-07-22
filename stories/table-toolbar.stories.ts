import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import QuerryKitTableToolbar from '../src/runtime/components/QuerryKitTableToolbar.vue';
import { FilterFieldType, FilteringMode } from '../src/runtime/types/table';

const meta: Meta<typeof QuerryKitTableToolbar> = {
  title: 'Table/Toolbar',
  component: QuerryKitTableToolbar,
};

export default meta;
type Story = StoryObj<typeof meta>;

const columns = [
  { id: 'name', header: 'Name' },
  { id: 'active', header: 'Active' },
];

export const Default: Story = {
  render: () => ({
    components: { QuerryKitTableToolbar },
    setup: () => ({
      search: ref(''),
      sorting: ref([]),
      filtering: ref({ operator: FilteringMode.Intersect, filters: [] }),
      columnOrder: ref(columns.map((column) => column.id)),
      invisibleColumns: ref([]),
      columnPinning: ref({}),
      columns,
      sortableFields: columns.map((column) => ({ value: column.id, label: column.header })),
      filterFields: [{ value: 'active', label: 'Active', type: FilterFieldType.Boolean }],
    }),
    template: `
      <QuerryKitTableToolbar
        v-model:search="search"
        v-model:sorting="sorting"
        v-model:filtering="filtering"
        v-model:column-order="columnOrder"
        v-model:invisible-columns="invisibleColumns"
        v-model:column-pinning="columnPinning"
        :column-definitions="columns"
        :sortable-fields="sortableFields"
        :filter-fields="filterFields"
        :breadcrumb-items="[{ label: 'People' }]"
      />`,
  }),
};

export const CustomRegions: Story = {
  render: () => ({
    components: { QuerryKitTableToolbar },
    setup: () => ({
      sorting: ref([]),
      filtering: ref({ operator: FilteringMode.Intersect, filters: [] }),
      columnOrder: ref(columns.map((column) => column.id)),
      invisibleColumns: ref([]),
      columnPinning: ref({}),
      columns,
    }),
    template: `
      <QuerryKitTableToolbar
        v-model:sorting="sorting"
        v-model:filtering="filtering"
        v-model:column-order="columnOrder"
        v-model:invisible-columns="invisibleColumns"
        v-model:column-pinning="columnPinning"
        :column-definitions="columns"
      >
        <template #breadcrumb><strong>Custom breadcrumb</strong></template>
        <template #new><button type="button">Create person</button></template>
      </QuerryKitTableToolbar>`,
  }),
};
