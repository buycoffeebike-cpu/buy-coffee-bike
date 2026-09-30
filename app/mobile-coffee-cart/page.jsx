import CoffeeBikePage from '../../components/BuyPage';
import { metadata as pageMetadata, schema } from './seo';

// The US version of the sales page, for "mobile coffee cart" / "coffee cart for sale": the same page, configurator and
// reviews, with US words, US-first owners, no financing and its own FAQ (components/buyVariants.js). Title, canonical,
// robots, social cards and structured data: seo.js. The FAQ's structured data comes from the page itself.
export const metadata = pageMetadata;

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema()).replace(/</g, '\\u003c') }} />
      <CoffeeBikePage variantKey="us" />
    </>
  );
}
