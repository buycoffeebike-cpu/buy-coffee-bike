/**
 * Regional versions of the sales page. The sales page itself (no variant) is unchanged; a variant swaps only the words
 * that make it a page of its own for search: headline, intro, a few section headings, the owners' order and the FAQ,
 * plus the rules for that market.
 *
 * US (founder, 29–30 Sept 2026): "mobile coffee cart" / "coffee cart for sale" for US buyers; the original sales page
 * with its configurator; prices as "about US$15,850" for a ready-to-serve espresso build (never "from"); no financing
 * anywhere (iFinance serves Canadian residents only and no US lender has signed); owner reviews word for word.
 */

const US_URL = 'https://coffeebike.ca/buy-a-mobile-coffee-bike/mobile-coffee-cart';

/** US FAQ: the sales page's own answers, US-first, without financing lines or "from" prices, plus the US questions. */
function usFaqs(base) {
  const by = Object.fromEntries(base.map((f) => [f.q, f]));
  const take = (q) => { if (!by[q]) throw new Error(`sales page FAQ changed: "${q}" not found`); return by[q]; };
  const edit = (q, fn) => { const f = take(q); return { ...f, sections: fn(f.sections || []) }; };
  return [
    {
      q: 'What is a mobile coffee cart?',
      sections: [
        { label: 'A Coffee Bar on Wheels', text: 'A mobile coffee cart is a self-contained coffee bar on wheels: an espresso machine and grinder, water tanks and sinks, refrigeration and power, built so you can serve specialty coffee at markets, events and offices without a storefront.' },
        { label: 'The Kinds You Will Find in the US', text: 'Push carts, towed carts and trailers, coffee trucks and vans, and coffee bikes, also called coffee trikes or bicycle coffee carts. The Coffee Bike is the kind you ride: the whole espresso bar is built onto an electric cargo bike, so there is no tow vehicle, no truck parking and no gas to drive it.' },
      ],
    },
    {
      q: 'How much does a mobile coffee cart cost?',
      sections: [
        { label: 'A Ready-to-Serve Coffee Bike', text: 'Most US owners invest about US$15,850 for a ready-to-serve espresso build: the bike, branded body and canopy, sinks, fridge, batteries and a Fracino single-group espresso setup, before tax.' },
        { label: 'What Changes the Price', text: 'A double-group setup, UL certification, branding and add-ons. The configurator on this page shows your price as you build, and shipping is quoted for your address before you confirm your order.' },
        { label: 'Compared With Other Options', text: 'Espresso carts from other makers often cost about US$8,000–25,000 once an espresso machine and grinder are added, and they still need a vehicle or trailer to move them. New coffee trucks often cost US$55,000–150,000.' },
      ],
    },
    edit('Coffee Bike vs. a coffee cart for sale: what is the difference?', (s) => s.map((x) => (x.label === 'Lower Total Cost'
      ? { label: 'Lower Running Costs', text: 'No tow vehicle, no truck parking and no gas to drive it. Charging costs about a dollar a day (our estimate), and the bike rolls indoors in winter.' }
      : x))),
    take('Is a Coffee Bike a coffee trike, an espresso cart or a mobile coffee cart?'),
    take('Do you sell and ship Coffee Bikes in the USA?'),
    edit('Do I need any permits to operate my Coffee Bike, and where can I operate?', (s) => [
      ...s.slice(0, 1),
      { label: 'In the US', text: 'Most health departments review your setup (sinks, water, food-safe surfaces) and inspect it before you open, and many ask for a commissary or approved base. Permits often take 60–90 days, so owners apply while their bike is being built.' },
      ...s.slice(1),
    ]),
    take('How long does it take to get my Coffee Bike?'),
    take('Is Coffee Bike a franchise? What\'s the catch?'),
    {
      q: 'Can a mobile coffee cart run without an electrical hookup?',
      sections: [
        { label: 'Yes', text: 'The Fracino espresso machine runs on propane outdoors and on a standard outlet indoors, and the batteries, 2,000 W inverter and 200 W solar roof power the rest of the bike.' },
      ],
    },
    take('What about winter and cold seasons? Can I really operate year-round?'),
    take('What can I sell from my Coffee Bike?'),
    take('Does my Coffee Bike have any warranty? What happens if something breaks down?'),
    take('Do you provide any training?'),
    take('What is the purchasing process, and what payment methods do you accept?'),
    take('What is the Coffee Bike World community and is it mandatory to be part of it?'),
    take('How much can I realistically earn with a Coffee Bike?'),
    take('Can I purchase territory rights or become a distributor for the entire region or country?'),
  ];
}

export const VARIANTS = {
  us: {
    key: 'us',
    url: US_URL,
    eyebrow: 'Delivered anywhere in the US',
    h1: 'Mobile Coffee Cart for Sale in the USA — the Electric Coffee Bike, Delivered to Your Door',
    heroText: 'A commercial espresso bar on an electric cargo bike: the mobile coffee cart you can ride to markets, events and offices. Custom-branded and delivered anywhere in the US. No franchise fees. You own everything.',
    priceLine: 'About US$15,850 for a ready-to-serve espresso build, before tax. Shipping quoted to your address.',
    whyTitle: 'Why US Buyers Choose a Coffee Bike Over a Coffee Cart',
    whySub: 'A turnkey mobile coffee business with low overhead, a lower startup cost than a coffee truck or trailer, and full ownership. No franchise fees, no royalties.',
    lowEntryDesc: 'About US$15,850 for a ready-to-serve espresso build, a fraction of a coffee truck or a storefront café.',
    shipTitle: 'Fully Brandable, Delivered Across the US',
    shipDesc: 'Custom Pantone colors, your logo, your vibe. Every Coffee Bike is crated, insured and tracked to your door anywhere in the US.',
    ownersTitle: 'Coffee Bike Owners in the US and Worldwide',
    ownersSub: 'Hear from owners in Florida, Arizona, Oregon and California, and from Canada to Peru.',
    ownersFirst: ['Lithia, FL', 'Tempe, AZ', 'Portland, OR', 'Lawndale, CA'],
    hideFinancing: true,
    buildCost: 15850,
    usSection: true,
    faqs: usFaqs,
  },
};

/** Owners from the listed places first (in that order), then everyone else in the sales page's order. */
export function ownersFirst(list, places) {
  const rank = (t) => { const i = places.indexOf(t.loc); return i === -1 ? places.length : i; };
  return [...list].map((t, i) => ({ t, i })).sort((a, b) => rank(a.t) - rank(b.t) || a.i - b.i).map((x) => x.t);
}
