import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getTomlContent } from '@/lib/content';
import type { HomeContent } from '@/types/home';

type ThemePageProps = { params: Promise<{ theme: string }> };

function getThemes() {
  return getTomlContent<HomeContent>('home.toml')?.themes || [];
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getThemes().map(({ slug }) => ({ theme: slug }));
}

export async function generateMetadata({ params }: ThemePageProps): Promise<Metadata> {
  const { theme: slug } = await params;
  const theme = getThemes().find((item) => item.slug === slug);
  if (!theme) return {};
  return {
    title: theme.title,
    description: theme.keywords.join(', '),
    alternates: { canonical: `/research/${theme.slug}/` },
  };
}

export default async function ThemePage({ params }: ThemePageProps) {
  const { theme: slug } = await params;
  const theme = getThemes().find((item) => item.slug === slug);
  if (!theme) notFound();

  return (
    <article className="theme-detail">
      <Link className="theme-detail-back" href="/#research-themes">
        <ArrowLeft aria-hidden="true" /> Back to research themes
      </Link>
      <h1>{theme.title}</h1>
      <p className="theme-keywords">Keywords: {theme.keywords.join(', ')}</p>
      <p className="theme-detail-pending">More details will be added here.</p>
    </article>
  );
}
