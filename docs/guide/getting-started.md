# Getting started

## Install

```bash
pnpm add @querry-kit/nuxt @querry-kit/nuxt-ui @nuxt/ui
```

Register Nuxt UI before this module. Components are auto-imported and work without i18n, using bundled English defaults. If the application provides vue-i18n, English and German messages are merged under `@querry-kit.table` by default.

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@querry-kit/nuxt-ui'],
  querryKitUi: {
    autoImports: true,
    locales: true,
  },
});
```

Set either option to `false` when the application registers the corresponding integration itself. The module never installs or requires an i18n provider; with `locales: true` it only merges messages when an application provides vue-i18n.

## Compose a table toolbar

All state remains in the consuming application. Bind only the models needed by the controls you render.

```vue
<QuerryKitTableToolbar
  v-model:search="search"
  v-model:sorting="sorting"
  v-model:filtering="filtering"
  v-model:column-order="columnOrder"
  v-model:invisible-columns="invisibleColumns"
  v-model:column-pinning="columnPinning"
  :sortable-fields="sortableFields"
  :filter-fields="filterFields"
  :column-definitions="columns"
/>
```

The controls emit immutable replacement values through their `v-model`s. This keeps them independent from a particular table implementation or application store.

## Keyboard shortcuts

| Control        | Shortcut                                                               |
| -------------- | ---------------------------------------------------------------------- |
| Sorting        | <kbd>Shift</kbd> + <kbd>S</kbd>                                        |
| Filtering      | <kbd>Shift</kbd> + <kbd>F</kbd>                                        |
| Column options | <kbd>Shift</kbd> + <kbd>O</kbd>                                        |
| Pagination     | <kbd>Shift</kbd> + arrow keys; add <kbd>Ctrl</kbd> for first/last page |

Pass `:shortcuts="false"` to an individual component to disable its listener.
