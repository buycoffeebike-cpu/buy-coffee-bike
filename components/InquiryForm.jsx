'use client';

/**
 * The body of the "Get In Touch" and "Save My Build" pop-ups on the Buy a Coffee Bike pages (Vlad, 10 Nov 2026: "not
 * the form from the CRM as it loads slow, but a form that matches our landing pages by speed and design, the full form,
 * not the step-by-step widget"). It is the landing pages' full form (app/start/quote.jsx QuoteFullForm): every question
 * on screen, the same endpoint, the texted code, the same conversions, the same thank-you with the call picker. The
 * configured build travels with it (QuoteProvider's `extra.build`) into the CRM field the old Save My Build form filled,
 * the contact note and the lead email.
 */
import { useEffect } from 'react';
import { QuoteFullForm, useQuote } from '../app/start/quote';

export default function InquiryForm({ onClose }) {
  const q = useQuote();
  // the "Schedule a Call" pop-up switches the shared form to "then the calendar"; this one is a plain request
  useEffect(() => {
    q.setWantsCall(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // a link in the thank-you to a part of this page (the walkthrough) closes the pop-up and scrolls there; the landing
  // pages call it #walkthrough, this page #walkthrough-section
  const onClickCapture = (e) => {
    const a = e.target?.closest?.('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id) || (id === 'walkthrough' ? document.getElementById('walkthrough-section') : null);
    if (!el) return;
    e.preventDefault();
    onClose?.();
    setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  };

  return (
    <div onClickCapture={onClickCapture}>
      <QuoteFullForm />
    </div>
  );
}
