import { describe, expect, it, vi } from 'vitest';
import * as runtime from '../src/runtime';
import { de, en, querryKitLocales } from '../src/runtime/locales';
import localesPlugin from '../src/runtime/plugins/locales';

describe('locales', () => {
  it('exports collision-safe English and German table messages', () => {
    expect(runtime.QuerryKitTablePagination).toBeDefined();
    expect(querryKitLocales.en).toBe(en);
    expect(querryKitLocales.de).toBe(de);
    expect(en.querryKit.table.pagination.summary).toContain('{start}');
    expect(de.querryKit.table.options.title).toBe('Tabellenoptionen');
  });

  it('merges rather than replaces application i18n messages', () => {
    const mergeLocaleMessage = vi.fn();
    localesPlugin({ vueApp: { config: { globalProperties: { $i18n: { mergeLocaleMessage } } } } } as never);
    expect(mergeLocaleMessage).toHaveBeenNthCalledWith(1, 'en', en);
    expect(mergeLocaleMessage).toHaveBeenNthCalledWith(2, 'de', de);
  });

  it('does nothing when applications intentionally omit i18n', () => {
    expect(() => localesPlugin({ vueApp: { config: { globalProperties: {} } } } as never)).not.toThrow();
  });
});
