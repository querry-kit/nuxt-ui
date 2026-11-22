import type { TableTextOverrides } from '../../../texts.js';
import type { GroupedTableNode, GroupedTableState } from '../../../types/grouped-table.js';
declare const __VLS_export: <TItem extends Record<string, unknown>>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<{
        table: GroupedTableState<TItem>;
        node: GroupedTableNode<TItem>;
        viewport: HTMLElement | null;
        leaf: boolean;
        texts?: TableTextOverrides;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
        controls?: (props: {
            node: GroupedTableNode<TItem>;
            leaf: boolean;
            load: () => Promise<void>;
        }) => any;
    } & {
        error?: (props: {
            node: GroupedTableNode<TItem>;
            error: {};
            retry: () => Promise<void>;
        }) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        pagination?: (props: {
            path: import("../../../types/grouped-table.js").GroupedTablePath;
            page: number;
            totalItems: number;
            itemsPerPage: number;
            loadedItems: number;
            loading: boolean;
            error: unknown;
            infinite: boolean;
            hasMore: boolean;
            setPage: (value: number) => void;
            setItemsPerPage: (value: number) => void;
            loadMore: () => void;
        }) => any;
    };
    emit: {};
}>) => import("vue").VNode & {
    __ctx?: NonNullable<Awaited<typeof __VLS_setup>>;
};
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_PrettifyLocal<T> = (T extends any ? {
    [K in keyof T]: T[K];
} : {
    [K in keyof T as K]: T[K];
}) & {};
