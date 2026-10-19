import { test, expect } from '@playwright/test';

const themeButton = (page) => page.getByRole('button', { name: 'Switch between light and dark theme' });

test('upstream layout, typography, and local assets render without errors', async ({ page }) => {
  const errors = [];
  const failures = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => { if (response.status() >= 400) failures.push(response.url()); });
  await page.goto('./');
  await expect(page).toHaveTitle('Jiahao Liu');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Jiahao Liu');
  for (const id of ['biography', 'news', 'publications']) await expect(page.locator(`#${id} h2`)).toBeAttached();
  await expect(page.locator('.page')).toHaveCSS('display', 'flex');
  await expect(page.locator('.publication-item')).toHaveCount(4);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('600 24px "Source Serif 4"'))).toBe(true);
  expect(await page.evaluate(() => document.fonts.check('500 17px Inter'))).toBe(true);
  const missingImages = await page.locator('img').evaluateAll((images) => images.filter((i) => !i.complete || !i.naturalWidth).map((i) => i.src));
  expect(missingImages).toEqual([]);
  expect(errors).toEqual([]);
  expect(failures).toEqual([]);
});

test('supplied personal details and placeholder research render without borrowed credentials', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('.masthead-role')).toContainText('Ph.D. Student');
  await expect(page.locator('.masthead-role')).toContainText('Cornell University');
  for (let n = 1; n <= 4; n++) {
    await expect(page.locator(`#project-0${n} .publication-title`)).toHaveText(`[Project Title 0${n}]`);
    await expect(page.getByRole('img', { name: `Image placeholder for research project 0${n}` })).toBeAttached();
  }
  await expect(page.getByRole('link', { name: 'Email', exact: true })).toHaveAttribute('href', 'mailto:jl4226@cornell.edu');
  await expect(page.locator('a[href*="Yixuan_Yang_CV"], a[href*="U97wn_wAAAAJ"], a[href="#"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'GitHub', exact: true })).toHaveAttribute('href', 'https://github.com/JiahaoLiu5');
  await expect(page.locator('main')).not.toContainText('Duke University');
  await expect(page.locator('script[src*="googletagmanager"]')).toHaveCount(0);
  await expect(page.locator('.site-footer')).toContainText('Template by Yixuan Yang');
});

test('academic profile shows the requested information without fake account links', async ({ page }) => {
  await page.goto('./');
  const profile = page.getByRole('complementary', { name: 'Profile' });
  await expect(profile.getByRole('heading', { name: 'Jiahao Liu' })).toBeVisible();
  await expect(profile.locator('.author__bio-line')).toHaveText([
    'PhD Student, Cornell University',
    'HCI & Behavioral Researcher',
    'VR/AR/MR Expertise',
  ]);
  await expect(profile.getByText('Ithaca, NY, USA', { exact: true })).toBeVisible();
  await expect(profile.getByText('Cornell University', { exact: true })).toBeVisible();
  await expect(profile.getByText('Dept. of Information Science', { exact: true })).toBeVisible();
  await expect(profile.locator('.author__urls li')).toHaveCount(8);
  await expect(profile.locator('.author__urls a')).toHaveCount(2);
  await expect(profile.getByRole('link', { name: 'GitHub', exact: true })).toHaveAttribute('href', 'https://github.com/JiahaoLiu5');
  for (const label of ['Google Scholar', 'ORCID', 'LinkedIn']) {
    await expect(profile.locator('.profile-detail--placeholder').filter({ hasText: label })).toBeVisible();
  }
  await expect(profile).not.toContainText('PubMed');
  await expect(profile).not.toContainText('Bluesky');
  await expect(profile.locator('nav')).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('13px Academicons'))).toBe(true);
});

