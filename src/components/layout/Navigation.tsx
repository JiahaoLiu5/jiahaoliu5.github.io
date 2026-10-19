'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

// PRISM navigation and theme control, simplified to match the page typography.
export default function Navigation({ items, siteTitle }: NavigationProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState('');
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  const active = (item: SiteConfig['navigation'][number]) => item.type === 'section'
    ? pathname === '/' && hash === `#${item.target}`
    : item.href === '/' ? pathname === '/' && !hash : pathname.startsWith(item.href);

  return <Disclosure as="header" className="site-header">
    {({ open, close }) => <div onKeyDown={(event) => { if (event.key === 'Escape') close(menuButton); }}>
      <div className="header-inner">
        <Link href="/" className="site-wordmark" onClick={() => { setHash(''); close(); }}>{siteTitle}</Link>
        <div className="header-tools">
          <nav className="desktop-navigation" aria-label="Main navigation">
            {items.map((item) => <Link key={item.target} href={item.href}
              aria-current={active(item) ? item.type === 'section' ? 'location' : 'page' : undefined}
              onClick={() => setHash(item.type === 'section' ? `#${item.target}` : '')}>{item.title}</Link>)}
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
