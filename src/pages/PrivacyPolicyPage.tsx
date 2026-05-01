import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';
import { toCanonicalUrl } from '../seo/siteConstants';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';

interface PrivacyPolicyPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Privacy Policy | DataCost';
  const metaDescription =
    'DataCost privacy policy covering analytics, contact submissions, cookies, and how we handle personal information in line with South African POPIA principles.';
  const canonicalUrl = toCanonicalUrl('/privacy-policy/');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy', href: '/privacy-policy/' }
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
          <p className="text-slate-600 leading-relaxed">
            If DataCost later offers email, WhatsApp, or push alerts, we will process the contact details you submit for that alert service and allow opt-out where required.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Cookies and Measurement</h2>
          <p className="text-slate-600 leading-relaxed">
            We use measurement tools to improve content quality and site usability. These tools may place cookies or similar technologies in your browser.
          </p>
          <p className="text-slate-600 leading-relaxed">
            DataCost may display advertising. Advertising partners may use cookies or similar technologies to measure ad performance, prevent fraud, and show more relevant ads, subject to their own policies and browser controls.
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
            <li>To operate advertising, analytics, alerts, and site communication features.</li>
          </ul>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Third-Party Services</h2>
          <p className="text-slate-600 leading-relaxed">
            We may use service providers for analytics, advertising, hosting, email delivery, push notifications, and anti-abuse protection. These providers may process limited technical or contact data needed to provide those services.
          </p>
          <p className="text-slate-600 leading-relaxed">
            External operator or retailer links are controlled by those third parties. Their privacy policies apply once you leave DataCost.
          </p>
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




