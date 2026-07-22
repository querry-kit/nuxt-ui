import UApp from '@nuxt/ui/components/App.vue';
import nuxtUiPlugin from '@nuxt/ui/vue-plugin';
import type { Preview } from '@storybook/vue3-vite';
import { setup } from '@storybook/vue3-vite';

setup((app) => app.use(nuxtUiPlugin));

const preview: Preview = {
  decorators: [(story) => ({ components: { story, UApp }, template: '<UApp :toaster="null"><story /></UApp>' })],
  parameters: { layout: 'centered' },
};

export default preview;
