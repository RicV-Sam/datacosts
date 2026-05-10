import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';
import {
  SITE_BRAND_NAME,
  SITE_EDITOR_BIO,
  SITE_EDITOR_NAME,
  SITE_EDITOR_ROLE,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';
import { Breadcrumbs, buildBreadcrumbSchema } from '../components/Breadcrumbs';

interface AboutPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'About DataCost South Africa';
  const metaDescription =
    'Learn who edits DataCost, why the site exists, how we compare South African mobile data prices, how the site is funded, and how users can report errors.';
  const canonicalUrl = toCanonicalUrl('/about/');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/' }
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: pageTitle,
    description: metaDescription,
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    },
    about: {
      '@type': 'Organization',
      name: SITE_BRAND_NAME,
      url: SITE_URL
    },
    editor: {
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
        <script type="application/ld+json">{JSON.stringify(aboutPageSchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="home" />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <Breadcrumbs items={breadcrumbItems} className="mb-0" />

        <header className="text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">About DataCost</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            DataCost is an independent South African telecom resource for comparing mobile data prices, checking USSD routes, and solving everyday prepaid billing problems.
          </p>
        </header>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Who Runs DataCost</h2>
          <p className="text-slate-600 leading-relaxed">
            DataCost is edited by <strong>{SITE_EDITOR_NAME}</strong>, a {SITE_EDITOR_ROLE.toLowerCase()} with experience across VAS, carrier billing, mobile content, and African operator partnerships.
          </p>
          <p className="text-slate-600 leading-relaxed">
            That background matters because mobile pricing pages are not only about headline rand amounts. South African prepaid users also need to understand bundle validity, personalised offers, subscription billing, out-of-bundle risk, USSD menu paths, and whether a deal is realistic for the way they actually use a SIM.
          </p>
          <p className="text-slate-600 leading-relaxed">
            DataCost is not owned by MTN, Vodacom, Telkom, Cell C, Rain, or any other operator unless a page clearly says otherwise.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Why the Site Exists</h2>
          <p className="text-slate-600 leading-relaxed">
            Mobile data decisions in South Africa are often made under pressure: a student needs a small bundle before class, a parent needs to stretch prepaid spend, or a gig worker needs enough data to stay online for the day. Operator menus can be useful, but they are not always easy to compare side by side.
          </p>
          <p className="text-slate-600 leading-relaxed">
            DataCost exists to turn those fragmented options into plain-language comparisons and guides. We focus on practical questions: which bundle looks cheapest, when a bigger bundle is better value, how to check a balance, how to stop recurring content charges, and what to verify before buying.
          </p>
          <p className="text-slate-600 leading-relaxed">
            The site is built primarily for prepaid users, students, families, gig workers, small-business owners, and anyone trying to reduce avoidable mobile spend.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">How We Make Comparisons Useful</h2>
          <p className="text-slate-600 leading-relaxed">
            Pages are reviewed before publication. When a page includes prices, bundle validity, USSD codes, or operator instructions, we check the information against public operator sources, app or USSD flows where practical, and user correction reports.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We do not present operator marketing labels as rankings. Our comparisons prioritize consumer signals such as total price, included data, validity, estimated cost per GB, usage restrictions, and whether a deal is likely to be available to ordinary prepaid users.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Where personalised menus such as Just4You, Boosta, or Mo'Nice may differ by SIM, we label that limitation rather than treating a personalised offer as a universal market price.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">How DataCost Is Funded</h2>
          <p className="text-slate-600 leading-relaxed">
            DataCost may earn revenue from advertising placements, sponsorships, or referral links. Commercial relationships do not control comparison rankings, methodology notes, or consumer warnings.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We do not sell SIM cards or telecom plans directly. Final purchases are completed on operator or partner websites, and users should verify final prices, validity, and eligibility before purchase.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Sponsored placements, if used, should be clearly distinguishable from editorial comparison content and must not hide cheaper relevant options.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">How Users Can Report Errors</h2>
          <p className="text-slate-600 leading-relaxed">
            Telecom pricing and USSD menus change frequently. If you spot an outdated price, a changed code, or a missing limitation, use the contact page and include the affected URL, network, what you checked, where you checked it, and the date.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Corrections that affect buying decisions, airtime loss, subscription cancellation, or balance-checking instructions are treated as priority updates.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};




