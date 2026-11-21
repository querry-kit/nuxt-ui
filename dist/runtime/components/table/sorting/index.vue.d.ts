import type { TableIconOverrides } from '../../../icons.js';
import type { TableTextOverrides } from '../../../texts.js';
import type { SortingField, SortingState } from '../../../types/table.js';
type __VLS_Props = {
    fields: SortingField[];
    icon?: string;
    shortcuts?: boolean;
    texts?: TableTextOverrides;
    icons?: TableIconOverrides;
    ui?: {
        content?: string;
    };
};
type __VLS_ModelProps = {
    'sorting': SortingState;
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
            sorting: SortingState;
            clear: () => never[];
        }) => any;
    } & {
        items?: (props: {
            sorting: SortingState;
            remove: (id: string) => import("@querry-kit/nuxt/types").SortingRule[];
            toggleDirection: (id: string) => import("@querry-kit/nuxt/types").SortingRule[];
            move: (from: number, to: number) => void;
        }) => any;
    } & {
        item?: (props: {
            sort: import("@querry-kit/nuxt/types").SortingRule;
            index: number;
            remove: () => void;
            toggleDirection: () => void;
            showDragHandle: boolean;
        }) => any;
    } & {
        add?: (props: {
            availableFields: SortingField[];
            add: (id: string) => void;
        }) => any;
    };
};
type __VLS_Slots = ReturnType<typeof __VLS_template>['__VLS_Slots'];
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:sorting": (value: SortingState) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:sorting"?: ((value: SortingState) => any) | undefined;
}>, {
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
