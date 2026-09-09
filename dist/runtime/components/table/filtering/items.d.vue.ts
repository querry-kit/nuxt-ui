import type { FilterField, FilteringField } from '../../../types/table.js';
type __VLS_Props = {
    filters: FilteringField[];
    fields: FilterField[];
    hasFilters: boolean;
    remove: (id: string) => void;
    update: (id: string, patch: Partial<FilteringField>) => void;
};
declare var __VLS_1: {
    filter: FilteringField;
    field: FilterField | undefined;
    remove: () => void;
    update: (patch: Partial<FilteringField>) => void;
};
type __VLS_Slots = {} & {
    item?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
