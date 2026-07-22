import { defineNuxtPlugin } from '#app';
import { de, en } from '../locales';

/** Safely extends an application's i18n messages when @nuxtjs/i18n is installed. */
export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.vueApp.config.globalProperties.$i18n as
    { mergeLocaleMessage?: (locale: string, message: object) => void } | undefined;
  i18n?.mergeLocaleMessage?.('en', en);
  i18n?.mergeLocaleMessage?.('de', de);
});
