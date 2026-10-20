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
      <aside className="profile-rail" aria-label="Profile">
        <Profile author={config.author} social={config.social} features={config.features}
          researchInterests={['Human–computer interaction', 'Behavioral research', 'VR / AR / MR']} />
      </aside>
      <div className="home-content">
        <section id="about" className="intro-section" aria-labelledby="intro-title">
          <h1 id="intro-title">{home.greeting}</h1>
          <div className="intro-copy"><ReactMarkdown>{home.intro}</ReactMarkdown></div>
          <section id="research-themes" className="research-themes" aria-label="Research themes">
            {home.themes.map((theme) => (
              <article className="research-theme" key={theme.slug}>
                <Link className="theme-link" href={`/research/${theme.slug}/`}
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
          <div className="background-copy"><ReactMarkdown>{home.background}</ReactMarkdown></div>
        </section>
        <section id="research" className="research-section" aria-labelledby="research-title">
          <h2 id="research-title" className="section-eyebrow">{home.research_label}</h2>
          <ol className="research-list">
            {research.items.map((item) => (
              <li key={item.id}>
                <div className="research-title-line">
                  <h3><Link href={`/research/#${item.id}`}>{item.title}</Link></h3>
                  {item.date && <span className="research-date">{item.date}</span>}
                </div>
                <ResearchAuthors authors={item.authors} highlightAuthor={item.highlight_author} />
                {item.subtitle && <p className="research-venue">{item.subtitle}</p>}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
