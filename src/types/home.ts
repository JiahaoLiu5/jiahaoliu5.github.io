export interface HomeContent {
  greeting: string;
  intro: string;
  background: string;
  research_label: string;
  photos: Array<{ src: string; alt: string; shape: 'short' | 'tall' }>;
}
