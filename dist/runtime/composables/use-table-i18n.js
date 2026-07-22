import { getCurrentInstance } from "vue";
import { defaultTableTexts } from "../locales/index.js";
const getText = (texts, key) => key.split(".").reduce((value, segment) => {
  if (!value || typeof value !== "object") return void 0;
  return value[segment];
}, texts);
const getDefaultText = (key) => getText(defaultTableTexts, key);
const interpolate = (text, values) => text.replace(/\{([^}]+)\}/g, (placeholder, name) => String(values[name] ?? placeholder));
export function useTableI18n(texts) {
  const translate = getCurrentInstance()?.appContext.config.globalProperties.$t;
  return (key, values = {}) => {
    const override = getText(texts, key);
    if (typeof override === "string") return interpolate(override, values);
    const i18nKey = `@querry-kit.table.${key}`;
    const result = translate?.(i18nKey, values);
    return typeof result === "string" && result !== i18nKey ? result : interpolate(getDefaultText(key), values);
  };
}
