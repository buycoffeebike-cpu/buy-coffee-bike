'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Check, ChevronDown, Coffee, CreditCard, Mail, MapPin, ShieldCheck, Users, ZoomIn } from 'lucide-react';
import LiteYouTube from '../../components/LiteYouTube';
import FinancingBanner, { FINANCING } from '../../components/FinancingBanner';
import {
  ADDRESS, ADS_TAG, BASE_PATH, DEPOSIT_URL, EMAIL, FEATURES, INCLUDED, INTENTS, LOGO, MARKETS, OWNERS, PHOTOS, PRICING,
  SPECS, TRUST, WALKTHROUGH_ID, faqs, steps, whatsappLink,
} from './content';
import { FinishBar, HeroQuestion, QuestionTiles, QuoteModal, QuoteProvider, RED, useQuote } from './quote';

const DISPLAY = { fontFamily: 'var(--font-display), Inter, system-ui, sans-serif' };
const BALANCE = { textWrap: 'balance' };
// the full-screen photo view arrives only when a photo is opened (7 Nov 2026 speed work)
const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });

const track = (name, params) => {
  try {
    window.gtag?.('event', name, params);
  } catch {}
};

/**
 * The visitor's country from the device's time zone (set by the phone's location), or null when it says neither.
 * Ads send each country to its own page; this catches the few who land on the other one.
 */
const CA_TZ = /^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Montreal|Moncton|Glace_Bay|Goose_Bay|Whitehorse|Dawson|Dawson_Creek|Fort_Nelson|Creston|Yellowknife|Inuvik|Iqaluit|Rankin_Inlet|Resolute|Cambridge_Bay|Swift_Current|Atikokan|Blanc-Sablon|Nipigon|Thunder_Bay|Rainy_River|Pangnirtung)$/;
const US_TZ = /^America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Adak|Boise|Detroit|Juneau|Sitka|Metlakatla|Yakutat|Nome|Menominee|Indiana\/.+|Kentucky\/.+|North_Dakota\/.+)$|^Pacific\/Honolulu$/;
function deviceCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return CA_TZ.test(tz) ? 'ca' : US_TZ.test(tz) ? 'us' : null;
  } catch {
    return null;
  }
}

/** WhatsApp glyph (brand mark, used only to label the WhatsApp link). */
function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.39 9.39 0 0 1-1.44-5.02c0-5.19 4.23-9.42 9.43-9.42 2.52 0 4.88.98 6.66 2.76a9.35 9.35 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.42 9.42zm8.02-17.44A11.26 11.26 0 0 0 12.05.74C5.8.74.72 5.82.72 12.07c0 2 .52 3.95 1.52 5.66L.62 23.26l5.66-1.48a11.3 11.3 0 0 0 5.77 1.47h.01c6.25 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.87-3.32-8.01z" />
    </svg>
  );
}

function Section({ id, tone = 'light', className = '', children }) {
  const bg = tone === 'dark' ? 'bg-zinc-950 text-white' : tone === 'soft' ? 'bg-[#F4F4F3] text-zinc-900' : 'bg-white text-zinc-900';
  return (
    <section id={id} className={`cv-auto ${bg} scroll-mt-16 py-14 md:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

function Heading({ eyebrow, title, sub, dark = false, center = false }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>{eyebrow}</p> : null}
      <h2 className={`mt-2 text-3xl font-extrabold leading-tight md:text-5xl ${dark ? 'text-white' : 'text-zinc-950'}`} style={{ ...DISPLAY, ...BALANCE }}>{title}</h2>
      {sub ? <p className={`mt-3 text-lg ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>{sub}</p> : null}
    </div>
  );
}

