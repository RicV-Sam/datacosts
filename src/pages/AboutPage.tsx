import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';

interface AboutPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'About DataCost | South African Mobile Data Comparison';
  const metaDescription =
    'Learn what DataCost does, who we are for, how we keep our comparisons useful for South African consumers, and how the site is funded.';
  const canonicalUrl = 'https://datacost.co.za/about/';

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
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">About DataCost</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            DataCost is a South African consumer-help site focused on one job: making mobile data prices easier to compare and harder to overpay.
          </p>
        </header>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Who This Site Is For</h2>
          <p className="text-slate-600 leading-relaxed">
            We built DataCost for prepaid users, students, families, gig workers, and anyone who needs practical answers on data pricing, bundle value, and USSD shortcuts in South Africa.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Our content is written for real decisions: which bundle to buy today, which network offers better value for your usage, and how to avoid out-of-bundle surprises.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">How DataCost Is Funded</h2>
          <p className="text-slate-600 leading-relaxed">
            DataCost may earn revenue from advertising placements and referral links. That does not change our comparison method or rankings criteria.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We do not sell SIM cards or telecom plans directly. Final purchases are always completed on the operator or partner website.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">How We Keep It Useful</h2>
          <p className="text-slate-600 leading-relaxed">
            Pricing and offer structures change often. We periodically refresh bundle tables and guide pages, and we encourage users to verify current offers before checkout.
          </p>
          <p className="text-slate-600 leading-relaxed">
            If you spot an outdated price or code, please contact us so we can review and correct it quickly.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};

