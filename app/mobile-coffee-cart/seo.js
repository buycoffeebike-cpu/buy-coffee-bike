/**
 * The US version of the sales page (founder approved 29–30 Sept 2026): "mobile coffee cart" and "coffee cart for sale"
 * for US buyers. It is meant to rank, so it has its own title, description, canonical, social cards and structured data,
 * and it is paired with the sales page by hreflang (en-US here, x-default there) so Google shows each to the right
 * people instead of treating them as duplicates. LIVE switches it from a hidden review copy (noindex, out of the sitemap,
 * no hreflang) to a public page.
 */
export const LIVE = false;

export const URL = 'https://coffeebike.ca/buy-a-mobile-coffee-bike/mobile-coffee-cart';
export const SALES_PAGE = 'https://coffeebike.ca/buy-a-mobile-coffee-bike';
export const TITLE = 'Mobile Coffee Cart for Sale in the USA | Coffee Bike World';
export const DESCRIPTION = 'Electric mobile coffee cart with a commercial espresso bar, sinks and a fridge. Custom-branded, no franchise fees, about US$15,850, delivered across the US.';
export const SHARE_IMAGE = { url: 'https://coffeebike.ca/wp-content/uploads/2026/09/mobile-coffee-cart-usa-share.jpg', width: 1200, height: 630, alt: 'Coffee Bike mobile coffee cart for sale, delivered across the USA' };
export const PRICE_USD = 15850;
const HERO = { src: 'https://coffeebike.ca/wp-content/uploads/2025/05/Mobile-Espresso-Bar-scaled.jpeg', w: 1707, h: 2560, alt: 'Coffee Bike mobile espresso bar and electric mobile coffee shop' };
const PHOTOS = [
  'https://coffeebike.ca/wp-content/uploads/2025/05/Coffee-Bike-Customer-Side-scaled.jpg',
  'https://coffeebike.ca/wp-content/uploads/2025/05/Coffee-Bike-Barista-Side-scaled.jpg',
  'https://coffeebike.ca/wp-content/uploads/2025/05/Coffee-Bike-Closed-2-scaled.jpg',
  HERO.src,
];
const VIDEO_ID = 'uVGy63fO6uk';

/** hreflang pair: the US page for US searchers, the sales page for everyone else. Only once both are public. */
export const HREFLANG = LIVE ? { 'en-US': URL, 'x-default': SALES_PAGE } : undefined;

/** The page's structured data in one graph (the organization and website share their ids with WordPress). */
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
      { '@type': 'ImageObject', '@id': `${URL}#primaryimage`, url: HERO.src, width: HERO.w, height: HERO.h, caption: HERO.alt },
      {
        '@type': 'BreadcrumbList', '@id': `${URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://coffeebike.ca/' },
          { '@type': 'ListItem', position: 2, name: 'Buy a Coffee Bike', item: SALES_PAGE },
          { '@type': 'ListItem', position: 3, name: 'Mobile Coffee Cart (USA)', item: URL },
        ],
      },
      {
        '@type': 'Product', '@id': `${URL}#product`, name: 'Coffee Bike Vol. 2 mobile coffee cart',
        description: 'An electric mobile coffee cart: a commercial Fracino dual-fuel espresso bar with sinks, water tanks, a fridge and batteries on an electric cargo bike, custom-branded for the owner.',
        brand: { '@type': 'Brand', name: 'Coffee Bike World' }, category: 'Mobile coffee cart', image: PHOTOS,
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
        thumbnailUrl: `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`, uploadDate: '2026-09-24T17:20:05-07:00', duration: 'PT6M32S',
        contentUrl: `https://www.youtube.com/watch?v=${VIDEO_ID}`, embedUrl: `https://www.youtube.com/embed/${VIDEO_ID}`, publisher: { '@id': org },
      },
    ],
  };
}

/** Next.js metadata: absolute title, description, canonical (+ hreflang when live), robots and social cards. */
export const metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: HREFLANG ? { canonical: URL, languages: HREFLANG } : { canonical: URL },
  robots: LIVE
    ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } }
    : { index: false, follow: true },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: 'Coffee Bike World', locale: 'en_US', type: 'website', images: [SHARE_IMAGE] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: [SHARE_IMAGE.url] },
};
