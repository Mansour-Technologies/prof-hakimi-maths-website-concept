import { defineConfig, devices } from '@playwright/test';

const live = process.env.BASE_URL;
export const BASE = live ?? 'http://localhost:4391/prof-hakimi-maths-website-concept/';

export default defineConfig({
  testDir: 'tests',
  timeout: 45_000,
  retries: live ? 1 : 0,
  workers: live ? 3 : 4,
  reporter: [['list']],
  use: { baseURL: BASE, trace: 'off' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } }, testIgnore: /mobile\.spec/ },
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 375, height: 812 } }, testMatch: /mobile\.spec/ },
  ],
  webServer: live ? undefined : { command: 'npx astro preview --port 4391 --ignore-lock', url: BASE, reuseExistingServer: true, timeout: 60_000 },
});
