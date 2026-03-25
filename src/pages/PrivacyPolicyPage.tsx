import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';

interface PrivacyPolicyPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Privacy Policy | DataCost';
  const metaDescription =
    'DataCost privacy policy covering analytics, contact submissions, cookies, and how we handle personal information in line with South African POPIA principles.';
  const canonicalUrl = 'https://datacost.co.za/privacy-policy/';

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
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Privacy Policy</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            We take privacy seriously. This policy explains what data is collected, why it is collected, and how it is handled.
          </p>
        </header>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Information We Collect</h2>
          <p className="text-slate-600 leading-relaxed">
            We may collect basic analytics data (for example page views and device type) to understand how users interact with the site.
          </p>
          <p className="text-slate-600 leading-relaxed">
            If you contact us, we process the information you provide (such as name, email address, and message) only for support, correction handling, or follow-up.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Cookies and Measurement</h2>
          <p className="text-slate-600 leading-relaxed">
            We use measurement tools to improve content quality and site usability. These tools may place cookies or similar technologies in your browser.
          </p>
          <p className="text-slate-600 leading-relaxed">
            You can manage cookies in your browser settings, though some site functions may be affected.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">How We Use Data</h2>
          <ul className="text-slate-600 leading-relaxed list-disc pl-5 space-y-2">
            <li>To maintain and improve comparison content.</li>
            <li>To respond to support and correction requests.</li>
            <li>To monitor site performance and security.</li>
          </ul>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">South African Privacy Context</h2>
          <p className="text-slate-600 leading-relaxed">
            DataCost aims to handle personal information in line with applicable South African privacy principles, including POPIA.
          </p>
          <p className="text-slate-600 leading-relaxed">
            For privacy questions or requests related to your submitted information, contact us via the Contact page.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};

