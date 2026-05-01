import { Fragment, Suspense, lazy, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { guides } from './data/guides';
import { REDIRECT_ALIASES } from './config/redirectAliases';
import { NetworkName, NavigateFunction } from './types';

const HomePage = lazy(() => import('./pages/HomePage').then((mod) => ({ default: mod.HomePage })));
const USSDPage = lazy(() => import('./pages/USSDPage').then((mod) => ({ default: mod.USSDPage })));
const NetworkUSSDPage = lazy(() => import('./pages/NetworkUSSDPage').then((mod) => ({ default: mod.NetworkUSSDPage })));
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
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage').then((mod) => ({ default: mod.CookiePolicyPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((mod) => ({ default: mod.ContactPage })));
const CheapestData = lazy(() => import('./pages/CheapestData').then((mod) => ({ default: mod.CheapestData })));
const BestDataDeals = lazy(() => import('./pages/BestDataDeals').then((mod) => ({ default: mod.BestDataDeals })));
const CheapestUnlimitedData = lazy(() => import('./pages/CheapestUnlimitedData').then((mod) => ({ default: mod.CheapestUnlimitedData })));
const BestSimOnlyDeals = lazy(() => import('./pages/BestSimOnlyDeals').then((mod) => ({ default: mod.BestSimOnlyDeals })));
const VodacomVsMTN = lazy(() => import('./pages/VodacomVsMTN').then((mod) => ({ default: mod.VodacomVsMTN })));
const WaspSubscriptions = lazy(() => import('./pages/WaspSubscriptions').then((mod) => ({ default: mod.WaspSubscriptions })));
const TravelSimsPage = lazy(() => import('./pages/TravelSimsPage').then((mod) => ({ default: mod.TravelSimsPage })));
const ComparisonGuidePage = lazy(() => import('./pages/ComparisonGuidePage').then((mod) => ({ default: mod.ComparisonGuidePage })));
const FixProblemPage = lazy(() => import('./pages/FixProblemPage').then((mod) => ({ default: mod.FixProblemPage })));
const DataProblemSeoPage = lazy(() => import('./pages/DataProblemSeoPage').then((mod) => ({ default: mod.DataProblemSeoPage })));
const WhyAirtimeDisappearingPage = lazy(() => import('./pages/WhyAirtimeDisappearingPage').then((mod) => ({ default: mod.WhyAirtimeDisappearingPage })));
const ProblemSolvingGuidePage = lazy(() => import('./pages/ProblemSolvingGuidePage').then((mod) => ({ default: mod.ProblemSolvingGuidePage })));
const AirtimeDataProblemsHubPage = lazy(() => import('./pages/AirtimeDataProblemsHubPage').then((mod) => ({ default: mod.AirtimeDataProblemsHubPage })));
const RedirectPage = lazy(() => import('./pages/RedirectPage').then((mod) => ({ default: mod.RedirectPage })));
const SitemapPage = lazy(() => import('./pages/SitemapPage').then((mod) => ({ default: mod.SitemapPage })));

function AppContent() {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkName | null>(null);
  const [activeSection] = useState('home');
  const navigate = useNavigate();

  const navigateTo: NavigateFunction = (page, slug) => {
    let path = '/';
    if (page === 'ussd') path = '/ussd-codes-south-africa/';
    if (page === 'alerts') path = '/alerts/';
    if (page === 'guide' && slug) path = `/guides/${slug}/`;
    if (page === 'network') {
      path = slug ? `/network/${slug}/` : '/network/';
    }
    if (page === 'guides-index') path = '/guides/';
    if (page === 'travel-sims') path = '/travel-sims-south-africa/';
    if (page === 'fix-problem') path = '/fix-mobile-problems/';

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
    if (id === 'alerts') {
      navigateTo('alerts');
      return;
    }
    if (id === 'guides') {
      navigateTo('guides-index');
      return;
    }
    if (id === 'fix-problem') {
      navigateTo('fix-problem');
      return;
    }
    if (id === 'networks') {
      navigateTo('network');
      return;
    }
    if (id === 'compare-data') {
      id = 'deals';
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
        <Route path="/ussd-codes" element={<Navigate to="/ussd-codes-south-africa/" replace />} />
        <Route path="/ussd-codes-south-africa" element={<Navigate to="/ussd-codes-south-africa/" replace />} />
        <Route
          path="/mtn-ussd-codes/"
          element={<NetworkUSSDPage networkSlug="mtn" onBack={() => navigateTo('ussd')} onScrollTo={handleScrollTo} onNavigate={navigateTo} />}
        />
        <Route
          path="/vodacom-ussd-codes/"
          element={<NetworkUSSDPage networkSlug="vodacom" onBack={() => navigateTo('ussd')} onScrollTo={handleScrollTo} onNavigate={navigateTo} />}
        />
        <Route
          path="/telkom-ussd-codes/"
          element={<NetworkUSSDPage networkSlug="telkom" onBack={() => navigateTo('ussd')} onScrollTo={handleScrollTo} onNavigate={navigateTo} />}
        />
        <Route
          path="/cell-c-ussd-codes/"
          element={<NetworkUSSDPage networkSlug="cell-c" onBack={() => navigateTo('ussd')} onScrollTo={handleScrollTo} onNavigate={navigateTo} />}
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
          path="/sitemap/"
          element={<SitemapPage onScrollTo={handleScrollTo} onNavigate={navigateTo} />}
        />
        <Route path="/sitemap" element={<Navigate to="/sitemap/" replace />} />
        <Route
          path="/guides/"
          element={<GuidesIndex onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/why-is-my-airtime-disappearing-south-africa/"
          element={<WhyAirtimeDisappearingPage onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/why-is-my-data-disappearing-south-africa/"
          element={<ProblemSolvingGuidePage guideKey="why-is-my-data-disappearing-south-africa" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/how-to-stop-airtime-being-used-automatically/"
          element={<ProblemSolvingGuidePage guideKey="how-to-stop-airtime-being-used-automatically" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/how-to-cancel-subscriptions-mtn-vodacom-telkom/"
          element={<ProblemSolvingGuidePage guideKey="how-to-cancel-subscriptions-mtn-vodacom-telkom" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/how-to-check-subscriptions-on-mtn/"
          element={<ProblemSolvingGuidePage guideKey="how-to-check-subscriptions-on-mtn" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/how-to-check-subscriptions-on-vodacom/"
          element={<ProblemSolvingGuidePage guideKey="how-to-check-subscriptions-on-vodacom" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/how-to-stop-wasp-services-south-africa/"
          element={<ProblemSolvingGuidePage guideKey="how-to-stop-wasp-services-south-africa" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/why-is-my-data-finishing-so-fast/"
          element={<ProblemSolvingGuidePage guideKey="why-is-my-data-finishing-so-fast" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/how-to-protect-airtime-from-being-used/"
          element={<ProblemSolvingGuidePage guideKey="how-to-protect-airtime-from-being-used" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/airtime-data-problems-south-africa/"
          element={<AirtimeDataProblemsHubPage onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
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
          path="/cookie-policy/"
          element={<CookiePolicyPage onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
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
          path="/guides/cheapest-2gb-data-south-africa/"
          element={<ComparisonGuidePage guideSlug="cheapest-2gb-data-south-africa" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/cheapest-5gb-data-south-africa/"
          element={<ComparisonGuidePage guideSlug="cheapest-5gb-data-south-africa" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/cheapest-15gb-data-south-africa/"
          element={<ComparisonGuidePage guideSlug="cheapest-15gb-data-south-africa" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/cheapest-20gb-data-south-africa/"
          element={<ComparisonGuidePage guideSlug="cheapest-20gb-data-south-africa" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/guides/cheapest-50gb-data-south-africa/"
          element={<ComparisonGuidePage guideSlug="cheapest-50gb-data-south-africa" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
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
          path="/fix-mobile-problems/"
          element={<FixProblemPage onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/why-is-my-data-disappearing-vodacom/"
          element={<DataProblemSeoPage routePath="/data-problems/why-is-my-data-disappearing-vodacom/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-stop-wasp-charges-vodacom/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-stop-wasp-charges-vodacom/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-check-data-balance-vodacom-ussd/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-check-data-balance-vodacom-ussd/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/why-does-my-data-run-out-so-fast-mtn/"
          element={<DataProblemSeoPage routePath="/data-problems/why-does-my-data-run-out-so-fast-mtn/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/why-does-my-data-run-out-so-fast-cell-c/"
          element={<DataProblemSeoPage routePath="/data-problems/why-does-my-data-run-out-so-fast-cell-c/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/why-does-my-data-run-out-so-fast-telkom/"
          element={<DataProblemSeoPage routePath="/data-problems/why-does-my-data-run-out-so-fast-telkom/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-stop-data-disappearing-vodacom/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-stop-data-disappearing-vodacom/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-stop-data-disappearing-mtn/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-stop-data-disappearing-mtn/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-stop-data-disappearing-cell-c/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-stop-data-disappearing-cell-c/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-stop-data-disappearing-telkom/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-stop-data-disappearing-telkom/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/why-is-my-airtime-disappearing-vodacom-prepaid/"
          element={<DataProblemSeoPage routePath="/data-problems/why-is-my-airtime-disappearing-vodacom-prepaid/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/why-is-my-airtime-disappearing-mtn-prepaid/"
          element={<DataProblemSeoPage routePath="/data-problems/why-is-my-airtime-disappearing-mtn-prepaid/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-stop-airtime-disappearing-vodacom/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-stop-airtime-disappearing-vodacom/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-stop-airtime-disappearing-cell-c/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-stop-airtime-disappearing-cell-c/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-stop-airtime-disappearing-telkom/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-stop-airtime-disappearing-telkom/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/why-is-my-data-disappearing-overnight-android/"
          element={<DataProblemSeoPage routePath="/data-problems/why-is-my-data-disappearing-overnight-android/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-stop-wasp-charges-cell-c/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-stop-wasp-charges-cell-c/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-stop-wasp-charges-mtn/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-stop-wasp-charges-mtn/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-stop-wasp-charges-telkom/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-stop-wasp-charges-telkom/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-check-wasp-subscriptions-vodacom/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-check-wasp-subscriptions-vodacom/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-check-wasp-subscriptions-mtn/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-check-wasp-subscriptions-mtn/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-stop-background-data-usage-android/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-stop-background-data-usage-android/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route
          path="/data-problems/how-to-stop-apps-using-data-in-background-samsung/"
          element={<DataProblemSeoPage routePath="/data-problems/how-to-stop-apps-using-data-in-background-samsung/" onNavigate={navigateTo} onScrollTo={handleScrollTo} />}
        />
        <Route path="/data-problems/why-is-my-data-disappearing-vodacom" element={<Navigate to="/data-problems/why-is-my-data-disappearing-vodacom/" replace />} />
        <Route path="/data-problems/how-to-stop-wasp-charges-vodacom" element={<Navigate to="/data-problems/how-to-stop-wasp-charges-vodacom/" replace />} />
        <Route path="/data-problems/how-to-check-data-balance-vodacom-ussd" element={<Navigate to="/data-problems/how-to-check-data-balance-vodacom-ussd/" replace />} />
        <Route path="/data-problems/why-does-my-data-run-out-so-fast-mtn" element={<Navigate to="/data-problems/why-does-my-data-run-out-so-fast-mtn/" replace />} />
        <Route path="/data-problems/why-does-my-data-run-out-so-fast-cell-c" element={<Navigate to="/data-problems/why-does-my-data-run-out-so-fast-cell-c/" replace />} />
        <Route path="/data-problems/why-does-my-data-run-out-so-fast-telkom" element={<Navigate to="/data-problems/why-does-my-data-run-out-so-fast-telkom/" replace />} />
        <Route path="/data-problems/how-to-stop-data-disappearing-vodacom" element={<Navigate to="/data-problems/how-to-stop-data-disappearing-vodacom/" replace />} />
        <Route path="/data-problems/how-to-stop-data-disappearing-mtn" element={<Navigate to="/data-problems/how-to-stop-data-disappearing-mtn/" replace />} />
        <Route path="/data-problems/how-to-stop-data-disappearing-cell-c" element={<Navigate to="/data-problems/how-to-stop-data-disappearing-cell-c/" replace />} />
        <Route path="/data-problems/how-to-stop-data-disappearing-telkom" element={<Navigate to="/data-problems/how-to-stop-data-disappearing-telkom/" replace />} />
        <Route path="/data-problems/why-is-my-airtime-disappearing-vodacom-prepaid" element={<Navigate to="/data-problems/why-is-my-airtime-disappearing-vodacom-prepaid/" replace />} />
        <Route path="/data-problems/why-is-my-airtime-disappearing-mtn-prepaid" element={<Navigate to="/data-problems/why-is-my-airtime-disappearing-mtn-prepaid/" replace />} />
        <Route path="/data-problems/how-to-stop-airtime-disappearing-vodacom" element={<Navigate to="/data-problems/how-to-stop-airtime-disappearing-vodacom/" replace />} />
        <Route path="/data-problems/how-to-stop-airtime-disappearing-cell-c" element={<Navigate to="/data-problems/how-to-stop-airtime-disappearing-cell-c/" replace />} />
        <Route path="/data-problems/how-to-stop-airtime-disappearing-telkom" element={<Navigate to="/data-problems/how-to-stop-airtime-disappearing-telkom/" replace />} />
        <Route path="/data-problems/why-is-my-data-disappearing-overnight-android" element={<Navigate to="/data-problems/why-is-my-data-disappearing-overnight-android/" replace />} />
        <Route path="/data-problems/how-to-stop-wasp-charges-cell-c" element={<Navigate to="/data-problems/how-to-stop-wasp-charges-cell-c/" replace />} />
        <Route path="/data-problems/how-to-stop-wasp-charges-mtn" element={<Navigate to="/data-problems/how-to-stop-wasp-charges-mtn/" replace />} />
        <Route path="/data-problems/how-to-stop-wasp-charges-telkom" element={<Navigate to="/data-problems/how-to-stop-wasp-charges-telkom/" replace />} />
        <Route path="/data-problems/how-to-check-wasp-subscriptions-vodacom" element={<Navigate to="/data-problems/how-to-check-wasp-subscriptions-vodacom/" replace />} />
        <Route path="/data-problems/how-to-check-wasp-subscriptions-mtn" element={<Navigate to="/data-problems/how-to-check-wasp-subscriptions-mtn/" replace />} />
        <Route path="/data-problems/how-to-stop-background-data-usage-android" element={<Navigate to="/data-problems/how-to-stop-background-data-usage-android/" replace />} />
        <Route path="/data-problems/how-to-stop-apps-using-data-in-background-samsung" element={<Navigate to="/data-problems/how-to-stop-apps-using-data-in-background-samsung/" replace />} />
        <Route path="/fix-a-problem/" element={<Navigate to="/fix-mobile-problems/" replace />} />
        {REDIRECT_ALIASES.map((alias) => (
          <Fragment key={alias.from}>
            <Route path={alias.from} element={<RedirectPage />} />
          </Fragment>
        ))}
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
