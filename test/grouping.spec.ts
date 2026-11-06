import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import QTableGroup from '../src/runtime/components/table/group/index.vue';
import QTableGroupLoadMore from '../src/runtime/components/table/group/load-more.vue';
import QTableGrouping from '../src/runtime/components/table/grouping/index.vue';
import QTableToolbar from '../src/runtime/components/table/toolbar/index.vue';

const stubs = {
  UButton: {
    props: ['label', 'disabled', 'loading', 'icon'],
    template: '<button :disabled="disabled" v-bind="$attrs">{{ label }}<slot /></button>',
  },
  UPopover: { template: '<div><slot/><slot name="content"/></div>' },
  USelect: { name: 'USelect', props: ['modelValue', 'items'], emits: ['update:modelValue'], template: '<select />' },
  UDashboardToolbar: { template: '<div><slot name="left"/><slot name="right"/></div>' },
  QTableGrouping: true,
};

describe('server-backed grouping controls', () => {
  it('adds, removes and reorders permitted fields with keyboard-accessible buttons', async () => {
    const wrapper = mount(QTableGrouping, {
      props: {
        grouping: [],
        fields: [
          { value: 'status', label: 'Status' },
          { value: 'category', label: 'Category' },
          { value: 'private', label: 'Private', disabled: true },
        ],
      },
      global: { stubs },
    });
    expect(wrapper.findComponent({ name: 'USelect' }).props('items')).toHaveLength(2);
    await wrapper.findComponent({ name: 'USelect' }).vm.$emit('update:modelValue', 'status');
    await wrapper.find('[aria-label="Add grouping"]').trigger('click');
    expect(wrapper.emitted('update:grouping')?.at(-1)).toEqual([['status']]);
    await wrapper.setProps({ grouping: ['status', 'category'] });
    await wrapper.findAll('[aria-label="Move group down"]')[0]!.trigger('click');
    expect(wrapper.emitted('update:grouping')?.at(-1)).toEqual([['category', 'status']]);
    await wrapper.findAll('[aria-label="Move group up"]')[1]!.trigger('click');
    expect(wrapper.emitted('update:grouping')?.at(-1)).toEqual([['status', 'category']]);
    await wrapper.find('[aria-label="Remove grouping"]').trigger('click');
    expect(wrapper.emitted('update:grouping')?.at(-1)).toEqual([['category']]);
    await wrapper
      .findAll('button')
      .find((button) => button.text() === 'Clear grouping')!
      .trigger('click');
    expect(wrapper.emitted('update:grouping')?.at(-1)).toEqual([[]]);
    (wrapper.vm as unknown as { move: (index: number, direction: number) => void }).move(0, -1);
    await wrapper.setProps({ grouping: ['unknown'], fields: [{ value: 'status', label: 'Status' }] });
    expect(wrapper.text()).toContain('unknown');
    await wrapper.findComponent({ name: 'USelect' }).vm.$emit('update:modelValue', 'invalid');
    await wrapper.find('[aria-label="Add grouping"]').trigger('click');
    expect(wrapper.emitted('update:grouping')?.at(-1)).toEqual([[]]);
    wrapper.unmount();
  });

  it('renders counts, controlled expansion, loading, errors and slots', async () => {
    const wrapper = mount(QTableGroup, {
      props: { label: 'Open', count: 42, expanded: false },
      slots: { default: 'Leaf rows' },
      global: { stubs },
    });
    expect(wrapper.text()).toContain('42 items');
    expect(wrapper.text()).not.toContain('Leaf rows');
    await wrapper.find('[aria-expanded="false"]').trigger('click');
    expect(wrapper.emitted('toggle')).toHaveLength(1);
    await wrapper.setProps({ expanded: true, loading: true, error: new Error('failed') });
    expect(wrapper.find('[role="status"]').text()).toContain('Loading');
    expect(wrapper.find('[role="alert"]').text()).toContain('Unable');
    await wrapper
      .findAll('button')
      .find((button) => button.text() === 'Retry')!
      .trigger('click');
    expect(wrapper.emitted('retry')).toHaveLength(1);
    expect(wrapper.text()).toContain('Leaf rows');
    wrapper.unmount();
    const localized = mount(QTableGroup, {
      props: { label: 'Offen', count: 2, expanded: true, texts: { grouping: { count: '{count} Einträge' } } },
      slots: { header: 'Custom group' },
      global: { stubs },
    });
    expect(localized.text()).toContain('Custom group');
    localized.unmount();
  });

  it('disables continuation while loading and switches to retry for failures', async () => {
    const wrapper = mount(QTableGroupLoadMore, {
      props: { hasMore: true, loading: true, texts: { grouping: { retry: 'Erneut versuchen' } } },
      global: { stubs },
    });
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    await wrapper.setProps({ loading: false });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('load')).toHaveLength(1);
    await wrapper.setProps({
      hasMore: false,
      error: new Error('failed'),
      texts: { grouping: { retry: 'Erneut versuchen' } },
    });
    expect(wrapper.text()).toBe('Erneut versuchen');
    await wrapper.setProps({ error: undefined });
    expect(wrapper.find('button').exists()).toBe(false);
    wrapper.unmount();
  });

  it('integrates grouping into the existing toolbar', async () => {
    const wrapper = mount(QTableToolbar, {
      props: { groupableFields: [{ value: 'status', label: 'Status' }], grouping: [] },
      global: { stubs },
    });
    expect(wrapper.findComponent({ name: 'QTableGrouping' }).exists()).toBe(true);
    await wrapper.findComponent({ name: 'QTableGrouping' }).vm.$emit('update:grouping', ['status']);
    expect(wrapper.emitted('update:grouping')).toEqual([[['status']]]);
    wrapper.unmount();
  });
});
