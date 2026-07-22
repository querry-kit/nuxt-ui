import nuxtUi from '@nuxt/ui/vite';
import type { StorybookConfig } from '@storybook/vue3-vite';
import vue from '@vitejs/plugin-vue';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts'],
  addons: [getAbsolutePath('@storybook/addon-docs'), getAbsolutePath('@storybook/addon-a11y')],
  framework: { name: getAbsolutePath('@storybook/vue3-vite'), options: { docgen: 'vue-component-meta' } },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        vue(),
        nuxtUi({
          dts: false,
          colorMode: false,
          router: false,
          components: { directoryAsNamespace: true },
          autoImport: { dts: false, imports: ['vue'] },
        }),
      ],
    });
  },
};
export default config;

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
