import { FilteringMode, type FilterField, type Filtering, type FilteringField } from '../types/table.js';
type __VLS_Props = {
    fields: FilterField[];
    icon?: string;
    shortcuts?: boolean;
    ui?: {
        content?: string;
    };
};
type __VLS_ModelProps = {
    'filtering': Filtering;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_8: {
    open: boolean;
    toggle: () => boolean;
    active: boolean;
}, __VLS_18: {
    filtering: Filtering;
    clear: () => {
        operator: FilteringMode.Intersect;
        filters: never[];
    };
    toggleMode: () => {
        operator: FilteringMode;
        filters: FilteringField[];
    };
}, __VLS_39: {
    filters: FilteringField[];
    remove: (id: string) => {
        filters: FilteringField[];
        operator: FilteringMode;
    };
    update: (id: string, patch: Partial<FilteringField>) => {
        filters: FilteringField[];
        operator: FilteringMode;
    };
}, __VLS_41: {
    filter: FilteringField;
    field: FilterField | undefined;
    remove: () => {
        filters: FilteringField[];
        operator: FilteringMode;
    };
    update: (patch: Partial<FilteringField>) => {
        filters: FilteringField[];
        operator: FilteringMode;
    };
}, __VLS_104: {
    fields: FilterField[];
    add: (id: string) => void;
};
type __VLS_Slots = {} & {
    trigger?: (props: typeof __VLS_8) => any;
} & {
    header?: (props: typeof __VLS_18) => any;
} & {
    items?: (props: typeof __VLS_39) => any;
} & {
    item?: (props: typeof __VLS_41) => any;
} & {
    add?: (props: typeof __VLS_104) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:filtering": (value: Filtering) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:filtering"?: ((value: Filtering) => any) | undefined;
}>, {
    icon: string;
    shortcuts: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
