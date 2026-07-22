import UApp from '@nuxt/ui/components/App.vue';
import nuxtUiPlugin from '@nuxt/ui/vue-plugin';
import type { Preview } from '@storybook/vue3-vite';
import { setup } from '@storybook/vue3-vite';
import QTableFiltering from '../src/runtime/components/table/filtering/index.vue';
import QTableOptions from '../src/runtime/components/table/options/index.vue';
import QTableSorting from '../src/runtime/components/table/sorting/index.vue';
import './preview.css';

setup((app) => {
  app.use(nuxtUiPlugin);
  app.component('QTableFiltering', QTableFiltering);
  app.component('QTableOptions', QTableOptions);
  app.component('QTableSorting', QTableSorting);
});

const preview: Preview = {
  decorators: [(story) => ({ components: { story, UApp }, template: '<UApp :toaster="null"><story /></UApp>' })],
  parameters: { layout: 'centered' },
};

export default preview;
