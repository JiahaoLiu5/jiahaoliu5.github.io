import { getConfig } from '@/lib/config';
import { getTomlContent } from '@/lib/content';
import HomePageClient from '@/components/home/HomePageClient';
import type { HomeContent } from '@/types/home';
import type { CardPageConfig } from '@/types/page';

export default function Home() {
  const config = getConfig();
  const home = getTomlContent<HomeContent>('home.toml');
  const research = getTomlContent<CardPageConfig>('research.toml');
  if (!home || !research) throw new Error('Home and research content are required.');
  return <HomePageClient config={config} home={home} research={research} />;
}
