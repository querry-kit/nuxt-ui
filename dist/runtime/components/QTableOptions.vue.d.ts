import type { TableTextOverrides } from '../locales/index.js';
import type { ColumnDefinition, ColumnPinning } from '../types/table.js';
type PinSide = 'left' | 'center' | 'right';
type __VLS_Props = {
    columns: ColumnDefinition[];
    icon?: string;
    shortcuts?: boolean;
    texts?: TableTextOverrides;
    ui?: {
        content?: string;
    };
};
type __VLS_ModelProps = {
    'columnOrder': string[];
    'invisibleColumns': string[];
    'columnPinning': ColumnPinning;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_1: {
    open: boolean;
    toggle: () => boolean;
}, __VLS_17: {
    columns: ColumnDefinition[];
}, __VLS_24: {
    columns: ColumnDefinition[];
    move: (from: number, to: number) => void;
    toggleVisibility: (id: string) => void;
    pin: (id: string, side: PinSide) => void;
}, __VLS_31: {
    column: ColumnDefinition;
    index: number;
    visible: boolean;
    pin: (side: PinSide) => void;
    toggleVisibility: () => void;
};
type __VLS_Slots = {} & {
    trigger?: (props: typeof __VLS_1) => any;
} & {
    header?: (props: typeof __VLS_17) => any;
} & {
    items?: (props: typeof __VLS_24) => any;
} & {
    item?: (props: typeof __VLS_31) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:columnOrder": (value: string[]) => any;
    "update:invisibleColumns": (value: string[]) => any;
    "update:columnPinning": (value: ColumnPinning) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:columnOrder"?: ((value: string[]) => any) | undefined;
    "onUpdate:invisibleColumns"?: ((value: string[]) => any) | undefined;
    "onUpdate:columnPinning"?: ((value: ColumnPinning) => any) | undefined;
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
