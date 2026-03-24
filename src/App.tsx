import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { USSDPage } from './pages/USSDPage';
import { GuidePage } from './components/GuidePage';
import { NetworkPage } from './pages/NetworkPage';
import { HomePage } from './pages/HomePage';
import { guides } from './data/guides';
import { NetworkName } from './types';

function AppContent() {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkName | null>(null);
  const [activeSection] = useState('home');
  const navigate = useNavigate();

  const navigateTo = (page: 'home' | 'ussd' | 'guide' | 'network', slug?: string) => {
    let path = '/';
    if (page === 'ussd') path = '/ussd-codes-south-africa/';
    if (page === 'guide' && slug) path = `/guides/${slug}/`;
    if (page === 'network' && slug) path = `/network/${slug}/`;
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            onNavigate={navigateTo}
            activeSection={activeSection}
            selectedNetwork={selectedNetwork}
            setSelectedNetwork={setSelectedNetwork}
          />
        }
      />
      <Route
        path="/ussd-codes-south-africa/"
        element={<USSDPage onBack={() => navigateTo('home')} />}
      />
      <Route
        path="/guides/:slug/"
        element={<GuideRoute onNavigateTo={navigateTo} />}
      />
      <Route
        path="/network/:slug/"
        element={<NetworkRoute onNavigateTo={navigateTo} />}
      />
    </Routes>
  );
}

function GuideRoute({ onNavigateTo }: { onNavigateTo: any }) {
  const { slug } = useParams();
  const guide = guides.find(g => g.slug === slug);
  if (!guide) return <HomePage onNavigate={onNavigateTo} activeSection="home" selectedNetwork={null} setSelectedNetwork={() => {}} />;

  return (
    <GuidePage
      guide={guide}
      allGuides={guides}
      onBack={() => onNavigateTo('home')}
      onNavigateToGuide={(s) => onNavigateTo('guide', s)}
    />
  );
}

function NetworkRoute({ onNavigateTo }: { onNavigateTo: any }) {
  const { slug } = useParams();
  return <NetworkPage networkSlug={slug || ''} onNavigate={onNavigateTo} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
