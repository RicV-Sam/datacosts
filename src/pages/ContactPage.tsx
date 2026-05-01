import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';
import { toCanonicalUrl } from '../seo/siteConstants';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';

interface ContactPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Contact DataCost South Africa';
  const metaDescription =
    'Contact DataCost for pricing corrections, editorial feedback, privacy requests, and site support related to South African mobile data comparisons.';
  const canonicalUrl = toCanonicalUrl('/contact/');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact/' }
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
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Contact</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            Spotted an incorrect price or outdated USSD code? Send us the page URL and details so we can verify and update.
          </p>
        </header>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Primary Contact</h2>
          <p className="text-slate-600 leading-relaxed">
            Email: <a className="text-[#1b6d24] font-bold hover:underline" href="mailto:hello@datacost.co.za">hello@datacost.co.za</a>
          </p>
          <p className="text-slate-600 leading-relaxed">
            If this mailbox changes, this page will be updated with the current contact route. Include the affected page URL and a short summary to help us action the request quickly.
          </p>
          <p id="corrections" className="text-slate-600 leading-relaxed">
            For corrections, please include the network, the code or price you checked, where you checked it, and the date you saw it.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">What We Can Help With</h2>
          <ul className="text-slate-600 leading-relaxed list-disc pl-5 space-y-2">
            <li>Price or bundle table corrections</li>
            <li>USSD code accuracy feedback</li>
            <li>Editorial policy or methodology questions</li>
            <li>Privacy-related requests</li>
            <li>Advertising, analytics, or partnership queries</li>
          </ul>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Response Expectations</h2>
          <p className="text-slate-600 leading-relaxed">
            We review requests in queue order and prioritize factual corrections that can affect consumer decisions.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Some updates require verification with official operator channels before publication.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};




