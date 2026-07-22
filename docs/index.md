# Query Kit Nuxt UI

`@querry-kit/nuxt-ui` supplies table toolbar, sorting, filtering, column options and pagination for Nuxt UI 4. Each public component starts with `QuerryKit` and can be auto-imported by the module.

## Installation

```bash
pnpm add @querry-kit/nuxt @querry-kit/nuxt-ui @nuxt/ui
```

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@querry-kit/nuxt-ui'],
  querryKitUi: { autoImports: true, locales: true },
});
```

## Toolbar

`QuerryKitTableToolbar` retains the Core-Web contracts: `v-model:search`, `v-model:sorting`, `v-model:filtering`, `v-model:column-order`, `v-model:invisible-columns`, and `v-model:column-pinning`. Replace a region with `breadcrumb`, `search`, `options`, or `new`; every slot receives the current state and mutators where applicable.

## Controls

- `QuerryKitTableSorting` supports `v-model:sorting`, field selection, direction changes and <kbd>Shift</kbd>+<kbd>S</kbd>.
- `QuerryKitTableFiltering` supports Query Kit-style AND/OR filters and <kbd>Shift</kbd>+<kbd>F</kbd>.
- `QuerryKitTableOptions` supports visibility, native drag reordering, pinning and <kbd>Shift</kbd>+<kbd>O</kbd>.
- `QuerryKitTablePagination` supports `v-model:page`, `v-model:items-per-page`, footer slots and Shift+arrow page navigation.

Disable shortcuts per component with `:shortcuts="false"`.
