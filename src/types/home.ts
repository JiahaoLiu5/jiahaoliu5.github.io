export interface HomeContent {
  greeting: string;
  greeting_zh?: string;
  intro: string;
  background?: string;
  research_label: string;
  themes: Array<{ slug: string; title: string; keywords: string[]; src: string; alt: string }>;
}
