import type { TableTextOverrides } from '../../../texts.js';
import { type FilterField, type Filtering, type FilteringField } from '../../../types/table.js';
type __VLS_Props = {
    fields: FilterField[];
    icon?: string;
    shortcuts?: boolean;
    texts?: TableTextOverrides;
    ui?: {
        content?: string;
    };
};
type __VLS_ModelProps = {
    'filtering': Filtering;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_1: {
    open: boolean;
    toggle: () => boolean;
    active: boolean;
}, __VLS_17: {
    filtering: Filtering;
    clear: () => {
        operator: "AND";
        filters: never[];
    };
    toggleMode: () => {
        operator: "AND" | "OR";
        filters: FilteringField[];
    };
}, __VLS_24: {
    filters: FilteringField[];
    remove: (id: string) => {
        filters: FilteringField[];
        operator: import("@querry-kit/nuxt/types").FilteringMode;
    };
    update: (id: string, patch: Partial<FilteringField>) => {
        filters: FilteringField[];
        operator: import("@querry-kit/nuxt/types").FilteringMode;
    };
}, __VLS_33: {
    filter: FilteringField;
    field: FilterField | undefined;
    remove: () => void;
    update: (patch: Partial<FilteringField>) => void;
}, __VLS_45: {
    fields: FilterField[];
    add: (id: string) => void;
};
type __VLS_Slots = {} & {
    trigger?: (props: typeof __VLS_1) => any;
} & {
    header?: (props: typeof __VLS_17) => any;
} & {
    items?: (props: typeof __VLS_24) => any;
} & {
    item?: (props: typeof __VLS_33) => any;
} & {
    add?: (props: typeof __VLS_45) => any;
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
