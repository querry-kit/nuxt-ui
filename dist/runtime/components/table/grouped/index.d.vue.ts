import type { TableProps } from '@nuxt/ui';
import type { TableIconOverrides } from '../../../icons.js';
import type { TableTextOverrides } from '../../../texts.js';
import type { GroupedTableColumn, GroupedTableNode, GroupedTableState } from '../../../types/grouped-table.js';
declare const __VLS_export: <TItem extends Record<string, unknown>>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: import("vue").PublicProps & __VLS_PrettifyLocal<{
        table: GroupedTableState<TItem>;
        columns: readonly GroupedTableColumn[];
        availableColumns?: readonly GroupedTableColumn[];
        getId: (item: TItem) => string | number;
        label: string;
        flexibleColumn?: string;
        showBranch?: boolean;
        ui?: TableProps<{
            kind: "item";
            key: string;
            item: TItem;
        } | {
            kind: "group";
            key: string;
            node: GroupedTableNode<TItem>;
        } | {
            kind: "controls";
            key: string;
            node: GroupedTableNode<TItem>;
            leaf: boolean;
        }>["ui"];
        texts?: TableTextOverrides;
        icons?: TableIconOverrides;
    }> & (typeof globalThis extends {
        __VLS_PROPS_FALLBACK: infer P;
    } ? P : {});
    expose: (exposed: import("vue").ShallowUnwrapRef<{
        focus: () => void | undefined;
    }>) => void;
    attrs: any;
    slots: {
        cell?: (props: {
            field: string;
            item: TItem;
        }) => unknown;
        'group-value'?: (props: {
            node: GroupedTableNode<TItem>;
        }) => unknown;
        'group-cell'?: (props: {
            node: GroupedTableNode<TItem>;
            field: string;
        }) => unknown;
        branch?: (props: {
            node: GroupedTableNode<TItem>;
        }) => unknown;
        'leading-header'?: (props: {
            items: TItem[];
        }) => unknown;
        leading?: (props: {
            item?: TItem;
            node?: GroupedTableNode<TItem>;
        }) => unknown;
        'footer-start'?: () => unknown;
        'footer-end'?: () => unknown;
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
