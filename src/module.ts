import { addComponentsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import type { NuxtModule } from '@nuxt/schema';

export interface QuerryKitNuxtUiOptions {
  /** Register collision-safe QuerryKit table components for Nuxt auto-imports. */
  autoImports?: boolean;
  /** Merge bundled `@querry-kit.table` messages into vue-i18n when an application provides it. */
  locales?: boolean;
}

const querryKitNuxtUiModule: NuxtModule<QuerryKitNuxtUiOptions> = defineNuxtModule<QuerryKitNuxtUiOptions>({
  meta: { name: '@querry-kit/nuxt-ui', configKey: 'querryKitUi', compatibility: { nuxt: '^4.0.0' } },
  defaults: { autoImports: true, locales: true },
  setup(options) {
    const resolver = createResolver(import.meta.url);
    if (options.autoImports) addComponentsDir({ path: resolver.resolve('runtime/components'), pathPrefix: false });
    if (options.locales) addPlugin(resolver.resolve('runtime/plugins/locales'));
  },
});

export default querryKitNuxtUiModule;
