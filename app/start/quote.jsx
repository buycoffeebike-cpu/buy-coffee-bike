'use client';

/**
 * The quote form: four one-tap questions, then contact details. It posts to the Coffee Bike OS (LEAD_API), which
 * stores the answers first and then creates the GoHighLevel contact and Bike Sales opportunity with the same fields as
 * the GoHighLevel "Send Inquiry" form. One state for the whole page, so the hero, the inline section and the pop-up all
 * show the same step. Steps change in the browser with no network call between them.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Check, FileText, Loader2, MessageCircle, PlayCircle, X } from 'lucide-react';
import { ADS_CONVERSION, CALL_URL, DEPOSIT_URL, INCLUDED, LEAD_API, MARKETS, QUOTE_FORM_URL, SPEC_SHEET, whatsappLink } from './content';

export const RED = '#E31E24';
const STEP_KEYS = ['use', 'timeline', 'stage', 'fit', 'contact'];
const STORE = 'cbw_quote_v2';

/** "When do you want to be serving?" in seasons, from today's date: the next three seasons after this one. */
function seasonOptions(now = new Date()) {
  const m = now.getMonth(); // 0 = January
  const y = now.getFullYear();
  // season index: 0 winter (Dec–Feb), 1 spring, 2 summer, 3 fall
  const cur = m === 11 || m <= 1 ? 0 : m <= 4 ? 1 : m <= 7 ? 2 : 3;
  const names = ['Winter', 'Spring', 'Summer', 'Fall'];
  const out = [];
  for (let i = 1; i <= 3; i++) {
    const s = (cur + i) % 4;
    // the winter that starts in December belongs to the year it starts in; the others to the year they happen in
    const monthsAhead = i * 3;
    const when = new Date(y, m + monthsAhead, 1);
    const year = s === 0 && when.getMonth() <= 1 ? when.getFullYear() - 1 : when.getFullYear();
    const label = s === 0 ? `This winter${cur === 3 && i === 1 ? ', indoors' : ''}` : `${names[s]} ${year}`;
    out.push({ v: `s${i}`, t: i === 3 ? `${label} or later` : label });
  }
  return [{ v: 'asap', t: 'As soon as possible' }, ...out, { v: 'research', t: 'Just researching for now' }];
}

const QUESTIONS = {
  use: {
    title: 'What are you planning?',
    options: [
      { v: 'new_business', t: 'Start a mobile coffee business', short: 'Start my own coffee business', d: 'A side business or a full-time one' },
      { v: 'expansion', t: 'Add a mobile bar to my café or roastery', short: 'Add to my café or roastery' },
      { v: 'brand', t: 'Events, catering or brand activations', short: 'Events or brand activations' },
      { v: 'venue', t: 'For my venue: hotel, campus or resort', short: 'For my hotel, campus or venue' },
      { v: 'other', t: 'Something else' },
    ],
  },
  timeline: { title: 'When do you want to be serving?' },
  stage: {
    title: 'Where are you in the process?',
    options: [
      { v: 'invoice', t: 'Ready to order', d: 'Send me an invoice' },
      { v: 'discuss', t: 'Serious about it', d: 'I want to plan the best setup' },
      { v: 'comparing', t: 'Comparing options', d: 'Bike, cart, trailer or truck' },
      { v: 'research', t: 'Early research', d: 'Just starting to look' },
    ],
  },
};

const Ctx = createContext(null);

const clean = (o) => Object.fromEntries(Object.entries(o || {}).filter(([, v]) => typeof v === 'string' && v.trim()).map(([k, v]) => [k, v.trim().slice(0, 290)]));

/** utm_* and Google/Meta click ids from the ad click, kept for the session so a reload does not lose them. */
function readAttribution() {
  try {
    const p = new URLSearchParams(window.location.search);
    const fresh = {
      utm: clean({ source: p.get('utm_source'), medium: p.get('utm_medium'), campaign: p.get('utm_campaign'), content: p.get('utm_content'), term: p.get('utm_term') }),
      click: clean({ gclid: p.get('gclid'), gbraid: p.get('gbraid'), wbraid: p.get('wbraid'), fbclid: p.get('fbclid') }),
    };
    const saved = JSON.parse(sessionStorage.getItem('cbw_attr') || 'null');
    const hasFresh = Object.keys(fresh.utm).length || Object.keys(fresh.click).length;
    const attr = hasFresh || !saved ? fresh : saved;
    sessionStorage.setItem('cbw_attr', JSON.stringify(attr));
    return attr;
  } catch {
    return { utm: {}, click: {} };
  }
}

