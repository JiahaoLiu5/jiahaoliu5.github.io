import { defineConfig } from '@playwright/test';

const basePath = (process.env.BASE_PATH || '').replace(/\/$/, '');
const liveSiteURL = process.env.LIVE_SITE_URL;
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: 'list',
  use: {
    baseURL: liveSiteURL || `http://127.0.0.1:4173${basePath}/`,
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
  },
  webServer: liveSiteURL ? undefined : {
    command: `npm run preview -- --port 4173 --strictPort --base ${basePath || '/'}`,
    url: `http://127.0.0.1:4173${basePath}/`,
    reuseExistingServer: !process.env.CI,
  },
});
