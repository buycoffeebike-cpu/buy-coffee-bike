import { faqs, OWNERS, PHOTOS, WALKTHROUGH_ID } from '../start/content';

/**
 * The US organic search page (founder approved 29 Sept 2026): "mobile coffee cart" and "coffee cart for sale" for US
 * buyers. Unlike the /start ads pages it is meant to rank, so it carries its own title, description, canonical, social
 * cards and structured data. LIVE switches it from a hidden review copy (noindex, out of the sitemap) to a public page.
 */
export const LIVE = false;

export const URL = 'https://coffeebike.ca/buy-a-mobile-coffee-bike/mobile-coffee-cart';
export const TITLE = 'Mobile Coffee Cart for Sale in the USA | Coffee Bike World';
export const DESCRIPTION = 'Electric mobile coffee cart with a commercial espresso bar, sinks and a fridge. Custom-branded, no franchise fees, about US$15,850, delivered across the US.';
export const H1 = 'Mobile Coffee Cart for Sale in the USA';
export const SHARE_IMAGE = { url: 'https://coffeebike.ca/wp-content/uploads/2026/09/mobile-coffee-cart-usa-share.jpg', width: 1200, height: 630, alt: 'Coffee Bike mobile coffee cart for sale, delivered across the USA' };
export const PRICE_USD = 15850;

/** Owners in US states first (their own words, exactly as the sales page shows them), then everyone else. */
export const US_OWNERS = [...OWNERS].sort((a, b) => Number(!/, (FL|AZ|OR|CA|TX|WA|NY)$/.test(a.place)) - Number(!/, (FL|AZ|OR|CA|TX|WA|NY)$/.test(b.place)));

/**
 * The page's questions: the US answers from the ads page (already approved) with the search wording people use, the
 * deposit left out of "How do I pay?", and three questions only this page asks.
 */
const RENAME = {
  'What does a complete Coffee Bike cost?': 'How much does a mobile coffee cart cost?',
  'Do I need permits?': 'Do I need a permit for a mobile coffee cart?',
  'Do you deliver to my door?': 'Do you deliver anywhere in the US?',
};
const REWRITE = {
  'How much does a mobile coffee cart cost?': (a) => `${a} Espresso carts from other makers often cost about US$8,000–25,000 once an espresso machine and grinder are added, and they still need a vehicle or trailer to move them.`,
  'How do I pay?': () => 'You receive an invoice within one business day of confirming your build and pay by bank transfer or card. Nothing is charged before you approve it.',
};
const EXTRA = [
  {
    q: 'What is the difference between a coffee cart and a coffee bike?',
    a: 'A coffee cart is usually pushed or towed to its spot and needs a vehicle or trailer to move between locations. A coffee bike, sometimes called a coffee trike or bicycle coffee cart, carries the same commercial espresso bar on an electric cargo bike, so you ride it there: no tow vehicle, no truck parking and no gas to drive it. Either way, your local health department sets the permit rules.',
  },
  {
    q: 'Can a mobile coffee cart run without an electrical hookup?',
    a: 'Yes. The Fracino espresso machine runs on propane outdoors and on a standard outlet indoors, and the batteries, 2,000 W inverter and 200 W solar roof power the rest of the bike.',
  },
];
const ORDER = [
  'How much does a mobile coffee cart cost?',
  'What is the difference between a coffee cart and a coffee bike?',
  'Do I need a permit for a mobile coffee cart?',
  'Do you deliver anywhere in the US?',
  'How soon can I open?',
  'Can a mobile coffee cart run without an electrical hookup?',
  'Is this a franchise?',
  'What about winter and rain?',
];
export const FAQ = (() => {
  const base = faqs('us').map((f) => {
    const q = RENAME[f.q] ?? f.q;
    return { q, a: REWRITE[q] ? REWRITE[q](f.a) : f.a };
  });
  const all = [...EXTRA, ...base];
  const rank = (q) => { const i = ORDER.indexOf(q); return i === -1 ? ORDER.length : i; };
  return all.sort((x, y) => rank(x.q) - rank(y.q));
})();

