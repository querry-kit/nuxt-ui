import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import QTablePagination from '../src/runtime/components/QTablePagination.vue';

const mountPagination = (props = {}) =>
  mount(QTablePagination, {
    props: { page: 2, itemsPerPage: 10, totalItems: 42, ...props },
    global: { stubs: { USelect: true, UPagination: true } },
  });

describe('QTablePagination', () => {
  it('renders its standalone result summary without a CRM layout dependency', () => {
    const wrapper = mountPagination();
    expect(wrapper.text()).toContain('Showing 11–20 of 42');
  });

  it('accepts an explicit text override without requiring i18n', () => {
    const wrapper = mountPagination({ texts: { pagination: { summary: 'Rows {start}–{end} / {total}' } } });

    expect(wrapper.text()).toContain('Rows 11–20 / 42');
  });

  it('moves between pages with the documented keyboard shortcuts', async () => {
    const wrapper = mountPagination();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', shiftKey: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:page')?.[0]).toEqual([3]);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', shiftKey: true, ctrlKey: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:page')?.[1]).toEqual([1]);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey: true }));
  });

  it('keeps the page within the new page count when its page size changes', async () => {
    const wrapper = mountPagination({ page: 5 });
    const select = wrapper.findComponent({ name: 'USelect' });
    await select.vm.$emit('update:modelValue', 25);
    expect(wrapper.emitted('update:itemsPerPage')?.[0]).toEqual([25]);
    expect(wrapper.emitted('update:page')?.[0]).toEqual([2]);
  });
});
