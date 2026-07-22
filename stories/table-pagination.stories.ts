import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import QTablePagination from '../src/runtime/components/table/pagination/index.vue';

const meta: Meta<typeof QTablePagination> = { title: 'Table/Pagination', component: QTablePagination };
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { QTablePagination },
    setup: () => ({ page: ref(2), itemsPerPage: ref(25) }),
    template: '<QTablePagination v-model:page="page" v-model:items-per-page="itemsPerPage" :total-items="123" />',
  }),
};
export const CustomFooter: Story = {
  render: () => ({
    components: { QTablePagination },
    setup: () => ({ page: ref(1), itemsPerPage: ref(10) }),
    template:
      '<QTablePagination v-model:page="page" v-model:items-per-page="itemsPerPage" :total-items="20"><template #right>Custom footer</template></QTablePagination>',
  }),
};
