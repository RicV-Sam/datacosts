import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { AdUnit } from '../components/AdUnit';
import { NetworkCard } from '../components/NetworkCards';
import { Scorecard } from '../components/Scorecard';
import { NetworkName, NavigateFunction } from '../types';
import { networkPages } from '../data/networks';
import { TowerControl, BookOpen, Smartphone, Info, Zap, Globe, ShieldCheck, Gauge, Wifi, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NetworkHubPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const NetworkHubPage: React.FC<NetworkHubPageProps> = ({ onNavigate, onScrollTo }) => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Which mobile network has the best coverage in South Africa?",
      answer: "Vodacom and MTN consistently provide the best overall coverage in South Africa, covering over 99% of the population. Vodacom is widely regarded as having the most stable network in rural and outlying areas."
    },
    {
      question: "Which network is cheapest for data in South Africa?",
      answer: "Telkom and Cell C are generally the cheapest for 'Anytime' prepaid data. Telkom's Mo'Nice offers and Cell C's personalized bundles often provide the lowest cost per GB for standard mobile users."
    },
    {
      question: "Is MTN or Vodacom better?",
      answer: "It depends on your priority. Vodacom usually offers slightly better rural coverage and network stability, while MTN frequently wins awards for the fastest 5G and 4G download speeds in urban areas."
    },
    {
      question: "Is Rain a good alternative for mobile data?",
      answer: "Rain is excellent for data-heavy users and home internet (Fixed-LTE/5G) in metropolitan areas. However, because it relies on newer infrastructure and has limited rural reach, it is best used as a secondary data SIM or for home Wi-Fi."
    }
  ];

  const canonicalUrl = "https://datacost.co.za/network/";
  const pageTitle = "Compare Mobile Networks in South Africa | Vodacom, MTN, Cell C, Telkom & Rain";
  const metaDescription = "Compare South Africa’s mobile networks including Vodacom, MTN, Cell C, Telkom and Rain. See network strengths, data value, coverage, speeds and related guides.";

  const coreNetworks: NetworkName[] = ['Vodacom', 'MTN', 'Cell C', 'Telkom'];
  const secondaryNetworks: NetworkName[] = ['Rain'];

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": "Compare Mobile Networks in South Africa (2026)",
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

  const handleViewDeals = (network: NetworkName) => {
    const page = Object.values(networkPages).find(p => p.networkName === network);
    if (page) {
      onNavigate('network', page.slug);
    }
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="networks" />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <AdUnit type="aboveFold" />

        {/* HERO SECTION */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a0f399]/20 text-[#1b6d24] text-sm font-bold mb-6">
            <TowerControl className="w-4 h-4" />
            <span>Expert Comparison 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            Compare Mobile <span className="text-[#1b6d24]">Networks</span> South Africa
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            Finding the <strong>best mobile network in South Africa</strong> depends on your budget, coverage, and data needs.
            Whether you are weighing up <strong>Vodacom vs MTN vs Telkom vs Cell C</strong>, or searching for the
            <strong> cheapest data network in South Africa</strong>, our 2026 comparison helps you choose the right provider.
          </p>
        </div>

        {/* BEST FOR SECTION */}
        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 text-center italic">Best Network for Your Needs</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:border-[#1b6d24] transition-colors group">
              <Globe className="w-8 h-8 text-[#1b6d24] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Vodacom</div>
              <div className="text-sm font-black text-slate-900 leading-tight">Best for Coverage</div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:border-[#1b6d24] transition-colors group">
              <Gauge className="w-8 h-8 text-[#1b6d24] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">MTN</div>
              <div className="text-sm font-black text-slate-900 leading-tight">Best All-Rounder</div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:border-[#1b6d24] transition-colors group">
              <Zap className="w-8 h-8 text-[#1b6d24] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Telkom</div>
              <div className="text-sm font-black text-slate-900 leading-tight">Best Value</div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:border-[#1b6d24] transition-colors group">
              <ShieldCheck className="w-8 h-8 text-[#1b6d24] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Cell C</div>
              <div className="text-sm font-black text-slate-900 leading-tight">Best Budget Promos</div>
            </div>
            <div className="col-span-2 md:col-span-1 bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:border-[#1b6d24] transition-colors group">
              <Wifi className="w-8 h-8 text-[#1b6d24] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Rain</div>
              <div className="text-sm font-black text-slate-900 leading-tight">Best for Heavy Data</div>
            </div>
          </div>
        </section>

        {/* CORE NETWORKS */}
        <section className="mb-16">
          <h2 className="text-2xl font-black tracking-tighter mb-8 flex items-center gap-2">
            Major Mobile Operators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreNetworks.map(network => (
              <NetworkCard
                key={network}
                network={network}
                onViewDeals={handleViewDeals}
              />
            ))}
          </div>
        </section>

        {/* SECONDARY NETWORKS (Rain) */}
        <section className="mb-24">
          <h2 className="text-2xl font-black tracking-tighter mb-8 flex items-center gap-2">
            Specialized & Data-Only Networks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryNetworks.map(network => (
              <NetworkCard
                key={network}
                network={network}
                onViewDeals={handleViewDeals}
              />
            ))}
          </div>
        </section>

        <AdUnit type="inContent" />

        {/* COMPARISON TABLE */}
        <div className="mb-24">
            <Scorecard />
        </div>

        {/* RELATED RESOURCES */}
        <section className="mb-24 bg-slate-50/50 rounded-[3rem] p-8 md:p-12 border border-slate-100">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 text-center">Explore More Guides & Tools</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <button
              onClick={() => onNavigate('guides-index')}
              className="p-8 bg-white border border-slate-100 rounded-[2rem] text-left hover:border-[#1b6d24] hover:shadow-xl transition-all group"
            >
              <BookOpen className="w-8 h-8 text-[#1b6d24] mb-4" />
              <div className="text-xl font-black text-slate-900 group-hover:text-[#1b6d24] transition-colors">Data Guides</div>
              <p className="text-sm text-slate-500 mt-2 font-medium">Expert tips on how to save money and find the <strong>best data deals</strong>.</p>
            </button>
            <button
              onClick={() => onNavigate('ussd')}
              className="p-8 bg-white border border-slate-100 rounded-[2rem] text-left hover:border-[#1b6d24] hover:shadow-xl transition-all group"
            >
              <Smartphone className="w-8 h-8 text-[#1b6d24] mb-4" />
              <div className="text-xl font-black text-slate-900 group-hover:text-[#1b6d24] transition-colors">USSD Codes</div>
              <p className="text-sm text-slate-500 mt-2 font-medium">Complete directory of <strong>USSD codes</strong> for all SA networks.</p>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="p-8 bg-white border border-slate-100 rounded-[2rem] text-left hover:border-[#1b6d24] hover:shadow-xl transition-all group"
            >
              <Info className="w-8 h-8 text-[#1b6d24] mb-4" />
              <div className="text-xl font-black text-slate-900 group-hover:text-[#1b6d24] transition-colors">Data Calculator</div>
              <p className="text-sm text-slate-500 mt-2 font-medium">Estimate your usage and find the <strong>cheapest data bundles</strong>.</p>
            </button>
          </div>
        </section>

        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm mb-24">
          <h2 className="text-2xl font-black tracking-tighter mb-6">Choosing the Best Mobile Network (2026 Comparison)</h2>
          <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed">
            <p className="mb-4">
                When you <strong>compare mobile networks in South Africa</strong>, the decision usually comes down to three main factors:
                <strong> Coverage</strong>, <strong>Data Speed</strong>, and <strong>Price</strong>.
                While <strong>Vodacom and MTN</strong> offer the most extensive network reach (especially in rural areas),
                <strong> Telkom and Cell C</strong> often provide better value for money through aggressive prepaid pricing and personalized "Mo'Nice" or "Made4U" deals.
            </p>
            <p className="mb-4">
                In the battle of <strong>Vodacom vs MTN vs Telkom vs Cell C</strong>, there is no single "best" provider for everyone.
                Vodacom is often cited as the "Gold Standard" for reliability, while MTN consistently wins awards for the fastest average speeds.
                Telkom remains the <strong>cheapest data network in South Africa</strong> for large "Anytime" prepaid bundles.
            </p>
            <p>
                If you are looking for home internet or high-volume data, <strong>Rain's</strong> unlimited 4G and 5G plans are worth considering,
                provided you are within their urban coverage zones. We recommend checking the official coverage maps of each operator
                before committing to a long-term contract or a large data bundle.
            </p>
          </div>
        </div>

        {/* FAQ SECTION */}
        <section className="mb-24 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tighter mb-4">Common Questions</h2>
            <p className="text-slate-500 font-medium">Everything you need to know about comparing SA networks.</p>
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

      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="networks" />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
