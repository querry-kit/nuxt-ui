# Types and locales

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

## Locales

The module merges English and German messages into vue-i18n by default. For a manual setup, import the locale payloads without installing the Nuxt module plugin:

```ts
import { querryKitLocales } from '@querry-kit/nuxt-ui/locales';

i18n.global.mergeLocaleMessage('en', querryKitLocales.en);
i18n.global.mergeLocaleMessage('de', querryKitLocales.de);
```

Messages are namespaced under `querryKit.table`, so application messages remain untouched.
