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
import { bundles } from '../data';
import { TowerControl, BookOpen, Smartphone, Info, Zap, Globe, ShieldCheck, Gauge, Wifi, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { buildBundleItemListSchema, getNetworkPageUrl } from '../utils/structuredData';

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
      question: 'Which mobile network has the best coverage in South Africa?',
      answer: 'Vodacom and MTN are often the strongest for broad national coverage. Your exact experience can still differ by suburb, building, and device.'
    },
    {
      question: 'Which network is cheapest for data in South Africa?',
      answer: 'Telkom, Cell C, and promotional deals on other networks can offer strong value. Prices and deal quality change often, so compare before each recharge.'
    },
    {
      question: 'Is MTN or Vodacom better?',
      answer: 'Neither is universally better for everyone. The right choice depends on where you use your SIM most and which bundles match your monthly usage.'
    },
    {
      question: 'Is Rain a good alternative for mobile data?',
      answer: 'Rain can work well for high-volume users in supported areas, especially for home or fixed-use setups. Coverage fit is the key factor to check first.'
    }
  ];

  const canonicalUrl = 'https://datacost.co.za/network/';
  const pageTitle = 'Compare Mobile Networks in South Africa | Vodacom, MTN, Cell C, Telkom & Rain';
  const metaDescription = "Compare South Africa's mobile networks including Vodacom, MTN, Cell C, Telkom and Rain. See network strengths, data value, coverage, speeds and related guides.";

  const coreNetworks: NetworkName[] = ['Vodacom', 'MTN', 'Cell C', 'Telkom'];
  const secondaryNetworks: NetworkName[] = ['Rain'];

  const operatorCards = [
    {
      name: 'Vodacom',
      href: '/network/vodacom/',
      summary: 'Often chosen for broad coverage and dependable day-to-day performance across many areas.',
      bestFor: 'Choose this if coverage stability is your top priority.'
    },
    {
      name: 'MTN',
      href: '/network/mtn/',
      summary: 'Strong all-round option with competitive prepaid offers and solid performance in many urban areas.',
      bestFor: 'Choose this if you want a balance of speed and value.'
    },
    {
      name: 'Telkom',
      href: '/network/telkom/',
      summary: 'Frequently competitive on prepaid pricing, especially for users watching cost per GB closely.',
      bestFor: 'Choose this if your main goal is better bundle value.'
    },
    {
      name: 'Cell C',
      href: '/network/cell-c/',
      summary: 'Can be a practical budget option when current promos and your coverage needs line up.',
      bestFor: 'Choose this if you are willing to shop current promotions.'
    },
    {
      name: 'Rain',
      href: '/network/rain/',
      summary: 'Worth comparing for high-volume monthly usage where coverage and speeds match your location.',
      bestFor: 'Choose this if you use a lot of data each month.'
    }
  ];

  const featuredBundles = Object.values(networkPages).flatMap((page) =>
    bundles
      .filter((bundle) => bundle.network === page.networkName)
      .sort((a, b) => a.price - b.price)
      .slice(0, 2)
  );

  const articleSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Compare Mobile Networks in South Africa (2026)',
        description: metaDescription,
        image: 'https://datacost.co.za/og-image.jpg',
        author: {
          '@type': 'Organization',
          name: 'DataCost.co.za',
          url: 'https://datacost.co.za'
        },
        publisher: {
          '@type': 'Organization',
          name: 'DataCost.co.za',
          logo: {
            '@type': 'ImageObject',
            url: 'https://datacost.co.za/logo.png'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ]
  };

  const networkHubBundleItemListSchema = buildBundleItemListSchema(
    'Featured Network Bundle Deals in South Africa',
    canonicalUrl,
    featuredBundles,
    (bundle) => getNetworkPageUrl(bundle.network)
  );

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
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="DataCost" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://datacost.co.za/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://datacost.co.za/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(networkHubBundleItemListSchema)}
        </script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="networks" />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <AdUnit type="aboveFold" />

        <div className="mb-16 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a0f399]/20 text-[#1b6d24] text-sm font-bold mb-6">
            <TowerControl className="w-4 h-4" />
            <span>Network Comparison Hub 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9]">
            Compare Mobile <span className="text-[#1b6d24]">Networks</span> South Africa
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            Use this hub to compare operators by <strong>coverage, value, and practical day-to-day use</strong>. Start with the quick summary,
            then open each network page for current bundle context before you buy.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 text-center italic">Compare South African Networks</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:border-[#1b6d24] transition-colors group">
              <Globe className="w-8 h-8 text-[#1b6d24] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Vodacom</div>
              <div className="text-sm font-black text-slate-900 leading-tight">Strong Coverage Option</div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:border-[#1b6d24] transition-colors group">
              <Gauge className="w-8 h-8 text-[#1b6d24] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">MTN</div>
              <div className="text-sm font-black text-slate-900 leading-tight">Strong All-Round Option</div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:border-[#1b6d24] transition-colors group">
              <Zap className="w-8 h-8 text-[#1b6d24] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Telkom</div>
              <div className="text-sm font-black text-slate-900 leading-tight">Strong Value Option</div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:border-[#1b6d24] transition-colors group">
              <ShieldCheck className="w-8 h-8 text-[#1b6d24] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Cell C</div>
              <div className="text-sm font-black text-slate-900 leading-tight">Budget Promo Option</div>
            </div>
            <div className="col-span-2 md:col-span-1 bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:border-[#1b6d24] transition-colors group">
              <Wifi className="w-8 h-8 text-[#1b6d24] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Rain</div>
              <div className="text-sm font-black text-slate-900 leading-tight">High-Usage Data Option</div>
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium mt-6 text-center max-w-3xl mx-auto">
            Prices and promotions can change quickly. Use these labels as a starting point, then confirm current details on each operator page.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-black tracking-tighter mb-8">Network Snapshot by Operator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {operatorCards.map((operator) => (
              <div key={operator.name} className="bg-white border border-slate-100 rounded-[2rem] p-7 shadow-sm">
                <h3 className="text-xl font-black mb-3">{operator.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium mb-3">{operator.summary}</p>
                <p className="text-slate-500 text-sm leading-relaxed font-medium mb-5">{operator.bestFor}</p>
                <Link to={operator.href} className="inline-flex items-center text-[#1b6d24] font-bold text-sm hover:underline">
                  View {operator.name} network page
                </Link>
              </div>
            ))}
          </div>
        </section>

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

        <section className="mb-20 bg-slate-50/50 rounded-[2.5rem] p-8 md:p-10 border border-slate-100">
          <h2 className="text-2xl font-black tracking-tighter mb-4">Supporting Guides for Better Decisions</h2>
          <p className="text-slate-600 font-medium mb-6 max-w-3xl">
            Use these pages with the network summaries above to compare pricing context and practical mobile actions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/guides/cheapest-data-south-africa/" className="bg-white border border-slate-100 rounded-2xl p-4 text-sm font-semibold text-slate-800 hover:border-[#1b6d24] transition-colors">Cheapest Data in South Africa</Link>
            <Link to="/guides/best-data-deals-south-africa/" className="bg-white border border-slate-100 rounded-2xl p-4 text-sm font-semibold text-slate-800 hover:border-[#1b6d24] transition-colors">Best Data Deals in South Africa</Link>
            <Link to="/guides/cheapest-1gb-data-south-africa/" className="bg-white border border-slate-100 rounded-2xl p-4 text-sm font-semibold text-slate-800 hover:border-[#1b6d24] transition-colors">Cheapest 1GB Data in South Africa</Link>
            <Link to="/guides/vodacom-vs-mtn-data-prices/" className="bg-white border border-slate-100 rounded-2xl p-4 text-sm font-semibold text-slate-800 hover:border-[#1b6d24] transition-colors">Vodacom vs MTN Data Prices</Link>
            <Link to="/ussd-codes-south-africa/" className="bg-white border border-slate-100 rounded-2xl p-4 text-sm font-semibold text-slate-800 hover:border-[#1b6d24] transition-colors">USSD Codes South Africa</Link>
          </div>
        </section>

        <div className="mb-24">
          <Scorecard />
        </div>

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
          <h2 className="text-2xl font-black tracking-tighter mb-6">How to Choose the Right Network</h2>
          <div className="text-slate-600 font-medium leading-relaxed space-y-4">
            <p>Start with where you use data most: home, work, commute routes, and family travel locations.</p>
            <p>Then compare two or three operators on bundle value, validity rules, and practical prepaid options.</p>
            <p>Use this order for better decisions: coverage fit first, then price per GB, then bundle type and convenience.</p>
          </div>
        </div>

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
