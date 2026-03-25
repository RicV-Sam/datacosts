import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';

interface EditorialPolicyPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const EditorialPolicyPage: React.FC<EditorialPolicyPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Editorial Policy | DataCost';
  const metaDescription =
    'Read DataCost’s editorial standards, independence commitments, conflict disclosures, and corrections policy for telecom comparison content.';
  const canonicalUrl = 'https://datacost.co.za/editorial-policy/';

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="home" />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <header className="text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Editorial Policy</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            DataCost publishes telecom comparison content for consumers, not for network marketing campaigns.
          </p>
        </header>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Independence</h2>
          <p className="text-slate-600 leading-relaxed">
            Rankings and recommendations are produced by our editorial process. Commercial relationships do not guarantee better placement.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Sponsored placements, where used, should be clearly distinguishable from editorial comparison content.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Conflicts and Disclosure</h2>
          <p className="text-slate-600 leading-relaxed">
            If content includes referral or partner links, this may generate revenue for DataCost. We aim to disclose this clearly and avoid hidden incentives.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Users should always verify final pricing and terms on the operator’s official page before purchase.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Accuracy and Corrections</h2>
          <p className="text-slate-600 leading-relaxed">
            Telecom pricing and promo structures can change quickly. We update content periodically and prioritize corrections when credible reports are received.
          </p>
          <p className="text-slate-600 leading-relaxed">
            If you identify an error, contact us with the affected URL and details so we can investigate and correct promptly.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};

