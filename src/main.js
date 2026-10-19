import './style.css';
import { projects } from './content.js';

document.querySelector('#year').textContent = new Date().getFullYear();

for (const project of projects) {
  const card = document.createElement('article');
  card.className = 'project-card';
  const number = document.createElement('span');
  number.className = 'project-number';
  number.textContent = project.number;
  const body = document.createElement('div');
  body.className = 'project-body';
  const title = document.createElement('h3');
  title.textContent = project.title;
  const description = document.createElement('p');
  description.textContent = project.description;
  const tags = document.createElement('ul');
  tags.className = 'tags';
  tags.setAttribute('aria-label', 'Project tags');
  for (const tag of project.tags) {
    const item = document.createElement('li');
    item.textContent = tag;
    tags.append(item);
  }
  body.append(title, description, tags);
  const link = document.createElement('a');
  link.className = 'project-link';
  link.href = project.url;
  link.textContent = project.linkLabel;
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.setAttribute('class', 'arrow-icon');
  icon.setAttribute('viewBox', '0 0 24 24');
  icon.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M7 17 17 7M7 7h10v10');
  icon.append(path);
  link.append(icon);
  link.setAttribute('aria-label', `${project.linkLabel}: ${project.title}`);
  card.append(number, body, link);
  document.querySelector('#project-list').append(card);
}

const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
