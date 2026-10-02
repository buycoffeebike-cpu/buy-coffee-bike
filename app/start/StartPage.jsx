'use client';

import Image from 'next/image';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ArrowRight, BatteryCharging, Calendar, Check, ChevronDown, Clock, Coffee, CreditCard, Droplets, FileText, Info, Mail, MapPin, ShieldCheck, Snowflake, Sun, Users } from 'lucide-react';
import LiteYouTube from '../../components/LiteYouTube';
import {
  ADDRESS, ADS_TAG, BASE_PATH, CALL_URL, COMPARE_COLS, DEPOSIT_URL, EMAIL, FEATURES, INCLUDED, INTENTS, LOGO, MARKETS, OWNERS, PHOTOS, PRICING,
  SPEC_SHEET, SPECS, TRUST, WALKTHROUGH_ID, compareRows, faqs, steps, whatsappLink,
} from './content';
import { HeroQuestion, QuoteFullForm, QuoteModal, QuoteProvider, RED, useQuote } from './quote';

const DISPLAY = { fontFamily: '"Roboto Condensed", Inter, system-ui, sans-serif' };
const BALANCE = { textWrap: 'balance' };

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
    <section id={id} className={`${bg} scroll-mt-16 py-14 md:py-20 ${className}`}>
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
  const [vs, setVs] = useState(I.compare);
  // phones get the three rows that matter most (cost, running costs, moving it); the rest on request
  const [allRows, setAllRows] = useState(false);
  const [allFaq, setAllFaq] = useState(false);
  const [sticky, setSticky] = useState(false);
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
  const rows = useMemo(() => compareRows(market), [market]);
  // local owners first: Canadian provinces on the Canadian page, US states on the US page
  const owners = useMemo(() => {
    const ca = (p) => /, (BC|AB|SK|MB|ON|QC|NB|NS|PE|NL|YT|NT|NU)$/.test(p);
    const local = (p) => (market === 'ca' ? ca(p) : /, [A-Z]{2}$/.test(p) && !ca(p));
    return [...OWNERS].sort((a, b) => Number(!local(a.place)) - Number(!local(b.place)));
  }, [market]);
  const ownersSeen = useRef(false);
  const onOwnersScroll = () => {
    if (ownersSeen.current) return;
    ownersSeen.current = true;
    track('owners_more', { intent, market });
  };
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
          track('full_form_view', { intent, market });
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [intent, market]);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 700 && !quoteInView.current);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const vsCol = COMPARE_COLS.find((c) => c.key === vs) ?? COMPARE_COLS[1];
  const compareTitle = { truck: 'a coffee truck', trailer: 'a coffee trailer', cart: 'a coffee cart', cafe: 'a storefront café' }[I.compare] ?? 'a coffee truck';
  return (
    <div className="bg-white text-zinc-900 antialiased">
      {/* header: no way off the page except the footer; WhatsApp one tap away */}
      <header className="sticky top-0 z-40 bg-black text-white" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Coffee Bike World, back to top" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Coffee Bike" className="h-8 w-auto" />
          </a>
          <div className="flex items-center gap-1 sm:gap-5">
            <a href={whatsappLink(market)} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { where: 'header', intent, market })} className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold text-zinc-300 hover:text-white" aria-label="Message us on WhatsApp">
              <WhatsAppIcon className="h-5 w-5" />
              <span className="text-[13px] md:text-sm">WhatsApp</span>
            </a>
            <a href="#price" className="hidden text-sm font-semibold text-zinc-300 hover:text-white sm:inline">Pricing</a>
            <a href="#owners" className="hidden text-sm font-semibold text-zinc-300 hover:text-white sm:inline">Owners</a>
            <button type="button" onClick={() => q.openQuote('header')} className="rounded-md px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-white hover:brightness-110" style={{ backgroundColor: RED }}>
              Get my price
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
        <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-4 px-4 pb-8 pt-6 sm:px-6 md:grid-cols-[1fr_1fr] md:pb-16 md:pt-14">
          <div className="md:col-start-1 md:row-start-1">
            <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>{I.eyebrow}</p>
            <h1 className="mt-2 text-[2.15rem] font-extrabold leading-[1.02] tracking-tight text-zinc-950 md:text-[3.6rem]" style={{ ...DISPLAY, ...BALANCE }}>{I.h1}</h1>
            <p className="mt-4 hidden max-w-xl text-lg leading-relaxed text-zinc-700 md:block">{I.sub}</p>
          </div>
          <div className="relative md:col-start-2 md:row-span-3 md:row-start-1 md:self-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-200 md:aspect-[4/5]">
              <Image src={PHOTOS.hero.src} alt={PHOTOS.hero.alt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-[50%_42%] md:object-[50%_50%]" />
            </div>
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
              <span className="rounded-md bg-white/95 px-2.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-zinc-900 shadow-sm">As seen on Dragons’ Den</span>
            </div>
          </div>
          <div className="md:col-start-1 md:row-start-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[14px] font-semibold text-zinc-800">
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" style={{ color: RED }} aria-hidden /> 49 bikes sold to 36 owners</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" style={{ color: RED }} aria-hidden /> {M.ownersIn}</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" style={{ color: RED }} aria-hidden /> 1-year warranty</span>
            </div>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-[26px] font-extrabold leading-none text-zinc-950" style={DISPLAY}>{M.heroPrice}</span>
              <span className="text-[15px] text-zinc-600">{M.heroPriceNote}</span>
            </div>
            <ul className="mt-4 hidden gap-1.5 text-[15px] text-zinc-800 md:grid">
              {['Sinks, hot water and a fridge on board', 'Goes where trucks can’t, where your permits allow, and indoors in winter', 'Yours outright: no franchise fees, no royalties'].map((x) => (
                <li key={x} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 flex-none" style={{ color: RED }} aria-hidden />{x}</li>
              ))}
            </ul>
          </div>
          <div className="md:col-start-1 md:row-start-3">
            <HeroQuestion />
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              <a href={CALL_URL} target="_blank" rel="noopener" onClick={() => track('cta_click', { where: 'hero_call', intent, market })} className="inline-flex items-center gap-2 py-1 text-[15px] font-bold text-zinc-800 underline underline-offset-4">
                <Calendar className="h-4 w-4" aria-hidden /> Prefer to talk? Book a 15-minute call
              </a>
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

      {/* comparison */}
      <Section id="compare">
        <Heading eyebrow="Before you buy" title={intent === 'bike' || intent === 'compare' ? 'How a Coffee Bike compares' : `A Coffee Bike or ${compareTitle}?`} sub="What it takes to start and run each way of selling coffee on the move." />
        <div className="mt-8 md:hidden">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Compare the Coffee Bike with">
            {COMPARE_COLS.filter((c) => c.key !== 'bike').map((c) => (
              <button key={c.key} role="tab" aria-selected={vs === c.key} onClick={() => { setVs(c.key); track('compare_switch', { to: c.key, intent, market }); }} className={`rounded-full border px-3.5 py-2 text-sm font-semibold ${vs === c.key ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-700'}`}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="mt-4 divide-y divide-zinc-200 rounded-xl border border-zinc-200">
            {(allRows ? rows : rows.slice(0, 3)).map((r) => (
              <div key={r.label} className="grid gap-2 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">{r.label}</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-md bg-red-50 p-2.5"><div className="text-[11px] font-bold uppercase" style={{ color: RED }}>Coffee Bike</div><div className="mt-0.5 font-semibold text-zinc-900">{r.bike}</div></div>
                  <div className="rounded-md bg-zinc-50 p-2.5"><div className="text-[11px] font-bold uppercase text-zinc-500">{vsCol.label}</div><div className="mt-0.5 text-zinc-700">{r[vs]}</div></div>
                </div>
              </div>
            ))}
          </div>
          {!allRows ? (
            <button type="button" onClick={() => { setAllRows(true); track('compare_more', { intent, market }); }} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-zinc-800 underline underline-offset-4">
              Show all {rows.length} differences <ChevronDown className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
        </div>
        <div className="mt-10 hidden overflow-x-auto rounded-xl border border-zinc-200 md:block">
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-zinc-50">
                <th className="w-44 p-4" />
                {COMPARE_COLS.map((c) => (
                  <th key={c.key} className={`p-4 text-sm font-bold ${c.key === 'bike' ? 'text-white' : c.key === I.compare ? 'text-zinc-950' : 'text-zinc-600'}`} style={c.key === 'bike' ? { backgroundColor: RED } : undefined}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-zinc-200 align-top">
                  <th scope="row" className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500">{r.label}</th>
                  {COMPARE_COLS.map((c) => (
                    <td key={c.key} className={`p-4 ${c.key === 'bike' ? 'bg-red-50 font-semibold text-zinc-950' : c.key === I.compare ? 'bg-zinc-50 text-zinc-800' : 'text-zinc-600'}`}>{r[c.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PriceButton where="compare" className="mt-8 w-full sm:w-auto">Get my price <ArrowRight className="h-5 w-5" /></PriceButton>
      </Section>

      {/* what you get */}
      <Section id="build" tone="soft">
        <Heading eyebrow="What you get" title="A commercial espresso bar that rides" sub="Every part of it comes from 8+ years of serving at busy events and festivals with our own bikes." />
        {/* the three studio sides in one row at one height, each photo at its own shape so nothing is cropped */}
        <div className="mt-8 flex gap-2 sm:gap-4">
          {[PHOTOS.customerSide, PHOTOS.baristaSide, PHOTOS.closed].map((p, i) => (
            <figure key={p.src} className="min-w-0 overflow-hidden rounded-xl bg-white" style={{ flex: `${p.w / p.h} 1 0%` }}>
              <div className="relative" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1152px) 440px, 40vw" className="object-cover" />
              </div>
              <figcaption className="px-2 py-2 text-center text-xs font-semibold text-zinc-600 sm:text-sm">{['Customer side', 'Barista side', 'Closed to ride'][i]}</figcaption>
            </figure>
          ))}
        </div>
        {/* phones swipe through the whole 4:3 photos; larger screens get a grid */}
        <div className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3" onScroll={onFeaturesScroll}>
          {FEATURES.map((f) => (
            <article key={f.title} className="w-[82%] max-w-[340px] flex-none snap-start overflow-hidden rounded-xl bg-white sm:w-auto sm:max-w-none">
              <div className="relative aspect-[4/3] bg-zinc-100">
                <Image src={f.img} alt={f.title} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 82vw" className="object-cover" />
              </div>
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
        <a href={SPEC_SHEET} target="_blank" rel="noopener" onClick={() => track('spec_sheet', { where: 'build', intent, market })} className="mt-6 inline-flex items-center gap-2 py-2 font-semibold text-zinc-800 underline underline-offset-4">
          <FileText className="h-5 w-5" /> Specs and health inquiry package (PDF)
        </a>
      </Section>

      {/* price */}
      <Section id="price">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <Heading eyebrow="Pricing" title="What it costs, in plain numbers" />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-2xl bg-zinc-950 p-6 text-white sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">Typical build</p>
            <p className="mt-1 text-5xl font-extrabold tabular-nums sm:text-6xl" style={DISPLAY}>{P.lead}</p>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-zinc-300">{P.leadNote}</p>
            <ul className="mt-6 grid gap-2.5 text-[15px] leading-snug text-zinc-100">
              {INCLUDED.map((x) => (
                <li key={x} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 flex-none" style={{ color: RED }} aria-hidden />{x}</li>
              ))}
            </ul>
            <PriceButton where="price" className="mt-7 w-full">Get my exact price <ArrowRight className="h-5 w-5" /></PriceButton>
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
                { icon: Calendar, t: 'Reserve with US$250', d: 'Holds a production spot and is applied in full to your order. Invoiced by Coffee Bike World, Vancouver, BC.', href: DEPOSIT_URL, cta: 'Reserve' },
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
      </Section>

      {/* the full form, every question visible (the price buttons open the step-by-step pop-up) */}
      <section id="quote" ref={quoteRef} className="scroll-mt-14 bg-zinc-950 py-14 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(0,600px)]">
          <div className="lg:sticky lg:top-24 lg:pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>Your price</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight md:text-5xl" style={{ ...DISPLAY, ...BALANCE }}>Get your price and build options</h2>
            <p className="mt-3 text-lg text-zinc-300">Four quick questions and where to send your price, all in one form. We reply within one business day with pricing for your build.</p>
            <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-zinc-300">
              {['A short call to plan your setup, branding and add-ons. No pressure.', 'Nothing is charged until you approve an invoice.', 'Opening for spring? Permits often take 60–90 days, so owners order in winter and apply while the bike is built.'].map((x) => (
                <li key={x} className="flex gap-3"><Check className="mt-1 h-4 w-4 flex-none" style={{ color: RED }} aria-hidden />{x}</li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a href={CALL_URL} target="_blank" rel="noopener" onClick={() => track('cta_click', { where: 'book_call', intent, market })} className="block rounded-xl border border-zinc-700 p-4 hover:border-zinc-400">
                <div className="flex items-center gap-2 font-bold"><Calendar className="h-4 w-4" aria-hidden /> Prefer to talk first?</div>
                <div className="mt-1 text-sm text-zinc-400">Book a discovery call →</div>
              </a>
              <a href={whatsappLink(market)} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { where: 'quote', intent, market })} className="block rounded-xl border border-zinc-700 p-4 hover:border-zinc-400">
                <div className="flex items-center gap-2 font-bold"><WhatsAppIcon className="h-4 w-4" /> Message us on WhatsApp</div>
                <div className="mt-1 text-sm text-zinc-400">Straight to our team →</div>
              </a>
            </div>
          </div>
          <div className="w-full rounded-2xl bg-white p-5 text-zinc-900 shadow-xl sm:p-7">
            <QuoteFullForm />
          </div>
        </div>
      </section>

      {/* owners */}
      <Section id="owners" tone="dark">
        <Heading dark eyebrow="Owners" title="49 bikes. 36 owners. Here are some of them." sub="First businesses, second careers, cafés and roasteries adding a mobile bar, and brands that take their coffee to the crowd. Several owners run two or three bikes." />
        {/* the reviews as the main sales page shows them: each owner's own photo, then their words */}
        <div className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6" onScroll={onOwnersScroll}>
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
        <p className="mt-2 text-sm text-zinc-400">Swipe for more owners →</p>
      </Section>

      {/* walkthrough */}
      <Section id="walkthrough">
        <Heading eyebrow="See it" title="Walk around the bike in six minutes" sub="Every compartment, the espresso machine, the batteries and how it rides." />
        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl bg-zinc-900">
          <LiteYouTube videoId={WALKTHROUGH_ID} title="Coffee Bike full walkthrough" trackingName="coffee_bike_walkthrough_start_page" caption="Full walkthrough · 6:32" />
        </div>
      </Section>

      <DayAndWhere />

      {/* seasons */}
      <Section id="seasons" tone="soft">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <Heading eyebrow="All year" title="A business for all four seasons" sub={market === 'ca' ? 'The first question Canadians ask. Here is how owners answer it.' : 'The most common question from the northern US and Canada. Here is how owners answer it.'} />
            <div className="mt-8 grid gap-4">
              {[
                { icon: Sun, t: 'Spring to fall', d: 'Farmers markets, festivals, sports games, weddings and private events.' },
                { icon: Snowflake, t: 'Winter, indoors', d: 'Office lobbies, hospitals, campuses, residential towers, grocery stores and gyms. Landlords need no build-out: the bike rolls in, plugs into a standard outlet and serves.' },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="flex gap-4 rounded-xl bg-white p-5">
                  <Icon className="mt-0.5 h-6 w-6 flex-none" style={{ color: RED }} aria-hidden />
                  <div>
                    <h3 className="text-lg font-bold text-zinc-950">{t}</h3>
                    <p className="mt-1 leading-relaxed text-zinc-600">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-200">
            <Image src={PHOTOS.indoors.src} alt={PHOTOS.indoors.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[50%_60%]" />
          </div>
        </div>
      </Section>

      {/* how buying works */}
      <Section id="how" tone="soft">
        <Heading eyebrow="How buying works" title="From your first message to your first customer" />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps(market).map((s, i) => (
            <li key={s.t} className="rounded-xl bg-white p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold text-white" style={{ backgroundColor: RED }}>{i + 1}</div>
              <h3 className="mt-4 text-lg font-bold text-zinc-950">{s.t}</h3>
              <p className="mt-1.5 leading-relaxed text-zinc-600">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* founder */}
      <Section id="founder">
        <div className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
          {/* the whole 3:2 photo: the founder and the open bike side by side */}
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-zinc-200">
            <Image src={PHOTOS.founder.src} alt={PHOTOS.founder.alt} fill sizes="(min-width: 1152px) 580px, (min-width: 768px) 52vw, 100vw" className="object-cover" />
          </div>
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

      <Numbers intent={intent} market={market} />

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
            <h2 className="text-3xl font-extrabold md:text-4xl" style={{ ...DISPLAY, ...BALANCE }}>See what your Coffee Bike would cost</h2>
            <p className="mt-2 text-zinc-400">{M.heroPrice} {M.heroPriceNote}. We reply within one business day.</p>
          </div>
          <PriceButton where="footer" className="w-full md:w-auto">Get my price <ArrowRight className="h-5 w-5" /></PriceButton>
        </div>
      </section>

      <footer className="bg-black pb-28 pt-6 text-sm text-zinc-400 md:pb-10">
        <div className="mx-auto grid max-w-6xl gap-6 border-t border-zinc-800 px-4 pt-6 sm:px-6 md:grid-cols-[1fr_auto]">
          <div className="space-y-2">
            <div className="font-bold text-zinc-200">Coffee Bike World</div>
            <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 flex-none" aria-hidden />{ADDRESS}</div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a href={whatsappLink(market)} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { where: 'footer', intent, market })} className="inline-flex items-center gap-2 hover:text-white"><WhatsAppIcon className="h-4 w-4" />WhatsApp</a>
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

      {/* phones: price bar that follows the visitor */}
      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur transition-transform md:hidden ${sticky && !q.open ? 'translate-y-0' : 'translate-y-full'}`} style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="leading-tight">
            <div className="text-xs text-zinc-500">{M.sticky.k}</div>
            <div className="font-extrabold text-zinc-950">{M.sticky.v}</div>
          </div>
          <button type="button" onClick={() => q.openQuote('sticky')} className="flex-1 rounded-xl px-4 py-3 text-center font-extrabold text-white" style={{ backgroundColor: RED }}>
            {q.status === 'done' ? 'Request sent ✓' : q.step > 0 ? `Continue · step ${q.step + 1} of 5` : 'Get my price'}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Day-to-day running, what the bike can do and where owners sell (together 42% of the questions buyers send us).
 * General advice only: the page never promises venues, events or customers (a business-opportunity claim).
 */
function DayAndWhere() {
  const day = [
    { icon: Clock, t: 'Open in minutes', d: 'Ride in, open the canopy, start the machine: propane outdoors, a standard outlet indoors.' },
    { icon: Coffee, t: 'Keeps up with a line', d: 'About 60–100 drinks an hour, depending on your menu and barista.' },
    { icon: Droplets, t: 'Water on board', d: '50 L fresh, 60 L waste, hot and cold on demand.' },
    { icon: BatteryCharging, t: 'Power and storage', d: 'Batteries, a 2,000 W inverter and a solar roof; overnight in a garage or partner venue with an outlet.' },
  ];
  const where = ['Farmers markets', 'Weddings and private events', 'Office lobbies', 'Campuses and hospitals', 'Sports games', 'Brand launches', 'Partner venues'];
  return (
    <Section id="day">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Heading eyebrow="Day to day" title="A day with a Coffee Bike" />
          <dl className="mt-6 grid gap-4">
            {day.map(({ icon: Icon, t, d }) => (
              <div key={t} className="flex gap-3.5">
                <Icon className="mt-0.5 h-5 w-5 flex-none" style={{ color: RED }} aria-hidden />
                <div>
                  <dt className="font-bold text-zinc-950">{t}</dt>
                  <dd className="text-[15px] leading-relaxed text-zinc-600">{d}</dd>
                </div>
              </div>
            ))}
          </dl>
          <h3 className="mt-8 font-bold text-zinc-950">Where owners sell</h3>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {where.map((x) => (
              <li key={x} className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F4F3] px-3 py-1.5 text-sm font-semibold text-zinc-900"><MapPin className="h-3.5 w-3.5 flex-none" style={{ color: RED }} aria-hidden />{x}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-zinc-500">Your permits decide where you can vend, so every city is different.</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-200">
          <Image src={PHOTOS.boardwalk.src} alt={PHOTOS.boardwalk.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[50%_45%]" />
        </div>
      </div>
    </Section>
  );
}

/**
 * The main sales page's earnings calculator (the founder prefers it, 29 Sept 2026): the same sliders, starting values,
 * cost-of-goods rates and results, in the visitor's currency, with payback against the typical build for their market.
 * The sales page's owner-earnings box stays off this page (an income claim); the fine print says what the estimate
 * leaves out.
 */
function Numbers({ intent, market }) {
  const cur = market === 'ca' ? 'CA$' : 'US$';
  const build = market === 'ca' ? 25000 : 15850;
  const [mode, setMode] = useState('retail');
  const [cups, setCups] = useState(50);
  const [cupPrice, setCupPrice] = useState(5.5);
  const [days, setDays] = useState(18);
  const [events, setEvents] = useState(4);
  const [fee, setFee] = useState(900);
  const used = useRef(false);
  const touch = () => {
    if (!used.current) {
      used.current = true;
      track('calculator_use', { intent, market });
    }
  };
  const set = (fn) => (v) => {
    touch();
    fn(v);
  };
  const r = useMemo(() => {
    const retail = mode === 'retail';
    const revenue = retail ? cups * cupPrice * days : events * fee;
    const cogs = revenue * (retail ? 0.25 : 0.15);
    const net = revenue - cogs;
    // as on the sales page: 11 selling months a year for daily sales, 12 for catering
    return { revenue, cogs, net, annual: net * (retail ? 11 : 12), payback: build / net };
  }, [mode, cups, cupPrice, days, events, fee, build]);
  const money = (n) => `${cur}${Math.round(n).toLocaleString('en-US')}`;
  const cents = (n) => `${cur}${n.toFixed(2)}`;
  return (
    <Section id="numbers" tone="soft">
      <Heading eyebrow="Run the numbers" title="Coffee cart business calculator" sub="Move the sliders to match your market. The starting values are examples, not typical owner results." />
      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="grid grid-cols-2 border-b border-zinc-200" role="tablist" aria-label="Estimate from">
          {[
            { k: 'retail', icon: Coffee, t: 'Daily cup sales' },
            { k: 'catering', icon: Calendar, t: 'Catering & events' },
          ].map(({ k, icon: Icon, t }) => (
            <button key={k} type="button" role="tab" aria-selected={mode === k} onClick={() => { touch(); setMode(k); }} className={`flex items-center justify-center gap-2 px-2 py-4 text-[13px] font-extrabold uppercase tracking-wide transition sm:text-sm ${mode === k ? 'text-white' : 'bg-white text-zinc-600 hover:bg-zinc-50'}`} style={mode === k ? { backgroundColor: RED } : undefined}>
              <Icon className="hidden h-4 w-4 flex-none sm:block" aria-hidden /> {t}
            </button>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="grid flex-1 content-start gap-6 p-5 sm:p-8">
            {mode === 'retail' ? (
              <>
                <Slider label="Cups sold per day" value={cups} onChange={set(setCups)} min={20} max={250} format={(v) => `${v} cups`} hint="Example: 60–120 cups a day at a busy spot" />
                <Slider label="Average price per cup" value={cupPrice} onChange={set(setCupPrice)} min={3} max={10} step={0.5} format={cents} hint={`Example: ${cur}5–7 for specialty coffee`} />
                <Slider label="Working days per month" value={days} onChange={set(setDays)} min={8} max={28} format={(v) => `${v} days`} hint="Example: 18–22 days a month for a full-time schedule" />
              </>
            ) : (
              <>
                <Slider label="Catering events per month" value={events} onChange={set(setEvents)} min={1} max={20} format={(v) => `${v} event${v === 1 ? '' : 's'}`} hint="Example: 4–10 events a month" />
                <Slider label="Average fee per event (pre-paid)" value={fee} onChange={set(setFee)} min={300} max={3500} step={50} format={money} hint={`Example: ${cur}800–1,800 for a 2–3-hour event`} />
              </>
            )}
            <p className="flex gap-3 rounded-xl bg-red-50 p-4 text-xs leading-relaxed text-zinc-700">
              <Info className="h-4 w-4 flex-none" style={{ color: RED }} aria-hidden />
              <span>
                <strong className="text-zinc-950">Estimates only, based on the numbers you enter.</strong> Not typical owner results or a promise of income. The amounts leave out your pay, staff, permits, insurance, site or event fees, maintenance and taxes; cost of goods is assumed at {mode === 'retail' ? '25% for specialty coffee retail' : '15% for pre-paid catering'}.
              </span>
            </p>
          </div>
          <div className="bg-zinc-950 p-6 text-white sm:p-8 lg:w-[40%]">
            <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>Your estimate</p>
            <h3 className="mt-1 text-2xl font-extrabold" style={DISPLAY}>Based on your numbers</h3>
            <dl className="mt-5">
              <Result label="Monthly revenue" value={money(r.revenue)} />
              <Result label="Assumed cost of goods" value={`− ${money(r.cogs)}`} muted />
              <Result label="Left after cost of goods, per month" value={money(r.net)} big className="mt-2 border-t border-zinc-700 pt-4" />
              <Result label={mode === 'retail' ? 'Over a year (11 selling months)' : 'Over a year (12 months)'} value={money(r.annual)} />
            </dl>
            <div className="mt-6 rounded-xl border p-4" style={{ borderColor: RED, backgroundColor: 'rgba(227,30,36,0.15)' }}>
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: RED }}>Build cost comparison</p>
              <p className="mt-1 text-3xl font-extrabold tabular-nums" style={DISPLAY}>{r.payback < 1 ? '< 1' : Math.ceil(r.payback)} months</p>
              <p className="text-xs text-zinc-400">of this monthly amount to equal a typical {money(build)} build (your quote may differ), before your other costs</p>
            </div>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: RED }}>Check your numbers with the founder</p>
              <p className="mt-1 text-xs leading-snug text-zinc-300">Walk through equipment, pricing and your assumptions on a 15-minute call.</p>
              <a href={CALL_URL} target="_blank" rel="noopener" onClick={() => track('cta_click', { where: 'calculator_call', intent, market })} className="mt-3 block rounded-lg px-4 py-2.5 text-center text-xs font-extrabold uppercase tracking-wide text-white hover:brightness-110" style={{ backgroundColor: RED }}>Book a 15-minute call</a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Slider({ label, value, onChange, min, max, step = 1, format, hint }) {
  const id = useId();
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <label htmlFor={id} className="text-[15px] font-semibold text-zinc-800">{label}</label>
        <output htmlFor={id} className="text-lg font-extrabold tabular-nums" style={{ color: RED }}>{format(value)}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1 h-8 w-full cursor-pointer" style={{ accentColor: RED }} />
      <div className="flex justify-between text-[11px] text-zinc-400"><span>{format(min)}</span><span>{format(max)}</span></div>
      {hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}
    </div>
  );
}

function Result({ label, value, big = false, muted = false, className = '' }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 py-2 ${className}`}>
      <dt className={`text-sm ${muted ? 'text-zinc-500' : 'text-zinc-300'}`}>{label}</dt>
      <dd className={`font-extrabold tabular-nums ${big ? 'text-2xl' : 'text-base'} ${muted ? 'text-zinc-500' : 'text-white'}`}>{value}</dd>
    </div>
  );
}
