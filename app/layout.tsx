import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = { robots: { index: true, follow: true }, metadataBase: new URL('https://coffeebike.ca'), alternates: { canonical: 'https://coffeebike.ca/buy-a-mobile-coffee-bike' },
  title: 'Buy a Coffee Bike | Coffee Bike World',
  description:
    'Buy a custom-branded electric Coffee Bike and launch your own mobile coffee business. From $9,850 USD, no franchise fees, no royalties, shipped worldwide.',

  openGraph: {
    title: 'Buy a Coffee Bike | Coffee Bike World',
    description:
      'Buy a custom-branded electric Coffee Bike and launch your own mobile coffee business. From $9,850 USD, no franchise fees, no royalties, shipped worldwide.',
    url: 'https://coffeebike.ca/buy-a-mobile-coffee-bike',
    siteName: 'Coffee Bike World',
    images: [
      {
        url: 'https://coffeebike.ca/wp-content/uploads/2026/05/open-ready.jpg.jpg',
        width: 1200,
        height: 630,
        alt: 'Coffee Bike World',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Buy a Coffee Bike | Coffee Bike World',
    description:
      'Buy a custom-branded electric Coffee Bike and launch your own mobile coffee business. From $9,850 USD, no franchise fees, no royalties, shipped worldwide.',
    images: ['https://coffeebike.ca/wp-content/uploads/2026/05/open-ready.jpg.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}><script async src="https://www.googletagmanager.com/gtag/js?id=G-H992QTDBB0"></script><script dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-H992QTDBB0');" }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://coffeebike.ca/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Buy a Coffee Bike\",\"item\":\"https://coffeebike.ca/buy-a-mobile-coffee-bike\"}]}" }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"VideoObject\",\"@id\":\"https://coffeebike.ca/buy-a-mobile-coffee-bike/#video\",\"name\":\"Coffee Bike - Watch Our Story\",\"description\":\"See the Coffee Bike Vol. 2 in action: a custom-branded electric mobile coffee business built, branded, and shipped worldwide by Coffee Bike World.\",\"thumbnailUrl\":\"https://i.ytimg.com/vi/gtu8djcY-KY/maxresdefault.jpg\",\"uploadDate\":\"2026-05-16T17:21:34-07:00\",\"duration\":\"PT23S\",\"contentUrl\":\"https://www.youtube.com/watch?v=gtu8djcY-KY\",\"embedUrl\":\"https://www.youtube-nocookie.com/embed/gtu8djcY-KY\",\"publisher\":{\"@id\":\"https://coffeebike.ca/#organization\"}},{\"@type\":\"Organization\",\"@id\":\"https://coffeebike.ca/#organization\",\"name\":\"Coffee Bike World\",\"url\":\"https://coffeebike.ca/\",\"logo\":\"https://coffeebike.ca/wp-content/uploads/2025/04/cofee_bike_logo_rwhite_transparent.png\",\"email\":\"coffeebike@vladvik.com\",\"telephone\":\"+1-778-655-8631\",\"address\":{\"@type\":\"PostalAddress\",\"streetAddress\":\"1356 Frances St\",\"addressLocality\":\"Vancouver\",\"addressRegion\":\"BC\",\"postalCode\":\"V5L 1Y9\",\"addressCountry\":\"CA\"},\"sameAs\":[\"https://www.instagram.com/coffeebike.world\",\"https://www.facebook.com/coffeebikevancouver/\"]},{\"@type\":\"WebPage\",\"@id\":\"https://coffeebike.ca/buy-a-mobile-coffee-bike/#webpage\",\"url\":\"https://coffeebike.ca/buy-a-mobile-coffee-bike\",\"name\":\"Buy a Coffee Bike | Coffee Bike World\",\"description\":\"Buy a custom-branded electric Coffee Bike and launch your own mobile coffee business. From $9,850 USD, no franchise fees, no royalties, shipped worldwide.\",\"about\":{\"@id\":\"https://coffeebike.ca/buy-a-mobile-coffee-bike/#product\"}},{\"@type\":\"Product\",\"@id\":\"https://coffeebike.ca/buy-a-mobile-coffee-bike/#product\",\"name\":\"Coffee Bike\",\"brand\":{\"@type\":\"Brand\",\"name\":\"Coffee Bike World\"},\"description\":\"Custom branded electric mobile coffee bike for starting a mobile coffee business.\",\"image\":\"https://coffeebike.ca/wp-content/uploads/2026/05/open-ready.jpg.jpg\",\"offers\":{\"@type\":\"Offer\",\"url\":\"https://coffeebike.ca/buy-a-mobile-coffee-bike\",\"priceCurrency\":\"USD\",\"price\":\"9850\",\"availability\":\"https://schema.org/InStock\",\"itemCondition\":\"https://schema.org/NewCondition\"}},{\"@type\":\"FAQPage\",\"@id\":\"https://coffeebike.ca/buy-a-mobile-coffee-bike/#faq\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Is Coffee Bike a franchise?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"No. Coffee Bike World is not a franchise. There are no franchise fees, royalties, or required territory obligations.\"}},{\"@type\":\"Question\",\"name\":\"How much does a Coffee Bike cost?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Coffee Bike packages start at $9,850 USD, depending on configuration, equipment, branding, and shipping.\"}},{\"@type\":\"Question\",\"name\":\"Do you ship Coffee Bikes worldwide?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes. Coffee Bike World ships custom Coffee Bikes worldwide and supports buyers with the process.\"}},{\"@type\":\"Question\",\"name\":\"Do Coffee Bike owners pay royalties?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"No. Coffee Bike owners do not pay royalties or franchise fees to Coffee Bike World.\"}}]}]}" }} /><script dangerouslySetInnerHTML={{ __html: "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1829025697700338');fbq('track','PageView');" }} />{children}</body>
    </html>
  );
}
