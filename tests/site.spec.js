import { test, expect } from '@playwright/test';

const themeButton = (page) => page.getByRole('button', { name: 'Change color theme' });
const researchProjects = [{
  title: 'Reconfiguring Social Leading: Asymmetrically Transforming Avatars’ Nonverbal Behavior in Social VR Triads',
  authors: 'Jiahao Liu, Zhalae W. Daneshvari, Yilu Sun, David Chess, Sarah J. Swee, Jiaxuan Han, Zewuzi Meng, Eyal Ofek, Andrea Stevenson Won',
  venue: "Submitted to ACM CHI '27 | ACM CHI Conference on Human Factors in Computing Systems",
  date: '09 2026',
}, {
  title: 'Invisible Strings: A Social Leading Scenario via Imposed Behavioral Synchrony in Virtual Reality',
  authors: 'Kevin T. Martinez*, Jiahao Liu*, Nalini Agnihotri, Shayla K. Reid, Tianqi Liu, Yilu Sun, Lydia Lin, Zewuzi Meng, Andrea Stevenson Won （* Equal Contribution）',
  highlight: 'Jiahao Liu*',
  venue: "Submitted to ACM CHI '27 | ACM CHI Conference on Human Factors in Computing Systems",
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
const newSubmission = {
  id: 'project-08',
  title: 'Transformed Social Interaction in the Age of AI: Reconfiguring Embodiment, Agency, and Social Relationships in XR',
  authors: 'Jiahao Liu, Sang-won Leigh, Eyal Ofek, Jeremy N. Bailenson, Andrea Stevenson Won',
  venue: "Submitted to ACM CHI EA '27 | ACM CHI Conference on Human Factors in Computing Systems",
  date: '10 2026',
};
const additionalResearchProjects = [{
  id: 'project-06',
  title: 'Predicting the Fracture Propensity of Amorphous Silica Using Molecular Dynamics Simulations and Machine Learning',
  authors: 'Jiahao Liu, Jingjie Yeo',
  venue: 'IJAM | International Journal of Applied Mechanics, Volume 15, Issue 10, Article 2350086',
  date: '09 2023',
}, {
  id: 'project-07',
  title: 'Evaluation of the Pulse and Temperature of Higher Education System through Modeling and Data Mining',
  authors: 'Jiahao Liu, Yutai Gao, Yue Zhuo, Jian Zu',
  venue: "IEEE DSInS '21 | 2021 International Conference on Digital Society and Intelligent Systems",
  date: '12 2021',
}];
const allProjectIds = [newSubmission.id,'project-01','project-02','project-03','project-04','project-05',...additionalResearchProjects.map(project=>project.id)];
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
  await expect(page.getByRole('heading', { level:1 })).toHaveAccessibleName("Hi, I'm Jiahao Liu");
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

test('whole theme cards respond to hover and open the full research page', async ({page}) => {
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
    const destination = new URL('research/', homeURL);
    await expect(link).toHaveAttribute('href',destination.pathname);
    await link.locator(['.theme-image', '.theme-keywords', '.theme-read-more'][index]).click();
    await expect(page).toHaveURL(destination.href);
    await expect(page.getByRole('heading',{level:1})).toHaveText('Research');
    await expect(page.locator('.content-card')).toHaveCount(8);
    const response = await page.reload();
    expect(response.ok()).toBe(true);
    await expect(page.getByRole('heading',{level:1})).toHaveText('Research');
    await page.goBack();
    await expect(page).toHaveURL(homeURL);
    await expect(page.getByRole('region',{name:'Research themes'})).toBeVisible();
  }
  await page.getByRole('link',{name:researchThemes[0].title,exact:true}).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading',{level:1})).toHaveText('Research');
});

test('research links open a real static detail page and preserve project anchors',async({page})=>{
  for (const name of ['View More', 'View all research projects']) {
    await page.goto('./');
    const link = page.locator('#research').getByRole('link',{name,exact:true});
    await link.click();
    await expect(page).toHaveURL(/\/research\/$/);
    await expect(page.getByRole('heading',{level:1})).toHaveText('Research');
  }
  await page.goto('./');
  await page.getByRole('link',{name:researchProjects[2].title,exact:true}).click();
  await expect(page).toHaveURL(/\/research\/#project-03$/);
  await expect(page.getByRole('heading',{level:1})).toHaveText('Research');
  await expect(page.locator('#project-03').getByRole('button',{name:'BibTeX',exact:true})).toBeVisible();
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
  await expect(leading).toContainText('More details will be disclosed soon.');
  await expect(leading.locator('.research-authors').getByText('Jiahao Liu',{exact:true})).toHaveCSS('text-decoration-line','underline');
});

test('research search and project filters work together and recover from empty results',async({page})=>{
  await page.goto('./research/');
  const projects=page.locator('.research-project-list > article');
  const search=page.getByRole('searchbox',{name:'Search research projects'});
  await expect(page.getByText('A collection of my research work, ordered by date.',{exact:true})).toBeVisible();
  expect(await projects.evaluateAll(els=>els.map(el=>el.id))).toEqual(allProjectIds);
  await page.getByRole('button',{name:'Published Projects',exact:true}).click();
  await expect(projects).toHaveCount(5);
  expect(await projects.evaluateAll(els=>els.map(el=>el.id))).toEqual(allProjectIds.slice(3));
  await page.getByRole('button',{name:'Under Review Projects',exact:true}).click();
  await expect(projects).toHaveCount(3);
  await expect(projects.filter({hasText:'More details will be disclosed soon.'})).toHaveCount(3);
  await expect(page.locator('.project-resource-actions')).toHaveCount(0);
  await search.fill('Bailenson');
  await expect(projects).toHaveCount(1);
  await expect(projects.first()).toHaveAttribute('id',newSubmission.id);
  await page.getByRole('button',{name:'Clear search',exact:true}).click();
  await page.getByRole('button',{name:'First-Author Projects',exact:true}).click();
  await expect(projects).toHaveCount(8);
  await expect(page.locator('#project-02')).toBeVisible();
  await search.fill('Equal Contribution');
  await expect(projects).toHaveCount(1);
  await expect(projects.first()).toHaveAttribute('id','project-02');
  await search.fill('Kevin');
  await expect(projects).toHaveCount(2);
  await page.getByRole('button',{name:'Published Projects',exact:true}).click();
  await expect(projects).toHaveCount(1);
  await expect(projects.first()).toHaveAttribute('id','project-04');
  await page.getByRole('button',{name:'Clear search',exact:true}).click();
  await expect(projects).toHaveCount(5);
  await page.getByRole('button',{name:'Filters',exact:true}).click();
  await expect(page.getByRole('group',{name:'Project filters'})).toBeHidden();
  await expect(projects).toHaveCount(5);
  await page.getByRole('button',{name:'Filters',exact:true}).click();
  await expect(page.getByRole('button',{name:'Published Projects',exact:true})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Reset filters',exact:true}).click();
  await expect(projects).toHaveCount(8);
  await search.fill('no matching research project');
  await expect(projects).toHaveCount(0);
  await expect(page.getByRole('heading',{name:'No projects found',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Show all projects',exact:true}).click();
  await expect(projects).toHaveCount(8);
  await expect(search).toHaveValue('');
});

test('research rows show consistent typography, image placeholders, and pending publication resources',async({page})=>{
  await page.goto('./research/');
  await expect(page.getByRole('img',{name:/Illustration placeholder for/})).toHaveCount(8);
  const projects=page.locator('.research-project-list > article');
  for (const project of await projects.all()) {
    await expect(project.locator('.research-authors')).toHaveCSS('font-size','14.5px');
    await expect(project.locator('.project-venue')).toHaveCSS('font-size','15px');
  }
  for(const id of allProjectIds.slice(3)) {
    const project=page.locator(`#${id}`);
    for(const name of ['DOI','Abstract','BibTeX'])await expect(project.getByRole('button',{name,exact:true})).toBeDisabled();
    await expect(project).not.toContainText('Research description to be added.');
  }
  for(const record of [newSubmission,...additionalResearchProjects]) {
    const project=page.locator(`#${record.id}`);
    await expect(project.getByRole('heading')).toHaveText(record.title);
    await expect(project.locator('.research-authors')).toHaveText(record.authors);
    await expect(project.locator('.project-venue')).toHaveText(record.venue);
    await expect(project.locator('time')).toHaveText(record.date);
    await expect(project.locator('time')).toHaveAttribute('datetime',record.date.replace(/^(\d{2}) (\d{4})$/,'$2-$1'));
  }
  const cofirst=page.locator('#project-02');
  await expect(cofirst.locator('.research-authors')).toContainText('（* Equal Contribution）');
  await expect(cofirst.locator('.project-venue')).not.toContainText('Equal Contribution');
});

test('navigation reaches CV, service, and the full research page',async({page})=>{
  await page.goto('./');
  const nav=page.getByRole('navigation',{name:'Main navigation'});
  await nav.getByRole('link',{name:'CV',exact:true}).click();
  await expect(page.getByRole('heading',{level:1})).toHaveText('Curriculum Vitae');
  await expect(page.getByText('Ph.D. Student, Information Science',{exact:true})).toBeVisible();
  await nav.getByRole('link',{name:'Other',exact:true}).click();
  await expect(page.getByRole('heading',{level:1})).toHaveText('Academic Service');
  await nav.getByRole('link',{name:'Research',exact:true}).click();
  await expect(page).toHaveURL(/\/research\/$/);
  await expect(page.getByRole('heading',{level:1})).toHaveText('Research');
  await expect(nav.getByRole('link',{name:'Research',exact:true})).toHaveAttribute('aria-current','page');
});

test('greeting slides to Chinese on hover and keyboard focus and restores English',async({page})=>{
  await page.goto('./');
  const greeting=page.getByRole('heading',{name:"Hi, I'm Jiahao Liu",exact:true});
  const english=greeting.locator('.greeting-english');
  const chinese=greeting.locator('.greeting-chinese');
  await expect(chinese).toHaveText('嗨，我是刘佳豪');
  await expect(english).toHaveCSS('opacity','1');
  await expect(chinese).toHaveCSS('opacity','0');
  await greeting.hover();
  const initial=await greeting.boundingBox();
  await expect(chinese).toHaveCSS('opacity','1');
  await expect(english).toHaveCSS('opacity','0');
  const switched=await greeting.boundingBox();
  expect(switched.width).toBe(initial.width);
  expect(switched.height).toBe(initial.height);
  await page.mouse.move(0,0);
  await expect(english).toHaveCSS('opacity','1');
  await expect(chinese).toHaveCSS('opacity','0');
  await page.keyboard.press('Tab');
  await greeting.focus();
  await expect(chinese).toHaveCSS('opacity','1');
});

test('warm navigation bubble follows hover and focus and returns to the current page',async({page})=>{
  await page.emulateMedia({colorScheme:'light'});
  await page.goto('./');
  const nav=page.getByRole('navigation',{name:'Main navigation'});
  const home=nav.getByRole('link',{name:'Home',exact:true});
  const research=nav.getByRole('link',{name:'Research',exact:true});
  const cv=nav.getByRole('link',{name:'CV',exact:true});
  await expect(home.locator('.navigation-bubble')).toHaveCSS('background-color','rgb(255, 247, 245)');
  await expect(home).toHaveCSS('color','rgb(51, 51, 51)');
  await research.hover();
  await expect(research.locator('.navigation-bubble')).toBeVisible();
  await expect(home).toHaveAttribute('aria-current','page');
  await page.mouse.move(0,0);
  await expect(home.locator('.navigation-bubble')).toBeVisible();
  await cv.focus();
  await expect(cv.locator('.navigation-bubble')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/cv\/$/);
  await expect(cv).toHaveAttribute('aria-current','page');
});

test('reduced motion shows page content immediately and keeps navigation usable',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('./');
  const greeting=page.getByRole('heading',{name:"Hi, I'm Jiahao Liu",exact:true});
  await expect(greeting).toBeVisible();
  await expect(greeting).toHaveCSS('animation-name','none');
  await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Research',exact:true}).click();
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await expect(page.locator('.content-card')).toHaveCount(8);
  await expect(page.locator('.content-card').first()).toHaveCSS('animation-name','none');
});

test('mobile menu follows a destination and Escape returns focus',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('./');
  const open=page.getByRole('button',{name:'Open menu',exact:true});
  await open.click();
  const nav=page.getByRole('navigation',{name:'Mobile navigation'});
  await expect(nav).toBeVisible();
  await nav.getByRole('link',{name:'Research',exact:true}).click();
  await expect(page).toHaveURL(/\/research\/$/);
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
  await expect(nojs.getByRole('heading',{level:1})).toHaveText('Research');
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
    await page.locator('main').evaluate(el=>Promise.all(el.getAnimations({subtree:true}).map(animation=>animation.finished.catch(()=>{}))));
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
    await page.goto('./research/');
    await page.locator('main').evaluate(el=>Promise.all(el.getAnimations({subtree:true}).map(animation=>animation.finished.catch(()=>{}))));
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const preview=await page.locator('.project-visual').first().boundingBox();
    const information=await page.locator('.project-information').first().boundingBox();
    if(width===1440)expect(preview.x+preview.width).toBeLessThan(information.x);
    else expect(preview.y+preview.height).toBeLessThan(information.y);
    for(const project of await page.locator('.research-project').all()) {
      const title=await project.getByRole('heading').boundingBox();
      const date=await project.locator('time').boundingBox();
      expect(Math.abs(title.y-date.y)).toBeLessThan(1);
      expect(date.x).toBeGreaterThanOrEqual(title.x+title.width);
      if(width===1440) {
        expect(date.x-title.x-title.width).toBeGreaterThanOrEqual(20);
        expect(date.x-title.x-title.width).toBeLessThan(24);
        for(const selector of ['.research-authors','.project-venue']) {
          const text=await project.locator(selector).boundingBox();
          expect(Math.abs(text.width-title.width)).toBeLessThan(1);
          expect(text.width).toBeLessThanOrEqual(700);
        }
      }
    }
    if(width===1440)expect((await page.locator('.research-page').boundingBox()).width).toBeLessThanOrEqual(1100);
  });
}
