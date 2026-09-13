import { NuxtModule } from '@nuxt/schema';
import { TableIconOverrides } from '../dist/runtime/icons.js';

interface QuerryKitAppConfig {
    table?: {
        icons?: TableIconOverrides;
    };
}
declare module '@nuxt/schema' {
    interface CustomAppConfig {
        querryKit?: QuerryKitAppConfig;
    }
    interface AppConfig {
        querryKit?: {
            table?: QuerryKitAppConfig['table'];
        };
    }
}
interface QuerryKitNuxtUiOptions {
    /** Register collision-safe QuerryKit table components for Nuxt auto-imports. */
    autoImports?: boolean;
}
declare const querryKitNuxtUiModule: NuxtModule<QuerryKitNuxtUiOptions>;

export { querryKitNuxtUiModule as default };
export type { QuerryKitAppConfig, QuerryKitNuxtUiOptions };
