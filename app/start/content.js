// Content for the Google Ads landing page (/start and /start/<intent>). Every claim here is either on the main
// sales page already (prices, warranty, testimonials, process) or sourced in COMPARE_SOURCES. No income claims.

export const IMG = (p) => `https://coffeebike.ca/wp-content/uploads/${p}`;

export const LOGO = IMG('2025/04/cofee_bike_logo_rwhite_transparent.png');
export const HERO = IMG('2026/05/open-ready.jpg.jpg');
// the bike at work: a sidewalk queue in Gastown, a branded fleet, owners with their own bikes, winter service
export const PHOTOS = {
  queue: { src: IMG('2025/05/Oak-scaled.jpg'), w: 2560, h: 1920, alt: 'A line of customers waiting at a Coffee Bike on a Gastown sidewalk in Vancouver' },
  fleet: { src: IMG('2026/08/Coffee-Bike-14-scaled.jpg'), w: 1920, h: 2560, alt: 'Four branded Coffee Bikes and their baristas lined up in a city plaza' },
  levis: { src: IMG('2025/05/Coffee-Bike-Levis-scaled.jpg'), w: 1920, h: 2560, alt: 'A Levi’s-branded Coffee Bike serving inside a store' },
  liudmyla: { src: IMG('2025/05/Liudmyla-Alberta-Canada-scaled.jpg'), w: 1920, h: 2560, alt: 'Owner Liudmyla with her Coffee Bike espresso bar in Alberta' },
  sanam: { src: IMG('2025/05/Sanam-Vancouver-Canada-scaled.jpg'), w: 1920, h: 2560, alt: 'A yellow Coffee Bike branded for a Vancouver muffin shop' },
  mejuri: { src: IMG('2025/05/Mejuri-scaled.jpg'), w: 1920, h: 2560, alt: 'A Coffee Bike wrapped in Mejuri branding' },
  winter: { src: IMG('2025/04/31460c_a30ce38454644023af6d930ff0e58c6emv2.avif'), w: 1056, h: 1056, alt: 'A Coffee Bike serving at a snowy holiday market' },
  ride: { src: IMG('2025/05/20210714_100145-scaled.jpg'), w: 1920, h: 2560, alt: 'Riding a Coffee Bike along the Vancouver seawall' },
};
export const FOUNDER = IMG('2025/05/Mobile-Espresso-Bar-scaled.jpeg');
export const DRAGONS = IMG('2026/05/Dragons-Den-2.png');
export const SPEC_SHEET = IMG('2026/05/Coffee_Bike_Vol_2_Specifications.pdf');

export const QUOTE_FORM_ID = 'xnay3GGsJKCfqhvw55Yx';
export const QUOTE_FORM_URL = `https://link.coffeebike.ca/widget/form/${QUOTE_FORM_ID}`;
export const CALL_URL = 'https://link.coffeebike.ca/widget/bookings/coffeebike';
export const DEPOSIT_URL = 'https://buy.stripe.com/cNibJ31nd3QeczHfjnaVa07';
export const FINANCING_URL = 'https://apply.ifinancecanada.com/23545';
export const WALKTHROUGH_ID = 'uVGy63fO6uk';

// Google Ads: account tag and the conversion this page fires when the quote form is sent
export const ADS_TAG = 'AW-369959194';
export const ADS_CONVERSION = 'AW-369959194/fgpSCMzoj4kdEJrCtLAB';

/** The Coffee Bike OS stores each request, then creates the GoHighLevel contact and Bike Sales opportunity. */
export const LEAD_API = process.env.NEXT_PUBLIC_LEAD_API || 'https://coffee-bike-os.vercel.app/api/v1/web/bike-inquiry';
export const PHONE = { tel: '+17786558631', label: '+1 778 655 8631' };
export const EMAIL = 'coffeebike@vladvik.com';
export const ADDRESS = '1356 Frances St, Vancouver, BC V5L 1Y9';

/**
 * Prices by market (founder, 28 Sept 2026): Canadian visitors see Canadian dollars anchored on a typical build of
 * about CA$25,000, US visitors US dollars anchored on about US$15,850. Never a "from" price.
 */
