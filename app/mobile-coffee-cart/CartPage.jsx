'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Calendar, Check, ChevronDown, ChevronRight, CreditCard, FileText, Mail, MapPin, ShieldCheck, Snowflake, Sun, Users } from 'lucide-react';
import LiteYouTube from '../../components/LiteYouTube';
import {
  ADDRESS, BASE_PATH, CALL_URL, COMPARE_COLS, EMAIL, FEATURES, INCLUDED, LOGO, MARKETS, PHOTOS, PRICING, SPEC_SHEET, SPECS, TRUST,
  WALKTHROUGH_ID, compareRows, steps, whatsappLink,
} from '../start/content';
import { HeroQuestion, QuoteFlow, QuoteModal, QuoteProvider, RED, useQuote } from '../start/quote';
import { BALANCE, DISPLAY, DayAndWhere, Heading, Numbers, PriceButton, Section, WhatsAppIcon, deviceCountry, track } from '../start/StartPage';
import { FAQ, H1, US_OWNERS } from './seo';

const MARKET = 'us';
const INTENT = 'seo_mobile_coffee_cart';
const CONFIGURATOR = `${BASE_PATH}#configurator-section`;

/**
 * "Mobile coffee cart for sale" for US buyers: the same approved facts, photos, owner reviews, quote form and
 * calculator as the US ads page, arranged to answer what people search (what a mobile coffee cart is, how it compares,
 * what it costs, permits, delivery) and linked into the rest of coffeebike.ca.
 */
export default function CartPage() {
  return (
    <QuoteProvider market={MARKET} intent={INTENT}>
      <Page />
      <QuoteModal />
    </QuoteProvider>
  );
}

