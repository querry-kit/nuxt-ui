import { beforeEach, describe, expect, it, vi } from 'vitest';

const addComponentsDir = vi.fn();
const addPlugin = vi.fn();

vi.mock('@nuxt/kit', () => ({
  addComponentsDir,
  addPlugin,
  createResolver: () => ({ resolve: (path: string) => `/module/${path}` }),
  defineNuxtModule: <T>(definition: T) => definition,
}));

describe('Nuxt module registration', () => {
  beforeEach(() => {
    addComponentsDir.mockClear();
    addPlugin.mockClear();
  });

  it('registers collision-safe components and locale integration by default', async () => {
    const module = await import('../src/module');
    (module.default as any).setup({ autoImports: true, locales: true });
    expect(addComponentsDir).toHaveBeenCalledWith({ path: '/module/runtime/components', pathPrefix: false });
    expect(addPlugin).toHaveBeenCalledWith('/module/runtime/plugins/locales');
  });

  it('leaves both integrations out when consumers disable them', async () => {
    const module = await import('../src/module');
    (module.default as any).setup({ autoImports: false, locales: false });
    expect(addComponentsDir).not.toHaveBeenCalled();
    expect(addPlugin).not.toHaveBeenCalled();
  });
});
