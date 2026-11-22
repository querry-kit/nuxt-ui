import type { TableIconOverrides } from '../../../icons.js';
import type { TableTextOverrides } from '../../../texts.js';
type __VLS_Props = {
    canReset: boolean;
    texts?: TableTextOverrides;
    icons?: TableIconOverrides;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    reset: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onReset?: (() => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
