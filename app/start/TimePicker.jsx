'use client';

/**
 * Our own time picker, shown right after the quote form instead of GoHighLevel's calendar widget, which asked for the
 * visitor's details a second time (founder, 3 Oct 2026: "each lead only shares all info once"). Free times come from
 * the OS (GoHighLevel's calendar), the booking goes through the OS onto the contact the form created, and the
 * calendar's own confirmation (email, text, Zoom link) follows. If the times cannot load, the calendar link is the
 * fallback.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { CALL_API } from './content';

const RED = '#E31E24';
const track = (name, params) => {
  try {
    window.gtag?.('event', name, params);
  } catch {}
};
const zone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Vancouver';
  } catch {
    return 'America/Vancouver';
  }
};
const fmtDay = (iso, tz) => new Date(iso).toLocaleDateString('en-US', { timeZone: tz, weekday: 'short', month: 'short', day: 'numeric' });
// 24-hour clock: 09:00 in the morning, 21:00 in the evening. People mixed up 9 AM and 9 PM (Vlad, 5 Oct 2026)
const fmtTime = (iso, tz) => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(iso)).map((x) => [x.type, x.value]));
  return `${p.hour}:${p.minute}`;
};
const fmtFull = (iso, tz) => `${new Date(iso).toLocaleDateString('en-US', { timeZone: tz, weekday: 'long', month: 'long', day: 'numeric' })} at ${fmtTime(iso, tz)}`;
const UUID = /^[0-9a-f-]{36}$/i;

export default function TimePicker({ leadId, calendar = 'discovery', fallbackUrl, market, intent, booked: shared, onBooked }) {
  const tz = useMemo(zone, []);
  const [state, setState] = useState(shared ? 'booked' : 'loading'); // loading | ready | booking | booked | failed
  const [days, setDays] = useState([]);
  const [day, setDay] = useState(0);
  const [pick, setPick] = useState(null);
  const [booked, setBooked] = useState(shared || null);
  const [note, setNote] = useState('');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const res = await fetch(`${CALL_API}/call-slots?calendar=${calendar}&tz=${encodeURIComponent(tz)}`);
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.ok || !j.data?.days?.length) throw new Error('no times');
      setDays(j.data.days);
      setDay(0);
      setState('ready');
      track('call_times_shown', { calendar, market, intent, days: j.data.days.length });
    } catch {
      setState('failed');
    }
  }, [calendar, tz, market, intent]);

  useEffect(() => {
    if (shared) {
      setBooked(shared);
      setState('booked');
      return;
    }
    // a request the OS did not keep (a repeat, a bot) has no id to book against: the calendar link does the job
    if (!UUID.test(String(leadId || ''))) setState('failed');
    else load();
  }, [leadId, load, shared]);

  const book = async () => {
    if (!pick) return;
    setState('booking');
    setNote('');
    try {
      const res = await fetch(`${CALL_API}/call-booking`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ leadId, slot: pick, tz, calendar }) });
      const j = await res.json().catch(() => null);
      if (res.ok && j?.ok && j.data?.booked) {
        setBooked(j.data);
        setState('booked');
        onBooked?.(j.data);
        track('book_call', { calendar, market, intent, already: Boolean(j.data.already) });
        // live site only, and only for a new booking (the layout sets __cbwLive)
        if (window.__cbwLive && !j.data.already) try { window.fbq?.('track', 'Schedule', { content_name: 'Coffee Bike call', content_category: market }); } catch {}
        return;
      }
      if (j?.ok && j.data?.reason === 'taken') {
        setNote('That time was just taken. Here are the current times.');
        setPick(null);
        await load();
        return;
      }
      throw new Error(j?.error?.message || `status ${res.status}`);
    } catch {
      setState('failed');
    }
  };

  if (state === 'booked' && booked) {
    return (
      <div role="status" className="rounded-xl bg-emerald-50 p-4">
        <p className="flex items-center gap-2 font-extrabold text-emerald-900"><Check className="h-5 w-5" strokeWidth={3} aria-hidden /> {booked.already ? 'Your call is already booked' : 'You’re booked'}</p>
        <p className="mt-1 text-[16px] font-bold text-zinc-950">{fmtFull(booked.start, tz)}</p>
        <p className="mt-1 text-sm text-zinc-700">Your time zone: {tz.replace(/_/g, ' ')}. The Zoom link and a confirmation are on their way by email and text. To change the time, use the link in that email.</p>
      </div>
    );
  }

  if (state === 'failed') {
    return (
      <div className="rounded-xl bg-zinc-100 p-4">
        <p className="text-sm text-zinc-700">The open times didn’t load here. Pick one in our calendar instead: your details are already filled in.</p>
        <a href={fallbackUrl} target="_blank" rel="noopener" onClick={() => track('cta_click', { where: 'thanks_call_fallback', market, intent })} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 font-extrabold text-white" style={{ backgroundColor: RED }}>
          Open the calendar <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    );
  }

  if (state === 'loading') {
    return (
      <p className="flex items-center gap-2 py-3 text-sm font-semibold text-zinc-600" aria-live="polite"><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Finding open times…</p>
    );
  }

  const d = days[Math.min(day, days.length - 1)];
  return (
    <div>
      <p className="text-xs font-semibold text-zinc-500">Times in your time zone ({tz.replace(/_/g, ' ')}). A 15-minute video call.</p>
      {/* contain inline-size: the row of days scrolls inside the width it is given and never widens what holds it. Without
          it the page section's grid grew to the whole row, 542 px on a 412 px phone, and the pop-up with it (6 Oct 2026) */}
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [contain:inline-size]" role="tablist" aria-label="Day">
        {days.map((x, i) => (
          <button key={x.date} type="button" role="tab" aria-selected={i === day} onClick={() => { setDay(i); setPick(null); }} className={`flex-none rounded-lg border-2 px-3 py-2 text-sm font-bold ${i === day ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400'}`}>
            {fmtDay(x.slots[0], tz)}
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Time">
        {d.slots.map((s) => (
          <button key={s} type="button" role="radio" aria-checked={pick === s} onClick={() => setPick(s)} className={`rounded-lg border-2 px-2 py-2.5 text-sm font-bold tabular-nums ${pick === s ? 'border-[#E31E24] bg-red-50 text-zinc-950' : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400'}`}>
            {fmtTime(s, tz)}
          </button>
        ))}
      </div>
      {note ? <p className="mt-2 text-sm font-semibold text-red-700" role="alert">{note}</p> : null}
      <button type="button" disabled={!pick || state === 'booking'} onClick={book} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 font-extrabold text-white shadow-sm transition hover:brightness-110 disabled:opacity-50" style={{ backgroundColor: RED }}>
        {state === 'booking' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
        {state === 'booking' ? 'Booking…' : pick ? `Book ${fmtFull(pick, tz)}` : 'Pick a time above'}
      </button>
      <p className="mt-2 text-center text-xs text-zinc-500">Nothing to type again. You’ll get the Zoom link by email and text.</p>
    </div>
  );
}