export const MARKETS = {
  us: {
    key: "us",
    base: "/start",
    typical: "US$15,850",
    heroPrice: "About US$15,850",
    heroPriceNote: "for a ready-to-serve espresso build, before tax and shipping",
    sticky: { k: "Typical build", v: "US$15,850" },
    fitLine: "Most US owners invest about US$15,850 for a ready-to-serve espresso build, before tax and shipping. Your final price depends on your build.",
    fit: [
      { v: "fits", t: "Yes, that works" },
      { v: "finance", t: "Yes, with financing", d: "Help me find financing" },
      { v: "smaller", t: "I need a smaller build" },
      { v: "unsure", t: "Not sure yet" },
    ],
    thanksPrice: "A ready-to-serve espresso build is about US$15,850.",
    thanksNote: "Your quote adds your options, shipping and any duties for your address.",
    phonePlaceholder: "+1 555 555 0123",
    cityPlaceholder: "e.g. Austin, TX",
    ownersFirst: ["Portland, OR", "Lithia, FL", "Lawndale, CA", "Tempe, AZ"],
  },
  ca: {
    key: "ca",
    base: "/start/ca",
    typical: "CA$25,000",
    heroPrice: "About CA$25,000",
    heroPriceNote: "for a typical Canadian build, depending on your final build. Taxes extra",
    sticky: { k: "Typical build", v: "CA$25,000" },
    fitLine: "Most Canadian owners invest about CA$25,000, depending on the final build. Taxes are extra and shipping is quoted for your address.",
    fit: [
      { v: "fits", t: "Yes, that works" },
      { v: "finance", t: "Yes, with financing", d: "Through iFinance, on approved credit" },
      { v: "smaller", t: "I need a smaller build" },
      { v: "unsure", t: "Not sure yet" },
    ],
    thanksPrice: "Most Canadian owners invest about CA$25,000, depending on the final build.",
    thanksNote: "Your quote adds your options, taxes and shipping to your address.",
    phonePlaceholder: "+1 604 555 0123",
    cityPlaceholder: "e.g. Calgary, AB",
    ownersFirst: ["Barrie, ON", "Edmonton, AB", "Swan River, MB", "Vancouver, BC"],
  },
};

/**
 * One headline per search intent, so the page answers what the visitor typed (message match). The ad group's final
 * URL picks the intent: /start (coffee bike), /start/cart, /start/truck, /start/van, /start/trailer, /start/start,
 * /start/franchise, /start/compare.
 */
