import { useState, useEffect } from 'react';
import { Bolt, Search, X } from 'lucide-react';
import { bundles } from './data';
import { DataCalculator } from './components/DataCalculator';
import { USSDCodeFinder } from './components/USSDCodeFinder';
import { USSDPage } from './components/USSDPage';
import { GuidePage } from './components/GuidePage';
import { guides } from './data/guides';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { NetworkCards } from './components/NetworkCards';
import { Scorecard } from './components/Scorecard';
import { Verdict } from './components/Verdict';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { NetworkModal } from './components/NetworkModal';
import { NetworkName } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkName | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [currentPage, setCurrentPage] = useState<'home' | 'ussd' | 'guide'>(() => {
    if (window.location.pathname.includes('/ussd-codes-south-africa')) return 'ussd';
    if (window.location.pathname.includes('/guides/')) return 'guide';
    return 'home';
  });
  const [guideSlug, setGuideSlug] = useState<string | null>(() => {
    const match = window.location.pathname.match(/\/guides\/([^/]+)\//);
    return match ? match[1] : null;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  // Navigation handler
  const navigateTo = (page: 'home' | 'ussd' | 'guide', slug?: string) => {
    let path = '/';
    if (page === 'ussd') path = '/ussd-codes-south-africa/';
    if (page === 'guide' && slug) path = `/guides/${slug}/`;

    window.history.pushState({ page, slug }, '', path);
    setCurrentPage(page);
    if (slug) setGuideSlug(slug);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
        if (event.state.slug) setGuideSlug(event.state.slug);
      } else {
        if (window.location.pathname.includes('/ussd-codes-south-africa')) {
          setCurrentPage('ussd');
        } else if (window.location.pathname.includes('/guides/')) {
          const match = window.location.pathname.match(/\/guides\/([^/]+)\//);
          setCurrentPage('guide');
          setGuideSlug(match ? match[1] : null);
        } else {
          setCurrentPage('home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');

    if (currentPage === 'ussd') {
      document.title = "USSD Codes South Africa - Official Network Short Codes | DataCost";
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Complete repository of South African USSD codes for MTN, Vodacom, Telkom, Cell C and Rain. Check balance, buy data, and manage your account.');
      }
      if (canonical) {
        canonical.setAttribute('href', 'https://datacost.co.za/ussd-codes-south-africa/');
      }
    } else if (currentPage === 'guide' && guideSlug) {
      const guide = guides.find(g => g.slug === guideSlug);
      if (guide) {
        document.title = `${guide.title} | DataCost`;
        if (metaDescription) {
          metaDescription.setAttribute('content', guide.metaDescription);
        }
        if (canonical) {
          canonical.setAttribute('href', `https://datacost.co.za/guides/${guide.slug}/`);
        }
      }
    } else {
      document.title = "DataCost.co.za - South Africa Network Comparison";
      if (metaDescription) {
        metaDescription.setAttribute('content', "Compare South Africa's mobile data networks. Independent analysis of Vodacom, MTN, Telkom, and Cell C for coverage, speed, and cost.");
      }
      if (canonical) {
        canonical.setAttribute('href', 'https://datacost.co.za/');
      }
    }
  }, [currentPage, guideSlug]);

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    if (currentPage !== 'home') {
      navigateTo('home');
      // Wait for re-render
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(id);
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
      }
    }
  };

  const filteredBundles = bundles.filter(bundle =>
    bundle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bundle.network.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bundle.volume.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // JSON-LD Schema for Data Bundles & FAQ
  const jsonLd = {
    "@context": "https://schema.org/",
    "@graph": [
      {
        "@type": "ItemList",
        "name": "Best Data Bundles South Africa",
        "description": "Comparison of the best mobile data bundles in South Africa across Vodacom, MTN, Telkom, Cell C and Rain.",
        "itemListElement": [...bundles]
          .sort((a, b) => (a.costPerGb || 0) - (b.costPerGb || 0))
          .map((bundle, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Service",
              "name": bundle.name,
              "provider": {
                "@type": "Organization",
                "name": bundle.network
              },
              "areaServed": "South Africa",
              "offers": {
                "@type": "Offer",
                "price": bundle.price.toFixed(2),
                "priceCurrency": "ZAR",
                "availability": "https://schema.org/InStock",
                "url": "https://datacost.co.za/"
              }
            }
          }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Which network has the cheapest data in South Africa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Telkom and MTN typically offer the lowest cost per GB depending on bundle size and promotions, with prices often dropping below R10/GB."
            }
          },
          {
            "@type": "Question",
            "name": "How do I check my data balance on Vodacom?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dial *135# and follow the prompts, or use the MyVodacom app."
            }
          },
          {
            "@type": "Question",
            "name": "How do I check my MTN balance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dial *136# on your phone to see your remaining airtime and data bundles."
            }
          },
          {
            "@type": "Question",
            "name": "Is Rain data unlimited?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Rain offers unlimited 4G and 5G data plans for a fixed monthly fee, primarily in urban metro areas."
            }
          },
          {
            "@type": "Question",
            "name": "What is the cheapest 1GB data bundle?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Telkom's prepaid 20GB bundle often works out to the lowest cost per GB, while MTN's 'Boosta' deals are highly competitive."
            }
          }
        ]
      },
      {
        "@type": "Organization",
        "name": "DataCost.co.za",
        "url": "https://datacost.co.za/"
      },
      {
        "@type": "WebSite",
        "name": "DataCost.co.za",
        "url": "https://datacost.co.za/"
      }
    ]
  };

  if (currentPage === 'ussd') {
    return (
      <USSDPage onBack={() => navigateTo('home')} />
    );
  }

  if (currentPage === 'guide' && guideSlug) {
    const guide = guides.find(g => g.slug === guideSlug);
    if (guide) {
      return (
        <GuidePage
          guide={guide}
          allGuides={guides}
          onBack={() => navigateTo('home')}
          onNavigateToGuide={(slug) => {
            if (slug === 'ussd') {
              navigateTo('ussd');
            } else {
              navigateTo('guide', slug);
            }
          }}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans selection:bg-[#a0f399]/30 relative overflow-hidden">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      <Header onScrollTo={scrollTo} activeSection={activeSection} />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16 mb-20 md:mb-0">
        <Hero onScrollTo={scrollTo} />

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-2">
          <h2 className="text-3xl font-black tracking-tighter">Cheapest 1GB & Large Data Prices</h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prices last updated: {today}</span>
        </div>

        {/* Search Bar */}
        <div className="mb-12 relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for networks, bundles or prices..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchActive(e.target.value.length > 0);
              }}
              className="w-full pl-16 pr-14 py-5 bg-white border border-slate-100 rounded-3xl text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-[#a0f399]/20 transition-all font-medium"
            />
            {isSearchActive && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchActive(false);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            )}
          </div>

          <AnimatePresence>
            {isSearchActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-[60] max-h-[400px] overflow-y-auto"
              >
                {filteredBundles.length > 0 ? (
                  <div className="p-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 px-4 mb-2">Search Results</h3>
                    {filteredBundles.map(bundle => (
                      <button
                        key={bundle.id}
                        onClick={() => {
                          setSelectedNetwork(bundle.network);
                          setIsSearchActive(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group text-left"
                      >
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">{bundle.name}</div>
                          <div className="text-xs text-slate-500">{bundle.network} • {bundle.volume} • {bundle.validity}</div>
                        </div>
                        <div className="text-lg font-black text-[#031636]">R{bundle.price}</div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <p className="text-slate-400 font-medium">No bundles found for "{searchQuery}"</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <NetworkCards onViewDeals={(network) => setSelectedNetwork(network)} />

        {/* AI Summary Block (TL;DR) - Moved below network comparison */}
        <section className="mb-16 bg-white/70 backdrop-blur-xl border-l-4 border-[#1b6d24] p-6 rounded-r-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <Bolt className="w-5 h-5 text-[#1b6d24]" />
            <h2 className="text-sm font-black uppercase tracking-widest text-[#1b6d24]">AI Summary (TL;DR)</h2>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            March 2026 Update: <span className="font-bold">MTN</span> currently leads on value with "Boosta" bundles (R5.98/GB). 
            <span className="font-bold">Vodacom</span> remains the "Speed King" but charges a premium. 
            <span className="font-bold">Telkom</span> is the budget champion for urban users. 
            <span className="font-bold">Rain</span> is the go-to for unlimited data in 5G-enabled areas.
          </p>
        </section>

        <section className="mb-16">
          <DataCalculator />
        </section>

        <Scorecard />

        <h2 className="text-3xl font-black tracking-tighter mb-8" id="ussd">How to Check Balance & Buy Data (USSD Codes)</h2>
        <section className="mb-16">
          <USSDCodeFinder onViewAll={() => navigateTo('ussd')} />
        </section>

        <Verdict />

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

      </main>

      <Footer onScrollTo={scrollTo} onNavigateTo={navigateTo} />
      <MobileNav onScrollTo={scrollTo} activeSection={activeSection} />

      {/* Sticky Bottom Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-100 z-50 md:hidden">
        <button
          onClick={() => scrollTo('calculator')}
          className="w-full py-4 bg-[#031636] text-white rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-transform"
        >
          Find Cheapest Deal
        </button>
      </div>

      <NetworkModal network={selectedNetwork} onClose={() => setSelectedNetwork(null)} />
    </div>
  );
}
