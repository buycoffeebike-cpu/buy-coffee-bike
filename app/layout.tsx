import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BuyPageSchema from '../components/BuyPageSchema';
// the sales page and its US version point at each other (hreflang) once the US page is public
import { HREFLANG } from './mobile-coffee-cart/seo';

const inter = Inter({ subsets: ['latin'] });

export const metadata = { robots: { index: true, follow: true }, metadataBase: new URL('https://coffeebike.ca'), alternates: { canonical: 'https://coffeebike.ca/buy-a-mobile-coffee-bike', ...(HREFLANG ? { languages: HREFLANG } : {}) },
  title: 'Buy a Coffee Bike | Electric Coffee Cart for Sale, Worldwide',
  description:
    'Electric Coffee Bike for sale from $9,850 USD: a custom-branded coffee cart and espresso bar. No franchise fees. Ships to the USA, Canada and worldwide.',

  openGraph: {
    title: 'Buy a Coffee Bike | Electric Coffee Cart for Sale, Worldwide',
    description:
      'Electric Coffee Bike for sale from $9,850 USD: a custom-branded coffee cart and espresso bar. No franchise fees. Ships to the USA, Canada and worldwide.',
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
    title: 'Buy a Coffee Bike | Electric Coffee Cart for Sale, Worldwide',
    description:
      'Electric Coffee Bike for sale from $9,850 USD: a custom-branded coffee cart and espresso bar. No franchise fees. Ships to the USA, Canada and worldwide.',
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
      <body className={inter.className}>{/* a visit over plain http:// (a link pasted into Messenger; Cloudflare does not force https and tells Vercel nothing) goes to https before anything else loads: from an http page the quote form could not reach the OS (6 Oct 2026) */}<script dangerouslySetInnerHTML={{ __html: "if(location.protocol==='http:'&&/(^|\\.)coffeebike\\.ca$/.test(location.hostname))location.replace('https://coffeebike.ca'+location.pathname+location.search+location.hash);" }} /><link rel="preconnect" href="https://www.googletagmanager.com" /><script async src="https://www.googletagmanager.com/gtag/js?id=G-H992QTDBB0"></script><script dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.__cbwLive=/(^|\\.)coffeebike\\.ca$/.test(location.hostname);if(window.__cbwLive){gtag('js',new Date());gtag('config','G-H992QTDBB0');gtag('config','G-F7F3ELX4J0');gtag('config','AW-369959194',{allow_enhanced_conversions:true});}" }} /><BuyPageSchema /><script dangerouslySetInnerHTML={{ __html: "if(window.__cbwLive){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1829025697700338');fbq('track','PageView');}" }} /><script dangerouslySetInnerHTML={{ __html: `if(window.__cbwLive){(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wxc635zad7");}` }} /><script dangerouslySetInnerHTML={{ __html: "(function(){function fireGA(name,payload){try{window.gtag&&window.gtag('event',name,payload||{})}catch(e){}}function fireFB(name,payload){try{window.fbq&&window.fbq('track',name,payload||{})}catch(e){}}window.addEventListener('message',function(e){var ok=e.origin&&(e.origin.indexOf('link.coffeebike.ca')>-1||e.origin.indexOf('leadconnectorhq.com')>-1||e.origin.indexOf('msgsndr.com')>-1);if(!ok)return;var t=(e.data&&(e.data.type||e.data.event||e.data))||'';var s=(typeof t==='string')?t.toLowerCase():'';if(s.indexOf('form-submit')>-1||s.indexOf('form_submit')>-1||s.indexOf('submitted')>-1||s.indexOf('appointment')>-1||s.indexOf('booking')>-1){var source=(s.indexOf('appoint')>-1||s.indexOf('book')>-1)?'schedule_call':'inquiry_form';fireGA('qualify_lead',{lead_source:source,currency:'USD',value:9850});fireFB('Lead',{content_name:source,currency:'USD',value:9850})}});document.addEventListener('click',function(ev){var a=ev.target&&ev.target.closest&&ev.target.closest('a,button');if(!a)return;var html=(a.outerHTML||'').toLowerCase();var txt=(a.innerText||'').toLowerCase();if(txt.indexOf('deposit')>-1||txt.indexOf('pay $')>-1||html.indexOf('buy.stripe.com')>-1){fireGA('close_convert_lead',{intent:'stripe_deposit',currency:'USD',value:500});fireFB('InitiateCheckout',{content_name:'stripe_deposit',currency:'USD',value:500})}if(html.indexOf('ifinancecanada.com')>-1||(txt.indexOf('financ')>-1&&(a.tagName==='A'||txt.indexOf('apply')>-1))){fireGA('financing_click',{intent:'ifinance_apply'});try{window.fbq&&window.fbq('trackCustom','FinancingClick',{content_name:'ifinance_apply'})}catch(e){}}if(txt.indexOf('schedule a call')>-1){fireGA('schedule_call_click',{source:'page'});fireFB('Schedule',{})}if(a.tagName==='BUTTON'&&txt.indexOf('get in touch')>-1){fireGA('get_in_touch_click',{source:'page'})}if(txt==='usd'||txt==='cad'||txt==='euro'){fireGA('currency_changed',{to:txt.toUpperCase()})}var pkgMatch=null;if(txt.indexOf('classic')===0)pkgMatch='classic';else if(txt.indexOf('cmfo')===0)pkgMatch='cmfo';else if(txt.indexOf('iced express')===0)pkgMatch='iced_express';else if(txt.indexOf('custom inquiry')===0)pkgMatch='custom';if(pkgMatch&&txt.length<500){fireGA('base_package_selected',{package:pkgMatch});fireFB('AddToCart',{content_name:pkgMatch,currency:'USD',value:9850})}},true);document.addEventListener('click',function(ev){var pc=ev.target&&ev.target.closest&&ev.target.closest('.cursor-pointer');if(!pc)return;var pcTxt=(pc.innerText||'').toLowerCase().trim();var pcMatch=null;if(pcTxt.indexOf('classic')===0)pcMatch='classic';else if(pcTxt.indexOf('cmfo')===0)pcMatch='cmfo';else if(pcTxt.indexOf('iced express')===0)pcMatch='iced_express';else if(pcTxt.indexOf('custom inquiry')===0)pcMatch='custom';if(pcMatch&&pcTxt.length<500){fireGA('base_package_selected',{package:pcMatch});fireFB('AddToCart',{content_name:pcMatch,currency:'USD',value:9850})}},true)})();" }} />{children}</body>
    </html>
  );
}
