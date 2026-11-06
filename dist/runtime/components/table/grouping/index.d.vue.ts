import type { TableTextOverrides } from '../../../texts.js';
import type { TableIconOverrides } from '../../../icons.js';
import type { GroupingField } from '../../../types/table.js';
/** Ordered scalar grouping control; the application owns the selected state. */
type __VLS_Props = {
    fields: readonly GroupingField[];
    texts?: TableTextOverrides;
    icons?: TableIconOverrides;
};
type __VLS_ModelProps = {
    'grouping': string[];
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_template: () => {
    __VLS_Slots: {
        header?: (props: {
            grouping: string[];
        }) => any;
    };
};
type __VLS_Slots = ReturnType<typeof __VLS_template>['__VLS_Slots'];
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:grouping": (value: string[]) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:grouping"?: ((value: string[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