const track = (name, params) => {
  try {
    window.gtag?.('event', name, params);
  } catch {}
};

function e164(phone) {
  const d = String(phone || '').replace(/[^\d+]/g, '');
  if (d.startsWith('+')) return d.length >= 8 ? d : '';
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith('1')) return `+${d}`;
  return '';
}

// the address typos people make most, and what they meant
const DOMAIN_FIX = { 'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmail.con': 'gmail.com', 'gnail.com': 'gmail.com', 'hotmial.com': 'hotmail.com', 'hotmai.com': 'hotmail.com', 'hotmail.co': 'hotmail.com', 'yaho.com': 'yahoo.com', 'yahoo.co': 'yahoo.com', 'outlok.com': 'outlook.com', 'iclod.com': 'icloud.com', 'icloud.co': 'icloud.com' };
function emailFix(email) {
  const [user, domain] = String(email).trim().toLowerCase().split('@');
  return user && domain && DOMAIN_FIX[domain] ? `${user}@${DOMAIN_FIX[domain]}` : '';
}

export function QuoteProvider({ market, intent, children }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: '', email: '', phone: '', location: '', question: '', consent: false, hp: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');
  const [fails, setFails] = useState(0);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [seasons, setSeasons] = useState(() => seasonOptions());
  const started = useRef(0);
  const restored = useRef(false);

  // the page is built ahead of time: work the seasons out from the visitor's own date
  useEffect(() => setSeasons(seasonOptions(new Date())), []);

  // pick up where the visitor left off (same tab), never across markets
  useEffect(() => {
    try {
      const s = JSON.parse(sessionStorage.getItem(STORE) || 'null');
      if (s && s.market === market && s.status !== 'done') {
        setAnswers(s.answers || {});
        setContact((c) => ({ ...c, ...(s.contact || {}), hp: '' }));
        setStep(Math.min(s.step || 0, STEP_KEYS.length - 1));
      }
    } catch {}
    restored.current = true;
  }, [market]);
  useEffect(() => {
    if (!restored.current) return;
    try {
      const { hp, ...keep } = contact;
      sessionStorage.setItem(STORE, JSON.stringify({ market, step, answers, contact: keep, status }));
    } catch {}
  }, [market, step, answers, contact, status]);

  const answer = useCallback(
    (key, v) => {
      if (!started.current) started.current = Date.now();
      setAnswers((a) => ({ ...a, [key]: v }));
      track('quote_step', { step: key, answer: v, market, intent });
      setStep((s) => Math.min(Math.max(s, STEP_KEYS.indexOf(key)) + 1, STEP_KEYS.length - 1));
    },
    [market, intent],
  );

  const openQuote = useCallback(
    (where) => {
      setOpen(true);
      track('cta_click', { where, intent, market });
    },
    [intent, market],
  );

  const submit = useCallback(async () => {
    setStatus('sending');
    setError('');
    const attr = readAttribution();
    const season = seasons.find((o) => o.v === answers.timeline);
    const body = {
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      location: contact.location.trim(),
      market,
      use: answers.use,
      timeline: answers.timeline,
      timelineLabel: season?.t,
      stage: answers.stage,
      fit: answers.fit,
      question: contact.question.trim() || undefined,
      consent: contact.consent,
      intent,
      page: window.location.href.slice(0, 600),
      referrer: document.referrer ? document.referrer.slice(0, 600) : undefined,
      utm: attr.utm,
      click: attr.click,
      hp: contact.hp || undefined,
      ms: started.current ? Date.now() - started.current : undefined,
    };
    try {
      const res = await fetch(LEAD_API, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.ok) {
        const e = new Error(j?.error?.message || `status ${res.status}`);
        e.status = res.status;
        throw e;
      }
      // Google Ads (with enhanced conversions), GA4 and Meta: once per lead
      const [first, ...rest] = body.name.split(/\s+/);
      const user = { email: body.email.toLowerCase(), address: { first_name: first, last_name: rest.join(' ') || undefined, country: market === 'ca' ? 'CA' : 'US' } };
      const ph = e164(body.phone);
      if (ph) user.phone_number = ph;
      try {
        window.gtag?.('set', 'user_data', user);
        window.gtag?.('event', 'conversion', { send_to: ADS_CONVERSION, value: 100, currency: 'CAD', transaction_id: j.data?.id });
        window.gtag?.('event', 'generate_lead', { form: 'quote_flow', market, intent, use: answers.use, timeline: answers.timeline, stage: answers.stage, fit: answers.fit });
        window.fbq?.('track', 'Lead', { content_name: 'Coffee Bike quote', content_category: market });
      } catch {}
      setResult({ first, last: rest.join(' '), email: body.email, phone: body.phone, id: j.data?.id });
      setStatus('done');
    } catch (e) {
      setFails((n) => n + 1);
      setStatus('error');
      setError(e?.status === 429 ? 'We already have a few requests from this connection. Please message us on WhatsApp instead, or try again in an hour.' : e?.status === 400 ? `Please check your details: ${String(e.message).replace(/^[a-z]+: /i, '')}` : 'That did not go through. Please try again.');
      track('quote_error', { status: e?.status || 0, market, intent });
    }
  }, [answers, contact, intent, market, seasons]);

  const value = useMemo(
    () => ({ market, intent, step, setStep, answers, setAnswers, answer, contact, setContact, status, error, fails, submit, open, setOpen, openQuote, result, seasons }),
    [market, intent, step, answers, answer, contact, status, error, fails, submit, open, openQuote, result, seasons],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useQuote = () => useContext(Ctx);

function Tiles({ name, options, value, onPick }) {
  return (
    <div className="grid gap-2.5" role="radiogroup" aria-label={name}>
      {options.map((o) => {
        const on = value === o.v;
        return (
          <button
            key={o.v}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onPick(o.v)}
            className={`flex min-h-[56px] w-full items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-red-200 ${on ? 'border-[#E31E24] bg-red-50' : 'border-zinc-200 bg-white hover:border-zinc-400'}`}
          >
            <span>
              <span className="block text-[16px] font-bold leading-snug text-zinc-950">{o.t}</span>
              {o.d ? <span className="mt-0.5 block text-sm text-zinc-600">{o.d}</span> : null}
            </span>
            <span className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 ${on ? 'border-[#E31E24] bg-[#E31E24] text-white' : 'border-zinc-300'}`}>{on ? <Check className="h-4 w-4" strokeWidth={3} /> : null}</span>
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, hint, error, children }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-zinc-900">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error ? <span className="mt-1 block text-sm font-semibold text-red-700">{error}</span> : hint ? <span className="mt-1 block text-xs text-zinc-500">{hint}</span> : null}
    </label>
  );
}

const input = 'w-full rounded-lg border-2 border-zinc-200 bg-white px-3.5 py-3 text-[16px] text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none';

export function QuoteFlow({ where = 'inline' }) {
  const q = useQuote();
  const M = MARKETS[q.market];
  const [blurred, setBlurred] = useState({});
  const [tried, setTried] = useState(false);
  const headRef = useRef(null);
  const key = STEP_KEYS[q.step];

  useEffect(() => {
    if (where !== 'hero') headRef.current?.focus({ preventScroll: true });
  }, [q.step, where]);

  if (q.status === 'done') return <Thanks />;

  const errs = {
    name: q.contact.name.trim().length < 2 ? 'Please enter your name.' : '',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(q.contact.email.trim()) ? '' : 'Please enter a valid email.',
    phone: q.contact.phone.replace(/\D/g, '').length >= 7 && /^[+()\d\s.-]+$/.test(q.contact.phone.trim()) ? '' : 'Please enter a mobile number we can reach you on.',
    location: q.contact.location.trim().length < 2 ? 'Tell us the city where you want to run it.' : '',
  };
  const show = (k) => (tried || blurred[k]) && errs[k];
  const contactOk = !errs.name && !errs.email && !errs.phone && !errs.location;
  const set = (k) => (e) => q.setContact((c) => ({ ...c, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const blur = (k) => () => setBlurred((b) => ({ ...b, [k]: true }));
  const suggestion = emailFix(q.contact.email);
  const title = key === 'fit' ? M.fitQuestion : key === 'contact' ? 'Where should we send your price?' : QUESTIONS[key].title;

  return (
    <div className="text-left">
      <div className="flex items-center justify-between gap-3">
        {q.step > 0 ? (
          <button type="button" onClick={() => q.setStep(q.step - 1)} className="-ml-2 inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-semibold text-zinc-600 hover:text-zinc-950">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        ) : (
          <span className="text-sm font-semibold text-zinc-600">About 1 minute</span>
        )}
        <span className="text-sm font-semibold text-zinc-600" aria-live="polite">
          Step {q.step + 1} of {STEP_KEYS.length}
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200" aria-hidden>
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${((q.step + 1) / STEP_KEYS.length) * 100}%`, backgroundColor: RED }} />
      </div>

      <h3 ref={headRef} tabIndex={-1} className="mt-5 text-[22px] font-extrabold leading-tight text-zinc-950 focus:outline-none" style={{ fontFamily: '"Roboto Condensed", Inter, system-ui, sans-serif', textWrap: 'balance' }}>
        {title}
      </h3>

      <div className="mt-4">
        {key === 'use' || key === 'stage' ? <Tiles name={title} options={QUESTIONS[key].options} value={q.answers[key]} onPick={(v) => q.answer(key, v)} /> : null}
        {key === 'timeline' ? <Tiles name={title} options={q.seasons} value={q.answers.timeline} onPick={(v) => q.answer('timeline', v)} /> : null}

        {key === 'fit' ? (
          <div className="grid gap-4">
            <p className="rounded-xl bg-zinc-100 p-4 text-[15px] leading-relaxed text-zinc-800">{M.fitLine}</p>
            <Tiles name={title} options={M.fit} value={q.answers.fit} onPick={(v) => q.answer('fit', v)} />
          </div>
        ) : null}

        {key === 'contact' ? (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              setTried(true);
              if (contactOk && q.status !== 'sending') q.submit();
            }}
            className="grid gap-4"
          >
            <Field label="Full name" error={show('name')}>
              <input className={input} value={q.contact.name} onChange={set('name')} onBlur={blur('name')} autoComplete="name" placeholder="First and last name" />
            </Field>
            <Field label="Email" error={show('email')}>
              <input className={input} type="email" inputMode="email" value={q.contact.email} onChange={set('email')} onBlur={blur('email')} autoComplete="email" placeholder="you@example.com" />
              {suggestion ? (
                <button type="button" onClick={() => q.setContact((c) => ({ ...c, email: suggestion }))} className="mt-1 text-sm font-semibold text-zinc-700 underline underline-offset-2">
                  Did you mean {suggestion}?
                </button>
              ) : null}
            </Field>
            <Field label="Mobile number" hint="So we can text or call you back fast." error={show('phone')}>
              <input className={input} type="tel" inputMode="tel" value={q.contact.phone} onChange={set('phone')} onBlur={blur('phone')} autoComplete="tel" placeholder={M.phonePlaceholder} />
            </Field>
            <Field label="City and province or state" hint="For your delivery cost and local permit rules." error={show('location')}>
              <input className={input} value={q.contact.location} onChange={set('location')} onBlur={blur('location')} autoComplete="address-level2" placeholder={M.cityPlaceholder} />
            </Field>
            <details className="group rounded-lg">
              <summary className="cursor-pointer list-none text-sm font-bold text-zinc-800 underline underline-offset-4">Add a question (optional)</summary>
              <textarea className={`${input} mt-2 min-h-[90px]`} value={q.contact.question} onChange={set('question')} maxLength={2000} placeholder="Anything you want answered in our reply" />
            </details>
            {/* people never see this field; bots fill it */}
            <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                Company website
                <input tabIndex={-1} autoComplete="off" value={q.contact.hp} onChange={set('hp')} />
              </label>
            </div>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-zinc-700">
              <input type="checkbox" checked={q.contact.consent} onChange={set('consent')} className="mt-0.5 h-4 w-4 flex-none accent-[#E31E24]" />
              <span>Also send me owner stories and offers. Unsubscribe anytime.</span>
            </label>
            {q.status === 'error' ? (
              <div role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-800">
                {q.error}
                {q.fails >= 2 ? (
                  <span className="mt-2 block font-normal text-red-900">
                    You can also <a className="font-bold underline" href={whatsappLink(q.market)} target="_blank" rel="noopener">message us on WhatsApp</a>, email <a className="font-bold underline" href={`mailto:coffeebike@vladvik.com?subject=${encodeURIComponent('Coffee Bike price')}`}>coffeebike@vladvik.com</a>, or use <a className="font-bold underline" href={QUOTE_FORM_URL} target="_blank" rel="noopener">our backup form</a>.
                  </span>
                ) : null}
              </div>
            ) : null}
            <button type="submit" disabled={q.status === 'sending'} className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-lg font-extrabold text-white shadow-sm transition hover:brightness-110 disabled:opacity-70" style={{ backgroundColor: RED }}>
              {q.status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              {q.status === 'sending' ? 'Sending…' : 'Get my price'}
            </button>
            <p className="text-center text-xs leading-relaxed text-zinc-500">
              By sending, you agree Coffee Bike World may call, text or WhatsApp you about your quote. Msg &amp; data rates may apply. Reply STOP to opt out. We never share your details.
            </p>
          </form>
        ) : null}
      </div>
    </div>
  );
}

/** After sending: the typical build for their market, the next step that fits where they are, and a call to book. */
function Thanks() {
  const q = useQuote();
  const M = MARKETS[q.market];
  const r = q.result || {};
  const stage = q.answers.stage;
  const booking = useMemo(() => {
    const p = new URLSearchParams();
    if (r.first) p.set('first_name', r.first);
    if (r.last) p.set('last_name', r.last);
    if (r.email) p.set('email', r.email);
    if (r.phone) p.set('phone', r.phone);
    return `${CALL_URL}?${p.toString()}`;
  }, [r.first, r.last, r.email, r.phone]);
  const next =
    stage === 'invoice'
      ? { t: 'Want your spot now?', d: 'A US$250 deposit reserves a production spot and is applied in full to your order.', href: DEPOSIT_URL, cta: 'Reserve my spot', where: 'thanks_deposit' }
      : stage === 'comparing'
        ? { t: 'Comparing options?', d: 'See the bike next to a truck, trailer, cart and storefront, side by side.', href: '#compare', cta: 'Open the comparison', where: 'thanks_compare', close: true }
        : stage === 'research'
          ? { t: 'Starting your research?', d: 'The health inquiry package tells you what your city will ask for.', href: SPEC_SHEET, cta: 'Get the permit package (PDF)', where: 'thanks_permits' }
          : null;
  return (
    <div className="text-left" role="status">
      <div className="flex h-12 w-12 items-center justify-center rounded-full text-white" style={{ backgroundColor: RED }}>
        <Check className="h-7 w-7" strokeWidth={3} />
      </div>
      <h3 className="mt-4 text-2xl font-extrabold leading-tight text-zinc-950" style={{ fontFamily: '"Roboto Condensed", Inter, system-ui, sans-serif' }}>
        Thank you{r.first ? `, ${r.first}` : ''}. Your request is in.
      </h3>
      <p className="mt-2 text-[16px] leading-relaxed text-zinc-700">We’ll reply within one business day with your price and build options, and we’ll message you if a quick question helps.</p>

      {/* the call comes first: 8 of 9 buyers planned their build on one */}
      <div className="mt-5 rounded-xl border-2 border-zinc-900 p-4">
        <p className="flex items-center gap-2 font-extrabold text-zinc-950"><Calendar className="h-5 w-5" aria-hidden /> Step 1 of 2 done. Next: pick a time to review your build</p>
        <p className="mt-1 text-sm text-zinc-600">A 15-minute call. Most owners planned their build on one with us.</p>
        <a href={booking} target="_blank" rel="noopener" onClick={() => track('cta_click', { where: 'thanks_call', market: q.market, intent: q.intent })} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 font-extrabold text-white" style={{ backgroundColor: RED }}>
          Open the calendar <ArrowRight className="h-5 w-5" />
        </a>
        <div className="mt-3 overflow-hidden rounded-lg border border-zinc-200">
          <iframe src={booking} title="Book a call with Coffee Bike World" className="block h-[600px] w-full border-0" loading="lazy" onLoad={() => track('booking_view', { market: q.market, intent: q.intent })} />
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-zinc-100 p-4">
        <p className="text-sm font-bold uppercase tracking-wider text-zinc-500">Your starting point</p>
        <p className="mt-1 text-[15px] leading-relaxed text-zinc-900"><strong>{M.thanksPrice}</strong> {M.thanksNote}</p>
        <ul className="mt-2 grid gap-1 text-sm text-zinc-700">
          {INCLUDED.slice(0, 5).map((x) => (
            <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 flex-none" style={{ color: RED }} aria-hidden />{x}</li>
          ))}
        </ul>
      </div>

      {next ? (
        <a href={next.href} target={next.href.startsWith('#') ? undefined : '_blank'} rel="noopener" onClick={() => { track('cta_click', { where: next.where, market: q.market, intent: q.intent }); if (next.close) q.setOpen(false); }} className="mt-4 block rounded-xl border-2 border-zinc-900 p-4 hover:bg-zinc-50">
          <span className="block font-extrabold text-zinc-950">{next.t}</span>
          <span className="mt-0.5 block text-sm text-zinc-700">{next.d}</span>
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold" style={{ color: RED }}>{next.cta} <ArrowRight className="h-4 w-4" /></span>
        </a>
      ) : null}


      <div className="mt-5 grid gap-2.5">
        <a href={SPEC_SHEET} target="_blank" rel="noopener" onClick={() => track('spec_sheet', { where: 'thanks', market: q.market, intent: q.intent })} className="flex items-center gap-3 rounded-xl border-2 border-zinc-200 px-4 py-3.5 font-bold text-zinc-900 hover:border-zinc-400">
          <FileText className="h-5 w-5 flex-none" /> Specs and health inquiry package (PDF)
        </a>
        <a href="#walkthrough" onClick={() => q.setOpen(false)} className="flex items-center gap-3 rounded-xl border-2 border-zinc-200 px-4 py-3.5 font-bold text-zinc-900 hover:border-zinc-400">
          <PlayCircle className="h-5 w-5 flex-none" /> Watch the 6-minute walkthrough
        </a>
      </div>
      <a href={whatsappLink(q.market)} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { where: 'thanks', market: q.market, intent: q.intent })} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-zinc-900 underline underline-offset-4">
        <MessageCircle className="h-4 w-4" aria-hidden /> Questions now? Message us on WhatsApp
      </a>
    </div>
  );
}

