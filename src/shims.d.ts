declare module '#app' {
  import type { App } from 'vue';

  export function defineNuxtPlugin(plugin: (nuxtApp: { vueApp: App }) => void): (nuxtApp: { vueApp: App }) => void;
}
