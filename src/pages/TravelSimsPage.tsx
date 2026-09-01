import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
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
import { DEFAULT_OG_IMAGE_URL, SITE_BRAND_NAME, SITE_PRODUCT_NAME, SITE_URL, toCanonicalUrl } from '../seo/siteConstants';

interface TravelSimsPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const TravelSimsPage: React.FC<TravelSimsPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = "Travel SIMs & eSIMs South Africa (2026 Guide)";
  const metaDescription = "Compare travel eSIMs, local prepaid, setup timing, RICA requirements, coverage checks and current bundle terms for a South Africa trip.";
  const canonicalUrl = toCanonicalUrl('/travel-sims-south-africa/');
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
        "item": SITE_URL
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
    "name": "Travel SIMs & eSIMs for South Africa (2026 Guide)",
    "description": metaDescription,
    "url": canonicalUrl,
    "datePublished": datePublishedIso,
    "dateModified": dateModifiedIso,
    "isPartOf": {
      "@type": "WebSite",
      "name": SITE_PRODUCT_NAME,
      "url": SITE_URL
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Travel SIMs & eSIMs for South Africa (2026 Guide)",
    "description": metaDescription,
    "url": canonicalUrl,
    "datePublished": datePublishedIso,
    "dateModified": dateModifiedIso,
    "author": {
      "@type": "Organization",
      "name": SITE_BRAND_NAME,
      "url": SITE_URL
    },
    "image": DEFAULT_OG_IMAGE_URL
  };

  const faqs = [
    {
      question: "Can I buy a SIM card at Cape Town or Johannesburg airport?",
      answer: "Airport store availability, location and opening hours can change. Check the current airport directory and operator store locator before relying on an arrivals-hall purchase, and confirm that the seller can complete RICA registration."
    },
    {
      question: "Does South Africa support eSIM for tourists?",
      answer: "International travel eSIMs may be available before departure. For a local operator eSIM, confirm current prepaid eligibility, device support, activation channels and RICA requirements directly with the operator."
    },
    {
      question: "What is RICA and why do I need it?",
      answer: "RICA is the South African registration framework for local SIM activation. Foreign visitors should confirm the operator's current identity and address-document requirements before travelling; do not assume a passport alone will always be sufficient."
    },
    {
      question: "Which network has the best coverage for tourists?",
      answer: "Coverage varies by exact location, terrain, network technology and device. Compare the current official coverage map for every operator you are considering across each city, road and reserve on your itinerary; map results do not guarantee service at a specific spot."
    },
    {
      question: "How much does mobile data cost in South Africa?",
      answer: "There is no single tourist-bundle price range. Prepaid prices vary by operator, bundle type, validity and purchase channel, so compare the exact anytime allocation, validity and final price shown before buying."
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
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
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
            Travel SIMs & eSIMs for <span className="text-[#1b6d24]">South Africa</span> (2026)
          </h1>
          <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Landing at OR Tambo or Cape Town and need Uber, Bolt, WhatsApp, and Maps to work immediately? This guide helps you choose between travel eSIM, Vodacom, and MTN based on trip length, convenience, and value.
          </p>
        </header>
        {/* 2. QUICK ANSWER SUMMARY BLOCK */}
        <section className="mb-16 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-[#1b6d24] rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            The Short Version
          </div>
          <h2 className="text-3xl font-black tracking-tighter mb-6">Best SIM for South Africa: Quick Answer</h2>
          <div className="space-y-3">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
              <strong>If pre-arrival setup matters:</strong> Compare a <strong>travel eSIM</strong> that can be installed before you fly.
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
              <strong>Vodacom prepaid:</strong> Check its official coverage map for the towns, roads and reserves on your itinerary before choosing.
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
              <strong>MTN prepaid:</strong> Check its official coverage map and current prepaid offers against your destinations and expected use.
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
              <strong>For 2+ week stays:</strong> Compare the current total cost, allowance and validity of a <strong>local prepaid SIM</strong> with extending a travel eSIM.
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
              <p className="text-sm text-slate-600 font-medium">There is no universal winner. Compare setup timing, exact-route coverage, RICA requirements and the final bundle price and validity.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-black text-sm mb-2">Is a travel eSIM better than a local SIM?</h3>
              <p className="text-sm text-slate-600 font-medium">A travel eSIM can be activated before arrival; a local SIM provides local operator bundles and often a local number. Compare current total costs and restrictions.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-black text-sm mb-2">Should I buy before I fly or after I land?</h3>
              <p className="text-sm text-slate-600 font-medium">Buy before flying if confirmed arrival connectivity matters. Buy after landing if you want to inspect current local offers and complete registration in person.</p>
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
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Use case</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Pros</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Cons</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-900">Travel eSIM</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">Pre-arrival setup</td>
                    <td className="px-6 py-4 text-emerald-700 font-bold">Can be installed before travel</td>
                    <td className="px-6 py-4 text-slate-500">Check device, network, hotspot and price terms</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-900">Local Prepaid</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">Local number and operator bundles</td>
                    <td className="px-6 py-4 text-emerald-700 font-bold">Access to current local catalogues</td>
                    <td className="px-6 py-4 text-slate-500">RICA identity and address checks apply</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-900">Airport SIM</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">Arrival purchase, if available</td>
                    <td className="px-6 py-4 text-emerald-700 font-bold">In-person setup may be available</td>
                    <td className="px-6 py-4 text-slate-500">Confirm store hours, seller and total price</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-900">Home Roaming</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">Keeping your home number active</td>
                    <td className="px-6 py-4 text-emerald-700 font-bold">No setup required</td>
                    <td className="px-6 py-4 text-red-600 font-bold">Confirm roaming rates and limits first</td>
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
            <li>Check airport directories and operator store locators before relying on an airport SIM desk.</li>
            <li>For a travel eSIM, compare total price, data allowance, validity, hotspot rules and underlying network.</li>
            <li>For a longer stay, compare current local prepaid totals against the travel eSIM you would otherwise renew.</li>
            <li>Match the allocation to the apps you expect to use; navigation, calls and video can change the requirement.</li>
            <li>Use an accredited seller and confirm the full RICA document checklist before paying.</li>
          </ul>
        </section>

        {/* 4. “BEST PICKS” SUMMARY BLOCK */}
        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tighter mb-8">Tourist setup options</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm relative group hover:border-[#a0f399] transition-all">
              <div className="absolute -top-3 left-8 bg-[#031636] text-[#a0f399] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.1em]">
                Setup Before Landing
              </div>
              <Globe className="w-8 h-8 text-[#1b6d24] mb-4" />
                  <h3 className="text-xl font-black mb-2">Travel eSIM</h3>
                  <p className="text-sm text-slate-600 mb-6 font-medium">Compare current South Africa or regional plans by allowance, validity, network, hotspot rules and final price.</p>
              <button
                onClick={() => scrollToSection('esim-options')}
                className="w-full py-3 bg-slate-50 text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#a0f399] transition-all flex items-center justify-center gap-2"
              >
                Compare South Africa eSIM Options <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="bg-white border-2 border-[#a0f399] p-8 rounded-[2rem] shadow-xl relative group scale-105 z-10">
              <div className="absolute -top-3 left-8 bg-[#1b6d24] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.1em]">
                Check Route Coverage
              </div>
              <Star className="w-8 h-8 text-[#1b6d24] mb-4" />
              <h3 className="text-xl font-black mb-2">Vodacom Prepaid</h3>
              <p className="text-sm text-slate-600 mb-6 font-medium">Check Vodacom's current coverage map for every safari route, road and rural stop before choosing it.</p>
              <button
                onClick={() => onNavigate('guide', 'vodacom-vs-mtn-data-prices')}
                className="w-full py-3 bg-[#1b6d24] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1b6d24]/20"
              >
                Compare Vodacom vs MTN for Travellers <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm relative group hover:border-[#a0f399] transition-all">
              <div className="absolute -top-3 left-8 bg-[#031636] text-[#a0f399] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.1em]">
                Check City Coverage
              </div>
              <Zap className="w-8 h-8 text-[#1b6d24] mb-4" />
              <h3 className="text-xl font-black mb-2">MTN Prepaid</h3>
              <p className="text-sm text-slate-600 mb-6 font-medium">Check MTN's current 4G/5G coverage at your exact destinations and compare the prepaid offers available when you buy.</p>
              <button
                onClick={() => onNavigate('network', 'mtn')}
                className="w-full py-3 bg-slate-50 text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#a0f399] transition-all flex items-center justify-center gap-2"
              >
                Check MTN Prepaid Options <ArrowRight className="w-3 h-3" />
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
                    <p className="text-sm font-medium text-slate-700"><strong>Consider this when:</strong> You need data during the first 24 hours for Uber, WhatsApp, and Google Maps.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 text-red-600"><Info className="w-4 h-4" /></div>
                    <p className="text-sm font-medium text-slate-700"><strong>Worth noting:</strong> Check whether the plan is data-only and compare its final price per GB with current local options.</p>
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
                    <p className="text-sm font-medium text-slate-700"><strong>Compare this when:</strong> You are staying more than 1 week and can complete local RICA registration.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div>
                    <p className="text-sm font-medium text-slate-700"><strong>Consider this when:</strong> You need a local number for calls, bookings, and driver contact.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 text-red-600"><Info className="w-4 h-4" /></div>
                    <p className="text-sm font-medium text-slate-700"><strong>Compare first:</strong> Include RICA setup, total long-stay cost, allowance, validity and top-up access.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. BEST TRAVEL ESIMS FOR SOUTH AFRICA */}
        <section className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-8">How to Compare Travel eSIMs for South Africa</h2>
          <p className="text-slate-600 font-medium leading-relaxed mb-8">
            Provider catalogues and prices can change. Check these plan types against the final checkout terms instead of relying on a fixed winner or starting price.
          </p>
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#1b6d24] transition-all shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-black">A</div>
                <div>
                  <h3 className="font-black text-lg">Fixed-Allowance Travel eSIM</h3>
                  <p className="text-sm text-slate-500 font-medium">Compare included GB, validity, network and hotspot support.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Before checkout</div>
                  <div className="text-sm font-black text-[#031636]">Confirm total price</div>
                </div>
                <button
                  onClick={() => scrollToSection('timing-your-connection')}
                  className="px-6 py-3 bg-[#031636] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#1b6d24] transition-colors"
                >
                  Compare Before You Fly
                </button>
              </div>
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#1b6d24] transition-all shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 font-black">H</div>
                <div>
                  <h3 className="font-black text-lg">Unlimited-Style Travel eSIM</h3>
                  <p className="text-sm text-slate-500 font-medium">Check fair-use, speed, hotspot and validity limits behind the headline.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Before checkout</div>
                  <div className="text-sm font-black text-[#031636]">Confirm usage limits</div>
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
          <h2 className="text-3xl font-black tracking-tighter mb-8">Compare Local SIM Cards and eSIMs</h2>
          <p className="text-slate-600 font-medium leading-relaxed mb-8">
            This guide focuses on Vodacom and MTN. Compare their current coverage maps and prepaid offers against your exact itinerary before choosing.
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
              <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">Vodacom is one option for mixed itineraries. Check its current coverage map along your exact route, especially for game reserves, rural roads and smaller towns.</p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-xs font-bold text-slate-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Check Route Coverage</li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multiple Top-up Channels</li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Confirm eSIM Eligibility</li>
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
              <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium">MTN is another option for city and multi-stop trips. Check current coverage for every destination and compare public bundles with the offer shown on your SIM.</p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-xs font-bold text-slate-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Check City and Route Coverage</li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Made4U on *142#</li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-500"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Compare Public Bundles</li>
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
              Consider Vodacom for a mixed itinerary only after checking its official map for your specific road trips, towns and reserves. No provider can guarantee signal at every stop.
            </p>
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
              <h4 className="font-black text-[#1b6d24] mb-2">Pro Tip:</h4>
              <p className="text-sm text-slate-700 font-medium">Once your SIM is active, dial <strong>*123#</strong> to check Just4You deals. Offers vary by SIM, so confirm the allocation, validity and final price against the public menu.</p>
            </div>
          </div>
        </section>

        {/* 9. MTN FOR TOURISTS */}
        <section className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-6">MTN for Tourists</h2>
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
            <p className="text-slate-600 leading-relaxed font-medium mb-6">
              Consider MTN for an urban-heavy trip after checking current coverage at your accommodation and planned venues in Cape Town, Johannesburg, Pretoria, Durban, or other stops.
            </p>
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-8">
              <h4 className="font-black text-blue-700 mb-2">What to buy?</h4>
              <p className="text-sm text-slate-700 font-medium">Ask for a standard prepaid SIM. Once RICA is complete, compare the standard <strong>*136*2#</strong> menu with Made4U on <strong>*142#</strong>. Offers vary by SIM, so confirm price, allocation and validity before buying.</p>
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
        {/* 10. VODACOM VS MTN COMPARISON SECTION */}
        <section className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-8 text-center">Vodacom vs. MTN: What to Check</h2>
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
                  <td className="px-6 py-4 text-slate-400 font-black uppercase text-[10px]">Route Coverage</td>
                  <td className="px-6 py-4 text-slate-600">Check every planned route</td>
                  <td className="px-6 py-4 text-slate-600">Check every planned route</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-slate-400 font-black uppercase text-[10px]">City Coverage & Speeds</td>
                  <td className="px-6 py-4 text-slate-600">Location and conditions vary</td>
                  <td className="px-6 py-4 text-slate-600">Location and conditions vary</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-slate-400 font-black uppercase text-[10px]">Prepaid Pricing</td>
                  <td className="px-6 py-4 text-slate-600">Varies by bundle and validity</td>
                  <td className="px-6 py-4 text-slate-600">Varies by offer and validity</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-slate-400 font-black uppercase text-[10px]">Before Buying</td>
                  <td className="px-6 py-4 text-slate-600">Confirm coverage and final offer</td>
                  <td className="px-6 py-4 text-slate-600">Confirm coverage and final offer</td>
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
                If you plan to buy after landing at <strong>OR Tambo (JNB)</strong> or <strong>Cape Town (CPT)</strong>, check the current airport directory and operator store locator before departure. Store presence and hours can change.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#031636] text-white flex items-center justify-center flex-shrink-0 text-xs font-black">1</div>
                  <p className="text-sm text-slate-600 font-medium">Confirm that the seller is an accredited operator outlet or agent before handing over identity documents.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#031636] text-white flex items-center justify-center flex-shrink-0 text-xs font-black">2</div>
                  <p className="text-sm text-slate-600 font-medium">Bring the identity and address evidence the operator currently accepts for foreign visitors.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#031636] text-white flex items-center justify-center flex-shrink-0 text-xs font-black">3</div>
                  <p className="text-sm text-slate-600 font-medium">Allow time for RICA registration and activation; timing depends on the outlet, documents and queue.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] flex flex-col items-center text-center">
              <PlaneLanding className="w-12 h-12 text-[#1b6d24] mb-4" />
              <h4 className="font-black text-lg mb-2">Confirm the Total Before Paying</h4>
              <p className="text-sm text-slate-500 font-medium">Use an official operator store where practical. Ask for the starter-pack price, included bundle and validity; a minimum recharge requirement is not the SIM card's retail price.</p>
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
                Choose this if you want to inspect local offers and registration requirements in person. Compare the final local bundle with any travel eSIM renewal cost.
              </p>
            </div>
          </div>
          <div className="relative z-10 mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => scrollToSection('esim-options')}
              className="px-6 py-3 bg-white text-[#031636] rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Compare SIM Options Before You Fly
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
                  RICA registration is required before a local SIM can be activated. The process records identity and address information; confirm the current operator checklist for foreign visitors before relying on an in-person purchase.
                </p>
                <h4 className="font-black mb-4 uppercase text-xs tracking-widest text-slate-400">What you need:</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-bold text-slate-700">Accepted identity document</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-bold text-slate-700">Accepted address evidence</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-6 font-medium italic">
                  * Requirements and accepted alternatives can differ by operator and outlet. Confirm them before travelling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 14. BEST BY SCENARIO */}
        <section id="best-by-scenario" className="mb-16">
          <h2 className="text-3xl font-black tracking-tighter mb-8">Connectivity Options by Trip Scenario</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <PlaneLanding className="w-6 h-6 text-[#1b6d24] mb-3" />
              <h4 className="font-black mb-2">Landing Late Tonight</h4>
              <p className="text-xs text-slate-500 font-medium">A travel eSIM installed before arrival avoids relying on airport shop hours; compare device support and activation terms first.</p>
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <Globe className="w-6 h-6 text-[#1b6d24] mb-3" />
              <h4 className="font-black mb-2">3-5 Day City Trip</h4>
              <p className="text-xs text-slate-500 font-medium">Compare a small travel eSIM with short-validity local bundles, then check coverage at every planned stop.</p>
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <Star className="w-6 h-6 text-[#1b6d24] mb-3" />
              <h4 className="font-black mb-2">1 Week Holiday</h4>
              <p className="text-xs text-slate-500 font-medium">Compare operator coverage maps across your city and travel routes, then match the bundle validity to the trip.</p>
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <CreditCard className="w-6 h-6 text-[#1b6d24] mb-3" />
              <h4 className="font-black mb-2">2+ Week Stay</h4>
              <p className="text-xs text-slate-500 font-medium">Compare the current local prepaid total with the cost and restrictions of extending a travel eSIM.</p>
            </div>
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <Smartphone className="w-6 h-6 text-[#1b6d24] mb-3" />
              <h4 className="font-black mb-2">Visiting Family for a Month</h4>
              <p className="text-xs text-slate-500 font-medium">Compare local prepaid and travel eSIM totals for the full month, including allowance, validity, RICA setup and top-up access.</p>
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
                <p className="text-sm text-slate-600 font-medium">Compare a small travel eSIM with local prepaid based on arrival timing, expected data use and RICA setup.</p>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex items-center gap-6 border-l-4 border-l-[#1b6d24]">
              <div className="text-2xl font-black text-[#1b6d24]">03</div>
              <div>
                <h4 className="font-black text-lg">2+ Week Stay</h4>
                <p className="text-sm text-slate-600 font-medium">Compare the full-stay local prepaid total with extending a travel eSIM, including allowance, validity, setup and top-up access.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 16. FINAL VERDICT */}
        <section className="mb-16 bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl font-black tracking-tighter mb-6">The DataCost Verdict</h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
            A local prepaid SIM can suit a longer stay, but RICA adds a registration step that most international travel eSIMs avoid.
          </p>
          <div className="bg-[#f8fafc] p-8 rounded-3xl border border-slate-100">
            <p className="text-slate-700 font-bold leading-relaxed italic">
              "If you need arrival data, consider a small travel eSIM before departure. For a local SIM, compare current prepaid bundles by anytime data, validity and total price, then choose one that fits your route and expected use."
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
        </section>        {/* 18. FAQ SECTION */}
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
      <MobileNav onScrollTo={onScrollTo} activeSection="guides" />    </div>
  );
};
