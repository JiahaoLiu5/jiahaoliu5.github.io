import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { LocaleProvider } from '@/components/ui/LocaleProvider';
import { getConfig } from '@/lib/config';
import { getRuntimeI18nConfig } from '@/lib/i18n/config';
import { assetPath } from '@/lib/paths';

export function generateMetadata(): Metadata {
  const config = getConfig();
  return {
    metadataBase: new URL(config.site.url || 'https://jiahaoliu5.github.io'),
    title: { default: config.site.title, template: `%s | ${config.site.title}` },
    description: config.site.description,
    authors: [{ name: config.author.name }],
    icons: { icon: assetPath(config.site.favicon) },
    alternates: { canonical: '/' },
    openGraph: { type: 'website', title: config.site.title, description: config.site.description, url: '/' },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const config = getConfig();
  const i18n = getRuntimeI18nConfig(config.i18n);
  return <html lang="en" suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: `try {
        var stored=JSON.parse(localStorage.getItem('theme-storage')||'null');
        var choice=stored?.state?.theme||'system';
        var dark=choice==='dark'||(choice==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList.add(dark?'dark':'light');
        document.documentElement.dataset.theme=dark?'dark':'light';
      } catch(e) { document.documentElement.classList.add('light'); }` }} />
    </head>
    <body>
      <a className="skip-link" href="#main">Skip to content</a>
      <ThemeProvider><LocaleProvider config={i18n}>
        <Navigation items={config.navigation} siteTitle={config.site.title} i18n={i18n} />
        <main id="main" tabIndex={-1} className="site-main">{children}</main>
        <Footer authorName={config.author.name} lastUpdated={config.site.last_updated} />
      </LocaleProvider></ThemeProvider>
    </body>
  </html>;
}
