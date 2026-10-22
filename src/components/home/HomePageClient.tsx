'use client';

import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ArrowUpRight } from 'lucide-react';
import Profile from './Profile';
import ResearchAuthors from '@/components/research/ResearchAuthors';
import { assetPath } from '@/lib/paths';
import type { SiteConfig } from '@/lib/config';
import type { HomeContent } from '@/types/home';
import type { CardPageConfig } from '@/types/page';

export default function HomePageClient({ config, home, research }: {
  config: SiteConfig; home: HomeContent; research: CardPageConfig;
}) {
  return (
    <div className="home-layout">
      <aside className="profile-rail page-enter" aria-label="Profile">
        <Profile author={config.author} social={config.social} features={config.features}
          researchInterests={['Human–computer interaction', 'Behavioral research', 'VR / AR / MR']} />
      </aside>
      <div className="home-content">
        <section id="about" className="intro-section" aria-labelledby="intro-title">
          <h1 id="intro-title" className="greeting-heading page-enter enter-step-1" tabIndex={0} aria-label={home.greeting}>
            <span className="greeting-window" aria-hidden="true">
              <span className="greeting-english">{home.greeting}</span>
              {home.greeting_zh && <span className="greeting-chinese" lang="zh-Hans">{home.greeting_zh}</span>}
            </span>
          </h1>
          <div className="intro-copy page-enter enter-step-2"><ReactMarkdown>{home.intro}</ReactMarkdown></div>
          <section id="research-themes" className="research-themes" aria-label="Research themes">
            {home.themes.map((theme) => (
              <article className="research-theme page-enter" key={theme.slug}>
                <Link className="theme-link" href="/research/"
                  aria-labelledby={`theme-${theme.slug}-title`}>
                  <figure className="theme-image">
                    <Image src={assetPath(theme.src)} alt={theme.alt} fill
                      sizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1000px) calc(100vw - 300px), (max-width: 1068px) calc(100vw - 368px), 270px"
                      priority />
                  </figure>
                  <h2 id={`theme-${theme.slug}-title`} className="theme-title">{theme.title}</h2>
                  <p className="theme-keywords">Keywords: {theme.keywords.join(', ')}</p>
                  <span className="theme-read-more">Read More <ArrowUpRight aria-hidden="true" /></span>
                </Link>
              </article>
            ))}
          </section>
          {home.background && <div className="background-copy"><ReactMarkdown>{home.background}</ReactMarkdown></div>}
        </section>
        <section id="research" className="research-section page-enter enter-step-3" aria-labelledby="research-title">
          <div className="research-section-header">
            <h2 id="research-title" className="section-eyebrow">{home.research_label}</h2>
            <Link className="research-view-more" href="/research/">View More <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <ol className="research-list">
            {research.items.filter(item => item.featured !== false).map((item) => {
              const titleEnding = item.title_keep_together && item.title.endsWith(item.title_keep_together)
                ? item.title_keep_together : '';
              return (
                <li key={item.id}>
                  <div className="research-title-line">
                    <h3><Link href={`/research/#${item.id}`}>
                      {titleEnding ? <>{item.title.slice(0, -titleEnding.length)}<span className="research-title-phrase">{titleEnding}</span></> : item.title}
                    </Link></h3>
                    {item.date && <span className="research-date">{item.date}</span>}
                  </div>
                  <ResearchAuthors authors={item.home_authors ?? item.authors} highlightAuthor={item.highlight_author} />
                  {(item.subtitle || item.author_note) && <p className="research-venue">
                    {item.subtitle}
                    {item.author_note && <> <span className="research-author-note">{item.author_note}</span></>}
                  </p>}
                </li>
              );
            })}
          </ol>
          <div className="research-more-footer">
            <Link className="research-more-icon" href="/research/" aria-label="View all research projects" title="View More">
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
