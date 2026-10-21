'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import type { SiteConfig } from '@/lib/config';
import type { I18nRuntimeConfig } from '@/types/i18n';

interface NavigationProps {
  items: SiteConfig['navigation'];
  siteTitle: string;
  enableOnePageMode?: boolean;
  i18n: I18nRuntimeConfig;
  itemsByLocale?: Record<string, SiteConfig['navigation']>;
  siteTitleByLocale?: Record<string, string>;
}

// PRISM's shared spring indicator, adapted to the site's warm red palette.
export default function Navigation({ items, siteTitle }: NavigationProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState('');
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [focusedHref, setFocusedHref] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  const active = (item: SiteConfig['navigation'][number]) => item.type === 'section'
    ? pathname === '/' && hash === `#${item.target}`
    : item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
  const indicatorHref = hoveredHref ?? focusedHref ?? items.find(active)?.href;

  return <Disclosure as="header" className="site-header">
    {({ open, close }) => <div onKeyDown={(event) => { if (event.key === 'Escape') close(menuButton); }}>
      <div className="header-inner page-enter">
        <Link href="/" className="site-wordmark" onClick={() => { setHash(''); close(); }}>{siteTitle}</Link>
        <div className="header-tools">
          <nav className="desktop-navigation" aria-label="Main navigation" onMouseLeave={() => setHoveredHref(null)}>
            <LayoutGroup id="primary-navigation">
              {items.map((item) => <Link key={item.target} href={item.href}
                aria-current={active(item) ? item.type === 'section' ? 'location' : 'page' : undefined}
                onMouseEnter={() => setHoveredHref(item.href)}
                onFocus={() => setFocusedHref(item.href)}
                onBlur={() => setFocusedHref(null)}
                onClick={() => { setHash(item.type === 'section' ? `#${item.target}` : ''); setHoveredHref(null); }}>
                {indicatorHref === item.href && <motion.span className="navigation-bubble" layoutId="navigation-bubble"
                  aria-hidden="true" initial={false}
                  transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 28 }} />}
                <span className="navigation-label">{item.title}</span>
              </Link>)}
            </LayoutGroup>
          </nav>
          <ThemeToggle />
          <DisclosureButton ref={menuButton} className="mobile-menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </DisclosureButton>
        </div>
      </div>
      <DisclosurePanel className="mobile-navigation-panel">
        <nav aria-label="Mobile navigation">{items.map((item) => <Link key={item.target} href={item.href}
          onClick={() => { setHash(item.type === 'section' ? `#${item.target}` : ''); close(menuButton); }}
          aria-current={active(item) ? item.type === 'section' ? 'location' : 'page' : undefined}>{item.title}</Link>)}</nav>
      </DisclosurePanel>
    </div>}
  </Disclosure>;
}
