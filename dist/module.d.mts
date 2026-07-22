import { NuxtModule } from '@nuxt/schema';

interface QuerryKitNuxtUiOptions {
    /** Register collision-safe QuerryKit table components for Nuxt auto-imports. */
    autoImports?: boolean;
    /** Merge bundled `@querry-kit.table` messages into vue-i18n when an application provides it. */
    locales?: boolean;
}
declare const querryKitNuxtUiModule: NuxtModule<QuerryKitNuxtUiOptions>;

export { querryKitNuxtUiModule as default };
export type { QuerryKitNuxtUiOptions };
