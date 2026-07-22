import type { ColumnDefinition, ColumnPinning, FilterField, Filtering, SortingField, SortingState } from '../types/table.js';
type __VLS_Props = {
    breadcrumbItems?: Array<Record<string, unknown>>;
    sortableFields?: SortingField[];
    filterFields?: FilterField[];
    columnDefinitions?: ColumnDefinition[];
    searchPlaceholder?: string;
    shortcuts?: boolean;
    ui?: {
        root?: string;
        primary?: string;
        secondary?: string;
    };
};
type __VLS_ModelProps = {
    'search'?: string | undefined;
    'sorting'?: SortingState;
    'filtering'?: Filtering;
    'columnOrder'?: string[];
    'invisibleColumns'?: string[];
    'columnPinning'?: ColumnPinning;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_1: {
    items: Record<string, unknown>[] | undefined;
}, __VLS_8: {}, __VLS_10: {
    search: string | undefined;
    setSearch: (value: string | number | undefined) => string | undefined;
}, __VLS_19: {
    sorting: SortingState | undefined;
    filtering: Filtering | undefined;
    columnOrder: string[] | undefined;
};
type __VLS_Slots = {} & {
    breadcrumb?: (props: typeof __VLS_1) => any;
} & {
    new?: (props: typeof __VLS_8) => any;
} & {
    search?: (props: typeof __VLS_10) => any;
} & {
    options?: (props: typeof __VLS_19) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:filtering": (value: Filtering | undefined) => any;
    "update:columnOrder": (value: string[] | undefined) => any;
    "update:invisibleColumns": (value: string[] | undefined) => any;
    "update:columnPinning": (value: ColumnPinning | undefined) => any;
    "update:sorting": (value: SortingState | undefined) => any;
    "update:search": (value: string | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:filtering"?: ((value: Filtering | undefined) => any) | undefined;
    "onUpdate:columnOrder"?: ((value: string[] | undefined) => any) | undefined;
    "onUpdate:invisibleColumns"?: ((value: string[] | undefined) => any) | undefined;
    "onUpdate:columnPinning"?: ((value: ColumnPinning | undefined) => any) | undefined;
    "onUpdate:sorting"?: ((value: SortingState | undefined) => any) | undefined;
    "onUpdate:search"?: ((value: string | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
