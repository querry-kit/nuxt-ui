import type { TableTextOverrides } from '../../../texts.js';
import type { FilterChoice, FilterLookupSource } from '../../../types/table.js';
type __VLS_Props = {
    source: FilterLookupSource;
    maxSelections?: number;
    texts?: TableTextOverrides;
};
type LookupOption = FilterChoice & {
    disabled: boolean;
};
type __VLS_Slots = {
    selection?: (props: {
        selection: FilterChoice['value'][];
        items: LookupOption[];
        open: boolean;
        update: (values: FilterChoice['value'][]) => void;
    }) => unknown;
    option?: (props: {
        item: LookupOption;
        index: number;
        selected: boolean;
    }) => unknown;
    empty?: (props: {
        searchTerm: string;
        loading: boolean;
    }) => unknown;
    error?: (props: {
        retry: () => void;
        searchError: boolean;
        selectionError: boolean;
    }) => unknown;
};
type __VLS_ModelProps = {
    modelValue: FilterChoice['value'][];
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: (string | number)[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: (string | number)[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