/** The pop-up every price button opens: full screen on phones, a centred card on larger screens. */
export function QuoteModal() {
  const q = useQuote();
  useEffect(() => {
    if (!q.open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && q.setOpen(false);
    window.addEventListener('keydown', onKey);
    track('quote_open', { market: q.market, intent: q.intent, step: STEP_KEYS[q.step] });
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.open]);
  if (!q.open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-stretch justify-center bg-black/60 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Get your Coffee Bike price" onClick={(e) => e.target === e.currentTarget && q.setOpen(false)}>
      <div className="relative flex max-h-full w-full flex-col overflow-y-auto bg-white px-5 pb-8 pt-4 sm:max-h-[92vh] sm:max-w-[520px] sm:rounded-2xl sm:px-7 sm:pb-7" style={{ paddingTop: 'max(16px, env(safe-area-inset-top))' }}>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>Your Coffee Bike price</span>
          <button type="button" onClick={() => q.setOpen(false)} aria-label="Close" className="-mr-2 rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900">
            <X className="h-6 w-6" />
          </button>
        </div>
        <QuoteFlow where="modal" />
      </div>
    </div>
  );
}

/** Hero entry: the first question right under the headline; answering opens the rest in the pop-up. */
export function HeroQuestion() {
  const q = useQuote();
  if (q.status === 'done') {
    return <div className="rounded-xl bg-emerald-50 p-4 font-semibold text-emerald-900">Thank you. Your request is in: we’ll reply within one business day.</div>;
  }
  if (q.step > 0) {
    return (
      <button type="button" onClick={() => q.openQuote('hero_resume')} className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-lg font-extrabold text-white shadow-sm hover:brightness-110 sm:w-auto" style={{ backgroundColor: RED }}>
        Continue to your price · step {q.step + 1} of 5 <ArrowRight className="h-5 w-5" />
      </button>
    );
  }
  return (
    <div>
      <p className="text-[15px] font-bold leading-snug text-zinc-950">Get your exact price, shipping to your city and a launch plan. What are you planning?</p>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        {QUESTIONS.use.options.slice(0, 4).map((o) => (
          <button
            key={o.v}
            type="button"
            onClick={() => {
              q.answer('use', o.v);
              q.openQuote('hero_question');
            }}
            className="flex min-h-[64px] items-center justify-between gap-2 rounded-xl border-2 border-zinc-300 bg-white px-3 py-2.5 text-left text-[14px] font-bold leading-snug text-zinc-950 transition hover:border-[#E31E24] focus:outline-none focus-visible:ring-4 focus-visible:ring-red-200 sm:px-4 sm:text-[15px]"
          >
            {o.short ?? o.t}
            <ArrowRight className="h-4 w-4 flex-none" style={{ color: RED }} />
          </button>
        ))}
      </div>
      <p className="mt-2 text-[13px] text-zinc-600">About a minute. No payment, no obligation. We reply within one business day.</p>
    </div>
  );
}