/** Every "get my price" button: opens the quote pop-up at the visitor's current step. */
function PriceButton({ where, children, className = '', variant = 'primary' }) {
  const q = useQuote();
  const look = variant === 'primary' ? 'text-white shadow-sm hover:brightness-110' : variant === 'light' ? 'bg-white text-zinc-950 hover:bg-zinc-100' : 'border border-zinc-300 bg-white text-zinc-900 hover:border-zinc-500';
  return (
    <button type="button" onClick={() => q.openQuote(where)} className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-4 text-base font-extrabold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300 ${look} ${className}`} style={variant === 'primary' ? { backgroundColor: RED } : undefined}>
      {children}
    </button>
  );
}

/**
 * A photo that opens full screen on a tap (11 Oct 2026: Clarity showed visitors tapping the bike photos two or three
 * times, expecting them to enlarge, and nothing happened). The same next/image, so nothing new is downloaded until the tap.
 */
function Photo({ photo, caption, onOpen, sizes, imgClassName = 'object-cover', style, className = '' }) {
  return (
    <button
      type="button"
      onClick={() => onOpen({ src: photo.src, alt: photo.alt, caption: caption ?? photo.alt })}
      className={`group relative block w-full cursor-zoom-in overflow-hidden text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300 ${className}`}
      style={style}
      aria-label={`View larger: ${caption ?? photo.alt}`}
    >
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className={imgClassName} />
      <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition group-hover:bg-black/75" aria-hidden>
        <ZoomIn className="h-4 w-4" strokeWidth={2.5} />
      </span>
    </button>
  );
}

export default function StartPage({ intent = 'bike', market = 'us' }) {
  return (
    <QuoteProvider market={market} intent={intent}>
      <Page intent={intent} market={market} />
      <QuoteModal />
    </QuoteProvider>
  );
}

function Page({ intent, market }) {
  const I = INTENTS[intent] ?? INTENTS.bike;
  const M = MARKETS[market];
  const P = PRICING[market];
  const q = useQuote();
  const [allFaq, setAllFaq] = useState(false);
  const [sticky, setSticky] = useState(false);
  // the photo open full screen, if any
  const [zoom, setZoom] = useState(null);
  const openPhoto = (p) => {
    setZoom(p);
    track('photo_open', { photo: p.caption, intent, market });
  };
  const closePhoto = useCallback(() => setZoom(null), []);
  // a visitor from the other country: one tap to their own prices, with the ad's tracking kept in the link
  const [elsewhere, setElsewhere] = useState(null);
  useEffect(() => {
    const c = deviceCountry();
    if (!c || c === market) return;
    setElsewhere({ market: c, href: `${BASE_PATH}${MARKETS[c].base}${intent === 'bike' ? '' : `/${intent}`}${window.location.search}` });
    track('market_mismatch', { page: market, device: c, intent });
  }, [market, intent]);
  const quoteRef = useRef(null);
  const quoteInView = useRef(false);
  // local owners first: Canadian provinces on the Canadian page, US states on the US page
  const owners = useMemo(() => {
    const ca = (p) => /, (BC|AB|SK|MB|ON|QC|NB|NS|PE|NL|YT|NT|NU)$/.test(p);
    const local = (p) => (market === 'ca' ? ca(p) : /, [A-Z]{2}$/.test(p) && !ca(p));
    return [...OWNERS].sort((a, b) => Number(!local(a.place)) - Number(!local(b.place)));
  }, [market]);
  const ownersSeen = useRef(false);
  // the owners row (10 Nov 2026): arrows that move exactly one owner, and a slow advance of its own while the row is on
  // screen. The first touch, wheel or arrow press hands the row to the visitor for good; reduced-motion visitors get no auto move
  const ownersRow = useRef(null);
  const ownersAuto = useRef(true);
  const ownersTouched = () => {
    ownersAuto.current = false;
    if (ownersSeen.current) return;
    ownersSeen.current = true;
    track('owners_more', { intent, market });
  };
  const ownersStep = (dir) => {
    const el = ownersRow.current;
    if (!el || !el.firstElementChild) return;
    const step = el.firstElementChild.getBoundingClientRect().width + 16;
    const max = el.scrollWidth - el.clientWidth;
    // whole frames only: the next (or previous) owner's left edge, wrapping at either end
    let left;
    if (dir > 0 && el.scrollLeft >= max - 4) left = 0;
    else if (dir < 0 && el.scrollLeft <= 4) left = max;
    else left = Math.min(max, Math.max(0, (Math.round(el.scrollLeft / step) + dir) * step));
    el.scrollTo({ left, behavior: 'smooth' });
  };
  useEffect(() => {
    const el = ownersRow.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer = null;
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const io = new IntersectionObserver(([e]) => {
      stop();
      if (e.isIntersecting && ownersAuto.current) {
        timer = setInterval(() => {
          if (!ownersAuto.current || document.hidden) return stop();
          ownersStep(1);
        }, 7000);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { stop(); io.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const featuresSeen = useRef(false);
  const onFeaturesScroll = () => {
    if (featuresSeen.current) return;
    featuresSeen.current = true;
    track('features_more', { intent, market });
  };
  const questions = useMemo(() => faqs(market), [market]);

  // Google Ads tag on this page (the conversion itself fires from the quote form)
  useEffect(() => {
    // live site only: previews and local builds must not send Google Ads hits (the layout sets __cbwLive)
    if (!window.__cbwLive) return;
    window.gtag?.('config', ADS_TAG, { allow_enhanced_conversions: true });
  }, []);

  // the page's own code is running: the layout may now load the tag libraries (7 Nov 2026 speed work), and a visit
  // the middleware sent here from the other country's page is recorded with the country Cloudflare reported, so a
  // wrong redirect (a US visitor on the Canadian prices) shows up in GA4 next to market_mismatch
  useEffect(() => {
    window.__cbwReady = 1;
    window.dispatchEvent(new Event('cbw:ready'));
    try {
      const geo = new URLSearchParams(window.location.search).get('cbwgeo');
      if (geo) track('geo_redirect', { to: market, country: geo, intent });
    } catch {}
  }, [market, intent]);

  // sitelinks land with ?s=: open the form, or scroll to prices or owners
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get('s');
    if (!s) return;
    if (s === 'quote') q.openQuote('sitelink');
    else {
      const id = s.startsWith('price') || s === 'training' ? 'price' : s === 'owners' ? 'owners' : null;
      if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 250);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // the inline form counts as seen once it is really on screen; the phone price bar steps aside there
  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    let seen = false;
    const io = new IntersectionObserver(
      (xs) => {
        const v = xs.some((x) => x.isIntersecting);
        quoteInView.current = v;
        if (v && !seen) {
          seen = true;
          // the full form's views, against its submissions (generate_lead with form_variant "full")
          track('quote_section_view', { intent, market });
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [intent, market]);

  // paid Google visitors see the price bar after 200 px (variant A, 1 Nov 2026: most phones never reached 700 px); everyone else after 700
  useEffect(() => {
    const at = q.variant === 'simple' ? 200 : 700;
    const onScroll = () => setSticky(window.scrollY > at && !quoteInView.current);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [q.variant]);

  return (
    <div className="bg-white text-zinc-900 antialiased">
      {/* header: no way off the page except the footer; WhatsApp one tap away */}
      <header className="sticky top-0 z-40 bg-black text-white" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Coffee Bike World, back to top" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image src={LOGO} alt="Coffee Bike" width={50} height={32} quality={90} loading="eager" className="h-8 w-auto" />
          </a>
          <div className="flex items-center gap-1 sm:gap-5">
            <a href={whatsappLink(market)} target="_blank" rel="noopener" onClick={(e) => { const g = document.documentElement.getAttribute('data-cbw-paid') === 'google'; if (g) e.currentTarget.href = whatsappLink(market, 'google'); track('whatsapp_click', { where: 'header', intent, market, source: g ? 'google_ad' : 'other' }); }} className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold text-zinc-300 hover:text-white" aria-label="Message us on WhatsApp">
              <WhatsAppIcon className="h-5 w-5" />
              <span className="text-[13px] md:text-sm">WhatsApp</span>
            </a>
            <a href="#price" className="hidden text-sm font-semibold text-zinc-300 hover:text-white sm:inline">Pricing</a>
            <a href="#owners" className="hidden text-sm font-semibold text-zinc-300 hover:text-white sm:inline">Owners</a>
            <button type="button" onClick={() => q.openQuote('header')} className="rounded-md px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-white hover:brightness-110" style={{ backgroundColor: RED }}>
              Get in touch
            </button>
          </div>
        </div>
      </header>

      {elsewhere ? (
        <a href={elsewhere.href} onClick={() => track('market_switch', { from: market, to: elsewhere.market, intent })} className="block bg-zinc-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-zinc-800">
          {elsewhere.market === 'ca' ? 'In Canada? See Canadian prices in CA$ →' : 'In the US? See US prices in US$ →'}
        </a>
      ) : null}

      {/* hero */}
      <section className="bg-[#F4F4F3]">
        <div className="hero-grid mx-auto grid max-w-6xl gap-x-12 gap-y-3 px-4 pb-8 pt-4 sm:px-6 sm:gap-y-4 sm:pt-6 md:grid-cols-[1fr_1fr] md:pb-16 md:pt-14">
          <div className="md:col-start-1 md:row-start-1">
            <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>{I.eyebrow}</p>
            <h1 className="mt-2 text-[2.15rem] font-extrabold leading-[1.02] tracking-tight text-zinc-950 md:text-[3.6rem]" style={{ ...DISPLAY, ...BALANCE }}>{I.h1}</h1>
            <p className="mt-4 hidden max-w-xl text-lg leading-relaxed text-zinc-700 md:block">{I.sub}</p>
          </div>
          {/* hero-photo / hero-form (globals.css): for paid Google visitors the one-screen form takes this column on wide screens and the photo moves under the text, as in the approved design (21 Oct 2026) */}
          <div className="hero-photo relative md:col-start-2 md:row-span-3 md:row-start-1 md:self-start">
            <div className="hero-photo-box relative aspect-[8/7] overflow-hidden rounded-2xl bg-zinc-200 md:aspect-square">
              <Image src={PHOTOS.hero.src} alt={PHOTOS.hero.alt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[50%_38%]" />
            </div>
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
              <span className="rounded-md bg-white/95 px-2.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-zinc-900 shadow-sm">As seen on Dragons’ Den</span>
            </div>
          </div>
          <div className="md:col-start-1 md:row-start-2">
            {/* phones (10 Nov 2026): the proof line sits under the tiles and the price block is two short lines, so the first question is on the first screen even with the browser bar showing */}
            <div className="hidden flex-wrap items-center gap-x-4 gap-y-1.5 text-[14px] font-semibold text-zinc-800 sm:flex">
              <span className="hidden items-center gap-1.5 sm:inline-flex"><Users className="h-4 w-4" style={{ color: RED }} aria-hidden /> 49 bikes sold to 36 owners</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4" style={{ color: RED }} aria-hidden /> Custom branding, no franchise or any other obligations</span>
              <span className="hidden items-center gap-1.5 sm:inline-flex"><ShieldCheck className="h-4 w-4" style={{ color: RED }} aria-hidden /> 1-year warranty</span>
            </div>
            {/* paid Google visitors (variant A, local build 1 Nov 2026): the price card first, what most owners spend, and the monthly with
                its term; everyone else the price line as before. Both in the HTML; globals.css shows one before the first paint and
                React keeps one once it knows, as HeroQuestion does */}
            {q.variant !== 'simple' ? (
              <div className="cbw-steps">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:mt-3">
                  <span className="text-[26px] font-extrabold leading-none text-zinc-950" style={DISPLAY}>{M.heroPrice}</span>
                  <span className="hidden text-[15px] text-zinc-600 sm:inline">{M.heroPriceNote}</span>
                  <span className="text-[14px] text-zinc-600 sm:hidden">before tax and shipping</span>
                </div>
                <p className="mt-1.5 hidden text-[15px] font-semibold text-zinc-800 sm:block">{M.financingNote}</p>
                <p className="mt-1 text-[13.5px] font-semibold leading-snug text-zinc-800 sm:hidden">{FINANCING[market].short}</p>
              </div>
            ) : null}
            {q.variant !== 'steps' ? (
              <div className="cbw-simple mt-3 overflow-hidden rounded-2xl bg-zinc-950 p-4 text-white sm:p-5" style={{ borderLeft: `5px solid ${RED}` }}>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-400">Fully equipped, before tax and shipping</p>
                <p className="mt-1 text-[34px] font-extrabold leading-none tabular-nums" style={DISPLAY}>{M.heroPrice}</p>
                {/* phones (7 Nov 2026): the card is the price and the monthly only, so the form's button is within reach; the two detail rows sit under the form */}
                <dl className="mt-3 hidden gap-1.5 border-t border-zinc-800 pt-3 text-[13.5px] sm:grid">
                  <div className="flex items-baseline justify-between gap-4"><dt className="text-zinc-300">{M.spend.k}</dt><dd className="whitespace-nowrap font-extrabold tabular-nums">{M.spend.v}</dd></div>
                  <div className="flex items-baseline justify-between gap-4"><dt className="text-zinc-300">Build 4–6 weeks, delivery 2–4 weeks</dt><dd className="whitespace-nowrap font-extrabold">to your door</dd></div>
                </dl>
                <p className="mt-2 text-[13.5px] font-bold text-red-200 sm:mt-3">{FINANCING[market].short}</p>
              </div>
            ) : null}
            <ul className="mt-4 hidden gap-1.5 text-[15px] text-zinc-800 md:grid">
              {['Sinks, hot water and a fridge on board', 'Goes where trucks can’t, where your permits allow, and indoors in winter', 'Yours outright: no franchise fees, no royalties'].map((x) => (
                <li key={x} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 flex-none" style={{ color: RED }} aria-hidden />{x}</li>
              ))}
            </ul>
          </div>
          <div className="hero-form md:col-start-1 md:row-start-3">
            <HeroQuestion />
            {q.variant !== 'steps' ? (
              <dl className="cbw-simple mt-3 grid gap-1 text-[13px] text-zinc-600 sm:hidden">
                <div className="flex items-baseline justify-between gap-4"><dt>{M.spend.k}</dt><dd className="whitespace-nowrap font-bold text-zinc-900 tabular-nums">{M.spend.v}</dd></div>
                <div className="flex items-baseline justify-between gap-4"><dt>Build 4–6 weeks, delivery 2–4 weeks</dt><dd className="whitespace-nowrap font-bold text-zinc-900">to your door</dd></div>
              </dl>
            ) : null}
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              <a href="#walkthrough" onClick={() => track('cta_click', { where: 'hero_video', intent, market })} className="inline-flex items-center gap-2 py-1 text-[15px] font-bold text-zinc-800 underline underline-offset-4">
                Watch the 6-minute walkthrough
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-200 bg-white">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 px-4 sm:px-6 md:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.k} className="py-4">
                <dt className="text-[11px] uppercase tracking-wider text-zinc-500">{t.k}</dt>
                <dd>
                  <span className="block text-xl font-extrabold leading-tight text-zinc-950" style={DISPLAY}>{t.v}</span>
                  <span className="block text-xs text-zinc-500">{t.d}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* owners */}
      <Section id="owners" tone="dark">
        <Heading dark eyebrow="Owners" title="49 bikes. 36 owners. Here are some of them." sub="First businesses, second careers, cafés and roasteries adding a mobile bar, and brands that take their coffee to the crowd. Several owners run two or three bikes." />
        {/* the reviews as the main sales page shows them: each owner's own photo, then their words */}
        <div className="relative">
        <div ref={ownersRow} className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden" onTouchStart={ownersTouched} onPointerDown={ownersTouched} onWheel={ownersTouched}>
          {owners.map((o) => (
            <figure key={o.name} className="flex w-[260px] flex-none snap-start flex-col overflow-hidden rounded-xl bg-zinc-900">
              <div className="relative aspect-[4/5] bg-zinc-800">
                <Image src={o.img} alt={`${o.name}, ${o.biz}`} fill sizes="260px" className="object-cover" />
              </div>
              <figcaption className="flex flex-1 flex-col p-4">
                <div className="font-bold text-white">{o.name}</div>
                <div className="text-sm text-zinc-400">{o.place} · {o.biz}</div>
                <div className="mt-0.5 text-xs text-zinc-500">Owner for {o.months >= 12 ? `${Math.floor(o.months / 12)}+ year${o.months >= 24 ? 's' : ''}` : `${o.months} months`}</div>
                <blockquote className="mt-3 text-[14px] italic leading-relaxed text-zinc-200">“{o.quote}”</blockquote>
              </figcaption>
            </figure>
          ))}
        </div>
          <button type="button" aria-label="Previous owner" onClick={() => { ownersTouched(); ownersStep(-1); }} className="absolute left-0 top-[172px] flex h-11 w-11 -translate-x-1 items-center justify-center rounded-full bg-white text-zinc-950 shadow-lg ring-1 ring-black/10 hover:bg-zinc-100 sm:-translate-x-3">
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
          <button type="button" aria-label="Next owner" onClick={() => { ownersTouched(); ownersStep(1); }} className="absolute right-0 top-[172px] flex h-11 w-11 translate-x-1 items-center justify-center rounded-full bg-white text-zinc-950 shadow-lg ring-1 ring-black/10 hover:bg-zinc-100 sm:translate-x-3">
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <p className="mt-3 text-sm text-zinc-400">{owners.length} owners. Use the arrows or swipe.</p>
      </Section>

      {/* walkthrough */}
      <Section id="walkthrough">
        <Heading eyebrow="See it" title="Walk around the bike in six minutes" sub="Every compartment, the espresso machine, the batteries and how it rides." />
        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl bg-zinc-900">
          <LiteYouTube videoId={WALKTHROUGH_ID} title="Coffee Bike full walkthrough" trackingName="coffee_bike_walkthrough_start_page" caption="Full walkthrough · 6:32" />
        </div>
      </Section>

      {/* what you get */}
      <Section id="build" tone="soft">
        <Heading eyebrow="What you get" title="A commercial espresso bar that rides" sub="Every part of it comes from 8+ years of serving at busy events and festivals with our own bikes." />
        {/* the three studio sides in one row at one height, each photo at its own shape so nothing is cropped */}
        <div className="mt-8 flex gap-2 sm:gap-4">
          {[PHOTOS.customerSide, PHOTOS.baristaSide, PHOTOS.closed].map((p, i) => (
            <figure key={p.src} className="min-w-0 overflow-hidden rounded-xl bg-white" style={{ flex: `${p.w / p.h} 1 0%` }}>
              <Photo photo={p} caption={['Customer side', 'Barista side', 'Closed to ride'][i]} onOpen={openPhoto} sizes="(min-width: 1152px) 440px, 40vw" style={{ aspectRatio: `${p.w} / ${p.h}` }} />
              <figcaption className="px-2 py-2 text-center text-xs font-semibold text-zinc-600 sm:text-sm">{['Customer side', 'Barista side', 'Closed to ride'][i]}</figcaption>
            </figure>
          ))}
        </div>
        {/* phones swipe through the whole 4:3 photos; larger screens get a grid */}
        <div className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3" onScroll={onFeaturesScroll}>
          {FEATURES.map((f) => (
            <article key={f.title} className="w-[82%] max-w-[340px] flex-none snap-start overflow-hidden rounded-xl bg-white sm:w-auto sm:max-w-none">
              <Photo photo={{ src: f.img, alt: f.title }} caption={f.title} onOpen={openPhoto} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 82vw" className="aspect-[4/3] bg-zinc-100" />
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-zinc-950 sm:text-lg">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600 sm:mt-1.5 sm:text-[15px]">{f.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-2 text-sm text-zinc-500 sm:hidden">Swipe to see all six →</p>
        <dl className="mt-8 grid gap-x-8 gap-y-3 rounded-xl bg-white p-5 sm:grid-cols-2 sm:p-6">
          {SPECS.map((s) => (
            <div key={s.k} className="grid grid-cols-[88px_1fr] gap-3 text-[15px]">
              <dt className="font-bold text-zinc-950">{s.k}</dt>
              <dd className="text-zinc-700">{s.v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8">
          <h3 className="text-lg font-extrabold text-zinc-950">Make it yours</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {['Your name, colours and wrap', 'Custom LED sign', 'Nitro cold brew tap', 'LED screen', 'Latte art printer', 'Lithium batteries', 'Iced Express for ice cream and cold drinks', 'Multi-grill for hot food'].map((x) => (
              <li key={x} className="rounded-full border border-zinc-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-zinc-800">{x}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* price */}
      <Section id="price">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <Heading eyebrow="Pricing" title="What it costs, in plain numbers" />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-2xl bg-zinc-950 p-6 text-white sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">Fully equipped</p>
            <p className="mt-1 text-5xl font-extrabold tabular-nums sm:text-6xl" style={DISPLAY}>{P.lead}</p>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-zinc-300">{P.leadNote}</p>
            <ul className="mt-6 grid gap-2.5 text-[15px] leading-snug text-zinc-100">
              {INCLUDED.map((x) => (
                <li key={x} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 flex-none" style={{ color: RED }} aria-hidden />{x}</li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] leading-snug text-zinc-300">Layout customizations are possible upon request.</p>
            <PriceButton where="price" className="mt-6 w-full">Get in touch <ArrowRight className="h-5 w-5" /></PriceButton>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-zinc-950">What changes the price</h3>
            <div className="mt-3 divide-y divide-zinc-200 rounded-xl border border-zinc-200">
              {P.changes.map((c) => (
                <div key={c.item} className="flex items-baseline justify-between gap-4 p-4">
                  <div>
                    <div className="font-bold text-zinc-950">{c.item}</div>
                    <div className="text-sm text-zinc-600">{c.note}</div>
                  </div>
                  {c.price ? <div className="flex-none font-extrabold tabular-nums text-zinc-950">{c.price}</div> : null}
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { icon: CreditCard, ...P.payment },
                { icon: Calendar, t: 'Reserve with $250', d: 'Holds a production spot and is applied in full to your order. Invoiced by Coffee Bike World, Vancouver, BC.', href: DEPOSIT_URL, cta: 'Reserve' },
              ].map(({ icon: Icon, t, d, href, cta }) => (
                <div key={t} className="rounded-xl border border-zinc-200 p-4">
                  <Icon className="h-5 w-5" style={{ color: RED }} aria-hidden />
                  <div className="mt-2 font-bold text-zinc-950">{t}</div>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{d}</p>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener" onClick={() => track('cta_click', { where: `price_${cta.toLowerCase()}`, intent, market })} className="mt-2 inline-block text-sm font-bold underline underline-offset-4" style={{ color: RED }}>{cta} →</a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
        <FinancingBanner market={market} className="mt-6" cta={<PriceButton where="financing">Get in touch <ArrowRight className="h-5 w-5" /></PriceButton>} />
      </Section>

      {/* the same first question as the hero; the pop-up carries the rest (10 Nov 2026: the full form here ran four phone screens) */}
      <section id="quote" ref={quoteRef} className="scroll-mt-14 bg-zinc-950 py-14 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(0,600px)]">
          <div className="lg:sticky lg:top-24 lg:pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>Get in touch</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight md:text-5xl" style={{ ...DISPLAY, ...BALANCE }}>See your custom build options and prices</h2>
            <p className="mt-3 text-lg text-zinc-300">Answer four quick questions, add your contact details, and we send you the builder with every option and its price, the full specs PDF and the financing link. Email, SMS and WhatsApp messages are sent right away, and our team member will be in touch within 1 business day or sooner.</p>
            <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-zinc-300">
              {['You choose your build in the builder; your price follows from the options you pick.', 'Nothing is charged until you approve an invoice.', 'Opening for spring? Current lead time is around 8 to 10 weeks, so account for that and an extra 1–2 months to establish your business once you receive your Coffee Bike. A start-up does not happen overnight, so plan accordingly and order sooner rather than later.'].map((x) => (
                <li key={x} className="flex gap-3"><Check className="mt-1 h-4 w-4 flex-none" style={{ color: RED }} aria-hidden />{x}</li>
              ))}
            </ul>
          </div>
          <div className="w-full rounded-2xl bg-white p-5 text-zinc-900 shadow-xl sm:p-7">
            <QuestionTiles where="section" intro={false} />
          </div>
        </div>
      </section>

      {/* founder */}
      <Section id="founder">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
          {/* the whole 3:2 photo: the founder and the open bike side by side */}
          <Photo photo={PHOTOS.founder} onOpen={openPhoto} sizes="(min-width: 1152px) 580px, (min-width: 768px) 52vw, 100vw" className="aspect-[3/2] rounded-xl bg-zinc-200" />
          <div>
            <Heading eyebrow="Built by people who run it" title="We’ve served 1.5 million cups from these bikes ourselves" />
            <div className="mt-5 max-w-xl space-y-4 text-lg leading-relaxed text-zinc-700">
              <p>We started Coffee Bike in Vancouver and have run our own bikes at events, markets and festivals for more than eight years. The bike you buy is the one we built for ourselves: a dual-fuel machine that keeps up with a line, brakes and suspension for real streets, and a layout a barista can work fast in.</p>
              <p>When you call, you talk to the team that runs them, not a dealer. Owners stay in touch through our community long after delivery.</p>
            </div>
            <p className="mt-5 font-bold text-zinc-950">Vlad Priadko <span className="font-normal text-zinc-500">· Founder, Coffee Bike World</span></p>
          </div>
        </div>
      </Section>

      {/* questions */}
      <Section id="faq">
        <Heading eyebrow="Questions" title="What buyers ask before ordering" />
        <div className="mt-8 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
          {(allFaq ? questions : questions.slice(0, 8)).map((f) => (
            <details key={f.q} className="group p-5" onToggle={(e) => e.currentTarget.open && track('faq_open', { q: f.q.slice(0, 60), intent, market })}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-zinc-950">
                {f.q}
                <ChevronDown className="h-5 w-5 flex-none text-zinc-500 transition group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 max-w-3xl leading-relaxed text-zinc-700">{f.a}</p>
            </details>
          ))}
        </div>
        {!allFaq && questions.length > 8 ? (
          <button type="button" onClick={() => { setAllFaq(true); track('faq_more', { intent, market }); }} className="mt-4 inline-flex items-center gap-1 font-bold text-zinc-800 underline underline-offset-4">
            Show all {questions.length} questions <ChevronDown className="h-4 w-4" aria-hidden />
          </button>
        ) : null}
      </Section>

      {/* last call */}
      <section className="bg-black py-14 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold md:text-4xl" style={{ ...DISPLAY, ...BALANCE }}>See your custom build options and prices</h2>
            <p className="mt-2 text-zinc-400">{M.heroPrice} {M.heroPriceNote}. {M.financingNote}</p>
          </div>
          <PriceButton where="footer" className="w-full md:w-auto">Get in touch <ArrowRight className="h-5 w-5" /></PriceButton>
        </div>
      </section>

      <footer className="bg-black pb-28 pt-6 text-sm text-zinc-400 md:pb-10">
        <div className="mx-auto grid max-w-6xl gap-6 border-t border-zinc-800 px-4 pt-6 sm:px-6 md:grid-cols-[1fr_auto]">
          <div className="space-y-2">
            <div className="font-bold text-zinc-200">Coffee Bike World</div>
            <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 flex-none" aria-hidden />{ADDRESS}</div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4" aria-hidden />{EMAIL}</a>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
            <a href="https://coffeebike.ca" className="hover:text-white">coffeebike.ca</a>
            <a href="https://coffeebike.ca/privacy-policy/" className="hover:text-white">Privacy policy</a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

      {/* phones: price bar that follows the visitor; while the finish bar is up (details typed, request not sent) it steps aside */}
      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur transition-transform md:hidden ${sticky && !q.open && !(q.typing && (q.status === 'idle' || q.status === 'error')) ? 'translate-y-0' : 'translate-y-full'}`} style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="leading-tight">
            <div className="text-xs text-zinc-500">{M.sticky.k}</div>
            <div className="font-extrabold text-zinc-950">{M.sticky.v}{q.variant === 'simple' ? <span className="font-semibold text-zinc-600"> · {M.stickyMonthly}</span> : null}</div>
          </div>
          <button type="button" onClick={() => q.openQuote('sticky')} className="flex-1 rounded-xl px-4 py-3 text-center font-extrabold text-white" style={{ backgroundColor: RED }}>
            {q.status === 'done' ? 'Request sent ✓' : q.variant !== 'simple' && q.step > 0 ? `Continue · step ${q.step + 1} of 5` : 'Get in touch'}
          </button>
        </div>
      </div>
      <FinishBar />
      {zoom ? <Lightbox photo={zoom} onClose={closePhoto} /> : null}
    </div>
  );
}
