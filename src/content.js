// One place for the homepage content. null and [] keep missing information
// clearly marked as a placeholder. No sample papers are presented as real work.
export const profile = {
  name: 'Jiahao Liu',
  initials: 'JL',
  role: 'PhD student',
  institution: null,
  department: null,
  location: null,
  photo: null, // e.g. 'images/portrait.jpg' in public/images/
  photoAlt: 'Portrait of Jiahao Liu',
  email: null,
  cv: null, // e.g. 'files/cv.pdf' in public/files/
  scholar: null,
  github: 'https://github.com/JiahaoLiu5',
  linkedin: null,
  orcid: null,
  status: 'Profile in progress', // Set to null when the profile is complete.
  biography: [
    'Hi, I’m Jiahao, a PhD student. Welcome to my academic home on the web.',
    'Here I’ll share my research, publications, projects, and ideas. My full biography and research statement will be added soon.',
  ],
  interests: [],
};

// News: { date: '2026-10-18', text: 'Your real update', url: null }
export const news = [];
// Research: { title, description, url: null }
export const research = [];
// Publications: { id, title, authors: ['Jiahao Liu'], venue, year, type,
//   image: null, imageAlt: '', abstract: null, bibtex: null,
//   links: [{ label: 'Paper', url: 'https://...' }] }
export const publications = [];
// Projects: { title, description, tags: [], image: null, imageAlt: '',
//   kind: 'website', links: [{ label, url }] }
export const projects = [
  {
    title: 'Academic homepage',
    description: 'An evolving home for my research, writing, and work. The website you’re exploring right now.',
    tags: ['Web', 'Source available'],
    image: null,
    imageAlt: '',
    kind: 'website',
    links: [{ label: 'Source', url: 'https://github.com/JiahaoLiu5/jiahaoliu5.github.io' }],
  },
];
export const education = [
  { title: 'PhD student', institution: null, period: null, current: true },
];
// Teaching and service: { title, description, period: null, url: null }
export const service = [];
// Awards: { title, organization: null, year: null, url: null }
export const awards = [];
