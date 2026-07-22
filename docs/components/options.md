# Column options

`QuerryKitTableOptions` controls ordering, visibility and pinning without requiring a specific table adapter. It uses native drag and drop for the default order editor.

| Model               | Description                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------- |
| `column-order`      | Source of the displayed order and target of reordering.                                       |
| `invisible-columns` | IDs currently hidden. A column with `enableHiding: false` cannot be toggled.                  |
| `column-pinning`    | `{ left?: string[], right?: string[] }`. Pinning to the centre removes an ID from both sides. |

The required `columns` prop takes `ColumnDefinition[]`. Customize `trigger`, `header`, `items` or `item`; their slot props provide `move`, `toggleVisibility` and `pin`. <kbd>Shift</kbd> + <kbd>O</kbd> toggles the popover unless `shortcuts` is disabled.
