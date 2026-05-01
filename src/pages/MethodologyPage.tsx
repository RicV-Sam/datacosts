import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';
import { toCanonicalUrl } from '../seo/siteConstants';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';

interface MethodologyPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const MethodologyPage: React.FC<MethodologyPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'DataCost Methodology';
  const metaDescription =
    'See how DataCost checks bundle prices, USSD information, network pages, guides, update cadence, corrections, and limitations for South African mobile content.';
  const canonicalUrl = toCanonicalUrl('/methodology/');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Methodology', href: '/methodology/' }
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="home" />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <Breadcrumbs items={breadcrumbItems} className="mb-0" />

        <header className="text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Our Methodology</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            This page explains how DataCost builds comparisons so users can understand what the rankings mean and where limits exist.
          </p>
        </header>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Data Sources</h2>
          <p className="text-slate-600 leading-relaxed">
            We compile published bundle information from operator channels such as official websites, public plan pages, network apps, and self-service menus where practical.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Our source hierarchy is: official operator pages first, operator apps or USSD menus second, public support documentation third, and clearly labelled user-reported corrections only after review.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Promotional and personalised offers may vary by account and are not always universally available, so we avoid presenting them as guaranteed prices.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">How We Compare Value</h2>
          <p className="text-slate-600 leading-relaxed">
            Our tables focus on practical comparison metrics such as bundle price, validity period, and estimated cost per GB.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We treat bundle categories separately where possible (for example monthly, 1GB, and night-data) to avoid misleading like-for-unlike comparisons.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Ranking Principles</h2>
          <ul className="text-slate-600 leading-relaxed list-disc pl-5 space-y-2">
            <li>Prioritise transparent pricing over marketing labels.</li>
            <li>Use category-specific comparisons rather than a single universal winner.</li>
            <li>Highlight known limitations such as coverage context or night-only usage windows.</li>
            <li>Prefer clarity for consumers over network promotional language.</li>
          </ul>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">USSD Codes, Network Pages, and Guides</h2>
          <p className="text-slate-600 leading-relaxed">
            USSD pages focus on common prepaid tasks: balance checks, buying data, account self-service, subscriptions, and support routes. Because operator menus can differ by SIM, tariff, promotion, or account type, we use cautious wording when a direct shortcut is not clear.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Network pages combine public bundle tables with plain-English notes about validity, bundle type, coverage context, and practical watch-outs. Guides are written around one search intent per page so users get a direct answer without thin duplicate pages.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Update Cadence, Corrections, and Limits</h2>
          <p className="text-slate-600 leading-relaxed">
            We review key network, USSD, and money pages on a rolling basis, with higher-priority checks for pages that affect buying decisions or balance troubleshooting. If pricing changes faster than our refresh cycle, live operator checkout pages and in-app terms take precedence.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Correction requests should include the DataCost URL, network name, observed price or code, date checked, and source. We verify against higher-priority sources before updating.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Limitations: DataCost does not have live access to every user's personalised offer menu, account status, credit eligibility, or retailer checkout. Always verify final prices, validity, and eligibility with the network or retailer before purchase.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};




