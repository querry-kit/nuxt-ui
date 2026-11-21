import { getCurrentInstance, toValue } from "vue";
import { defaultTableTexts } from "../texts.js";
const getText = (texts, key) => key.split(".").reduce((value, segment) => {
  if (!value || typeof value !== "object") return void 0;
  return value[segment];
}, texts);
const getDefaultText = (key) => getText(defaultTableTexts, key);
const interpolate = (text, values) => text.replace(/\{([^}]+)\}/g, (placeholder, name) => String(values[name] ?? placeholder));
export function useTableI18n(texts) {
  const translate = getCurrentInstance()?.appContext.config.globalProperties.$t;
  return (key, values = {}, plural) => {
    const override = getText(toValue(texts), key);
    if (typeof override === "string") return interpolate(override, values);
    const i18nKey = `querrykit.table.${key}`;
    const result = plural === void 0 ? translate?.(i18nKey, values) : translate?.(i18nKey, values, plural);
    return typeof result === "string" && result !== i18nKey ? result : interpolate(getDefaultText(key), values);
  };
}
export function useTableNumber() {
  const format = getCurrentInstance()?.appContext.config.globalProperties.$n;
  return (value) => format?.(value) ?? String(value);
}
