'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * The full-screen photo view: the whole photo, uncropped, its caption, and a tap anywhere or Escape to close.
 * Its own file so the page loads it only when a photo is opened (7 Nov 2026 speed work), not with the first screen.
 */
export default function Lightbox({ photo, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/95 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={photo.caption} onClick={onClose}>
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" style={{ top: 'max(12px, env(safe-area-inset-top))' }}>
        <X className="h-6 w-6" />
      </button>
      <div className="relative h-[76vh] w-full max-w-5xl">
        <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" priority />
      </div>
      <p className="mt-3 max-w-xl px-2 text-center text-sm font-semibold text-zinc-200">{photo.caption}</p>
    </div>
  );
}
