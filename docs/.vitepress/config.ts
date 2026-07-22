import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/nuxt-ui/',
  title: 'Query Kit Nuxt UI',
  description: 'Customizable Nuxt UI table controls',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/toolbar' },
      { text: 'API', link: '/api/types' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [{ text: 'Getting started', link: '/guide/getting-started' }],
      },
      {
        text: 'Components',
        items: [
          { text: 'Toolbar', link: '/components/toolbar' },
          { text: 'Sorting', link: '/components/sorting' },
          { text: 'Filtering', link: '/components/filtering' },
          { text: 'Column options', link: '/components/options' },
          { text: 'Pagination', link: '/components/pagination' },
        ],
      },
      { text: 'API', items: [{ text: 'Types and locales', link: '/api/types' }] },
    ],
    footer: { message: 'Released under the MIT License.' },
  },
});
