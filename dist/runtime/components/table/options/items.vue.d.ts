import type { TableIconOverrides } from '../../../icons.js';
import type { ColumnDefinition } from '../../../types/table.js';
export type PinSide = 'left' | 'center' | 'right';
type __VLS_Props = {
    columns: ColumnDefinition[];
    invisibleColumns: string[];
    icons?: TableIconOverrides;
    move: (from: number, to: number) => void;
    pin: (id: string, side: PinSide) => void;
    toggleVisibility: (id: string) => void;
};
declare var __VLS_6: {
    column: ColumnDefinition;
    index: number;
    visible: boolean;
    pin: (side: PinSide) => void;
    toggleVisibility: () => void;
};
type __VLS_Slots = {} & {
    item?: (props: typeof __VLS_6) => any;
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
