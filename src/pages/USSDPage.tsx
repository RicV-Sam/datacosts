import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { ussdRepository } from '../data/ussd';
import { networkPages } from '../data/networks';
import { USSDEntry, NavigateFunction } from '../types';
import {
  Smartphone,
  Search,
  Copy,
  CheckCircle2,
  Phone,
  ChevronRight,
  ExternalLink,
  Info,
  ShieldCheck,
  Zap,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface USSDPageProps {
  onBack: () => void;
  onScrollTo: (id: string) => void;
  onNavigate: NavigateFunction;
}

export const USSDPage: React.FC<USSDPageProps> = ({ onBack, onScrollTo, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeNetwork, setActiveNetwork] = useState<string>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const networks = ['All', 'Vodacom', 'MTN', 'Telkom', 'Cell C', 'Rain'];

  const faqs = [
    {
      question: "What are USSD codes and how do they work?",
      answer: "USSD (Unstructured Supplementary Service Data) codes are short numeric sequences starting with * and ending with # (e.g., *135#). They allow you to communicate directly with your mobile network's computers to check balances, buy data, and manage your account without needing an internet connection."
    },
    {
      question: "Are USSD codes free to use in South Africa?",
      answer: "Most basic USSD codes for checking balances and managing accounts are free on Vodacom, MTN, Telkom, and Cell C. However, some premium services or third-party menus might carry a small session fee (usually around 20c). Always check your network's specific terms."
    },
    {
      question: "How do I dial a USSD code on my smartphone?",
      answer: "Open your phone's 'Phone' or 'Dialer' app, type the code exactly as shown (including the * and #), and press the call button. The network will then send a text-based menu back to your screen."
    },
    {
      question: "Can I use USSD codes on a tablet or router?",
      answer: "Most routers and tablets do not have a native dialer for USSD. To use these codes for a data-only SIM, you usually need to insert the SIM into a phone temporarily or use the network's official app or web portal (like the Rain portal or MyVodacom app)."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const filteredCodes = ussdRepository.filter(entry => {
    const matchesSearch =
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesNetwork = activeNetwork === 'All' || entry.network === activeNetwork;

    return matchesSearch && matchesNetwork;
  });

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const dialCode = (code: string) => {
    // Replace # with %23 for tel: links
    const dialableCode = code.replace(/#/g, '%23');
    window.location.href = `tel:${dialableCode}`;
  };

  const handleNetworkClick = (network: string) => {
    setActiveNetwork(network);
    const element = document.getElementById(network.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getNetworkIcon = (network: string) => {
    switch (network) {
      case 'Vodacom': return <div className="w-8 h-8 rounded-full bg-[#e60000] flex items-center justify-center text-white font-black text-xs">V</div>;
      case 'MTN': return <div className="w-8 h-8 rounded-full bg-[#ffcc00] flex items-center justify-center text-black font-black text-xs">M</div>;
      case 'Telkom': return <div className="w-8 h-8 rounded-full bg-[#0099ff] flex items-center justify-center text-white font-black text-xs">T</div>;
      case 'Cell C': return <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-black text-xs">C</div>;
      case 'Rain': return <div className="w-8 h-8 rounded-full bg-[#ff5a00] flex items-center justify-center text-white font-black text-xs">R</div>;
      default: return <Smartphone className="w-5 h-5" />;
    }
  };

  const quickActions = [
    { label: 'Balance', icon: '💰', codes: { Vodacom: '*135#', MTN: '*136#', Telkom: '*188#', 'Cell C': '*101#' } },
    { label: 'Buy Data', icon: '⚡', codes: { Vodacom: '*135*2#', MTN: '*136*2#', Telkom: '*180#', 'Cell C': '*147#' } },
    { label: 'Customer Care', icon: '📞', codes: { Vodacom: '135', MTN: '135', Telkom: '180', 'Cell C': '135' } }
  ];

  const canonicalUrl = "https://datacost.co.za/ussd-codes-south-africa/";
  const pageTitle = "USSD Codes South Africa 2026 | Vodacom, MTN, Telkom, Cell C";
  const metaDescription = "Complete directory of USSD codes for South Africa (2026). Check balance, buy data, and manage your account for Vodacom, MTN, Telkom, and Cell C.";

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "Full Directory of USSD Codes in South Africa (2026)",
        "description": metaDescription,
        "image": "https://datacost.co.za/og-image.jpg",
        "author": {
          "@type": "Organization",
          "name": "DataCost.co.za",
          "url": "https://datacost.co.za"
        },
        "publisher": {
          "@type": "Organization",
          "name": "DataCost.co.za",
          "logo": {
            "@type": "ImageObject",
            "url": "https://datacost.co.za/logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-20">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="ussd" />

      <main className="max-w-4xl mx-auto px-4 pt-8 md:pt-12">
        {/* HERO */}
        <div className="mb-12 text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-8 hover:text-[#1b6d24] transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Comparison
          </button>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a0f399]/20 text-[#1b6d24] text-[10px] font-black uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full bg-[#1b6d24] animate-pulse" />
              Last Updated: 20 March 2026
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              Status: Verified Database
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            South African <span className="text-[#1b6d24]">USSD Codes</span> 2026
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            The complete 2026 guide to <strong>USSD codes in South Africa</strong>. Use these shortcodes to check your balance,
            buy data bundles, and manage your Vodacom, MTN, Telkom, or Cell C account instantly.
          </p>
        </div>

        {/* NETWORK SELECTOR (STICKY) */}
        <div className="sticky top-20 z-40 -mx-4 px-4 py-4 bg-mesh/80 backdrop-blur-md mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
              {networks.map(network => (
                <button
                  key={network}
                  onClick={() => handleNetworkClick(network)}
                  className={`px-6 py-3 rounded-2xl font-black text-sm transition-all whitespace-nowrap flex-shrink-0 border-2 ${
                    activeNetwork === network
                      ? 'bg-[#1b6d24] text-white border-[#1b6d24] shadow-lg shadow-[#1b6d24]/20'
                      : 'bg-white text-slate-600 border-slate-100 hover:border-[#a0f399]'
                  }`}
                >
                  {network.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* QUICK UTILITY SECTION */}
        <section className="mb-12 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#a0f399]/20 flex items-center justify-center text-[#1b6d24]">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight">Quick Utility</h2>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Most Used Shortcodes</p>
            </div>
          </div>

          <div className="space-y-8">
            {quickActions.map((action, i) => (
              <div key={i}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                  <span className="text-lg grayscale">{action.icon}</span> {action.label}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(action.codes).map(([network, code]) => (
                    <button
                      key={network}
                      onClick={() => dialCode(code)}
                      className="group bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center hover:border-[#1b6d24] hover:bg-white transition-all active:scale-95"
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 group-hover:text-[#1b6d24]">{network}</div>
                      <div className="text-lg font-black text-slate-900 group-hover:text-[#1b6d24]">{code}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50">
             <div className="flex items-center gap-4 p-6 bg-orange-50 rounded-3xl border border-orange-100 group">
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg shadow-orange-200">R</div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-900 mb-1">Rain user? Manage everything via their digital portal.</p>
                </div>
                <button
                   onClick={() => window.open('https://rain.co.za', '_blank')}
                   className="px-6 py-3 bg-white border border-orange-200 rounded-xl font-black text-xs text-orange-600 hover:bg-orange-50 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  OPEN RAIN PORTAL <ExternalLink className="w-3 h-3" />
                </button>
             </div>
          </div>
        </section>

        <AdUnit type="aboveFold" />

        {/* SEARCH & FILTER */}
        <div className="mb-12">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#1b6d24] transition-colors" />
            <input
              type="text"
              placeholder="Search e.g. 'check balance' or 'buy data'..."
              className="w-full pl-16 pr-6 py-6 bg-white border-2 border-slate-100 rounded-[2rem] font-medium text-lg focus:outline-none focus:border-[#a0f399] transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* RESULTS GRID BY NETWORK */}
        <div className="space-y-16">
          {networks.filter(n => n !== 'All').map(network => {
            const networkCodes = filteredCodes.filter(c => c.network === network);
            if (networkCodes.length === 0) return null;

            return (
              <section key={network} id={network.toLowerCase()} className="scroll-mt-32">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="shadow-xl shadow-slate-200 rounded-full">{getNetworkIcon(network)}</div>
                    <div>
                      <h2 className="text-4xl font-black tracking-tighter">{network} Codes</h2>
                      <p className="text-slate-500 font-medium">
                        {network === 'Vodacom' && "Vodacom's 5G footprint and throughput remain the most consistent in urban metros."}
                        {network === 'MTN' && "MTN consistently wins speed awards for their urban 5G and 4G performance."}
                        {network === 'Telkom' && "Telkom's prepaid data remains the cheapest 'Anytime' data in the country."}
                        {network === 'Cell C' && "Cell C's focus is on aggressive data value and niche prepaid promotions."}
                        {network === 'Rain' && "Rain provides unlimited data plans managed entirely through their app."}
                      </p>
                    </div>
                  </div>

                  {network !== 'Rain' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const slug = Object.values(networkPages).find(p => p.networkName === network)?.slug;
                          if (slug) onNavigate('network', slug);
                        }}
                        className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-xs text-slate-600 hover:border-[#1b6d24] hover:text-[#1b6d24] transition-all flex items-center gap-2"
                      >
                        {network.toUpperCase()} HUB
                      </button>
                      <button
                        onClick={() => {
                          const slug = network.toLowerCase().replace(' ', '-');
                          onNavigate('guide', `how-to-buy-data-${slug}`);
                        }}
                        className="px-6 py-3 bg-[#a0f399]/10 border border-[#a0f399] rounded-2xl font-black text-xs text-[#1b6d24] hover:bg-[#a0f399]/20 transition-all flex items-center gap-2"
                      >
                        BUY DATA GUIDE <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* PROMO BOX FOR NETWORK */}
                {network !== 'Rain' && (
                   <div className="mb-8 p-8 bg-gradient-to-br from-slate-50 to-white rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center gap-8 group">
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-slate-900 mb-2">Save on {network} Data</h3>
                        <p className="text-slate-500 font-medium">View our detailed guide on finding the cheapest {network} bundles.</p>
                      </div>
                      <div className="flex gap-3 shrink-0">
                         <button
                            onClick={() => {
                              const slug = Object.values(networkPages).find(p => p.networkName === network)?.slug;
                              if (slug) onNavigate('network', slug);
                            }}
                            className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-black text-xs text-slate-900 shadow-sm hover:border-[#1b6d24] transition-all"
                         >
                            {network.toUpperCase()} HUB
                         </button>
                         <button
                            onClick={() => {
                              const slug = network.toLowerCase().replace(' ', '-');
                              onNavigate('guide', `how-to-buy-data-${slug}`);
                            }}
                            className="px-8 py-4 bg-[#1b6d24] text-white border border-[#1b6d24] rounded-2xl font-black text-xs shadow-lg shadow-[#1b6d24]/20 hover:scale-105 transition-all flex items-center gap-2"
                         >
                            BUY DATA GUIDE <ExternalLink className="w-3 h-3" />
                         </button>
                      </div>
                   </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {networkCodes.map((entry, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={`${entry.network}-${entry.code}-${index}`}
                      className="bg-white border border-slate-100 p-6 rounded-[2rem] hover:border-[#a0f399] transition-all group flex flex-col"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100">
                          {entry.category}
                        </div>
                        {entry.status === 'verified' && (
                          <div className="flex items-center gap-1 text-[#1b6d24] text-[10px] font-black uppercase tracking-widest">
                            <CheckCircle2 className="w-3 h-3" /> Verified
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-[#1b6d24] transition-colors">{entry.action}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                        {entry.explanation}
                      </p>

                      <div className="mt-auto">
                        <div className="bg-slate-50 rounded-2xl p-4 text-center mb-4 border border-slate-100">
                           <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">CODE</div>
                           <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{entry.code}</div>
                        </div>

                        {entry.code !== 'N/A' && (
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => copyToClipboard(entry.code)}
                              className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-xs transition-all border-2 ${
                                copiedCode === entry.code
                                  ? 'bg-[#1b6d24] border-[#1b6d24] text-white'
                                  : 'bg-white border-slate-100 text-slate-600 hover:border-[#a0f399] hover:text-[#1b6d24]'
                              }`}
                            >
                              {copiedCode === entry.code ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4" /> COPIED
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" /> COPY
                                </>
                              )}
                            </button>
                            {entry.dialable && (
                              <button
                                onClick={() => dialCode(entry.code)}
                                className="flex items-center justify-center gap-2 py-4 bg-[#031636] text-white rounded-2xl font-black text-xs hover:bg-[#1b6d24] transition-all shadow-lg shadow-slate-200 active:scale-95"
                              >
                                <Phone className="w-4 h-4 fill-current" /> DIAL
                              </button>
                            )}
                          </div>
                        )}

                        {entry.note && (
                          <div className="mt-4 p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
                             <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                             <p className="text-[11px] font-medium text-orange-800 leading-relaxed">{entry.note}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* RAIN SPECIFIC PORTAL LINK IF RAIN */}
                {network === 'Rain' && (
                   <div className="mt-8 grid sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => window.open('https://rain.co.za', '_blank')}
                        className="p-8 bg-white border border-slate-100 rounded-[2.5rem] text-left hover:border-[#ff5a00] transition-all group"
                      >
                         <ShieldCheck className="w-10 h-10 text-[#ff5a00] mb-4" />
                         <div className="text-2xl font-black text-slate-900 group-hover:text-[#ff5a00] transition-colors mb-2">Rain Dashboard</div>
                         <p className="text-slate-500 font-medium mb-6">Access your Rain account to manage bundles, view usage and pay invoices.</p>
                         <div className="inline-flex items-center gap-2 font-black text-xs text-[#ff5a00]">
                            OPEN PORTAL <ChevronRight className="w-4 h-4" />
                         </div>
                      </button>
                      <button
                        onClick={() => window.location.href = 'tel:0816101000'}
                        className="p-8 bg-white border border-slate-100 rounded-[2.5rem] text-left hover:border-[#ff5a00] transition-all group"
                      >
                         <Phone className="w-10 h-10 text-[#ff5a00] mb-4" />
                         <div className="text-2xl font-black text-slate-900 group-hover:text-[#ff5a00] transition-colors mb-2">Support Hotline</div>
                         <p className="text-slate-500 font-medium mb-6">Speak directly to a Rain consultant for technical help or account queries.</p>
                         <div className="inline-flex items-center gap-2 font-black text-xs text-[#ff5a00]">
                            CALL 081 610 1000 <ChevronRight className="w-4 h-4" />
                         </div>
                      </button>
                   </div>
                )}

                {network === 'MTN' && <div className="mt-16"><AdUnit type="inContent" /></div>}
              </section>
            );
          })}
        </div>

        {/* FAQ SECTION */}
        <section className="mt-24 mb-16 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tighter mb-4">Common Questions</h2>
            <p className="text-slate-500 font-medium">Everything you need to know about using USSD codes in South Africa.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm transition-all hover:border-[#a0f399]">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-black text-[#031636] pr-8">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                      openFaqIndex === index ? 'rotate-180 text-[#1b6d24]' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-slate-600 font-medium leading-relaxed border-t border-slate-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM AD */}
        <div className="mt-12">
          <AdUnit type="inContent" />
        </div>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="ussd" />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
