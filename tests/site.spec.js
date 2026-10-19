import { test, expect } from '@playwright/test';

test('production page loads its styling, projects, and navigation', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./');
  await expect(page).toHaveTitle(/Jiahao Liu/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Jiahao Liu');
  await expect(page.getByRole('heading', { name: 'A personal space', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View source: A personal space' })).toHaveAttribute('href', 'https://github.com/JiahaoLiu5/jiahaoliu5.github.io');
  await expect(page.locator('.hero-art')).toHaveCSS('position', 'relative');
  await page.getByRole('link', { name: 'Explore my work' }).click();
  await expect(page).toHaveURL(/#projects$/);
  expect(errors).toEqual([]);
});

test('mobile navigation opens, follows a section, and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const menu = page.getByRole('button', { name: 'Menu' });
  const navigation = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(navigation).toBeHidden();
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await navigation.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.keyboard.press('Escape');
  await expect(navigation).toBeHidden();
  await expect(menu).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('keyboard users can skip to the main content and the favicon is served', async ({ page, request }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  const favicon = await request.get('./favicon.svg');
  expect(favicon.ok()).toBe(true);
  expect(favicon.headers()['content-type']).toContain('image/svg+xml');
});
