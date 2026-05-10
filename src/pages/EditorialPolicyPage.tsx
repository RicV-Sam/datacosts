import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';
import {
  SITE_EDITOR_BIO,
  SITE_EDITOR_NAME,
  SITE_EDITOR_ROLE,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';

interface EditorialPolicyPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const EditorialPolicyPage: React.FC<EditorialPolicyPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'Editorial Policy | DataCost';
  const metaDescription =
    "Read DataCost's editorial standards, source rules, independence commitments, conflict disclosures, and corrections policy for telecom comparison content.";
  const canonicalUrl = toCanonicalUrl('/editorial-policy/');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Editorial Policy', href: '/editorial-policy/' }
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const editorialPolicySchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: metaDescription,
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    },
    reviewedBy: {
      '@type': 'Person',
      name: SITE_EDITOR_NAME,
      jobTitle: SITE_EDITOR_ROLE,
      description: SITE_EDITOR_BIO
    }
  };

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(editorialPolicySchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="home" />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <Breadcrumbs items={breadcrumbItems} className="mb-0" />

        <header className="text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Editorial Policy</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            DataCost publishes telecom comparison content for consumers. The goal is to help people make practical prepaid, data, and USSD decisions, not to repeat operator marketing claims.
          </p>
        </header>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Editorial Scope</h2>
          <p className="text-slate-600 leading-relaxed">
            DataCost covers South African mobile data prices, prepaid bundles, operator comparison pages, USSD shortcuts, airtime and data troubleshooting, WASP/VAS subscription issues, and practical consumer guides.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We prioritise pages that help users make a decision or solve a problem. Thin pages, unsupported claims, and duplicate pages that do not add useful context should be avoided or improved.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Author and Review Standards</h2>
          <p className="text-slate-600 leading-relaxed">
            DataCost is edited by <strong>{SITE_EDITOR_NAME}</strong>, {SITE_EDITOR_ROLE}, with experience across mobile services, VAS, carrier billing, mobile content, and African operator partnerships.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Major guides should show an author/reviewer block, a reviewed or updated date, a short explanation of why the guide can be trusted, and a correction route for users who spot outdated information.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Sources and Verification</h2>
          <p className="text-slate-600 leading-relaxed">
            Price and USSD content should be checked against public operator pages, official support pages, app or USSD flows where practical, and user correction reports after review.
          </p>
          <p className="text-slate-600 leading-relaxed">
            If a price, shortcut, or offer may vary by SIM, tariff, region, account type, promotion, or personalised menu, the page should say so rather than presenting it as guaranteed.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Independence</h2>
          <p className="text-slate-600 leading-relaxed">
            Rankings and recommendations are produced by the editorial method described on the methodology page. Commercial relationships do not guarantee better placement and should not override cheaper or more relevant consumer options.
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
            Users should always verify final pricing, eligibility, validity, and usage restrictions on the operator's official page, app, USSD menu, or checkout confirmation before purchase.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Accuracy and Corrections</h2>
          <p className="text-slate-600 leading-relaxed">
            Telecom pricing and promo structures can change quickly. We update content periodically and prioritize corrections when credible reports are received.
          </p>
          <p className="text-slate-600 leading-relaxed">
            If you identify an error, contact us with the affected URL, network, observed price or code, where you checked it, and the date. Corrections that affect buying decisions, airtime loss, balance checks, or subscription cancellation are treated as priority updates.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Advertising and User Experience</h2>
          <p className="text-slate-600 leading-relaxed">
            Ads or partner placements should not block the main answer, imitate navigation, hide the comparison content, or make it difficult for users to reach the information they came for.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Trust and legal pages should stay focused on accountability and site operation, not promotional claims.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};




