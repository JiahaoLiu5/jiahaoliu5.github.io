'use client';

import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import Profile from './Profile';
import { assetPath } from '@/lib/paths';
import type { SiteConfig } from '@/lib/config';
import type { HomeContent } from '@/types/home';
import type { CardPageConfig } from '@/types/page';

export default function HomePageClient({ config, home, research }: {
  config: SiteConfig; home: HomeContent; research: CardPageConfig;
}) {
  const columns = [home.photos.slice(0, 2), home.photos.slice(2, 4), home.photos.slice(4, 6)];
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
          <div className="photo-wall" aria-label="Photo gallery">
            {columns.map((photos, column) => (
              <div className="photo-column" key={column}>
                {photos.map((photo) => (
                  <figure className={`photo-tile photo-${photo.shape}`} key={photo.src}>
                    <Image src={assetPath(photo.src)} alt={photo.alt} fill
                      sizes="(max-width: 600px) 30vw, (max-width: 1000px) 29vw, 260px"
                      priority={column === 0} />
                  </figure>
                ))}
              </div>
            ))}
          </div>
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
                {item.subtitle && <p className="research-venue">{item.subtitle}</p>}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
