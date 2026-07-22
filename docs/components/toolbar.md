# Table toolbar

`QuerryKitTableToolbar` arranges a breadcrumb, search input, create action and the three table controls. It does not own table data or perform filtering itself.

![Default toolbar](/components/table-toolbar-default.png)

## Models

| Model               | Purpose                                                |
| ------------------- | ------------------------------------------------------ |
| `search`            | Free-text search value; empty input emits `undefined`. |
| `sorting`           | Ordered `SortingState`.                                |
| `filtering`         | Query Kit `Filtering` object.                          |
| `column-order`      | Ordered column IDs.                                    |
| `invisible-columns` | Hidden column IDs.                                     |
| `column-pinning`    | Left and right pinned column IDs.                      |

Pass `sortable-fields`, `filter-fields` and `column-definitions` to enable the corresponding default controls. `breadcrumb-items` and `search-placeholder` customize the default leading region. Pass `texts` to override individual strings in the toolbar and its default controls without installing i18n.

## Slots

| Slot         | Slot props                            |
| ------------ | ------------------------------------- |
| `breadcrumb` | `items`                               |
| `search`     | `search`, `setSearch`                 |
| `options`    | `sorting`, `filtering`, `columnOrder` |
| `new`        | None                                  |

```vue
<QuerryKitTableToolbar v-model:search="search">
  <template #new><UButton label="Create record" /></template>
  <template #search="{ search, setSearch }">
    <UInput :model-value="search" @update:model-value="setSearch" />
  </template>
</QuerryKitTableToolbar>
```
