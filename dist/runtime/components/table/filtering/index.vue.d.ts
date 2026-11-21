import type { TableIconOverrides } from '../../../icons.js';
import type { TableTextOverrides } from '../../../texts.js';
import { type FilterField, type Filtering, type FilteringField } from '../../../types/table.js';
type __VLS_Props = {
    fields: FilterField[];
    /** Whether the application has an active filter in the context slot. */
    contextActive?: boolean;
    icon?: string;
    shortcuts?: boolean;
    texts?: TableTextOverrides;
    icons?: TableIconOverrides;
    ui?: {
        content?: string;
    };
};
type __VLS_ModelProps = {
    'filtering': Filtering;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare const __VLS_template: () => {
    __VLS_Slots: {
        trigger?: (props: {
            open: boolean;
            toggle: () => boolean;
            active: boolean;
        }) => any;
    } & {
        header?: (props: {
            filtering: Filtering;
            clear: () => void;
            toggleMode: () => {
                operator: "AND" | "OR";
                filters: FilteringField[];
            };
        }) => any;
    } & {
        context?: (props: {}) => any;
    } & {
        items?: (props: {
            filters: FilteringField[];
            remove: (id: string) => {
                filters: FilteringField[];
                operator: import("@querry-kit/nuxt/types").FilteringMode;
            };
            update: (id: string, patch: Partial<FilteringField>) => {
                filters: FilteringField[];
                operator: import("@querry-kit/nuxt/types").FilteringMode;
            };
        }) => any;
    } & {
        item?: (props: {
            filter: FilteringField;
            field: FilterField | undefined;
            remove: () => void;
            update: (patch: Partial<FilteringField>) => void;
        }) => any;
    } & {
        add?: (props: {
            fields: FilterField[];
            add: (id: string) => void;
        }) => any;
    };
};
type __VLS_Slots = ReturnType<typeof __VLS_template>['__VLS_Slots'];
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    clear: () => any;
    "update:filtering": (value: Filtering) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onClear?: (() => any) | undefined;
    "onUpdate:filtering"?: ((value: Filtering) => any) | undefined;
}>, {
    contextActive: boolean;
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
