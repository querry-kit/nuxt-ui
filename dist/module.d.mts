import { NuxtModule } from '@nuxt/schema';

interface QuerryKitNuxtUiOptions {
    /** Register collision-safe QuerryKit table components for Nuxt auto-imports. */
    autoImports?: boolean;
}
declare const querryKitNuxtUiModule: NuxtModule<QuerryKitNuxtUiOptions>;

export { querryKitNuxtUiModule as default };
export type { QuerryKitNuxtUiOptions };