/** Everything Google reads about the page, in one graph (the organization and website share ids with WordPress). */
export function schema() {
  const org = 'https://coffeebike.ca/#organization';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${URL}#webpage`, url: URL, name: TITLE, description: DESCRIPTION, inLanguage: 'en-US',
        isPartOf: { '@id': 'https://coffeebike.ca/#website' }, about: { '@id': `${URL}#product` }, breadcrumb: { '@id': `${URL}#breadcrumb` },
        primaryImageOfPage: { '@id': `${URL}#primaryimage` },
      },
      { '@type': 'ImageObject', '@id': `${URL}#primaryimage`, url: PHOTOS.hero.src, width: PHOTOS.hero.w, height: PHOTOS.hero.h, caption: PHOTOS.hero.alt },
      {
        '@type': 'BreadcrumbList', '@id': `${URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://coffeebike.ca/' },
          { '@type': 'ListItem', position: 2, name: 'Buy a Coffee Bike', item: 'https://coffeebike.ca/buy-a-mobile-coffee-bike' },
          { '@type': 'ListItem', position: 3, name: 'Mobile Coffee Cart (USA)', item: URL },
        ],
      },
      {
        '@type': 'Product', '@id': `${URL}#product`, name: 'Coffee Bike Vol. 2 mobile coffee cart',
        description: 'An electric mobile coffee cart: a commercial Fracino dual-fuel espresso bar with sinks, water tanks, a fridge and batteries on an electric cargo bike, custom-branded for the owner.',
        brand: { '@type': 'Brand', name: 'Coffee Bike World' }, category: 'Mobile coffee cart',
        image: [PHOTOS.customerSide.src, PHOTOS.baristaSide.src, PHOTOS.closed.src, PHOTOS.hero.src],
        offers: {
          '@type': 'Offer', url: URL, price: String(PRICE_USD), priceCurrency: 'USD', availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition', eligibleRegion: { '@type': 'Country', name: 'US' }, seller: { '@id': org },
        },
      },
      {
        '@type': 'Organization', '@id': org, name: 'Coffee Bike World', url: 'https://coffeebike.ca/',
        logo: 'https://coffeebike.ca/wp-content/uploads/2025/04/cofee_bike_logo_rwhite_transparent.png', email: 'coffeebike@vladvik.com',
        address: { '@type': 'PostalAddress', streetAddress: '1356 Frances St', addressLocality: 'Vancouver', addressRegion: 'BC', postalCode: 'V5L 1Y9', addressCountry: 'CA' },
        sameAs: ['https://www.facebook.com/coffeebikevancouver/', 'https://www.instagram.com/coffeebike.world/', 'https://www.youtube.com/channel/UCqS5R3QxJi36mCDdzqfxf1A', 'https://www.tiktok.com/@coffeebikeworld'],
      },
      { '@type': 'WebSite', '@id': 'https://coffeebike.ca/#website', url: 'https://coffeebike.ca/', name: 'Coffee Bike World', publisher: { '@id': org } },
      {
        '@type': 'VideoObject', '@id': `${URL}#video`, name: 'This Entire Coffee Shop Fits on a Bike | Coffee Bike V2 Full Walkthrough',
        description: 'A complete walkthrough of the Coffee Bike Vol. 2: the commercial espresso system and plumbing, refrigeration, storage, branding and how it rides.',
        thumbnailUrl: `https://i.ytimg.com/vi/${WALKTHROUGH_ID}/maxresdefault.jpg`, uploadDate: '2026-09-24T17:20:05-07:00', duration: 'PT6M32S',
        contentUrl: `https://www.youtube.com/watch?v=${WALKTHROUGH_ID}`, embedUrl: `https://www.youtube.com/embed/${WALKTHROUGH_ID}`, publisher: { '@id': org },
      },
      {
        '@type': 'FAQPage', '@id': `${URL}#faq`,
        mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };
}

/** Next.js metadata: absolute title, description, canonical, robots and social cards. */
export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: LIVE
    ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } }
    : { index: false, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: 'Coffee Bike World', locale: 'en_US', type: 'website', images: [SHARE_IMAGE] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [SHARE_IMAGE.url] },
};
