import { test, expect } from '@playwright/test';

const themeButton = (page) => page.getByRole('button', { name: 'Change color theme' });

test('PRISM homepage renders the profile, photo wall, and research list without failures', async ({ page }) => {
  const errors=[];
  const bad=[];
  page.on('pageerror', e=>errors.push(e.message));
  page.on('response', r=>{ if(r.status()>=400)bad.push(`${r.status()} ${r.url()}`); });
  await page.goto('./');
  await expect(page).toHaveTitle('Jiahao Liu');
  await expect(page.getByRole('heading', { level:1 })).toHaveText("Hi, I'm Jiahao Liu");
  const profile=page.getByRole('complementary',{name:'Profile'});
  await expect(profile).toContainText('Cornell University');
  await expect(profile.getByRole('link',{name:'Email',exact:true})).toHaveAttribute('href','mailto:jl4226@cornell.edu');
  await expect(profile.getByRole('link',{name:'GitHub',exact:true})).toHaveAttribute('href','https://github.com/JiahaoLiu5');
  await expect(page.locator('.photo-column')).toHaveCount(3);
  await expect(page.locator('.photo-tile img')).toHaveCount(6);
  await expect(page.locator('.research-list li')).toHaveCount(5);
  await page.evaluate(()=>document.fonts.ready);
  expect(await page.locator('img').evaluateAll(images=>images.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src))).toEqual([]);
  expect(errors).toEqual([]);
  expect(bad).toEqual([]);
});

test('template media and projects remain explicit placeholders', async ({page})=>{
  await page.goto('./');
  await expect(page.getByRole('img',{name:/Photo placeholder/})).toHaveCount(6);
  await expect(page.getByRole('img',{name:'Portrait placeholder for Jiahao Liu'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'Research Project 01',exact:true})).toBeVisible();
  await expect(page.locator('.research-date')).toHaveText(Array(5).fill('Date pending'));
  await expect(page.locator('body')).not.toContainText('Jonathan Segal');
  await expect(page.locator('body')).not.toContainText('Jiale Liu');
  await expect(page.locator('body')).not.toContainText('University of Example');
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(page.getByRole('link',{name:'PRISM',exact:true})).toHaveAttribute('href','https://github.com/xyjoey/PRISM');
});

test('research links open a real static detail page and preserve project anchors',async({page})=>{
  await page.goto('./');
  await page.getByRole('link',{name:'Research Project 03',exact:true}).click();
  await expect(page).toHaveURL(/\/research\/#project-03$/);
  await expect(page.getByRole('heading',{level:1})).toHaveText('Research');
  await expect(page.locator('#project-03')).toContainText('Research description to be added.');
  await page.reload();
  await expect(page.locator('#project-03')).toBeVisible();
});

test('navigation reaches CV, service, and the home research anchor',async({page})=>{
  await page.goto('./');
  const nav=page.getByRole('navigation',{name:'Main navigation'});
  await nav.getByRole('link',{name:'CV',exact:true}).click();
  await expect(page.getByRole('heading',{level:1})).toHaveText('Curriculum Vitae');
  await expect(page.getByText('Ph.D. Student, Information Science',{exact:true})).toBeVisible();
  await nav.getByRole('link',{name:'Service',exact:true}).click();
  await expect(page.getByRole('heading',{level:1})).toHaveText('Academic Service');
  await nav.getByRole('link',{name:'Research',exact:true}).click();
  await expect(page).toHaveURL(/\/#research$/);
  await expect(page.locator('#research')).toBeVisible();
});

test('mobile menu follows a destination and Escape returns focus',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('./');
  const open=page.getByRole('button',{name:'Open menu',exact:true});
  await open.click();
  const nav=page.getByRole('navigation',{name:'Mobile navigation'});
  await expect(nav).toBeVisible();
  await nav.getByRole('link',{name:'Research',exact:true}).click();
  await expect(page).toHaveURL(/#research$/);
  await expect(nav).toBeHidden();
  await open.click();
  await page.keyboard.press('Escape');
  await expect(nav).toBeHidden();
  await expect(open).toBeFocused();
});

test('PRISM theme control persists a chosen theme',async({page})=>{
  await page.emulateMedia({colorScheme:'light'});
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  await themeButton(page).click();
  await themeButton(page).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
});

test('page and theme remain usable without browser storage',async({page})=>{
  await page.emulateMedia({colorScheme:'light'});
  await page.addInitScript(()=>{
    Storage.prototype.getItem=()=>{throw new DOMException('Storage unavailable','SecurityError')};
    Storage.prototype.setItem=()=>{throw new DOMException('Storage unavailable','SecurityError')};
    Storage.prototype.removeItem=()=>{throw new DOMException('Storage unavailable','SecurityError')};
  });
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('./');
  await themeButton(page).click();
  await themeButton(page).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  expect(errors).toEqual([]);
});

test('static HTML is readable without JavaScript and keyboard skip link works',async({browser,page,request})=>{
  const context=await browser.newContext({javaScriptEnabled:false});
  const nojs=await context.newPage();
  await nojs.goto(new URL('./',test.info().project.use.baseURL).href);
  await expect(nojs.getByRole('heading',{level:1})).toBeVisible();
  await expect(nojs.locator('.research-list li')).toHaveCount(5);
  await context.close();
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link',{name:'Skip to content'})).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const favicon=await request.get('./favicon.svg');
  expect(favicon.ok()).toBe(true);
  expect(favicon.headers()['content-type']).toContain('image/svg+xml');
});

for(const width of [320,390,768,1440]){
  test(`profile and photo wall fit ${width}px without horizontal scrolling`,async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.goto('./');
    await page.evaluate(()=>document.fonts.ready);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await expect(page.locator('.photo-wall')).toHaveCSS('grid-template-columns',/\d/);
  });
}
