import type { TableTextOverrides } from '../../../texts.js';
import type { FilterChoice, FilterLookupSource } from '../../../types/table.js';
type __VLS_Props = {
    source: FilterLookupSource;
    maxSelections?: number;
    texts?: TableTextOverrides;
};
type __VLS_ModelProps = {
    modelValue: FilterChoice['value'][];
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_export: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: (string | number)[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: (string | number)[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
