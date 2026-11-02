"use client";
/**
 * The financing banner: one small monthly number to hook a price-shocked visitor, the lender, and the way in.
 *
 * Vlad, 1 Nov 2026: "we just want to hook attention with relatively small monthly payments", "US starting from 299 and
 * for Canada starting from 475 CAD", "don't mention example", "make the entire financing section more nice looking with
 * some graphic banners". The numbers are arithmetic on the average build, never a lender's quote: US$20,000 with 10%
 * down over 84 months at 10% = US$299; CA$30,000 over 84 months at 8.5% APR = CA$475. Canadian cost-of-credit rules want
 * the term and APR next to any payment amount, so the small line under the number carries them, without the word
 * "example". "On approved credit" stays on every mention (landing-page rules). The lender's link follows the lead
 * (Astra, 31 Oct 2026), so the button goes to the build or the quote form, never to the lender.
 */
import Image from "next/image";
import { Calendar, Percent, ShieldCheck } from "lucide-react";

const RED = "#E31E24";
const PHOTO = {
  // the Vol. 2 studio shot cut out to a transparent PNG (1 Nov 2026), so the dark card has no grey box; the base path is spelled
  // out because the image optimizer fetches the file from the site root (a bare "/financing-bike.png" came back as a 404 page)
  src: "/buy-a-mobile-coffee-bike/financing-bike.png",
  alt: "Coffee Bike Vol. 2, customer side, canopy open",
};

export const FINANCING = {
  us: {
    from: "US$299",
    lender: "Equinox Funding",
    line: "Financing from US$299/month (84 months) through Equinox Funding, on approved credit.",
    short: "Financing from US$299/month (84 months), on approved credit.",
    points: [
      { icon: Calendar, t: "Terms up to 84 months" },
      { icon: Percent, t: "Business equipment lease" },
      { icon: ShieldCheck, t: "On approved credit" },
    ],
    basis: "Based on US$18,000 financed over 84 months at 10%, on approved credit. Your rate and term are set by Equinox Funding.",
  },
  ca: {
    from: "CA$475",
    lender: "iFinance",
    line: "Financing from CA$475/month (84 months, 8.5% APR) through iFinance, on approved credit.",
    short: "Financing from CA$475/month (84 months, 8.5% APR), on approved credit.",
    points: [
      { icon: Calendar, t: "Terms up to 84 months" },
      { icon: Percent, t: "No down payment" },
      { icon: ShieldCheck, t: "On approved credit" },
    ],
    basis: "Based on CA$30,000 financed over 84 months at 8.5% APR, on approved credit. Your rate and term are set by iFinance.",
  },
};

/** The big number with its "/month": the one thing the eye lands on. */
export function FinancingFigure({ market, className = "", size = "lg" }) {
  const F = FINANCING[market] ?? FINANCING.us;
  const big = size === "lg" ? "text-[44px] sm:text-6xl" : "text-3xl sm:text-4xl";
  return (
    <div className={`flex flex-wrap items-baseline gap-x-2 ${className}`}>
      <span className="text-sm font-bold uppercase tracking-wider text-zinc-400">from</span>
      <span className="whitespace-nowrap">
        <span className={`${big} font-extrabold leading-none tracking-tight tabular-nums text-white`}>{F.from}</span>
        <span className="ml-1.5 text-lg font-bold text-zinc-300">/month</span>
      </span>
    </div>
  );
}

/**
 * The full banner. `cta` is the page's own button (the sales page opens its financing sheet, the /start pages open the
 * quote form), so the banner never decides where a lead goes. `heading` keeps the sales page's h3 in place.
 */
export default function FinancingBanner({ market = "us", heading = null, cta = null, altLine = null, className = "" }) {
  const F = FINANCING[market] ?? FINANCING.us;
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-zinc-950 text-white ${className}`}>
      {/* the bike, bleeding in from the right; a soft red glow behind it so the dark card is not flat */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block" aria-hidden="true">
        <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, rgba(227,30,36,0.35), transparent)" }} />
        <Image src={PHOTO.src} alt="" fill sizes="(min-width: 768px) 40vw, 0px" className="object-contain object-center p-5" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
      </div>
      <div className="absolute left-0 top-0 h-full w-1.5" style={{ backgroundColor: RED }} aria-hidden="true" />

      <div className="relative px-6 py-7 sm:px-8 sm:py-8 md:w-[58%]">
        <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: RED }}>Financing</p>
        {heading ? <h3 className="mt-1.5 text-xl font-bold leading-tight sm:text-2xl">{heading}</h3> : null}
        <FinancingFigure market={market} className="mt-3" />
        <p className="mt-2 text-[15px] text-zinc-300">through {F.lender}, on approved credit</p>
        {altLine ? <p className="mt-1 text-[13px] text-zinc-500">{altLine}</p> : null}

        <ul className="mt-5 flex flex-wrap gap-2">
          {F.points.map(({ icon: Icon, t }) => (
            <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[13px] font-semibold text-zinc-100">
              <Icon className="h-3.5 w-3.5" style={{ color: RED }} aria-hidden="true" />{t}
            </li>
          ))}
        </ul>

        {cta ? <div className="mt-6">{cta}</div> : null}
        <p className="mt-4 text-[11px] leading-snug text-zinc-500">{F.basis}</p>
      </div>

      {/* on phones the photo sits under the words instead of beside them */}
      <div className="relative -mb-1 h-48 md:hidden" aria-hidden="true">
        <Image src={PHOTO.src} alt="" fill sizes="100vw" className="object-contain object-center px-6 pb-3" />
      </div>
    </div>
  );
}
