'use client';

interface FooterProps {
  lastUpdated?: string;
  lastUpdatedByLocale?: Record<string, string | undefined>;
  defaultLocale?: string;
  authorName?: string;
}

export default function Footer({ authorName = 'Jiahao Liu' }: FooterProps) {
  return <footer className="site-footer"><div className="footer-inner">
    <p>© {new Date().getFullYear()} {authorName}</p>
    <p>Built with <a href="https://github.com/xyjoey/PRISM" target="_blank" rel="noopener noreferrer">PRISM</a>
      <span aria-hidden="true"> · </span><a href="https://github.com/JiahaoLiu5/jiahaoliu5.github.io" target="_blank" rel="noopener noreferrer">Source</a></p>
  </div></footer>;
}
