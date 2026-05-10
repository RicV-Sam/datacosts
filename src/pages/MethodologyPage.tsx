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

interface MethodologyPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const MethodologyPage: React.FC<MethodologyPageProps> = ({ onNavigate, onScrollTo }) => {
  const pageTitle = 'DataCost Methodology';
  const metaDescription =
    'See how DataCost checks South African mobile data prices, calculates cost per GB, handles personalised offers, updates guides, and corrects errors.';
  const canonicalUrl = toCanonicalUrl('/methodology/');
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Methodology', href: '/methodology/' }
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const methodologySchema = {
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
        <script type="application/ld+json">{JSON.stringify(methodologySchema)}</script>
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="home" />

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <Breadcrumbs items={breadcrumbItems} className="mb-0" />

        <header className="text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Our Methodology</h1>
          <p className="text-slate-600 font-medium max-w-2xl mx-auto">
            DataCost compares mobile prices and prepaid workflows for South African users. This page explains what we measure, what we do not claim, and how we handle corrections.
          </p>
        </header>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">What DataCost Measures</h2>
          <p className="text-slate-600 leading-relaxed">
            DataCost focuses on practical prepaid and mobile-data decisions: bundle price, included data, validity, bundle type, estimated cost per GB, operator restrictions, USSD routes, and common billing problems such as out-of-bundle usage or unwanted content-service charges.
          </p>
          <p className="text-slate-600 leading-relaxed">
            A comparison page is intended to answer one clear user question. For example, a 1GB guide should help users compare 1GB-style bundles, while a monthly-data guide should focus on longer-validity options instead of mixing daily, social, night, and uncapped products into one misleading ranking.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We prioritise repeatable consumer signals over operator marketing language. A bundle called a "deal" is not automatically ranked first; it still has to be assessed by price, usable data, validity, eligibility, and practical fit.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Data Sources and Source Hierarchy</h2>
          <p className="text-slate-600 leading-relaxed">
            We compile information from public operator websites, public plan pages, official support pages, network apps, and USSD self-service menus where practical. When a user reports a correction, we treat that report as a signal to investigate, not as a final source on its own.
          </p>
          <ul className="text-slate-600 leading-relaxed list-disc pl-5 space-y-2">
            <li><strong>Primary sources:</strong> official operator pricing pages, terms pages, support pages, and publicly accessible product pages.</li>
            <li><strong>Practical verification:</strong> operator apps and USSD menus where a menu path can reasonably be checked.</li>
            <li><strong>Context sources:</strong> public support documentation, user correction reports, and consumer-facing operator notices.</li>
            <li><strong>Excluded as sole sources:</strong> social-media screenshots, reseller claims, forum comments, or old price images unless a primary source supports the information.</li>
          </ul>
          <p className="text-slate-600 leading-relaxed">
            If two sources disagree, the most direct operator-controlled source normally takes precedence. If the official source is unclear, the page should use cautious language and explain the limitation rather than present a doubtful number as certain.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Cost-per-GB Formula</h2>
          <p className="text-slate-600 leading-relaxed">
            Cost per GB is calculated as total bundle price divided by the included GB amount. For example, a R99 bundle with 3GB of usable data is shown as about R33.00/GB.
          </p>
          <p className="text-slate-600 leading-relaxed">
            When a bundle combines anytime data and night-only or app-specific data, we avoid treating all included data as identical unless the page clearly explains the split. If a bundle is social-only, night-only, promotional, or restricted to a device or location, it should be compared inside the correct category rather than against normal anytime bundles.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Prices are rounded for readability. Final operator checkout pages and in-app confirmations always take precedence over a DataCost estimate.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Ranking Principles</h2>
          <ul className="text-slate-600 leading-relaxed list-disc pl-5 space-y-2">
            <li>Prioritise transparent pricing over marketing labels.</li>
            <li>Use category-specific comparisons rather than a single universal winner.</li>
            <li>Highlight known limitations such as coverage context or night-only usage windows.</li>
            <li>Prefer clarity for consumers over network promotional language.</li>
            <li>Separate cheapest upfront price from best value, because those are often different choices.</li>
            <li>Do not allow ads, sponsorships, or referral relationships to control editorial rankings.</li>
          </ul>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Personalised Offers and Limits</h2>
          <p className="text-slate-600 leading-relaxed">
            Personalised offers can be excellent value, but they are not universal. Examples include Just4You, Boosta, Mo'Nice, Made4U, app-only deals, recharge campaigns, loyalty offers, and SIM-specific promotions.
          </p>
          <p className="text-slate-600 leading-relaxed">
            DataCost may mention these channels as places to check, but we do not treat a personalised price as a guaranteed national price unless the offer is publicly available and clearly documented. A user on a different tariff, usage history, region, or SIM profile may see a different menu.
          </p>
          <p className="text-slate-600 leading-relaxed">
            DataCost also cannot see an individual user's live account, credit eligibility, customer-segment pricing, retailer checkout, throttling status, or local network performance. For that reason, every buying page asks users to verify final pricing and terms before purchase.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">USSD Codes, Network Pages, and Guides</h2>
          <p className="text-slate-600 leading-relaxed">
            USSD pages focus on common prepaid tasks: balance checks, buying bundles, account self-service, subscription checks, and support routes. Because operator menus can differ by SIM, tariff, promotion, and account type, we use cautious wording when a direct shortcut is not clear.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Network pages combine public bundle tables with plain-English notes about validity, bundle type, coverage context, and practical watch-outs. Guides are written around one search intent per page so users get a direct answer before browsing related pages.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Problem-solving guides focus on actions a user can take immediately, such as checking active subscriptions, confirming data balance, disabling mobile data before topping up, or collecting evidence before contacting operator support.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Update Cadence and Priority Pages</h2>
          <p className="text-slate-600 leading-relaxed">
            We review key network, USSD, and money pages on a rolling basis, with higher-priority checks for pages that affect buying decisions, airtime loss, subscription cancellation, or balance troubleshooting.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Priority pages include the homepage comparison experience, the USSD directory, cheapest-data guides, best-data guides, operator buy-data guides, data-disappearing guides, WASP/subscription guides, network hub pages, and trust pages such as About, Methodology, Editorial Policy, Contact, Privacy Policy, and Terms.
          </p>
          <p className="text-slate-600 leading-relaxed">
            If pricing changes faster than our refresh cycle, live operator checkout pages, app confirmations, USSD confirmations, and official terms take precedence.
          </p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-black tracking-tight">Corrections and Independence</h2>
          <p className="text-slate-600 leading-relaxed">
            Correction requests should include the DataCost URL, network name, observed price or code, date checked, and source. We verify against higher-priority sources before updating, and we avoid silent overclaims when a menu can vary by user.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Advertising, referrals, sponsorships, or partner relationships do not decide ranking order. If a commercial placement is used, it should be distinguishable from editorial comparison content.
          </p>
          <p className="text-slate-600 leading-relaxed">
            DataCost is independent from the mobile networks it compares unless a page clearly discloses otherwise.
          </p>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};




