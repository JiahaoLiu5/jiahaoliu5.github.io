import './style.css';
import { profile, news, research, publications, projects, education, service, awards } from './content.js';

const $ = (selector) => document.querySelector(selector);
const base = import.meta.env.BASE_URL;
const sourceURL = 'https://github.com/JiahaoLiu5/jiahaoliu5.github.io';
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = String(text);
  return node;
}
function icon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icon');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `#i-${name}`);
  svg.append(use);
  return svg;
}
function safeURL(value, asset = false) {
  if (!value || typeof value !== 'string') return null;
  try {
    let candidate = value.trim();
    if (asset && !/^[a-z][a-z\d+.-]*:/i.test(candidate) && !candidate.startsWith('//')) {
      candidate = base + candidate.replace(/^\.?\//, '');
    }
    const parsed = new URL(candidate, location.href);
    return ['https:', 'http:', 'mailto:'].includes(parsed.protocol) ? parsed.href : null;
  } catch { return null; }
}
function link(label, value, className = '', iconName = null, asset = false) {
  const url = safeURL(value, asset);
  if (!url) return null;
  const anchor = element('a', className, label);
  anchor.href = url;
  if (new URL(url).origin !== location.origin && !url.startsWith('mailto:')) {
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
  }
  if (iconName) anchor.append(icon(iconName));
  return anchor;
}
function image(value, alt, eager = false) {
  const url = safeURL(value, true);
  if (!url) return null;
  const node = element('img');
  node.src = url;
  node.alt = alt || '';
  node.loading = eager ? 'eager' : 'lazy';
  node.decoding = 'async';
  return node;
}
function previewLabel(text = 'TO BE ADDED') {
  return element('span', 'preview-label', text);
}

// Profile: facts and links are supplied only from the content file.
$('#profile-name').replaceChildren(document.createTextNode(profile.name), element('span', 'name-dot', '.'));
$('#profile-role').replaceChildren(element('span', 'status-dot'), document.createTextNode(profile.role));
$('#profile-role .status-dot').setAttribute('aria-hidden', 'true');
const photo = image(profile.photo, profile.photoAlt, true);
if (photo) $('#portrait').replaceChildren(photo);
else {
  $('.portrait-initials').textContent = profile.initials;
  $('.portrait-placeholder').setAttribute('aria-label', `Portrait placeholder for ${profile.name}`);
}
const affiliation = $('#profile-affiliation');
for (const [value, fallback, symbol] of [
  [profile.institution, 'Institution to be added', 'building'],
  [profile.department, 'Research group to be added', 'book'],
  [profile.location, null, 'pin'],
]) {
  if (!value && !fallback) continue;
  const row = element('p', value ? '' : 'field-placeholder');
  row.append(icon(symbol), element('span', '', value || fallback));
  affiliation.append(row);
}
for (const [label, value, symbol, isAsset] of [
  ['Email', profile.email ? `mailto:${profile.email}` : null, 'mail', false],
  ['Google Scholar', profile.scholar, 'cap', false],
  ['GitHub profile', profile.github, 'code', false],
  ['CV', profile.cv, 'file', true],
]) {
  const item = link('', value, '', null, isAsset) || element('button');
  item.append(icon(symbol));
  item.setAttribute('aria-label', value ? label : `${label} (to be added)`);
  item.title = value ? label : `${label} to be added`;
  if (item.tagName === 'BUTTON') { item.type = 'button'; item.disabled = true; }
  $('#profile-links').append(item);
}
for (const [label, url] of [['LinkedIn', profile.linkedin], ['ORCID', profile.orcid]]) {
  const item = link(label === 'ORCID' ? 'iD' : 'in', url);
  if (item) { item.setAttribute('aria-label', label); $('#profile-links').append(item); }
}
$('#profile-status').textContent = profile.status || '';
$('#profile-status').hidden = !profile.status;
const biography = $('#biography');
biography.replaceChildren(...profile.biography.map((text) => element('p', '', text)));
const interests = profile.interests.length ? profile.interests : ['Research area 01', 'Research area 02', 'Research area 03'];
for (const text of interests) {
  $('#research-interests').append(element('span', `interest-tag${profile.interests.length ? '' : ' is-placeholder'}`, text));
}
if (news.length) {
  $('#news-list').replaceChildren(...news.map((entry) => {
    const row = element('div', 'news-item');
    const date = element('time', 'news-date', entry.date);
    if (/^\d{4}-\d{2}-\d{2}$/.test(entry.date || '')) {
      date.dateTime = entry.date;
      date.textContent = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${entry.date}T00:00:00Z`));
    }
    row.append(date, link(entry.text, entry.url) || element('span', '', entry.text));
    return row;
  }));
}

// Research themes use clearly identified layout previews until real content exists.
const directions = research.length ? research : [
  { title: 'Research theme 01', description: 'A short introduction to a research direction and the questions it explores.' },
  { title: 'Research theme 02', description: 'A place for the methods, ideas, and perspectives that shape my research.' },
];
for (const [index, direction] of directions.entries()) {
  const card = element('article', 'research-card');
  const head = element('div', 'research-card-head');
  const mark = element('span', 'research-mark');
  mark.append(icon(index % 2 ? 'book' : 'spark'));
  head.append(mark, element('span', 'research-index', String(index + 1).padStart(2, '0')));
  const title = element('h3');
  title.append(link(direction.title, direction.url) || document.createTextNode(direction.title));
  card.append(head, title, element('p', '', direction.description));
  if (!research.length) card.append(previewLabel());
  $('#research-list').append(card);
}
function paperFigure(publication) {
  const figure = element('div', 'paper-figure');
  const thumbnail = image(publication?.image, publication?.imageAlt || '');
  if (thumbnail) figure.append(thumbnail);
  else {
    figure.setAttribute('aria-hidden', 'true');
    const diagram = element('div', 'paper-diagram');
    diagram.append(element('span'), element('span'), element('span'));
    figure.append(diagram);
  }
  return figure;
}
function publicationCard(publication) {
  const card = element('article', 'publication-card');
  const body = element('div');
  const title = element('h3');
  const firstLink = publication.links?.find((entry) => safeURL(entry.url));
  title.append(link(publication.title, firstLink?.url) || document.createTextNode(publication.title));
  const authors = element('p', 'publication-authors');
  const names = Array.isArray(publication.authors) ? publication.authors : [publication.authors || ''];
  names.forEach((author, index) => {
    if (index) authors.append(document.createTextNode(', '));
    authors.append(element(author === profile.name ? 'strong' : 'span', '', author));
  });
  const venue = [publication.venue, publication.year].filter(Boolean).join(' · ');
  body.append(title, authors, element('p', 'publication-venue', venue));
  const actions = element('div', 'publication-actions');
  for (const entry of publication.links || []) {
    const resource = link(entry.label, entry.url, 'resource-link', 'external', true);
    if (resource) actions.append(resource);
  }
  if (publication.bibtex) {
    const cite = element('button', 'resource-link', 'BibTeX');
    cite.type = 'button';
    cite.setAttribute('aria-label', `Citation for ${publication.title}`);
    cite.addEventListener('click', () => {
      $('#citation-text').textContent = publication.bibtex;
      $('#citation-status').textContent = '';
      $('#copy-citation').textContent = 'Copy BibTeX';
      $('#citation-dialog').showModal();
    });
    actions.append(cite);
  }
  body.append(actions);
  if (publication.abstract) {
    const details = element('details');
    details.append(element('summary', '', 'Abstract'), element('p', '', publication.abstract));
    body.append(details);
  }
  card.append(paperFigure(publication), body);
  return card;
}
function renderPublications() {
  const container = $('#publication-list');
  container.replaceChildren();
  if (!publications.length) {
    const preview = element('div', 'publication-preview');
    const body = element('div');
    body.append(previewLabel('LAYOUT PREVIEW'), element('h3', '', 'Publications to follow'), element('p', '', 'Papers, preprints, and research notes will be collected here.'));
    const resources = element('div', 'preview-resources');
    resources.setAttribute('aria-hidden', 'true');
    resources.append(...['Paper', 'Code', 'Citation'].map((text) => element('span', '', text)));
    body.append(resources);
    preview.append(paperFigure(), body);
    container.append(preview);
    return;
  }
  const query = $('#publication-search').value.trim().toLowerCase();
  const year = $('#publication-year').value;
  const matches = publications.filter((entry) => {
    const text = [entry.title, ...(Array.isArray(entry.authors) ? entry.authors : [entry.authors]), entry.venue].join(' ').toLowerCase();
    return (!query || text.includes(query)) && (year === 'all' || String(entry.year) === year);
  });
  container.append(...matches.map(publicationCard));
  if (!matches.length) container.append(element('p', 'no-results', 'No publications match this search.'));
  $('#publication-status').textContent = `${matches.length} publication${matches.length === 1 ? '' : 's'} shown`;
}
if (publications.length) {
  $('#publication-controls').hidden = false;
  $('#publication-count').textContent = `${publications.length} publication${publications.length === 1 ? '' : 's'}`;
  const years = [...new Set(publications.map((entry) => entry.year).filter(Boolean))].sort((a, b) => Number(b) - Number(a));
  for (const year of years) {
    const option = element('option', '', year);
    option.value = String(year);
    $('#publication-year').append(option);
  }
  $('#publication-search').addEventListener('input', renderPublications);
  $('#publication-year').addEventListener('change', renderPublications);
}
renderPublications();

function browserArt() {
  const browser = element('div', 'browser-art');
  browser.setAttribute('aria-hidden', 'true');
  const dots = element('div', 'browser-dots');
  dots.append(element('i'), element('i'), element('i'));
  const layout = element('div', 'browser-layout');
  const lines = element('div', 'browser-lines');
  lines.append(element('i'), element('i'), element('i'), element('i'));
  layout.append(element('div', 'browser-profile'), lines);
  browser.append(dots, layout);
  return browser;
}
for (const project of projects) {
  const card = element('article', 'project-card');
  const figure = element('div', 'project-image');
  figure.append(image(project.image, project.imageAlt) || browserArt());
  const body = element('div', 'project-body');
  body.append(element('h3', '', project.title), element('p', '', project.description));
  if (project.tags?.length) {
    const tags = element('ul', 'project-tags');
    tags.setAttribute('aria-label', 'Project tags');
    tags.append(...project.tags.map((tag) => element('li', '', tag)));
    body.append(tags);
  }
  const links = element('div', 'project-links');
  for (const entry of project.links || []) {
    const resource = link(entry.label, entry.url, '', 'external');
    if (resource) { resource.setAttribute('aria-label', `${entry.label}: ${project.title}`); links.append(resource); }
  }
  body.append(links);
  card.append(figure, body);
  $('#project-list').append(card);
}
if (projects.length < 2) {
  const preview = element('article', 'project-card');
  const figure = element('div', 'project-image is-preview');
  const mark = element('span', 'project-placeholder-mark');
  mark.append(icon('spark'));
  figure.append(mark, element('span', 'project-image-caption', 'PROJECT IMAGE'));
  figure.setAttribute('aria-hidden', 'true');
  const body = element('div', 'project-body');
  body.append(element('h3', '', 'Your next research project'), element('p', '', 'A space for a project overview, visual, and links to the work.'), previewLabel());
  preview.append(figure, body);
  $('#project-list').append(preview);
}
for (const entry of education) {
  const row = element('div', 'education-item');
  row.append(element('p', 'education-title', entry.title), element('p', 'education-detail', entry.institution || 'Institution to be added'));
  if (entry.period || entry.current) row.append(element('p', 'education-period', entry.period || 'In progress'));
  $('#education-list').append(row);
}
if (!education.length) $('#education-list').append(element('p', 'quiet-text', 'Academic background to be added.'));
if (service.length) {
  for (const entry of service) {
    const row = element('div', 'service-entry');
    const title = element('h4');
    title.append(link(entry.title, entry.url) || document.createTextNode(entry.title));
    row.append(title, element('p', '', entry.description));
    if (entry.period) row.append(element('p', '', entry.period));
    $('#service-list').append(row);
  }
} else $('#service-list').append(element('p', 'quiet-text empty-service', 'Teaching, mentoring, and academic service will be added here.'));
if (awards.length) {
  $('#awards-list').className = 'awards-block';
  $('#awards-list').append(element('h3', '', 'Awards & recognition'));
  for (const award of awards) {
    const row = element('p');
    row.append(link(award.title, award.url) || document.createTextNode(award.title));
    const metadata = [award.organization, award.year].filter(Boolean).join(' · ');
    if (metadata) row.append(document.createTextNode(` — ${metadata}`));
    $('#awards-list').append(row);
  }
}
const primaryContact = profile.email ? link('Say hello', `mailto:${profile.email}`, 'primary-button', 'arrow') : link('Find me on GitHub', profile.github, 'primary-button', 'external');
if (primaryContact) $('#contact-links').append(primaryContact);
if (profile.email && profile.github) $('#contact-links').append(link('GitHub', profile.github, 'contact-secondary'));
$('#year').textContent = new Date().getFullYear();
const structuredData = element('script');
structuredData.type = 'application/ld+json';
structuredData.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.name, jobTitle: profile.role, url: document.querySelector('link[rel="canonical"]').href, sameAs: [profile.github, profile.scholar, profile.orcid, profile.linkedin].filter(Boolean) });
document.head.append(structuredData);

// Theme choice persists locally; blocked storage never prevents page rendering.
const themeToggle = $('#theme-toggle');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  themeToggle.replaceChildren(icon(dark ? 'sun' : 'moon'));
  document.querySelector('meta[name="theme-color"]').content = dark ? '#111d23' : '#fafbf9';
}
applyTheme(document.documentElement.dataset.theme || 'light');
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('jiahao-theme', theme); } catch {}
});
const menu = $('#menu-toggle');
const navigation = $('#site-nav');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  menu.replaceChildren(icon('menu'));
  navigation.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  if (!open) { closeMenu(); return; }
  menu.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-label', 'Close navigation');
  menu.replaceChildren(icon('close'));
  navigation.classList.add('is-open');
});
navigation.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
});
document.addEventListener('pointerdown', (event) => {
  if (menu.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) closeMenu();
});
matchMedia('(min-width: 851px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });
function setActiveSection(id) {
  for (const anchor of document.querySelectorAll('[data-section-link]')) {
    if (anchor.getAttribute('href') === `#${id}`) anchor.setAttribute('aria-current', 'location');
    else anchor.removeAttribute('aria-current');
  }
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
  }, { rootMargin: '-90px 0px -65% 0px', threshold: 0 });
  for (const section of document.querySelectorAll('main > section')) observer.observe(section);
}
$('#close-citation').addEventListener('click', () => $('#citation-dialog').close());
$('#citation-dialog').addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.currentTarget.close();
  }
});
$('#copy-citation').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText($('#citation-text').textContent);
    $('#copy-citation').textContent = 'Copied';
    $('#citation-status').textContent = 'Citation copied to clipboard.';
  } catch { $('#citation-status').textContent = 'Copy is unavailable. You can select and copy the citation above.'; }
});
