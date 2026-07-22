import { getCurrentInstance } from "vue";
export function useTableI18n() {
  const translate = getCurrentInstance()?.appContext.config.globalProperties.$t;
  return (key, fallback, values) => {
    const result = translate?.(`querryKit.table.${key}`, values);
    return result && result !== `querryKit.table.${key}` ? result : fallback;
  };
}
