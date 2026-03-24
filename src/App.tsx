import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Bolt, Search, X } from 'lucide-react';
import { bundles } from './data';
import { DataCalculator } from './components/DataCalculator';
import { USSDCodeFinder } from './components/USSDCodeFinder';
import { USSDPage } from './components/USSDPage';
import { GuidePage } from './components/GuidePage';
import { NetworkPage } from './pages/NetworkPage'; // ✅ ADDED
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
import { AdUnit } from './components/AdUnit';

export default function App() {

  const [selectedNetwork, setSelectedNetwork] = useState<NetworkName | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  // Parse initial route
  const getInitialRoute = (path: string) => {
    if (path.includes('/network/')) {
      const match = path.match(/\/network\/([^/]+)/);
      return { page: 'network' as const, guideSlug: null, networkSlug: match ? match[1] : null };
    }
    if (path.includes('/ussd-codes-south-africa')) {
      return { page: 'ussd' as const, guideSlug: null, networkSlug: null };
    }
    if (path.includes('/guides/')) {
      const match = path.match(/\/guides\/([^/]+)/);
      return { page: 'guide' as const, guideSlug: match ? match[1] : null, networkSlug: null };
    }
    return { page: 'home' as const, guideSlug: null, networkSlug: null };
  };

  const initialRoute = getInitialRoute(window.location.pathname);
  const [currentPage, setCurrentPage] = useState<'home' | 'ussd' | 'guide' | 'network'>(initialRoute.page);
  const [guideSlug, setGuideSlug] = useState<string | null>(initialRoute.guideSlug);
  const [networkSlug, setNetworkSlug] = useState<string | null>(initialRoute.networkSlug);

  // 🔥 GitHub Pages redirect fix
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");

    if (redirect) {
      window.history.replaceState({}, "", redirect);
      const route = getInitialRoute(redirect);
      setCurrentPage(route.page);
      setGuideSlug(route.guideSlug);
      setNetworkSlug(route.networkSlug);
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // ✅ FIXED NAVIGATION
  const navigateTo = (page: 'home' | 'ussd' | 'guide' | 'network', slug?: string) => {
    let path = '/';

    if (page === 'ussd') path = '/ussd-codes-south-africa/';
    if (page === 'guide' && slug) path = `/guides/${slug}/`;
    if (page === 'network' && slug) path = `/network/${slug}/`;

    window.history.pushState({ page, slug }, '', path);

    setCurrentPage(page);

    if (page === 'guide') {
      setGuideSlug(slug || null);
      setNetworkSlug(null);
    } else if (page === 'network') {
      setNetworkSlug(slug || null);
      setGuideSlug(null);
    } else {
      setGuideSlug(null);
      setNetworkSlug(null);
    }

    window.scrollTo(0, 0);
  };

  // Back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const route = getInitialRoute(window.location.pathname);
      setCurrentPage(route.page);
      setGuideSlug(route.guideSlug);
      setNetworkSlug(route.networkSlug);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 🔥 ROUTING OUTPUT

  if (currentPage === 'network') {
    return <NetworkPage networkSlug={networkSlug || ''} onNavigate={navigateTo} />;
  }

  if (currentPage === 'ussd') {
    return (
      <>
        <Helmet>
          <title>USSD Codes South Africa | DataCost</title>
          <meta name="description" content="Check balances and buy data using USSD codes." />
          <link rel="canonical" href="https://datacost.co.za/ussd-codes-south-africa/" />
        </Helmet>
        <USSDPage onBack={() => navigateTo('home')} />
      </>
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
          onNavigateToGuide={(slug) => navigateTo('guide', slug)}
        />
      );
    }
  }

  // 🔥 HOME PAGE

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DataCost",
    "url": "https://datacost.co.za/",
    "description": "Compare mobile data prices in South Africa."
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans">
      <Helmet>
        <title>DataCost.co.za - Compare Data Prices</title>
        <meta name="description" content="Compare mobile data prices in South Africa." />
        <link rel="canonical" href="https://datacost.co.za/" />
        <script type="application/ld+json">
          {JSON.stringify(homeSchema)}
        </script>
      </Helmet>


      <Header onScrollTo={() => {}} activeSection={activeSection} />

      <main className="max-w-7xl mx-auto px-4 py-8">

        <AdUnit type="aboveFold" />

        <Hero onScrollTo={() => {}} />

        {/* 🔥 GUIDES */}
        <section className="mt-12 mb-20">
          <h2 className="text-2xl font-black mb-6">
            🔥 Popular Data Guides South Africa
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {guides.slice(0, 5).map((guide) => (
              <button
                key={guide.slug}
                onClick={() => navigateTo('guide', guide.slug)}
                className="text-left p-5 bg-white border rounded-2xl shadow-sm hover:shadow-md"
              >
                <h3 className="font-bold mb-2">{guide.title}</h3>
                <p className="text-sm text-slate-500">
                  {guide.metaDescription}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* 🔥 NETWORKS FIXED */}
        <NetworkCards
          onViewDeals={(network) =>
            navigateTo('network', network.toLowerCase().replace(' ', ''))
          }
        />

        <AdUnit type="inContent" />

        <DataCalculator />

        <Scorecard />

        <USSDCodeFinder onViewAll={() => navigateTo('ussd')} />

        <Verdict />

      </main>

      <Footer onScrollTo={() => {}} onNavigateTo={navigateTo} />
      <MobileNav onScrollTo={() => {}} activeSection={activeSection} />
      <AdUnit type="stickyMobile" />

      <NetworkModal network={selectedNetwork} onClose={() => setSelectedNetwork(null)} />
    </div>
  );
}
