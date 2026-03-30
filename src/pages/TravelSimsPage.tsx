import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import {
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  Smartphone,
  HelpCircle,
  Clock,
  CheckCircle2,
  Globe,
  PlaneTakeoff,
  PlaneLanding,
  CreditCard,
  MessageSquare,
  Star,
  ArrowRight
} from 'lucide-react';
import { NavigateFunction } from '../types';
import { formatIsoForDisplay, getDefaultPublishedIso, getRouteModifiedIso } from '../seo/contentDates';

interface TravelSimsPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const TravelSimsPage: React.FC<TravelSimsPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = "Best Travel SIMs & eSIMs for South Africa (2026 Tourist Guide) | DataCost";
  const metaDescription = "Looking for the best SIM or eSIM for South Africa? Compare travel eSIMs, Vodacom, MTN, airport SIMs, setup, coverage, and the cheapest options for tourists.";
  const canonicalUrl = "https://datacost.co.za/travel-sims-south-africa/";
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getRouteModifiedIso('/travel-sims-south-africa/');
  const lastUpdated = formatIsoForDisplay(dateModifiedIso);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://datacost.co.za/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Travel SIMs South Africa",
        "item": canonicalUrl
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Best Travel SIMs & eSIMs for South Africa (2026 Tourist Guide)",
    "description": metaDescription,
    "url": canonicalUrl,
    "datePublished": datePublishedIso,
    "dateModified": dateModifiedIso,
    "isPartOf": {
      "@type": "WebSite",
      "name": "DataCost",
      "url": "https://datacost.co.za/"
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Best Travel SIMs & eSIMs for South Africa (2026 Tourist Guide)",
    "description": metaDescription,
    "url": canonicalUrl,
    "datePublished": datePublishedIso,
    "dateModified": dateModifiedIso,
    "author": {
      "@type": "Organization",
      "name": "DataCost.co.za",
      "url": "https://datacost.co.za"
    },
    "image": "https://datacost.co.za/og-image.jpg"
  };

  const faqs = [
    {
      question: "Can I buy a SIM card at Cape Town or Johannesburg airport?",
      answer: "Yes, both OR Tambo (Johannesburg) and Cape Town International have dedicated Vodacom and MTN stores in the arrivals hall. They are open for most international flight arrivals and can RICA (register) your SIM on the spot using your passport."
    },
    {
      question: "Does South Africa support eSIM for tourists?",
      answer: "Absolutely. You can buy international travel eSIMs (like Airalo or Holafly) before you land, or get a local eSIM from Vodacom or MTN once you arrive. Note that local eSIMs still require RICA registration with your passport."
    },
    {
      question: "What is RICA and why do I need it?",
      answer: "RICA is a South African law that requires every SIM card to be registered to a person's identity. As a tourist, you simply need your original passport. The shop assistant will take a photo of your passport and your face to activate the SIM."
    },
    {
      question: "Which network has the best coverage for tourists?",
      answer: "Vodacom generally has the widest coverage, especially in remote national parks and rural areas. MTN is a very close second and often has faster speeds in major cities like Johannesburg and Cape Town."
    },
    {
      question: "How much does mobile data cost in South Africa?",
      answer: "Standard tourist bundles range from R85 to R499 depending on data size (1GB to 20GB). International eSIMs are often more expensive per GB but offer the convenience of working the moment you land."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="DataCost" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://datacost.co.za/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://datacost.co.za/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* NAVIGATION */}
      <nav aria-label="Breadcrumb" className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-300">
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-400">Travel SIMs</span>
            </div>
          </div>
          <div className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-400">
            South Africa Tourist Guide / 2026
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* 1. HERO / INTRO */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/20 text-[#217128] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-[#a0f399]/30">
            <Clock className="w-3 h-3" />
            Updated {lastUpdated}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            Best Travel SIMs & eSIMs for <span className="text-[#1b6d24]">South Africa</span> (2026)
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Landing at OR Tambo or Cape Town and need Uber, Bolt, WhatsApp, and Maps to work immediately? This guide helps you choose between travel eSIM, Vodacom, and MTN based on trip length, convenience, and value.
          </p>
        </header>

        <AdUnit type="aboveFold" />

        {/* 2. QUICK ANSWER SUMMARY BLOCK */}
        <section className="mb-16 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-[#1b6d24] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            The Short Version
          </div>
          <h2 className="text-3xl font-black tracking-tighter mb-6">Best SIM for South Africa: Quick Answer</h2>
          <div className="space-y-3">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
              <strong>Best for convenience:</strong> Choose a <strong>travel eSIM</strong> before you fly so data works when you land.
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
              <strong>Best local option:</strong> Choose <strong>Vodacom prepaid</strong> if you want the safest all-round coverage outside city centers.
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
              <strong>Best alternative option:</strong> Choose <strong>MTN prepaid</strong> if your trip is mostly Cape Town, Johannesburg, and other urban areas.
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
              <strong>Best for 2+ week stays:</strong> Get a <strong>local prepaid SIM</strong> after landing for better value per GB.
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
              <strong>Landing late and need instant data:</strong> Activate a <strong>small travel eSIM</strong> first, then switch to local prepaid the next day.
            </div>
          </div>
        </section>

        {/* 2.5 DIRECT ANSWERS */}
        <section id="direct-answers" className="mb-16">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-black text-sm mb-2">What is the best SIM for South Africa?</h3>
              <p className="text-sm text-slate-600 font-medium">For most travellers: start with a travel eSIM for arrival, then move to Vodacom prepaid for better overall value.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-black text-sm mb-2">Is a travel eSIM better than a local SIM?</h3>
              <p className="text-sm text-slate-600 font-medium">Travel eSIM is easier and faster. Local SIM is usually cheaper per GB, especially for stays longer than a week.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-black text-sm mb-2">Should I buy before I fly or after I land?</h3>
              <p className="text-sm text-slate-600 font-medium">Before flying for instant access. After landing for lower long-stay costs and bigger local prepaid bundles.</p>
            </div>
          </div>
        </section>

        {/* 3. TOP COMPARISON TABLE */}
        <section id="esim-options" className="mb-16">
          <h2 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#1b6d24]" />
            South Africa Travel Connectivity Comparison
          </h2>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Option</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Best For</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Pros</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Cons</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-900">Travel eSIM</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">Short trips & Convenience</td>
                    <td className="px-6 py-4 text-emerald-700 font-bold">Instant setup, No RICA</td>
                    <td className="px-6 py-4 text-slate-500">More expensive per GB</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-900">Local Prepaid</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">Value & Long stays</td>
                    <td className="px-6 py-4 text-emerald-700 font-bold">Cheapest rates, Local number</td>
                    <td className="px-6 py-4 text-slate-500">Requires RICA (Passport)</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-900">Airport SIM</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">Immediate local data</td>
                    <td className="px-6 py-4 text-emerald-700 font-bold">Setup done for you</td>
                    <td className="px-6 py-4 text-slate-500">Airport queues</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-900">Home Roaming</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">Emergency only</td>
                    <td className="px-6 py-4 text-emerald-700 font-bold">No setup required</td>
                    <td className="px-6 py-4 text-red-600 font-bold">Extreme costs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3.5 GOOD TO KNOW */}
        <section className="mb-16 bg-[#f8fafc] border border-slate-100 rounded-[2.5rem] p-8">
          <h2 className="text-2xl font-black tracking-tighter mb-4">Good to Know Before You Buy</h2>
          <ul className="space-y-3 text-sm text-slate-600 font-medium">
            <li>Airport SIM desks are convenient, but not always the cheapest way to buy data.</li>
            <li>Travel eSIMs are fastest to activate, but often cost more per GB than local prepaid.</li>
            <li>If you are staying 2+ weeks, local prepaid usually gives the best value.</li>
            <li>If you only need WhatsApp, Maps, and Uber/Bolt, a small starter plan is often enough.</li>
            <li>Use official network stores for RICA registration to avoid tourist markups.</li>
          </ul>
        </section>

        {/* 4. “BEST PICKS” SUMMARY BLOCK */}
        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tighter mb-8">Top Tourist Recommendations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm relative group hover:border-[#a0f399] transition-all">
              <div className="absolute -top-3 left-8 bg-[#031636] text-[#a0f399] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.1em]">
                Best for Convenience
              </div>
              <Globe className="w-8 h-8 text-[#1b6d24] mb-4" />
              <h3 className="text-xl font-black mb-2">Airalo eSIM</h3>
              <p className="text-sm text-slate-600 mb-6 font-medium">Download the app, buy a 'Mosi-oa-Tunya' pack, and you're online before the plane reaches the gate.</p>
              <button
                onClick={() => scrollToSection('esim-options')}
                className="w-full py-3 bg-slate-50 text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#a0f399] transition-all flex items-center justify-center gap-2"
              >
                Check The Easiest South Africa eSIM Options <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="bg-white border-2 border-[#a0f399] p-8 rounded-[2rem] shadow-xl relative group scale-105 z-10">
              <div className="absolute -top-3 left-8 bg-[#1b6d24] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.1em]">
                Top Overall Pick
              </div>
              <Star className="w-8 h-8 text-[#1b6d24] mb-4" />
              <h3 className="text-xl font-black mb-2">Vodacom Prepaid</h3>
              <p className="text-sm text-slate-600 mb-6 font-medium">The widest coverage in SA. Perfect for safaris, road trips, and rural areas where others fail.</p>
              <button
                onClick={() => onNavigate('guide', 'vodacom-vs-mtn-data-prices')}
                className="w-full py-3 bg-[#1b6d24] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1b6d24]/20"
              >
                Compare Vodacom vs MTN for Travellers <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm relative group hover:border-[#a0f399] transition-all">
              <div className="absolute -top-3 left-8 bg-[#031636] text-[#a0f399] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.1em]">
                Best for Cities
              </div>
              <Zap className="w-8 h-8 text-[#1b6d24] mb-4" />
              <h3 className="text-xl font-black mb-2">MTN Tourist SIM</h3>
              <p className="text-sm text-slate-600 mb-6 font-medium">Lightning-fast 5G in Cape Town and Joburg. Great for digital nomads and remote work.</p>
              <button
                onClick={() => onNavigate('network', 'mtn')}
                className="w-full py-3 bg-slate-50 text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#a0f399] transition-all flex items-center justify-center gap-2"
              >
                Check MTN City Data Options <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </section>

        {/* 5. TRAVEL ESIM VS LOCAL SIM */}
        <section className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-8">Travel eSIM vs. Local SIM: The Great Debate</h2>
          <div className="bg-[#f8fafc] border border-slate-100 rounded-[2.5rem] p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-[#1b6d24]" />
                  International eSIM
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div>
                    <p className="text-sm font-medium text-slate-700"><strong>Choose this if:</strong> You want data instantly at landing with no RICA paperwork.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div>
                    <p className="text-sm font-medium text-slate-700"><strong>Best if you want:</strong> A simple first 24 hours for Uber, WhatsApp, and Google Maps.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 text-red-600"><Info className="w-4 h-4" /></div>
                    <p className="text-sm font-medium text-slate-700"><strong>Worth noting:</strong> Most travel eSIMs are data-only and can cost more per GB.</p>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                  <Smartphone className="w-6 h-6 text-[#1b6d24]" />
                  Local South African SIM
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div>
                    <p className="text-sm font-medium text-slate-700"><strong>Choose this if:</strong> You are staying more than 1 week and want better value.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div>
                    <p className="text-sm font-medium text-slate-700"><strong>Best if you want:</strong> A local number for calls, bookings, and driver contact.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 text-red-600"><Info className="w-4 h-4" /></div>
                    <p className="text-sm font-medium text-slate-700"><strong>Worth it if:</strong> You do not mind RICA registration in exchange for lower long-stay cost.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BEST TRAVEL ESIMS FOR SOUTH AFRICA */}
        <section className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-8">Best Travel eSIMs for South Africa</h2>
          <p className="text-slate-600 font-medium leading-relaxed mb-8">
            If your phone supports eSIM and you want to avoid the airport queues, these are the most reliable providers for South Africa.
          </p>
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#1b6d24] transition-all shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-black">A</div>
                <div>
                  <h3 className="font-black text-lg">Airalo (Mosi-oa-Tunya)</h3>
                  <p className="text-sm text-slate-500 font-medium">Best for overall value and app experience.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Starts from</div>
                  <div className="text-lg font-black text-[#031636]">$4.50</div>
                </div>
                <button
                  onClick={() => scrollToSection('timing-your-connection')}
                  className="px-6 py-3 bg-[#031636] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#1b6d24] transition-colors"
                >
                  Best Before You Fly
                </button>
              </div>
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#1b6d24] transition-all shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 font-black">H</div>
                <div>
                  <h3 className="font-black text-lg">Holafly</h3>
                  <p className="text-sm text-slate-500 font-medium">Best for unlimited data (if available).</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Starts from</div>
                  <div className="text-lg font-black text-[#031636]">$27.00</div>
                </div>
                <button
                  onClick={() => scrollToSection('best-by-scenario')}
                  className="px-6 py-3 bg-[#031636] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#1b6d24] transition-colors"
                >
                  Check If Unlimited Is Worth It
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. BEST LOCAL SIM CARDS AND ESIMS */}
        <section className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-8">Best Local SIM Cards and eSIMs</h2>
          <p className="text-slate-600 font-medium leading-relaxed mb-8">
            South Africa has five major networks, but for tourists, we recommend sticking to the "Big Two" for the best coverage and easiest top-ups.
          </p>
          <p className="text-sm text-slate-500 font-medium mb-8">
            For day-to-day costs, compare{' '}
            <button onClick={() => onNavigate('network', 'vodacom')} className="text-[#1b6d24] font-bold hover:underline">Vodacom prepaid prices</button>,{' '}
            <button onClick={() => onNavigate('network', 'mtn')} className="text-[#1b6d24] font-bold hover:underline">MTN prepaid prices</button>, and our{' '}
            <button onClick={() => onNavigate('guide', 'cheapest-data-south-africa')} className="text-[#1b6d24] font-bold hover:underline">cheapest data comparison</button>.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
              <div className="w-12 h-12 bg-[#e60000] text-white rounded-2xl flex items-center justify-center text-xl font-black mb-6">V</div>
              <h3 className="text-2xl font-black mb-4">Vodacom</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">The dominant network. If you are going on a Safari in Kruger or driving the Garden Route, Vodacom is your safest bet for a signal.</p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-xs font-bold text-slate-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Widest Coverage</li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Easy Top-ups Everywhere</li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> eSIM Available for Tourists</li>
              </ul>
              <button
                onClick={() => onNavigate('network', 'vodacom')}
                className="inline-flex items-center gap-2 text-[#1b6d24] font-black text-sm hover:underline"
              >
                View Vodacom Prices <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
              <div className="w-12 h-12 bg-[#ffcc00] text-[#031636] rounded-2xl flex items-center justify-center text-xl font-black mb-6">M</div>
              <h3 className="text-2xl font-black mb-4">MTN</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">Often rated as the fastest network in major cities. Excellent 5G network and very competitive data bundles for heavy users.</p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-xs font-bold text-slate-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Fastest 5G in Cities</li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Great 'Boosta' Bundles</li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Reliable Data Speed</li>
              </ul>
              <button
                onClick={() => onNavigate('network', 'mtn')}
                className="inline-flex items-center gap-2 text-[#1b6d24] font-black text-sm hover:underline"
              >
                View MTN Prices <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 8. VODACOM FOR TOURISTS */}
        <section className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-6">Vodacom for Tourists</h2>
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
            <p className="text-slate-600 leading-relaxed font-medium mb-6">
              Vodacom is the safe choice for mixed travel plans. Choose this if your itinerary includes road trips, smaller towns, or game reserves outside major city centers.
            </p>
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
              <h4 className="font-black text-[#1b6d24] mb-2">Pro Tip:</h4>
              <p className="text-sm text-slate-700 font-medium">Once your SIM is active, dial <strong>*123#</strong> to access 'Just 4 You' deals. These are personalized discounts that can often get you data for much less than the standard menu prices.</p>
            </div>
          </div>
        </section>

        {/* 9. MTN FOR TOURISTS */}
        <section className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-6">MTN for Tourists</h2>
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
            <p className="text-slate-600 leading-relaxed font-medium mb-6">
              MTN is the better pick for urban-heavy trips. Choose this if you will spend most of your time in Cape Town, Johannesburg, Pretoria, or Durban and want strong city performance.
            </p>
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-8">
              <h4 className="font-black text-blue-700 mb-2">What to buy?</h4>
              <p className="text-sm text-slate-700 font-medium">Ask for a standard prepaid SIM. Once RICA is done, buy an <strong>MTN Boosta</strong> bundle via USSD or the app. You'll get significantly more data (often double) than standard bundles.</p>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Helpful next step: use our{' '}
              <button onClick={() => onNavigate('ussd')} className="text-[#1b6d24] font-bold hover:underline">USSD codes directory</button>{' '}
              and{' '}
              <button onClick={() => onNavigate('guide', 'how-to-buy-data-mtn')} className="text-[#1b6d24] font-bold hover:underline">MTN buy-data guide</button>{' '}
              after activation.
            </p>
          </div>
        </section>

        <AdUnit type="inContent" />

        {/* 10. VODACOM VS MTN COMPARISON SECTION */}
        <section className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-8 text-center">Battle of the Giants: Vodacom vs. MTN</h2>
          <div className="overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Feature</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Vodacom</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">MTN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm font-medium">
                <tr>
                  <td className="px-6 py-4 text-slate-400 font-black uppercase text-[10px]">Rural Coverage</td>
                  <td className="px-6 py-4 text-[#1b6d24] font-bold">Unbeatable (Winner)</td>
                  <td className="px-6 py-4 text-slate-600">Excellent</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-slate-400 font-black uppercase text-[10px]">City Speeds</td>
                  <td className="px-6 py-4 text-slate-600">Great</td>
                  <td className="px-6 py-4 text-[#1b6d24] font-bold">Lightning Fast (Winner)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-slate-400 font-black uppercase text-[10px]">Typical 1GB Price</td>
                  <td className="px-6 py-4 text-slate-600">R85 - R99</td>
                  <td className="px-6 py-4 text-slate-600">R79 - R99</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-slate-400 font-black uppercase text-[10px]">Best Feature</td>
                  <td className="px-6 py-4 text-slate-600">Reliability</td>
                  <td className="px-6 py-4 text-slate-600">Bundle Value</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onNavigate('guide', 'vodacom-vs-mtn-data-prices')}
              className="px-6 py-3 bg-[#031636] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#1b6d24] transition-colors"
            >
              Compare Vodacom vs MTN for Travellers
            </button>
            <button
              onClick={() => onNavigate('guide', 'best-data-deals-south-africa')}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-black text-xs uppercase tracking-widest hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              See Current Prepaid Data Deals
            </button>
          </div>
        </section>

        {/* 11. AIRPORT SIM SECTION */}
        <section className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-8">Buying a SIM at the Airport</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-slate-600 leading-relaxed font-medium mb-6">
                Most international visitors arrive via <strong>OR Tambo (JNB)</strong> or <strong>Cape Town (CPT)</strong>. Both have official network stores in arrivals, which is useful if you need data for Uber/Bolt pickup, WhatsApp check-ins, and hotel navigation.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#031636] text-white flex items-center justify-center flex-shrink-0 text-xs font-black">1</div>
                  <p className="text-sm text-slate-600 font-medium">Look for official Vodacom or MTN branding after customs and baggage claim.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#031636] text-white flex items-center justify-center flex-shrink-0 text-xs font-black">2</div>
                  <p className="text-sm text-slate-600 font-medium">Have your original passport ready. No passport = no SIM.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#031636] text-white flex items-center justify-center flex-shrink-0 text-xs font-black">3</div>
                  <p className="text-sm text-slate-600 font-medium">The assistant will handle RICA registration. Plan for about 5-10 minutes if queues are short.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
              <PlaneLanding className="w-12 h-12 text-[#1b6d24] mb-4" />
              <h4 className="font-black text-lg mb-2">Avoid 'Reseller' Stands</h4>
              <p className="text-sm text-slate-500 font-medium">Stick to official Vodacom/MTN stores. Unofficial kiosks often charge 'tourist premiums' for SIM cards that should cost R10 or less.</p>
            </div>
          </div>
        </section>

        {/* 12. BEFORE-YOU-FLY VS AFTER-YOU-LAND */}
        <section id="timing-your-connection" className="mb-16 bg-[#031636] text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <h2 className="text-3xl font-black tracking-tighter mb-8 relative z-10">Timing Your Connection</h2>
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <PlaneTakeoff className="w-8 h-8 text-[#a0f399] mb-4" />
              <h3 className="text-xl font-black mb-4">Before You Fly</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Choose this if you land late, have an onward transfer, or want instant data for Uber/Bolt, WhatsApp, and Maps as soon as wheels touch down.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <PlaneLanding className="w-8 h-8 text-[#a0f399] mb-4" />
              <h3 className="text-xl font-black mb-4">After You Land</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Choose this if value matters more than speed. Use airport WiFi for first messages, then buy local prepaid for better cost per GB.
              </p>
            </div>
          </div>
          <div className="relative z-10 mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => scrollToSection('esim-options')}
              className="px-6 py-3 bg-white text-[#031636] rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Compare the Best SIM Options Before You Fly
            </button>
            <button
              onClick={() => onNavigate('network')}
              className="px-6 py-3 bg-[#1b6d24] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Compare Local Prepaid Prices After Landing
            </button>
          </div>
        </section>

        {/* 13. RICA / SETUP GUIDANCE SECTION */}
        <section className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-8">Understanding RICA (SIM Registration)</h2>
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                <Info className="w-8 h-8" />
              </div>
              <div>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">
                  RICA is a mandatory security law in South Africa. Every SIM card must be linked to a verified identity. Without this, your SIM will not connect to the network.
                </p>
                <h4 className="font-black mb-4 uppercase text-xs tracking-widest text-slate-400">What you need:</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-bold text-slate-700">Original Passport</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-bold text-slate-700">Proof of Address (Rarely)</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-6 font-medium italic">
                  * Note: Most major tourist stores at airports will accept your hotel name/address as your temporary proof of residence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 14. BEST BY SCENARIO */}
        <section id="best-by-scenario" className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-8">Best Option for Your Trip (By Scenario)</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <PlaneLanding className="w-6 h-6 text-[#1b6d24] mb-3" />
              <h4 className="font-black mb-2">Landing Late Tonight</h4>
              <p className="text-xs text-slate-500 font-medium">Choose travel eSIM first. It is the fastest option when airport shops may be closed or busy.</p>
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <Globe className="w-6 h-6 text-[#1b6d24] mb-3" />
              <h4 className="font-black mb-2">3-5 Day City Trip</h4>
              <p className="text-xs text-slate-500 font-medium">Choose a small travel eSIM or short MTN prepaid bundle if your trip is mostly urban.</p>
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <Star className="w-6 h-6 text-[#1b6d24] mb-3" />
              <h4 className="font-black mb-2">1 Week Holiday</h4>
              <p className="text-xs text-slate-500 font-medium">Choose Vodacom prepaid if you want a safer all-round signal across mixed city and travel routes.</p>
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <CreditCard className="w-6 h-6 text-[#1b6d24] mb-3" />
              <h4 className="font-black mb-2">2+ Week Stay</h4>
              <p className="text-xs text-slate-500 font-medium">Choose local prepaid. This is usually where local SIM value beats travel eSIM pricing clearly.</p>
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <Smartphone className="w-6 h-6 text-[#1b6d24] mb-3" />
              <h4 className="font-black mb-2">Visiting Family for a Month</h4>
              <p className="text-xs text-slate-500 font-medium">Choose local prepaid with bigger bundles and top up using USSD when needed.</p>
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <MessageSquare className="w-6 h-6 text-[#1b6d24] mb-3" />
              <h4 className="font-black mb-2">WhatsApp / Uber / Maps Only</h4>
              <p className="text-xs text-slate-500 font-medium">Choose a small starter plan first. You can always top up later once you know your real usage.</p>
            </div>
          </div>
        </section>

        {/* 15. BEST SIM BY TRIP LENGTH */}
        <section className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-8">Trip Length Cheat Sheet</h2>
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex items-center gap-6">
              <div className="text-2xl font-black text-slate-200">01</div>
              <div>
                <h4 className="font-black text-lg">Short Trip (3-5 Days)</h4>
                <p className="text-sm text-slate-600 font-medium">Go for convenience: travel eSIM or a small airport bundle so you stay connected immediately.</p>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex items-center gap-6">
              <div className="text-2xl font-black text-slate-200">02</div>
              <div>
                <h4 className="font-black text-lg">1 Week Holiday</h4>
                <p className="text-sm text-slate-600 font-medium">Balanced approach: small travel eSIM on day one, then local prepaid if you need more data.</p>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex items-center gap-6 border-l-4 border-l-[#1b6d24]">
              <div className="text-2xl font-black text-[#1b6d24]">03</div>
              <div>
                <h4 className="font-black text-lg">2+ Week Stay</h4>
                <p className="text-sm text-slate-600 font-medium">Local prepaid is usually the smart money move. Better rates and easier long-stay top-ups.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 16. FINAL VERDICT */}
        <section className="mb-16 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl font-black tracking-tighter mb-6">The DataCost Verdict</h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
            South Africa has some of the best mobile networks in the world, but the RICA law makes "going local" slightly more annoying than in Europe or SE Asia.
          </p>
          <div className="bg-[#f8fafc] p-8 rounded-3xl border border-slate-100">
            <p className="text-slate-700 font-bold leading-relaxed italic">
              "For 90% of tourists, we recommend buying a 1GB Airalo eSIM before you leave home to get you through the airport and into your Uber, then visiting a Vodacom store at a shopping mall the next morning to buy a local 10GB bundle for the rest of your trip."
            </p>
          </div>
        </section>

        {/* 17. CTA / NEXT STEPS */}
        <section className="mb-16 bg-[#1b6d24] rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">Ready to get connected?</h2>
            <p className="text-white/80 font-medium mb-10 max-w-xl mx-auto text-lg">
              Compare the latest local data prices or check out the USSD directory to manage your new SIM.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => onNavigate('network')}
                className="px-8 py-4 bg-white text-[#1b6d24] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
              >
                Compare Local SIM Prices in South Africa
              </button>
              <button
                onClick={() => onNavigate('ussd')}
                className="px-8 py-4 bg-[#031636] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform"
              >
                View USSD Codes for Top-Ups & Balance Checks
              </button>
            </div>
          </div>
        </section>

        <AdUnit type="inContent" />

        {/* 18. FAQ SECTION */}
        <section className="mb-16 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
          <h2 className="text-3xl font-black tracking-tighter mb-8">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-50 pb-8 last:border-0 last:pb-0">
                <h3 className="text-lg font-black mb-3 flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1b6d24] flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium pl-[1.125rem]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 19. RELATED INTERNAL LINKS SECTION */}
        <section className="mb-16">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">More Helpful Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('network', 'vodacom')}
              className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-[#1b6d24] transition-all group shadow-sm"
            >
              <h4 className="font-bold text-slate-900 group-hover:text-[#1b6d24]">Vodacom Prices</h4>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Network Guide</p>
            </button>
            <button
              onClick={() => onNavigate('network', 'mtn')}
              className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-[#1b6d24] transition-all group shadow-sm"
            >
              <h4 className="font-bold text-slate-900 group-hover:text-[#1b6d24]">MTN Prices</h4>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Network Guide</p>
            </button>
            <button
              onClick={() => onNavigate('guide', 'cheapest-data-south-africa')}
              className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-[#1b6d24] transition-all group shadow-sm"
            >
              <h4 className="font-bold text-slate-900 group-hover:text-[#1b6d24]">Cheapest Data</h4>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Market Comparison</p>
            </button>
            <button
              onClick={() => onNavigate('guide', 'best-data-deals-south-africa')}
              className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-[#1b6d24] transition-all group shadow-sm"
            >
              <h4 className="font-bold text-slate-900 group-hover:text-[#1b6d24]">Best Prepaid Deals</h4>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Value Guide</p>
            </button>
            <button
              onClick={() => onNavigate('ussd')}
              className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-[#1b6d24] transition-all group shadow-sm"
            >
              <h4 className="font-bold text-slate-900 group-hover:text-[#1b6d24]">USSD Codes South Africa</h4>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Top-Up & Balance</p>
            </button>
            <button
              onClick={() => onNavigate('guides-index')}
              className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-[#1b6d24] transition-all group shadow-sm"
            >
              <h4 className="font-bold text-slate-900 group-hover:text-[#1b6d24]">Mobile Data Guides</h4>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Learning Hub</p>
            </button>
          </div>
        </section>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 text-sm text-slate-500 flex items-start gap-3 shadow-sm">
          <Info className="w-5 h-5 text-slate-400 mt-0.5" />
          <p className="font-medium">
            <strong>Independent analysis:</strong> Travel eSIM pricing in USD is subject to exchange-rate shifts, and local South African prices can change quickly. Always verify final offer details with the operator. Review our <a href="/methodology/" className="text-[#1b6d24] font-semibold hover:underline">methodology</a> and <a href="/editorial-policy/" className="text-[#1b6d24] font-semibold hover:underline">editorial policy</a>. We may earn a commission from affiliate links on this page.
          </p>
        </div>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
