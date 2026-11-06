import type { TableIconOverrides } from '../../../icons.js';
import type { TableTextOverrides } from '../../../texts.js';
import type { ColumnDefinition, ColumnPinning, FilterField, Filtering, SortingField, SortingState, GroupingField } from '../../../types/table.js';
type __VLS_Props = {
    breadcrumbItems?: Array<Record<string, unknown>>;
    sortableFields?: SortingField[];
    groupableFields?: GroupingField[];
    filterFields?: FilterField[];
    columnDefinitions?: ColumnDefinition[];
    searchPlaceholder?: string;
    /** Explicit text overrides. These take precedence over host-app i18n and English defaults. */
    texts?: TableTextOverrides;
    /** Explicit nested icon overrides forwarded to the default child controls. */
    icons?: TableIconOverrides;
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
    'grouping'?: string[];
    'filtering'?: Filtering;
    'columnOrder'?: string[];
    'invisibleColumns'?: string[];
    'columnPinning'?: ColumnPinning;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_template: () => {
    __VLS_Slots: {
        breadcrumb?: (props: {
            items: Record<string, unknown>[] | undefined;
        }) => any;
    } & {
        search?: (props: {
            search: string | undefined;
            setSearch: (value: string | number | undefined) => string | undefined;
        }) => any;
    } & {
        options?: (props: {
            sorting: SortingState | undefined;
            filtering: Filtering | undefined;
            grouping: string[] | undefined;
            columnOrder: string[] | undefined;
        }) => any;
    } & {
        new?: (props: {}) => any;
    } & {
        new?: (props: {}) => any;
    };
};
type __VLS_Slots = ReturnType<typeof __VLS_template>['__VLS_Slots'];
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:filtering": (value: Filtering | undefined) => any;
    "update:grouping": (value: string[] | undefined) => any;
    "update:columnOrder": (value: string[] | undefined) => any;
    "update:invisibleColumns": (value: string[] | undefined) => any;
    "update:columnPinning": (value: ColumnPinning | undefined) => any;
    "update:sorting": (value: SortingState | undefined) => any;
    "update:search": (value: string | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:filtering"?: ((value: Filtering | undefined) => any) | undefined;
    "onUpdate:grouping"?: ((value: string[] | undefined) => any) | undefined;
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
