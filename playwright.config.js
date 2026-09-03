import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 200000, // 2min por teste

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});
