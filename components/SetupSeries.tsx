'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import LiteYouTube from './LiteYouTube';

const RED = '#E31E24';
export const SETUP_PLAYLIST_ID = 'PLg8jWb4xYCBQkBhPE0QA0hITODiWsIANZ';

/** "How to Set Up Your Coffee Bike", the founder's nine-part owner guide (public on YouTube since 28 Sept 2026). */
const EPISODES = [
  { id: 'GAwWNgJoyXI', title: 'Your Coffee Bike Has Arrived: Delivery, Fees & Next Steps', length: '4:56' },
  { id: 'pimOPt-v7oA', title: 'Collecting Your Coffee Bike: Unpacking & Trailer Loading', length: '1:42' },
  { id: 'BfV5PWfXwWY', title: "What's Included with Your Coffee Bike? Packing List Tour", length: '4:31' },
  { id: 'qRWaH-PdkV8', title: 'Coffee Bike Espresso Machine Installation Walkthrough', length: '5:14' },
  { id: 'snHWS87EP1g', title: 'Coffee Bike Battery Setup: 60V Motor & 12V System', length: '4:20' },
  { id: 'Z3uxu0icofs', title: 'Starting & Riding Your Coffee Bike: Controls and Basics', length: '2:55' },
  { id: 'oaI6rxZ206Y', title: 'Opening Your Coffee Bike: Power, Water & System Checks', length: '5:02' },
  { id: 'zfVv2T7EnJo', title: 'Coffee Bike Maintenance: Daily to Annual Care', length: '2:42' },
  { id: 'KjWtNg45Wrc', title: 'Coffee Bike Owner Support, Training & Next Steps', length: '2:02' },
];

/**
 * One genuine YouTube player plus the episode list: a column beside the player on desktop, a swipeable row under it
 * on phones and tablets. Picking an episode loads it in the player, and the visitor starts it with YouTube's own play
 * button, so every play counts toward the video's views.
 */
export default function SetupSeries() {
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const episode = EPISODES[active];

  const pick = (i: number) => {
    setActive(i);
    setPicked(true);
    // below the desktop layout the list sits under the player: bring the player back into view
    if (window.matchMedia('(max-width: 1023px)').matches) playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
      <div className="lg:col-span-2">
        <div ref={playerRef} className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900 shadow-xl">
          <LiteYouTube
            videoId={episode.id}
            title={`Coffee Bike setup series, episode ${active + 1}: ${episode.title}`}
            playlistId={SETUP_PLAYLIST_ID}
            trackingName={`setup_series_ep_${active + 1}`}
            caption={`Episode ${active + 1} · ${episode.length}`}
            eager={picked}
            sizes="(min-width: 1152px) 752px, (min-width: 1024px) 66vw, calc(100vw - 32px)"
          />
        </div>
        <p className="mt-3 text-sm text-zinc-600" aria-live="polite">
          <span className="font-bold text-zinc-900">
            Episode {active + 1} of {EPISODES.length}:
          </span>{' '}
          {episode.title}
        </p>
      </div>
      <div className="relative">
        <ol
          aria-label="Episodes"
          className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 lg:absolute lg:inset-0 lg:mx-0 lg:flex-col lg:gap-2 lg:overflow-y-auto lg:overflow-x-hidden lg:px-0 lg:pb-0 lg:pr-1"
        >
          {EPISODES.map((e, i) => {
            const on = i === active;
            return (
              <li key={e.id} className="w-[220px] flex-shrink-0 snap-start lg:w-auto">
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-pressed={on}
                  aria-label={`Show episode ${i + 1}: ${e.title}`}
                  className={`flex h-full w-full flex-col gap-2 rounded-lg border bg-white p-2 text-left transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E31E24] lg:flex-row lg:items-center lg:gap-3 ${
                    on ? 'border-[#E31E24] ring-1 ring-[#E31E24]' : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <span className="relative block aspect-video w-full flex-shrink-0 overflow-hidden rounded-md bg-zinc-200 lg:w-32">
                    <Image src={`https://i.ytimg.com/vi/${e.id}/mqdefault.jpg`} alt="" fill sizes="(min-width: 1024px) 128px, 204px" className="object-cover" />
                    <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white">{e.length}</span>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider" style={{ color: RED }}>
                      Episode {i + 1}
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold leading-snug text-zinc-900 line-clamp-2">{e.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
