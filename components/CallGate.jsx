'use client';

/**
 * The body of the "Schedule a Call" pop-up on the Buy a Coffee Bike pages: the four quote questions and contact
 * details first (the same form and endpoint as the landing pages, so every booking is a lead with its answers), then
 * the page's own calendar with the visitor's details and build pre-filled. Founder, 3 Oct 2026: "when they are booking
 * the call, they still need to fill in our form with all questions and it records them as a lead with already booked
 * call". The calendar links in our emails and texts are untouched: those people are already in the CRM.
 */
import { useEffect, useMemo } from 'react';
import { X } from 'lucide-react';
import { QuoteFlow, RED, useQuote } from '../app/start/quote';

export default function CallGate({ calendarUrl, summary, onClose }) {
  const q = useQuote();
  useEffect(() => {
    q.setWantsCall(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const done = q.status === 'done';
  // the calendar knows who is booking, so the appointment lands on the contact the form just created
  const src = useMemo(() => {
    const r = done ? q.result : null;
    if (!r) return calendarUrl;
    const p = new URLSearchParams();
    if (r.first) p.set('first_name', r.first);
    if (r.last) p.set('last_name', r.last);
    if (r.email) p.set('email', r.email);
    if (r.phone) p.set('phone', r.phone);
    return `${calendarUrl}${calendarUrl.includes('?') ? '&' : '?'}${p.toString()}`;
  }, [calendarUrl, done, q.result]);
  return (
    <>
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-200 bg-white flex-shrink-0">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-wider font-bold mb-0.5" style={{ color: RED }}>Schedule a Call</div>
          <div className="text-base font-bold leading-tight">{done ? 'Pick a Time With Our Team' : 'First, four quick questions'}</div>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="w-9 h-9 rounded-full hover:bg-zinc-100 flex items-center justify-center transition flex-shrink-0">
          <X className="w-5 h-5" />
        </button>
      </div>
      {done ? (
        <>
          {summary || null}
          <div className="modal-embed flex-1 min-h-0 overflow-hidden bg-white px-3 sm:px-5 pb-4">
            <iframe src={src} style={{ width: '100%', height: '100%', border: 'none', borderRadius: 0, display: 'block' }} scrolling="yes" title="Schedule a Call"></iframe>
          </div>
        </>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto bg-white px-5 py-5 sm:px-7">
          <div className="mx-auto max-w-[520px]">
            <QuoteFlow where="buy_call" />
          </div>
        </div>
      )}
    </>
  );
}
