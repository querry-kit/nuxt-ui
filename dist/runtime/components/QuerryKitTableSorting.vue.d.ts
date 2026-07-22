import type { SortingField, SortingState } from '../types/table.js';
type __VLS_Props = {
    fields: SortingField[];
    icon?: string;
    shortcuts?: boolean;
    ui?: {
        content?: string;
    };
};
type __VLS_ModelProps = {
    'sorting': SortingState;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_8: {
    open: boolean;
    toggle: () => boolean;
    active: boolean;
}, __VLS_18: {
    sorting: SortingState;
    clear: () => never[];
}, __VLS_32: {
    sorting: SortingState;
    remove: (id: string) => {
        id: string;
        desc: boolean;
    }[];
    toggleDirection: (id: string) => {
        id: string;
        desc: boolean;
    }[];
    move: (from: number, to: number) => void;
}, __VLS_34: {
    sort: {
        id: string;
        desc: boolean;
    };
    index: number;
    remove: () => {
        id: string;
        desc: boolean;
    }[];
    toggleDirection: () => {
        id: string;
        desc: boolean;
    }[];
}, __VLS_55: {
    availableFields: SortingField[];
    add: (id: string) => void;
};
type __VLS_Slots = {} & {
    trigger?: (props: typeof __VLS_8) => any;
} & {
    header?: (props: typeof __VLS_18) => any;
} & {
    items?: (props: typeof __VLS_32) => any;
} & {
    item?: (props: typeof __VLS_34) => any;
} & {
    add?: (props: typeof __VLS_55) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:sorting": (value: SortingState) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:sorting"?: ((value: SortingState) => any) | undefined;
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
