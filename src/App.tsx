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
import { AdUnit } from './components/AdUnit';

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
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

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
      metaDescription?.setAttribute(
        'content',
        'Complete repository of South African USSD codes for MTN, Vodacom, Telkom, Cell C and Rain.'
      );
      canonical?.setAttribute('href', 'https://datacost.co.za/ussd-codes-south-africa/');
    } else if (currentPage === 'guide' && guideSlug) {
      const guide = guides.find(g => g.slug === guideSlug);
      if (guide) {
        document.title = `${guide.title} | DataCost`;
        metaDescription?.setAttribute('content', guide.metaDescription);
        canonical?.setAttribute('href', `https://datacost.co.za/guides/${guide.slug}/`);
      }
    } else {
      document.title = "DataCost.co.za - South Africa Network Comparison";
      metaDescription?.setAttribute(
        'content',
        "Compare South Africa's mobile data networks across Vodacom, MTN, Telkom and Cell C."
      );
      canonical?.setAttribute('href', 'https://datacost.co.za/');
    }
  }, [currentPage, guideSlug]);

  const scrollTo = (id: string) => {
    if (currentPage !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
      }, 100);
    } else {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
        return;
      }
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const filteredBundles = bundles.filter(bundle =>
    bundle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bundle.network.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bundle.volume.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "ItemList",
    "name": "Best Data Bundles South Africa",
    "itemListElement": bundles.map((bundle, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": bundle.name
    }))
  };

  // ROUTING OUTPUT

  if (currentPage === 'ussd') {
    return <USSDPage onBack={() => navigateTo('home')} />;
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

  // HOME PAGE

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <Header onScrollTo={scrollTo} activeSection={activeSection} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AdUnit type="aboveFold" />
        <Hero onScrollTo={scrollTo} />

        <NetworkCards onViewDeals={(network) => console.log(network)} />
        <AdUnit type="inContent" />

        <DataCalculator />

        <Scorecard />

        <USSDCodeFinder onViewAll={() => navigateTo('ussd')} />

        <Verdict />
      </main>

      <Footer onScrollTo={scrollTo} onNavigateTo={navigateTo} />
      <MobileNav onScrollTo={scrollTo} activeSection={activeSection} />
      <AdUnit type="stickyMobile" />

      <NetworkModal network={selectedNetwork} onClose={() => setSelectedNetwork(null)} />
    </div>
  );
}