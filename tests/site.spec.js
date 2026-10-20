import { test, expect } from '@playwright/test';

const themeButton = (page) => page.getByRole('button', { name: 'Change color theme' });
const researchProjects = [{
  title: 'Reconfiguring Social Leading: Asymmetrically Transforming Avatars’ Nonverbal Behavior in Social VR Triads',
  authors: 'Jiahao Liu, Zhalae W. Daneshvari, Yilu Sun, David Chess, Sarah J. Swee, Jiaxuan Han, Zewuzi Meng, Eyal Ofek, Andrea Stevenson Won',
  venue: "Submitted to ACM CHI '27 | ACM CHI Conference on Human Factors in Computing Systems",
  date: '09 2026',
}, {
  title: 'Invisible Strings: A Social Leading Scenario via Imposed Behavioral Synchrony in Virtual Reality',
  authors: 'Kevin T. Martinez*, Jiahao Liu*, Nalini Agnihotri, Shayla K. Reid, Tianqi Liu, Yilu Sun, Lydia Lin, Zewuzi Meng, Andrea Stevenson Won',
  highlight: 'Jiahao Liu*',
  venue: "Submitted to ACM CHI '27 | ACM CHI Conference on Human Factors in Computing Systems （* Equal Contribution）",
  date: '09 2026',
}, {
  title: 'Extended Applications of Augmented Social Influence Through Imposed Synchrony',
  authors: 'Jiahao Liu, Yilu Sun, Tianqi Liu, Wei-Che Harry Lin, Andrea Stevenson Won',
  venue: "ACM CHI '26 Workshop | Shaping Future Human Connections: Social Augmentation through XR Technologies",
  date: '04 2026',
}, {
  title: 'InfoFuse: A Post-Process Video-Mocap Information Fusion Approach for Human-Centered Interaction Research',
  authors: 'Jiahao Liu, Jia Guo, Sushrut Sudarshan Surve, Jovan Menezes, Daniele Fragiacomo, Kevin Thomas Martinez, Kwame Agyemang Baffour, Silvia Ferrari, Aleshia Hayes, Oyewole Oyekoya, Andrea Stevenson Won',
  venue: "ACM SIGGRAPH VRCAI '25 | Proceedings of the 20th International Conference on Virtual Reality Continuum and its Applications in Industry",
  date: '12 2025',
}, {
  title: '"Social Leading": Exploring Imposed Behavioral Synchrony in Virtual Reality',
  authors: 'Jiahao Liu, Zewuzi Meng, Lydia Lin, Andrea Stevenson Won',
  venue: "ACM CSCW '25 | Companion Publication of the 2025 Conference on Computer-Supported Cooperative Work and Social Computing",
  date: '10 2025',
}];
const leadingProject = researchProjects[0];
const researchThemes = [
  {
    slug: 'immersive-xr', title: 'Human Interaction Behavior in Immersive XR',
    keywords: 'Avatar Embodiment, Transformed Social Interaction, Computer-Mediated Communication',
  },
  {
    slug: 'embodied-ai', title: 'Human Interaction with Embodied AI Agent',
    keywords: 'Embodied AI, AI-Mediated Communication, Human-Agent Interaction, Nonverbal Behavior',
  },
  {
    slug: 'applied-xr', title: 'Real-World Application of XR Technology',
    keywords: 'Applied XR, Real-World Contexts, Human-Centered Design, Teamwork',
  },
];

test('PRISM homepage renders the profile, research themes, and research list without failures', async ({ page }) => {
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
  const themes = page.getByRole('region', { name: 'Research themes' });
  await expect(themes.getByRole('article')).toHaveCount(3);
  await expect(themes.getByRole('heading')).toHaveText([
    'Human Interaction Behavior in Immersive XR',
    'Human Interaction with Embodied AI Agent',
    'Real-World Application of XR Technology',
  ]);
  await expect(page.locator('.research-list li')).toHaveCount(5);
  await page.evaluate(()=>document.fonts.ready);
  expect(await page.locator('img').evaluateAll(images=>images.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src))).toEqual([]);
  expect(errors).toEqual([]);
  expect(bad).toEqual([]);
});

