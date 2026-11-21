import type { TableTextOverrides } from '../../../texts.js';
/** Load-more/retry action for either child groups or leaf records. */
type __VLS_Props = {
    hasMore: boolean;
    loading?: boolean;
    error?: unknown;
    texts?: TableTextOverrides;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    load: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onLoad?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
