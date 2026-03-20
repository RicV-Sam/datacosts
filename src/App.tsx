import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Menu, 
  Search, 
  BadgeCheck, 
  Router, 
  TowerControl, 
  Globe, 
  Gauge, 
  BatteryCharging, 
  Banknote, 
  Trophy, 
  Bolt,
  ChevronRight,
  ChevronDown,
  Tag,
  Signal,
  ArrowLeftRight,
  Bookmark,
  Calculator,
  Phone
} from 'lucide-react';
import { bundles, networkStats } from './data';
import { DataCalculator } from './components/DataCalculator';
import { USSDCodeFinder } from './components/USSDCodeFinder';

export default function App() {
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // JSON-LD Schema for Data Bundles & FAQ
  const jsonLd = {
    "@context": "https://schema.org/",
    "@graph": [
      {
        "@type": "ItemList",
        "name": "Top South African Data Bundles",
        "itemListElement": bundles.map((bundle, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "name": bundle.name,
            "description": `${bundle.network} ${bundle.volume} Data Bundle`,
            "brand": { "@type": "Brand", "name": bundle.network },
            "offers": {
              "@type": "Offer",
              "price": bundle.price.toFixed(2),
              "priceCurrency": "ZAR",
              "availability": "https://schema.org/InStock"
            }
          }
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Which network has the cheapest 1GB data in South Africa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "As of March 2026, Telkom and MTN (via Boosta bundles) typically offer the lowest cost per GB, often dropping below R10/GB for larger bundles."
            }
          },
          {
            "@type": "Question",
            "name": "How do I check my data balance on Vodacom?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dial *135# and follow the prompts, or use the MyVodacom app."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans selection:bg-[#a0f399]/30 relative overflow-hidden">

      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-xl font-black tracking-tighter font-headline">DataCost.co.za</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollTo('deals')}
              className={`text-sm font-bold transition-colors ${activeSection === 'deals' ? 'text-[#1b6d24]' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Deals
            </button>
            <button 
              onClick={() => scrollTo('calculator')}
              className={`text-sm font-bold transition-colors ${activeSection === 'calculator' ? 'text-[#1b6d24]' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Calculator
            </button>
            <button 
              onClick={() => scrollTo('ussd')}
              className={`text-sm font-bold transition-colors ${activeSection === 'ussd' ? 'text-[#1b6d24]' : 'text-slate-500 hover:text-slate-900'}`}
            >
              USSD Codes
            </button>
            <button 
              onClick={() => scrollTo('scorecard')}
              className={`text-sm font-bold transition-colors ${activeSection === 'scorecard' ? 'text-[#1b6d24]' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Scorecard
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* AI Summary Block (TL;DR) */}
        <section className="mb-12 bg-white/70 backdrop-blur-xl border-l-4 border-[#1b6d24] p-6 rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <Bolt className="w-5 h-5 text-[#1b6d24]" />
            <h2 className="text-sm font-black uppercase tracking-widest text-[#1b6d24]">AI Summary (TL;DR)</h2>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            March 2026 Update: <span className="font-bold">MTN</span> currently leads on value with "Boosta" bundles (R5.98/GB). 
            <span className="font-bold">Vodacom</span> remains the "Speed King" but charges a premium. 
            <span className="font-bold">Telkom</span> is the budget champion for urban users. 
            Avoid standard prepaid R149/1GB bundles—they are daylight robbery.
          </p>
        </section>

        {/* Quick Actions (Zero-Click Answers) */}
        <section className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">Vodacom Balance</span>
            <code className="text-lg font-black text-[#E60000]">*135#</code>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">MTN Balance</span>
            <code className="text-lg font-black text-[#FFCC00] bg-[#031636] px-2 rounded">*136#</code>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">Telkom Balance</span>
            <code className="text-lg font-black text-blue-600">*188#</code>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">Cell C Balance</span>
            <code className="text-lg font-black text-slate-800">*101#</code>
          </div>
        </section>

        {/* Hero Section */}
        <section className="mb-12" id="home">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a0f399]/20 text-[#217128] rounded-full mb-4">
                <BadgeCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Updated Daily</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#031636] leading-[0.9] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#031636] to-[#1b6d24]">
                South Africa's<br />Data Comparison
              </h1>
              <p className="text-slate-600 text-lg max-w-lg leading-relaxed">
                An objective analysis of South Africa's mobile networks. We compare cost, coverage, and speed to find your best fit.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
              <span className="text-3xl font-bold text-[#031636]">R149</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avg. 10GB Price</span>
            </div>
          </div>
        </section>

        {/* Network Cards */}
        <h2 className="text-3xl font-black tracking-tighter mb-8">Cheapest 1GB & Large Data Prices</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" id="deals">
          {/* Vodacom */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white/80 backdrop-blur-xl rounded-xl p-6 relative overflow-hidden group border border-white shadow-sm flex flex-col hover:shadow-xl hover:border-[#1b6d24]/30 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Router className="w-24 h-24" />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E60000] rounded-lg flex items-center justify-center text-white font-bold text-lg">V</div>
                <h2 className="text-xl font-black text-[#031636]">Vodacom</h2>
              </div>
            </div>
            <div className="space-y-4 flex-grow">
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium">10GB Anytime</span>
                <span className="text-lg font-bold text-[#031636]">R199</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium">20GB Anytime</span>
                <span className="text-lg font-bold text-[#031636]">R299</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Cost per GB</span>
                <span className="text-lg font-bold text-[#031636]">R14.95</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-[#031636] text-white py-3 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
              View Deals
            </button>
          </motion.div>

          {/* MTN */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white/80 backdrop-blur-xl rounded-xl p-6 relative overflow-hidden group border border-white shadow-sm flex flex-col hover:shadow-xl hover:border-[#1b6d24]/30 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <TowerControl className="w-24 h-24" />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFCC00] rounded-lg flex items-center justify-center text-[#031636] font-bold text-lg">M</div>
                <h2 className="text-xl font-black text-[#031636]">MTN</h2>
              </div>
            </div>
            <div className="space-y-4 flex-grow">
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium">10GB Anytime</span>
                <span className="text-lg font-bold text-[#031636]">R149</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium">20GB Anytime</span>
                <span className="text-lg font-bold text-[#031636]">R249</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Cost per GB</span>
                <span className="text-lg font-bold text-[#031636]">R12.45</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-[#FFCC00] text-[#031636] py-3 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
              View Deals
            </button>
          </motion.div>

          {/* Telkom */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white/80 backdrop-blur-xl rounded-xl p-6 relative overflow-hidden group border border-white shadow-sm flex flex-col hover:shadow-xl hover:border-[#1b6d24]/30 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Signal className="w-24 h-24" />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">T</div>
                <h2 className="text-xl font-black text-[#031636]">Telkom</h2>
              </div>
            </div>
            <div className="space-y-4 flex-grow">
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium">20GB Prepaid</span>
                <span className="text-lg font-bold text-[#031636]">R99</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium">40GB Prepaid</span>
                <span className="text-lg font-bold text-[#031636]">R189</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Cost per GB</span>
                <span className="text-lg font-bold text-[#031636]">R4.95</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
              View Deals
            </button>
          </motion.div>

          {/* Cell C */}
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-white/80 backdrop-blur-xl rounded-xl p-6 relative overflow-hidden group border border-white shadow-sm flex flex-col hover:shadow-xl hover:border-[#1b6d24]/30 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Globe className="w-24 h-24" />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold text-lg">C</div>
                <h2 className="text-xl font-black text-[#031636]">Cell C</h2>
              </div>
            </div>
            <div className="space-y-4 flex-grow">
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium">10GB Monthly</span>
                <span className="text-lg font-bold text-[#031636]">R129</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                <span className="text-xs text-slate-500 font-medium">30GB Monthly</span>
                <span className="text-lg font-bold text-[#031636]">R299</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Cost per GB</span>
                <span className="text-lg font-bold text-[#031636]">R12.90</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-slate-800 text-white py-3 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
              View Deals
            </button>
          </motion.div>
        </section>

        {/* Data Calculator Section */}
        <section className="mb-16">
          <DataCalculator />
        </section>

        {/* USSD Code Finder Section */}
        <h2 className="text-3xl font-black tracking-tighter mb-8">How to Check Balance & Buy Data (USSD Codes)</h2>
        <section className="mb-16">
          <USSDCodeFinder />
        </section>

        {/* FAQ Section */}
        <section className="mb-16 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black tracking-tighter mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Which network has the cheapest 1GB data in South Africa?</h3>
              <p className="text-sm text-slate-600">Currently, Telkom offers the most aggressive pricing for urban users, while MTN's "Boosta" bundles provide the best effective cost per GB for heavy users. Avoid Vodacom if price is your only metric.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">How do I survive Load Shedding with my data?</h3>
              <p className="text-sm text-slate-600">MTN has been the most aggressive with battery rollouts. If your local tower goes dark during Stage 4, switching to an MTN-based provider often keeps you connected longer.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">What is "Night Owl" data?</h3>
              <p className="text-sm text-slate-600">This is data restricted for use between midnight and 5 AM. It's great for large downloads but useless for daytime work. Always check the "Anytime" vs "Night" split.</p>
            </div>
          </div>
        </section>

        {/* Scorecard */}
        <section className="mb-16" id="scorecard">
          <h3 className="text-3xl font-black tracking-tighter mb-8">Network Scorecard</h3>
          <div className="bg-slate-100 rounded-2xl p-2 md:p-6 overflow-hidden">
            <div className="hidden md:grid grid-cols-5 gap-4 mb-4 px-6 py-4">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Metric</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Vodacom</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">MTN</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Telkom</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Cell C</div>
            </div>
            <div className="space-y-2">
              {/* Coverage */}
              <div className="bg-white rounded-xl md:rounded-none md:bg-transparent grid grid-cols-1 md:grid-cols-5 gap-4 px-6 py-6 md:py-4 md:border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-slate-400" />
                  <span className="font-bold md:font-medium">Coverage</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">Vodacom</span>
                  <span className="text-sm">99.8%</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">MTN</span>
                  <span className="text-sm">99.2%</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">Telkom</span>
                  <span className="text-sm">95%</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">Cell C</span>
                  <span className="text-sm">96%*</span>
                </div>
              </div>
              {/* Speed */}
              <div className="bg-white rounded-xl md:rounded-none md:bg-transparent grid grid-cols-1 md:grid-cols-5 gap-4 px-6 py-6 md:py-4 md:border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-slate-400" />
                  <span className="font-bold md:font-medium">Avg. 5G</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">Vodacom</span>
                  <span className="text-sm font-bold text-[#1b6d24]">160 Mbps</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">MTN</span>
                  <span className="text-sm">145 Mbps</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">Telkom</span>
                  <span className="text-sm">110 Mbps</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">Cell C</span>
                  <span className="text-sm">90 Mbps</span>
                </div>
              </div>
              {/* Resilience */}
              <div className="bg-white rounded-xl md:rounded-none md:bg-transparent grid grid-cols-1 md:grid-cols-5 gap-4 px-6 py-6 md:py-4 md:border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <BatteryCharging className="w-5 h-5 text-slate-400" />
                  <span className="font-bold md:font-medium">Resilience</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">Vodacom</span>
                  <span className="text-sm">High</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">MTN</span>
                  <span className="text-sm font-bold text-[#1b6d24]">V. High</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">Telkom</span>
                  <span className="text-sm">Moderate</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">Cell C</span>
                  <span className="text-sm">Low</span>
                </div>
              </div>
              {/* Cost */}
              <div className="bg-white rounded-xl md:rounded-none md:bg-transparent grid grid-cols-1 md:grid-cols-5 gap-4 px-6 py-6 md:py-4">
                <div className="flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-slate-400" />
                  <span className="font-bold md:font-medium">Price Point</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">Vodacom</span>
                  <span className="text-sm">Premium</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">MTN</span>
                  <span className="text-sm">Mid-Range</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">Telkom</span>
                  <span className="text-sm font-bold text-[#1b6d24]">Budget</span>
                </div>
                <div className="flex flex-col md:block">
                  <span className="text-[10px] md:hidden font-bold text-slate-400 uppercase">Cell C</span>
                  <span className="text-sm">Value</span>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 px-6">*Cell C roams on MTN/Vodacom infrastructure in most areas.</p>
          </div>
        </section>

        {/* Verdict */}
        <section className="bg-[#031636] text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1b6d24]/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black tracking-tighter mb-8">The Final Verdict</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-[#a0f399] flex items-center justify-center shrink-0">
                  <Trophy className="w-6 h-6 text-[#217128]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Winner for Value</p>
                  <h4 className="text-xl font-bold">MTN</h4>
                  <p className="text-sm text-slate-300 leading-relaxed mt-2">
                    With a lower average cost per GB and frequent "Boosta" bundles, MTN consistently delivers more data for less Rand.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Banknote className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Budget Champion</p>
                  <h4 className="text-xl font-bold">Telkom</h4>
                  <p className="text-sm text-slate-300 leading-relaxed mt-2">
                    Telkom's prepaid data remains the cheapest "Anytime" data in the country, often dropping below R5/GB for urban users.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-[#1a2b4c] flex items-center justify-center shrink-0">
                  <Bolt className="w-6 h-6 text-[#8293ba]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Winner for Speed</p>
                  <h4 className="text-xl font-bold">Vodacom</h4>
                  <p className="text-sm text-slate-300 leading-relaxed mt-2">
                    Vodacom's 5G footprint and throughput remain the most consistent in urban metros according to recent benchmarks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <span className="text-lg font-black text-[#031636] mb-4 block">DataCost.co.za</span>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              © 2024 DataCost.co.za - South Africa's Independent Data Comparison. We help you find the best value without the bias.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-sm uppercase tracking-wider">Resources</h5>
            <button onClick={() => scrollTo('home')} className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors">About Us</button>
            <button onClick={() => scrollTo('scorecard')} className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors">Network Map</button>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Contact</a>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-sm uppercase tracking-wider">Legal</h5>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 pb-6 pt-2 bg-white/90 backdrop-blur-md border-t border-slate-100 shadow-lg z-50 h-20">
        <button onClick={() => scrollTo('deals')} className={`flex flex-col items-center justify-center ${activeSection === 'deals' ? 'text-[#1b6d24]' : 'text-slate-400'}`}>
          <Tag className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Deals</span>
        </button>
        <button onClick={() => scrollTo('calculator')} className={`flex flex-col items-center justify-center ${activeSection === 'calculator' ? 'text-[#1b6d24]' : 'text-slate-400'}`}>
          <Calculator className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Calc</span>
        </button>
        <button onClick={() => scrollTo('ussd')} className={`flex flex-col items-center justify-center ${activeSection === 'ussd' ? 'text-[#1b6d24]' : 'text-slate-400'}`}>
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">USSD</span>
        </button>
        <button onClick={() => scrollTo('scorecard')} className={`flex flex-col items-center justify-center ${activeSection === 'scorecard' ? 'text-[#1b6d24]' : 'text-slate-400'}`}>
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Stats</span>
        </button>
      </nav>
    </div>
  );
}
