# @querry-kit/nuxt-ui

Customizable Nuxt UI table controls for Query Kit. The package exposes collision-safe `QuerryKit*` components and never depends on CRM stores, layouts, or runtime configuration.

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@querry-kit/nuxt-ui'],
  querryKitUi: { autoImports: true, locales: true },
});
```

`locales: true` merges only `querryKit.table.*` English/German messages. For manual integration import `querryKitLocales` from `@querry-kit/nuxt-ui/locales`.

See `docs/` for the v-model contracts and customization examples.
