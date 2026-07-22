import { NuxtModule } from '@nuxt/schema';

interface QuerryKitNuxtUiOptions {
    /** Register collision-safe QuerryKit table components for Nuxt auto-imports. */
    autoImports?: boolean;
    /** Merge English and German `querryKit.table` messages into vue-i18n, when present. */
    locales?: boolean;
}
declare const querryKitNuxtUiModule: NuxtModule<QuerryKitNuxtUiOptions>;

export { querryKitNuxtUiModule as default };
export type { QuerryKitNuxtUiOptions };
