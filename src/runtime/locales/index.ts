import de from './de';
import en from './en';

export { defaultTableTexts } from './en';
export type { TableTextKey, TableTextOverrides, TableTexts } from './en';
export { de, en };

/** Collision-safe locale payloads for manual vue-i18n integration. */
export const querryKitLocales = { de, en };
