import type { TableIconOverrides } from '../../../icons.js';
import type { TableTextOverrides } from '../../../texts.js';
import type { ColumnPinning } from '../../../types/table.js';
type __VLS_Props = {
    side: 'left' | 'center' | 'right';
    columnPinning: ColumnPinning;
    columnOrder: string[];
    texts?: TableTextOverrides;
    icons?: TableIconOverrides;
};
declare const __VLS_export: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
