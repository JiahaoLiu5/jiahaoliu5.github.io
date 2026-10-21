'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Check, Copy, FileText, ImageIcon, Search, SlidersHorizontal, X } from 'lucide-react';
import ResearchAuthors from './ResearchAuthors';
import { assetPath } from '@/lib/paths';
import type { CardItem, CardPageConfig } from '@/types/page';

type ProjectFilter = 'all' | 'first-author' | 'published' | 'under-review';

const filters: { value: ProjectFilter; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'first-author', label: 'First-Author Projects' },
  { value: 'published', label: 'Published Projects' },
  { value: 'under-review', label: 'Under Review Projects' },
];

function dateOrder(date?: string) {
  const match = date?.match(/^(\d{2})\s+(\d{4})$/);
  return match ? Number(match[2]) * 12 + Number(match[1]) : 0;
}

function searchable(text: string) {
  return text.normalize('NFKD').toLowerCase().replace(/[’‘]/g, "'");
}

function ProjectResources({ item }: { item: CardItem }) {
  const [expanded, setExpanded] = useState<'abstract' | 'bibtex' | null>(null);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const id = item.id || 'project';
  if (item.status !== 'published') return null;

  async function copyCitation() {
    try {
      await navigator.clipboard.writeText(item.bibtex || '');
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  }

  return <div className="project-resources">
    <div className="project-resource-actions" aria-label="Publication resources">
      {item.doi ? <a className="project-resource" href={`https://doi.org/${item.doi}`} target="_blank" rel="noopener noreferrer">DOI</a>
        : <button type="button" className="project-resource" disabled title="DOI link coming soon">DOI</button>}
      {item.abstract ? <button type="button" className="project-resource" aria-expanded={expanded === 'abstract'} aria-controls={`${id}-abstract`}
        onClick={() => setExpanded(expanded === 'abstract' ? null : 'abstract')}>
        <FileText aria-hidden="true" /> Abstract
      </button> : item.abstract_url ? <a className="project-resource" href={item.abstract_url} target="_blank" rel="noopener noreferrer"><FileText aria-hidden="true" /> Abstract</a>
        : <button type="button" className="project-resource" disabled title="Abstract coming soon"><FileText aria-hidden="true" /> Abstract</button>}
      {item.bibtex ? <button type="button" className="project-resource" aria-expanded={expanded === 'bibtex'} aria-controls={`${id}-bibtex`}
        onClick={() => { setExpanded(expanded === 'bibtex' ? null : 'bibtex'); setCopyState('idle'); }}>
        <BookOpen aria-hidden="true" /> BibTeX
      </button> : <button type="button" className="project-resource" disabled title="BibTeX coming soon"><BookOpen aria-hidden="true" /> BibTeX</button>}
    </div>
    {expanded === 'abstract' && item.abstract && <section id={`${id}-abstract`} className="project-resource-panel" aria-label="Abstract">
      <p>{item.abstract}</p>
    </section>}
    {expanded === 'bibtex' && item.bibtex && <section id={`${id}-bibtex`} className="project-resource-panel" aria-label="BibTeX citation">
      <div className="project-citation-heading">
        <span>BibTeX</span>
        <button type="button" className="project-copy" onClick={copyCitation} aria-label={`Copy BibTeX for ${item.title}`}>
          {copyState === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {copyState === 'copied' ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>{item.bibtex}</pre>
      {copyState !== 'idle' && <p role="status" className="project-copy-status">{copyState === 'copied' ? 'Citation copied.' : 'Select and copy the citation below.'}</p>}
    </section>}
  </div>;
}

export default function ResearchProjects({ config }: { config: CardPageConfig }) {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>('all');
  const [showFilters, setShowFilters] = useState(true);
  const projects = useMemo(() => [...config.items].sort((a, b) => dateOrder(b.date) - dateOrder(a.date)), [config.items]);
  const visibleProjects = useMemo(() => {
    const terms = searchable(query).trim().split(/\s+/).filter(Boolean);
    return projects.filter(item => {
      const text = searchable([item.title, item.authors, item.subtitle, item.date, item.abstract].filter(Boolean).join(' '));
      const matchesSearch = terms.every(term => text.includes(term));
      const matchesFilter = selectedFilter === 'all'
        || (selectedFilter === 'first-author' && (item.authorship === 'first' || item.authorship === 'co-first'))
        || selectedFilter === item.status;
      return matchesSearch && matchesFilter;
    });
  }, [projects, query, selectedFilter]);
  const activeFilter = filters.find(filter => filter.value === selectedFilter)!;
  const hasFilters = query.trim() || selectedFilter !== 'all';

  function resetFilters() {
    setQuery('');
    setSelectedFilter('all');
  }

  return <>
    <header className="research-page-heading page-enter">
      <h1>{config.title}</h1>
      {config.description && <p>{config.description}</p>}
    </header>
    <section className="research-controls page-enter enter-step-1" aria-label="Search and filter research projects">
      <div className="research-search-row">
        <div className="research-search">
          <Search aria-hidden="true" />
          <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search projects…" aria-label="Search research projects" />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search"><X aria-hidden="true" /></button>}
        </div>
        <button type="button" className="research-filter-toggle" aria-expanded={showFilters} aria-controls="research-project-filters" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal aria-hidden="true" /> Filters
        </button>
      </div>
      <fieldset id="research-project-filters" className="research-filter-panel" hidden={!showFilters}>
        <legend>Project filters</legend>
        <div className="research-filter-options">
          {filters.map(filter => <button key={filter.value} type="button" aria-pressed={selectedFilter === filter.value} onClick={() => setSelectedFilter(filter.value)}>{filter.label}</button>)}
        </div>
      </fieldset>
    </section>
    <div className="research-results-heading">
      <p role="status" aria-live="polite" aria-atomic="true">{visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}<span aria-hidden="true"> · </span>{activeFilter.label}</p>
      {hasFilters && <button type="button" onClick={resetFilters}>Reset filters</button>}
    </div>
    <div className="research-project-list">
      {visibleProjects.map((item, index) => <article key={item.id || item.title} id={item.id} className="research-project content-card page-enter" style={{ animationDelay: `${Math.min(index * 70, 280)}ms` }}>
        <div className={`project-visual${item.image ? '' : ' project-visual-placeholder'}`}>
          {item.image ? <Image src={assetPath(item.image)} alt={item.image_alt || item.title} fill sizes="(max-width: 796px) calc(100vw - 44px), 224px" /> : <div role="img" aria-label={`Illustration placeholder for ${item.title}`}>
            <span className="project-placeholder-number" aria-hidden="true">{String(projects.indexOf(item) + 1).padStart(2, '0')}</span>
            <ImageIcon aria-hidden="true" />
            <span>Illustration coming soon</span>
          </div>}
        </div>
        <div className="project-information">
          <div className="project-heading-line">
            <h2>{item.title}</h2>
            {item.date && <time dateTime={item.date.replace(/^(\d{2})\s+(\d{4})$/, '$2-$1')}>{item.date}</time>}
          </div>
          <ResearchAuthors authors={item.authors} highlightAuthor={item.highlight_author} />
          {item.subtitle && <p className="project-venue">{item.subtitle}</p>}
          {item.content && <div className="project-description"><ReactMarkdown>{item.content}</ReactMarkdown></div>}
          <ProjectResources item={item} />
        </div>
      </article>)}
      {visibleProjects.length === 0 && <div className="research-empty">
        <Search aria-hidden="true" />
        <h2>No projects found</h2>
        <p>Try a different keyword or project filter.</p>
        <button type="button" onClick={resetFilters}>Show all projects</button>
      </div>}
    </div>
  </>;
}
