import { notFound } from 'next/navigation';
import StartPage from '../StartPage';
import { INTENTS, INTENT_KEYS } from '../content';

// One pre-built page per search intent (truck, van, trailer, cart, start, franchise, compare), so the headline matches
// what the visitor typed from the first paint. Unknown intents are a 404, never a blank page.
export const dynamicParams = false;

export function generateStaticParams() {
  return INTENT_KEYS.filter((k) => k !== 'bike').map((intent) => ({ intent }));
}

export function generateMetadata({ params }) {
  const I = INTENTS[params.intent];
  if (!I) return {};
  return {
    title: `${I.title} | Coffee Bike World`,
    description: I.sub,
    robots: { index: false, follow: true },
    alternates: { canonical: `https://coffeebike.ca/buy-a-mobile-coffee-bike/start/${params.intent}` },
  };
}

export default function Page({ params }) {
  if (!INTENTS[params.intent]) notFound();
  return <StartPage intent={params.intent} />;
}
