import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  testMatch: 'screenshots.spec.ts',
  snapshotPathTemplate: '{testDir}/../docs/public/components/{arg}{ext}',
  use: { baseURL: 'http://127.0.0.1:6007', viewport: { width: 1280, height: 720 } },
  webServer: { command: 'pnpm exec http-server storybook-static -p 6007 -s', port: 6007, reuseExistingServer: false },
});
