import UApp from '@nuxt/ui/components/App.vue';
import nuxtUiPlugin from '@nuxt/ui/vue-plugin';
import type { Preview } from '@storybook/vue3-vite';
import { setup } from '@storybook/vue3-vite';
import QuerryKitTableFiltering from '../src/runtime/components/QuerryKitTableFiltering.vue';
import QuerryKitTableOptions from '../src/runtime/components/QuerryKitTableOptions.vue';
import QuerryKitTableSorting from '../src/runtime/components/QuerryKitTableSorting.vue';
import './preview.css';

setup((app) => {
  app.use(nuxtUiPlugin);
  app.component('QuerryKitTableFiltering', QuerryKitTableFiltering);
  app.component('QuerryKitTableOptions', QuerryKitTableOptions);
  app.component('QuerryKitTableSorting', QuerryKitTableSorting);
});

const preview: Preview = {
  decorators: [(story) => ({ components: { story, UApp }, template: '<UApp :toaster="null"><story /></UApp>' })],
  parameters: { layout: 'centered' },
};

export default preview;
