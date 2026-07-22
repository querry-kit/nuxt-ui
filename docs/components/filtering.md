# Filtering

`QuerryKitTableFiltering` edits a Query Kit `Filtering` value with an `AND`/`OR` mode. Boolean, number, enum and custom select fields receive sensible initial operators and values.

![Open filtering popover](/components/table-filtering-popover.png)

| Prop         | Default           | Description                                                  |
| ------------ | ----------------- | ------------------------------------------------------------ |
| `fields`     | required          | `FilterField[]` definitions.                                 |
| `icon`       | `i-tabler-filter` | Trigger icon.                                                |
| `shortcuts`  | `true`            | Enables <kbd>Shift</kbd> + <kbd>F</kbd>.                     |
| `texts`      | —                 | Explicit text overrides, ahead of i18n and English defaults. |
| `ui.content` | —                 | Nuxt UI popover content classes.                             |

Use an enum field's optional `component` or a select field's required `component` for a custom value editor. The slots `trigger`, `header`, `items`, `item` and `add` allow replacing each region without duplicating state logic.
