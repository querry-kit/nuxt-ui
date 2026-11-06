import type { TableIconOverrides } from '../../../icons.js';
import type { TableTextOverrides } from '../../../texts.js';
/** Controlled accessible group header and slotted branch content. */
type __VLS_Props = {
    label: string;
    count: number;
    expanded: boolean;
    loading?: boolean;
    error?: unknown;
    texts?: TableTextOverrides;
    icons?: TableIconOverrides;
};
declare const __VLS_template: () => {
    __VLS_Slots: {
        header?: (props: {
            label: string;
            count: number;
            expanded: boolean;
        }) => any;
    } & {
        default?: (props: {
            loading: boolean;
            error: unknown;
        }) => any;
    };
};
type __VLS_Slots = ReturnType<typeof __VLS_template>['__VLS_Slots'];
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    retry: () => any;
    toggle: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onRetry?: (() => any) | undefined;
    onToggle?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