export const INTENTS = {
  bike: {
    eyebrow: 'Buy a Coffee Bike',
    h1: 'Your own espresso bar, on three wheels',
    sub: 'A commercial espresso bar built onto an electric cargo bike, branded with your name and delivered to your door in Canada and the US. No lease, no franchise fees. You own it outright.',
    compare: 'truck',
    title: 'Buy a Coffee Bike: your own mobile espresso bar',
  },
  cart: {
    eyebrow: 'Looking at coffee carts?',
    h1: 'The coffee cart you can ride to the crowd',
    sub: 'A commercial espresso bar on an electric bike. Set up in minutes, move when the crowd moves, and roll indoors when the weather turns. Branded as yours and delivered to your door.',
    compare: 'cart',
    title: 'A coffee cart you can ride: the Coffee Bike',
  },
  truck: {
    eyebrow: 'Shopping for a coffee truck?',
    h1: 'Start where a coffee truck would, for a fraction of the cost',
    sub: 'The same espresso drinks from an electric coffee bike: no fuel, no tow vehicle, no truck parking. It goes where trucks can’t, including plazas, markets and office lobbies. Branded as yours and delivered to your door.',
    compare: 'truck',
    title: 'The coffee truck alternative: the Coffee Bike',
  },
  van: {
    eyebrow: 'Shopping for a coffee van?',
    h1: 'A mobile coffee business without the van',
    sub: 'A commercial espresso bar on an electric bike: no fuel, no van insurance, no parking hunt. It goes where vans can’t, including plazas, markets and office lobbies. Branded as yours and delivered to your door.',
    compare: 'truck',
    title: 'The coffee van alternative: the Coffee Bike',
  },
  trailer: {
    eyebrow: 'Comparing coffee trailers?',
    h1: 'No trailer to tow. Just ride in and open.',
    sub: 'A commercial espresso bar on an electric bike that needs no tow vehicle and fits where trailers don’t: sidewalks, plazas, markets and lobbies. Branded as yours and delivered to your door.',
    compare: 'trailer',
    title: 'The coffee trailer alternative: the Coffee Bike',
  },
  start: {
    eyebrow: 'Starting a mobile coffee business?',
    h1: 'Start your coffee business without a lease, a truck or a franchise',
    sub: 'Everything you need to serve specialty coffee on day one, on an electric bike you can take to markets, events and office lobbies. Manual, setup videos and an owners’ community included.',
    compare: 'cafe',
    title: 'Start a mobile coffee business with a Coffee Bike',
  },
  franchise: {
    eyebrow: 'Looking at coffee franchises?',
    h1: 'Own your coffee business. No franchise fees. No royalties.',
    sub: 'Buy the bike, build your own brand and keep your revenue. A commercial espresso bar on an electric bike, delivered to your door in Canada and the US.',
    compare: 'cafe',
    title: 'A coffee business with no franchise fees: the Coffee Bike',
  },
  compare: {
    eyebrow: 'Comparing coffee bikes?',
    h1: 'See exactly what’s inside a Coffee Bike',
    sub: 'Fracino UK dual-fuel espresso machine, commercial sinks and fridge, hydraulic brakes, a motor that climbs hills fully loaded, and a UL-certified option for the US and Canada. Refined over 8+ years of running our own.',
    compare: 'truck',
    title: 'Coffee Bike: what’s inside, what it costs',
  },
};
export const INTENT_KEYS = Object.keys(INTENTS);

/** Title, description and canonical for one market × intent page; every one stays out of organic search. */
export function pageMeta(market, intent) {
  const I = INTENTS[intent];
  const path = `${MARKETS[market].base}${intent === 'bike' ? '' : `/${intent}`}`;
  return {
    title: `${I.title} | Coffee Bike World`,
    description: I.sub,
    robots: { index: false, follow: true },
    alternates: { canonical: `https://coffeebike.ca/buy-a-mobile-coffee-bike${path}` },
  };
}

export const TRUST = [
  { k: 'Bikes sold', v: '49', d: 'to 36 owners' },
  { k: 'As seen on', v: 'Dragons’ Den', d: 'CBC' },
  { k: 'Running our own', v: '8+ years', d: '1.5M+ cups served' },
  { k: 'Warranty', v: '1 year', d: 'parts via owners’ portal' },
];

/** From the Coffee Bike Vol. 2 specification and health inquiry package (the PDF linked on the page). */
export const SPECS = [
  { k: 'Body', v: '120 × 90 cm (47 × 35 in), 151 cm tall closed' },
  { k: 'Payload', v: 'About 200–300 kg (440–660 lb)' },
  { k: 'Motor', v: '500, 750 or 1,250 W to suit local rules; pedal assist and throttle' },
  { k: 'Water', v: 'Fresh 50 L, waste 60 L, hot and cold on demand; tanks can be resized' },
  { k: 'Power', v: '2,000 W inverter, smart chargers, 200 W solar roof; switches to shore power' },
  { k: 'Output', v: 'About 60–100 drinks an hour, depending on menu and barista' },
];

/**
 * Coffee Bike against what visitors searched for. Ranges are typical new prices in North America; the sources are
 * listed under the table. `pick` highlights the column matching the visitor's intent.
 */
