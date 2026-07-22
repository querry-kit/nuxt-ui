import { describe, expect, it, vi } from 'vitest';
import { createI18n } from 'vue-i18n';
import * as runtime from '../src/runtime';
import { de, en, querryKitLocales } from '../src/runtime/locales';
import localesPlugin from '../src/runtime/plugins/locales';

describe('locales', () => {
  it('exports collision-safe English and German table messages', () => {
    expect(runtime.QuerryKitTablePagination).toBeDefined();
    expect(querryKitLocales.en).toBe(en);
    expect(querryKitLocales.de).toBe(de);
    expect(en['@querry-kit'].table.pagination.summary).toContain('{start}');
    expect(de['@querry-kit'].table.options.title).toBe('Tabellenoptionen');
  });

  it('merges rather than replaces application i18n messages', () => {
    const mergeLocaleMessage = vi.fn();
    localesPlugin({ vueApp: { config: { globalProperties: { $i18n: { mergeLocaleMessage } } } } } as never);
    expect(mergeLocaleMessage).toHaveBeenNthCalledWith(1, 'en', en);
    expect(mergeLocaleMessage).toHaveBeenNthCalledWith(2, 'de', de);
  });

  it('resolves messages through the @querry-kit namespace', () => {
    const i18n = createI18n({ legacy: false, locale: 'de', messages: { de } });

    expect(i18n.global.t('@querry-kit.table.sorting.title')).toBe('Sortieren');
  });

  it('does nothing when applications intentionally omit i18n', () => {
    expect(() => localesPlugin({ vueApp: { config: { globalProperties: {} } } } as never)).not.toThrow();
  });
});
