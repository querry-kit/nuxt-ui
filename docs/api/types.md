# Types and text customization

Import public state types from the package root:

```ts
import {
  FilterFieldType,
  FilteringMode,
  type ColumnDefinition,
  type Filtering,
  type SortingState,
} from '@querry-kit/nuxt-ui';
```

`SortingState` is an ordered list of `{ id, desc }`. `Filtering` combines `FilteringMode.Intersect` (`AND`) or `FilteringMode.Union` (`OR`) with typed filter entries. `ColumnDefinition` and `ColumnPinning` model the values accepted by column options.

## Texts without i18n

`@querry-kit/nuxt-ui` has no i18n runtime dependency. Without vue-i18n, every control uses its bundled English defaults. Pass the optional `texts` prop to any table control, or to `QTableToolbar` to forward the same overrides to its default sorting, filtering, and column-option controls.

```vue
<QTableToolbar
  v-model:search="search"
  :texts="{
    search: { placeholder: 'Find projects' },
    sorting: { title: 'Order by', add: 'Add order' },
    pagination: { summary: 'Rows {start}–{end} of {total}' },
  }"
/>
```

Explicit `texts` values have priority over vue-i18n and the English defaults. `QTablePagination` also keeps its `summary` prop for changing only the result-summary template.

Slots replace a complete display region when a text override is not enough. For example, replace the sorting trigger while retaining its open state and behavior:

```vue
<QTableSorting v-model:sorting="sorting" :fields="sortableFields">
  <template #trigger="{ toggle, active }">
    <UButton :color="active ? 'primary' : 'neutral'" label="Order projects" @click="toggle" />
  </template>
</QTableSorting>
```

The toolbar exposes `breadcrumb`, `search`, `options`, and `new`; sorting, filtering, and options expose `trigger`, `header`, `items`, `item`, and `add` where applicable; pagination exposes `left`, `page-size`, `pagination`, and `right`.

## Texts with vue-i18n

Install and configure an i18n provider only when the application needs translations:

```sh
pnpm add @nuxtjs/i18n vue-i18n
```

Register it before `@querry-kit/nuxt-ui`. With the default `querryKitUi.locales: true`, the package merges its English and German payloads into the provider when it is available. It never installs or requires the provider itself.

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@querry-kit/nuxt-ui'],
  querryKitUi: { locales: true },
});
```

All package keys are namespaced below `@querry-kit.table`, avoiding collisions with application messages. To manage the messages yourself, disable the automatic merge and import the payloads:

```ts
import { querryKitLocales } from '@querry-kit/nuxt-ui/locales';

i18n.global.mergeLocaleMessage('en', querryKitLocales.en);
i18n.global.mergeLocaleMessage('de', querryKitLocales.de);
```

## Complete message JSON

Use this complete shape in an application locale file. It is also the shape accepted by the `texts` prop without the outer `@querry-kit.table` wrapper.

```json
{
  "@querry-kit": {
    "table": {
      "search": {
        "placeholder": "Search"
      },
      "sorting": {
        "title": "Sort",
        "field": "Select field",
        "add": "Add sort",
        "clear": "Clear sorting",
        "remove": "Remove sort",
        "toggle": "Toggle sort direction"
      },
      "filtering": {
        "title": "Filter",
        "field": "Select field",
        "add": "Add filter",
        "clear": "Clear filters",
        "remove": "Remove filter",
        "mode": "Toggle filter mode"
      },
      "options": {
        "title": "Table options",
        "pin": "Pin column",
        "left": "Left",
        "right": "Right",
        "center": "Unpin",
        "visibility": "Toggle column visibility"
      },
      "pagination": {
        "summary": "Showing {start}–{end} of {total}"
      }
    }
  }
}
```
