import { type TableTextKey, type TableTextOverrides } from '../texts.js';
type TextValues = Record<string, string | number>;
/** Resolves explicit component text, host-app i18n text, and English defaults in that order. */
export declare function useTableI18n(texts?: TableTextOverrides): (key: TableTextKey, values?: TextValues) => string;
export {};
