import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';
import { toCanonicalUrl } from '../seo/siteConstants';

interface AboutPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'About DataCost South Africa';
  const metaDescription =
    'Learn what DataCost does, who we are for, how we keep our comparisons useful for South African consumers, and how the site is funded.';
  const canonicalUrl = toCanonicalUrl('/about/');

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
            DataCost helps South Africans compare mobile data, airtime, USSD codes, network pages, and practical mobile cost-saving information.
          </p>
        </header>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Who This Site Is For</h2>
          <p className="text-slate-600 leading-relaxed">
            We built DataCost for prepaid users, students, families, gig workers, and anyone who needs practical answers on data pricing, bundle value, and USSD shortcuts in South Africa.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Our content is written for real telecom decisions: which bundle type to compare, how to check balances, which USSD route to try first, and how to avoid out-of-bundle surprises.
          </p>
          <p className="text-slate-600 leading-relaxed">
            DataCost is independent and is not owned by MTN, Vodacom, Telkom, Cell C, or Rain unless clearly stated on a specific page.
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
            We use public operator information, app or USSD menu checks where practical, and conservative wording when a menu can vary by SIM, tariff, or promotion.
          </p>
          <p className="text-slate-600 leading-relaxed">
            If you spot an outdated price or code, please use the contact page and include the affected URL, network, and what you saw so we can review and correct it.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};




