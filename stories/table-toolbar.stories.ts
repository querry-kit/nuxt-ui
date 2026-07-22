import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import QTableToolbar from '../src/runtime/components/QTableToolbar.vue';
import { FilterFieldType, FilteringFieldOperator, FilteringMode } from '../src/runtime/types/table';

const meta: Meta<typeof QTableToolbar> = {
  title: 'Table/Toolbar',
  component: QTableToolbar,
};

export default meta;
type Story = StoryObj<typeof meta>;

const columns = [
  { id: 'name', header: 'Name' },
  { id: 'active', header: 'Active' },
];

export const Default: Story = {
  render: () => ({
    components: { QTableToolbar },
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
      <QTableToolbar
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
    components: { QTableToolbar },
    setup: () => ({
      sorting: ref([]),
      filtering: ref({ operator: FilteringMode.Intersect, filters: [] }),
      columnOrder: ref(columns.map((column) => column.id)),
      invisibleColumns: ref([]),
      columnPinning: ref({}),
      columns,
    }),
    template: `
      <QTableToolbar
        v-model:sorting="sorting"
        v-model:filtering="filtering"
        v-model:column-order="columnOrder"
        v-model:invisible-columns="invisibleColumns"
        v-model:column-pinning="columnPinning"
        :column-definitions="columns"
      >
        <template #breadcrumb><strong>Custom breadcrumb</strong></template>
        <template #new><button type="button">Create person</button></template>
      </QTableToolbar>`,
  }),
};

export const SortingConfigured: Story = {
  render: () => ({
    components: { QTableToolbar },
    setup: () => ({
      search: ref(''),
      sorting: ref([{ id: 'name', desc: false }]),
      filtering: ref({ operator: FilteringMode.Intersect, filters: [] }),
      columnOrder: ref(columns.map((column) => column.id)),
      invisibleColumns: ref([]),
      columnPinning: ref({}),
      columns,
      sortableFields: columns.map((column) => ({ value: column.id, label: column.header })),
      filterFields: [{ value: 'active', label: 'Active', type: FilterFieldType.Boolean }],
    }),
    template: `
      <QTableToolbar
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

export const FilteringConfigured: Story = {
  render: () => ({
    components: { QTableToolbar },
    setup: () => ({
      search: ref(''),
      sorting: ref([]),
      filtering: ref({
        operator: FilteringMode.Intersect,
        filters: [
          { id: 'active', field: 'active', type: FilterFieldType.Boolean, value: true },
          {
            id: 'rank',
            field: 'rank',
            type: FilterFieldType.Number,
            operator: FilteringFieldOperator.GreaterThanOrEqual,
            value: 5,
          },
        ],
      }),
      columnOrder: ref(columns.map((column) => column.id)),
      invisibleColumns: ref([]),
      columnPinning: ref({}),
      columns,
      sortableFields: columns.map((column) => ({ value: column.id, label: column.header })),
      filterFields: [
        { value: 'active', label: 'Active', type: FilterFieldType.Boolean },
        { value: 'rank', label: 'Priority', type: FilterFieldType.Number },
      ],
    }),
    template: `
      <QTableToolbar
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
