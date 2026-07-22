import { getCurrentInstance } from 'vue';
import { defaultTableTexts, type TableTextKey, type TableTextOverrides } from '../locales';

type Translate = (key: string, values?: Record<string, unknown>) => unknown;
type TextValues = Record<string, string | number>;

const getText = (texts: TableTextOverrides | undefined, key: TableTextKey) =>
  key.split('.').reduce<unknown>((value, segment) => {
    if (!value || typeof value !== 'object') return undefined;
    return (value as Record<string, unknown>)[segment];
  }, texts);

const getDefaultText = (key: TableTextKey) => getText(defaultTableTexts, key) as string;

const interpolate = (text: string, values: TextValues) =>
  text.replace(/\{([^}]+)\}/g, (placeholder, name: string) => String(values[name] ?? placeholder));

/** Resolves explicit component text, optional vue-i18n text, and English defaults in that order. */
export function useTableI18n(texts?: TableTextOverrides) {
  const translate = getCurrentInstance()?.appContext.config.globalProperties.$t as Translate | undefined;
  return (key: TableTextKey, values: TextValues = {}) => {
    const override = getText(texts, key);
    if (typeof override === 'string') return interpolate(override, values);

    const i18nKey = `@querry-kit.table.${key}`;
    const result = translate?.(i18nKey, values);
    return typeof result === 'string' && result !== i18nKey ? result : interpolate(getDefaultText(key), values);
  };
}
