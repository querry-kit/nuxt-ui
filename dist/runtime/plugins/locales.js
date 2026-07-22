import { defineNuxtPlugin } from "#app";
import { de, en } from "../locales/index.js";
export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.vueApp.config.globalProperties.$i18n;
  i18n?.mergeLocaleMessage?.("en", en);
  i18n?.mergeLocaleMessage?.("de", de);
});
