'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Calendar, Check, ChevronDown, CreditCard, FileText, ShieldCheck, Snowflake, Sun, Building2 } from 'lucide-react';
import LiteYouTube from '../../components/LiteYouTube';
import {
  ADS_CONVERSION, ADS_TAG, CALL_URL, COMPARE_COLS, COMPARE_NOTE, COMPARE_ROWS, DEPOSIT_URL, FAQS, FEATURES, FINANCING_URL, FOUNDER,
  HERO, INTENTS, LOGO, OWNERS, PRICE_LINES, QUOTE_FORM_ID, QUOTE_FORM_URL, SPEC_SHEET, SPECS, STEPS, TRUST, WALKTHROUGH_ID,
} from './content';

const RED = '#E31E24';
const DISPLAY = { fontFamily: '"Roboto Condensed", Inter, system-ui, sans-serif' };
const BALANCE = { textWrap: 'balance' };

const track = (name, params) => {
  try {
    window.gtag?.('event', name, params);
  } catch {}
};

/** The contact the quote form just saved (GoHighLevel posts it to the page): email and phone for enhanced conversions. */
function contactOf(payload) {
  try {
    const o = typeof payload === 'string' ? JSON.parse(payload) : payload;
    if (!o || typeof o !== 'object') return null;
    const email = [o.email, o.contact?.email].find((v) => typeof v === 'string' && v.includes('@'));
    const phoneRaw = [o.phone, o.phone_number, o.contact?.phone].find((v) => typeof v === 'string');
    const digits = phoneRaw ? phoneRaw.replace(/[^\d+]/g, '') : '';
    const phone = digits.startsWith('+') ? digits : digits.length === 10 ? `+1${digits}` : digits.length === 11 && digits.startsWith('1') ? `+${digits}` : '';
    const out = {};
    if (email) out.email = email.trim().toLowerCase();
    if (phone) out.phone_number = phone;
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}

function Cta({ where, intent, children, className = '', variant = 'primary' }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3.5 text-base font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300';
  const look = variant === 'primary' ? 'text-white shadow-sm hover:brightness-110' : 'border border-zinc-300 bg-white text-zinc-900 hover:border-zinc-500';
  return (
    <a href="#quote" onClick={() => track('cta_click', { where, intent })} className={`${base} ${look} ${className}`} style={variant === 'primary' ? { backgroundColor: RED } : undefined}>
      {children}
    </a>
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

function Heading({ eyebrow, title, sub, dark = false }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>{eyebrow}</p> : null}
      <h2 className={`mt-2 text-3xl font-extrabold leading-tight md:text-5xl ${dark ? 'text-white' : 'text-zinc-950'}`} style={{ ...DISPLAY, ...BALANCE }}>{title}</h2>
      {sub ? <p className={`mt-3 text-lg ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>{sub}</p> : null}
    </div>
  );
}

export default function StartPage({ intent = 'bike' }) {
  const I = INTENTS[intent] ?? INTENTS.bike;
  const [vs, setVs] = useState(I.compare);
  const [allOwners, setAllOwners] = useState(false);
  const [formLoaded, setFormLoaded] = useState(false);
  const [sent, setSent] = useState(false);
  const [sticky, setSticky] = useState(false);
  const quoteRef = useRef(null);
  const quoteInView = useRef(false);

  // Google Ads tag on this page, and the conversion when the quote form is sent
  useEffect(() => {
    window.gtag?.('config', ADS_TAG, { allow_enhanced_conversions: true });
    let fired = false;
    const onMessage = (e) => {
      const d = e.data;
      if (!Array.isArray(d) || d[0] !== 'set-sticky-contacts') return;
      if (!/(^https:\/\/link\.coffeebike\.ca$)|leadconnectorhq\.com$|msgsndr\.com$/.test(e.origin)) return;
      if (fired) return;
      fired = true;
      const user = contactOf(d[2]);
      if (user) window.gtag?.('set', 'user_data', user);
      window.gtag?.('event', 'conversion', { send_to: ADS_CONVERSION, value: 100, currency: 'CAD' });
      track('generate_lead', { form: 'quote', intent });
      setSent(true);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [intent]);

  // the form is heavy: load it as the visitor approaches it, and count when it is really on screen
  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const near = new IntersectionObserver((xs) => xs.some((x) => x.isIntersecting) && (setFormLoaded(true), near.disconnect()), { rootMargin: '1400px 0px' });
    let seen = false;
    const onScreen = new IntersectionObserver(
      (xs) => {
        const v = xs.some((x) => x.isIntersecting);
        quoteInView.current = v;
        if (v && !seen) {
          seen = true;
          track('quote_form_view', { intent });
        }
      },
      { threshold: 0.2 },
    );
    near.observe(el);
    onScreen.observe(el);
    return () => {
      near.disconnect();
      onScreen.disconnect();
    };
  }, [intent]);

  useEffect(() => {
    if (!formLoaded || document.getElementById('ghl-form-embed-script')) return;
    const s = document.createElement('script');
    s.id = 'ghl-form-embed-script';
    s.src = 'https://link.coffeebike.ca/js/form_embed.js';
    s.async = true;
    document.body.appendChild(s);
  }, [formLoaded]);

  // phones: a price button follows the visitor once the hero is behind them, and steps aside at the form
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 640 && !quoteInView.current);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const vsCol = COMPARE_COLS.find((c) => c.key === vs) ?? COMPARE_COLS[1];
  const compareTitle = { truck: 'a coffee truck', trailer: 'a coffee trailer', cart: 'a coffee cart', cafe: 'a storefront café' }[I.compare] ?? 'a coffee truck';

  return (
    <div className="bg-white text-zinc-900 antialiased">
      {/* header */}
      <header className="sticky top-0 z-40 bg-black text-white" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="https://coffeebike.ca" aria-label="Coffee Bike World home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="Coffee Bike" className="h-8 w-auto" />
          </a>
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="#price" className="text-sm font-semibold text-zinc-300 hover:text-white">Pricing</a>
            <a href="#owners" className="hidden text-sm font-semibold text-zinc-300 hover:text-white sm:inline">Owners</a>
            <a href="#faq" className="text-sm font-semibold text-zinc-300 hover:text-white">FAQ</a>
            <a href="#quote" onClick={() => track('cta_click', { where: 'header', intent })} className="rounded-md px-4 py-2 text-sm font-bold uppercase tracking-wide text-white" style={{ backgroundColor: RED }}>
              Get my price
            </a>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="bg-[#F4F4F3]">
        {/* phones: headline, then the bike, then price and buttons; larger screens: words left, bike right */}
        <div className="mx-auto grid max-w-6xl gap-x-10 gap-y-5 px-4 py-8 sm:px-6 md:grid-cols-[1.05fr_1fr] md:grid-rows-[auto_auto] md:py-16">
          <div className="md:col-start-1 md:row-start-1 md:self-end">
            <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>{I.eyebrow}</p>
            <h1 className="mt-3 text-[2.3rem] font-extrabold leading-[1.02] tracking-tight text-zinc-950 md:text-6xl" style={{ ...DISPLAY, ...BALANCE }}>{I.h1}</h1>
          </div>
          <div className="relative md:col-start-2 md:row-span-2 md:row-start-1 md:self-center">
            <Image src={HERO} alt="A red Coffee Bike espresso bar with its canopy open" width={1200} height={900} priority sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full rounded-xl" />
            <div className="absolute bottom-3 left-3 rounded-md bg-white/95 px-3 py-2 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wide text-zinc-900">As seen on Dragons’ Den</span>
            </div>
          </div>
          <div className="md:col-start-1 md:row-start-2">
            <p className="max-w-xl text-[17px] leading-relaxed text-zinc-700 md:text-lg">{I.sub}</p>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-2xl font-extrabold text-zinc-950">From US$9,850</span>
              <span className="text-zinc-600">CA$13,495 · most owners invest US$10–20k all-in</span>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Cta where="hero" intent={intent}>Get my price &amp; build options <ArrowRight className="h-5 w-5" /></Cta>
              <a href="#walkthrough" onClick={() => track('cta_click', { where: 'hero_video', intent })} className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-5 py-3.5 text-base font-bold text-zinc-900 hover:border-zinc-500">
                Watch the 6-minute walkthrough
              </a>
            </div>
            <p className="mt-3 text-sm text-zinc-600">We reply within one business day. No obligation.</p>
          </div>
        </div>
        <div className="border-t border-zinc-200 bg-white">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 sm:px-6 md:grid-cols-4">
            {TRUST.map((t) => (
              <div key={t.k} className="py-4">
                <dt className="text-xs uppercase tracking-wider text-zinc-500">{t.k}</dt>
                <dd className="text-xl font-extrabold text-zinc-950" style={DISPLAY}>{t.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* comparison */}
      <Section id="compare">
        <Heading eyebrow="Before you buy" title={intent === 'bike' || intent === 'compare' ? 'How a Coffee Bike compares' : `A Coffee Bike or ${compareTitle}?`} sub="What it takes to start and run each way of selling coffee on the move." />
        {/* phones: the bike against one option at a time */}
        <div className="mt-8 md:hidden">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Compare the Coffee Bike with">
            {COMPARE_COLS.filter((c) => c.key !== 'bike').map((c) => (
              <button key={c.key} role="tab" aria-selected={vs === c.key} onClick={() => { setVs(c.key); track('compare_switch', { to: c.key, intent }); }} className={`rounded-full border px-3.5 py-2 text-sm font-semibold ${vs === c.key ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-700'}`}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="mt-4 divide-y divide-zinc-200 rounded-xl border border-zinc-200">
            {COMPARE_ROWS.map((r) => (
              <div key={r.label} className="grid gap-2 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">{r.label}</div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-md bg-red-50 p-2.5"><div className="text-[11px] font-bold uppercase" style={{ color: RED }}>Coffee Bike</div><div className="mt-0.5 font-semibold text-zinc-900">{r.bike}</div></div>
                  <div className="rounded-md bg-zinc-50 p-2.5"><div className="text-[11px] font-bold uppercase text-zinc-500">{vsCol.label}</div><div className="mt-0.5 text-zinc-700">{r[vs]}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* larger screens: every option side by side */}
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
              {COMPARE_ROWS.map((r) => (
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
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-zinc-500">{COMPARE_NOTE}</p>
      </Section>

      {/* what you get */}
      <Section id="build" tone="soft">
        <Heading eyebrow="What you get" title="A commercial espresso bar that rides" sub="Every part of it comes from 8+ years of serving at busy events and festivals with our own bikes." />
        {/* phones: a thumbnail beside the text; larger screens: photo cards */}
        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.title} className="grid grid-cols-[96px_1fr] overflow-hidden rounded-xl bg-white sm:block">
              <div className="relative h-full min-h-[96px] sm:aspect-[4/3] sm:h-auto">
                <Image src={f.img} alt={f.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 96px" className="object-cover" />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-zinc-950 sm:text-lg">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600 sm:mt-1.5 sm:text-[15px]">{f.text}</p>
              </div>
            </article>
          ))}
        </div>
        <dl className="mt-8 grid gap-x-8 gap-y-3 rounded-xl bg-white p-5 sm:grid-cols-2 sm:p-6">
          {SPECS.map((s) => (
            <div key={s.k} className="grid grid-cols-[88px_1fr] gap-3 text-[15px]">
              <dt className="font-bold text-zinc-950">{s.k}</dt>
              <dd className="text-zinc-700">{s.v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Cta where="build" intent={intent}>Get my price &amp; build options <ArrowRight className="h-5 w-5" /></Cta>
          <a href={SPEC_SHEET} target="_blank" rel="noopener" onClick={() => track('spec_sheet', { where: 'build', intent })} className="inline-flex items-center gap-2 px-2 py-3 font-semibold text-zinc-800 underline underline-offset-4">
            <FileText className="h-5 w-5" /> Specs and health inquiry package (PDF)
          </a>
        </div>
      </Section>

      {/* owners */}
      <Section id="owners" tone="dark">
        <Heading dark eyebrow="Owners" title="Running Coffee Bikes across Canada and the US" sub="36 bikes sold to 31 independent owners in Canada, the US and Peru: side businesses, second careers, cafés adding a mobile bar. In their own words." />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {(allOwners ? OWNERS : OWNERS.slice(0, 4)).map((o, i) => (
            <figure key={o.name} className={`${!allOwners && i === 3 ? 'hidden lg:flex' : 'flex'} flex-col rounded-xl bg-zinc-900 p-5`}>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-zinc-200">“{o.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="relative h-12 w-12 flex-none overflow-hidden rounded-full bg-zinc-800">
                  <Image src={o.img} alt={`${o.name}, ${o.biz}`} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-white">{o.name} · {o.place}</div>
                  <div className="text-sm text-zinc-400">{o.biz}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        {!allOwners ? (
          <button onClick={() => { setAllOwners(true); track('owners_more', { intent }); }} className="mt-6 inline-flex items-center gap-2 rounded-md border border-zinc-700 px-4 py-3 font-semibold text-white hover:border-zinc-400">
            Read more owner stories <ChevronDown className="h-4 w-4" />
          </button>
        ) : null}
      </Section>

      {/* price */}
      <Section id="price">
        <Heading eyebrow="Pricing" title="What it costs, in plain numbers" sub="Prices in US dollars unless marked. Shipping is quoted separately once we know your address." />
        <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200">
          {PRICE_LINES.map((p, i) => (
            <div key={p.item} className={`grid gap-1 p-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6 ${i ? 'border-t border-zinc-200' : 'bg-zinc-50'}`}>
              <div>
                <div className="font-bold text-zinc-950">{p.item}</div>
                <div className="text-sm text-zinc-600">{p.note}</div>
              </div>
              <div className="text-lg font-extrabold tabular-nums text-zinc-950 sm:text-right">
                {p.usd}
                {p.cad ? <span className="ml-2 text-sm font-semibold text-zinc-500">{p.cad}</span> : null}
              </div>
            </div>
          ))}
          <div className="grid gap-1 border-t-2 border-zinc-900 bg-zinc-950 p-4 text-white sm:grid-cols-[1fr_auto] sm:items-baseline">
            <div className="font-bold">A ready-to-serve espresso build</div>
            <div className="text-xl font-extrabold tabular-nums sm:text-right">about US$15,850 <span className="ml-2 text-sm font-semibold text-zinc-400">about CA$21,750</span></div>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CreditCard, t: 'Bank transfer or card', d: 'Invoice within one business day; 3.9% fee on cards.' },
            { icon: Check, t: 'Financing in Canada', d: 'Canadian residents can apply through iFinance.', href: FINANCING_URL, cta: 'Apply' },
            { icon: ShieldCheck, t: '1-year warranty', d: 'Manufacturing defects repaired or replaced; parts through the owners’ portal.' },
            { icon: Calendar, t: 'Reserve with US$250', d: 'Holds a production spot and is applied in full to your order.', href: DEPOSIT_URL, cta: 'Reserve' },
          ].map(({ icon: Icon, t, d, href, cta }) => (
            <div key={t} className="rounded-xl border border-zinc-200 p-4">
              <Icon className="h-5 w-5" style={{ color: RED }} aria-hidden />
              <div className="mt-2 font-bold text-zinc-950">{t}</div>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">{d}</p>
              {href ? (
                <a href={href} target="_blank" rel="noopener" onClick={() => track('cta_click', { where: `price_${cta.toLowerCase()}`, intent })} className="mt-2 inline-block text-sm font-bold underline underline-offset-4" style={{ color: RED }}>{cta} →</a>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      {/* quote form */}
      <section id="quote" ref={quoteRef} className="scroll-mt-14 bg-zinc-950 py-14 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>Your price</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight md:text-5xl" style={{ ...DISPLAY, ...BALANCE }}>Get your price and build options</h2>
            <p className="mt-3 text-lg text-zinc-300">Two minutes. We reply within one business day with pricing for your build and answers to your questions.</p>
            {sent ? (
              <div className="mt-6 rounded-lg bg-emerald-500/15 p-4 text-emerald-200">Thank you. Your request is in: we’ll be in touch within one business day.</div>
            ) : null}
            <div className="mt-6 overflow-hidden rounded-xl bg-white">
              {formLoaded ? (
                <iframe
                  src={QUOTE_FORM_URL}
                  style={{ width: '100%', height: '1500px', border: 'none', borderRadius: '0px' }}
                  scrolling="no"
                  id={`inline-${QUOTE_FORM_ID}`}
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Save My Build"
                  data-height="1500"
                  data-layout-iframe-id={`inline-${QUOTE_FORM_ID}`}
                  data-form-id={QUOTE_FORM_ID}
                  title="Get your Coffee Bike price"
                />
              ) : (
                <div className="flex h-[640px] items-center justify-center text-zinc-500">Loading the form…</div>
              )}
            </div>
          </div>
          <aside className="space-y-4 lg:pt-24">
            <div className="rounded-xl bg-zinc-900 p-5">
              <h3 className="font-bold">What happens next</h3>
              <ul className="mt-3 space-y-3 text-[15px] leading-relaxed text-zinc-300">
                {['A reply within one business day, by email or WhatsApp.', 'A short call to plan your setup, branding and add-ons. No pressure.', 'Nothing is charged until you approve an invoice.', 'Opening for spring? Permits often take 60–90 days, so owners order in winter and apply while the bike is built.'].map((x) => (
                  <li key={x} className="flex gap-3"><Check className="mt-1 h-4 w-4 flex-none" style={{ color: RED }} aria-hidden />{x}</li>
                ))}
              </ul>
            </div>
            <a href={CALL_URL} target="_blank" rel="noopener" onClick={() => track('cta_click', { where: 'book_call', intent })} className="block rounded-xl border border-zinc-700 p-5 hover:border-zinc-400">
              <div className="font-bold">Prefer to talk first?</div>
              <div className="mt-1 text-sm text-zinc-400">Book a discovery call with our team →</div>
            </a>
            <a href={DEPOSIT_URL} target="_blank" rel="noopener" onClick={() => track('cta_click', { where: 'deposit', intent })} className="block rounded-xl border border-zinc-700 p-5 hover:border-zinc-400">
              <div className="font-bold">Ready to go?</div>
              <div className="mt-1 text-sm text-zinc-400">Reserve a production spot with a US$250 deposit, applied in full to your order →</div>
            </a>
          </aside>
        </div>
      </section>

      {/* founder */}
      <Section id="founder">
        <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1fr]">
          <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-xl md:aspect-[4/5] md:max-w-sm">
            <Image src={FOUNDER} alt="Vlad Priadko, founder, next to a Coffee Bike serving in Vancouver" fill sizes="(min-width: 768px) 384px, 90vw" className="object-cover object-[50%_40%]" />
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

      {/* seasons */}
      <Section id="seasons" tone="soft">
        <Heading eyebrow="All year" title="A business for all four seasons" sub="The most common question from Canada and the northern US. Here is how owners answer it." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: Sun, t: 'Spring to fall', d: 'Farmers markets, festivals, sports games, weddings and private events.' },
            { icon: Snowflake, t: 'Winter', d: 'Indoors: office lobbies, hospitals, campuses, residential towers, grocery stores and gyms.' },
            { icon: Building2, t: 'Why landlords say yes', d: 'No build-out and no plumbing or electrical changes on their side. The bike rolls in, plugs into a standard outlet and serves.' },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-xl bg-white p-6">
              <Icon className="h-7 w-7" style={{ color: RED }} aria-hidden />
              <h3 className="mt-4 text-lg font-bold text-zinc-950">{t}</h3>
              <p className="mt-1.5 leading-relaxed text-zinc-600">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* permits */}
      <Section id="permits">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Heading eyebrow="Permits" title="Ask your health department before you buy" sub="Every city has its own rules, and approval is up to them. Our package gives them what they usually ask for, so you can check before you order." />
          <div className="rounded-xl border border-zinc-200 p-6">
            <h3 className="font-bold text-zinc-950">The free health inquiry package includes</h3>
            <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-zinc-700">
              {['Specifications, dimensions and blueprints', 'Sink, water tank, pump and hot water setup', 'A checklist of what to ask: sinks, water capacity, commissary, where you can vend', 'A sample letter to send your health department or city'].map((x) => (
                <li key={x} className="flex gap-3"><Check className="mt-1 h-4 w-4 flex-none" style={{ color: RED }} aria-hidden />{x}</li>
              ))}
            </ul>
            <a href={SPEC_SHEET} target="_blank" rel="noopener" onClick={() => track('spec_sheet', { where: 'permits', intent })} className="mt-5 inline-flex items-center gap-2 rounded-md border border-zinc-300 px-4 py-3 font-bold text-zinc-900 hover:border-zinc-500">
              <FileText className="h-5 w-5" /> Download the package (PDF)
            </a>
            <p className="mt-3 text-xs leading-relaxed text-zinc-500">A reference for your conversation with the authorities, not a guarantee of approval. Sink layout and tank sizes can be changed before your bike is built.</p>
          </div>
        </div>
      </Section>

      <Numbers intent={intent} />

      {/* how buying works */}
      <Section id="how" tone="soft">
        <Heading eyebrow="How buying works" title="From your first message to your first customer" />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.t} className="rounded-xl bg-white p-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold text-white" style={{ backgroundColor: RED }}>{i + 1}</div>
              <h3 className="mt-4 text-lg font-bold text-zinc-950">{s.t}</h3>
              <p className="mt-1.5 leading-relaxed text-zinc-600">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* walkthrough */}
      <Section id="walkthrough">
        <Heading eyebrow="See it" title="Walk around the bike in six minutes" sub="Every compartment, the espresso machine, the batteries and how it rides." />
        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl bg-zinc-900">
          <LiteYouTube videoId={WALKTHROUGH_ID} title="Coffee Bike full walkthrough" trackingName="coffee_bike_walkthrough_start_page" caption="Full walkthrough · 6:32" />
        </div>
      </Section>

      {/* questions */}
      <Section id="faq" tone="soft">
        <Heading eyebrow="Questions" title="What buyers ask before ordering" />
        <div className="mt-8 divide-y divide-zinc-200 rounded-xl bg-white">
          {FAQS.map((f) => (
            <details key={f.q} className="group p-5" onToggle={(e) => e.currentTarget.open && track('faq_open', { q: f.q.slice(0, 60), intent })}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-zinc-950">
                {f.q}
                <ChevronDown className="h-5 w-5 flex-none text-zinc-500 transition group-open:rotate-180" aria-hidden />
              </summary>
              <p className="mt-3 max-w-3xl leading-relaxed text-zinc-700">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* last call */}
      <section className="bg-black py-14 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold md:text-4xl" style={{ ...DISPLAY, ...BALANCE }}>See what your Coffee Bike would cost</h2>
            <p className="mt-2 text-zinc-400">Base from US$9,850 · CA$13,495. Reply within one business day.</p>
          </div>
          <Cta where="footer" intent={intent}>Get my price <ArrowRight className="h-5 w-5" /></Cta>
        </div>
      </section>

      <footer className="bg-black pb-28 pt-6 text-sm text-zinc-500 md:pb-10">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 border-t border-zinc-800 px-4 pt-6 sm:px-6">
          <span>© {new Date().getFullYear()} Coffee Bike World · Vancouver, BC</span>
          <a href="https://coffeebike.ca/privacy-policy/" className="hover:text-zinc-300">Privacy policy</a>
          <a href="https://coffeebike.ca/buy-a-mobile-coffee-bike" className="hover:text-zinc-300">Configure a bike</a>
        </div>
      </footer>

      {/* phones: price button that follows the visitor */}
      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur transition-transform md:hidden ${sticky ? 'translate-y-0' : 'translate-y-full'}`} style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="leading-tight">
            <div className="text-xs text-zinc-500">Base from</div>
            <div className="font-extrabold text-zinc-950">US$9,850</div>
          </div>
          <a href="#quote" onClick={() => track('cta_click', { where: 'sticky', intent })} className="flex-1 rounded-md px-4 py-3 text-center font-bold text-white" style={{ backgroundColor: RED }}>
            Get my price
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Break-even in drinks, from the visitor's own price and cost per drink. Nothing about sales volume or income is
 * filled in: under FTC rules (16 CFR 437.1) any preset sales or profit figure is an earnings claim, and Google treats
 * them as unreliable claims. The only prefilled number is the bike's own price.
 */
function Numbers({ intent }) {
  const [price, setPrice] = useState('');
  const [cogs, setCogs] = useState('');
  const [build, setBuild] = useState('15850');
  const used = useRef(false);
  const r = useMemo(() => {
    const p = parseFloat(price);
    const c = parseFloat(cogs);
    const b = parseFloat(build);
    if (!(p > 0) || !(c >= 0 && c < 100) || !(b > 0)) return null;
    const margin = p * (1 - c / 100);
    return { margin, drinks: Math.ceil(b / margin) };
  }, [price, cogs, build]);
  const touch = () => {
    if (!used.current) {
      used.current = true;
      track('calculator_use', { intent });
    }
  };
  const field = (label, value, set, props) => (
    <label className="block">
      <span className="text-sm text-zinc-400">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => {
          touch();
          set(e.target.value);
        }}
        className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-lg font-bold text-white tabular-nums placeholder:font-normal placeholder:text-zinc-600 focus:border-zinc-400 focus:outline-none"
        {...props}
      />
    </label>
  );
  return (
    <section id="numbers" className="scroll-mt-16 bg-zinc-950 py-14 text-white md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Heading dark eyebrow="Break-even" title="How many drinks cover the bike?" sub="Enter your own price and cost per drink. Nothing is filled in for you, because only you know your market." />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="grid grid-cols-2 gap-4">
            {field('Your price per drink', price, setPrice, { min: 0, step: 0.25, id: 'calc-price', placeholder: 'Your price' })}
            {field('Cost of goods per drink (%)', cogs, setCogs, { min: 0, max: 99, step: 1, id: 'calc-cogs', placeholder: 'Your %' })}
            <div className="col-span-2">{field('Your build cost', build, setBuild, { min: 0, step: 250, id: 'calc-build' })}</div>
          </div>
          <div className="rounded-xl bg-zinc-900 p-6">
            <dl className="grid gap-5">
              <div><dt className="text-sm text-zinc-400">Margin per drink</dt><dd className="text-3xl font-extrabold tabular-nums">{r ? `$${r.margin.toFixed(2)}` : '–'}</dd></div>
              <div><dt className="text-sm text-zinc-400">Drinks to cover your build</dt><dd className="text-3xl font-extrabold tabular-nums">{r ? r.drinks.toLocaleString('en-US') : '–'}</dd></div>
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-zinc-500">An illustration from the numbers you enter, not a prediction of sales or income. It leaves out permits, insurance, rent or event fees, staff, taxes and your time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
