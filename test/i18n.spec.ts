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

    expect(useTableI18n()('sorting.title', 'Sort')).toBe('translated:querryKit.table.sorting.title');
  });

  it('returns the English fallback without i18n or for an unresolved key', () => {
    expect(useTableI18n()('sorting.title', 'Sort')).toBe('Sort');

    getCurrentInstance.mockReturnValue({
      appContext: { config: { globalProperties: { $t: (key: string) => key } } },
    });
    expect(useTableI18n()('sorting.title', 'Sort')).toBe('Sort');
  });
});
