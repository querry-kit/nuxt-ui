import { defineNuxtModule, createResolver, addComponentsDir, addPlugin } from '@nuxt/kit';

const querryKitNuxtUiModule = defineNuxtModule({
  meta: { name: "@querry-kit/nuxt-ui", configKey: "querryKitUi", compatibility: { nuxt: "^4.0.0" } },
  defaults: { autoImports: true, locales: true },
  setup(options) {
    const resolver = createResolver(import.meta.url);
    if (options.autoImports) addComponentsDir({ path: resolver.resolve("runtime/components"), pathPrefix: false });
    if (options.locales) addPlugin(resolver.resolve("runtime/plugins/locales"));
  }
});

export { querryKitNuxtUiModule as default };
