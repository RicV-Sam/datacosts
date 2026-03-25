import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';

interface MethodologyPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const MethodologyPage: React.FC<MethodologyPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Methodology | How DataCost Compares Mobile Data Prices';
  const metaDescription =
    'See how DataCost collects bundle information, calculates value, and decides rankings across Vodacom, MTN, Telkom, Cell C, and Rain.';
  const canonicalUrl = 'https://datacost.co.za/methodology/';

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
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Our Methodology</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            This page explains how DataCost builds comparisons so users can understand what the rankings mean and where limits exist.
          </p>
        </header>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Data Sources</h2>
          <p className="text-slate-600 leading-relaxed">
            We compile published bundle information from operator channels such as official websites, self-service menus, and public plan pages.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Promotional and personalised offers (for example user-specific deals) may vary by account and are not always universally available.
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
            <li>Use category-specific comparisons rather than a single universal “winner”.</li>
            <li>Highlight known limitations such as coverage context or night-only usage windows.</li>
            <li>Prefer clarity for consumers over network promotional language.</li>
          </ul>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Update Cadence and Corrections</h2>
          <p className="text-slate-600 leading-relaxed">
            We review key pages on a rolling basis. If pricing changes faster than our refresh cycle, live operator checkout pages take precedence.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Report potential errors through our contact page and we will verify and update where needed.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};

