import { defineConfig } from 'vitepress';

const repository = 'https://github.com/querry-kit/nuxt-ui';

const nav = [
  { text: 'Guide', link: '/guide/getting-started' },
  { text: 'Components', link: '/components/toolbar' },
  { text: 'API', link: '/api/types' },
  { text: 'Querry Kit', link: 'https://querry-kit.github.io/querry-kit/' },
];

const sidebar = [
  {
    text: 'Guide',
    items: [{ text: 'Getting Started', link: '/guide/getting-started' }],
  },
  {
    text: 'Table Controls',
    items: [
      { text: 'Table Toolbar', link: '/components/toolbar' },
      { text: 'Sorting', link: '/components/sorting' },
      { text: 'Filtering', link: '/components/filtering' },
      { text: 'Column Options', link: '/components/options' },
      { text: 'Pagination', link: '/components/pagination' },
    ],
  },
  {
    text: 'API Reference',
    items: [{ text: 'Types and Locales', link: '/api/types' }],
  },
];

export default defineConfig({
  base: '/nuxt-ui/',
  title: '@querry-kit/nuxt-ui',
  description: 'Composable table controls for Nuxt UI applications.',
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }]],
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: `${repository}/edit/main/docs/:path`,
      text: 'Edit this page on GitHub',
    },
    lastUpdated: {
      text: 'Last updated',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Tobias Wälde',
    },
    nav,
    sidebar,
    socialLinks: [{ icon: 'github', link: repository }],
  },
});
