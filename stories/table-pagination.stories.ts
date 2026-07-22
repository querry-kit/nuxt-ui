import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';
import QuerryKitTablePagination from '../src/runtime/components/QuerryKitTablePagination.vue';

const meta: Meta<typeof QuerryKitTablePagination> = { title: 'Table/Pagination', component: QuerryKitTablePagination };
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { QuerryKitTablePagination },
    setup: () => ({ page: ref(2), itemsPerPage: ref(25) }),
    template:
      '<QuerryKitTablePagination v-model:page="page" v-model:items-per-page="itemsPerPage" :total-items="123" />',
  }),
};
export const CustomFooter: Story = {
  render: () => ({
    components: { QuerryKitTablePagination },
    setup: () => ({ page: ref(1), itemsPerPage: ref(10) }),
    template:
      '<QuerryKitTablePagination v-model:page="page" v-model:items-per-page="itemsPerPage" :total-items="20"><template #right>Custom footer</template></QuerryKitTablePagination>',
  }),
};