function Page() {
  const M = MARKETS[MARKET];
  const P = PRICING[MARKET];
  const q = useQuote();
  const rows = useMemo(() => compareRows(MARKET), []);
  const [vs, setVs] = useState('cart');
  const [allRows, setAllRows] = useState(false);
  const [allFaq, setAllFaq] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [canadian, setCanadian] = useState(false);
  const quoteRef = useRef(null);
  const quoteInView = useRef(false);

  // a visitor in Canada: one tap to Canadian dollars on the sales page
  useEffect(() => {
    if (deviceCountry() === 'ca') {
      setCanadian(true);
      track('market_mismatch', { page: MARKET, device: 'ca', intent: INTENT });
    }
  }, []);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    let seen = false;
    const io = new IntersectionObserver((xs) => {
      const v = xs.some((x) => x.isIntersecting);
      quoteInView.current = v;
      if (v && !seen) {
        seen = true;
        track('quote_form_view', { intent: INTENT, market: MARKET });
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 700 && !quoteInView.current);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const vsCol = COMPARE_COLS.find((c) => c.key === vs) ?? COMPARE_COLS[3];
  const cta = (where) => () => track('cta_click', { where, intent: INTENT, market: MARKET });

  return (
    <div className="bg-white text-zinc-900 antialiased">
      <header className="sticky top-0 z-40 bg-black text-white" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="https://coffeebike.ca/" aria-label="Coffee Bike World home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Coffee Bike World" width={75} height={48} className="h-8 w-auto" />
          </a>
          <nav aria-label="On this page" className="flex items-center gap-1 sm:gap-5">
            <a href={whatsappLink(MARKET)} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { where: 'header', intent: INTENT, market: MARKET })} className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-sm font-semibold text-zinc-300 hover:text-white" aria-label="Message us on WhatsApp">
              <WhatsAppIcon className="h-5 w-5" />
              <span className="text-[13px] md:text-sm">WhatsApp</span>
            </a>
            <a href="#price" className="hidden text-sm font-semibold text-zinc-300 hover:text-white sm:inline">Pricing</a>
            <a href="#owners" className="hidden text-sm font-semibold text-zinc-300 hover:text-white sm:inline">Owners</a>
            <a href="#faq" className="hidden text-sm font-semibold text-zinc-300 hover:text-white md:inline">FAQ</a>
            <button type="button" onClick={() => q.openQuote('header')} className="rounded-md px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-white hover:brightness-110" style={{ backgroundColor: RED }}>
              Get my price
            </button>
          </nav>
        </div>
      </header>

      {canadian ? (
        <a href={`${BASE_PATH}?currency=CAD#configurator-section`} onClick={() => track('market_switch', { from: MARKET, to: 'ca', intent: INTENT })} className="block bg-zinc-900 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-zinc-800">
          In Canada? See prices in Canadian dollars →
        </a>
      ) : null}

      <main id="top">
        {/* hero */}
        <section className="bg-[#F4F4F3]">
          <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-4 px-4 pb-8 pt-5 sm:px-6 md:grid-cols-[1fr_1fr] md:pb-16 md:pt-10">
            <div className="md:col-start-1 md:row-start-1">
              <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-zinc-500">
                <ol className="flex flex-wrap items-center gap-1">
                  <li><a href="https://coffeebike.ca/" className="hover:text-zinc-900 hover:underline">Home</a></li>
                  <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
                  <li><a href={BASE_PATH} className="hover:text-zinc-900 hover:underline">Buy a Coffee Bike</a></li>
                  <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
                  <li aria-current="page" className="font-semibold text-zinc-700">Mobile coffee cart (USA)</li>
                </ol>
              </nav>
              <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>The Coffee Bike · Delivered across the US</p>
              <h1 className="mt-2 text-[2.15rem] font-extrabold leading-[1.02] tracking-tight text-zinc-950 md:text-[3.6rem]" style={{ ...DISPLAY, ...BALANCE }}>{H1}</h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-700">
                The Coffee Bike is a mobile coffee cart you can ride: a commercial espresso bar on an electric cargo bike, branded with your name and delivered to your door anywhere in the US. No lease, no franchise fees. You own it outright.
              </p>
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
              <ul className="mt-4 grid gap-1.5 text-[15px] text-zinc-800">
                {['Espresso, sinks, hot water and a fridge on board', 'Goes where trucks can’t, where your permits allow, and indoors in winter', 'Yours outright: no franchise fees, no royalties'].map((x) => (
                  <li key={x} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 flex-none" style={{ color: RED }} aria-hidden />{x}</li>
                ))}
              </ul>
            </div>
            <div className="md:col-start-1 md:row-start-3">
              <HeroQuestion />
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                <a href={CONFIGURATOR} onClick={cta('hero_configurator')} className="inline-flex items-center gap-2 py-1 text-[15px] font-bold text-zinc-800 underline underline-offset-4">
                  Build and price it yourself in the configurator
                </a>
                <a href={CALL_URL} target="_blank" rel="noopener" onClick={cta('hero_call')} className="inline-flex items-center gap-2 py-1 text-[15px] font-bold text-zinc-800 underline underline-offset-4">
                  <Calendar className="h-4 w-4" aria-hidden /> Book a 15-minute call
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

        {/* what a mobile coffee cart is */}
        <Section id="what">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            <div>
              <Heading eyebrow="The basics" title="What is a mobile coffee cart?" />
              <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-zinc-700">
                <p>A mobile coffee cart is a self-contained coffee bar on wheels: an espresso machine and grinder, water tanks and sinks, refrigeration and power, built so you can serve specialty coffee at markets, events and offices without a storefront.</p>
                <p>In the US you will find push carts, towed carts and trailers, coffee trucks and vans, and coffee bikes, also called coffee trikes or bicycle coffee carts. The Coffee Bike is the kind you ride: the whole espresso bar is built onto an electric cargo bike, so you ride to your spot, open the canopy and start serving in minutes, with no tow vehicle, no truck parking and no gas to drive it.</p>
              </div>
            </div>
            <div className="rounded-2xl bg-[#F4F4F3] p-6 sm:p-7">
              <h3 className="text-lg font-extrabold text-zinc-950">What to look for in any espresso cart</h3>
              <ul className="mt-4 grid gap-3 text-[15px] leading-relaxed text-zinc-700">
                {[
                  ['A commercial espresso machine', 'that keeps up with a line; the Coffee Bike serves about 60–100 drinks an hour.'],
                  ['Sinks and water your health department accepts', 'fresh and waste tanks, hot and cold water, food-safe surfaces.'],
                  ['Power for a full day', 'propane or a standard outlet for the machine, batteries for the rest.'],
                  ['A way to move it', 'push, tow, drive or ride, and a place to store it overnight.'],
                  ['Branding that sells', 'your name and colours on the body, canopy and sign.'],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-3"><Check className="mt-1 h-4 w-4 flex-none" style={{ color: RED }} aria-hidden /><span><strong className="text-zinc-950">{t}:</strong> {d}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* comparison */}
        <Section id="compare" tone="soft">
          <Heading eyebrow="Before you buy" title="Coffee cart, coffee bike, trailer or truck?" sub="What it takes to start and run each way of selling coffee on the move in the US." />
          <div className="mt-8 md:hidden">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Compare the Coffee Bike with">
              {COMPARE_COLS.filter((c) => c.key !== 'bike').map((c) => (
                <button key={c.key} role="tab" aria-selected={vs === c.key} onClick={() => { setVs(c.key); track('compare_switch', { to: c.key, intent: INTENT, market: MARKET }); }} className={`rounded-full border px-3.5 py-2 text-sm font-semibold ${vs === c.key ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-700'}`}>
                  {c.label}
                </button>
              ))}
            </div>
            <div className="mt-4 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
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
              <button type="button" onClick={() => { setAllRows(true); track('compare_more', { intent: INTENT, market: MARKET }); }} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-zinc-800 underline underline-offset-4">
                Show all {rows.length} differences <ChevronDown className="h-4 w-4" aria-hidden />
              </button>
            ) : null}
          </div>
          <div className="mt-10 hidden overflow-x-auto rounded-xl border border-zinc-200 bg-white md:block">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <caption className="sr-only">Coffee Bike compared with a coffee truck or van, a coffee trailer, a coffee cart and a café storefront</caption>
              <thead>
                <tr className="bg-zinc-50">
                  <th className="w-44 p-4" scope="col"><span className="sr-only">Compared</span></th>
                  {COMPARE_COLS.map((c) => (
                    <th key={c.key} scope="col" className={`p-4 text-sm font-bold ${c.key === 'bike' ? 'text-white' : c.key === 'cart' ? 'text-zinc-950' : 'text-zinc-600'}`} style={c.key === 'bike' ? { backgroundColor: RED } : undefined}>{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-t border-zinc-200 align-top">
                    <th scope="row" className="p-4 text-xs font-bold uppercase tracking-wider text-zinc-500">{r.label}</th>
                    {COMPARE_COLS.map((c) => (
                      <td key={c.key} className={`p-4 ${c.key === 'bike' ? 'bg-red-50 font-semibold text-zinc-950' : c.key === 'cart' ? 'bg-zinc-50 text-zinc-800' : 'text-zinc-600'}`}>{r[c.key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PriceButton where="compare" className="mt-8 w-full sm:w-auto">Get my price <ArrowRight className="h-5 w-5" /></PriceButton>
        </Section>

        {/* what you get */}
        <Section id="build">
          <Heading eyebrow="What you get" title="A commercial espresso cart that rides" sub="Every part of it comes from 8+ years of serving at busy events and festivals with our own bikes." />
          {/* the three studio sides in one row at one height, each photo at its own shape so nothing is cropped */}
          <div className="mt-8 flex gap-2 sm:gap-4">
            {[PHOTOS.customerSide, PHOTOS.baristaSide, PHOTOS.closed].map((p, i) => (
              <figure key={p.src} className="min-w-0 overflow-hidden rounded-xl bg-[#F4F4F3]" style={{ flex: `${p.w / p.h} 1 0%` }}>
                <div className="relative" style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1152px) 440px, 40vw" className="object-cover" />
                </div>
                <figcaption className="px-2 py-2 text-center text-xs font-semibold text-zinc-600 sm:text-sm">{['Customer side', 'Barista side', 'Closed to ride'][i]}</figcaption>
              </figure>
            ))}
          </div>
          <div className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <article key={f.title} className="w-[82%] max-w-[340px] flex-none snap-start overflow-hidden rounded-xl bg-[#F4F4F3] sm:w-auto sm:max-w-none">
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
          <dl className="mt-8 grid gap-x-8 gap-y-3 rounded-xl bg-[#F4F4F3] p-5 sm:grid-cols-2 sm:p-6">
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
          <a href={SPEC_SHEET} target="_blank" rel="noopener" onClick={() => track('spec_sheet', { where: 'build', intent: INTENT, market: MARKET })} className="mt-6 inline-flex items-center gap-2 py-2 font-semibold text-zinc-800 underline underline-offset-4">
            <FileText className="h-5 w-5" aria-hidden /> Specs and health inquiry package (PDF)
          </a>
        </Section>

        {/* price */}
        <Section id="price" tone="soft">
          <Heading eyebrow="Pricing" title="How much does a mobile coffee cart cost?" sub="The Coffee Bike in plain numbers, in US dollars." />
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
              <div className="mt-3 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
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
              <p className="mt-3 rounded-xl bg-white p-4 text-[15px] leading-relaxed text-zinc-700">
                <strong className="text-zinc-950">Working with a smaller budget?</strong> Ask about a simpler build you can upgrade later: pick “I need a simpler, lower-cost build” in the form.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-200 bg-white p-4">
                  <CreditCard className="h-5 w-5" style={{ color: RED }} aria-hidden />
                  <div className="mt-2 font-bold text-zinc-950">{P.payment.t}</div>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{P.payment.d}</p>
                </div>
                <a href={CONFIGURATOR} onClick={cta('price_configurator')} className="block rounded-xl border border-zinc-200 bg-white p-4 hover:border-zinc-400">
                  <ArrowRight className="h-5 w-5" style={{ color: RED }} aria-hidden />
                  <div className="mt-2 font-bold text-zinc-950">Build it yourself</div>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">Pick every option in the configurator and watch the price update as you go.</p>
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* quote form, in the page */}
        <section id="quote" ref={quoteRef} className="scroll-mt-14 bg-zinc-950 py-14 text-white md:py-20">
          <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(0,520px)]">
            <div className="lg:pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>Your price</p>
              <h2 className="mt-2 text-3xl font-extrabold leading-tight md:text-5xl" style={{ ...DISPLAY, ...BALANCE }}>Get your US price and build options</h2>
              <p className="mt-3 text-lg text-zinc-300">Four one-tap questions, then where to send your price. We reply within one business day with pricing for your build, in US dollars.</p>
              <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-zinc-300">
                {['A short call to plan your setup, branding and add-ons. No pressure.', 'Nothing is charged until you approve an invoice.', 'Opening for spring? Permits often take 60–90 days, so owners order in winter and apply while the bike is built.'].map((x) => (
                  <li key={x} className="flex gap-3"><Check className="mt-1 h-4 w-4 flex-none" style={{ color: RED }} aria-hidden />{x}</li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a href={CALL_URL} target="_blank" rel="noopener" onClick={cta('book_call')} className="block rounded-xl border border-zinc-700 p-4 hover:border-zinc-400">
                  <div className="flex items-center gap-2 font-bold"><Calendar className="h-4 w-4" aria-hidden /> Prefer to talk first?</div>
                  <div className="mt-1 text-sm text-zinc-400">Book a discovery call →</div>
                </a>
                <a href={whatsappLink(MARKET)} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { where: 'quote', intent: INTENT, market: MARKET })} className="block rounded-xl border border-zinc-700 p-4 hover:border-zinc-400">
                  <div className="flex items-center gap-2 font-bold"><WhatsAppIcon className="h-4 w-4" /> Message us on WhatsApp</div>
                  <div className="mt-1 text-sm text-zinc-400">Straight to our team →</div>
                </a>
              </div>
            </div>
            <div className="w-full rounded-2xl bg-white p-5 text-zinc-900 shadow-xl sm:p-7">
              <QuoteFlow where="inline" />
            </div>
          </div>
        </section>

        {/* owners */}
        <Section id="owners" tone="dark">
          <Heading dark eyebrow="Owners" title="Coffee Bike owners across the US and beyond" sub="Owners in Portland, Lithia, Lawndale and Tempe, and across Canada and Peru: first businesses, second careers and cafés adding a mobile bar. Several run two or three bikes." />
          {/* the reviews as the main sales page shows them: each owner's own photo, then their words */}
          <div className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6">
            {US_OWNERS.map((o) => (
              <figure key={o.name} className="flex w-[260px] flex-none snap-start flex-col overflow-hidden rounded-xl bg-zinc-900">
                <div className="relative aspect-[4/5] bg-zinc-800">
                  <Image src={o.img} alt={`${o.name}, ${o.biz}, ${o.place}`} fill sizes="260px" className="object-cover" />
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
          <Heading eyebrow="See it" title="Walk around the Coffee Bike in six minutes" sub="Every compartment, the espresso machine, the batteries and how it rides." />
          <div className="relative mt-8 aspect-video overflow-hidden rounded-xl bg-zinc-900">
            <LiteYouTube videoId={WALKTHROUGH_ID} title="Coffee Bike full walkthrough" trackingName="coffee_bike_walkthrough_us_page" caption="Full walkthrough · 6:32" />
          </div>
        </Section>

        <DayAndWhere />

        {/* permits */}
        <Section id="permits" tone="soft">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Heading eyebrow="Permits" title="Permits for a mobile coffee cart in the US" />
              <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-zinc-700">
                <p>Every city and county sets its own rules, so start with your local health department. Most review your setup (sinks, water, food-safe surfaces) and inspect it before you open, and many ask for a commissary or approved base.</p>
                <p>Permits often take 60–90 days, so owners apply while their bike is being built. Owners usually trade on private property, with a deal with a landlord, market or venue, or in public space where the city issues mobile vending permits.</p>
              </div>
            </div>
            <div className="grid content-start gap-3">
              <div className="rounded-xl bg-white p-5">
                <h3 className="font-bold text-zinc-950">For your health department</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-zinc-600">The Coffee Bike specification and health inquiry package describes the layout, water system, surfaces and equipment.</p>
                <a href={SPEC_SHEET} target="_blank" rel="noopener" onClick={() => track('spec_sheet', { where: 'permits', intent: INTENT, market: MARKET })} className="mt-2 inline-flex items-center gap-2 text-[15px] font-bold underline underline-offset-4" style={{ color: RED }}>
                  <FileText className="h-4 w-4" aria-hidden /> Download the package (PDF)
                </a>
              </div>
              <div className="rounded-xl bg-white p-5">
                <h3 className="font-bold text-zinc-950">Two sink layouts</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-zinc-600">The Classic has a 3-compartment sink with a pitcher rinser and knock box. The CMFO layout (Compact Mobile Food Operation) has a handwashing sink with a separate pitcher rinser and knock box, for health departments that ask for it.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* seasons */}
        <Section id="seasons">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <Heading eyebrow="All year" title="A mobile coffee business for all four seasons" sub="The most common question from the northern US. Here is how owners answer it." />
              <div className="mt-8 grid gap-4">
                {[
                  { icon: Sun, t: 'Spring to fall', d: 'Farmers markets, festivals, sports games, weddings and private events.' },
                  { icon: Snowflake, t: 'Winter, indoors', d: 'Office lobbies, hospitals, campuses, residential towers, grocery stores and gyms. Landlords need no build-out: the bike rolls in, plugs into a standard outlet and serves.' },
                ].map(({ icon: Icon, t, d }) => (
                  <div key={t} className="flex gap-4 rounded-xl bg-[#F4F4F3] p-5">
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
            {steps(MARKET).map((s, i) => (
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

        <Numbers intent={INTENT} market={MARKET} />

        {/* questions */}
        <Section id="faq">
          <Heading eyebrow="Questions" title="Mobile coffee cart FAQ" sub="What US buyers ask us before ordering." />
          <div className="mt-8 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
            {FAQ.map((f, i) => (
              <details key={f.q} className={`group p-5 ${!allFaq && i >= 8 ? 'hidden' : ''}`} onToggle={(e) => e.currentTarget.open && track('faq_open', { q: f.q.slice(0, 60), intent: INTENT, market: MARKET })}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-zinc-950">
                  <h3 className="text-lg font-bold">{f.q}</h3>
                  <ChevronDown className="h-5 w-5 flex-none text-zinc-500 transition group-open:rotate-180" aria-hidden />
                </summary>
                <p className="mt-3 max-w-3xl leading-relaxed text-zinc-700">{f.a}</p>
              </details>
            ))}
          </div>
          {!allFaq && FAQ.length > 8 ? (
            <button type="button" onClick={() => { setAllFaq(true); track('faq_more', { intent: INTENT, market: MARKET }); }} className="mt-4 inline-flex items-center gap-1 font-bold text-zinc-800 underline underline-offset-4">
              Show all {FAQ.length} questions <ChevronDown className="h-4 w-4" aria-hidden />
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
      </main>

      <footer className="bg-black pb-28 pt-6 text-sm text-zinc-400 md:pb-10">
        <div className="mx-auto grid max-w-6xl gap-6 border-t border-zinc-800 px-4 pt-6 sm:px-6 md:grid-cols-[1fr_auto]">
          <div className="space-y-2">
            <div className="font-bold text-zinc-200">Coffee Bike World</div>
            <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 flex-none" aria-hidden />{ADDRESS}</div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <a href={whatsappLink(MARKET)} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { where: 'footer', intent: INTENT, market: MARKET })} className="inline-flex items-center gap-2 hover:text-white"><WhatsAppIcon className="h-4 w-4" />WhatsApp</a>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4" aria-hidden />{EMAIL}</a>
            </div>
          </div>
          <nav aria-label="Coffee Bike World" className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
            <a href={BASE_PATH} className="hover:text-white">Buy a Coffee Bike</a>
            <a href="https://coffeebike.ca/coffee-bike-videos/" className="hover:text-white">Coffee Bike videos</a>
            <a href="https://coffeebike.ca/" className="hover:text-white">coffeebike.ca</a>
            <a href="https://coffeebike.ca/privacy-policy/" className="hover:text-white">Privacy policy</a>
            <span>© {new Date().getFullYear()}</span>
          </nav>
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
