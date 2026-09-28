import StartPage from './StartPage';
import { pageMeta } from './content';

// The Google Ads landing page for US coffee bike searches (prices in US dollars). Kept out of organic search: the
// sales page owns those rankings.
export const metadata = pageMeta('us', 'bike');

export default function Page() {
  return <StartPage market="us" intent="bike" />;
}
