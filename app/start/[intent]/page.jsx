import { notFound } from 'next/navigation';
import StartPage from '../StartPage';
import { INTENTS, INTENT_KEYS, pageMeta } from '../content';

// One pre-built US page per search intent (truck, van, trailer, cart, start, franchise, compare), so the headline
// matches what the visitor typed from the first paint. Unknown intents are a 404, never a blank page.
export const dynamicParams = false;

export function generateStaticParams() {
  return INTENT_KEYS.filter((k) => k !== 'bike').map((intent) => ({ intent }));
}

export function generateMetadata({ params }) {
  return INTENTS[params.intent] ? pageMeta('us', params.intent) : {};
}

export default function Page({ params }) {
  if (!INTENTS[params.intent]) notFound();
  return <StartPage market="us" intent={params.intent} />;
}