export const COMPARE_COLS = [
  { key: 'bike', label: 'Coffee Bike' },
  { key: 'truck', label: 'Coffee truck or van' },
  { key: 'trailer', label: 'Coffee trailer' },
  { key: 'cart', label: 'Coffee cart' },
  { key: 'cafe', label: 'Café storefront' },
];
// Money rows by market: the Canadian page shows Canadian dollars (converted from the US sources at about 1.37)
const MONEY_ROWS = {
  us: [
    {
      label: 'Typical cost to start',
      bike: 'About US$15,850 for a ready-to-serve espresso build',
      truck: 'New builds often US$55,000–150,000; used coffee trucks around US$64,000',
      trailer: 'New US$21,000–80,000 equipped; used around US$33,000. Plus a vehicle to tow it',
      cart: 'About US$8,000–25,000 once an espresso machine and grinder are added',
      cafe: 'Kiosks often US$50,000–150,000; full cafés much more',
    },
    {
      label: 'Running costs',
      bike: 'No gas for driving it and no commercial auto policy. Charging costs about a dollar a day',
      truck: 'Fuel and maintenance US$500–1,000 a month; commercial auto insurance about US$2,500 a year',
      trailer: 'A tow vehicle, generator fuel and a place to store it',
      cart: 'A vehicle or trailer to haul it between spots',
      cafe: 'Rent, utilities and staff every month',
    },
  ],
  ca: [
    {
      label: 'Typical cost to start',
      bike: 'About CA$25,000 for a typical build',
      truck: 'New builds often CA$75,000–205,000; used coffee trucks around CA$88,000',
      trailer: 'New CA$29,000–110,000 equipped; used around CA$45,000. Plus a vehicle to tow it',
      cart: 'About CA$11,000–34,000 once an espresso machine and grinder are added',
      cafe: 'Kiosks often CA$70,000–205,000; full cafés much more',
    },
    {
      label: 'Running costs',
      bike: 'No gas for driving it and no commercial auto policy. Charging costs about a dollar a day',
      truck: 'Fuel and maintenance CA$700–1,400 a month; commercial auto insurance about CA$3,400 a year',
      trailer: 'A tow vehicle, generator fuel and a place to store it',
      cart: 'A vehicle or trailer to haul it between spots',
      cafe: 'Rent, utilities and staff every month',
    },
  ],
};
export const compareRows = (market) => [...MONEY_ROWS[market], ...COMPARE_ROWS];
export const COMPARE_ROWS = [
  {
    label: 'To move it',
    bike: 'Ride it: electric motor and pedals',
    truck: 'Fuel, commercial insurance and truck parking',
    trailer: 'A tow vehicle and somewhere to store it',
    cart: 'A vehicle or trailer to haul it',
    cafe: 'It doesn’t move',
  },
  {
    label: 'Where it can serve',
    bike: 'Markets, events, plazas, campuses and indoor lobbies',
    truck: 'Streets and lots with room to park',
    trailer: 'Lots and events with room to park',
    cart: 'Events and indoor spaces',
    cafe: 'One address',
  },
  {
    label: 'When it’s cold',
    bike: 'Rolls indoors and runs off a standard outlet',
    truck: 'Stays outside',
    trailer: 'Stays outside',
    cart: 'Indoors if it fits and can be moved in',
    cafe: 'Indoors',
  },
  {
    label: 'Time to open for the day',
    bike: 'Minutes: ride in, open the canopy, serve',
    truck: 'Find parking, set up, serve',
    trailer: 'Tow, park, level, hook up, serve',
    cart: 'Haul, unload, set up, serve',
    cafe: 'Always open, always paying rent',
  },
];
export const COMPARE_NOTE =
  'Typical North American prices, September 2026: new trucks from Zion Food Trucks and Square (2025); used trucks and trailers are median asking prices on UsedVending; new trailers from Cedar Trailer and Hudson Trailer Co.; carts from Klassy Kart and Coffee Machine Depot; kiosks from StartCosts; running costs from Square and Insureon. Every option needs local permits. Bike charging is our estimate at typical electricity rates.';
export const compareNote = (market) => (market === 'ca' ? `${COMPARE_NOTE} Other options converted from US prices at about 1.37 Canadian dollars to the US dollar.` : COMPARE_NOTE);

