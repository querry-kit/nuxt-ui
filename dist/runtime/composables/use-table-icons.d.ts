import { type TableIconKey, type TableIconOverrides } from '../icons.js';
/** Resolves component and app-config icon overrides with the package default as fallback. */
export declare function useTableIcons(icons?: TableIconOverrides): (key: TableIconKey) => string;
