import { LIVE, URL as US_PAGE } from './mobile-coffee-cart/seo';

// Pages of this app that belong in Google's index (the /start ads pages stay out on purpose). The WordPress sitemap
// index links here, so Google finds these through coffeebike.ca/sitemap_index.xml.
export default function sitemap() {
  const now = new Date();
  return [
    { url: 'https://coffeebike.ca/buy-a-mobile-coffee-bike', lastModified: now },
    ...(LIVE ? [{ url: US_PAGE, lastModified: now }] : []),
  ];
}
