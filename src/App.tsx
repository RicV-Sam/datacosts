import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { USSDPage } from './pages/USSDPage';
import { GuidePage } from './components/GuidePage';
import { NetworkPage } from './pages/NetworkPage';
import { HomePage } from './pages/HomePage';
import { GuidesIndex } from './pages/GuidesIndex';
import { guides } from './data/guides';
import { NetworkName } from './types';

export type NavigateFunction = (page: 'home' | 'ussd' | 'guide' | 'network' | 'guides-index', slug?: string) => void;

function AppContent() {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkName | null>(null);
  const [activeSection] = useState('home');
  const navigate = useNavigate();

  const navigateTo: NavigateFunction = (page, slug) => {
    let path = '/';
    if (page === 'ussd') path = '/ussd-codes-south-africa/';
    if (page === 'guide' && slug) path = `/guides/${slug}/`;
    if (page === 'network' && slug) path = `/network/${slug}/`;
    if (page === 'guides-index') path = '/guides/';

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
        path="/network/:slug/"
        element={<NetworkRoute onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
      />
    </Routes>
  );
}

function GuideRoute({ onNavigate, onScrollTo }: { onNavigate: NavigateFunction, onScrollTo: (id: string) => void }) {
  const { slug } = useParams();
  const guide = guides.find(g => g.slug === slug);
  if (!guide) return <HomePage onNavigate={onNavigate} onScrollTo={onScrollTo} activeSection="home" selectedNetwork={null} setSelectedNetwork={() => {}} />;

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

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