export const FEATURES = [
  { title: 'Commercial espresso, dual fuel', text: 'Fracino UK espresso machine that runs on propane outside and on a standard outlet indoors. Single or double group.', img: IMG('2026/05/dual-fuel-commercial-espresso.jpg.jpg') },
  { title: 'A motor that climbs hills loaded', text: 'Electric-assist cargo bike with twin hydraulic brakes and front and rear suspension.', img: IMG('2026/05/powerful-e-bike-motor.jpg.jpg') },
  { title: 'Sinks, plumbing and a fridge', text: '3-compartment sink with pitcher rinser and knock box (or a handwashing layout), complete plumbing and slide-out refrigeration.', img: IMG('2026/05/slide-out-refrigeration.jpg.jpg') },
  { title: 'Your brand, lit up', text: 'Fully brandable body and canopy with custom LED signage. Your name, your colours.', img: IMG('2026/05/custom-led-signage.jpg.jpg') },
  { title: 'Batteries and storage built in', text: 'Integrated battery system with storage. One pack covers about 10–15 km; two about 20–30 km.', img: IMG('2026/05/integrated-battery-system-storage.jpg.jpg') },
  { title: 'Ready to work on arrival', text: 'Delivered fully assembled, crated and insured, with a 20+ page barista manual and setup videos.', img: IMG('2026/05/fully-brandable-compact-build.jpg.jpg') },
];

export const OWNERS = [
  { name: 'Davina', place: 'Portland, OR', biz: 'Dibina Coffee', img: IMG('2026/05/Dibina.png'), quote: 'I already had a coffee cart, and the Coffee Bike became the next chapter… The mobility is what makes it. I can take my flavors to the events and neighborhoods where they resonate.' },
  { name: 'Shaun', place: 'Barrie, ON', biz: 'Banana Cafe Bike', img: IMG('2026/05/Banana.png'), quote: 'Two bikes in and counting. We got nominated for a local entrepreneurial award this year, and we’re catering for clients like Tesla… the team behind the bike is responsive every time I need them.' },
  { name: 'Tom', place: 'Lithia, FL', biz: 'Monkeynuts Cafe', img: IMG('2026/05/Monkeynuts.png'), quote: 'I’m retired and I wanted something that kept me moving, kept me social, and earned a little on the side. The Coffee Bike checks every box… Got a steady event circuit going now and the locals know me.' },
  { name: 'Ludmila', place: 'Edmonton, AB', biz: 'SIP Espresso Bar', img: IMG('2026/05/SIP.png'), quote: 'I still keep my day job and run this on the side — it’s genuinely possible to do both if you’re organized. The bike makes it work.' },
  { name: 'Chris', place: 'Lawndale, CA', biz: 'Ampelos Coffee', img: IMG('2026/05/Ampelos.png'), quote: 'I went all in — three bikes from day one. We’re building Ampelos Coffee as a brand, not a single cart… the build quality holds up to what we’re going for.' },
  { name: 'Anais', place: 'Tempe, AZ', biz: 'Lucy’s Coffee Express', img: IMG('2026/05/Lucys.png'), quote: 'There were real challenges getting started — permits, location, building a customer base from zero. What kept me going was Vlad and the Coffee Bike team actually answering when I called.' },
  { name: 'Jeremy', place: 'Swan River, MB', biz: 'Swan Valley Coffee Roasters', img: IMG('2026/05/Swan-river.png'), quote: 'Farmers markets, community events, the local hockey rink — people are excited about real coffee. The bike gives me a way to bring that to them without needing a downtown storefront.' },
  { name: 'Colby', place: 'Vancouver, BC', biz: 'Cafe Racer Coffee Bike', img: IMG('2026/05/Racer.png'), quote: 'I have a corporate 9-to-5 and two boys in soccer, so a brick-and-mortar was never going to work for my life. The Coffee Bike fits perfectly — I run it at my sons’ Saturday games and farmers markets on Sundays.' },
];

