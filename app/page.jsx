"use client";
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Edit2, Check, Info, Lock, Search, Leaf, Globe, Clock, Award, Mail, MapPin, Play, TrendingUp, DollarSign, Calendar, Users, Zap, Coffee, Star, ArrowRight, Sparkles, ZoomIn, X, Eye } from 'lucide-react';

export default function CoffeeBikePage() {
  const [currency, setCurrency] = useState('USD');
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);
  const [basePackage, setBasePackage] = useState(null);
  const [baseCustomInquiry, setBaseCustomInquiry] = useState('');
  const [setup, setSetup] = useState(null);
  const [ulCertifiedMap, setUlCertifiedMap] = useState({});
  const [color, setColor] = useState(null);
  const [extraBatteryType, setExtraBatteryType] = useState('lead-acid');
  const [colorInput, setColorInput] = useState('');
  const [pantoneInput, setPantoneInput] = useState('');
  const [addOns, setAddOns] = useState({ lithium: false, extraBattery: false, led: false, latteArt: false, nitro: false, customInquiry: false });
  const [customInquiryText, setCustomInquiryText] = useState('');
  const [support, setSupport] = useState({ discord: false, videoGuide: false, training: false, consulting: false, digital: false });
  const [openSpec, setOpenSpec] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [calcMode, setCalcMode] = useState('retail');
  const [stepOpen, setStepOpen] = useState({ step1: true, step2: false, step3: false, step4: false, step5: false });
  const [completed, setCompleted] = useState({ step1: false, step2: false, step3: false, step4: false, step5: false });

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [financingModalOpen, setFinancingModalOpen] = useState(false);
  const [pressModalOpen, setPressModalOpen] = useState(false);
  const [buildCopied, setBuildCopied] = useState(false);
  const [financingAmountCopied, setFinancingAmountCopied] = useState(false);
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [financingStarted, setFinancingStarted] = useState(false);
  const [retailCups, setRetailCups] = useState(50);
  const [retailPrice, setRetailPrice] = useState(5.5);
  const [retailDays, setRetailDays] = useState(18);
  const [cateringEvents, setCateringEvents] = useState(4);
  const [cateringFee, setCateringFee] = useState(900);
  const [zoomImg, setZoomImg] = useState(null);
  const [flashStep, setFlashStep] = useState(null);
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [inConfigurator, setInConfigurator] = useState(false);

  const advancedRef = useRef({ step1: false, step2: false, step3: false, step4: false });

  const toggleStep = (step) => setStepOpen(s => ({ ...s, [step]: !s[step] }));
  const advanceFromStep = (currentStep, nextStep) => {
    setCompleted(c => ({ ...c, [currentStep]: true }));
    if (advancedRef.current[currentStep]) return;
    advancedRef.current[currentStep] = true;
    setStepOpen(s => ({ ...s, [nextStep]: true }));
  };
  const completeStep5 = () => setCompleted(c => ({ ...c, step5: true }));

  const editStep = (stepKey) => {
    setStepOpen(s => ({ ...s, [stepKey]: true }));
    setTimeout(() => {
      const el = document.getElementById(`config-${stepKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setFlashStep(stepKey);
      setTimeout(() => setFlashStep(null), 1500);
    }, 50);
  };

  useEffect(() => {
    const checkConfigurator = () => {
      const el = document.getElementById('configurator-section');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3;
      setInConfigurator(inView);
    };
    window.addEventListener('scroll', checkConfigurator, { passive: true });
    checkConfigurator();
    return () => window.removeEventListener('scroll', checkConfigurator);
  }, []);

  useEffect(() => {
    if (!inquiryModalOpen && !scheduleModalOpen && !isGetInTouchOpen) return;    if (document.getElementById('ghl-form-embed-script')) return;
    const s = document.createElement('script');
    s.id = 'ghl-form-embed-script';
    s.src = 'https://link.coffeebike.ca/js/form_embed.js';
    s.async = true;
    document.body.appendChild(s);
  }, [inquiryModalOpen, scheduleModalOpen, isGetInTouchOpen]);
  useEffect(() => {
    if (inquiryModalOpen || scheduleModalOpen || depositModalOpen || financingModalOpen || pressModalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [inquiryModalOpen, scheduleModalOpen, depositModalOpen, financingModalOpen, pressModalOpen]);

  const RED = '#E31E24';
  const RED_TINT = '#FDE8E9';

  const urgency = useMemo(() => {
    const now = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const nextMonthIndex = (now.getMonth() + 1) % 12;
    const nextMonthYear = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
    const nextBatch = `${monthNames[nextMonthIndex]} ${nextMonthYear}`;
    const seed = nextMonthYear * 12 + nextMonthIndex;
    const pseudoRandom = Math.abs(Math.sin(seed * 9301 + 49297) * 233280) % 1;
    const slotsRemaining = Math.floor(pseudoRandom * 16) + 5;
    return { nextBatch, slotsRemaining };
  }, []);

  const makeSVG = (iconPath, label, bgFrom = '#fde8e9', bgTo = '#fca5a5', iconColor = '#7f1d1d') => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${bgFrom}"/><stop offset="100%" stop-color="${bgTo}"/></linearGradient></defs><rect width="400" height="300" fill="url(#bg)"/><g transform="translate(200 130)" fill="${iconColor}" opacity="0.4">${iconPath}</g><text x="200" y="245" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="700" fill="${iconColor}" text-anchor="middle" opacity="0.85">${label}</text><text x="200" y="265" font-family="-apple-system, system-ui, sans-serif" font-size="10" font-weight="500" fill="${iconColor}" text-anchor="middle" opacity="0.5" letter-spacing="2">COFFEE BIKE</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  const ICONS = {
    bike: '<g transform="translate(-60 -30)"><circle cx="25" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="95" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="6"/><path d="M25 50 L60 50 L75 15 L95 50 M60 50 L75 15 L55 15" stroke="currentColor" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="50" y="0" width="40" height="18" fill="currentColor"/></g>',
    cup: '<g transform="translate(-30 -40)"><path d="M5 5 L5 50 Q5 75 30 75 L40 75 Q65 75 65 50 L65 5 Z" fill="currentColor"/><path d="M65 20 Q85 20 85 38 Q85 56 65 56" fill="none" stroke="currentColor" stroke-width="6"/></g>',
    espresso: '<g transform="translate(-40 -35)"><rect x="0" y="0" width="80" height="50" rx="4" fill="currentColor"/><rect x="10" y="50" width="60" height="20" rx="2" fill="currentColor" opacity="0.7"/><circle cx="40" cy="25" r="10" fill="#fff" opacity="0.5"/></g>',
    fridge: '<g transform="translate(-25 -40)"><rect x="0" y="0" width="50" height="80" rx="4" fill="currentColor"/><line x1="0" y1="30" x2="50" y2="30" stroke="#fff" stroke-width="2"/></g>',
    grill: '<g transform="translate(-35 -25)"><rect x="0" y="10" width="70" height="35" rx="6" fill="currentColor"/></g>',
    sink: '<g transform="translate(-35 -25)"><rect x="0" y="15" width="70" height="35" rx="4" fill="currentColor"/><rect x="22" y="22" width="26" height="22" rx="2" fill="#fff" opacity="0.6"/></g>',
    paint: '<g transform="translate(-30 -35)"><path d="M15 10 L45 10 L60 25 L60 60 L0 60 L0 25 Z" fill="currentColor"/></g>',
    battery: '<g transform="translate(-35 -25)"><rect x="0" y="0" width="65" height="40" rx="4" fill="currentColor"/></g>',
    screen: '<g transform="translate(-35 -25)"><rect x="0" y="0" width="70" height="45" rx="4" fill="currentColor"/></g>',
    globe: '<g transform="translate(0 0)"><circle cx="0" cy="0" r="35" fill="none" stroke="currentColor" stroke-width="5"/></g>',
    user: '<g transform="translate(0 -10)"><circle cx="0" cy="-15" r="18" fill="currentColor"/><path d="M-30 30 Q-30 0 0 0 Q30 0 30 30 Z" fill="currentColor"/></g>',
    sparkle: '<g transform="translate(0 0)"><path d="M0 -35 L8 -8 L35 0 L8 8 L0 35 L-8 8 L-35 0 L-8 -8 Z" fill="currentColor"/></g>',
  };

  const COLORS = {
    red: { from: '#fde8e9', to: '#fca5a5', icon: '#7f1d1d' },
    coral: { from: '#fef2f2', to: '#fda4af', icon: '#881337' },
    warm: { from: '#fef3c7', to: '#fbbf24', icon: '#78350f' },
    stone: { from: '#f4f4f5', to: '#a8a29e', icon: '#1c1917' },
  };

  const IMG = {
    hero: makeSVG(ICONS.bike, 'Coffee Bike Showcase', '#fde8e9', '#f87171', '#7f1d1d'),
    classic: makeSVG(ICONS.bike, 'Classic Setup', COLORS.red.from, COLORS.red.to, COLORS.red.icon),
    cmfo: makeSVG(ICONS.sink, 'CMFO', COLORS.coral.from, COLORS.coral.to, COLORS.coral.icon),
    icedExpress: makeSVG(ICONS.fridge, 'Iced Express', COLORS.red.from, COLORS.red.to, COLORS.red.icon),
    espresso1: makeSVG(ICONS.espresso, 'Single-Group', COLORS.red.from, COLORS.red.to, COLORS.red.icon),
    espresso2: makeSVG(ICONS.espresso, 'Double-Group', COLORS.coral.from, COLORS.coral.to, COLORS.coral.icon),
    espresso3: makeSVG(ICONS.espresso, 'Single + Counter', COLORS.red.from, COLORS.red.to, COLORS.red.icon),
    espresso4: makeSVG(ICONS.espresso, 'Single + Multi', COLORS.coral.from, COLORS.coral.to, COLORS.coral.icon),
    grill: makeSVG(ICONS.grill, 'Multi Grill', COLORS.warm.from, COLORS.warm.to, COLORS.warm.icon),
    openConcept: makeSVG(ICONS.sparkle, 'Open Concept', COLORS.stone.from, COLORS.stone.to, COLORS.stone.icon),
    feature1: makeSVG(ICONS.sink, '3-Compartment Sink', COLORS.coral.from, COLORS.coral.to, COLORS.coral.icon),
    feature2: makeSVG(ICONS.paint, 'Custom Branding', COLORS.red.from, COLORS.red.to, COLORS.red.icon),
    feature3: makeSVG(ICONS.espresso, 'Dual-Fuel Espresso', COLORS.coral.from, COLORS.coral.to, COLORS.coral.icon),
    feature4: makeSVG(ICONS.battery, 'Lithium Battery', COLORS.warm.from, COLORS.warm.to, COLORS.warm.icon),
    feature5: makeSVG(ICONS.screen, 'LED Entertainment', COLORS.red.from, COLORS.red.to, COLORS.red.icon),
    feature6: makeSVG(ICONS.globe, 'Mobile & Global', COLORS.stone.from, COLORS.stone.to, COLORS.stone.icon),
    owner1: makeSVG(ICONS.user, 'Owner 1', COLORS.red.from, COLORS.red.to, COLORS.red.icon),
    owner2: makeSVG(ICONS.user, 'Owner 2', COLORS.coral.from, COLORS.coral.to, COLORS.coral.icon),
    owner3: makeSVG(ICONS.user, 'Owner 3', COLORS.warm.from, COLORS.warm.to, COLORS.warm.icon),
    owner4: makeSVG(ICONS.user, 'Owner 4', COLORS.stone.from, COLORS.stone.to, COLORS.stone.icon),
    owner5: makeSVG(ICONS.user, 'Owner 5', COLORS.red.from, COLORS.red.to, COLORS.red.icon),
    finalCta: makeSVG(ICONS.bike, 'Ready to Launch?', COLORS.red.from, COLORS.red.to, COLORS.red.icon),
  };

  const rates = { USD: 1, CAD: 1.37, EURO: 0.92 };
  const symbols = { USD: 'USD', CAD: 'CAD', EURO: 'EUR' }; const cur = { USD: "$", CAD: "$", EURO: "€" };
  const fmt = (usd) => `${cur[currency]}${Math.round(usd * rates[currency]).toLocaleString()} ${symbols[currency]}`;
  const fmtMoney = (usd) => `${cur[currency]}${Math.round(usd * rates[currency]).toLocaleString()}`;
  const fmtCAD = (n) => `$${Math.round(n).toLocaleString()} CAD`;

  const basePackages = {
    classic: {
      name: 'Classic',
      desc: '3-compartment sink with pitcher rinser and knock box.',
      price: 9850,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Classic.png',
      badge: 'Most Popular'
    },
  
    cmfo: {
      name: 'CMFO',
      desc: 'Compact Mobile Food Operation with one handwashing sink and a separate pitcher rinser and knock box.',
      price: 9850,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/CMFO.png'
    },
  
    iced: {
      name: 'Iced Express',
      desc: 'Outfitted with a big-volume fridge, best for ice cream or bottled drinks operation.',
      price: 9850,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Iced-Express.png'
    },
  
    custom: {
      name: 'Custom Inquiry',
      desc: 'Fill in the inquiry form if none of the above options match your vision, and our team will get in touch to discuss your needs.',
      price: 9850,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Custom.png',
      isCustom: true
    }
  };

  const setups = {
    'single-group': { name: 'Single-Group Commercial-Grade Espresso Machine', desc: 'Fracino UK dual-fuel espresso machine, plus a full set of Coffee Bike barista appliances (full list in FAQ below).', price: 6000, badge: 'Best Starter Setup', cert: 'UL Certified — recommended for US and Canada', certPrice: 575, img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Single-Group.png', },
    'double-group': { name: 'Double-Group Commercial-Grade Espresso Machine', desc: 'Fracino UK dual-fuel espresso machine, plus a full set of Coffee Bike barista appliances (full list in FAQ below).', price: 8000, cert: 'UL Certified — recommended for US and Canada', certPrice: 575, img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Dual-group.jpg', },
    'single-counter': { name: 'Single-Group Commercial-Grade Espresso Machine + Separate Countertop Hot Water Dispenser', desc: 'Fracino UK dual-fuel espresso machine and Fracino UK propane-powered Atlantis hot water dispenser, plus a full set of Coffee Bike barista appliances (full list in FAQ below).', price: 8000, cert: 'UL Certified — recommended for US and Canada', certPrice: 575, img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Single-group-atlantis.png', },
    'single-multi': { name: 'Single-Group Commercial-Grade Espresso Machine + Multi Grill', desc: 'Fracino UK dual-fuel espresso machine and Fracino UK propane-powered Multi Grill unit, ideal for hot dogs, waffles, and more, plus a full set of Coffee Bike barista appliances (full list in FAQ below).', price: 8500, cert: 'UL Certified — recommended for US and Canada', certPrice: 575, img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Espresso-and-Grill.png', },
    'multi-grill': { name: 'Multi Grill', desc: 'Fracino UK propane-powered Multi Grill unit, ideal for hot dogs, waffles, and more.', price: 2500, img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Multi.png', },
    'open-concept': { name: 'Open Concept', desc: 'Select this if you are proceeding with Iced Express or Custom Inquiry.', price: 0, included: true, img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Classic.png', },
  };

  const addOnsList = {
    lithium: { name: 'Lithium Batteries Package', price: 975, suffix: '+ air shipping', desc: 'The standard package comes with lead-acid batteries. This option carries an extra charge and requires separate air shipping due to safety regulations.' },
    extraBattery: { name: 'Extra Battery Pack', desc: 'Extend your riding range. One battery pack provides approximately 10–15 km, while two battery packs provide approximately 20–30 km, depending on road conditions.', isBatteryChoice: true },
    led: { name: 'LED Entertainment Package', price: 850, desc: 'Integrated 33-inch LED screen and soundbar on the front panel for media display and advertising enhancement.', hasPreview: true, previewImg: 'https://coffeebike.ca/wp-content/uploads/2026/05/LED.png', previewLabel: 'LED Entertainment Package — 33" Screen + Soundbar' },
    latteArt: { name: 'Latte Art Printer', price: 2150, desc: 'Add a latte art printer to create custom printed drinks for events, activations, and branded experiences.', hasPreview: true, previewImg: 'https://coffeebike.ca/wp-content/uploads/2026/05/Latte-printer.png', previewLabel: 'Latte Art Printer — Custom Branded Drinks' },
    nitro: { name: 'Nitro Tap / Cold Brew Module', price: 525, desc: 'Custom Tap Tower with one keg.', hasPreview: true, previewImg: 'https://coffeebike.ca/wp-content/uploads/2026/05/Nitro.png', previewLabel: 'Nitro Tap / Cold Brew Module — Custom Tap Tower' },
    customInquiry: { name: 'Custom Inquiry', price: 0, desc: 'Write your idea below, and we will do our best to accommodate it.', isCustom: true },
  };

  const supportList = {
    discord: { name: 'Access to Our Discord Community and Coffee Bike Setup Video Guide & Manual', price: 0, badge: 'Step-by-Step Guide', included: true, desc: 'Join our community of Coffee Bike owners worldwide. Your Coffee Bike is delivered fully assembled, and this resource provides step-by-step instructions on how to get started and power all essential elements.' },
    videoGuide: { name: 'Coffee Bike Barista Video Guide', price: 275, badge: 'Recommended', desc: 'An additional video guide on how to become an efficient Coffee Bike barista, plus our advice and suggestions on how to build a successful mobile business.' },
    training: { name: 'Coffee Bike Barista 1-on-1 Training', price: 850, desc: 'Two days of in-person training in Vancouver, BC, or live video-call barista training for a deep dive into your operation, led by our trained supervisors.' },
    consulting: { name: 'Mobile Business Consulting', price: 1950, desc: 'Not sure where to start? Our team will study your local regulations and requirements, contact relevant local authorities where feasible, and guide you through the overall process.' },
    digital: { name: 'Digital Start-Up Package', price: 950, prefix: 'Starts at', desc: 'Our team will build a conversion-focused website, work on your local SEO for events and catering lead generation, help establish a social media plan, assist with Facebook and Instagram paid ads, develop marketing creatives such as business cards, and even set up a custom CRM system.' },
  };

  const total = useMemo(() => {
    let t = 0;
    if (basePackage && basePackages[basePackage]) t += basePackages[basePackage].price || 0;
    if (setup && setups[setup]) {
      t += setups[setup].price || 0;
      if (ulCertifiedMap[setup] && setups[setup].certPrice) t += setups[setup].certPrice;
    }
    if (color === 'pantone') t += 750;
    Object.keys(addOns).forEach(k => {
      if (addOns[k] && addOnsList[k] && !addOnsList[k].isCustom) {
        if (k === 'extraBattery') t += extraBatteryType === 'lithium' ? 575 : 285;
        else t += addOnsList[k].price;
      }
    });
    Object.keys(support).forEach(k => { if (support[k] && supportList[k] && !supportList[k].included) t += supportList[k].price; });
    return t;
  }, [basePackage, setup, ulCertifiedMap, color, addOns, extraBatteryType, support]);

  const buildSummary = useMemo(() => {
    const lines = [];
    if (basePackage && basePackages[basePackage]) {
      const p = basePackages[basePackage];
      lines.push(`Base Package: ${p.name} — ${fmt(p.price)}`);
      if (p.isCustom && baseCustomInquiry.trim()) lines.push(`  Note: ${baseCustomInquiry.trim()}`);
    }
    if (setup && setups[setup]) {
      const s = setups[setup];
      lines.push(`Setup: ${s.name} — ${s.included ? 'Included' : fmt(s.price)}`);
      if (ulCertifiedMap[setup] && s.certPrice) lines.push(`  + UL Certification (US/Canada): ${fmt(s.certPrice)}`);
    }
    if (color) {
      if (color === 'classic') lines.push(`Color: Classic — Included${colorInput.trim() ? ` (requested: ${colorInput.trim()})` : ''}`);
      else lines.push(`Color: Pantone Custom — ${fmt(750)}${pantoneInput.trim() ? ` (code: ${pantoneInput.trim()})` : ''}`);
    }
    const selectedAddOns = Object.keys(addOns).filter(k => addOns[k]);
    if (selectedAddOns.length) {
      lines.push('Add-Ons:');
      selectedAddOns.forEach(k => {
        const a = addOnsList[k];
        if (a.isBatteryChoice) {
          const t = extraBatteryType === 'lithium' ? 'Lithium' : 'Lead-Acid';
          const price = extraBatteryType === 'lithium' ? 575 : 285;
          lines.push(`  - Extra Battery Pack (${t}) — ${fmt(price)}${extraBatteryType === 'lithium' ? ' + air shipping' : ''}`);
        } else if (a.isCustom) {
          lines.push(`  - Custom Inquiry${customInquiryText.trim() ? `: ${customInquiryText.trim()}` : ''}`);
        } else {
          lines.push(`  - ${a.name} — ${fmt(a.price)}${a.suffix ? ' ' + a.suffix : ''}`);
        }
      });
    }
    const selectedSupport = Object.keys(support).filter(k => support[k]);
    if (selectedSupport.length) {
      lines.push('Support & Training:');
      selectedSupport.forEach(k => {
        const s = supportList[k];
        const price = s.included ? 'Included' : s.isCustom ? '—' : `${s.prefix ? s.prefix + ' ' : ''}${fmt(s.price)}`;
        lines.push(`  - ${s.name} — ${price}`);
      });
    }
    lines.push('');
    lines.push(`Estimated Total: ${fmt(total)} (excludes shipping)`);
    lines.push(`Currency: ${currency}`);
    return lines.join('\n');
  }, [basePackage, baseCustomInquiry, setup, ulCertifiedMap, color, colorInput, pantoneInput, addOns, extraBatteryType, customInquiryText, support, total, currency]);

  const buildCodeCompact = useMemo(() => {
    const parts = [];
    const baseMap = { classic: 'Classic', cmfo: 'CMFO', 'iced-express': 'IcedExp', custom: 'Custom' };
    if (basePackage) parts.push(baseMap[basePackage] || basePackage);
    const setupMap = { 'single-group': '1grpEsp', 'double-group': '2grpEsp', 'single-counter': '1grpEsp+HotW', 'single-multi': '1grpEsp+Grill', 'multi-grill': 'Grill', 'open-concept': 'OpenCnpt' };
    if (setup) { let s = setupMap[setup] || setup; if (ulCertifiedMap[setup]) s += '+UL'; parts.push(s); }
    if (color === 'classic') parts.push(`Clr:${colorInput.trim() ? colorInput.trim().slice(0, 20) : 'Std'}`);
    else if (color === 'pantone') parts.push(`Pant:${pantoneInput.trim() ? pantoneInput.trim().slice(0, 15) : 'TBD'}`);
    const addOnMap = { lithium: 'Li', extraBattery: 'XBatt', led: 'LED', latteArt: 'LtArt', nitro: 'Nitro', customInquiry: 'Cust' };
    const addOnCodes = Object.keys(addOns).filter(k => addOns[k]).map(k => {
      if (k === 'extraBattery') return `XBatt:${extraBatteryType === 'lithium' ? 'Li' : 'Pb'}`;
      return addOnMap[k] || k;
    });
    if (addOnCodes.length) parts.push(`+${addOnCodes.join(',')}`);
    const supportMap = { discord: 'Disc', videoGuide: 'VidGd', training: 'Train', consulting: 'Cons', digital: 'Digi' };
    const supportCodes = Object.keys(support).filter(k => support[k]).map(k => supportMap[k] || k);
    if (supportCodes.length) parts.push(`S:${supportCodes.join(',')}`);
    parts.push(`Tot:${fmt(total)}`);
    let code = parts.join(' | ');
    if (code.length > 250) code = code.slice(0, 247) + '...';
    return code;
  }, [basePackage, setup, ulCertifiedMap, color, colorInput, pantoneInput, addOns, extraBatteryType, support, total, currency]);

  const iframeUrl = useMemo(() => {
    const baseUrl = 'https://link.coffeebike.ca/widget/form/xnay3GGsJKCfqhvw55Yx';
    if (!buildSummary || !basePackage) return baseUrl;
    return `${baseUrl}?coffee_bike_build=${encodeURIComponent(buildSummary)}`;
  }, [buildSummary, basePackage]);

  const bookingUrl = useMemo(() => {
    const baseUrl = 'https://link.coffeebike.ca/widget/booking/RdfoeipljDAc8l0StvxS';
    if (!buildSummary || !basePackage) return baseUrl;
    return `${baseUrl}?coffee_bike_build=${encodeURIComponent(buildSummary)}&notes=${encodeURIComponent(buildSummary)}`;
  }, [buildSummary, basePackage]);

  const financingTotals = useMemo(() => {
    const subtotalCAD = Math.round(total * rates.CAD);
    const tax = Math.round(subtotalCAD * 0.12);
    const shipping = 2250;
    const grandTotal = subtotalCAD + tax + shipping;
    return { subtotalCAD, tax, shipping, grandTotal };
  }, [total]);

  const openInquiry = () => setInquiryModalOpen(true);
  const openSchedule = () => setScheduleModalOpen(true);
  const openDeposit = () => { setBuildCopied(false); setPaymentStarted(false); setDepositModalOpen(true); };
  const openFinancing = () => { setFinancingAmountCopied(false); setFinancingStarted(false); setFinancingModalOpen(true); };

  const copyBuildToClipboard = async () => {
    try { await navigator.clipboard.writeText(buildCodeCompact); setBuildCopied(true); setTimeout(() => setBuildCopied(false), 3000); }
    catch (e) {
      const t = document.createElement('textarea'); t.value = buildCodeCompact; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); setBuildCopied(true); setTimeout(() => setBuildCopied(false), 3000); } catch (err) {}
      document.body.removeChild(t);
    }
  };

  const copyFinancingAmount = async () => {
    const value = String(financingTotals.grandTotal);
    try { await navigator.clipboard.writeText(value); setFinancingAmountCopied(true); setTimeout(() => setFinancingAmountCopied(false), 3000); }
    catch (e) {
      const t = document.createElement('textarea'); t.value = value; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); setFinancingAmountCopied(true); setTimeout(() => setFinancingAmountCopied(false), 3000); } catch (err) {}
      document.body.removeChild(t);
    }
  };

  const handleProceedToStripe = () => {
    setPaymentStarted(true);
    window.open('https://buy.stripe.com/cNibJ31nd3QeczHfjnaVa07', '_blank', 'noopener,noreferrer');
  };

  const handleProceedToFinancing = () => {
    setFinancingStarted(true);
    window.open('https://apply.ifinancecanada.com/23545', '_blank', 'noopener,noreferrer');
  };

  const calc = useMemo(() => {
    if (calcMode === 'retail') {
      const dailyRevenue = retailCups * retailPrice;
      const monthlyRevenue = dailyRevenue * retailDays;
      const cogs = monthlyRevenue * 0.25;
      const netMonthly = monthlyRevenue - cogs;
      const annualNet = netMonthly * 11;
      const monthsToRecoup = 19775 / netMonthly;
      return { dailyRevenue, monthlyRevenue, cogs, netMonthly, annualNet, monthsToRecoup };
    } else {
      const monthlyRevenue = cateringEvents * cateringFee;
      const cogs = monthlyRevenue * 0.15;
      const netMonthly = monthlyRevenue - cogs;
      const annualNet = netMonthly * 12;
      const monthsToRecoup = 19775 / netMonthly;
      return { monthlyRevenue, cogs, netMonthly, annualNet, monthsToRecoup };
    }
  }, [calcMode, retailCups, retailPrice, retailDays, cateringEvents, cateringFee]);

  const features = [
    { title: 'Open & Ready in Minutes', desc: 'Unique foldable design opens or closes in just a few minutes — maximum versatility, minimum hassle.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/open-ready.jpg.jpg' },
    { title: 'Dual-Fuel Commercial Espresso', desc: 'Choose single or double group commercial-grade espresso machine + water heater. 60–100+ cups/hr efficiency with multiple equipment options.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/dual-fuel-commercial-espresso.jpg.jpg' },
    { title: 'Customizable Sink Configurations', desc: 'Various sink setups customizable to meet your local health code requirements.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/customizable-sink-configurations.jpg.jpg' },
    { title: 'Built-In Pitcher Rinser', desc: 'Dedicated pitcher rinser for optimal water efficiency throughout the day.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/built-in-pitcher-rinser.jpg.jpg' },
    { title: 'Slide-Out Refrigeration', desc: 'Smart slide-out fridge for easy access — or swap for a door fridge upon request.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/slide-out-refrigeration.jpg.jpg' },
    { title: 'Wood-Finish Countertop', desc: 'Commercial-grade countertop with premium wood-style finish — adds café atmosphere and extra prep space.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/wood-finish-countertop.jpg.jpg' },
    { title: 'Integrated Battery System & Storage', desc: 'Fully developed battery system with extra dry storage for supplies, beans, and essentials.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/integrated-battery-system-storage.jpg.jpg' },
    { title: 'Cup & Lid Shelving', desc: 'Dedicated shelf for cups, lids, and accessories — everything in reach, nothing in the way.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/cup-lid-shelving.jpg.jpg' },
    { title: 'Complete Plumbing System', desc: 'Fresh and waste water tanks, water pump, filter, plus hot and cold on-demand faucets — organized and space-efficient.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/complete-plumbing-system.jpg.jpg' },
    { title: 'Custom LED Signage', desc: 'Extra LED signages for branding visibility, day or night.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/custom-led-signage.jpg.jpg' },
    { title: 'Front & Rear Cameras', desc: 'Built-in cameras for safer riding and full road awareness.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/front-rear-cameras.jpg.jpg' },
    { title: 'Powerful E-Bike Motor', desc: 'True electric assist built to conquer steep uphills fully loaded. Get to your spot without breaking a sweat — or your battery.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/powerful-e-bike-motor.jpg.jpg' },
    { title: 'Hydraulic Twin Brakes', desc: 'Twin hydraulic braking system for safe, reliable stopping power — fully loaded.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/hydraulic-twin-brakes.jpg.jpg' },
    { title: 'Front & Rear Suspension', desc: 'Extra wheel suspension on both axles for a smooth, comfortable ride on any surface.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/front-rear-suspension.jpg.jpg' },
    { title: 'Fully Brandable Compact Build', desc: 'Full custom vinyl wrap and color of your choice. Compact, mobile design fits anywhere — your brand, your way.', img: 'https://coffeebike.ca/wp-content/uploads/2026/05/fully-brandable-compact-build.jpg.jpg' },
  ];

  const specs = [
    { title: 'Dimensions and Blueprints', desc: 'Size, weight, and technical drawings', isBlueprint: true,
      content: 'Above are the official blueprints of our Coffee Bike for your reference. You can also download the PDF brochure below — many of our owners use it as a starting point when researching their local health and mobile vendor regulations. Feel free to submit it directly to your county or municipality. We have included a short intro message clarifying that the Classic build is fully customizable, and if any element is not compliant with your jurisdiction, we are happy to accommodate further modifications to meet your local code requirements.',
      images: [
        'https://coffeebike.ca/wp-content/uploads/2026/05/Coffee-Bike-Blueprints-with-measurements-2D-side-view.png',
        'https://coffeebike.ca/wp-content/uploads/2026/05/Coffee-Bike-Blueprint-with-measurements.png',
        'https://coffeebike.ca/wp-content/uploads/2026/05/Coffee-Bike-3D-rear.jpg',
        'https://coffeebike.ca/wp-content/uploads/2026/05/Coffee-Bike-3D.png',
      ],
    },
    { title: 'Bike Specifications', desc: 'Frame, motor, brakes, gears, wheels',
      sections: [
        { label: 'Frame', text: 'Heavy-duty steel frame engineered to handle real working loads and the demands of busy daily operations. The formula behind this frame took us years of hands-on operations to refine, and today it sustains thousands of hours of service without issue. Payload capacity: 440–660 lb (200–300 kg).' },
        { label: 'Motor & Battery', text: 'CE-certified e-bike motor with 500W, 750W, or 1,250W options depending on your local regulations. Both throttle and pedal-assist modes included. Powered by a 48V or 60V 20Ah battery with smart charger. Built to conquer steep uphills fully loaded — back in 2018 it took two people to push our Coffee Bike Vol. 0 uphill; today, Vol. 2 flies up effortlessly. This is what truly unlocks mobility.' },
        { label: 'Braking System', text: 'New-generation Tektro twin hydraulic rear brakes paired with an additional front-wheel braking system for safe, reliable stopping power — even fully loaded.' },
        { label: 'Gears', text: 'Shimano 8-speed drivetrain for smooth shifting across any terrain.' },
        { label: 'Wheels & Tires', text: 'Heavy-duty rear wheels with additional suspension for a smooth ride under load. Front wheel features suspension forks for added comfort and control. Puncture-resistant commercial-grade tires throughout.' },
      ],
    },
    { title: 'Water and Plumbing System', desc: 'Sinks, tanks, pump, hot water on demand',
      sections: [
        { label: 'Sink Configurations', text: 'Choose your personal sink configuration — Classic, CMFO, or fully Custom — with hot and cold water on demand from the faucets. Each setup is designed to meet a wide range of local health code requirements.' },
        { label: 'Water Tanks', text: 'Fresh water tank (50L) and waste water tank (60L) by default, both with drain valves for easy cleaning. Tank capacities can be customized on request to fit your specific operation.' },
        { label: 'Pump & Filtration', text: 'Electric water pump paired with a water filtration system and an on-demand hot water heater ensure consistent flow, pressure, and quality throughout the day.' },
        { label: 'Plumbing Layout', text: 'All connectors, valves, and the integrated pitcher rinser are routed for maximum space efficiency, leaving room for easy installation of the espresso machine and an optional countertop hot water dispenser.' },
      ],
    },
    { title: 'Power System', desc: 'Battery, inverter, solar, smart switching',
      sections: [
        { label: 'Battery & Inverter', text: 'Standard configuration includes a 12V 100Ah lead-acid battery paired with a powerful 2000W inverter. Optional upgrades available: 12V 200Ah lead-acid for extended runtime, or a lithium battery pack for maximum performance and weight savings.' },
        { label: 'Smart Chargers', text: 'All smart chargers are included with your purchase — no additional accessories required to keep your system topped up and protected.' },
        { label: 'What It Powers', text: 'The system runs your fridge, water pump, LED lighting, POS, music speaker, and any additional accessories you add — all from a single, integrated electrical setup.' },
        { label: 'Solar Roof', text: 'The entire roof of the Coffee Bike is a 200W solar panel, providing continuous charging throughout the day. Free, quiet, and emission-free supplemental power whenever you are outdoors.' },
        { label: 'Smart Power Switching', text: 'Built-in intelligent switching seamlessly transitions between internal battery power and city (shore) power when available — ideal for indoor operations, overnight charging, and venues with outlet access.' },
      ],
    },
    { title: 'Espresso and Coffee Equipment', desc: 'Dual-fuel espresso machine, grinder, fridge',
      sections: [
        { label: 'Official Fracino UK Distributor', text: 'We are proud to be an official distributor of Fracino UK, a partner we have worked with since day one of Coffee Bike operations.' },
        { label: 'Dual-Fuel Espresso Machine', text: 'Every Coffee Bike with espresso option ships with a unique dual-fuel commercial-grade espresso machine — available in single or double-group configurations. The machine runs on propane when operating outdoors and on building power when operating indoors, giving you true year-round flexibility.' },
        { label: 'Battle-Tested Performance', text: 'These machines have been proven through 8 years of our own operations and over 1.5 million cups served at the busiest events and festivals. Consistent performance at 60–100 drinks per hour.' },
        { label: 'Coffee Bike Grinders', text: 'Our proprietary Coffee Bike grinders are engineered for high output and maximum energy efficiency — designed to sustain a full day of operations on a single charge.' },
        { label: 'Refrigeration Options', text: 'Choose between a slide-out fridge for easy access or a vertical-door fridge depending on your menu, workflow, and local health requirements.' },
      ],
    },
    { title: 'Coffee Bike Barista Appliances Set', desc: 'Included with every Coffee Bike espresso configuration',
    image: ['https://coffeebike.ca/wp-content/uploads/2026/05/Barista-Package.png'],
      content: 'Included with every Coffee Bike espresso machine configuration, this complete barista appliances set is everything you need to operate from day one:',
      bullets: [
        '3-tier custom baked goods display with reinforced metal frame for durability during transit',
        'Full barista kit: portafilters, two milk pitchers, espresso tamper, and espresso knock box',
        'Wooden coffee shop organizer for cups, lids, sugars, and condiments',
        'Ice cooler and ice scoop',
        'Scissors, silicone tongs for pastries, tea box, and matcha whisk set',
        'Cash box, dog bowl, spray bottle, music speaker, and bike helmet',
      ],
    },
    { title: 'Extra Features', desc: 'LED lighting, storage, riding safety, and more',
      sections: [
        { label: 'LED Lights & Signage', text: 'Integrated LED lighting under the roof and along the bike frame for both ambiance and visibility. Includes a custom LED "Espresso Bar" sign — fully replaceable with any phrase of your choice — plus a dedicated LED menu board.' },
        { label: 'Extra Storage', text: 'Generous dry storage throughout the build: a dedicated shelf for cups and lids, a full cabinet for syrups, alternative milks, or any supplies of your choosing, a slide-out drawer with lock for cash, documents, and small valuables, and a full back storage area with enough capacity for 200–300 drinks at a time — refill on demand with ease.' },
        { label: 'Practical Extras', text: 'Thoughtful details that make daily operations easier: foldable garbage bin, soap holder, paper towel dispenser, syrup bottle holder, and two side folding tables with a commercial-grade wood-style finish (not real wood) for additional countertop and prep space.' },
        { label: 'Riding Safety', text: 'On-board computer with phone connectivity for GPS navigation, front and rear cameras for the safest possible ride, and a foldable rain cover for the rider so you are ready for any weather scenario.' },
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Colby',
      loc: 'Vancouver, BC',
      biz: 'Cafe Racer Coffee Bike',
      months: 14,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Racer.png',
      quote: "I have a corporate 9-to-5 and two boys in soccer, so a brick-and-mortar was never going to work for my life. The Coffee Bike fits perfectly — I run it at my sons' Saturday games and farmers markets on Sundays, then back to the office Monday. The kids think it's the coolest thing in the world. Honestly, it pays for itself and I get to be present at every game.",
    },
    {
      name: 'Benjamin',
      loc: 'Lima, Peru',
      biz: 'Edman Bonhus',
      months: 28,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Edman.png',
      quote: "My family moved from Sweden to Peru and I started by roasting my own beans here. The Coffee Bike was how I got those beans to actual customers — direct, mobile, with no lease. It worked so well that I've now opened a permanent retail shop on top of it, and I'm planning more Coffee Bike locations across Lima. It's the most flexible way to grow I've ever seen.",
    },
    {
      name: 'Andrew',
      loc: 'Langford, BC',
      biz: 'Aerobic Geisha',
      months: 20,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Aerobic-Geisha.png',
      quote: "I'm a coffee nerd first, business owner second — and the Coffee Bike let me lead with the coffee. Things grew faster than I expected. I just picked up my second bike, and I've already had event days that crossed $5,000+. The dual-fuel setup keeps up with the volume and the build is genuinely commercial-grade. Worth every penny.",
    },
    {
      name: 'Jeremy',
      loc: 'Swan River, MB',
      biz: 'Swan Valley Coffee Roasters',
      months: 10,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Swan-river.png',
      quote: "Swan River is a small town and I wasn't sure how a specialty coffee setup would land here. Turns out my community has been showing up for it in a big way. Farmers markets, community events, the local hockey rink — people are excited about real coffee. The bike gives me a way to bring that to them without needing a downtown storefront we just don't have.",
    },
    {
      name: 'Shaun',
      loc: 'Barrie, ON',
      biz: 'Banana Cafe Bike',
      months: 24,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Banana.png',
      quote: "Two bikes in and counting. We got nominated for a local entrepreneurial award this year, and we're catering for clients like Tesla — stuff I genuinely couldn't have imagined when I started. My goal now is to put Banana Cafe Bikes across the entire county. The model is repeatable, the margins are real, and the team behind the bike is responsive every time I need them.",
    },
    {
      name: 'Tom',
      loc: 'Lithia, FL',
      biz: 'Monkeynuts Cafe',
      months: 16,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Monkeynuts.png',
      quote: "I'm retired and I wanted something that kept me moving, kept me social, and earned a little on the side. The Coffee Bike checks every box. I take great care of mine and it takes great care of me. Got a steady event circuit going now and the locals know me. Already talking with Vlad about a second one — apparently retirement is busier than I planned.",
    },
    {
      name: 'Ludmila',
      loc: 'Edmonton, AB',
      biz: 'SIP Espresso Bar',
      months: 12,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/SIP.png',
      quote: "I was already baking cupcakes and pastries on the side of my corporate job, and the Coffee Bike was the missing piece. Now I show up to events with fresh bakes AND mobile espresso, and the combination is unbeatable. I still keep my day job and run this on the side — it's genuinely possible to do both if you're organized. The bike makes it work.",
    },
    {
      name: 'Anais',
      loc: 'Tempe, AZ',
      biz: "Lucy's Coffee Express",
      months: 8,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Lucys.png',
      quote: "This was a complete career change for me and I'm not going to pretend it was easy. There were real challenges getting started — permits, location, building a customer base from zero. What kept me going was Vlad and the Coffee Bike team actually answering when I called. I'm still building my name in Tempe but every week is better than the last. Not giving up.",
    },
    {
      name: 'Davina',
      loc: 'Portland, OR',
      biz: 'Dibina Coffee',
      months: 15,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Dibina.png',
      quote: "I already had a coffee cart, and the Coffee Bike became the next chapter — a way to bring my Guam heritage to more people through coffee and snacks you can't find anywhere else in Portland. The mobility is what makes it. I can take my flavors to the events and neighborhoods where they resonate. It's coffee, but it's also home.",
    },
    {
      name: 'Ken',
      loc: 'Vancouver, BC',
      biz: 'Blissful Chai',
      months: 11,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Blissful-Chai.png',
      quote: "Mine is technically a Chai Bike — same Coffee Bike build, my menu. I wanted to share traditional chai the way I grew up with it, and the bike gave me a way to do that on my own terms. The build handles everything I need and people are genuinely curious every time I open up. Brewing something from your culture and watching strangers fall in love with it never gets old.",
    },
    {
      name: 'Jorge',
      loc: 'Vancouver, BC',
      biz: 'Amor Cafe',
      months: 13,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Amor.png',
      quote: "Vlad and I talked for years before I finally pulled the trigger. I'm a husband, a dad, and now I'm living the coffee entrepreneur dream I'd been circling for so long. The Coffee Bike World community on Discord has been huge for me — owners actually help each other. I post almost daily because I want others to see it's possible. If you're on the fence, just go.",
    },
    {
      name: 'Chris',
      loc: 'Lawndale, CA',
      biz: 'Ampelos Coffee',
      months: 9,
      img: 'https://coffeebike.ca/wp-content/uploads/2026/05/Ampelos.png',
      quote: "I went all in — three bikes from day one. We're building Ampelos Coffee as a brand, not a single cart, and the bikes let us scale that vision with consistency. The aesthetic and the detail matter to us, and the build quality holds up to what we're going for. None of this happens without my wife and kids putting in the work alongside me. Family business, family-built.",
    },
  ];

  const faqs = [
    { q: 'What is the purchasing process, and what payment methods do you accept?',
      sections: [
        { label: '1. Submit Your Pre-Order', text: 'Pre-order one or multiple Coffee Bikes by filling in the inquiry form above with your build configuration.' },
        { label: '2. Invoice & Payment Window', text: 'Our team will contact you within one business day and issue the invoice. You have up to 5 business days to settle the balance. If you need additional time due to emergency or personal circumstances, email us to request an extension — subject to management approval.' },
        { label: '3. Production Begins', text: 'Once full payment is received, we begin manufacturing your Coffee Bike immediately. If we have units in stock, we move straight to dispatch.' },
        { label: '4. Shipping Invoice', text: 'A second invoice for shipping is sent closer to the dispatch date, since freight rates fluctuate. This ensures you receive the most accurate, up-to-date shipping quote.' },
        { label: '5. Dispatch & Delivery', text: 'Once your unit is ready and all invoices are settled, we pack and ship your Coffee Bike directly to you. Get ready to launch.' },
        { label: 'Accepted Payment Methods', text: 'We accept direct bank transfer and credit card payments. A 3.9% processing fee applies to credit card transactions. Both an invoice and an official receipt are issued for your accounting records.' },
        { label: 'Important Notes', text: 'Shipping is calculated separately once the delivery address is available. All sales are final — once payment is received, we reserve your spot in the production queue and begin manufacturing right away. Based on our market research, we expect very high demand on our first round of production, so earlier orders mean faster delivery.' },
      ],
    },
    { q: 'Is Coffee Bike a franchise? What\'s the catch?',
      sections: [
        { label: 'No Franchise Model', text: 'We are not a franchise. Think of us more as a Coffee Bike dealership — you purchase the bike and own it outright.' },
        { label: 'No Ongoing Fees', text: 'There are zero royalty fees, marketing fees, or monthly contracts. 100% of your revenue stays with you.' },
        { label: 'Independent Community', text: 'Our vision is to build a global, non-obligatory community of independent entrepreneurs who support each other and share what works.' },
      ],
    },
    { q: 'Do you ship worldwide?',
      sections: [
        { label: 'Global Shipping', text: 'Yes. We ship Coffee Bikes worldwide with white-glove support, and have owners operating successfully on multiple continents.' },
        { label: 'Shipping Costs', text: 'Shipping is calculated separately once the final delivery address is available. A shipping quote is provided before final order confirmation.' },
        { label: 'Delivery Process', text: 'Every Coffee Bike is crated, palletized, and insured. We coordinate with reliable freight partners to ensure safe arrival at your door.' },
      ],
    },
    { q: 'How long does it take to get my Coffee Bike?',
      sections: [
        { label: 'In-Stock Units', text: 'If we have units in stock at the time your payment is received, we dispatch your Coffee Bike right away.' },
        { label: 'Made-to-Order', text: 'For built-to-order configurations, manufacturing takes 3–4 weeks from payment confirmation. Please get in touch directly for the most accurate ETA based on current production load.' },
        { label: 'Production Capacity', text: 'Our current facility is capable of producing up to 50 Coffee Bikes per month, so lead times stay predictable even during peak demand.' },
      ],
    },
    { q: 'Does my Coffee Bike have any warranty? What happens if something breaks down?',
      sections: [
        { label: '1-Year Manufacturer Warranty', text: 'Your Coffee Bike comes with a full 1-year warranty covering any manufacturing defects. If anything covered breaks down, we will repair or replace it at our cost as quickly as possible.' },
        { label: 'Quality Control Before Shipping', text: 'Every Coffee Bike goes through multiple rounds of testing and inspection before it leaves our facility. We catch issues before you ever see them.' },
        { label: 'Replacement Parts Support', text: 'If you or your staff damage something during daily operations, we help you source the right replacement parts as quickly as possible — no guesswork on your end.' },
        { label: 'Exclusive Owners Portal', text: 'All Coffee Bike owners gain access to our exclusive Coffee Bike Owners Portal, where you can purchase any spare parts, replacement equipment, or additional accessories directly from us — no local research, no guessing what fits.' },
      ],
    },
    { q: 'Do I need any permits to operate my Coffee Bike, and where can I operate?',
      sections: [
        { label: 'Local Regulations Vary', text: 'Every city, county, and municipality has its own rules for mobile food and beverage operations. Requirements can differ significantly even between neighboring jurisdictions.' },
        { label: 'Your Responsibility', text: 'Securing a location, mobile vendor permit, and any required licenses is the responsibility of the owner. We are not able to obtain these on your behalf.' },
        { label: 'Where You Can Operate', text: 'In general, consider two paths: private property (by agreement with the landlord or property owner) and public or city property (by securing the required permits where applicable). Each route has different paperwork, costs, and timelines.' },
        { label: 'Consulting Support', text: 'For an additional fee, we offer Mobile Business Consulting services to help you navigate local requirements — researching your jurisdiction, contacting relevant authorities where feasible, and guiding you through the process. Availability varies by region and is not applicable in every location worldwide.' },
      ],
    },
    { q: 'What can I sell from my Coffee Bike?',
      sections: [
        { label: 'Your Business, Your Menu', text: 'We don\'t limit you to any specific products. Coffee Bike is fully your business — you choose your own menu, your own pricing, and your own brand direction.' },
        { label: 'Menu Suggestions Included', text: 'We are happy to share the initial menu ideas and recipes we have been using and refining across our own Coffee Bike operations over the past 7+ years. A proven starting point you can adapt to your local market.' },
        { label: 'Specialty Coffee & More', text: 'The standard Coffee Bike setup is fully equipped to serve a complete range of specialty espresso-based drinks, plus additional items such as hot chocolate, tea, matcha, and more.' },
        { label: 'Beyond Coffee', text: 'Our Open Concept and Iced Express base packages are designed for owners with creative business ideas beyond espresso — ice cream, cold drinks, smoothies, bottled beverages, or anything else you envision. We are happy to help you bring that vision to life.' },
      ],
    },
    { q: 'What about winter and cold seasons? Can I really operate year-round?',
      sections: [
        { label: 'Yes — Coffee Bike Was Built for Year-Round Operation', text: 'The single biggest misconception about a mobile coffee business is that it only works in summer. The reality: our most successful owners operate 12 months a year by moving indoors during cold seasons. The Coffee Bike\'s compact footprint and full electric-mode operation are designed exactly for this.' },
        { label: 'Indoor Partnerships Are Everywhere', text: 'Hospitals, airports, residential towers, office buildings, grocery stores, gyms, universities, corporate campuses, hotel lobbies — these all want premium coffee service for their tenants, employees, and customers, especially in winter. We have helped owners land partnerships across every category.' },
        { label: 'Why Property Managers Love It', text: 'Landlords and property managers are often eager to collaborate because the Coffee Bike requires zero buildout, no plumbing changes, no electrical upgrades, no permits on their end, and no long-term infrastructure commitment. You roll in, plug into a standard outlet, and start serving. They get a premium amenity their tenants love without any of the usual headaches.' },
        { label: 'A True 4-Season Business', text: 'Outdoor events and farmers markets in spring, summer, and fall. Indoor partnerships and corporate catering in winter. Many of our top earners actually report higher winter revenue because indoor traffic is consistent, weather-protected, and tenant-funded. The Coffee Bike fits almost anywhere — stay indoors, stay profitable, and operate all year long.' },
      ],
    },
    { q: 'Do you provide any training?',
      sections: [
        { label: 'Option 1: Self-Guided Training (Included)', text: 'Every Coffee Bike purchase includes a detailed 20+ page Coffee Bike Barista Manual and a complete series of setup videos to get you started. You also gain access to our private Coffee Bike Community Discord, where owners and our team share tips, feedback, and ongoing support.' },
        { label: 'Option 2: In-Person or 1-on-1 Training ($850 USD)', text: 'Join us at our headquarters in Vancouver, Canada for a 2-day hands-on training session, or schedule a 2-day live Zoom training one-on-one with our supervisor. Same depth, your choice of format.' },
        { label: 'Option 3: Coffee Bike Barista Online Course ($275 USD)', text: 'A premium video course on how to operate as an efficient Coffee Bike barista — covering our tips, tricks, and operational best practices for both daily service and broader business success.' },
      ],
    },
    { q: 'What is the Coffee Bike World community and is it mandatory to be part of it?',
      sections: [
        { label: 'Completely Optional', text: 'Participation in the Coffee Bike World community is entirely optional. You own your Coffee Bike outright, and there is no requirement to join, post, or interact in any way.' },
        { label: 'Our Vision', text: 'That said, our vision has always been to build a global, supportive network of independent Coffee Bike entrepreneurs. The vast majority of our owners choose to be part of it — exchanging ideas, sharing event wins, asking questions, and helping each other navigate challenges day-to-day.' },
        { label: 'Built on Real Feedback', text: 'We listen carefully to community feedback and continue to refine and improve the Coffee Bike based on what our owners share with us. Many of the upgrades you see in the current build came directly from owner suggestions.' },
      ],
    },
    { q: 'Can I purchase territory rights or become a distributor for the entire region or country?',
      sections: [
        { label: 'Larger Partnerships Welcome', text: 'We are always happy to discuss larger-scope partnerships, regional rights, and distributor opportunities.' },
        { label: 'Get In Touch', text: 'Please email us your proposal or questions at coffeebike@vladvik.com and our team will respond personally.' },
      ],
    },
  ];

  const pressArticles = [
    { source: 'Coffee Association of Canada', title: '2025 Coffee Association of Canada Awards — Winners Announced', url: 'https://www.grocerybusiness.ca/coffee-association-of-canada-announces-winners-of-2025-awards/', tag: 'Award' },
    { source: 'Coffee Association of Canada', title: 'Official Awards Page — Coffee Association of Canada', url: 'https://coffeeassoc.com/awards/', tag: 'Award' },
    { source: 'Vancouver Is Awesome', title: 'Vancouver Entrepreneur Featured on Dragons\' Den', url: 'https://www.vancouverisawesome.com/local-news/vancouver-entrepreneur-coffee-bikes-dragons-den-episode-10695796', tag: 'Press' },
    { source: 'Daily Hive Vancouver', title: 'Coffee Bike Featured on Dragons\' Den', url: 'https://dailyhive.com/vancouver/vancouver-entrepreneur-coffee-bike-dragons-den', tag: 'Press' },
    { source: 'Daily Hive Vancouver', title: 'Meet Coffee Bike — Vancouver\'s Mobile Espresso Brand', url: 'https://dailyhive.com/vancouver/coffee-bike-vancouver', tag: 'Press' },
    { source: '604 Now', title: 'Coffee Bike Vancouver — Local Spotlight', url: 'https://604now.com/coffee-bike-vancouver/', tag: 'Press' },
    { source: 'Newswire', title: 'Vancouver-Based Coffee Bike Embarks On Global Expansion', url: 'https://www.newswire.ca/news-releases/vancouver-based-coffee-bike-embarks-on-global-expansion-with-innovative-mobile-espresso-bars-821679349.html', tag: 'Press Release' },
    { source: 'LinkedIn — Brian Scudamore', title: 'What Makes A Great Business Idea — Featured Post', url: 'https://www.linkedin.com/posts/scudamore_what-makes-a-great-business-idea-sometimes-activity-7392565275818213376-XmRb/', tag: 'Feature' },
    { source: 'Instagram', title: '@coffeebike.world — Latest Stories & Highlights', url: 'https://www.instagram.com/coffeebike.world', tag: 'Social' },
  ];

  const ZoomImg = ({ src, alt = '', className = '', aspect = 'aspect-video', objectPosition = 'center' }) => {
    if (!src) return <div className={`${aspect} ${className} bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center text-zinc-400 text-xs font-medium`}>{alt || 'Image'}</div>;
    return (
      <div className={`relative ${aspect} ${className} overflow-hidden bg-zinc-100`}>
        <img src={src} alt={alt} className="w-full h-full object-cover pointer-events-none" style={{ objectPosition }} loading="lazy" />
        <button type="button" onClick={(e) => { e.stopPropagation(); setZoomImg(src); }} aria-label="Zoom in" className="absolute top-2 right-2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 shadow-lg">
          <ZoomIn className="w-5 h-5 text-white" strokeWidth={2.5} />
        </button>
      </div>
    );
  };

  const Radio = ({ checked }) => (
    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0" style={{ borderColor: checked ? RED : '#d4d4d8' }}>
      {checked && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: RED }} />}
    </div>
  );

  const Checkbox = ({ checked }) => (
    <div className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: checked ? RED : 'white', borderColor: checked ? RED : '#d4d4d8' }}>
      {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
    </div>
  );

  const Logo = () => (
    <a href="#" className="block" aria-label="Coffee Bike">
      <img
        src="https://coffeebike.ca/wp-content/uploads/2025/04/cofee_bike_logo_rwhite_transparent.png"
        alt="Coffee Bike"
        className="h-12 w-auto"
      />
    </a>
  );

  const EyebrowBadge = ({ children, className = '' }) => (
    <div className={`inline-block text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 ${className}`} style={{ backgroundColor: RED }}>{children}</div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 pb-20 sm:pb-0">
      {zoomImg && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6 cursor-zoom-out" onClick={() => setZoomImg(null)}>
          <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10" onClick={(e) => { e.stopPropagation(); setZoomImg(null); }} aria-label="Close preview">
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center gap-4 max-w-full max-h-full">
            <img src={typeof zoomImg === 'string' ? zoomImg : zoomImg.src} alt="" className="max-w-full max-h-[80vh] object-contain rounded-lg cursor-zoom-out" onClick={() => setZoomImg(null)} />
            {typeof zoomImg === 'object' && zoomImg.label && <div className="text-white text-sm font-semibold tracking-wide text-center px-4">{zoomImg.label}</div>}
          </div>
        </div>
      )}

      {/* INQUIRY MODAL */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" style={{ zIndex: 9999 }} onClick={() => setInquiryModalOpen(false)}>
         <div className="bg-white rounded-2xl shadow-2xl w-[94vw] max-w-2xl overflow-hidden relative flex flex-col" style={{ maxHeight: '86vh' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-200 bg-white flex-shrink-0">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider font-bold mb-0.5" style={{ color: RED }}>Save My Build</div>
                <div className="text-base font-bold leading-tight">Send Your Inquiry</div>
              </div>
              <button onClick={() => setInquiryModalOpen(false)} aria-label="Close" className="w-9 h-9 rounded-full hover:bg-zinc-100 flex items-center justify-center transition flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>
            {basePackage && (
  <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-200 flex-shrink-0">
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-0.5">Your Coffee Bike Build</div>
        <div className="text-xs text-zinc-700 leading-tight truncate">
          {basePackages[basePackage]?.name}
          {setup && ` · ${setups[setup]?.name.split(' ').slice(0, 3).join(' ')}${setups[setup]?.name.split(' ').length > 3 ? '...' : ''}`}
          {Object.values(addOns).some(v => v) && ` · +${Object.values(addOns).filter(v => v).length} add-on${Object.values(addOns).filter(v => v).length > 1 ? 's' : ''}`}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Total</div>
        <div className="text-base font-bold" style={{ color: RED }}>{fmt(total)}</div>
      </div>
    </div>
    <div className="text-[10px] text-zinc-500 mt-1.5 flex items-center gap-1">
      <Check className="w-3 h-3" style={{ color: RED }} strokeWidth={3} />
      Your full build details will be attached to this inquiry automatically.
    </div>
  </div>
)}
<div className="flex-1 overflow-y-auto bg-white px-3 sm:px-5 pb-4">
  <iframe src={iframeUrl} style={{ width: '100%', height: '78vh', border: 'none', borderRadius: 0, display: 'block' }} id="inline-xnay3GGsJKCfqhvw55Yx" title="Save My Build"></iframe>
</div>
</div>
</div>
)}

      {/* SCHEDULE MODAL */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" style={{ zIndex: 9999 }} onClick={() => setScheduleModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[94vw] max-w-4xl overflow-hidden relative flex flex-col h-[94vh]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-200 bg-white flex-shrink-0">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider font-bold mb-0.5" style={{ color: RED }}>Schedule a Call</div>
                <div className="text-base font-bold leading-tight">Pick a Time With Our Team</div>
              </div>
              <button onClick={() => setScheduleModalOpen(false)} aria-label="Close" className="w-9 h-9 rounded-full hover:bg-zinc-100 flex items-center justify-center transition flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>
            {basePackage && (
              <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-200 flex-shrink-0">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-0.5">Your Coffee Bike Build</div>
                    <div className="text-xs text-zinc-700 leading-tight truncate">
                      {basePackages[basePackage]?.name}
                      {setup && ` · ${setups[setup]?.name.split(' ').slice(0, 3).join(' ')}${setups[setup]?.name.split(' ').length > 3 ? '...' : ''}`}
                      {Object.values(addOns).some(v => v) && ` · +${Object.values(addOns).filter(v => v).length} add-on${Object.values(addOns).filter(v => v).length > 1 ? 's' : ''}`}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Total</div>
                    <div className="text-base font-bold" style={{ color: RED }}>{fmt(total)}</div>
                  </div>
                </div>
                <div className="text-[10px] text-zinc-500 mt-1.5 flex items-center gap-1">
                  <Check className="w-3 h-3" style={{ color: RED }} strokeWidth={3} />
                  Your build details will be attached to this booking automatically.
                </div>
              </div>
            )}
<div className="flex-1 min-h-0 overflow-hidden bg-white px-3 sm:px-5 pb-4">
  <iframe
    src={bookingUrl}
    style={{
      width: '100%',
      height: '100%',
      border: 'none',
      borderRadius: 0,
      display: 'block'
    }}
    scrolling="yes"
    title="Schedule a Call"
  ></iframe>
</div>
          </div>
        </div>
      )}

      {/* DEPOSIT MODAL */}
      {depositModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" style={{ zIndex: 9999 }} onClick={() => setDepositModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-[94vw] max-w-4xl overflow-hidden relative flex flex-col" style={{ maxHeight: '94vh' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-200 bg-white flex-shrink-0">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider font-bold mb-0.5" style={{ color: RED }}>Reserve Your Production Spot</div>
                <div className="text-base font-bold leading-tight">$250 USD Deposit</div>
              </div>
              <button onClick={() => setDepositModalOpen(false)} aria-label="Close" className="w-9 h-9 rounded-full hover:bg-zinc-100 flex items-center justify-center transition flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-white">
              {!paymentStarted ? (
                <div className="p-5">
                  <div className="mb-5">
                    <h3 className="text-sm font-bold mb-2">What this deposit does</h3>
                    <ul className="space-y-1.5 text-sm text-zinc-700">
                      <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: RED }} strokeWidth={3} /><span>Secures your production spot in the next batch</span></li>
                      <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: RED }} strokeWidth={3} /><span>Locks in your build configuration at current pricing</span></li>
                      <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: RED }} strokeWidth={3} /><span>Fully applied toward your final order total — not an extra charge</span></li>
                      <li className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: RED }} strokeWidth={3} /><span>Our team will contact you within one business day to confirm details</span></li>
                    </ul>
                  </div>
                  {basePackage ? (
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                        <h3 className="text-sm font-bold">Your Coffee Bike Build</h3>
                        <div className="text-xs text-zinc-500">Estimated total: <span className="font-bold text-zinc-900">{fmt(total)}</span></div>
                      </div>
                      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 max-h-40 overflow-y-auto">
                        <pre className="text-[11px] text-zinc-700 leading-relaxed whitespace-pre-wrap font-sans">{buildSummary}</pre>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-5 p-3 rounded-lg border border-amber-200 bg-amber-50 text-xs text-amber-900 leading-relaxed">
                      You haven't configured a build yet. You can still place the $250 deposit to reserve a spot — we'll work with you on the configuration after payment. Or close this and use the configurator first.
                    </div>
                  )}
                  {basePackage && (
                    <div className="mb-5 rounded-lg border-2 p-4" style={{ borderColor: RED, backgroundColor: RED_TINT }}>
                      <div className="flex items-start gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5" style={{ backgroundColor: RED }}>1</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold mb-1">Copy your build code</div>
                          <div className="text-xs text-zinc-700 leading-relaxed mb-2">On the next page, paste this into the <strong>"Your Coffee Bike Build"</strong> field at Stripe checkout.</div>
                          <div className="bg-white border border-zinc-300 rounded p-2 mb-2 max-h-20 overflow-y-auto">
                            <code className="text-[10px] text-zinc-700 leading-snug break-all">{buildCodeCompact}</code>
                          </div>
                          <div className="text-[10px] text-zinc-500 mb-2">{buildCodeCompact.length}/250 characters</div>
                          <button onClick={copyBuildToClipboard} className={`inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition ${buildCopied ? 'bg-green-600 text-white' : 'bg-white border-2 hover:bg-zinc-50'}`} style={{ borderColor: buildCopied ? undefined : RED, color: buildCopied ? undefined : RED }}>
                            {buildCopied ? (<><Check className="w-3.5 h-3.5" strokeWidth={3} /> Copied!</>) : (<>📋 Copy Build Code</>)}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 pt-3 border-t border-white/60">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5" style={{ backgroundColor: RED }}>2</div>
                        <div className="flex-1">
                          <div className="text-sm font-bold mb-1">Pay $250 USD on Stripe</div>
                          <div className="text-xs text-zinc-700 leading-relaxed">Secure checkout — credit card or Apple/Google Pay accepted. Opens in a new tab.</div>
                        </div>
                      </div>
                    </div>
                  )}
                  <button onClick={handleProceedToStripe} className="block w-full text-white font-bold py-3.5 rounded text-sm hover:opacity-90 text-center transition flex items-center justify-center gap-2" style={{ backgroundColor: RED }}>
                    Continue to Stripe — Pay $250 Deposit <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[10px] text-zinc-500 mt-3">
                    <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Secured by Stripe</span>
                    <span>·</span>
                    <span>All sales final once production begins</span>
                    <span>·</span>
                    <span>Applied to final total</span>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: RED_TINT }}>
                    <Lock className="w-7 h-7" style={{ color: RED }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Stripe checkout opened in a new tab</h3>
                  <p className="text-sm text-zinc-600 mb-5 leading-relaxed max-w-sm mx-auto">Complete your $250 deposit payment in the new tab. We'll contact you within one business day to confirm your build details.</p>
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left mb-5 max-w-sm mx-auto">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-2">Quick reminder</div>
                    <ul className="space-y-2 text-xs text-zinc-700">
                      <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: RED }} strokeWidth={3} /><span>Paste your build code into the "Your Coffee Bike Build" field</span></li>
                      <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: RED }} strokeWidth={3} /><span>Use the same email so we can match your inquiry</span></li>
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-sm mx-auto">
                    <button onClick={() => setPaymentStarted(false)} className="flex-1 bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold py-2.5 rounded text-sm transition">← Back</button>
                    <button onClick={handleProceedToStripe} className="flex-1 text-white font-semibold py-2.5 rounded text-sm hover:opacity-90 transition" style={{ backgroundColor: RED }}>Reopen Stripe Tab</button>
                  </div>
                  <button onClick={() => setDepositModalOpen(false)} className="mt-4 text-xs text-zinc-500 hover:text-zinc-900 underline">Close this window</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FINANCING MODAL */}
      {financingModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" style={{ zIndex: 9999 }} onClick={() => setFinancingModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col" style={{ maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-200 bg-white flex-shrink-0">
              <div className="min-w-0 flex items-center gap-2">
                <span className="text-xl">🍁</span>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold mb-0.5" style={{ color: RED }}>Apply for Financing</div>
                  <div className="text-base font-bold leading-tight">Canada Residents Only</div>
                </div>
              </div>
              <button onClick={() => setFinancingModalOpen(false)} aria-label="Close" className="w-9 h-9 rounded-full hover:bg-zinc-100 flex items-center justify-center transition flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-white">
              {!financingStarted ? (
                <div className="p-5">
                  <div className="mb-5 p-3 rounded-lg border-2 flex items-start gap-2.5" style={{ borderColor: RED, backgroundColor: RED_TINT }}>
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: RED }} />
                    <div className="text-xs leading-relaxed text-zinc-800">
                      <strong>Financing is currently available for Canadian purchases and Canadian residents only.</strong> Applications outside Canada cannot be processed at this time.
                    </div>
                  </div>
                  {basePackage ? (
                    <div className="mb-5">
                      <h3 className="text-sm font-bold mb-2">Your Coffee Bike Build</h3>
                      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 max-h-32 overflow-y-auto">
                        <pre className="text-[11px] text-zinc-700 leading-relaxed whitespace-pre-wrap font-sans">{buildSummary}</pre>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-5 p-3 rounded-lg border border-amber-200 bg-amber-50 text-xs text-amber-900 leading-relaxed">
                      You haven't configured a build yet. You can still apply for financing — we'll work with you on the configuration after approval. Or close this and use the configurator first for a more accurate estimate.
                    </div>
                  )}
                  <div className="mb-5">
                    <h3 className="text-sm font-bold mb-2">Estimated Financing Total <span className="text-xs font-normal text-zinc-500">(in CAD)</span></h3>
                    <div className="rounded-lg border border-zinc-200 overflow-hidden">
                      <div className="px-4 py-2.5 flex items-center justify-between text-sm border-b border-zinc-100">
                        <span className="text-zinc-700">Coffee Bike Build (Subtotal)</span>
                        <span className="font-semibold">{fmtCAD(financingTotals.subtotalCAD)}</span>
                      </div>
                      <div className="px-4 py-2.5 flex items-center justify-between text-sm border-b border-zinc-100">
                        <span className="text-zinc-700">GST / PST <span className="text-xs text-zinc-500">(12% combined)</span></span>
                        <span className="font-semibold">+ {fmtCAD(financingTotals.tax)}</span>
                      </div>
                      <div className="px-4 py-2.5 flex items-center justify-between text-sm border-b border-zinc-100">
                        <span className="text-zinc-700">Shipping <span className="text-xs text-zinc-500">(estimated, to be confirmed)</span></span>
                        <span className="font-semibold">+ {fmtCAD(financingTotals.shipping)}</span>
                      </div>
                      <div className="px-4 py-3 flex items-center justify-between text-base bg-zinc-50">
                        <span className="font-bold">Total to Finance</span>
                        <span className="font-bold text-lg" style={{ color: RED }}>{fmtCAD(financingTotals.grandTotal)}</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-2 leading-relaxed">Tax and shipping are estimates. Final figures will be confirmed with you before any payment is collected. Use the total above as a reference amount on your financing application.</div>
                  </div>
                  <div className="mb-5 rounded-lg border-2 p-4" style={{ borderColor: RED, backgroundColor: RED_TINT }}>
                    <div className="flex items-start gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5" style={{ backgroundColor: RED }}>1</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold mb-1">Copy financing amount</div>
                        <div className="text-xs text-zinc-700 leading-relaxed mb-2">Use this number as the amount you want to finance when you fill out the iFinance Canada application.</div>
                        <div className="bg-white border border-zinc-300 rounded p-2 mb-2 flex items-center justify-between">
                          <code className="text-sm font-bold text-zinc-900">{financingTotals.grandTotal.toLocaleString()}</code>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">CAD</span>
                        </div>
                        <button onClick={copyFinancingAmount} className={`inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition ${financingAmountCopied ? 'bg-green-600 text-white' : 'bg-white border-2 hover:bg-zinc-50'}`} style={{ borderColor: financingAmountCopied ? undefined : RED, color: financingAmountCopied ? undefined : RED }}>
                          {financingAmountCopied ? (<><Check className="w-3.5 h-3.5" strokeWidth={3} /> Copied!</>) : (<>📋 Copy Amount</>)}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 pt-3 border-t border-white/60">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5" style={{ backgroundColor: RED }}>2</div>
                      <div className="flex-1">
                        <div className="text-sm font-bold mb-1">Complete the application</div>
                        <div className="text-xs text-zinc-700 leading-relaxed">Opens iFinance Canada's secure online application in a new tab. Once approved, our team will coordinate with you on final order and payment.</div>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleProceedToFinancing} className="block w-full text-white font-bold py-3.5 rounded text-sm hover:opacity-90 text-center transition flex items-center justify-center gap-2" style={{ backgroundColor: RED }}>
                    Continue to iFinance Canada Application <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[10px] text-zinc-500 mt-3">
                    <span className="flex items-center gap-1">🍁 Canadian Applicants Only</span>
                    <span>·</span>
                    <span>Application is independent of Coffee Bike</span>
                    <span>·</span>
                    <span>Approval not guaranteed</span>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl" style={{ backgroundColor: RED_TINT }}>🍁</div>
                  <h3 className="text-xl font-bold mb-2">Financing application opened in a new tab</h3>
                  <p className="text-sm text-zinc-600 mb-5 leading-relaxed max-w-sm mx-auto">Complete your application with iFinance Canada in the new tab. Once you hear back, contact us so we can finalize your order together.</p>
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left mb-5 max-w-sm mx-auto">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-2">Quick reminder</div>
                    <ul className="space-y-2 text-xs text-zinc-700">
                      <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: RED }} strokeWidth={3} /><span>Use <strong>{fmtCAD(financingTotals.grandTotal)}</strong> as your reference financing amount</span></li>
                      <li className="flex items-start gap-2"><Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: RED }} strokeWidth={3} /><span>After approval, email us at coffeebike@vladvik.com with your confirmation</span></li>
                    </ul>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-sm mx-auto">
                    <button onClick={() => setFinancingStarted(false)} className="flex-1 bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-semibold py-2.5 rounded text-sm transition">← Back</button>
                    <button onClick={handleProceedToFinancing} className="flex-1 text-white font-semibold py-2.5 rounded text-sm hover:opacity-90 transition" style={{ backgroundColor: RED }}>Reopen Application</button>
                  </div>
                  <button onClick={() => setFinancingModalOpen(false)} className="mt-4 text-xs text-zinc-500 hover:text-zinc-900 underline">Close this window</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PRESS MODAL */}
      {pressModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" style={{ zIndex: 9999 }} onClick={() => setPressModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col" style={{ maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-200 bg-white flex-shrink-0">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider font-bold mb-0.5" style={{ color: RED }}>In The Press</div>
                <div className="text-base font-bold leading-tight">Articles & Recognition</div>
              </div>
              <button onClick={() => setPressModalOpen(false)} aria-label="Close" className="w-9 h-9 rounded-full hover:bg-zinc-100 flex items-center justify-center transition flex-shrink-0">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-white p-5">
              <p className="text-xs text-zinc-600 mb-4 leading-relaxed">Selected press coverage and recognition. Each link opens in a new tab.</p>
              <div className="space-y-2">
                {pressArticles.map((p, i) => (
                  <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:shadow-sm transition group bg-white">
                    <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: RED_TINT }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <div className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">{p.source}</div>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: p.tag === 'Award' ? '#d97706' : RED }}>{p.tag}</span>
                      </div>
                      <div className="text-sm font-semibold text-zinc-900 leading-tight group-hover:underline">{p.title}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition flex-shrink-0 mt-1" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sticky CTA */}
      {!inConfigurator && (
        <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
          <div className="flex-1 min-w-0">
            {total > 0 ? (
              <>
                <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold leading-none mb-0.5">Your Build</div>
                <div className="text-base font-bold text-white truncate">{fmt(total)}</div>
              </>
            ) : (
              <>
 <div>
  <div className="text-lg sm:text-xl font-extrabold text-white leading-tight">
    Instant Quote
  </div>
</div>
              </>
            )}
          </div>
          <button onClick={() => document.getElementById('configurator-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="text-white font-bold px-4 py-2.5 rounded text-xs uppercase tracking-wide whitespace-nowrap flex items-center gap-1.5 shadow-md" style={{ backgroundColor: RED }}>
            {total > 0 ? 'Continue Build' : 'Build Your Bike'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Mobile sticky foldable order summary */}
      {inConfigurator && (
        <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden">
          {mobileSummaryOpen && (
            <div className="bg-white border-t border-zinc-200 max-h-[60vh] overflow-y-auto shadow-2xl">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold">Your Order</h3>
                  <button onClick={() => setMobileSummaryOpen(false)} className="w-7 h-7 rounded-full hover:bg-zinc-100 flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <OrderItem num="1" label="BASE PACKAGE" onEdit={() => { setMobileSummaryOpen(false); editStep('step1'); }}>
  {basePackage ? (
    <>
      <div className="flex items-center gap-2 mt-1.5">
        <img
          src={basePackages[basePackage].img || IMG.classic}
          alt=""
          className="w-10 h-10 rounded object-cover flex-shrink-0"
        />

        <div className="min-w-0">
          <div className="text-xs font-semibold truncate">
            {basePackages[basePackage].name}
          </div>
          <div className="text-xs text-zinc-700">
            {fmt(basePackages[basePackage].price)}
          </div>
        </div>
      </div>

      {basePackages[basePackage].isCustom && baseCustomInquiry.trim() && (
        <div
          className="mt-2 px-2 py-1.5 rounded text-[11px] text-zinc-700 italic leading-snug border-l-2"
          style={{ backgroundColor: '#fafafa', borderLeftColor: RED }}
        >
          <span className="not-italic font-semibold text-zinc-500 text-[10px] uppercase tracking-wider block mb-1">
            Your note
          </span>
          “{baseCustomInquiry}”
        </div>
      )}
    </>
  ) : (
    <div className="text-xs text-zinc-400 mt-1">Not selected</div>
  )}
</OrderItem>
                <OrderItem num="2" label="SETUP" onEdit={() => { setMobileSummaryOpen(false); editStep('step2'); }}>
                  {setup ? (
                    <div className="flex items-start gap-2 mt-1.5">
                      <img src={setups[setup].img} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold leading-tight">{setups[setup].name}</div>
                        <div className="text-xs text-zinc-700 mt-0.5">{setups[setup].included ? 'Included' : fmt(setups[setup].price)}</div>
                      </div>
                    </div>
                  ) : (
                  <div className="text-xs text-zinc-400 mt-1">Not selected</div>
                  )}
                  </OrderItem>

<OrderItem num="3" label="COLOR & BRANDING" onEdit={() => { setMobileSummaryOpen(false); editStep('step3'); }}>
  {color ? (
    <div className="text-xs mt-1.5">
      <div className="font-semibold">
        {color === 'classic' ? 'Classic Color' : 'Pantone Color'}
      </div>

      <div className="text-zinc-700">
        {color === 'classic' ? 'Included' : fmt(750)}
      </div>

      {color === 'classic' && colorInput.trim() && (
        <div className="text-zinc-500 mt-1">
          Requested color: <span className="font-semibold text-zinc-700">{colorInput}</span>
        </div>
      )}

      {color === 'pantone' && pantoneInput.trim() && (
        <div className="text-zinc-500 mt-1">
          Pantone code: <span className="font-semibold text-zinc-700">{pantoneInput}</span>
        </div>
      )}
    </div>
  ) : (
    <div className="text-xs text-zinc-400 mt-1">Not selected</div>
  )}
</OrderItem>
<OrderItem num="4" label="ADD-ONS" onEdit={() => { setMobileSummaryOpen(false); editStep('step4'); }}>
  {Object.values(addOns).some(v => v) ? (
    Object.keys(addOns).filter(k => addOns[k]).map(k => (
      <div key={k} className="flex items-start gap-2 mt-1 text-xs">
        <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: RED }} />

        <div className="flex-1 leading-tight">
          <div>{addOnsList[k].name.split('\n')[0]}</div>

          {k === 'customInquiry' && customInquiryText.trim() && (
            <div className="text-zinc-500 mt-1 italic">
              Custom request: <span className="font-semibold text-zinc-700">{customInquiryText}</span>
            </div>
          )}
        </div>
      </div>
    ))
  ) : (
    <div className="text-xs text-zinc-400 mt-1">None selected</div>
  )}
</OrderItem>

<OrderItem num="5" label="SUPPORT" last onEdit={() => { setMobileSummaryOpen(false); editStep('step5'); }}>
  {Object.values(support).some(v => v) ? (
    Object.keys(support).filter(k => support[k]).map(k => (
      <div key={k} className="flex items-center gap-2 mt-1 text-xs">
        <Check className="w-3 h-3 flex-shrink-0" style={{ color: RED }} />
        <span className="flex-1 leading-tight">
          {supportList[k].name}
        </span>
      </div>
    ))
  ) : (
    <div className="text-xs text-zinc-400 mt-1">None selected</div>
  )}
</OrderItem>
                <div id="mobile-summary-ctas" className="border-t border-zinc-200 pt-3 mt-3 scroll-mt-4">
                  <button onClick={() => { setMobileSummaryOpen(false); openInquiry(); }} className="w-full text-white font-bold py-2.5 rounded text-sm hover:opacity-90 flex items-center justify-center gap-2 mb-2" style={{ backgroundColor: RED }}>
                    Save My Build & Send Inquiry <ArrowRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setMobileSummaryOpen(false); openSchedule(); }} className="w-full bg-black text-white font-bold py-2.5 rounded text-sm">Schedule a Call</button>
                  <div className="mt-3 pt-3 border-t border-zinc-100 space-y-2">
                    <button onClick={() => { setMobileSummaryOpen(false); openDeposit(); }} className="block w-full text-center text-xs font-medium py-1.5 px-3 rounded hover:bg-zinc-50 transition group" style={{ color: RED }}>
                      <span className="border-b border-dashed group-hover:border-solid" style={{ borderColor: RED }}>Or reserve your spot with $250 deposit →</span>
                    </button>
                    <button onClick={() => { setMobileSummaryOpen(false); openFinancing(); }} className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-600 hover:text-black transition py-1 w-full">
                      <span style={{ color: RED }}>🍁</span>
                      <span className="underline decoration-dotted underline-offset-2">Apply for Financing (Canada Only)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="w-full bg-black/95 backdrop-blur-md border-t border-white/10 px-5 py-4 flex items-center justify-between shadow-2xl">
            <button onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)} className="flex items-center gap-3 min-w-0 flex-1 text-left">
              <ChevronDown className={`w-5 h-5 text-white flex-shrink-0 transition-transform ${mobileSummaryOpen ? 'rotate-0' : 'rotate-180'}`} />
              <div className="min-w-0">
                <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold leading-none mb-0.5">{mobileSummaryOpen ? 'Tap to close' : 'Your Build · Tap for details'}</div>
                {total > 0 ? (
  <div className="text-xl font-black text-white leading-tight">
    {fmt(total)}
  </div>
) : (
  <div className="text-base font-black text-white leading-tight">
    Select package for estimate
  </div>
)}
              </div>
            </button>
            <button onClick={() => {
              setMobileSummaryOpen(true);
              setTimeout(() => { document.getElementById('mobile-summary-ctas')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
            }} className="text-white font-bold px-3.5 py-2 rounded text-xs uppercase tracking-wide whitespace-nowrap flex items-center gap-1.5 flex-shrink-0" style={{ backgroundColor: RED }}>
              Inquire <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

<nav className="bg-[#070707] text-white sticky top-0 z-50 border-b border-zinc-900">
  <div className="w-full px-[70px]">
    <div className="flex items-center h-[118px]">
      
      <a
        href="https://coffeebike.ca/"
        className="flex items-center flex-shrink-0 mr-[55px]"
        aria-label="Coffee Bike Home"
      >
        <img
          src="https://coffeebike.ca/wp-content/uploads/2025/04/cofee_bike_logo_rwhite_transparent.png"
          alt="Coffee Bike"
          className="h-[95px] w-auto"
        />
      </a>

      <div
        className="hidden lg:flex items-center gap-[8px] text-[17px] font-black tracking-[0.12em] uppercase leading-none"
        style={{ fontFamily: 'Roboto Condensed, sans-serif' }}
      >
        <a
          href="https://coffeebike.ca/"
          className="px-[15px] py-[18px] text-[#ff1f1f] bg-black hover:bg-zinc-900 transition"
        >
          Home
        </a>

        <div className="relative group">
          <a
            href="https://coffeebike.ca/coffee-catering/"
            className="px-[15px] py-[18px] hover:text-white transition flex items-center gap-[10px] group-hover:bg-[#e31e24] group-hover:text-white"
          >
            Coffee Catering
            
          </a>

          <div className="absolute left-0 top-full hidden group-hover:block bg-white min-w-[265px] shadow-xl z-50">

          </div>
        </div>

        <a
          href="#configurator-section"
          className="px-[15px] py-[18px] hover:text-[#ff1f1f] transition"
        >
          Buy a Coffee Bike
        </a>

 
      </div>

      <div
        className="hidden lg:flex items-center ml-auto text-[17px] font-black tracking-[0.12em] uppercase leading-none"
        style={{ fontFamily: 'Roboto Condensed, sans-serif' }}
      >


        <a
          href="https://coffeebike.ca/contact/"
          className="bg-[#e31e24] px-[28px] py-[27px] hover:bg-[#c9181d] transition"
        >
          Get In Touch
        </a>
      </div>

      <button
        type="button"
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className="lg:hidden ml-auto w-11 h-11 flex items-center justify-center border border-zinc-700 rounded-md"
        aria-label="Open menu"
      >
        <span className="text-2xl leading-none">☰</span>
      </button>
    </div>

    {mobileNavOpen && (
      <div
        className="lg:hidden pb-5 flex flex-col gap-1 text-[17px] font-black tracking-[0.12em] uppercase"
        style={{ fontFamily: 'Roboto Condensed, sans-serif' }}
      >
        <a href="https://coffeebike.ca/" className="px-4 py-3 text-[#ff1f1f] bg-black">
          Home
        </a>

        <a href="https://coffeebike.ca/coffee-catering/" className="px-4 py-3 hover:text-[#ff1f1f] transition">
          Coffee Catering
        </a>



        <a href="#configurator-section" className="px-4 py-3 hover:text-[#ff1f1f] transition">
          Buy a Coffee Bike
        </a>





        <a href="https://coffeebike.ca/contact/" className="px-4 py-3 bg-[#e31e24] text-white">
          Get In Touch
        </a>
      </div>
    )}
  </div>
</nav>

      <div className="bg-black text-white py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <EyebrowBadge className="mb-4">Welcome to Coffee Bike World</EyebrowBadge>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-[1.05] mb-4 sm:mb-5">Your Own Electric Mobile Coffee Business — Built, Branded, Shipped Worldwide</h1>
              <p className="text-zinc-300 text-base sm:text-lg mb-5 sm:mb-6 max-w-xl leading-relaxed">Launch your turnkey, eco-friendly business with a low entry cost and fast return on investment. No franchise fees. You own everything.</p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch gap-0 mb-6 sm:mb-7 rounded-lg border-2 overflow-hidden" style={{ borderColor: RED, backgroundColor: 'rgba(227,30,36,0.08)' }}>
<div className="px-5 py-3 flex items-center gap-4 flex-shrink-0">
  <Zap className="w-5 h-5 text-red-500 flex-shrink-0" />
  <div>
    <div className="text-sm text-zinc-300">
      Get your
    </div>
    <div className="text-lg sm:text-xl font-bold text-white leading-tight">
      instant estimate below
    </div>
  </div>
</div>
                <div className="h-px sm:w-px sm:h-auto bg-white/15" />
                <div className="px-5 py-3 flex items-center gap-2 flex-1 sm:min-w-[200px]">
                  <TrendingUp className="w-5 h-5 flex-shrink-0" style={{ color: RED }} />
                  <div className="text-sm text-zinc-300">Most owners <strong className="text-white">recoup their investment in 6–12 months</strong></div>
                </div>
                <div className="h-px sm:w-px sm:h-auto bg-white/15" />
                <div className="px-5 py-3 flex items-center gap-2 flex-1 sm:min-w-[180px]">
                  <Award className="w-5 h-5 flex-shrink-0" style={{ color: RED }} />
                  <div className="text-xs text-zinc-300">Trusted since 2018<br/><strong className="text-white">1.5M+ cups served</strong></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => document.getElementById('why-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="text-white font-bold px-6 py-3 rounded text-sm hover:opacity-90 flex items-center gap-2" style={{ backgroundColor: RED }}>
                  Why Coffee Bike Wins <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => document.getElementById('configurator-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="bg-white text-black font-bold px-6 py-3 rounded text-sm hover:bg-zinc-100">Build Your Coffee Bike</button>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="relative rounded-xl overflow-hidden aspect-video shadow-2xl bg-black">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/gtu8djcY-KY?autoplay=1&mute=1&loop=1&playlist=gtu8djcY-KY&rel=0&modestbranding=1&playsinline=1"
                  title="Coffee Bike — Watch Our Story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
              <div className="text-xs text-zinc-400 mt-2 text-center">Check our YouTube channel and IG for more videos!</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black border-t border-white/10 py-5 px-6">
        <a href="https://www.cbc.ca/dragonsden/pitches/coffee-bike" target="_blank" rel="noopener noreferrer" className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-center sm:text-left hover:opacity-90 transition group">
          <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">As Featured On</div>
          <div className="flex items-center gap-2 text-white">
          <img
  src="https://coffeebike.ca/wp-content/uploads/2026/05/Dragons-Den-2.png"
  alt="Dragons' Den Canada"
  className="h-10 w-auto object-contain"
/>
            <span className="text-base sm:text-lg font-bold tracking-tight">Dragons' Den Canada</span>
          </div>
          <span className="text-xs text-zinc-400 group-hover:text-white transition flex items-center gap-1">Watch our pitch <ArrowRight className="w-3 h-3" /></span>
        </a>
      </div>

      <div id="why-section" className="py-12 px-6 bg-zinc-50 border-b border-zinc-200" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <EyebrowBadge className="mb-3">Be Your Own Boss</EyebrowBadge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Why Entrepreneurs Choose Coffee Bike</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">A turnkey mobile coffee business with low overhead, fast ROI, and full ownership. No franchise, no royalties, no obligations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 max-w-7xl mx-auto">
            <ValueCard icon={<DollarSign />} title="Low Entry Cost" desc={`From $13,495 CAD ($9,850 USD) — a fraction of a brick-and-mortar café. Financing available in Canada.`} red={RED} tint={RED_TINT} />
            <ValueCard icon={<TrendingUp />} title="Fast ROI" desc="Most owners break even in 6–12 months" red={RED} tint={RED_TINT} />
            <ValueCard icon={<Award />} title="No Franchise Fees or Obligations" desc="No royalties, no contracts, no strings attached. You own 100% of your brand and your profits — forever." red={RED} tint={RED_TINT} />
            <ValueCard icon={<Users />} title="Non-Obligatory Global Community" desc="Join a growing global network of Coffee Bike owners — all connected and supporting each other daily. New to coffee? We provide all the training you need to get started." red={RED} tint={RED_TINT} />
            <ValueCard icon={<Star />} title="Proven Business Model" desc="Battle-tested by a growing network of owners worldwide. We know what works — operating since 2018 and over 1.5 million cups served." red={RED} tint={RED_TINT} />
            <ValueCard icon={<Sparkles />} title="Turnkey, Electric & Ready to Roll" desc="Fully equipped, fully tested, fully assembled — and powered by a real e-bike motor that conquers hills, even fully loaded. Brew espresso the day it arrives, anywhere you can ride." red={RED} tint={RED_TINT} />
            <ValueCard icon={<Calendar />} title="Multiple Revenue Streams" desc="Catering, weddings, corporate events, daily retail, festivals — one bike, dozens of income opportunities." red={RED} tint={RED_TINT} />
            <ValueCard icon={<Check />} title="Built for Health Compliance" desc="Various sink configurations, food-safe surfaces, and commercial-grade equipment — customizable to meet your local health code requirements." red={RED} tint={RED_TINT} />
            <ValueCard icon={<Globe />} title="Fully Brandable, Shipped Worldwide" desc="Custom Pantone colors, your logo, your vibe. We deliver fully branded Coffee Bikes anywhere in the world with white-glove shipping." red={RED} tint={RED_TINT} />
            <ValueCard icon={<Lock />} title="1-Year Manufacturer Warranty" desc="Every Coffee Bike is fully covered — frame, equipment, electronics. We stand behind every build so you can launch with confidence." red={RED} tint={RED_TINT} />
          </div>
         
        </div>
      </div>

      <div className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <EyebrowBadge className="mb-3">What You Get</EyebrowBadge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Built for Mobility, Quality & Profitability</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">Every Coffee Bike is built on 8+ years of hands-on experience — fully equipped and ready to operate from day one.</p>
          </div>
          <Carousel red={RED} itemWidth={220}>
            {features.map((f, i) => (
              <div key={i} className="bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-md transition flex flex-col flex-shrink-0" style={{ width: '220px' }}>
                <ZoomImg src={f.img} alt={f.title} aspect="aspect-[4/3]" />
                <div className="p-3 flex-1">
                  <div className="w-7 h-7 mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: RED_TINT }}>
                    <Check className="w-4 h-4" style={{ color: RED }} strokeWidth={3} />
                  </div>
                  <div className="text-sm font-semibold mb-1 leading-tight">{f.title}</div>
                  <div className="text-[11px] text-zinc-600 leading-snug">{f.desc}</div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
<section className="bg-white border-t border-zinc-200 px-6 py-10 sm:py-14">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
      Not ready to build your Coffee Bike yet?
    </h2>

    <p className="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
      Our full Coffee Bike Builder is below, but you don’t need to customize everything right now.
      Fill out the quick Get In Touch form and our team will send you pricing, shipping guidance, and the
      best setup recommendation for your market.
    </p>

    <button
      type="button"
      onClick={() => setIsGetInTouchOpen(true)}
      className="mt-8 inline-flex items-center justify-center rounded-xl bg-red-600 px-8 py-4 text-sm sm:text-base font-black uppercase tracking-wide text-white transition-all duration-300 hover:bg-red-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
    >
      Get In Touch
    </button>
  </div>
</section>
{isGetInTouchOpen && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-6">
    <div className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-5 py-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-zinc-950">
            Get In Touch
          </h3>
          <p className="mt-1 text-sm text-zinc-500">
            Tell us where you want to launch and we’ll help recommend the best setup.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsGetInTouchOpen(false)}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 text-2xl leading-none text-zinc-700 transition hover:bg-zinc-200"
          aria-label="Close Get In Touch form"
        >
          ×
        </button>
      </div>

      <div className="h-[78vh] overflow-y-auto bg-white">
        <iframe
          src="https://link.coffeebike.ca/widget/form/xnay3GGsJKCfqhvw55Yx"
          style={{
            width: '100%',
            height: '1423px',
            border: 'none',
            borderRadius: '0px',
          }}
          id="inline-xnay3GGsJKCfqhvw55Yx"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Save My Build"
          data-height="1423"
          data-layout-iframe-id="inline-xnay3GGsJKCfqhvw55Yx"
          data-form-id="xnay3GGsJKCfqhvw55Yx"
          title="Save My Build"
        />
      </div>
    </div>
  </div>
)}
      <div id="configurator-section" className="py-12 px-6 bg-zinc-50 border-y border-zinc-200" style={{ scrollMarginTop: '80px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-6 text-center">
            <EyebrowBadge className="mb-3">Build Your Bike</EyebrowBadge>
            <h2 className="text-3xl lg:text-4xl font-bold">Customize & Reserve Your Coffee Bike</h2>
            <p className="text-zinc-600 mt-3 max-w-2xl mx-auto">Choose your package, customize your setup, and reserve your production spot. Live pricing updates as you build.</p>
          </div>

          <div className="max-w-5xl mx-auto mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-5 py-3 rounded-lg bg-zinc-900 text-white shadow-lg">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: RED }} />
              <span className="text-zinc-200">Next batch ships <strong className="text-white">{urgency.nextBatch}</strong></span>
            </div>
            <div className="w-px h-4 bg-white/20 hidden sm:block" />
            <div className="text-sm text-zinc-200">Production slots remaining: <strong style={{ color: RED }}>{urgency.slotsRemaining}</strong></div>
            <div className="w-px h-4 bg-white/20 hidden sm:block" />
            <div className="text-xs text-zinc-400">Reserve now to lock in your spot</div>
          </div>

          <div className="max-w-5xl mx-auto mb-6 p-4 rounded-xl bg-white border-2 flex items-center gap-4 flex-wrap" style={{ borderColor: RED }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: RED }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="font-bold text-sm mb-0.5">Recommended Starter Build</div>
              <div className="text-xs text-zinc-600">Classic · Single-Group Espresso · Classic Color · Setup Guide · Barista Video Guide. The fastest, most popular way to launch.</div>
            </div>
            <button onClick={() => {
              setBasePackage('classic'); setSetup('single-group'); setColor('classic');
              setColorInput(''); setPantoneInput(''); setUlCertifiedMap({});
              setAddOns({ lithium: false, extraBattery: false, led: false, latteArt: false, nitro: false, customInquiry: false });
              setCustomInquiryText('');
              setSupport({ discord: true, videoGuide: true, training: false, consulting: false, digital: false });
              setCompleted({ step1: true, step2: true, step3: true, step4: true, step5: true });
              setStepOpen({ step1: false, step2: false, step3: false, step4: false, step5: true });
              advancedRef.current = { step1: true, step2: true, step3: true, step4: true };
            }} className="text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded hover:opacity-90 flex-shrink-0 flex items-center gap-2" style={{ backgroundColor: RED }}>
              <Sparkles className="w-3.5 h-3.5" /> Choose Recommended
            </button>
          </div>

          <div className="max-w-5xl mx-auto mb-6">
            <ProgressBar completed={completed} red={RED} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="text-sm text-zinc-600 font-medium">Choose currency</span>
                {['USD', 'CAD', 'EURO'].map(c => (
                  <button key={c} onClick={() => setCurrency(c)} className={`px-4 py-1.5 rounded text-sm font-semibold transition ${currency === c ? 'bg-black text-white' : 'bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400'}`}>{c}</button>
                ))}
              </div>

              <ConfigSection stepKey="step1" flash={flashStep === 'step1'} number="1" title="Choose Your Base Package" desc="Select the foundation setup that fits your workflow and service style." red={RED} collapsible isOpen={stepOpen.step1} onToggle={() => toggleStep('step1')}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {Object.entries(basePackages).map(([key, p]) => (
                    <div key={key} onClick={() => { setBasePackage(key); advanceFromStep('step1', 'step2'); }} className="relative text-left p-3 rounded-lg border-2 transition bg-white cursor-pointer flex flex-col" style={{ borderColor: basePackage === key ? RED : '#e4e4e7' }}>
                      <div className="flex items-start justify-between mb-2"><Radio checked={basePackage === key} /></div>
                      <div className="mb-2 rounded overflow-hidden"><ZoomImg src={p.img} alt={p.name} aspect="aspect-[4/3]" /></div>
                      <div className="text-sm font-semibold mb-1">{p.name}</div>
                      <div className="text-xs text-zinc-600 mb-2 leading-snug">{p.desc}</div>
                      {p.popular && <div className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded mb-2 text-white w-fit" style={{ backgroundColor: RED }}>Most Popular</div>}
                      <div className="text-sm font-bold mt-auto">{p.isCustom ? `Starts at ${fmt(p.price)}` : fmt(p.price)}</div>
                      {p.isCustom && basePackage === key && (
                        <textarea value={baseCustomInquiry} onChange={e => setBaseCustomInquiry(e.target.value)} onClick={e => e.stopPropagation()} placeholder="Tell us about your vision..." rows={3} className="mt-2 w-full text-xs px-2 py-1.5 border border-zinc-200 rounded resize-none" />
                      )}
                    </div>
                  ))}
                </div>
              </ConfigSection>

              <ConfigSection stepKey="step2" flash={flashStep === 'step2'} number="2" title="Choose Your Setup" desc="Select the equipment package that best fits your menu and service style." red={RED} collapsible isOpen={stepOpen.step2} onToggle={() => toggleStep('step2')}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {Object.entries(setups).map(([key, s]) => (
                    <div key={key} onClick={() => { setSetup(key); advanceFromStep('step2', 'step3'); }} className="relative text-left p-2 rounded-lg border-2 transition bg-white cursor-pointer flex flex-col" style={{ borderColor: setup === key ? RED : '#e4e4e7' }}>
                      <Radio checked={setup === key} />
                      <div className="my-2 rounded overflow-hidden"><ZoomImg src={s.img} alt={s.name} aspect="aspect-square" /></div>
                      <div className="text-[11px] font-semibold mb-1 leading-tight">{s.name}</div>
                      <div className="text-[10px] text-zinc-600 mb-2 leading-snug">{s.desc}</div>
                      {s.badge && <div className="inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded mb-1 text-white w-fit" style={{ backgroundColor: RED }}>{s.badge}</div>}
                      <div className="text-xs font-bold mt-auto">{s.included ? 'Included' : fmt(s.price)}</div>
                      {s.cert && (
                        <div onClick={(e) => { e.stopPropagation(); setUlCertifiedMap(m => ({ ...m, [key]: !m[key] })); }} className="mt-1.5 pt-1.5 border-t border-zinc-100 flex items-start gap-1.5 cursor-pointer hover:bg-zinc-50 -mx-2 px-2 pb-1.5 rounded-b">
                          <div className="w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: ulCertifiedMap[key] ? RED : 'white', borderColor: ulCertifiedMap[key] ? RED : '#d4d4d8', borderWidth: '1.5px' }}>
                            {ulCertifiedMap[key] && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[9px] font-bold leading-tight">+ UL Certification</div>
                            <div className="text-[9px] text-zinc-600 leading-tight">Recommended for US & Canada</div>
                            <div className="text-[9px] font-bold mt-0.5">{fmt(s.certPrice)}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[11px] text-zinc-500 flex items-start gap-1">
                  <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>UL Certification is recommended for operations in the US and Canada.</span>
                </div>
              </ConfigSection>

              <ConfigSection stepKey="step3" flash={flashStep === 'step3'} number="3" title="Customize Your Base Color and Branding" desc="Make it yours with professional branding." red={RED} collapsible isOpen={stepOpen.step3} onToggle={() => toggleStep('step3')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div onClick={() => { setColor('classic'); advanceFromStep('step3', 'step4'); }} className="text-left p-4 rounded-lg border-2 bg-white cursor-pointer" style={{ borderColor: color === 'classic' ? RED : '#e4e4e7' }}>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <Radio checked={color === 'classic'} />
                      <span className="font-semibold text-sm">Classic Color — Included</span>
                      <span className="ml-auto inline-block text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: RED }}>Recommended</span>
                    </div>
                    <div className="text-xs text-zinc-600 mb-3">Type in your desired frame color, and we will provide the closest match.</div>
                    <input value={colorInput} onChange={e => setColorInput(e.target.value)} onClick={e => e.stopPropagation()} placeholder="Enter desired color" className="w-full text-xs px-3 py-2 border border-zinc-200 rounded" />
                  </div>
                  <div onClick={() => { setColor('pantone'); advanceFromStep('step3', 'step4'); }} className="text-left p-4 rounded-lg border-2 bg-white cursor-pointer" style={{ borderColor: color === 'pantone' ? RED : '#e4e4e7' }}>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <Radio checked={color === 'pantone'} />
                      <span className="font-semibold text-sm">Pantone-Based Color — $750 USD</span>
                      <span className="ml-auto text-[10px] text-zinc-500">Extra charge applies</span>
                    </div>
                    <div className="text-xs text-zinc-600 mb-3">Fully custom color based on the provided code.</div>
                    <input value={pantoneInput} onChange={e => setPantoneInput(e.target.value)} onClick={e => e.stopPropagation()} placeholder="Enter Pantone code" className="w-full text-xs px-3 py-2 border border-zinc-200 rounded" />
                  </div>
                </div>
                <div className="px-3 py-2 rounded text-xs text-zinc-700" style={{ backgroundColor: RED_TINT }}>Custom vinyl wrap is included, and instructions will be provided after the order is placed.</div>
              </ConfigSection>

              <ConfigSection stepKey="step4" flash={flashStep === 'step4'} number="4" title="Premium Add-Ons" desc="(Choose one or more)" red={RED} collapsible isOpen={stepOpen.step4} onToggle={() => toggleStep('step4')}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(addOnsList).map(([key, a]) => (
                    <div key={key} onClick={() => { setAddOns(p => ({ ...p, [key]: !p[key] })); advanceFromStep('step4', 'step5'); }} className="relative text-left p-4 rounded-lg border-2 bg-white cursor-pointer" style={{ borderColor: addOns[key] ? RED : '#e4e4e7' }}>
                      {a.hasPreview && (
                        <button type="button" onClick={(e) => { e.stopPropagation(); setZoomImg({ src: a.previewImg, label: a.previewLabel }); }} aria-label={`Preview ${a.name}`} className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold text-white shadow-sm hover:shadow-md transition-all hover:scale-105 z-10" style={{ backgroundColor: RED }}>
                          <Eye className="w-3 h-3" strokeWidth={2.5} />
                          <span>Preview</span>
                        </button>
                      )}
                      <div className="flex items-start gap-2 mb-2 pr-16">
                        <Checkbox checked={addOns[key]} />
                        <div className="flex-1">
                          <div className="text-xs font-semibold leading-tight whitespace-pre-line">{a.name}</div>
                          {!a.isCustom && !a.isBatteryChoice && a.price !== undefined && <div className="text-xs font-bold mt-1">{fmt(a.price)} {a.suffix}</div>}
                          {a.isBatteryChoice && (
                            <div className="text-xs font-bold mt-1">
                              {fmt(extraBatteryType === 'lithium' ? 575 : 285)}
                              {extraBatteryType === 'lithium' && <span className="font-normal text-zinc-500"> + air shipping</span>}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-[11px] text-zinc-600 leading-snug whitespace-pre-line">{a.desc}</div>
                      {a.isBatteryChoice && addOns[key] && (
                        <div className="mt-3 pt-3 border-t border-zinc-100" onClick={e => e.stopPropagation()}>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">Choose battery type</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div onClick={() => setExtraBatteryType('lead-acid')} className="p-2 rounded border-2 cursor-pointer text-center" style={{ borderColor: extraBatteryType === 'lead-acid' ? RED : '#e4e4e7' }}>
                              <div className="flex items-center justify-center gap-1.5 mb-1">
                                <Radio checked={extraBatteryType === 'lead-acid'} />
                                <span className="text-[11px] font-semibold">Lead-Acid</span>
                              </div>
                              <div className="text-[11px] font-bold">{fmt(285)}</div>
                            </div>
                            <div onClick={() => setExtraBatteryType('lithium')} className="p-2 rounded border-2 cursor-pointer text-center" style={{ borderColor: extraBatteryType === 'lithium' ? RED : '#e4e4e7' }}>
                              <div className="flex items-center justify-center gap-1.5 mb-1">
                                <Radio checked={extraBatteryType === 'lithium'} />
                                <span className="text-[11px] font-semibold">Lithium</span>
                              </div>
                              <div className="text-[11px] font-bold">{fmt(575)}</div>
                              <div className="text-[9px] text-zinc-500 mt-0.5">+ air shipping</div>
                            </div>
                          </div>
                        </div>
                      )}
                      {a.isCustom && addOns[key] && (
                        <textarea value={customInquiryText} onChange={e => setCustomInquiryText(e.target.value)} onClick={e => e.stopPropagation()} placeholder="Enter your idea" rows={3} className="mt-2 w-full text-xs px-2 py-1.5 border border-zinc-200 rounded resize-none" />
                      )}
                    </div>
                  ))}
                </div>
              </ConfigSection>

              <ConfigSection stepKey="step5" flash={flashStep === 'step5'} number="5" title="Choose Your Support and Training" desc="(Choose one or more)" red={RED} collapsible isOpen={stepOpen.step5} onToggle={() => toggleStep('step5')}>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
                  {Object.entries(supportList).map(([key, s]) => (
                    <div key={key} onClick={() => { setSupport(p => ({ ...p, [key]: !p[key] })); completeStep5(); }} className="text-left p-3 rounded-lg border-2 bg-white cursor-pointer" style={{ borderColor: support[key] ? RED : '#e4e4e7' }}>
                      <div className="flex items-start gap-2 mb-2">
                        <Checkbox checked={support[key]} />
                        <div className="text-[11px] font-semibold leading-tight">{s.name}</div>
                      </div>
                      {s.badge && <div className="inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded mb-1 text-white" style={{ backgroundColor: RED }}>{s.badge}</div>}
                      {s.included && <div className="text-[10px] font-semibold text-zinc-700 mb-1">Included</div>}
                      {!s.included && !s.isCustom && <div className="text-[10px] font-bold mb-1">{s.prefix} {fmt(s.price)}</div>}
                      <div className="text-[10px] text-zinc-600 leading-snug">{s.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[11px] text-zinc-500 flex flex-col gap-1">
                  <div className="flex items-center gap-1"><Info className="w-3 h-3" /> Consulting services are advisory only. Timelines, speed, approvals, and final outcomes are not guaranteed.</div>
                  <div className="flex items-center gap-1"><Info className="w-3 h-3" /> Availability and scope vary by jurisdiction and may not be offered in all locations worldwide.</div>
                  <div className="flex items-center gap-1"><Info className="w-3 h-3" /> Final quote will be provided based on the final scope of work.</div>
                </div>
              </ConfigSection>
            </div>

            <div className="hidden sm:block sm:w-64 md:w-72 lg:w-80 xl:w-96 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-lg border-2 border-zinc-200 p-4 lg:p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-bold">Your Order</h3>
                  <button className="text-xs px-3 py-1 border border-zinc-300 rounded font-medium">Summary</button>
                </div>
                <OrderItem num="1" label="BASE PACKAGE" onEdit={() => editStep('step1')}>
  {basePackage ? (
    <>
      <div className="flex items-center gap-3 mt-2">
        <img src={basePackages[basePackage].img || IMG.classic} alt="" className="w-12 h-12 rounded object-cover flex-shrink-0" />
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">{basePackages[basePackage].name}</div>
          <div className="text-sm text-zinc-700">{fmt(basePackages[basePackage].price)}</div>
        </div>
      </div>
    </>
  ) : (
    <div className="text-sm text-zinc-400 mt-1">Not selected</div>
  )}
</OrderItem>
                <OrderItem num="2" label="SETUP" onEdit={() => editStep('step2')}>
                  {setup ? (
                    <>
                      <div className="flex items-start gap-3 mt-2">
                        <img src={setups[setup].img} alt="" className="w-12 h-12 rounded object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold leading-tight">{setups[setup].name}</div>
                          <div className="text-sm text-zinc-700 mt-1">{setups[setup].included ? 'Included' : fmt(setups[setup].price)}</div>
                        </div>
                      </div>
                      {ulCertifiedMap[setup] && setups[setup].cert && (
                        <div className="flex items-start gap-2 mt-2 text-sm pl-1">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: RED }} />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs leading-tight">UL Certified (US/Canada)</div>
                            <div className="text-xs text-zinc-700 mt-0.5">+ {fmt(setups[setup].certPrice)}</div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (<div className="text-xs text-zinc-400 mt-2">Not selected</div>)}
                </OrderItem>
                <OrderItem num="3" label="COLOR & BRANDING" onEdit={() => editStep('step3')}>
  {color ? (
    <div className="flex items-center gap-3 mt-2">
      <div className="w-8 h-8 rounded-full border border-zinc-300 bg-white flex-shrink-0" />

      <div>
        <div className="text-sm font-semibold">
          {color === 'classic' ? 'Classic Color' : 'Pantone Color'}
        </div>

        <div className="text-xs text-zinc-700">
          {color === 'classic' ? 'Included' : fmt(750)}
        </div>

        {color === 'classic' && colorInput.trim() && (
          <div className="text-xs text-zinc-500 mt-1">
            Requested color: <span className="font-semibold text-zinc-700">{colorInput}</span>
          </div>
        )}

        {color === 'pantone' && pantoneInput.trim() && (
          <div className="text-xs text-zinc-500 mt-1">
            Pantone code: <span className="font-semibold text-zinc-700">{pantoneInput}</span>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="text-sm text-zinc-400 mt-1">Not selected</div>
  )}
</OrderItem>
<OrderItem num="4" label="ADD-ONS" onEdit={() => editStep('step4')}>
  {Object.keys(addOns).filter(k => addOns[k]).map(k => {
    const a = addOnsList[k];
    let priceLabel = '-';
    let detailLabel = null;

    if (a.isBatteryChoice) {
      priceLabel = fmt(extraBatteryType === 'lithium' ? 575 : 285);
      detailLabel = extraBatteryType === 'lithium' ? 'Lithium + air shipping' : 'Lead-Acid';
    } else if (a.isCustom) {
      priceLabel = 'Custom Inquiry';
    } else if (a.price !== undefined) {
      priceLabel = fmt(a.price);
    }

    return (
      <div key={k} className="mt-2">
        <div className="flex items-start justify-between gap-2 text-sm">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: RED }} />

            <div className="flex-1 min-w-0">
              <div className="leading-tight">
                {a.name.split('\n')[0]}
              </div>

              {k === 'customInquiry' && customInquiryText.trim() && (
                <div className="text-[10px] text-zinc-500 mt-0.5 italic leading-snug">
                  Custom request: <span className="font-semibold text-zinc-700">{customInquiryText}</span>
                </div>
              )}

              {detailLabel && (
                <div className="text-[10px] text-zinc-500 mt-0.5">
                  {detailLabel}
                </div>
              )}
            </div>
          </div>

          <span className="text-zinc-700 whitespace-nowrap text-xs">
            {priceLabel}
          </span>
        </div>
      </div>
    );
  })}

  {Object.values(addOns).every(v => !v) && (
    <div className="text-xs text-zinc-400 mt-1">None selected</div>
  )}
</OrderItem>
                <OrderItem num="5" label="SUPPORT AND TRAINING" last onEdit={() => editStep('step5')}>
                  {Object.keys(support).filter(k => support[k]).map(k => (
                    <div key={k} className="flex items-start gap-2 mt-2 text-sm">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: RED }} />
                      <div className="flex-1 min-w-0">
                        <div className="leading-tight">{supportList[k].name}</div>
                        {supportList[k].included && <div className="text-xs text-zinc-600">Included</div>}
                        {!supportList[k].included && !supportList[k].isCustom && <div className="text-xs text-zinc-600">{fmt(supportList[k].price)}</div>}
                      </div>
                    </div>
                  ))}
                  </OrderItem>
                
                  <div id="order-actions" className="border-t border-zinc-200 pt-4 mt-4 scroll-mt-32">
                  <div className="text-xs text-zinc-600 font-semibold uppercase mb-1">Estimated Total</div>
                  {total > 0 ? (
  <div className="text-3xl lg:text-4xl font-bold mb-3">
    {fmt(total)}
  </div>
) : (
  <div className="text-base lg:text-lg font-bold text-zinc-500 leading-tight mb-3">
    Select a base package to see your estimate
  </div>
)}
                  <p className="text-[11px] text-zinc-500 leading-snug mb-4">Shipping is not included in the estimated total. A final quote will be provided during final order confirmation.</p>
                </div>
                <button onClick={openInquiry} className="w-full text-white font-bold py-3 rounded mb-2 hover:opacity-90 flex items-center justify-center gap-2 text-sm" style={{ backgroundColor: RED }}>
                  Save My Build & Send Inquiry <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={openSchedule} className="w-full bg-black hover:bg-zinc-800 text-white font-bold py-3 rounded mb-4 text-sm">Schedule a Call With Our Team</button>
                <div className="border-t border-zinc-200 pt-3 mb-3">
                  <button onClick={openDeposit} className="block w-full text-center text-sm font-semibold py-1.5 px-3 rounded hover:bg-zinc-50 transition group" style={{ color: RED }}>
                    <span className="border-b border-dashed group-hover:border-solid" style={{ borderColor: RED }}>Or reserve your spot with $250 deposit →</span>
                  </button>
                  <p className="text-center text-[11px] text-zinc-500 mt-1 leading-snug px-1">Lock in your production spot. Applied toward final order.</p>
                </div>
                <div className="border-t border-zinc-200 pt-3">
                  <button onClick={openFinancing} className="flex w-full items-center justify-center gap-1.5 text-xs text-zinc-700 hover:text-black transition py-1.5">
                    <span style={{ color: RED }}>🍁</span>
                    <span className="underline decoration-dotted underline-offset-2">Apply for Financing (Canada Only)</span>
                  </button>
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 mt-2">
                    <Lock className="w-3 h-3" /> Secure & Encrypted
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-white border-t border-zinc-200 px-6 py-6">
  <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-5 shadow-sm">
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="max-w-2xl">
        <div className="text-[10px] font-black uppercase tracking-[0.18em] text-red-600">
          Need help choosing?
        </div>

        <h2 className="mt-1 text-xl sm:text-2xl font-black tracking-tight text-zinc-950">
          Not sure which setup is right for you?
        </h2>

        <p className="mt-1 text-sm leading-relaxed text-zinc-600">
          Send us a quick note or schedule a call and we’ll recommend the best Coffee Bike setup for your city, budget, menu, and launch timeline.
        </p>
      </div>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-shrink-0">
        <button
          type="button"
          onClick={() => setIsGetInTouchOpen(true)}
          className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg active:scale-[0.98]"
        >
          Get In Touch
        </button>

        <button
          type="button"
          onClick={() => setScheduleModalOpen(true)}
          className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-xs font-black uppercase tracking-wide text-zinc-950 transition-all duration-300 hover:border-zinc-950 hover:shadow-lg active:scale-[0.98]"
        >
          Schedule a Call
        </button>
      </div>
    </div>
  </div>
</section>
      <div className="py-12 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-8">
            <EyebrowBadge className="mb-3">Run The Numbers</EyebrowBadge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">What Could You Earn?</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">Adjust the sliders based on your local market. We've pre-filled industry-average numbers from real Coffee Bike owners.</p>
          </div>
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-zinc-50 to-white rounded-2xl border-2 border-zinc-200 overflow-hidden">
            <div className="grid grid-cols-2 border-b border-zinc-200">
              <button onClick={() => setCalcMode('retail')} className={`py-4 font-bold text-sm uppercase tracking-wider transition ${calcMode === 'retail' ? 'text-white' : 'bg-white text-zinc-600 hover:bg-zinc-50'}`} style={{ backgroundColor: calcMode === 'retail' ? RED : undefined }}>
                <Coffee className="w-4 h-4 inline-block mr-2" /> Daily Cup Sales
              </button>
              <button onClick={() => setCalcMode('catering')} className={`py-4 font-bold text-sm uppercase tracking-wider transition ${calcMode === 'catering' ? 'text-white' : 'bg-white text-zinc-600 hover:bg-zinc-50'}`} style={{ backgroundColor: calcMode === 'catering' ? RED : undefined }}>
                <Calendar className="w-4 h-4 inline-block mr-2" /> Catering & Events
              </button>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-6 lg:p-8 lg:border-r border-zinc-200">
                {calcMode === 'retail' ? (
                  <>
                    <SliderInput label="Cups sold per day" value={retailCups} setValue={setRetailCups} min={20} max={250} suffix="cups" hint="Industry average: 60–120 cups/day at high-traffic spots" red={RED} />
                    <SliderInput label="Average price per cup" value={retailPrice} setValue={setRetailPrice} min={3} max={10} step={0.5} prefix="$" hint="Specialty coffee average: $5–$7" red={RED} />
                    <SliderInput label="Working days per month" value={retailDays} setValue={setRetailDays} min={8} max={28} suffix="days" hint="Most owners work 18–22 days/month" red={RED} />
                  </>
                ) : (
                  <>
                    <SliderInput label="Catering events per month" value={cateringEvents} setValue={setCateringEvents} min={1} max={20} suffix="events" hint="Most owners do 4–10 events/month" red={RED} />
                    <SliderInput label="Average fee per event (pre-paid)" value={cateringFee} setValue={setCateringFee} min={300} max={3500} step={50} prefix="$" hint="Industry average: $800–$1,800 per event (2–3 hours)" red={RED} />
                  </>
                )}
                <div className="mt-6 p-4 rounded-lg flex gap-3 items-start" style={{ backgroundColor: RED_TINT }}>
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: RED }} />
                  <div className="text-xs text-zinc-700 leading-relaxed">
                    <strong>Estimates only.</strong> Actual revenue depends on location, permits, weather, weekday/weekend mix, and operator effort. Calculations use industry-standard {calcMode === 'retail' ? '25% COGS for specialty coffee retail' : '15% COGS for premium catering'}.
                  </div>
                </div>
              </div>
              <div className="lg:w-2/5 p-6 lg:p-8 text-white" style={{ backgroundColor: '#0a0a0a' }}>
                <div className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: RED }}>Your Estimated Earnings</div>
                <h3 className="text-2xl font-bold mb-6">Projected Performance</h3>
                <ResultRow label="Monthly Revenue" value={fmtMoney(calc.monthlyRevenue)} />
                <ResultRow label="Cost of Goods" value={`− ${fmtMoney(calc.cogs)}`} muted />
                <div className="border-t border-zinc-700 my-3" />
                <ResultRow label="Net Monthly Profit" value={fmtMoney(calc.netMonthly)} highlight />
                <ResultRow label="Annual Net Profit" value={fmtMoney(calc.annualNet)} />
                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(227,30,36,0.15)', border: `1px solid ${RED}` }}>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: RED }}>Investment Payback</div>
                  <div className="text-3xl font-bold mb-1">{calc.monthsToRecoup < 1 ? '< 1' : Math.ceil(calc.monthsToRecoup)} months</div>
                  <div className="text-xs text-zinc-400">to recoup full Coffee Bike investment</div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{ color: RED }}>Real Owner Data</div>
                  <div className="text-xs text-zinc-300 leading-snug">
                    Owners reporting to us average <strong className="text-white">$4K–$8K/month</strong> in net profit, with top performers reaching <strong className="text-white">$12K+</strong>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 px-6 bg-zinc-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-8">
            <EyebrowBadge className="mb-3">Real Owners. Real Results.</EyebrowBadge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Coffee Bike Owners Worldwide</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">Hear from entrepreneurs running profitable Coffee Bike businesses around the globe.</p>
          </div>
          <Carousel red={RED} itemWidth={260} gap={16} autoScroll={false}>
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col flex-shrink-0" style={{ width: '260px' }}>
                <ZoomImg src={t.img} alt={t.name} aspect="aspect-[4/5]" />
                <div className="p-4 flex-1">
                  <div className="text-sm font-bold leading-tight">{t.name}</div>
                  <div className="text-xs text-zinc-600 mb-1">{t.loc} · {t.biz}</div>
                  <div className="text-[10px] text-zinc-500 mb-2">Owner since {Math.floor(t.months / 12) >= 1 ? `${Math.floor(t.months / 12)}+ years` : `${t.months} months ago`}</div>
                  <div className="flex mb-2" style={{ color: RED }}>{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5" fill={RED} />)}</div>
                  <div className="text-[11px] text-zinc-700 leading-snug italic">{t.quote}</div>
                </div>
              </div>
            ))}
          </Carousel>
          <p className="text-center text-sm text-zinc-600 mt-6">Join our non-obligatory worldwide community of aspiring entrepreneurs — a growing network of Coffee Bike owners building successful mobile coffee businesses every month.</p>
        </div>
      </div>
      <div className="pt-4 pb-10 px-6 bg-zinc-50">
  <div className="max-w-[1400px] mx-auto">

    {/* DESKTOP TITLE */}
    <div className="hidden md:block text-center mb-6">
      <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-zinc-500 bg-white border border-zinc-200">
        See How We Compare
      </div>

      <h3 className="text-2xl lg:text-3xl font-bold mt-4 mb-2">
        Coffee Bike vs. The Alternatives
      </h3>

      <p className="text-sm text-zinc-600 max-w-2xl mx-auto">
        A side-by-side look at why entrepreneurs are choosing Coffee Bike over other mobile coffee setups, traditional cafés, and food trucks.
      </p>
    </div>

    {/* DESKTOP TABLE */}
    <div className="hidden md:block overflow-x-auto -mx-2 px-2">
      <table className="w-full border-collapse text-sm bg-white rounded-lg overflow-hidden shadow-sm" style={{ minWidth: '720px' }}>
        <thead>
          <tr>
            <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-500 font-semibold border-b border-zinc-200"></th>

            <th className="p-4 text-center border-b-2 text-white" style={{ backgroundColor: RED, borderBottomColor: RED }}>
              <div className="font-bold">Coffee Bike World</div>
              <div className="text-[10px] uppercase tracking-wider opacity-80">Our Solution</div>
            </th>

            <th className="p-4 text-center border-b border-zinc-200 bg-zinc-50">
              <div className="font-bold text-zinc-700">Other Bikes / Carts</div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">Direct alt.</div>
            </th>

            <th className="p-4 text-center border-b border-zinc-200 bg-zinc-50">
              <div className="font-bold text-zinc-700">Brick-and-Mortar Café</div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">Traditional</div>
            </th>

            <th className="p-4 text-center border-b border-zinc-200 bg-zinc-50">
              <div className="font-bold text-zinc-700">Coffee Truck / Trailer</div>
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">Common alt.</div>
            </th>
          </tr>
        </thead>

        <tbody>
          {[
            { row: 'Startup Cost', cb: '$10K – $20K', others: '$5K – $40K+', cafe: '$80K – $500K', truck: '$50K – $175K', highlight: true },
            { row: 'Time to Launch', cb: '4–8 weeks', others: '2–6 months', cafe: '6–18 months', truck: '3–12 months' },
            { row: 'Build Quality', cb: '✓ Brand new, commercial-grade, refined by 8+ years of hands-on operations and 1.5M+ cups served', others: '~ Varies widely — often based on theoretical knowledge with no hands-on experience', cafe: 'Custom-built by expensive contractors', truck: 'Most often used truck/trailer, custom-built' },
            { row: 'Espresso Capability', cb: '✓ Dual-fuel commercial machine — 60–100 cups/hr proven productivity', others: '~ Often looks good in photos but untested in real-world busy operations', cafe: 'Commercial setup', truck: 'Similar efficiency to ours, but much bulkier footprint' },
            { row: 'Permits & Setup', cb: 'Mobile vendor permit', others: 'Mobile vendor permit', cafe: 'Lease + buildout + multiple licenses', truck: 'Commercial kitchen + DOT' },
            { row: 'Move Locations', cb: '✓ Anytime, anywhere — powerful e-bike motor conquers hills fully loaded', others: '~ Has wheels in photos, but often cannot handle even a slight uphill in real life', cafe: '✕ Locked into one location — a gamble', truck: '~ Limited to curbsides and parking lots' },
            { row: 'Indoor / Cold-Season Service', cb: '✓ Fits indoors with full electric mode — easily test different locations year-round', others: '~ Varies, but rarely works as advertised', cafe: '✕ Locked to one location', truck: '✕ Not possible — outdoor-only, limited operations' },
            { row: 'Custom Branding', cb: '✓ Complimentary full vinyl wrap + custom color', others: '✓ Complimentary full vinyl wrap + custom color', cafe: 'Full control — high extra cost', truck: 'Full control — high extra cost' },
            { row: 'Eco-Friendly', cb: '✓ Zero-emission electric', others: '~ Varies', cafe: '~ High overhead footprint', truck: '✕ Diesel/gas heavy' },
            { row: 'Warranty & Support', cb: '✓ 1-year warranty + owner network', others: '~ Limited or none', cafe: 'You’re on your own', truck: 'You’re on your own' },
            { row: 'Franchise Fees', cb: '✓ None — you own it', others: '~ Some require royalties', cafe: '~ Some require royalties', truck: '~ Varies' },
            { row: 'Worldwide Shipping', cb: '✓ Yes — white-glove delivery', others: '~ Limited to home country', cafe: 'N/A', truck: '~ Limited' },
          ].map((r, i) => (
            <tr key={i} className="border-b border-zinc-100 last:border-0">
              <td className="p-3 font-semibold text-zinc-800">{r.row}</td>
              <td className="p-3 text-center font-bold" style={{ backgroundColor: r.highlight ? RED_TINT : '#fef9f9', color: RED }}>
                {r.cb}
              </td>
              <td className="p-3 text-center text-zinc-600">{r.others}</td>
              <td className="p-3 text-center text-zinc-600">{r.cafe}</td>
              <td className="p-3 text-center text-zinc-600">{r.truck}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* MOBILE CARDS */}
    <div className="md:hidden mt-0">
  <div className="text-center mb-4 px-4">
    <div className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-zinc-500 bg-white border border-zinc-200">
      See How We Compare
    </div>

    <h3 className="text-xl font-bold mt-3 mb-1.5">
      Coffee Bike vs. The Alternatives
    </h3>

    <p className="text-xs text-zinc-600 max-w-xs mx-auto leading-snug">
      Swipe through each category to compare Coffee Bike with other business options.
    </p>
  </div>

  <div className="overflow-x-auto snap-x snap-mandatory px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <div className="flex gap-3">
      {[
        {
          icon: <DollarSign className="w-4 h-4" />,
          category: 'Startup Cost',
          coffeeBike: '$10K – $20K',
          otherBikes: '$5K – $40K+',
          cafe: '$80K – $500K',
          truck: '$50K – $175K',
        },
        {
          icon: <Clock className="w-4 h-4" />,
          category: 'Time to Launch',
          coffeeBike: '4–8 weeks',
          otherBikes: '2–6 months',
          cafe: '6–18 months',
          truck: '3–12 months',
        },
        {
          icon: <Award className="w-4 h-4" />,
          category: 'Build Quality',
          coffeeBike: '✓ Brand new, commercial-grade, refined by 8+ years of hands-on operations and 1.5M+ cups served',
          otherBikes: '~ Varies widely — often based on theoretical knowledge with no hands-on experience',
          cafe: 'Custom-built by expensive contractors',
          truck: 'Most often used truck/trailer, custom-built',
        },
        {
          icon: <Coffee className="w-4 h-4" />,
          category: 'Espresso Capability',
          coffeeBike: '✓ Dual-fuel commercial machine — 60–100 cups/hr proven productivity',
          otherBikes: '~ Often looks good in photos but untested in real-world busy operations',
          cafe: 'Commercial setup',
          truck: 'Similar efficiency to ours, but much bulkier footprint',
        },
        {
          icon: <Check className="w-4 h-4" />,
          category: 'Permits & Setup',
          coffeeBike: 'Mobile vendor permit',
          otherBikes: 'Mobile vendor permit',
          cafe: 'Lease + buildout + multiple licenses',
          truck: 'Commercial kitchen + DOT',
        },
        {
          icon: <Zap className="w-4 h-4" />,
          category: 'Move Locations',
          coffeeBike: '✓ Anytime, anywhere — powerful e-bike motor conquers hills fully loaded',
          otherBikes: '~ Has wheels in photos, but often cannot handle even a slight uphill in real life',
          cafe: '✕ Locked into one location — a gamble',
          truck: '~ Limited to curbsides and parking lots',
        },
        {
          icon: <Coffee className="w-4 h-4" />,
          category: 'Indoor / Cold-Season Service',
          coffeeBike: '✓ Fits indoors with full electric mode — easily test different locations year-round',
          otherBikes: '~ Varies, but rarely works as advertised',
          cafe: '✕ Locked to one location',
          truck: '✕ Not possible — outdoor-only, limited operations',
        },
        {
          icon: <Star className="w-4 h-4" />,
          category: 'Custom Branding',
          coffeeBike: '✓ Complimentary full vinyl wrap + custom color',
          otherBikes: '✓ Complimentary full vinyl wrap + custom color',
          cafe: 'Full control — high extra cost',
          truck: 'Full control — high extra cost',
        },
        {
          icon: <Leaf className="w-4 h-4" />,
          category: 'Eco-Friendly',
          coffeeBike: '✓ Zero-emission electric',
          otherBikes: '~ Varies',
          cafe: '~ High overhead footprint',
          truck: '✕ Diesel/gas heavy',
        },
        {
          icon: <Lock className="w-4 h-4" />,
          category: 'Warranty & Support',
          coffeeBike: '✓ 1-year warranty + owner network',
          otherBikes: '~ Limited or none',
          cafe: 'You’re on your own',
          truck: 'You’re on your own',
        },
        {
          icon: <Users className="w-4 h-4" />,
          category: 'Franchise Fees',
          coffeeBike: '✓ None — you own it',
          otherBikes: '~ Some require royalties',
          cafe: '~ Some require royalties',
          truck: '~ Varies',
        },
        {
          icon: <Globe className="w-4 h-4" />,
          category: 'Worldwide Shipping',
          coffeeBike: '✓ Yes — white-glove delivery',
          otherBikes: '~ Limited to home country',
          cafe: 'N/A',
          truck: '~ Limited',
        },
      ].map((row, index) => (
        <div
          key={index}
          className="snap-center bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm w-[235px] flex-shrink-0"
        >
          <div
            className="px-3 py-2.5 text-white flex items-center gap-2.5"
            style={{ backgroundColor: RED }}
          >
            <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
              {row.icon}
            </div>

            <div className="min-w-0">
              <div className="text-[9px] uppercase tracking-wider font-bold opacity-80 leading-none">
                Compare
              </div>
              <div className="text-sm font-bold leading-tight mt-1">
                {row.category}
              </div>
            </div>
          </div>

          <div className="divide-y divide-zinc-100 text-center">
            <div className="px-2.5 py-2 bg-red-50">
              <div className="text-xs font-bold mb-0.5" style={{ color: RED }}>
                Coffee Bike World
              </div>
              <div className="text-[8px] uppercase font-bold mb-0.5" style={{ color: RED }}>
                Our Solution
              </div>
              <div className="text-[11px] font-bold leading-snug" style={{ color: RED }}>
                {row.coffeeBike}
              </div>
            </div>

            <div className="px-2.5 py-2">
              <div className="text-xs font-bold mb-0.5">Other Bikes / Carts</div>
              <div className="text-[8px] uppercase text-zinc-500 font-bold mb-0.5">
                Direct Alt.
              </div>
              <div className="text-[11px] leading-snug text-zinc-700">
                {row.otherBikes}
              </div>
            </div>

            <div className="px-2.5 py-2">
              <div className="text-xs font-bold mb-0.5">Brick-and-Mortar Café</div>
              <div className="text-[8px] uppercase text-zinc-500 font-bold mb-0.5">
                Traditional
              </div>
              <div className="text-[11px] leading-snug text-zinc-700">
                {row.cafe}
              </div>
            </div>

            <div className="px-2.5 py-2">
              <div className="text-xs font-bold mb-0.5">Coffee Truck / Trailer</div>
              <div className="text-[8px] uppercase text-zinc-500 font-bold mb-0.5">
                Common Alt.
              </div>
              <div className="text-[11px] leading-snug text-zinc-700">
                {row.truck}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1">
    <Sparkles className="w-3.5 h-3.5" style={{ color: RED }} />
    Swipe sideways to compare
  </div>
</div>

  </div>
</div>
      <div className="py-12 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-8">
            <EyebrowBadge className="mb-3">The Fine Print</EyebrowBadge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Everything Else You Need to Know</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto">Full specifications, frequently asked questions, the production process, and how we support you after purchase.</p>
          </div>

          <h3 className="text-2xl font-bold mb-1 text-center">Specifications</h3>
          <p className="text-sm text-zinc-600 mb-5 text-center">Click any category to view full details.</p>
          <div className="space-y-2 mb-6 max-w-4xl mx-auto">
            {specs.map((s, i) => (
              <div key={i} className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                <button onClick={() => setOpenSpec(openSpec === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-50 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: RED_TINT }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{s.title}</div>
                      <div className="text-xs text-zinc-500">{s.desc}</div>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSpec === i ? 'rotate-180' : ''}`} />
                </button>
                {openSpec === i && (
                  <div className="px-4 pb-4 border-t border-zinc-100 pt-4">
                    {s.isBlueprint && s.images && (
                      <div className="mb-4 -mx-1 overflow-x-auto" style={{ scrollbarWidth: 'thin' }}>
                        <div className="flex gap-3 px-1 pb-2" style={{ minWidth: 'max-content' }}>
                          {s.images.map((src, idx) => (
                            <div key={idx} className="flex-shrink-0 w-72 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50">
                              <ZoomImg src={src} alt={`Blueprint view ${idx + 1}`} aspect="aspect-[4/3]" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
 {s.image && (
  <div className="mb-4 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50 max-w-xl">
    <ZoomImg src={Array.isArray(s.image) ? s.image[0] : s.image} alt={s.title} aspect="aspect-[4/3]" />
  </div>
)}
                    {s.content && <div className="text-sm text-zinc-700 leading-relaxed">{s.content}</div>}
                    {s.bullets && (
                      <ul className="mt-3 space-y-2">
                        {s.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-2 text-sm text-zinc-700 leading-relaxed">
                            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: RED }} strokeWidth={3} />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.sections && (
                      <div className="space-y-3 mt-1">
                        {s.sections.map((sub, si) => (
                          <div key={si}>
                            <div className="text-sm font-bold text-zinc-900 mb-1">{sub.label}</div>
                            <div className="text-sm text-zinc-700 leading-relaxed">{sub.text}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {s.isBlueprint && (
                      <a
  href="https://coffeebike.ca/wp-content/uploads/2026/05/Coffee_Bike_Vol_2_Specifications.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 inline-flex items-center gap-2 text-white font-bold px-4 py-2.5 rounded text-sm hover:opacity-90 transition"
  style={{ backgroundColor: RED }}
>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
  Download PDF Brochure
</a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-12">
          <a
  href="https://coffeebike.ca/wp-content/uploads/2026/05/Coffee_Bike_Vol_2_Specifications.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 bg-black hover:bg-zinc-800 text-white font-bold px-6 py-3 rounded text-sm transition shadow-md"
>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
  Download Full Specifications PDF
</a>
          </div>

          <h3 id="faq-section" className="text-2xl font-bold mb-1 text-center scroll-mt-32">Frequently Asked Questions</h3>
          <p className="text-sm text-zinc-600 mb-5 text-center">Tap a question to see the answer.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12 max-w-5xl mx-auto">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-50 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: RED_TINT, color: RED }}>?</div>
                    <span className="text-sm font-medium">{f.q}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 border-t border-zinc-100 pt-3 space-y-3">
                    {f.a && <div className="text-sm text-zinc-700 leading-relaxed">{f.a}</div>}
                    {f.sections && f.sections.map((sub, si) => (
                      <div key={si}>
                        <div className="text-sm font-bold text-zinc-900 mb-1">{sub.label}</div>
                        <div className="text-sm text-zinc-700 leading-relaxed">{sub.text}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold mb-1 text-center">Media & Community</h3>
          <p className="text-sm text-zinc-600 mb-5 text-center">Learn, get inspired, and join the Coffee Bike community.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            <a href="https://www.cbc.ca/dragonsden/pitches/coffee-bike" target="_blank" rel="noopener noreferrer" className="bg-white border border-zinc-200 rounded-lg p-5 text-center hover:shadow-md hover:border-zinc-300 transition group block">
              <div className="w-12 h-12 rounded mx-auto mb-3 flex items-center justify-center text-white" style={{ backgroundColor: '' }}>
              <div className="mx-auto mb-4 flex items-center justify-center">
  <img
    src="https://coffeebike.ca/wp-content/uploads/2026/05/Dragons-Den-2.png"
    alt="Dragons' Den Canada"
    className="h-16 w-auto object-contain"
  />
</div>
              </div>
              <div className="text-sm font-semibold mb-1">Dragons' Den Canada</div>
              <div className="text-[11px] text-zinc-600 mb-3 leading-snug">Watch our pitch and journey on Dragons' Den Canada.</div>
              <span className="text-xs font-semibold inline-flex items-center gap-1" style={{ color: RED }}>Watch Now <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></span>
            </a>
            <a href="https://www.youtube.com/@CoffeeBikeTV" target="_blank" rel="noopener noreferrer" className="bg-white border border-zinc-200 rounded-lg p-5 text-center hover:shadow-md hover:border-zinc-300 transition group block">
              <div className="w-12 h-12 rounded mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: '#FF0000' }}>
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
              <div className="text-sm font-semibold mb-1">YouTube Channel</div>
              <div className="text-[11px] text-zinc-600 mb-3 leading-snug">Tutorials, setup guides, and real owner stories.</div>
              <span className="text-xs font-semibold inline-flex items-center gap-1" style={{ color: RED }}>Watch Now <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></span>
            </a>
            <a href="https://www.instagram.com/coffeebike.world" target="_blank" rel="noopener noreferrer" className="bg-white border border-zinc-200 rounded-lg p-5 text-center hover:shadow-md hover:border-zinc-300 transition group block">
              <div className="w-12 h-12 rounded mx-auto mb-3 flex items-center justify-center" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
              <span className="text-sm font-bold">IG</span>
              </div>
              <div className="text-sm font-semibold mb-1">Instagram</div>
              <div className="text-[11px] text-zinc-600 mb-3 leading-snug">See builds, events, and behind-the-scenes daily.</div>
              <span className="text-xs font-semibold inline-flex items-center gap-1" style={{ color: RED }}>Follow Us <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></span>
            </a>
            <button onClick={() => setPressModalOpen(true)} className="bg-white border border-zinc-200 rounded-lg p-5 text-center hover:shadow-md hover:border-zinc-300 transition group block w-full">
              <div className="w-12 h-12 rounded mx-auto mb-3 flex items-center justify-center bg-zinc-900">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6z"/></svg>
              </div>
              <div className="text-sm font-semibold mb-1">Articles & Press</div>
              <div className="text-[11px] text-zinc-600 mb-3 leading-snug">Press features, awards, and industry recognition.</div>
              <span className="text-xs font-semibold inline-flex items-center gap-1" style={{ color: RED }}>Read Now <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" /></span>
            </button>
          </div>
        </div>
      </div>

      <div className="py-10 px-6 bg-zinc-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <EyebrowBadge className="mb-3">Your Peace of Mind</EyebrowBadge>
            <h2 className="text-2xl lg:text-3xl font-bold">We Stand Behind Every Coffee Bike</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <TrustCard icon={<Award />} title="1-Year Manufacturing Warranty" desc="Every Coffee Bike is thoroughly tested before it ships. In the rare event of a manufacturing issue within the first year, we'll replace what's needed at no cost — and any other parts are always easy to source through us." red={RED} />
            <TrustCard icon={<Globe />} title="Worldwide White-Glove Shipping" desc="Insured, crated, and tracked. We deliver safely to you anywhere in the world, with reliable freight partners every step of the way." red={RED} />
            <TrustCard icon={<Users />} title="Owner Support & Community" desc="Direct support from our team, plus the Coffee Bike World community on Discord — owners helping owners around the clock, in every time zone." red={RED} />
            <TrustCard icon={<Lock />} title="Secure & Encrypted Orders" desc="Your data and payment information are protected with industry-standard encryption." red={RED} />
          </div>
        </div>
      </div>

      <div className="px-6 pb-12 pt-2">
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl relative" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 60%, #2a0d0e 100%)' }}>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: RED }} />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: RED }} />
          <div className="relative px-6 py-10 lg:px-12 lg:py-14 text-white text-center">
            <EyebrowBadge className="mb-4">Get Your Own</EyebrowBadge>
            <h3 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">Ready to Start Your Coffee Bike Journey?</h3>
            <p className="text-sm lg:text-base text-zinc-300 mb-7 max-w-xl mx-auto leading-relaxed">Save your build and send an inquiry — our team will reach out within one business day to walk you through every detail.</p>
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              <button onClick={openInquiry} className="text-white font-bold px-6 py-3 rounded text-sm hover:opacity-90 whitespace-nowrap flex items-center gap-2" style={{ backgroundColor: RED }}>
                Save My Build & Send Inquiry <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={openSchedule} className="bg-white text-black font-bold px-6 py-3 rounded text-sm hover:bg-zinc-100 whitespace-nowrap">Schedule a Call</button>
              <button onClick={openDeposit} className="border border-white/40 hover:border-white text-white font-bold px-6 py-3 rounded text-sm whitespace-nowrap transition">Reserve with $250</button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 pt-2 border-t border-white/10 mt-2 pt-5">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5" style={{ color: RED }} /> No Franchise Fees</span>
              <span className="flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5" style={{ color: RED }} /> Eco-Friendly</span>
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" style={{ color: RED }} /> Worldwide Shipping</span>
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" style={{ color: RED }} /> Secure & Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-zinc-950 text-white py-12 px-6">
  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
  <div>
  <img
    src="https://coffeebike.ca/wp-content/uploads/2025/04/cofee_bike_logo_rwhite_transparent.png"
    alt="Coffee Bike"
    className="h-14 w-auto mb-4"
  />

  <p className="text-sm text-zinc-400 mb-8 max-w-sm">
    Turn-key mobile coffee businesses built for entrepreneurs worldwide.
  </p>

  <div>
    <h4 className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: RED }}>
      Get in Touch
    </h4>

    <div className="space-y-3 text-sm text-zinc-300">
      <div className="flex items-center gap-3">
        <Mail className="w-4 h-4 flex-shrink-0" style={{ color: RED }} />
        <a href="mailto:coffeebike@vladvik.com" className="hover:text-white transition">
          coffeebike@vladvik.com
        </a>
      </div>

      <div className="flex items-start gap-3">
        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: RED }} />
        <span>1356 Frances St, Vancouver, BC V5L 1Y9</span>
      </div>
    </div>
  </div>
</div>

<div>
  <h4 className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: RED }}>
    Quick Links
  </h4>

  <ul className="space-y-2 text-sm text-zinc-300">
    <li>
      <a href="https://coffeebike.ca/" className="hover:text-white transition">
        Home
      </a>
    </li>

    <li>
      <a href="#configurator-section" className="hover:text-white transition">
        Build Your Coffee Bike
      </a>
    </li>

    <li>
      <a href="#faq-section" className="hover:text-white transition">
        FAQ
      </a>
    </li>

    <li>
      <a href="https://coffeebike.ca/blog/" className="hover:text-white transition">
        Blog
      </a>
    </li>

    <li>
      <a href="https://coffeebike.ca/coffee-catering/" className="hover:text-white transition">
        Coffee Catering Vancouver, BC
      </a>
    </li>

    <li>
      <a href="#order-actions" className="hover:text-white transition">
        Contact Us
      </a>
    </li>
  </ul>
</div>

    <div>
      <h4 className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: RED }}>
        Social
      </h4>

      <div className="flex gap-3 mt-4">
        <a href="https://www.instagram.com/coffeebike.world" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 border border-zinc-700 rounded-full flex items-center justify-center hover:bg-zinc-800 transition">
          <span className="text-sm font-bold">IG</span>
        </a>

        <a href="https://www.youtube.com/@CoffeeBikeTV" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 border border-zinc-700 rounded-full flex items-center justify-center hover:bg-zinc-800 transition">
          <Play className="w-3.5 h-3.5" fill="currentColor" />
        </a>


      </div>
    </div>
  </div>

  <div className="max-w-7xl mx-auto border-t border-zinc-800 mt-10 pt-6 text-xs text-zinc-500 flex flex-wrap gap-4 justify-between">
    <span>© Vladvik International dba Coffee Bike World. All rights reserved.</span>
    <div className="flex gap-4">
      
      
    </div>
  </div>
</footer>
    </div>
  );
}

function ValueCard({ icon, title, desc, red, tint }) {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 px-5 py-4 hover:shadow-md transition flex items-start gap-3 h-full">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: tint }}>
        {React.cloneElement(icon, { className: 'w-5 h-5', style: { color: red } })}
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold mb-1 leading-tight">{title}</div>
        <div className="text-xs text-zinc-600 leading-snug">{desc}</div>
      </div>
    </div>
  );
}

function TrustCard({ icon, title, desc, red }) {
  return (
    <div className="bg-zinc-800/50 rounded-lg p-5 border border-zinc-700 hover:border-zinc-600 transition">
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(227,30,36,0.15)', border: `1px solid ${red}` }}>
        {React.cloneElement(icon, { className: 'w-6 h-6', style: { color: red } })}
      </div>
      <div className="text-sm font-bold mb-1.5 text-white">{title}</div>
      <div className="text-xs text-zinc-400 leading-snug">{desc}</div>
    </div>
  );
}

function ProgressBar({ completed, red }) {
  const steps = [
    { num: 1, label: 'Base Package', done: completed.step1 },
    { num: 2, label: 'Setup', done: completed.step2 },
    { num: 3, label: 'Color', done: completed.step3 },
    { num: 4, label: 'Add-Ons', done: completed.step4 },
    { num: 5, label: 'Support', done: completed.step5 },
  ];
  const completedCount = steps.filter(s => s.done).length;
  const percent = (completedCount / steps.length) * 100;
  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-4">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="text-sm font-bold">Build Progress</div>
        <div className="text-xs text-zinc-600"><span className="font-bold" style={{ color: red }}>{completedCount}</span> of {steps.length} steps complete</div>
      </div>
      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden mb-3">
        <div className="h-full transition-all duration-500" style={{ width: `${percent}%`, backgroundColor: red }} />
      </div>
      <div className="flex items-center justify-between gap-1 flex-wrap">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 flex-1 min-w-[100px]">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 text-white" style={{ backgroundColor: s.done ? red : '#d4d4d8' }}>
              {s.done ? <Check className="w-3 h-3" strokeWidth={3} /> : s.num}
            </div>
            <span className={`text-[11px] ${s.done ? 'text-zinc-800 font-semibold' : 'text-zinc-500'}`}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Carousel({ children, red, itemWidth = 220, gap = 12, autoScroll = true, duration = 90 }) {
  const items = React.Children.toArray(children);
  const animId = useRef('coffee-bike-scroll').current;
  const scrollRef = useRef(null);
  const pendingDirectionRef = useRef(null);
  const [interacted, setInteracted] = useState(false);

  const arrowColor = red || RED;
  const setLength = items.length * (itemWidth + gap);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || setLength === 0) return;

    if (el.scrollLeft >= setLength * 2) {
      el.scrollLeft -= setLength;
    } else if (el.scrollLeft <= 0) {
      el.scrollLeft += setLength;
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || setLength === 0) return;

    if (!autoScroll || interacted) {
      if (el.scrollLeft < setLength * 0.5 || el.scrollLeft > setLength * 2.5) {
        el.scrollLeft = setLength;
      }

      if (pendingDirectionRef.current) {
        const direction = pendingDirectionRef.current;
        pendingDirectionRef.current = null;

        requestAnimationFrame(() => {
          el.scrollBy({
            left: direction * (itemWidth + gap),
            behavior: 'smooth',
          });
        });
      }
    }
  }, [autoScroll, interacted, setLength, itemWidth, gap]);

  const scrollByArrow = (direction) => {
    if (autoScroll && !interacted) {
      pendingDirectionRef.current = direction;
      setInteracted(true);
      return;
    }

    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.querySelector('[data-carousel-card]');
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : itemWidth;
    const amount = cardWidth + gap;

    el.scrollBy({
      left: direction * amount,
      behavior: 'smooth',
    });
  };

  if (autoScroll && !interacted) {
    return (
      <div className="relative group">
        <style>{`
          @keyframes ${animId} {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          .${animId}-container:hover .${animId}-track {
            animation-play-state: paused;
          }
        `}</style>

        <div
          className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.95), transparent)' }}
        />

        <div
          className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, rgba(255,255,255,0.95), transparent)' }}
        />

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            scrollByArrow(-1);
          }}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-zinc-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
          style={{ color: arrowColor }}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            scrollByArrow(1);
          }}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-zinc-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
          style={{ color: arrowColor }}
        >
          <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <div className={`overflow-hidden -mx-6 px-6 ${animId}-container`}>
          <div
            className={`flex ${animId}-track`}
            style={{
              gap: `${gap}px`,
              width: 'max-content',
              animation: `${animId} ${duration}s linear infinite`,
              willChange: 'transform',
            }}
          >
            {items.map((child, i) => React.cloneElement(child, { key: `a-${i}` }))}
            {items.map((child, i) => React.cloneElement(child, { key: `b-${i}` }))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div
        className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.95), transparent)' }}
      />

      <div
        className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(255,255,255,0.95), transparent)' }}
      />

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scrollByArrow(-1);
        }}
        aria-label="Previous"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-zinc-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
        style={{ color: arrowColor }}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scrollByArrow(1);
        }}
        aria-label="Next"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg border border-zinc-200 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
        style={{ color: arrowColor }}
      >
        <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
      </button>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-x-auto overflow-y-hidden -mx-6 px-6 pb-2 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>

        <div className="flex" style={{ gap: `${gap}px`, minWidth: 'max-content' }}>
          {items.map((child, i) => (
            <div
              key={`a-${i}`}
              data-carousel-card
              className="flex-shrink-0"
              style={{ width: `${itemWidth}px` }}
            >
              {child}
            </div>
          ))}

          {items.map((child, i) => (
            <div
              key={`b-${i}`}
              data-carousel-card
              className="flex-shrink-0"
              style={{ width: `${itemWidth}px` }}
            >
              {child}
            </div>
          ))}

          {items.map((child, i) => (
            <div
              key={`c-${i}`}
              data-carousel-card
              className="flex-shrink-0"
              style={{ width: `${itemWidth}px` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SliderInput({ label, value, setValue, min, max, step = 1, suffix = '', prefix = '', hint, red }) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <label className="text-sm font-semibold text-zinc-800">{label}</label>
        <div className="font-bold text-lg" style={{ color: red }}>{prefix}{value}{suffix && ` ${suffix}`}</div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => setValue(Number(e.target.value))} className="w-full cursor-pointer" style={{ accentColor: red }} />
      <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
        <span>{prefix}{min}{suffix && ` ${suffix}`}</span>
        <span>{prefix}{max}{suffix && ` ${suffix}`}</span>
      </div>
      {hint && <div className="text-[11px] text-zinc-500 mt-1.5">{hint}</div>}
    </div>
  );
}

function ResultRow({ label, value, highlight, muted }) {
  return (
    <div className="flex items-center justify-between py-2 gap-3">
      <span className={`text-sm ${muted ? 'text-zinc-500' : 'text-zinc-300'}`}>{label}</span>
      <span className={`font-bold ${highlight ? 'text-2xl' : 'text-base'} ${muted ? 'text-zinc-500' : 'text-white'}`}>{value}</span>
    </div>
  );
}

function ConfigSection({ stepKey, flash, number, title, desc, children, red, collapsible, isOpen, onToggle }) {
  return (
    <div id={stepKey ? `config-${stepKey}` : undefined} className="bg-white rounded-lg border-2 p-4 lg:p-5 mb-4 transition-all duration-300" style={{ borderColor: flash ? red : '#e4e4e7', boxShadow: flash ? `0 0 0 4px ${red}33` : 'none', scrollMarginTop: '80px' }}>
      <div className={`flex items-center justify-between gap-3 ${isOpen === false ? '' : 'mb-1'}`}>
        <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={collapsible ? onToggle : undefined}>
          <div className="w-7 h-7 text-white rounded text-sm font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: red }}>{number}</div>
          <h3 className="text-base lg:text-lg font-bold">{title}</h3>
        </div>
        {collapsible && (
          <button onClick={onToggle} aria-label={isOpen ? 'Collapse' : 'Expand'} className="w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-500 transition flex-shrink-0">
            <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
      {isOpen !== false && (
        <>
          <p className="text-xs text-zinc-600 mb-4 ml-10">{desc}</p>
          {children}
        </>
      )}
    </div>
  );
}

function OrderItem({ num, label, children, last, onEdit }) {
  return (
    <div className={`pb-3 mb-3 ${last ? '' : 'border-b border-zinc-100'}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-400">{num}</span>
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide">{label}</span>
        </div>
        <button onClick={onEdit} className="text-xs text-zinc-500 flex items-center gap-1 hover:text-zinc-900 transition"><Edit2 className="w-3 h-3" /> Edit</button>
      </div>
      {children}
    </div>
  );
}