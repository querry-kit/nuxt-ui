import type { TableIconOverrides } from '../../../icons.js';
import type { TableTextOverrides } from '../../../texts.js';
import type { ColumnDefinition } from '../../../types/table.js';
import type { PinSide } from './items.vue.js';
type __VLS_Props = {
    column: ColumnDefinition;
    visible: boolean;
    texts?: TableTextOverrides;
    icons?: TableIconOverrides;
    pin: (side: PinSide) => void;
    toggleVisibility: () => void;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
