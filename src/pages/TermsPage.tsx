import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';
import { toCanonicalUrl } from '../seo/siteConstants';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';

interface TermsPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Terms of Service | DataCost';
  const metaDescription =
    'Terms of service for using DataCost, including content use, limitations, third-party links, and user responsibilities.';
  const canonicalUrl = toCanonicalUrl('/terms/');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Terms', href: '/terms/' }
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
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Terms of Service</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            These terms govern how you use DataCost and what to expect from the information provided on this site.
          </p>
        </header>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Use of the Site</h2>
          <p className="text-slate-600 leading-relaxed">
            DataCost is provided for general informational and comparison purposes. You may use the site for lawful personal use and decision support.
          </p>
          <p className="text-slate-600 leading-relaxed">
            You may link to DataCost pages, but you may not copy substantial portions of our content, tables, or page structure for republication without permission.
          </p>
          <p className="text-slate-600 leading-relaxed">
            You may not misuse the site, interfere with availability, or attempt to access restricted systems.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Pricing and Availability</h2>
          <p className="text-slate-600 leading-relaxed">
            Telecom pricing changes frequently. While we work to keep content current, final offer terms, pricing, and eligibility are determined by network operators and partners.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Always verify checkout details on the official provider page before purchase.
          </p>
          <p className="text-slate-600 leading-relaxed">
            DataCost is not a live billing system and cannot see your individual SIM profile, personalised offers, credit eligibility, or retailer checkout terms.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Third-Party Links and Network Affiliation</h2>
          <p className="text-slate-600 leading-relaxed">
            DataCost links to operator and partner websites for purchases or additional information. We are not responsible for third-party content, terms, privacy, or service delivery.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Unless a page clearly states otherwise, DataCost is not affiliated with, endorsed by, or operated by MTN, Vodacom, Telkom, Cell C, Rain, or any retailer mentioned on the site.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Liability and Scope</h2>
          <p className="text-slate-600 leading-relaxed">
            DataCost does not provide financial, legal, or telecom contract advice. Use of the site is at your own discretion.
          </p>
          <p className="text-slate-600 leading-relaxed">
            To the extent permitted by law, DataCost is not liable for losses arising from reliance on outdated pricing or third-party service issues.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};




