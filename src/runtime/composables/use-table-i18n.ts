import { getCurrentInstance } from 'vue';

type Translate = (key: string, values?: Record<string, unknown>) => string;

/** Uses vue-i18n if present and falls back to the supplied English text. */
export function useTableI18n() {
  const translate = getCurrentInstance()?.appContext.config.globalProperties.$t as Translate | undefined;
  return (key: string, fallback: string, values?: Record<string, unknown>) => {
    const result = translate?.(`querryKit.table.${key}`, values);
    return result && result !== `querryKit.table.${key}` ? result : fallback;
  };
}
