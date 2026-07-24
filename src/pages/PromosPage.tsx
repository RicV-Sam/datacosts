import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Bell, Search, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';
import { promoWatchTypes, verifiedPromos } from '../data/promos';
import { NavigateFunction } from '../types';
import { isNoindexRoute } from '../config/routeCatalog';
import { formatIsoForDisplay, getRouteModifiedIso } from '../seo/contentDates';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';

interface PromosPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const routePath = '/promos/';

function buildCollectionSchema(canonicalUrl: string, dateModifiedIso: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Latest Airtime, Data and Fibre Promos in South Africa',
    description: 'A DataCost page for checked South African airtime, data, bank-app and fibre promos.',
    url: canonicalUrl,
    dateModified: dateModifiedIso,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    }
  };
}

function buildItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Verified DataCost promos',
    itemListElement: verifiedPromos.map((promo, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: promo.title,
      description: promo.summary
    }))
  };
}

export const PromosPage: React.FC<PromosPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Latest Airtime, Data and Fibre Promos in South Africa';
  const metaDescription = 'Check DataCost promo listings for South African airtime, data, bank-app and fibre promos once official source details are available.';
  const canonicalUrl = toCanonicalUrl(routePath);
  const shouldNoindex = isNoindexRoute(routePath);
  const dateModifiedIso = getRouteModifiedIso(routePath);
  const lastReviewed = formatIsoForDisplay(dateModifiedIso);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Promos', href: routePath }
  ];

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        {shouldNoindex && <meta name="robots" content="noindex,follow" />}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(buildCollectionSchema(canonicalUrl, dateModifiedIso))}</script>
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbItems))}</script>
        <script type="application/ld+json">{JSON.stringify(buildItemListSchema())}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="promos" />

      <main className="mx-auto max-w-4xl px-4 py-10 md:py-12">
        <Breadcrumbs items={breadcrumbItems} />
        <header className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#a0f399]/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]">
            <Bell className="h-3.5 w-3.5" />
            Official-source checks first
          </div>
          <h1 className="mb-5 text-4xl font-black leading-[0.95] tracking-tighter md:text-6xl">{pageTitle}</h1>
          <p className="text-lg font-medium leading-relaxed text-slate-600">
            This page is for South African airtime, data, bank-app and fibre promos once DataCost can check the official source, dates and terms.
          </p>
        </header>

        <section className="mb-10 rounded-[2rem] border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm">
          <Search className="mx-auto mb-4 h-10 w-10 text-slate-300" />
          <h2 className="mb-3 text-2xl font-black tracking-tight">No verified promos listed yet.</h2>
          <p className="text-sm font-bold leading-relaxed text-slate-600">
            No verified promos listed yet. We only list promos once we can check the source.
          </p>
        </section>

        <section className="mb-10 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-5 inline-flex items-center gap-2 text-2xl font-black tracking-tight">
            <ShieldCheck className="h-5 w-5 text-[#1b6d24]" />
            What DataCost may verify later
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {promoWatchTypes.map((type) => (
              <div key={type} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700">{type}</div>
            ))}
          </div>
          <p className="mt-5 text-sm font-medium leading-relaxed text-slate-600">
            Last reviewed: {lastReviewed}. Promo pages stay conservative until the official source, terms, dates and expiry rules are clear.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-4 text-2xl font-black tracking-tight">Useful alternatives while promos are empty</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link to="/guides/best-data-deals-south-africa/" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-900 hover:bg-[#a0f399]/10">Best data deals guide</Link>
            <Link to="/buy-data-airtime-south-africa/" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-900 hover:bg-[#a0f399]/10">How to buy data and airtime</Link>
            <Link to="/guides/buy-data-with-bank-apps-south-africa/" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-900 hover:bg-[#a0f399]/10">Buy data with bank apps</Link>
            <Link to="/fibre/" className="rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-900 hover:bg-[#a0f399]/10">Fibre and home internet hub</Link>
          </div>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="promos" />
    </div>
  );
};
