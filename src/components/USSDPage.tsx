import React, { useMemo, useState } from 'react';
import { Phone, Copy, Check, ArrowLeft, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';
import { ussdRepository } from '../data/ussd';
import { networkMetadata } from '../data';
import { NetworkName, USSDCategory } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface USSDPageProps {
  onBack: () => void;
}

export const USSDPage: React.FC<USSDPageProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const networks: NetworkName[] = ['Vodacom', 'MTN', 'Telkom', 'Cell C', 'Rain'];

  const categories: USSDCategory[] = [
    'Balance',
    'Airtime / Recharge',
    'Data / Bundles',
    'Transfers',
    'Number / SIM info',
    'Self-service / Account',
    'Support / Customer care',
    'Promotions / Advance airtime / Extras',
    'Other'
  ];

  const scrollToNetwork = (network: string) => {
    const element = document.getElementById(`network-${network.toLowerCase().replace(' ', '-')}`);
    if (element) {
      const offset = 100; // Account for sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are USSD codes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "USSD (Unstructured Supplementary Service Data) codes are short codes that start with an asterisk (*) and end with a hash (#). They are used to communicate directly with your mobile network provider to check balances, buy bundles, and manage account services without needing an internet connection."
        }
      },
      {
        "@type": "Question",
        "name": "How do I check my Vodacom balance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dial *135# on your Vodacom phone to check your airtime and data balance."
        }
      },
      {
        "@type": "Question",
        "name": "What is the MTN balance check code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The USSD code to check your MTN balance is *136#."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      {/* Header / Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-[#1b6d24] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Comparison</span>
          </button>
          <div className="hidden md:flex items-center gap-2">
            {networks.map(network => (
              <button
                key={network}
                onClick={() => scrollToNetwork(network)}
                className="px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 rounded-xl transition-colors"
              >
                {network}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#a0f399]/20 text-[#217128] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-[#a0f399]/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified USSD Repository
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            South Africa <span className="text-[#1b6d24]">USSD Codes</span> Reference
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
            The definitive repository for checking balances, buying data, and managing your network services across all South African mobile operators.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white border border-slate-100 rounded-2xl text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm">
              Last Updated: {today}
            </span>
            <span className="px-4 py-2 bg-white border border-slate-100 rounded-2xl text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm">
              Status: Expanding Database
            </span>
          </div>
        </header>

        {/* Network Sections */}
        {networks.map(network => (
          <section
            key={network}
            id={`network-${network.toLowerCase().replace(' ', '-')}`}
            className="mb-20 scroll-mt-32"
          >
            <div className="flex items-center gap-4 mb-8">
              <div
                className="w-16 h-16 rounded-3xl flex items-center justify-center text-2xl font-black shadow-xl"
                style={{ backgroundColor: networkMetadata[network].color, color: networkMetadata[network].textColor }}
              >
                {networkMetadata[network].logoLetter}
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight">{network} Codes</h2>
                <p className="text-sm text-slate-500 font-medium">{networkMetadata[network].description}</p>
              </div>
            </div>

            {network === 'Rain' ? (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2">Rain is App-Managed</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      Rain is not a traditional USSD-driven mobile operator. They focus on a digital-first experience where all management happens via their official app or website.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <a
                        href="https://www.rain.co.za"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-500 transition-colors group"
                      >
                        <span className="font-bold">Official Website</span>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-500" />
                      </a>
                      <a
                        href="tel:0816100000"
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-500 transition-colors group"
                      >
                        <span className="font-bold">Customer Support</span>
                        <Phone className="w-4 h-4 text-slate-400 group-hover:text-orange-500" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {categories.map(category => {
                  const codes = ussdRepository.filter(c => c.network === network && c.category === category);
                  if (codes.length === 0) return null;

                  return (
                    <div key={category}>
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
                        {category}
                        <div className="h-[1px] flex-1 bg-slate-100"></div>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {codes.map((item, idx) => (
                          <div
                            key={`${item.code}-${idx}`}
                            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="font-black text-slate-900 leading-tight">{item.action}</h4>
                              {item.status === 'verified' && (
                                <span className="text-[8px] font-black uppercase tracking-widest text-[#217128] bg-[#a0f399]/20 px-2 py-1 rounded-full">
                                  Verified
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-500 mb-6 font-medium leading-relaxed">
                              {item.explanation}
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 font-mono font-black text-[#031636] text-lg tracking-widest overflow-hidden text-ellipsis whitespace-nowrap">
                                {item.code}
                              </div>
                              <button
                                onClick={() => handleCopy(item.code)}
                                className="p-3 bg-slate-50 text-slate-400 hover:text-[#217128] hover:bg-[#a0f399]/10 border border-slate-100 rounded-xl transition-all"
                                title="Copy code"
                              >
                                {copiedCode === item.code ? <Check className="w-5 h-5 text-[#217128]" /> : <Copy className="w-5 h-5" />}
                              </button>
                              {item.dialable && (
                                <a
                                  href={`tel:${item.code.replace('#', '%23')}`}
                                  className="p-3 bg-[#031636] text-white hover:bg-[#1b6d24] rounded-xl transition-all shadow-lg active:scale-95"
                                  title="Dial code"
                                >
                                  <Phone className="w-5 h-5" />
                                </a>
                              )}
                            </div>
                            {item.note && (
                              <p className="mt-3 text-[10px] text-slate-400 font-bold italic">
                                Note: {item.note}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ))}

        {/* Contextual CTA */}
        <section className="mt-24 bg-[#031636] rounded-[2rem] p-8 md:p-12 text-center text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#a0f399] blur-[120px] opacity-20 -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">Looking for cheaper data?</h2>
            <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto">
              Our main comparison tool analyzes dozens of bundles from all networks to find the absolute lowest cost per GB for your specific needs.
            </p>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-[#a0f399] text-[#031636] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-[#a0f399]/20"
            >
              Compare Data Plans Now
            </button>
          </div>
        </section>

        {/* FAQ Schema Placeholder */}
        <section className="mt-20">
          <h2 className="text-2xl font-black tracking-tighter mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">What are USSD codes?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                USSD (Unstructured Supplementary Service Data) codes are short codes that start with an asterisk (*) and end with a hash (#). They are used to communicate directly with your mobile network provider to check balances, buy bundles, and manage account services without needing an internet connection.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Is the repository fully complete?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                This repository includes the most common and verified codes currently in our database. We are constantly expanding the list as new services are launched by South African operators.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Do USSD codes cost money?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Most network service USSD codes are free to use in South Africa. However, some premium services might carry a cost, but you will usually be notified before being charged.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
