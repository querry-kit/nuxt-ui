# Pagination

`QuerryKitTablePagination` is a standalone footer for page-based APIs.

| Prop/model               | Default                   | Description                                                  |
| ------------------------ | ------------------------- | ------------------------------------------------------------ |
| `v-model:page`           | required                  | One-based current page.                                      |
| `v-model:items-per-page` | required                  | Current page size.                                           |
| `total-items`            | `0`                       | Total available rows.                                        |
| `page-sizes`             | `[1, 2, 10, 25, 50, 100]` | Selectable page sizes.                                       |
| `summary`                | localized                 | Custom `Showing {start}–{end} of {total}` template.          |
| `texts`                  | —                         | Explicit text overrides, ahead of i18n and English defaults. |

Use the `summary`, `page-size`, `pagination`, `left` and `right` slots to replace footer regions. Changing the page size clamps the current page to the new page count.

![Default pagination](/components/table-pagination-default.png)

![Pagination with a custom footer](/components/table-pagination-custom-footer.png)
