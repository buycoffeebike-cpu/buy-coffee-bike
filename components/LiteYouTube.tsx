'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

const RED = '#E31E24';

type Props = {
  /** YouTube video id, e.g. "uVGy63fO6uk" */
  videoId: string;
  /** Descriptive title for the embedded player iframe */
  title: string;
  /** Accessible label for the play button */
  playLabel: string;
  /** Optional analytics name sent as `video_name` with the `video_play` event */
  trackingName?: string;
  /** Optional short caption shown on the facade (e.g. "Full walkthrough · 6:32") */
  caption?: string;
};

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

/**
 * Lightweight YouTube facade. Renders only a lazy thumbnail and a play button
 * until the visitor explicitly presses Play; only then is the genuine YouTube
 * embedded player created, so plays are attributed to the original video and
 * nothing from youtube.com is loaded during the initial page load.
 *
 * Must be placed inside a `position: relative` container with a fixed aspect
 * ratio (e.g. `aspect-video`); both states fill that container, so swapping the
 * facade for the player causes no layout shift.
 */
export default function LiteYouTube({ videoId, title, playLabel, trackingName, caption }: Props) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  const play = () => {
    setPlaying(true);
    try {
      const w = window as GtagWindow;
      if (typeof w.gtag === 'function') {
        w.gtag('event', 'video_play', {
          video_id: videoId,
          video_name: trackingName ?? videoId,
          video_provider: 'youtube',
        });
      }
    } catch {
      /* analytics must never block playback */
    }
  };

  if (playing) {
    return (
      <iframe
        ref={frameRef}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={play}
      aria-label={playLabel}
      className="group absolute inset-0 block h-full w-full cursor-pointer overflow-hidden text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white"
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        fill
        sizes="(min-width: 1072px) 1024px, calc(100vw - 48px)"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/10" />
      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex h-20 w-20 items-center justify-center rounded-full shadow-2xl ring-4 ring-white/25 transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105 sm:h-24 sm:w-24"
          style={{ backgroundColor: RED }}
        >
          <Play className="ml-1 h-9 w-9 text-white sm:h-11 sm:w-11" fill="currentColor" strokeWidth={0} />
        </span>
      </span>
      {caption && (
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white sm:bottom-4 sm:left-4 sm:text-xs"
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: RED }} />
          {caption}
        </span>
      )}
    </button>
  );
}
