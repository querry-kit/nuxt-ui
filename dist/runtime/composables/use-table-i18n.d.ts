import { type MaybeRefOrGetter } from 'vue';
import { type TableTextKey, type TableTextOverrides } from '../texts.js';
type TextValues = Record<string, string | number>;
/** Resolves explicit component text, host-app i18n text, and English defaults in that order. */
export declare function useTableI18n(texts?: MaybeRefOrGetter<TableTextOverrides | undefined>): (key: TableTextKey, values?: TextValues, plural?: number) => string;
/** Formats display numbers with the host i18n locale when configured. */
export declare function useTableNumber(): (value: number) => string;
export {};
