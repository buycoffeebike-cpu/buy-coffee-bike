'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const YT = 'https://www.youtube.com';
const RED = '#E31E24';

type Props = {
  /** YouTube video id, e.g. "uVGy63fO6uk" */
  videoId: string;
  /** Descriptive title for the player iframe */
  title: string;
  /** Optional analytics name sent as `video_name` with the `video_play` event */
  trackingName?: string;
  /** Optional short caption shown on the placeholder (e.g. "Full walkthrough · 6:32") */
  caption?: string;
  /** Optional playlist id: the player then shows the series' own next/previous controls */
  playlistId?: string;
  /** Load the player right away (the visitor picked an episode) instead of when it nears the viewport */
  eager?: boolean;
  /** `sizes` for the placeholder thumbnail */
  sizes?: string;
};

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

/**
 * The genuine YouTube player, loaded only as it approaches the viewport: nothing from YouTube is requested on page
 * load, and every play starts from YouTube's own play button, the only kind of playback YouTube counts toward a
 * video's official view count (IFrame Player API reference: "A playback only counts toward a video's official view
 * count if it is initiated via a native play button in the player"). Until the player has loaded, a same-size
 * thumbnail holds the space, so nothing shifts. Place it inside a `position: relative` box with a fixed aspect ratio
 * (e.g. `aspect-video`).
 */
export default function LiteYouTube({ videoId, title, trackingName, caption, playlistId, eager = false, sizes = '(min-width: 1072px) 1024px, calc(100vw - 32px)' }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const reported = useRef<string | null>(null);
  const [origin, setOrigin] = useState<string | null>(null);
  const [near, setNear] = useState(false);
  const [loadedId, setLoadedId] = useState<string | null>(null);

  // Mount the player about one screen before it scrolls into view.
  useEffect(() => {
    setOrigin(window.location.origin);
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '800px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (eager) setNear(true);
  }, [eager]);

  // GA4 `video_play`, once per video, when YouTube reports that it is playing (no YouTube script is loaded for this).
  useEffect(() => {
    if (!near) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== YT || e.source !== frameRef.current?.contentWindow) return;
      let data: unknown = e.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      const msg = data as { event?: string; info?: unknown };
      const state = msg.event === 'onStateChange' ? msg.info : msg.event === 'infoDelivery' ? (msg.info as { playerState?: number } | null)?.playerState : undefined;
      if (state !== 1 || reported.current === videoId) return;
      reported.current = videoId;
      try {
        (window as GtagWindow).gtag?.('event', 'video_play', { video_id: videoId, video_name: trackingName ?? videoId, video_provider: 'youtube' });
      } catch {
        /* analytics must never get in the way of playback */
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [near, videoId, trackingName]);

  const onLoad = () => {
    setLoadedId(videoId);
    // Ask the player to report its state: the lightweight half of the IFrame API protocol.
    try {
      frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: videoId, channel: 'widget' }), YT);
    } catch {
      /* ignore */
    }
  };

  const loaded = loadedId === videoId;
  const params = new URLSearchParams({ rel: '0', playsinline: '1', enablejsapi: '1' });
  if (origin) params.set('origin', origin);
  if (playlistId) params.set('list', playlistId);

  return (
    <div ref={rootRef} className="absolute inset-0">
      <div aria-hidden="true" className={`absolute inset-0 transition-opacity duration-300 ${loaded ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
        <Image src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`} alt="" fill sizes={sizes} className="object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/10" />
        {caption && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white sm:bottom-4 sm:left-4 sm:text-xs">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: RED }} />
            {caption}
          </span>
        )}
      </div>
      {near && origin && (
        <iframe
          ref={frameRef}
          src={`${YT}/embed/${videoId}?${params.toString()}`}
          title={title}
          onLoad={onLoad}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${loaded ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          style={{ border: 0 }}
        />
      )}
    </div>
  );
}
