import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Buy a Coffee Bike | Coffee Bike World',
  description:
    'Configure and reserve your turnkey mobile coffee business with Coffee Bike World.',

  openGraph: {
    title: 'Buy a Coffee Bike | Coffee Bike World',
    description:
      'Configure and reserve your turnkey mobile coffee business with Coffee Bike World.',
    url: 'https://buy-coffee-bike.vercel.app/',
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
      'Configure and reserve your turnkey mobile coffee business with Coffee Bike World.',
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
      <body className={inter.className}><script dangerouslySetInnerHTML={{ __html: "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1829025697700338');fbq('track','PageView');" }} />{children}</body>
    </html>
  );
}
