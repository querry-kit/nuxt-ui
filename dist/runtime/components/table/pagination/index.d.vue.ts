import type { TableTextOverrides } from '../../../texts.js';
type __VLS_Props = {
    totalItems?: number;
    pageSizes?: number[];
    summary?: string;
    texts?: TableTextOverrides;
    shortcuts?: boolean;
    ui?: {
        root?: string;
        left?: string;
        right?: string;
    };
};
type __VLS_ModelProps = {
    'page': number;
    'itemsPerPage': number;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_1: {
    page: number;
    itemsPerPage: number;
    totalItems: number;
    start: number;
    end: number;
}, __VLS_8: {
    itemsPerPage: number;
    setItemsPerPage: (value: number) => void;
}, __VLS_15: {
    page: number;
    pageCount: number;
    first: () => number;
    previous: () => number;
    next: () => number;
    last: () => number;
}, __VLS_22: {
    page: number;
    pageCount: number;
};
type __VLS_Slots = {} & {
    left?: (props: typeof __VLS_1) => any;
} & {
    'page-size'?: (props: typeof __VLS_8) => any;
} & {
    pagination?: (props: typeof __VLS_15) => any;
} & {
    right?: (props: typeof __VLS_22) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:page": (value: number) => any;
    "update:itemsPerPage": (value: number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:page"?: ((value: number) => any) | undefined;
    "onUpdate:itemsPerPage"?: ((value: number) => any) | undefined;
}>, {
    shortcuts: boolean;
    totalItems: number;
    pageSizes: number[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
