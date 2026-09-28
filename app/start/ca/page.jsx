import StartPage from '../StartPage';
import { pageMeta } from '../content';

// The Google Ads landing page for Canadian coffee bike searches (prices in Canadian dollars).
export const metadata = pageMeta('ca', 'bike');

export default function Page() {
  return <StartPage market="ca" intent="bike" />;
}
