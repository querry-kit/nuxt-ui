import type { TableTextOverrides } from '../../../texts.js';
type __VLS_Props = {
    totalItems?: number;
    pageSizes?: number[];
    summary?: string;
    texts?: TableTextOverrides;
    shortcuts?: boolean;
    /** Shows the mode switch and page size for a grouped table. Leaf controls are rendered separately. */
    grouped?: boolean;
    /** Loaded row count for the flat infinite-scroll summary. */
    loadedItems?: number;
    /** Whether the flat table has another batch of rows. */
    hasMore?: boolean;
    /** Whether a row request is pending. */
    loading?: boolean;
    /** A failed flat infinite-scroll request, enabling manual retry. */
    error?: unknown;
    ui?: {
        root?: string;
        left?: string;
        right?: string;
    };
};
type __VLS_ModelProps = {
    'page': number;
    'itemsPerPage': number;
    'loadingMode'?: 'pagination' | 'infinite';
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_template: () => {
    __VLS_Slots: {
        left?: (props: {
            page: number;
            itemsPerPage: number;
            totalItems: number;
            start: number;
            end: number;
        }) => any;
    } & {
        start?: (props: {}) => any;
    } & {
        summary?: (props: {
            start: number;
            end: number;
            totalItems: number;
        }) => any;
    } & {
        'page-size'?: (props: {
            itemsPerPage: number;
            setItemsPerPage: (value: number) => void;
        }) => any;
    } & {
        pagination?: (props: {
            page: number;
            pageCount: number;
            first: () => number;
            previous: () => number;
            next: () => number;
            last: () => number;
        }) => any;
    } & {
        right?: (props: {
            page: number;
            pageCount: number;
        }) => any;
    };
};
type __VLS_Slots = ReturnType<typeof __VLS_template>['__VLS_Slots'];
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:page": (value: number) => any;
    "load-more": () => any;
    "update:itemsPerPage": (value: number) => any;
    "update:loadingMode": (value: "pagination" | "infinite" | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:page"?: ((value: number) => any) | undefined;
    "onLoad-more"?: (() => any) | undefined;
    "onUpdate:itemsPerPage"?: ((value: number) => any) | undefined;
    "onUpdate:loadingMode"?: ((value: "pagination" | "infinite" | undefined) => any) | undefined;
}>, {
    shortcuts: boolean;
    totalItems: number;
    pageSizes: number[];
    loadedItems: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
