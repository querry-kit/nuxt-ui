import { beforeEach, describe, expect, it, vi } from 'vitest';

const { getCurrentInstance } = vi.hoisted(() => ({ getCurrentInstance: vi.fn() }));

vi.mock('vue', () => ({ getCurrentInstance }));

import { useTableI18n } from '../src/runtime/composables/use-table-i18n';

describe('useTableI18n', () => {
  beforeEach(() => getCurrentInstance.mockReset());

  it('uses a namespaced vue-i18n translation when one is available', () => {
    getCurrentInstance.mockReturnValue({
      appContext: { config: { globalProperties: { $t: (key: string) => `translated:${key}` } } },
    });

    expect(useTableI18n()('sorting.title')).toBe('translated:@querry-kit.table.sorting.title');
  });

  it('returns the English fallback without i18n or for an unresolved key', () => {
    expect(useTableI18n()('sorting.title')).toBe('Sort');

    getCurrentInstance.mockReturnValue({
      appContext: { config: { globalProperties: { $t: (key: string) => key } } },
    });
    expect(useTableI18n()('sorting.title')).toBe('Sort');
  });

  it('gives explicit text overrides precedence and interpolates English-style placeholders', () => {
    getCurrentInstance.mockReturnValue({
      appContext: { config: { globalProperties: { $t: () => 'translated' } } },
    });

    const t = useTableI18n({
      sorting: { title: 'Order' },
      pagination: { summary: 'Rows {start} through {end} out of {total}' },
    });

    expect(t('sorting.title')).toBe('Order');
    expect(t('pagination.summary', { start: 1, end: 10, total: 42 })).toBe('Rows 1 through 10 out of 42');
  });
});
