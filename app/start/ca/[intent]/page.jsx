import { notFound } from 'next/navigation';
import StartPage from '../../StartPage';
import { INTENTS, INTENT_KEYS, pageMeta } from '../../content';

// Canadian twin of /start/<intent>: same page, prices in Canadian dollars.
export const dynamicParams = false;

export function generateStaticParams() {
  return INTENT_KEYS.filter((k) => k !== 'bike').map((intent) => ({ intent }));
}

export function generateMetadata({ params }) {
  return INTENTS[params.intent] ? pageMeta('ca', params.intent) : {};
}

export default function Page({ params }) {
  if (!INTENTS[params.intent]) notFound();
  return <StartPage market="ca" intent={params.intent} />;
}