/** What a typical build includes (the base package plus the single-group espresso setup most owners choose). */
export const INCLUDED = [
  'Electric cargo bike: motor, hydraulic brakes, front and rear suspension',
  'Branded body and canopy in your name and colours',
  'Fracino UK dual-fuel espresso machine and a full set of barista appliances',
  '3-compartment sink, plumbing and a fridge',
  'Batteries, inverter and smart chargers',
  'Barista manual, setup videos and the owners’ community',
  '1-year manufacturer warranty',
];

/** The price section by market. The US lists option prices from the price list; Canada quotes every build in CAD. */
export const PRICING = {
  us: {
    big: 'US$15,850',
    lead: 'About US$15,850',
    leadNote: 'for a ready-to-serve espresso build, before tax. Your final price depends on the options below, shipping and any duties for your address.',
    changes: [
      { item: 'Double-group espresso setup instead of single', price: '+US$2,000', note: 'For high-volume events and long lines' },
      { item: 'UL certification for the espresso setup', price: '+US$575', note: 'Recommended in the US and Canada' },
      { item: 'Popular add-ons', price: 'US$525–2,150', note: 'Nitro cold brew tap, 33" LED screen, latte art printer, lithium batteries' },
      { item: '2-day barista training', price: 'US$850', note: 'In Vancouver or by video call' },
      { item: 'Shipping and duties', price: 'Quoted', note: 'Crated, palletized and insured to your door; any duties shown in your quote' },
    ],
    financing: { t: 'Paying for it', d: 'Bank transfer or card. Need financing? Tell us in the form and we’ll share what other US owners arranged.' },
  },
  ca: {
    big: 'CA$25,000',
    lead: 'About CA$25,000',
    leadNote: 'is what most Canadian owners invest, depending on the final build. Taxes extra. We quote every build in Canadian dollars.',
    changes: [
      { item: 'Espresso setup', note: 'Single group for most owners; double group for high-volume events' },
      { item: 'Certification', note: 'UL certification for the espresso setup, recommended in Canada' },
      { item: 'Branding and add-ons', note: 'Nitro cold brew tap, LED screen, latte art printer, lithium batteries' },
      { item: 'Training', note: 'A 2-day barista training in Vancouver or by video call' },
      { item: 'Shipping', note: 'Crated, palletized and insured to your door anywhere in Canada' },
    ],
    financing: { t: 'Financing for Canadians', d: 'Canadian residents can apply through iFinance, on approved credit. Bank transfer (CAD or USD) and card also work.', href: 'https://apply.ifinancecanada.com/23545', cta: 'Apply' },
  },
};

export const STEPS = [
  { t: 'Tell us what you’re planning', d: 'About a minute: what you’re planning, when you want to open and where.' },
  { t: 'Get your price and options', d: 'We reply within one business day with pricing for your build and answers to your questions.' },
  { t: 'Plan your build on a call', d: 'Setup, branding and add-ons, with someone who has run Coffee Bikes for years. No pressure.' },
  { t: 'Approve your invoice', d: 'Pay by bank transfer or card within 5 business days. Canadians can apply for financing through iFinance.' },
  { t: 'Built for you', d: 'Made to order in about 4–8 weeks; units in stock ship right away.' },
  { t: 'Delivered to your door', d: 'Crated, palletized and insured, typically 2–6 weeks in transit. Then launch with the manual, videos and owners’ community.' },
];