test('compact profile opens with the keyboard and remains accessible after resizing', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const profile = page.getByRole('complementary', { name: 'Profile' });
  const disclosure = profile.locator('details');
  const toggle = profile.locator('summary');
  await expect(disclosure).not.toHaveAttribute('open');
  await expect(profile.getByRole('link', { name: 'GitHub', exact: true })).toBeHidden();
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(disclosure).toHaveAttribute('open', '');
  await expect(profile.getByRole('link', { name: 'GitHub', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.keyboard.press('Enter');
  await expect(disclosure).not.toHaveAttribute('open');
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(disclosure).toHaveAttribute('open', '');
  await expect(toggle).toBeHidden();
  await expect(profile.getByRole('link', { name: 'GitHub', exact: true })).toBeVisible();
});

test('original card disclosure responds to pointer and keyboard', async ({ page }) => {
  await page.goto('./');
  const card = page.locator('#project-01');
  const details = card.locator('details');
  await card.locator('.publication-title').click();
  await expect(details).toHaveAttribute('open', '');
  await expect(details.locator('p')).toBeVisible();
  await card.locator('summary').click();
  await expect(details).not.toHaveAttribute('open');
  await card.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(details).toHaveAttribute('open', '');
});

test('earlier news expands and collapses', async ({ page }) => {
  await page.goto('./');
  const older = page.locator('.collapse_container ul');
  await expect(older).toHaveCSS('max-height', '0px');
  await page.locator('label[for="check_id"]').click();
  await expect(page.locator('#check_id')).toBeChecked();
  await expect(older).toHaveCSS('max-height', 'none');
  await page.locator('label[for="check_id"]').click();
  await expect(page.locator('#check_id')).not.toBeChecked();
});

test('service page and section navigation work', async ({ page }) => {
  await page.goto('./');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link')).toHaveText(['Home', 'About Me', 'News', 'Research Experiences', 'Service']);
  for (const [label, id] of [['About Me', 'biography'], ['News', 'news'], ['Research Experiences', 'publications']]) {
    await nav.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect.poll(() => page.locator(`#${id}`).evaluate((section) => section.getBoundingClientRect().top >= document.querySelector('.topbar').getBoundingClientRect().bottom - 1)).toBe(true);
  }
  await nav.getByRole('link', { name: 'Service' }).click();
  await expect(page).toHaveTitle('Academic Service · Jiahao Liu');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Academic Service');
  await expect(page.getByText('Academic service to be added.', { exact: true })).toBeVisible();
  await nav.getByRole('link', { name: 'About Me', exact: true }).click();
  await expect(page).toHaveURL(/\/#biography$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Jiahao Liu');
});

test('wrapped mobile navigation stays visible and jumps below the sticky header', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto('./');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await themeButton(page).click();
  await expect(nav).toBeVisible();
  await nav.getByRole('link', { name: 'News', exact: true }).click();
  await expect(page).toHaveURL(/#news$/);
  await expect.poll(() => page.locator('#news').evaluate((section) => section.getBoundingClientRect().top >= document.querySelector('.topbar').getBoundingClientRect().bottom - 1)).toBe(true);
  await nav.getByRole('link', { name: 'Service', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Academic Service');
  await nav.getByRole('link', { name: 'Research Experiences', exact: true }).click();
  await expect(page).toHaveURL(/\/#publications$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('search indexes placeholder projects and supports keyboard navigation', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('/');
  const input = page.getByRole('combobox', { name: 'Search this site' });
  await expect(input).toBeFocused();
  await input.fill('Project Title 03');
  await expect(page.locator('#search-results a')).toHaveCount(1);
  await expect(input).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#project-03$/);
  await expect(page.locator('#search-results')).toBeHidden();
  await page.keyboard.press('/');
  await input.fill('xyzzy-no-match');
  await expect(page.locator('#search-results')).toContainText('No matches');
  await page.keyboard.press('Escape');
  await expect(page.locator('#search-results')).toBeHidden();
});

test('theme follows system preferences and persists an explicit choice', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('./');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await themeButton(page).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(14, 18, 25)');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await themeButton(page).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('theme still works when browser storage is unavailable', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new DOMException('Storage unavailable', 'SecurityError'); };
    Storage.prototype.setItem = () => { throw new DOMException('Storage unavailable', 'SecurityError'); };
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./');
  await themeButton(page).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(errors).toEqual([]);
});

test('rendered source, search index, and favicon are published as static assets', async ({ request }) => {
  const response = await request.get('./');
  expect(response.ok()).toBe(true);
  const html = await response.text();
  expect(html).toContain('[Project Title 04]');
  expect(html).not.toContain('{% include');
  expect(html).not.toContain('/src/main.js');
  const index = await request.get('./search.json');
  const docs = await index.json();
  expect(docs.filter((d) => d.s === 'Research')).toHaveLength(4);
  expect(docs.find((d) => d.t === '[Project Title 01]').u).toMatch(/\/#project-01$/);
  const favicon = await request.get('./assets/img/favicon.svg');
  expect(favicon.ok()).toBe(true);
  expect(favicon.headers()['content-type']).toContain('image/svg+xml');
});

for (const width of [320, 390, 768, 1440]) {
  test(`original responsive layout fits a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await themeButton(page).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
