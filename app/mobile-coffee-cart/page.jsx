import CartPage from './CartPage';
import { metadata as pageMetadata, schema } from './seo';

// The US organic search page for "mobile coffee cart" / "coffee cart for sale" (see seo.js for title, canonical,
// robots, social cards and structured data).
export const metadata = pageMetadata;

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema()).replace(/</g, '\\u003c') }} />
      <CartPage />
    </>
  );
}
