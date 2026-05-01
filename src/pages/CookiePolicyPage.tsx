import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';
import { toCanonicalUrl } from '../seo/siteConstants';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';

interface CookiePolicyPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Cookie Policy | DataCost';
  const metaDescription =
    'DataCost cookie policy explaining what cookies or similar technologies may be used for analytics, usability, advertising, and how you can control them.';
  const canonicalUrl = toCanonicalUrl('/cookie-policy/');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Cookie Policy', href: '/cookie-policy/' }
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
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Cookie Policy</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            This page explains how DataCost may use cookies or similar technologies to measure site usage, improve content, and support advertising operations.
          </p>
        </header>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">What Cookies Are</h2>
          <p className="text-slate-600 leading-relaxed">
            Cookies are small text files placed on your device when you visit a website. Similar technologies can also be used to remember preferences, measure performance, and understand how pages are used.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">How DataCost May Use Cookies</h2>
          <ul className="text-slate-600 leading-relaxed list-disc pl-5 space-y-2">
            <li>To understand which pages are useful and where visitors experience problems.</li>
            <li>To remember basic site preferences where relevant.</li>
            <li>To support advertising delivery, frequency control, or reporting where ad technology is used.</li>
            <li>To monitor performance, security, and fraud-prevention signals.</li>
          </ul>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Third-Party Services</h2>
          <p className="text-slate-600 leading-relaxed">
            Some analytics, advertising, or embedded services may set their own cookies or similar identifiers. Those providers operate under their own policies and controls.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">How to Manage Cookies</h2>
          <p className="text-slate-600 leading-relaxed">
            You can control or remove cookies through your browser settings. Blocking some cookies may affect how parts of the site work, including measurement or embedded features.
          </p>
          <p className="text-slate-600 leading-relaxed">
            For broader privacy details, please also review the Privacy Policy and contact us if you have a question about data handling on this site.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};
