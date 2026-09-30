import { Check, FileText, MapPin, Truck } from 'lucide-react';
import { SPEC_SHEET } from '../app/start/content';

/**
 * The US page's own section (in the sales page's look): what a mobile coffee cart is and what to look for in one, then
 * selling one in the US: permits, delivery and the two sink layouts. (The sales page's own "Coffee Bike vs. The
 * Alternatives" table covers the comparison.)
 */
export default function UsCartSection({ red, tint }) {
  const Eyebrow = ({ children }) => (
    <div className="inline-block text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 mb-3" style={{ backgroundColor: red }}>{children}</div>
  );
  return (
    <>
      <section id="mobile-coffee-cart" className="py-12 px-6 bg-zinc-50 border-y border-zinc-200" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            <div>
              <Eyebrow>The Basics</Eyebrow>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Is a Mobile Coffee Cart?</h2>
              <div className="space-y-4 text-zinc-700 leading-relaxed">
                <p>A mobile coffee cart is a self-contained coffee bar on wheels: an espresso machine and grinder, water tanks and sinks, refrigeration and power, built so you can serve specialty coffee at markets, events and offices without a storefront.</p>
                <p>In the US you will find push carts, towed carts and trailers, coffee trucks and vans, and coffee bikes, also called coffee trikes or bicycle coffee carts. The Coffee Bike is the kind you ride: the whole espresso bar is built onto an electric cargo bike, so you ride to your spot, open the canopy and start serving in minutes, with no tow vehicle, no truck parking and no gas to drive it.</p>
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-lg p-5 sm:p-6">
              <h3 className="text-lg font-bold mb-3">What to Look For in Any Espresso Cart</h3>
              <ul className="space-y-2.5 text-sm text-zinc-700 leading-relaxed">
                {[
                  ['A commercial espresso machine', 'that keeps up with a line; the Coffee Bike serves about 60–100 drinks an hour.'],
                  ['Sinks and water your health department accepts', 'fresh and waste tanks, hot and cold water, food-safe surfaces.'],
                  ['Power for a full day', 'propane or a standard outlet for the machine, batteries for the rest.'],
                  ['A way to move it', 'push, tow, drive or ride, and a place to store it overnight.'],
                  ['Branding that sells', 'your name and colors on the body, canopy and sign.'],
                ].map(([t, d]) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="w-5 h-5 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: tint }}><Check className="w-3 h-3" style={{ color: red }} strokeWidth={3} /></span>
                    <span><strong className="text-zinc-900">{t}:</strong> {d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      <section id="selling-in-the-us" className="py-12 px-6 bg-white" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Eyebrow>Selling in the US</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Permits and Delivery for a Mobile Coffee Cart in the US</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">Every city and county sets its own rules, so here is how US owners get from order to opening day.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="border border-zinc-200 rounded-lg p-5">
              <MapPin className="w-6 h-6 mb-3" style={{ color: red }} />
              <h3 className="font-bold mb-2">Permits</h3>
              <p className="text-sm text-zinc-700 leading-relaxed">Start with your local health department. Most review your setup (sinks, water, food-safe surfaces) and inspect it before you open, and many ask for a commissary or approved base. Permits often take 60–90 days, so owners apply while their bike is being built. You can vend on private property with a landlord, market or venue, or in public space where your city issues mobile vending permits.</p>
            </div>
            <div className="border border-zinc-200 rounded-lg p-5">
              <Truck className="w-6 h-6 mb-3" style={{ color: red }} />
              <h3 className="font-bold mb-2">Delivered to Your Door</h3>
              <p className="text-sm text-zinc-700 leading-relaxed">Anywhere in the US. Every Coffee Bike is crated, palletized, insured and tracked to your door, and we quote shipping before you confirm your order. Building takes about 4–6 weeks, then delivery about 2–4 weeks. Owners already run Coffee Bikes in Florida, Arizona, Oregon and California.</p>
            </div>
            <div className="border border-zinc-200 rounded-lg p-5">
              <FileText className="w-6 h-6 mb-3" style={{ color: red }} />
              <h3 className="font-bold mb-2">For Your Health Department</h3>
              <p className="text-sm text-zinc-700 leading-relaxed">The Classic has a 3-compartment sink with a pitcher rinser and knock box. The CMFO layout (Compact Mobile Food Operation) has a handwashing sink with a separate pitcher rinser and knock box, for health departments that ask for it. The specification and health inquiry package describes the layout, water system, surfaces and equipment.</p>
              <a href={SPEC_SHEET} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold underline underline-offset-4" style={{ color: red }}>Download the package (PDF)</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
