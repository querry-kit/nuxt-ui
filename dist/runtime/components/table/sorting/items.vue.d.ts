import type { SortingState } from '../../../types/table.js';
type __VLS_Props = {
    hasSorting: boolean;
    remove: (id: string) => void;
    toggleDirection: (id: string) => void;
};
type __VLS_ModelProps = {
    'sorting': SortingState;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_8: {
    sort: import("@querry-kit/nuxt/types").SortingRule;
    index: number;
    remove: () => void;
    toggleDirection: () => void;
    showDragHandle: boolean;
};
type __VLS_Slots = {} & {
    item?: (props: typeof __VLS_8) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:sorting": (value: SortingState) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:sorting"?: ((value: SortingState) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