/** Questions buyers ask, answered for the visitor’s market (money and financing differ between Canada and the US). */
const FAQ_BASE = [
  { q: "Do I need permits?", a: { us: "Yes, and the rules differ by city. Most health departments review your setup (sinks, water, food-safe surfaces) and inspect it, and many ask for a commissary or approved base. Permits often take 60–90 days, so owners apply while their bike is being built. Owners usually trade on private property (a deal with a landlord, market or venue) or in public space with a mobile vending permit where the city offers one.", ca: "Yes, and the rules differ by city and province. Most health authorities review your setup (sinks, water, food-safe surfaces) and inspect it, and many ask for a commissary or approved base. Permits often take 60–90 days, so owners apply while their bike is being built. Owners usually trade on private property (a deal with a landlord, market or venue) or in public space with a mobile vending permit where the city offers one." } },
  { q: "What does a complete Coffee Bike cost?", a: { us: "Most US owners invest about US$15,850 for a ready-to-serve espresso build: the bike, branded body and canopy, sinks, fridge, batteries and a Fracino single-group espresso setup. A double-group setup, UL certification and add-ons change the price, and shipping is quoted for your address.", ca: "Most Canadian owners invest about CA$25,000, depending on the final build: the espresso setup, certification, branding, add-ons and training. We quote every build in Canadian dollars, shipping is quoted for your address, and Canadian residents can apply for financing through iFinance." } },
  { q: "How soon can I open?", a: "Units in stock ship right away. Made-to-order builds take about 4–8 weeks, and delivery typically adds 2–6 weeks depending on where you are. If you want to open for spring markets, ordering in winter gives you time to arrange permits and a spot." },
  { q: "What about winter and rain?", a: "Many owners move indoors in the cold months: office lobbies, hospitals, campuses, residential towers, grocery stores and gyms. The bike needs no build-out on the landlord’s side: it rolls in, plugs into a standard outlet and serves." },
  { q: "How far can it go, and can it handle hills?", a: "The electric motor climbs steep hills fully loaded, with twin hydraulic brakes and front and rear suspension. One battery pack covers about 10–15 km and two about 20–30 km, depending on the roads." },
  { q: "Is this a franchise?", a: "No. You buy the bike and own it outright. There are no royalties, no marketing fees and no monthly contracts, and you choose your own name, menu and prices." },
  { q: "What training and support do I get?", a: { us: "Every bike comes with a 20+ page barista manual, setup videos and access to our private owners’ community. Optional: a 2-day training in Vancouver or by video call (US$850) and an online barista course (US$275). Parts are available through the owners’ portal, and the bike has a 1-year manufacturer warranty.", ca: "Every bike comes with a 20+ page barista manual, setup videos and access to our private owners’ community. Optional: a 2-day training in Vancouver or by video call and an online barista course. Parts are available through the owners’ portal, and the bike has a 1-year manufacturer warranty." } },
  { q: "Do you deliver to my door?", a: { us: "Yes, anywhere in the US. Every Coffee Bike is crated, palletized, insured and delivered to your door. We quote shipping before you confirm your order.", ca: "Yes, anywhere in Canada. Every Coffee Bike is crated, palletized, insured and delivered to your door. We quote shipping before you confirm your order." } },
  { q: "Are there import duties?", a: { us: "Your quote shows shipping and any duties or brokerage for your address before you order, so nothing surprises you at delivery.", ca: null } },
  { q: "How do I pay, and is there financing?", a: { us: "You receive an invoice within one business day of confirming your build and pay by bank transfer or card. Our financing partner serves Canadian residents only, so US buyers usually pay by transfer or card or arrange their own bank or equipment financing; tell us and we’ll share what other US owners did. You can reserve a production spot with a US$250 deposit, applied in full to your order.", ca: "You receive an invoice within one business day of confirming your build and pay by bank transfer (CAD or USD) or card. Canadian residents can apply for financing through iFinance. You can reserve a production spot with a US$250 deposit, applied in full to your order." } },
  { q: "Can I sell more than coffee?", a: "Yes. It’s your business and your menu: specialty coffee, tea, matcha, hot chocolate and more. The Iced Express package suits ice cream and bottled drinks, and a multi-grill option adds hot food." },
  { q: "Can I see one before I buy?", a: "Start with the 6-minute walkthrough on this page, then book a discovery call and ask us anything, down to the portafilter size. If you are near Vancouver, ask about seeing one in person." },
  { q: "Where do I store and charge it overnight?", a: "Most owners keep it in a garage, storage unit or partner venue with a standard outlet. Smart chargers are included, and the 200 W solar roof tops the batteries up outdoors." },
];
export const faqs = (market) => FAQ_BASE.map((f) => ({ q: f.q, a: typeof f.a === "string" ? f.a : f.a[market] })).filter((f) => f.a);
