# @querry-kit/nuxt-ui <!-- omit in toc -->

[![npm](https://img.shields.io/npm/v/%40querry-kit%2Fnuxt-ui?label=npm&logo=npm&logoColor=white&style=for-the-badge)](https://www.npmjs.com/package/@querry-kit/nuxt-ui)
[![npm downloads](https://img.shields.io/npm/dm/%40querry-kit%2Fnuxt-ui?label=downloads&logo=npm&logoColor=white&style=for-the-badge)](https://www.npmjs.com/package/@querry-kit/nuxt-ui)
[![license](https://img.shields.io/npm/l/%40querry-kit%2Fnuxt-ui?label=license&style=for-the-badge)](LICENSE)
[![node](https://img.shields.io/node/v/%40querry-kit%2Fnuxt-ui?label=node&logo=nodedotjs&logoColor=white&style=for-the-badge)](package.json)
[![bundle size](https://img.shields.io/bundlephobia/minzip/%40querry-kit%2Fnuxt-ui?label=size&logo=webpack&logoColor=white&style=for-the-badge)](https://bundlephobia.com/package/@querry-kit/nuxt-ui)
[![TypeScript](https://img.shields.io/badge/types-TypeScript-3178c6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)
[![Buy Me a Coffee](https://img.shields.io/badge/buy_me_a_coffee-tobiaswaelde-ffdd00?logo=buymeacoffee&logoColor=000000&style=for-the-badge)](https://www.buymeacoffee.com/tobiaswaelde)

[![build](https://img.shields.io/github/actions/workflow/status/querry-kit/nuxt-ui/build.yml?branch=main&label=build&logo=githubactions&logoColor=white&style=for-the-badge)](https://github.com/querry-kit/nuxt-ui/actions/workflows/build.yml)
[![test](https://img.shields.io/github/actions/workflow/status/querry-kit/nuxt-ui/test.yml?branch=main&label=test&logo=vitest&logoColor=white&style=for-the-badge)](https://github.com/querry-kit/nuxt-ui/actions/workflows/test.yml)
[![coverage](https://img.shields.io/github/actions/workflow/status/querry-kit/nuxt-ui/test.yml?branch=main&label=coverage&logo=vitest&logoColor=white&style=for-the-badge)](https://github.com/querry-kit/nuxt-ui/actions/workflows/test.yml)
[![lint](https://img.shields.io/github/actions/workflow/status/querry-kit/nuxt-ui/lint.yml?branch=main&label=lint&logo=eslint&logoColor=white&style=for-the-badge)](https://github.com/querry-kit/nuxt-ui/actions/workflows/lint.yml)
[![docs](https://img.shields.io/github/actions/workflow/status/querry-kit/nuxt-ui/docs.yml?branch=main&label=docs&logo=vitepress&logoColor=white&style=for-the-badge)](https://github.com/querry-kit/nuxt-ui/actions/workflows/docs.yml)
[![changesets](https://img.shields.io/github/actions/workflow/status/querry-kit/nuxt-ui/changesets.yml?branch=main&label=changesets&logo=changesets&logoColor=white&style=for-the-badge)](https://github.com/querry-kit/nuxt-ui/actions/workflows/changesets.yml)
[![npm publish](https://img.shields.io/github/actions/workflow/status/querry-kit/nuxt-ui/release.yml?branch=main&label=npm%20publish&logo=githubactions&logoColor=white&style=for-the-badge)](https://github.com/querry-kit/nuxt-ui/actions/workflows/release.yml)

Composable Nuxt UI table controls for Query Kit applications: toolbar, sorting, filtering, column preferences, pagination, keyboard shortcuts and optional English/German locale messages. Every public component begins with `QuerryKit`, and the package does not depend on application stores, layouts or runtime configuration.

📖 Documentation: https://querry-kit.github.io/nuxt-ui/

## 🌐 Querry Kit Ecosystem

The [Querry Kit overview](https://querry-kit.github.io/querry-kit/) connects the three main repositories:

- [`@querry-kit/nest`](https://github.com/querry-kit/nest) for the Query Kit-compatible NestJS API and controller patterns.
- [`@querry-kit/nuxt`](https://github.com/querry-kit/nuxt) for typed API clients and headless Vue/Nuxt data primitives.
- [`@querry-kit/nuxt-ui`](https://github.com/querry-kit/nuxt-ui) for Nuxt UI integrations built on these primitives.

It also contains the complete Workboard API-and-web-app example, which shows the packages working together end to end.

## 📚 Table of Contents <!-- omit in toc -->

- [🌐 Querry Kit Ecosystem](#-querry-kit-ecosystem)
- [📦 Install](#-install)
- [🚀 Release Workflow](#-release-workflow)
- [🧩 Usage](#-usage)
- [🧱 Components](#-components)
- [📖 Documentation](#-documentation)
- [🛠 Development](#-development)

## 📦 Install

```sh
pnpm add @querry-kit/nuxt @querry-kit/nuxt-ui @nuxt/ui
```

Register Nuxt UI before this module. Components are auto-imported and work without an i18n dependency, using bundled English defaults. When an application provides vue-i18n, the module can merge its English and German messages under the `@querry-kit.table` namespace.

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@querry-kit/nuxt-ui'],
  querryKitUi: {
    autoImports: true,
    locales: true,
  },
});
```

Set either option to `false` when the application registers the corresponding integration itself. The package never installs or requires an i18n provider. Pass a `texts` prop for explicit component text overrides, or replace display regions with the documented slots.

The current package version is published on npm. npm is the primary distribution channel.

GitHub release tags remain available as a fallback:

```sh
pnpm add github:querry-kit/nuxt-ui#v0.0.1
```

## 🚀 Release Workflow

Releases are driven by Changesets and GitHub Actions. The `main` branch contains source, documentation, screenshot baselines and workflow configuration; published package files are built in CI.

Package-visible changes should include a changeset:

```sh
pnpm changeset
```

When changes land on `main`, the [changesets workflow](https://github.com/querry-kit/nuxt-ui/actions/workflows/changesets.yml) creates or updates a release PR. That PR contains the version bump and changelog updates produced by:

```sh
pnpm changeset version
```

The [npm publish workflow](https://github.com/querry-kit/nuxt-ui/actions/workflows/release.yml) uses npm Trusted Publishing through GitHub Actions OIDC. The npm package must be connected to this repository and workflow in the npm package publishing settings:

- Repository: `querry-kit/nuxt-ui`
- Workflow file: `release.yml`
- Environment: unset

After the release PR is merged, the publish workflow runs the package checks, builds the package, publishes `@querry-kit/nuxt-ui` to npm, tags the release as `vX.Y.Z`, and creates a GitHub Release.

Consumers should install from npm:

```sh
pnpm add @querry-kit/nuxt-ui
```

## 🧩 Usage

`QuerryKitTableToolbar` composes a breadcrumb, search input, create action and table controls. It does not own table data or perform filtering itself: applications bind the models they need and receive immutable replacement values.

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

Use `:shortcuts="false"` on an individual component to disable its keyboard listener. The toolbar and individual controls can also be customized through slots without duplicating their state logic.

For manual locale integration, import the payloads without using the module plugin:

```ts
import { querryKitLocales } from '@querry-kit/nuxt-ui/locales';

i18n.global.mergeLocaleMessage('en', querryKitLocales.en);
i18n.global.mergeLocaleMessage('de', querryKitLocales.de);
```

See [Types and locales](https://querry-kit.github.io/nuxt-ui/api/types) for the complete JSON message list, text-prop examples, and slot customization.

## 🧱 Components

| Component                  | Purpose                                                       | Documentation                                                             |
| -------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `QuerryKitTableToolbar`    | Combines breadcrumb, search, create actions and controls.     | [Table toolbar](https://querry-kit.github.io/nuxt-ui/components/toolbar)  |
| `QuerryKitTableSorting`    | Manages ordered sorting with ascending/descending directions. | [Sorting](https://querry-kit.github.io/nuxt-ui/components/sorting)        |
| `QuerryKitTableFiltering`  | Edits Query Kit-compatible `AND`/`OR` filtering state.        | [Filtering](https://querry-kit.github.io/nuxt-ui/components/filtering)    |
| `QuerryKitTableOptions`    | Reorders, hides and pins columns.                             | [Column options](https://querry-kit.github.io/nuxt-ui/components/options) |
| `QuerryKitTablePagination` | Renders a standalone, page-based API footer.                  | [Pagination](https://querry-kit.github.io/nuxt-ui/components/pagination)  |

Public state types such as `SortingState`, `Filtering`, `ColumnDefinition` and `ColumnPinning` are exported from `@querry-kit/nuxt-ui`.

## 📖 Documentation

- [Getting Started](https://querry-kit.github.io/nuxt-ui/guide/getting-started)
- [Table Toolbar](https://querry-kit.github.io/nuxt-ui/components/toolbar)
- [Sorting](https://querry-kit.github.io/nuxt-ui/components/sorting)
- [Filtering](https://querry-kit.github.io/nuxt-ui/components/filtering)
- [Column Options](https://querry-kit.github.io/nuxt-ui/components/options)
- [Pagination](https://querry-kit.github.io/nuxt-ui/components/pagination)
- [Types and Locales](https://querry-kit.github.io/nuxt-ui/api/types)

Run the VitePress documentation locally:

```sh
pnpm docs:dev
```

Build the documentation:

```sh
pnpm docs:build
```

## 🛠 Development

```sh
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm build
pnpm docs:build
```

`pnpm test:coverage` collects all source files, prints the coverage summary, and writes HTML and LCOV reports to `coverage/`. GitHub Actions runs the same command and retains the report as a workflow artifact.

When updating component documentation, regenerate visual baselines locally and review the changed PNG files before committing:

```sh
pnpm screenshots:update
```
