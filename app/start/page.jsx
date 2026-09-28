import StartPage from './StartPage';
import { INTENTS } from './content';

// The Google Ads landing page for coffee bike searches. Kept out of organic search: the sales page owns those rankings.
export const metadata = {
  title: `${INTENTS.bike.title} | Coffee Bike World`,
  description: INTENTS.bike.sub,
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://coffeebike.ca/buy-a-mobile-coffee-bike/start' },
};

export default function Page() {
  return <StartPage intent="bike" />;
}
