// Content for the Google Ads landing page (/start and /start/<intent>). Every claim here is either on the main
// sales page already (prices, warranty, testimonials, process) or sourced in COMPARE_SOURCES. No income claims.

export const IMG = (p) => `https://coffeebike.ca/wp-content/uploads/${p}`;

export const LOGO = IMG('2025/04/cofee_bike_logo_rwhite_transparent.png');
export const HERO = IMG('2026/05/open-ready.jpg.jpg');
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

export const TRUST = [
  { k: 'As seen on', v: 'Dragons’ Den' },
  { k: 'Bikes sold', v: '36' },
  { k: 'Running our own', v: '8+ years' },
  { k: 'Warranty', v: '1 year' },
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
export const COMPARE_ROWS = [
  {
    label: 'Typical cost to start',
    bike: 'From US$9,850. About US$15,850 with a commercial espresso setup',
    truck: 'New builds often US$55,000–150,000; used coffee trucks around US$64,000',
    trailer: 'New US$21,000–80,000 equipped; used around US$33,000. Plus a vehicle to tow it',
    cart: 'About US$8,000–25,000 once an espresso machine and grinder are added',
    cafe: 'Kiosks often US$50,000–150,000; full cafés much more',
  },
  {
    label: 'Running costs',
    bike: 'No fuel and no commercial auto policy. Charging costs about a dollar a day',
    truck: 'Fuel and maintenance US$500–1,000 a month; commercial auto insurance about US$2,500 a year',
    trailer: 'A tow vehicle, generator fuel and a place to store it',
    cart: 'A vehicle or trailer to haul it between spots',
    cafe: 'Rent, utilities and staff every month',
  },
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

export const PRICE_LINES = [
  { item: 'Base package: Classic, CMFO or Iced Express', usd: 'US$9,850', cad: 'CA$13,495', note: 'The bike, branded body, canopy, sinks or fridge layout, batteries' },
  { item: 'Single-group commercial espresso setup', usd: '+US$6,000', note: 'Fracino UK dual-fuel machine and a full set of barista appliances. The setup most owners start with.' },
  { item: 'UL certification for the espresso setup', usd: '+US$575', note: 'Recommended in the US and Canada' },
  { item: 'Double-group espresso setup instead', usd: '+US$8,000', note: 'For high-volume events' },
  { item: 'Popular add-ons', usd: 'US$525–2,150', note: 'Nitro cold brew tap, 33" LED screen, latte art printer, lithium batteries' },
];

export const STEPS = [
  { t: 'Tell us what you’re planning', d: 'Two minutes on the form below: where you’ll operate, when you want to open, and any questions.' },
  { t: 'Get your price and options', d: 'We reply within one business day with pricing for your build and answers to your questions.' },
  { t: 'Plan your build on a call', d: 'Setup, branding and add-ons, with someone who has run Coffee Bikes for years. No pressure.' },
  { t: 'Approve your invoice', d: 'Pay by bank transfer or card within 5 business days. Canadians can apply for financing.' },
  { t: 'Built for you', d: 'Made to order in about 4–8 weeks; units in stock ship right away.' },
  { t: 'Delivered to your door', d: 'Crated, palletized and insured, typically 2–6 weeks in transit. Then launch with the manual, videos and owners’ community.' },
];

export const FAQS = [
  { q: 'Do I need permits?', a: 'Yes, and the rules differ by city. Most health departments review your setup (sinks, water, food-safe surfaces) and inspect it, and many ask for a commissary or approved base. Permits often take 60–90 days, so owners apply while their bike is being built. Owners usually trade on private property (a deal with a landlord, market or venue) or in public space with a mobile vending permit where the city offers one. Our Mobile Business Consulting service (US$1,950) can research your area, where available.' },
  { q: 'What does a complete Coffee Bike cost?', a: 'The base package is US$9,850 (CA$13,495). Most owners add the single-group commercial espresso setup, which brings a ready-to-serve build to about US$15,850 / CA$21,750 before shipping. Most owners invest US$10,000–20,000 all-in, including branding and add-ons. Shipping is quoted separately once we know your address.' },
  { q: 'How soon can I open?', a: 'Units in stock ship right away. Made-to-order builds take about 4–8 weeks, and delivery typically adds 2–6 weeks depending on where you are. If you want to open for spring markets, ordering in winter gives you time to arrange permits and a spot.' },
  { q: 'What about winter and rain?', a: 'Many owners move indoors in the cold months: office lobbies, hospitals, campuses, residential towers, grocery stores and gyms. The bike needs no build-out on the landlord’s side: it rolls in, plugs into a standard outlet and serves.' },
  { q: 'How far can it go, and can it handle hills?', a: 'The electric motor climbs steep hills fully loaded, with twin hydraulic brakes and front and rear suspension. One battery pack covers about 10–15 km and two about 20–30 km, depending on the roads.' },
  { q: 'Is this a franchise?', a: 'No. You buy the bike and own it outright. There are no royalties, no marketing fees and no monthly contracts, and you choose your own name, menu and prices.' },
  { q: 'What training and support do I get?', a: 'Every bike comes with a 20+ page barista manual, setup videos and access to our private owners’ community. Optional: a 2-day training in Vancouver or by video call (US$850) and an online barista course (US$275). Parts are available through the owners’ portal, and the bike has a 1-year manufacturer warranty.' },
  { q: 'Do you deliver to the US and Canada?', a: 'Yes. Every Coffee Bike is crated, palletized, insured and delivered to your door. We quote shipping before you confirm your order.' },
  { q: 'How do I pay, and is there financing?', a: 'You receive an invoice within one business day of confirming your build and pay by bank transfer or card (3.9% card fee). Canadian residents can apply for financing through iFinance. You can also reserve a production spot with a US$250 deposit, which is applied in full to your order.' },
  { q: 'Can I sell more than coffee?', a: 'Yes. It’s your business and your menu: specialty coffee, tea, matcha, hot chocolate and more. The Iced Express package suits ice cream and bottled drinks, and a multi-grill option adds hot food.' },
  { q: 'Is financing available in the US?', a: 'Not through us today: our financing partner, iFinance, serves Canadian residents. US buyers usually pay by bank transfer or card, or arrange their own bank or equipment financing before ordering.' },
  { q: 'Can I see one before I buy?', a: 'Start with the 6-minute walkthrough on this page, then book a discovery call and ask us anything, down to the portafilter size. If you are near Vancouver, ask about seeing one in person.' },
  { q: 'Where do I store and charge it overnight?', a: 'Most owners keep it in a garage, storage unit or partner venue with a standard outlet. Smart chargers are included, and the 200 W solar roof tops the batteries up outdoors.' },
  { q: 'Can I pay in Canadian dollars?', a: 'Yes. Prices are shown in US and Canadian dollars, and invoices can be paid by bank transfer in CAD or USD.' },
];
