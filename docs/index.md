---
layout: home
hero:
  name: '@querry-kit/nuxt-ui'
  text: Composable table controls for Nuxt UI
  tagline: Add accessible sorting, filtering, column preferences, search and pagination to Nuxt UI tables while keeping data and state in your application.
  image:
    src: /logo.svg
    alt: '@querry-kit/nuxt-ui logo'
  actions:
    - theme: brand
      text: Getting Started
      link: /guide/getting-started
    - theme: alt
      text: Browse Components
      link: /components/toolbar
    - theme: alt
      text: GitHub
      link: https://github.com/querry-kit/nuxt-ui
    - theme: alt
      text: Querry Kit Overview
      link: https://querry-kit.github.io/querry-kit/
features:
  - title: Table toolbar
    icon: 🧭
    details: Combine breadcrumb, search, create actions and table controls without coupling your data source to a particular table adapter.
    link: /components/toolbar
    linkText: Compose a toolbar
  - title: Filtering and sorting
    icon: 🎛️
    details: Edit Query Kit-compatible filtering and ordered sorting state with keyboard-accessible Nuxt UI popovers.
    link: /components/filtering
    linkText: Configure filters
  - title: Column preferences
    icon: 🧱
    details: Let people reorder, hide and pin columns while your application remains the single owner of the resulting state.
    link: /components/options
    linkText: Manage columns
  - title: Pagination and locales
    icon: 🌍
    details: Add a flexible page footer and optional English and German querryKit.table messages without replacing application translations.
    link: /components/pagination
    linkText: Add pagination
---

## Built for application-owned state

`@querry-kit/nuxt-ui` provides framework-neutral, composable table controls for Nuxt UI 4. Public components are collision-safe: every name begins with `QuerryKit`. They emit immutable replacement values, so applications can connect them to any compatible table, query or store.

## Querry Kit Ecosystem

[@querry-kit/querry-kit](https://querry-kit.github.io/querry-kit/) is the overview for the three core repositories: `@querry-kit/nest`, `@querry-kit/nuxt`, and `@querry-kit/nuxt-ui`. It also contains a comprehensive example combining an API with a web application.
