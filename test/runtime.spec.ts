import { describe, expect, it } from 'vitest';

describe('runtime exports', () => {
  it('exposes the public table components', async () => {
    const runtime = await import('../src/runtime');

    expect(runtime.QTableFiltering).toBeDefined();
    expect(runtime.QTableOptions).toBeDefined();
    expect(runtime.QTablePagination).toBeDefined();
    expect(runtime.QTableSorting).toBeDefined();
    expect(runtime.QTableToolbar).toBeDefined();
  });
});
