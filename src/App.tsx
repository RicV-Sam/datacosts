import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { USSDPage } from './pages/USSDPage';
import { GuidePage } from './components/GuidePage';
import { NetworkPage } from './pages/NetworkPage';
import { NetworkHubPage } from './pages/NetworkHubPage';
import { HomePage } from './pages/HomePage';
import { GuidesIndex } from './pages/GuidesIndex';
import { BundleTypePage } from './pages/BundleTypePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AboutPage } from './pages/AboutPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { EditorialPolicyPage } from './pages/EditorialPolicyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { CheapestData } from './pages/CheapestData';
import { Cheapest1GB } from './pages/Cheapest1GB';
import { BestDataDeals } from './pages/BestDataDeals';
import { VodacomVsMTN } from './pages/VodacomVsMTN';
import { WaspSubscriptions } from './pages/WaspSubscriptions';
import { TravelSimsPage } from './pages/TravelSimsPage';
import { guides } from './data/guides';
import { NetworkName, NavigateFunction } from './types';

function AppContent() {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkName | null>(null);
  const [activeSection] = useState('home');
  const navigate = useNavigate();

  const navigateTo: NavigateFunction = (page, slug) => {
    let path = '/';
    if (page === 'ussd') path = '/ussd-codes-south-africa/';
    if (page === 'guide' && slug) path = `/guides/${slug}/`;
    if (page === 'network') {
      path = slug ? `/network/${slug}/` : '/network/';
    }
    if (page === 'guides-index') path = '/guides/';
    if (page === 'travel-sims') path = '/travel-sims-south-africa/';

    if (window.location.pathname === path && path === '/') {
      // already on home, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  const handleScrollTo = (id: string) => {
    if (id === 'ussd') {
      navigateTo('ussd');
      return;
    }
    if (id === 'guides') {
      navigateTo('guides-index');
      return;
    }
    if (id === 'networks') {
      navigateTo('network');
      return;
    }
    if (id === 'home' || id === 'deals' || id === 'calculator' || id === 'scorecard') {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 500);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            onNavigate={navigateTo}
            onScrollTo={handleScrollTo}
            activeSection={activeSection}
            selectedNetwork={selectedNetwork}
            setSelectedNetwork={setSelectedNetwork}
          />
        }
      />
      <Route
        path="/ussd-codes-south-africa/"
        element={<USSDPage onBack={() => navigateTo('home')} onScrollTo={handleScrollTo} onNavigate={navigateTo} />}
      />
      <Route
        path="/guides/"
        element={<GuidesIndex onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/guides/:slug/"
        element={<GuideRoute onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/network/"
        element={<NetworkHubPage onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/network/:slug/"
        element={<NetworkRoute onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/network/:networkSlug/:bundleType/"
        element={<BundleTypeRoute onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/about/"
        element={<AboutPage onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/methodology/"
        element={<MethodologyPage onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/editorial-policy/"
        element={<EditorialPolicyPage onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/privacy-policy/"
        element={<PrivacyPolicyPage onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/terms/"
        element={<TermsPage onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/contact/"
        element={<ContactPage onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/guides/cheapest-data-south-africa/"
        element={<CheapestData onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/guides/cheapest-1gb-data-south-africa/"
        element={<Cheapest1GB onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/guides/best-data-deals-south-africa/"
        element={<BestDataDeals onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/guides/vodacom-vs-mtn-data-prices/"
        element={<VodacomVsMTN onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/guides/stop-wasp-subscriptions-south-africa/"
        element={<WaspSubscriptions onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="/travel-sims-south-africa/"
        element={<TravelSimsPage onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
      <Route
        path="*"
        element={<NotFoundPage onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
    </Routes>
  );
}

function GuideRoute({ onNavigate, onScrollTo }: { onNavigate: NavigateFunction, onScrollTo: (id: string) => void }) {
  const { slug } = useParams();
  const guide = guides.find(g => g.slug === slug);
  if (!guide) return <NotFoundPage onNavigate={onNavigate} onScrollTo={onScrollTo} />;

  return (
    <GuidePage
      guide={guide}
      allGuides={guides}
      onBack={() => onNavigate('home')}
      onNavigateToGuide={(slug) => onNavigate('guide', slug)}
    />
  );
}

function NetworkRoute({ onNavigate, onScrollTo }: { onNavigate: NavigateFunction, onScrollTo: (id: string) => void }) {
  const { slug } = useParams();
  return <NetworkPage networkSlug={slug || ''} onNavigate={onNavigate} onScrollTo={onScrollTo} />;
}

function BundleTypeRoute({ onNavigate, onScrollTo }: { onNavigate: NavigateFunction, onScrollTo: (id: string) => void }) {
  return <BundleTypePage onNavigate={onNavigate} onScrollTo={onScrollTo} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
