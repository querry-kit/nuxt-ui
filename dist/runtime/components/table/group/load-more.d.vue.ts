import type { TableTextOverrides } from '../../../texts.js';
/** Load-more/retry action for either child groups or leaf records. */
type __VLS_Props = {
    hasMore: boolean;
    loading?: boolean;
    error?: unknown;
    texts?: TableTextOverrides;
};
declare const __VLS_template: () => {
    __VLS_Slots: {
        default?: (props: {
            hasMore: boolean;
            loading: boolean;
            error: unknown;
            load: () => void;
            attrs: import("vue").Attrs;
        }) => any;
    };
};
type __VLS_Slots = ReturnType<typeof __VLS_template>['__VLS_Slots'];
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    load: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onLoad?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
