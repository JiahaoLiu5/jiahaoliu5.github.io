import { test, expect } from '@playwright/test';

test('academic profile, research sections, and real project render without errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./');
  await expect(page).toHaveTitle('Jiahao Liu — Academic Homepage');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Jiahao Liu');
  await expect(page.locator('#profile-role')).toHaveText('PhD student');
  for (const id of ['about', 'research', 'publications', 'projects', 'experience', 'contact']) {
    await expect(page.locator(`#${id} h2`)).toBeAttached();
  }
  await expect(page.getByRole('heading', { name: 'Academic homepage', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Source: Academic homepage' })).toHaveAttribute('href', 'https://github.com/JiahaoLiu5/jiahaoliu5.github.io');
  await expect(page.locator('.page-layout')).toHaveCSS('display', 'grid');
  expect(errors).toEqual([]);
});

test('missing academic information stays visibly unfilled with no fake download links', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('img', { name: 'Portrait placeholder for Jiahao Liu' })).toBeVisible();
  await expect(page.locator('#profile-affiliation')).toContainText('Institution to be added');
  await expect(page.getByRole('button', { name: 'CV (to be added)', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Email (to be added)', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Google Scholar (to be added)', exact: true })).toBeDisabled();
  await expect(page.getByRole('heading', { name: 'Publications to follow' })).toBeVisible();
  await expect(page.locator('#publication-controls')).toBeHidden();
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'GitHub profile', exact: true })).toHaveAttribute('href', 'https://github.com/JiahaoLiu5');
});

test('mobile menu follows a section and Escape restores focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const menu = page.locator('#menu-toggle');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav).toBeHidden();
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await nav.getByRole('link', { name: 'Publications', exact: true }).click();
  await expect(page).toHaveURL(/#publications$/);
  await expect(nav).toBeHidden();
  await menu.click();
  await page.keyboard.press('Escape');
  await expect(nav).toBeHidden();
  await expect(menu).toBeFocused();
  await menu.click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(nav).toBeVisible();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
});

test('theme changes persist after reload and both states remain readable', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: 'Switch to light theme' })).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('the page still works when browser storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException('Storage unavailable', 'SecurityError'); };
    Storage.prototype.setItem = () => { throw new DOMException('Storage unavailable', 'SecurityError'); };
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Academic homepage', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(errors).toEqual([]);
});

test('keyboard users can skip to main and the favicon is served', async ({ page, request }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
  await expect(page.locator('main')).toBeFocused();
  const response = await request.get('./favicon.svg');
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('image/svg+xml');
});

for (const width of [320, 390, 768, 1440]) {
  test(`layout fits a ${width}px viewport without horizontal scrolling`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
