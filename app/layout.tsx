import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import BuyPageSchema from '../components/BuyPageSchema';
// the sales page and its US version point at each other (hreflang) once the US page is public
import { HREFLANG } from './mobile-coffee-cart/seo';

const inter = Inter({ subsets: ['latin'] });
// The headline font, served from this site (14 Oct 2026). It used to come from Google Fonts through an @import in
// globals.css, which held the first paint for three round trips on a phone (our CSS, then Google's CSS, then the
// file). Same file Google serves (Roboto Condensed v31, latin, variable weight, so 700/800/900 look exactly as
// before); this Next version's built-in Google list only offers 300/400/700, hence the local copy.
const display = localFont({ src: './fonts/RobotoCondensed-latin-wght.woff2', weight: '100 900', style: 'normal', display: 'swap', variable: '--font-display' });

export const metadata = { robots: { index: true, follow: true }, metadataBase: new URL('https://coffeebike.ca'), alternates: { canonical: 'https://coffeebike.ca/buy-a-mobile-coffee-bike', ...(HREFLANG ? { languages: HREFLANG } : {}) },
  title: 'Buy a Coffee Bike | Electric Coffee Cart for Sale, Worldwide',
  description:
    'Electric Coffee Bike for sale, fully equipped from $15,850 USD: a custom-branded coffee cart and espresso bar. No franchise fees. Ships to the USA, Canada and worldwide.',

  openGraph: {
    title: 'Buy a Coffee Bike | Electric Coffee Cart for Sale, Worldwide',
    description:
      'Electric Coffee Bike for sale, fully equipped from $15,850 USD: a custom-branded coffee cart and espresso bar. No franchise fees. Ships to the USA, Canada and worldwide.',
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
      'Electric Coffee Bike for sale, fully equipped from $15,850 USD: a custom-branded coffee cart and espresso bar. No franchise fees. Ships to the USA, Canada and worldwide.',
    images: ['https://coffeebike.ca/wp-content/uploads/2026/05/open-ready.jpg.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={display.variable}>
      <body className={inter.className}>{/* a visit over plain http:// (a link pasted into Messenger; Cloudflare does not force https and tells Vercel nothing) goes to https before anything else loads: from an http page the quote form could not reach the OS (6 Oct 2026) */}<script dangerouslySetInnerHTML={{ __html: "if(location.protocol==='http:'&&/(^|\\.)coffeebike\\.ca$/.test(location.hostname))location.replace('https://coffeebike.ca'+location.pathname+location.search+location.hash);" }} />{/* Sections marked cv-auto (globals.css) skip layout while off screen, and their heights are estimates until first shown, so a jump would land in the wrong place (14 Oct 2026 test: #faq landed ~1,900 px off on a phone). Before any jump (a #link in the address bar on arrival, a click on a same-page #link, a hash change, any scrollIntoView: the ?s=price sitelinks, the quote form's scroll to a missing field) the whole page is laid out for the rest of the visit, so the jump lands exactly. */}<script dangerouslySetInnerHTML={{ __html: `(function(){var d=document.documentElement;function full(){d.classList.add('cv-off')}if(location.hash)full();addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href*="#"]');if(a&&a.hash&&a.pathname===location.pathname)full()},true);addEventListener('hashchange',full);var s=Element.prototype.scrollIntoView;if(s)Element.prototype.scrollIntoView=function(){full();return s.apply(this,arguments)}})();` }} />{/* Paid Google visitors get the one-screen quote form in the hero (app/start/quote.jsx simpleVariant, the same rules: a Google click id or utm_source=google with a paid medium in the address bar, or saved from an earlier visit within 90 days; ?form=simple / ?form=steps to look at either). Marked on <html> before the body is parsed, so globals.css shows them that form and everyone else the step tiles from the first paint, and nothing swaps in view (21 Oct 2026). */}<script dangerouslySetInnerHTML={{ __html: `(function(){try{var p=new URLSearchParams(location.search),f=p.get('form');function paid(s,m){return /^google$/i.test(s||'')&&/^(cpc|ppc|paid|paidsearch|paid_search|paid-search)$/i.test(m||'')}var any=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_placement','utm_site_source','gclid','gbraid','wbraid','fbclid','utm_id','fb_campaign_id','fb_adset_id','fb_ad_id'].some(function(k){return !!(p.get(k)||'').trim()});var g=f==='simple';if(!g&&f!=='steps'){if(any){g=!!(p.get('gclid')||p.get('gbraid')||p.get('wbraid')||paid(p.get('utm_source'),p.get('utm_medium')))}else{var s=JSON.parse(localStorage.getItem('cbw_attr')||'null');if(s&&s.at>Date.now()-7776e6){var c=s.click||{},u=s.utm||{};g=!!(c.gclid||c.gbraid||c.wbraid||paid(u.source,u.medium))}}}if(g)document.documentElement.setAttribute('data-cbw-form','simple')}catch(e){}})();` }} /><script dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.__cbwLive=/(^|\\.)coffeebike\\.ca$/.test(location.hostname);if(window.__cbwLive){gtag('js',new Date());gtag('config','G-H992QTDBB0');gtag('config','G-F7F3ELX4J0');gtag('config','AW-369959194',{allow_enhanced_conversions:true});}" }} /><BuyPageSchema /><script dangerouslySetInnerHTML={{ __html: "if(window.__cbwLive){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1829025697700338');fbq('track','PageView');}" }} /><script dangerouslySetInnerHTML={{ __html: `if(window.__cbwLive){(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};})(window, document, "clarity", "script", "wxc635zad7");}` }} />{/* The three tag libraries (Google ~535 KB with the Ads and second GA4 containers, Meta ~270 KB, Clarity) load once the page has loaded, or at the visitor's first touch, scroll or key, whichever comes first, 7 s at the latest (14 Oct 2026: on a phone they took ~2 s of main thread and the bandwidth the header photo needed). The gtag, fbq and clarity stubs above queue every call made before that, PageView and conversions included, and each library replays its queue when it arrives; the gclid/fbclid are still in the address bar then. */}<script dangerouslySetInnerHTML={{ __html: `if(window.__cbwLive){(function(){var done=0,ev=['pointerdown','keydown','touchstart','scroll'];function go(){if(done)return;done=1;ev.forEach(function(e){removeEventListener(e,go,true)});['https://www.googletagmanager.com/gtag/js?id=G-H992QTDBB0','https://connect.facebook.net/en_US/fbevents.js','https://www.clarity.ms/tag/wxc635zad7'].forEach(function(u){var s=document.createElement('script');s.async=true;s.src=u;document.head.appendChild(s)})}function idle(){(window.requestIdleCallback||function(f){setTimeout(f,200)})(go,{timeout:1500})}ev.forEach(function(e){addEventListener(e,go,{capture:true,passive:true})});if(document.readyState==='complete')idle();else addEventListener('load',idle);setTimeout(go,7000)})();}` }} /><script dangerouslySetInnerHTML={{ __html: "(function(){function fireGA(name,payload){try{window.gtag&&window.gtag('event',name,payload||{})}catch(e){}}function fireFB(name,payload){try{window.fbq&&window.fbq('track',name,payload||{})}catch(e){}}window.addEventListener('message',function(e){var ok=e.origin&&(e.origin.indexOf('link.coffeebike.ca')>-1||e.origin.indexOf('leadconnectorhq.com')>-1||e.origin.indexOf('msgsndr.com')>-1);if(!ok)return;var t=(e.data&&(e.data.type||e.data.event||e.data))||'';var s=(typeof t==='string')?t.toLowerCase():'';if(s.indexOf('form-submit')>-1||s.indexOf('form_submit')>-1||s.indexOf('submitted')>-1||s.indexOf('appointment')>-1||s.indexOf('booking')>-1){var source=(s.indexOf('appoint')>-1||s.indexOf('book')>-1)?'schedule_call':'inquiry_form';fireGA('qualify_lead',{lead_source:source,currency:'USD',value:9850});fireFB('Lead',{content_name:source,currency:'USD',value:9850})}});document.addEventListener('click',function(ev){var a=ev.target&&ev.target.closest&&ev.target.closest('a,button');if(!a)return;var html=(a.outerHTML||'').toLowerCase();var txt=(a.innerText||'').toLowerCase();if(txt.indexOf('deposit')>-1||txt.indexOf('pay $')>-1||html.indexOf('buy.stripe.com')>-1){fireGA('close_convert_lead',{intent:'stripe_deposit',currency:'USD',value:500});fireFB('InitiateCheckout',{content_name:'stripe_deposit',currency:'USD',value:500})}if(html.indexOf('ifinancecanada.com')>-1||(txt.indexOf('financ')>-1&&(a.tagName==='A'||txt.indexOf('apply')>-1))){fireGA('financing_click',{intent:'ifinance_apply'});try{window.fbq&&window.fbq('trackCustom','FinancingClick',{content_name:'ifinance_apply'})}catch(e){}}if(txt.indexOf('schedule a call')>-1){fireGA('schedule_call_click',{source:'page'});fireFB('Schedule',{})}if(a.tagName==='BUTTON'&&txt.indexOf('get in touch')>-1){fireGA('get_in_touch_click',{source:'page'})}if(txt==='usd'||txt==='cad'||txt==='euro'){fireGA('currency_changed',{to:txt.toUpperCase()})}var pkgMatch=null;if(txt.indexOf('classic')===0)pkgMatch='classic';else if(txt.indexOf('cmfo')===0)pkgMatch='cmfo';else if(txt.indexOf('iced express')===0)pkgMatch='iced_express';else if(txt.indexOf('custom inquiry')===0)pkgMatch='custom';if(pkgMatch&&txt.length<500){fireGA('base_package_selected',{package:pkgMatch});fireFB('AddToCart',{content_name:pkgMatch,currency:'USD',value:9850})}},true);document.addEventListener('click',function(ev){var pc=ev.target&&ev.target.closest&&ev.target.closest('.cursor-pointer');if(!pc)return;var pcTxt=(pc.innerText||'').toLowerCase().trim();var pcMatch=null;if(pcTxt.indexOf('classic')===0)pcMatch='classic';else if(pcTxt.indexOf('cmfo')===0)pcMatch='cmfo';else if(pcTxt.indexOf('iced express')===0)pcMatch='iced_express';else if(pcTxt.indexOf('custom inquiry')===0)pcMatch='custom';if(pcMatch&&pcTxt.length<500){fireGA('base_package_selected',{package:pcMatch});fireFB('AddToCart',{content_name:pcMatch,currency:'USD',value:9850})}},true)})();" }} />{children}</body>
    </html>
  );
}
