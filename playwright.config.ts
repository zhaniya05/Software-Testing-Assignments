import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://practicesoftwaretesting.com',
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
  },
  retries: process.env.CI ? 2 : 0,
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.spec\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /auth\.setup\.spec\.ts/,
      dependencies: ['setup'],
    },
  ],
});