test('supplied research records and author emphasis render correctly', async ({page})=>{
  await page.goto('./');
  await expect(page.getByRole('img',{name:/Illustration of/})).toHaveCount(3);
  await expect(page.getByRole('img',{name:'Portrait placeholder for Jiahao Liu'})).toBeVisible();
  await expect(page.getByRole('heading',{name:'leading research projects',exact:true})).toBeVisible();
  for (const [index, record] of researchProjects.entries()) {
    const project = page.locator('.research-list li').nth(index);
    await expect(project.getByRole('heading')).toHaveText(record.title);
    await expect(project.locator('.research-authors')).toHaveText(record.authors);
    const author = project.locator('.research-authors').getByText(record.highlight || 'Jiahao Liu',{exact:true});
    await expect(author).toHaveCSS('font-weight','700');
    await expect(author).toHaveCSS('text-decoration-line','underline');
    await expect(project.locator('.research-venue')).toHaveText(record.venue);
    await expect(project.locator('.research-date')).toHaveText(record.date);
  }
  await expect(page.locator('body')).not.toContainText('Jonathan Segal');
  await expect(page.locator('body')).not.toContainText('Jiale Liu');
  await expect(page.locator('body')).not.toContainText('University of Example');
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(page.getByRole('link',{name:'PRISM',exact:true})).toHaveAttribute('href','https://github.com/xyjoey/PRISM');
});

test('whole theme cards respond to hover and open distinct reloadable pages', async ({page}) => {
  await page.emulateMedia({colorScheme:'light'});
  await page.goto('./');
  const homeURL = test.info().project.use.baseURL;
  for (const [index, theme] of researchThemes.entries()) {
    await page.mouse.move(0, 0);
    const link = page.getByRole('region',{name:'Research themes'}).getByRole('link',{name:theme.title,exact:true});
    const title = link.getByRole('heading');
    await expect(link.locator('.theme-keywords')).toHaveText(`Keywords: ${theme.keywords}`);
    await expect(link.locator('.theme-read-more')).toHaveText('Read More');
    await expect(title).toHaveCSS('color','rgb(17, 17, 17)');
    for (const selector of ['.theme-image', '.theme-title', '.theme-keywords', '.theme-read-more']) {
      const part = link.locator(selector);
      await part.hover();
      await expect(part).toHaveCSS('cursor','pointer');
      await expect(title).toHaveCSS('color','rgb(217, 35, 43)');
    }
    const destination = new URL(`research/${theme.slug}/`, homeURL);
    await expect(link).toHaveAttribute('href',destination.pathname);
    await link.locator(['.theme-image', '.theme-keywords', '.theme-read-more'][index]).click();
    await expect(page).toHaveURL(destination.href);
    await expect(page.getByRole('heading',{level:1})).toHaveText(theme.title);
    await expect(page.locator('main .theme-keywords')).toHaveText(`Keywords: ${theme.keywords}`);
    const response = await page.reload();
    expect(response.ok()).toBe(true);
    await expect(page.getByRole('heading',{level:1})).toHaveText(theme.title);
    await page.getByRole('link',{name:'Back to research themes'}).click();
    await expect(page).toHaveURL(new URL('./#research-themes',homeURL).href);
    await expect(page.getByRole('region',{name:'Research themes'})).toBeVisible();
  }
  await page.getByRole('link',{name:researchThemes[0].title,exact:true}).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading',{level:1})).toHaveText(researchThemes[0].title);
});

test('research links open a real static detail page and preserve project anchors',async({page})=>{
  await page.goto('./');
  await page.getByRole('link',{name:researchProjects[2].title,exact:true}).click();
  await expect(page).toHaveURL(/\/research\/#project-03$/);
  await expect(page.getByRole('heading',{level:1})).toHaveText('Research');
  await expect(page.locator('#project-03')).toContainText('Research description to be added.');
  await page.reload();
  await expect(page.locator('#project-03')).toBeVisible();
  await page.goto('./');
  await page.getByRole('link',{name:leadingProject.title,exact:true}).click();
  await expect(page).toHaveURL(/\/research\/#project-01$/);
  const leading = page.locator('#project-01');
  await expect(leading.getByRole('heading')).toHaveText(leadingProject.title);
  await expect(leading.locator('.research-authors')).toHaveText(leadingProject.authors);
  await expect(leading).toContainText('09 2026');
  await expect(leading).toContainText(leadingProject.venue);
  await expect(leading.locator('.research-authors').getByText('Jiahao Liu',{exact:true})).toHaveCSS('text-decoration-line','underline');
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
  await nojs.getByRole('link',{name:researchThemes[0].title,exact:true}).click();
  await expect(nojs.getByRole('heading',{level:1})).toHaveText(researchThemes[0].title);
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
  test(`profile and research themes fit ${width}px without horizontal scrolling`,async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.goto('./');
    await page.evaluate(()=>document.fonts.ready);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const cards = page.getByRole('region', { name: 'Research themes' }).getByRole('article');
    const bounds = await cards.evaluateAll(elements => elements.map(element => {
      const { x, y } = element.getBoundingClientRect();
      return { x, y };
    }));
    if (width === 1440) {
      expect(bounds.every(card => card.y === bounds[0].y)).toBe(true);
      expect(bounds[1].x).toBeGreaterThan(bounds[0].x);
    } else {
      expect(bounds.every(card => card.x === bounds[0].x)).toBe(true);
      expect(bounds[1].y).toBeGreaterThan(bounds[0].y);
    }
  });
}
