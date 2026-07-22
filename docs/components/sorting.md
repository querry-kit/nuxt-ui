# Sorting

`QuerryKitTableSorting` manages an ordered `v-model:sorting` list. It accepts `fields: SortingField[]`, omits disabled or already selected fields from the add menu, and provides ascending/descending toggles.

| Prop         | Default                | Description                                     |
| ------------ | ---------------------- | ----------------------------------------------- |
| `fields`     | required               | Available `{ value, label, disabled? }` fields. |
| `icon`       | `i-tabler-arrows-sort` | Trigger icon.                                   |
| `shortcuts`  | `true`                 | Enables <kbd>Shift</kbd> + <kbd>S</kbd>.        |
| `ui.content` | —                      | Nuxt UI popover content classes.                |

Slots `trigger`, `header`, `items`, `item` and `add` expose the displayed state plus the matching mutation functions (`clear`, `remove`, `move`, `toggleDirection` or `add`).
