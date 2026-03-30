import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { guides } from './data/guides';
import { NetworkName, NavigateFunction } from './types';

const HomePage = lazy(() => import('./pages/HomePage').then((mod) => ({ default: mod.HomePage })));
const USSDPage = lazy(() => import('./pages/USSDPage').then((mod) => ({ default: mod.USSDPage })));
const SaveUssdCodes = lazy(() => import('./pages/SaveUssdCodes').then((mod) => ({ default: mod.SaveUssdCodes })));
const AlertsPage = lazy(() => import('./pages/AlertsPage').then((mod) => ({ default: mod.AlertsPage })));
const GuidePage = lazy(() => import('./components/GuidePage').then((mod) => ({ default: mod.GuidePage })));
const NetworkPage = lazy(() => import('./pages/NetworkPage').then((mod) => ({ default: mod.NetworkPage })));
const NetworkHubPage = lazy(() => import('./pages/NetworkHubPage').then((mod) => ({ default: mod.NetworkHubPage })));
const GuidesIndex = lazy(() => import('./pages/GuidesIndex').then((mod) => ({ default: mod.GuidesIndex })));
const BundleTypePage = lazy(() => import('./pages/BundleTypePage').then((mod) => ({ default: mod.BundleTypePage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((mod) => ({ default: mod.NotFoundPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((mod) => ({ default: mod.AboutPage })));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage').then((mod) => ({ default: mod.MethodologyPage })));
const EditorialPolicyPage = lazy(() => import('./pages/EditorialPolicyPage').then((mod) => ({ default: mod.EditorialPolicyPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then((mod) => ({ default: mod.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((mod) => ({ default: mod.TermsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((mod) => ({ default: mod.ContactPage })));
const CheapestData = lazy(() => import('./pages/CheapestData').then((mod) => ({ default: mod.CheapestData })));
const BestDataDeals = lazy(() => import('./pages/BestDataDeals').then((mod) => ({ default: mod.BestDataDeals })));
const CheapestUnlimitedData = lazy(() => import('./pages/CheapestUnlimitedData').then((mod) => ({ default: mod.CheapestUnlimitedData })));
const BestSimOnlyDeals = lazy(() => import('./pages/BestSimOnlyDeals').then((mod) => ({ default: mod.BestSimOnlyDeals })));
const VodacomVsMTN = lazy(() => import('./pages/VodacomVsMTN').then((mod) => ({ default: mod.VodacomVsMTN })));
const WaspSubscriptions = lazy(() => import('./pages/WaspSubscriptions').then((mod) => ({ default: mod.WaspSubscriptions })));
const TravelSimsPage = lazy(() => import('./pages/TravelSimsPage').then((mod) => ({ default: mod.TravelSimsPage })));
const ComparisonGuidePage = lazy(() => import('./pages/ComparisonGuidePage').then((mod) => ({ default: mod.ComparisonGuidePage })));

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
    <Suspense fallback={<div className="min-h-screen bg-mesh" aria-hidden="true" />}>
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
          path="/save-ussd-codes/"
          element={<SaveUssdCodes onBack={() => navigateTo('home')} onScrollTo={handleScrollTo} onNavigate={navigateTo} />}
        />
        <Route
          path="/alerts/"
          element={<AlertsPage onScrollTo={handleScrollTo} onNavigate={navigateTo} />}
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
          element={<ComparisonGuidePage guideSlug="cheapest-1gb-data-south-africa" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/best-data-deals-south-africa/"
          element={<BestDataDeals onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/best-prepaid-data-deals-south-africa/"
          element={<ComparisonGuidePage guideSlug="best-prepaid-data-deals-south-africa" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/cheapest-monthly-data-south-africa/"
          element={<Navigate to="/guides/best-monthly-data-deals-south-africa/" replace />}
        />
        <Route
          path="/guides/best-monthly-data-deals-south-africa/"
          element={<ComparisonGuidePage guideSlug="best-monthly-data-deals-south-africa" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/cheapest-10gb-data-south-africa/"
          element={<ComparisonGuidePage guideSlug="cheapest-10gb-data-south-africa" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/cheapest-unlimited-data-south-africa/"
          element={<CheapestUnlimitedData onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/best-sim-only-deals-south-africa/"
          element={<BestSimOnlyDeals onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/cheapest-whatsapp-bundles-south-africa/"
          element={<ComparisonGuidePage guideSlug="cheapest-whatsapp-bundles-south-africa" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/cheap-night-data-south-africa/"
          element={<ComparisonGuidePage guideSlug="cheap-night-data-south-africa" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
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
    </Suspense>
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
