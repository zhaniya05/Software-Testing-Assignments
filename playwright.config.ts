import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://practicesoftwaretesting.com',
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
  },
  retries: process.env.CI ? 2 : 0,
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});