import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { Bundle, NetworkName, ProductType } from '../types';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_BRAND_NAME,
  SITE_EDITOR_BIO,
  SITE_EDITOR_NAME,
  SITE_EDITOR_ROLE,
  SITE_LOGO_URL,
  SITE_PRODUCT_NAME,
  SITE_URL,
  toCanonicalUrl
} from '../seo/siteConstants';
import { Breadcrumbs, buildBreadcrumbSchema } from './Breadcrumbs';
import { isNoindexRoute } from '../config/routeCatalog';
import { buildBundleItemListSchema } from '../utils/structuredData';
import { getBundleSourceNote } from '../utils/bundleSource';
import {
  formatIsoForDisplay,
  getBundleTypeModifiedIso,
  getDefaultPublishedIso
} from '../seo/contentDates';
import { AuthorReviewBlock } from './AuthorReviewBlock';

export type NetworkTemplateBundleType = 'weekly-data' | 'social-data' | 'night-data' | 'monthly-data' | string;

export interface NetworkTemplateFAQ {
  question: string;
  answer: string;
}

interface RelatedLink {
  href: string;
  label: string;
  description: string;
}

export interface NetworkTemplateSeoData {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
}

interface NetworkPageTemplateProps {
  network: NetworkName;
  bundleType: NetworkTemplateBundleType;
  seoData: NetworkTemplateSeoData;
  bundleData: Bundle[];
  introText: string;
  networkInsight: string;
  bestForItems: string[];
  faqs: NetworkTemplateFAQ[];
}

type PreparedBundle = Bundle;

function toBundleTypeLabel(bundleType: NetworkTemplateBundleType): string {
  const fromMap: Record<string, string> = {
    'cheapest-1gb': 'Cheapest 1GB',
    'daily-data': 'Daily',
    'weekly-data': 'Weekly',
    'social-data': 'Social',
    'night-data': 'Night',
    'monthly-data': 'Monthly'
  };
  if (fromMap[bundleType]) return fromMap[bundleType];
  return bundleType
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getAllocationLines(bundle: Bundle): string[] {
  const lines: string[] = [];
  if (bundle.anytimeData && bundle.anytimeData !== '0MB') {
    lines.push(`${bundle.anytimeData} anytime`);
  }
  if (bundle.nightData && bundle.nightData !== '0MB') {
    lines.push(`${bundle.nightData} night`);
  }
  if (lines.length === 0) {
    lines.push(bundle.volume);
  }
  return lines;
}

function getProductTypeLabel(productType?: ProductType): string | null {
  if (!productType) return null;
  const labels: Record<ProductType, string> = {
    smartphone_once_off_data: 'Once-off mobile data',
    smartphone_recurring_data: 'Recurring mobile data',
    prepaid_lte_router_data: 'Prepaid LTE / router',
    night_data: 'Night-only data',
    personalised_app_only_offer: 'Personalised app offer',
    promo_campaign_offer: 'Promotional offer',
    home_internet_fixed_lte: 'Fixed wireless / home internet'
  };
  return labels[productType];
}

function isVerifiedWithDate(bundle: Bundle): bundle is Bundle & { lastVerified: string } {
  return bundle.sourceConfidence === 'verified' && Boolean(bundle.lastVerified);
}

function getEvidenceSortRank(bundle: Bundle): number {
  if (isVerifiedWithDate(bundle)) return 0;
  if (bundle.sourceConfidence === 'verified') return 1;
  return 2;
}

function getSourceStatusLabel(bundle: Bundle): string {
  if (isVerifiedWithDate(bundle)) {
    return `Checked ${formatIsoForDisplay(bundle.lastVerified)}`;
  }
  if (bundle.sourceConfidence === 'verified') {
    return 'Matched to official source';
  }
  if (bundle.sourceConfidence === 'dynamic_checkout') {
    return 'Confirm in checkout';
  }
  if (bundle.sourceConfidence === 'personalised') {
    return 'Personalised price';
  }
  return 'Recheck before buying';
}

function getSourceStatusClasses(bundle: Bundle): string {
  return isVerifiedWithDate(bundle)
    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
    : 'border-amber-200 bg-amber-50 text-amber-900';
}

function formatRand(value: number): string {
  return `R${value.toFixed(0)}`;
}

function formatCostPerGb(value: number | null): string {
  if (value === null || Number.isNaN(value) || value <= 0) return 'N/A';
  return `R${value.toFixed(2)}`;
}

function getCostBasis(bundle: Bundle): { value: string; note: string } {
  if (!isVerifiedWithDate(bundle)) {
    return {
      value: 'Confirm price first',
      note: 'No R/GB comparison is shown for an unchecked price.'
    };
  }

  const hasAnytimeData = Boolean(bundle.anytimeData && bundle.anytimeData !== '0MB');
  const hasNightData = Boolean(bundle.nightData && bundle.nightData !== '0MB');

  if (hasAnytimeData) {
    return {
      value: `${formatCostPerGb(bundle.costPerGb)} / anytime GB`,
      note: hasNightData
        ? 'Restricted night data is excluded from this figure.'
        : 'Based on the listed anytime allocation.'
    };
  }

  if (hasNightData) {
    return {
      value: `${formatCostPerGb(bundle.costPerGb)} / night GB`,
      note: 'This is restricted night-only data.'
    };
  }

  return {
    value: `${formatCostPerGb(bundle.costPerGb)} / GB`,
    note: 'Based on the listed usable allocation.'
  };
}

function getNetworkSlug(network: NetworkName): string {
  const slugMap: Record<NetworkName, string> = {
    Vodacom: 'vodacom',
    MTN: 'mtn',
    Telkom: 'telkom',
    'Cell C': 'cell-c',
    Rain: 'rain'
  };
  return slugMap[network];
}

function buildRelatedLinks(network: NetworkName, bundleType: NetworkTemplateBundleType): RelatedLink[] {
  const networkSlug = getNetworkSlug(network);
  const links: RelatedLink[] = [
    {
      href: `/network/${networkSlug}/`,
      label: `${network} data prices`,
      description: `See the full ${network} data page before choosing a filtered bundle type.`
    },
    {
      href: '/guides/cheapest-data-south-africa/',
      label: 'Cheapest data in South Africa',
      description: 'Compare this network page against the full market benchmark.'
    }
  ];

  if (bundleType === 'cheapest-1gb') {
    links.push(
      {
        href: '/guides/cheapest-1gb-data-south-africa/',
        label: 'Cheapest 1GB data guide',
        description: 'Compare 1GB-style options across Vodacom, MTN, Telkom, and Cell C.'
      },
      {
        href: `/network/${networkSlug}/monthly-data/`,
        label: `${network} monthly data`,
        description: 'Check whether a monthly bundle is better value than repeated 1GB top-ups.'
      }
    );
  }

  if (bundleType === 'monthly-data') {
    links.push(
      {
        href: '/guides/best-monthly-data-deals-south-africa/',
        label: 'Best monthly data deals',
        description: 'Compare 30-day prepaid value across major South African networks.'
      },
      {
        href: '/guides/cheapest-2gb-data-south-africa/',
        label: 'Cheapest 2GB data guide',
        description: 'Use this smaller-bundle benchmark when monthly data feels too large.'
      },
      {
        href: network === 'Rain' ? `/network/${networkSlug}/` : `/network/${networkSlug}/cheapest-1gb/`,
        label: network === 'Rain' ? `${network} data prices` : `${network} cheapest 1GB`,
        description:
          network === 'Rain'
            ? 'Review Rain network context before choosing a monthly data plan.'
            : 'Compare the smaller top-up path before buying a monthly bundle.'
      }
    );
  }

  if (network !== 'Rain') {
    links.push(
      {
        href: `/${networkSlug}-ussd-codes/`,
        label: `${network} USSD codes`,
        description: `Find ${network} balance, buy-data, and self-service shortcuts.`
      },
      {
        href: `/guides/how-to-buy-data-${networkSlug}/`,
        label: `How to buy ${network} data`,
        description: `Use the step-by-step ${network} data buying guide.`
      }
    );
  }

  links.push({
    href: '/ussd-codes-south-africa/',
    label: 'South Africa USSD codes',
    description: 'Check balance and buy-data codes for all major networks.'
  });

  const seen = new Set<string>();
  return links.map((link) => {
    const networkFacetMatch = link.href.match(/^\/network\/([^/]+)\/[^/]+\/$/);
    if (networkFacetMatch && isNoindexRoute(link.href)) {
      return {
        href: `/network/${networkFacetMatch[1]}/`,
        label: `${network} data prices`,
        description: 'Use the full parent network page for broader bundle context.'
      };
    }

    if (isNoindexRoute(link.href)) {
      return {
        href: '/guides/cheapest-data-south-africa/',
        label: 'Cheapest data in South Africa',
        description: 'Use the main comparison page for broader, indexable bundle context.'
      };
    }

    return link;
  }).filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function QuickAnswerCard({
  network,
  bundleTypeLabel,
  bundleType,
  bundles
}: {
  network: NetworkName;
  bundleTypeLabel: string;
  bundleType: NetworkTemplateBundleType;
  bundles: PreparedBundle[];
}) {
  const verifiedBundles = bundles.filter(isVerifiedWithDate);
  const unverifiedCount = bundles.length - verifiedBundles.length;
  const lowestVerified = [...verifiedBundles].sort((a, b) => a.price - b.price)[0];

  let answer =
    'Compare the listed price, usable allocation, validity and source status together. Confirm any row without a checked date on the operator channel for your own line.';

  if (bundles.length === 0 && bundleType === 'monthly-data') {
    answer = `DataCost does not currently publish an exact ${network} monthly price on this page because no publicly reproducible row passed the latest source check. Check the live ${network} menu for your own line, then compare allocation, validity, renewal behavior and price before buying.`;
  } else if (bundles.length === 0 && bundleType === 'cheapest-1gb') {
    answer = `DataCost does not currently publish an exact general-use ${network} 1GB price on this page because no publicly reproducible row passed the latest source check. Check the live ${network} menu for your own line and compare the final allocation, validity and price before buying.`;
  } else if (bundles.length === 0) {
    answer = `DataCost does not currently publish an exact ${network} ${bundleTypeLabel.toLowerCase()} price because no publicly reproducible row passed the latest source check. Check the live operator menu before buying.`;
  } else if (network === 'Vodacom' && bundleType === 'night-data') {
    answer = `Vodacom Night Owl data is restricted to midnight–05:00. ${verifiedBundles.length} listed bundle${verifiedBundles.length === 1 ? ' was' : 's were'} matched to official Vodacom sources with a recorded check date. Compare anytime and night allocations separately; do not value restricted night data as if it were daytime data.`;
  } else if (bundleType === 'monthly-data') {
    answer = lowestVerified
      ? `${lowestVerified.name} at ${formatRand(lowestVerified.price)} is the lowest monthly row here with a recorded check date. Compare once-off versus recurring status and confirm ${unverifiedCount} row${unverifiedCount === 1 ? '' : 's'} marked for recheck.`
      : `The listed ${network} monthly rows do not yet have current recorded price checks. Use the page to compare validity and renewal terms, then confirm every price with ${network}.`;
  } else if (bundleType === 'cheapest-1gb') {
    answer = lowestVerified
      ? `${lowestVerified.name} at ${formatRand(lowestVerified.price)} is the lowest general-use 1GB row here with a recorded check date. Night-only and social bundles are excluded from this comparison.`
      : `The listed ${network} 1GB rows do not yet have current recorded price checks. Compare daily, weekly and monthly expiry first, then confirm the final price with ${network}.`;
  }

  return (
    <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-8" aria-label="Quick answer">
      <h2 className="text-2xl font-black tracking-tight text-emerald-900">
        Quick Answer: {network} {bundleTypeLabel} Data
      </h2>
      <p className="mt-3 text-slate-700 leading-relaxed">
        {answer}
      </p>
    </section>
  );
}

export function BundleTable({
  bundles,
  network,
  bundleTypeLabel,
  bundleType
}: {
  bundles: PreparedBundle[];
  network: NetworkName;
  bundleTypeLabel: string;
  bundleType: NetworkTemplateBundleType;
}) {
  if (bundles.length === 0) {
    const liveCheck = network === 'Vodacom'
      ? {
          sourceHref: 'https://www.vodacom.co.za/vodacom/shopping/plans/open-market-bundle-price-changes',
          sourceLabel: 'Open Vodacom public bundle guidance',
          steps: [
            'Dial *135# and follow the current data prompts to inspect the standard self-service menu.',
            'Check *123# separately for Just 4 You offers, which can differ by SIM and campaign.',
            bundleType === 'cheapest-1gb'
              ? 'Confirm that the allocation is general-use 1GB, then compare its validity and final checkout price. Do not substitute social-only or night-only data.'
              : 'Confirm the usable allocation, validity, renewal type and final checkout price before paying.'
          ]
        }
      : network === 'Telkom'
        ? {
            sourceHref: 'https://www.telkom.co.za/help-guide',
            sourceLabel: 'Open Telkom self-service guidance',
            steps: [
              'Dial *180# and follow the current self-service prompts to inspect standard data options.',
              'Check *123# separately for Mo\'Nice offers, which can be specific to your prepaid line.',
              bundleType === 'monthly-data'
                ? 'Confirm that validity is 30 days and check whether the option is once-off or recurring before comparing its final price.'
                : 'Confirm the usable allocation, validity and final checkout price before paying.'
            ]
          }
        : {
            sourceHref: `/network/${getNetworkSlug(network)}/`,
            sourceLabel: `View current ${network} guidance`,
            steps: [
              `Open the current ${network} app, website or self-service menu for your own line.`,
              'Check allocation, validity, restrictions and final price together.',
              'Avoid relying on an old screenshot or a campaign price shown to another customer.'
            ]
          };

    return (
      <section aria-label="Bundle source-check status" className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">Current public price status</h2>
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="font-black text-amber-950">No exact source-checked price is published here.</p>
          <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-amber-900">
            The latest review did not find a publicly reproducible {network} {bundleTypeLabel.toLowerCase()} row that met DataCost&apos;s evidence standard. Older, account-specific and campaign-only prices are intentionally withheld. Confirm the live offer on your own line before paying.
          </p>
          <a
            href={`/network/${getNetworkSlug(network)}/`}
            className="mt-4 inline-flex font-black text-[#1b6d24] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b6d24]"
          >
            View source-checked {network} bundle information
          </a>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-xl font-black tracking-tight text-slate-900">How to check the live offer without losing context</h3>
          <ol className="mt-4 space-y-3">
            {liveCheck.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-slate-700">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 font-black text-emerald-900">
                  {index + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
          <a
            href={liveCheck.sourceHref}
            target={liveCheck.sourceHref.startsWith('http') ? '_blank' : undefined}
            rel={liveCheck.sourceHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="mt-5 inline-flex items-center gap-2 font-black text-[#1b6d24] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b6d24]"
          >
            {liveCheck.sourceLabel}
            {liveCheck.sourceHref.startsWith('http') && <ExternalLink className="h-4 w-4" aria-hidden="true" />}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Bundle comparison table">
      <h2 className="text-2xl font-black tracking-tight text-slate-900">Compare listed bundles and restrictions</h2>
      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
        “Checked” means the exact row has a recorded match to an official source. Other rows remain visible for context but must be confirmed before purchase.
      </p>
      <p className="mt-3 text-xs font-bold text-slate-500 md:hidden">Swipe the table horizontally to compare every column.</p>
      <div
        className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b6d24]"
        tabIndex={0}
        role="region"
        aria-label="Scrollable bundle comparison"
      >
        <table className="min-w-[920px] text-left">
          <caption className="sr-only">Listed bundle prices, usable allocations, validity, restrictions and source status.</caption>
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="sticky left-0 z-10 bg-slate-50 px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Bundle</th>
              <th scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Price</th>
              <th scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Usable allocation</th>
              <th scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Validity and window</th>
              <th scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Cost basis</th>
              <th scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Source status</th>
            </tr>
          </thead>
          <tbody>
            {bundles.map((bundle) => {
              const costBasis = getCostBasis(bundle);
              const isChecked = isVerifiedWithDate(bundle);

              return (
                <tr key={`${bundle.name}-${bundle.validity}`} className="border-t border-slate-100">
                  <th scope="row" className="sticky left-0 z-10 max-w-[240px] bg-white px-4 py-4 text-left align-top">
                    <span className="block font-black text-slate-900">{bundle.name}</span>
                    {getProductTypeLabel(bundle.productType) && (
                      <span className="mt-1 block text-xs font-medium text-slate-500">{getProductTypeLabel(bundle.productType)}</span>
                    )}
                  </th>
                  <td className="px-4 py-4 align-top">
                    <span className="block font-black text-slate-900">
                      {isChecked ? formatRand(bundle.price) : 'Confirm'}
                    </span>
                    {!isChecked && (
                      <>
                        <span className="mt-1 block text-xs font-medium text-slate-500">
                          Dataset reference: {formatRand(bundle.price)}
                        </span>
                        <span className="mt-2 inline-flex rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-black text-amber-900">
                          Needs recheck
                        </span>
                      </>
                    )}
                  </td>
                  <td className="px-4 py-4 align-top text-sm text-slate-700">
                    {getAllocationLines(bundle).map((line) => <span key={line} className="block">{line}</span>)}
                    {bundle.watchOut && <span className="mt-2 block max-w-[220px] text-xs font-medium text-amber-800">{bundle.watchOut}</span>}
                  </td>
                  <td className="px-4 py-4 align-top text-sm text-slate-700">
                    <span className="block">{bundle.validity}</span>
                    {bundle.nightWindow && <span className="mt-1 block font-bold text-slate-900">{bundle.nightWindow}</span>}
                  </td>
                  <td className="px-4 py-4 align-top text-sm text-slate-700">
                    <span className="block font-semibold text-slate-900">{costBasis.value}</span>
                    <span className="mt-1 block max-w-[170px] text-xs text-slate-500">{costBasis.note}</span>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-black ${getSourceStatusClasses(bundle)}`}>
                      {getSourceStatusLabel(bundle)}
                    </span>
                    {bundle.sourceUrl && bundle.sourceLabel && (
                      <a
                        href={bundle.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex max-w-[220px] items-start gap-1 text-xs font-bold leading-relaxed text-[#1b6d24] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b6d24]"
                      >
                        <span>{bundle.sourceLabel}</span>
                        <ExternalLink className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                      </a>
                    )}
                    {getBundleSourceNote(bundle) && (
                      <span className="mt-2 block max-w-[230px] text-xs leading-relaxed text-slate-600">{getBundleSourceNote(bundle)}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function BestForSection({
  bundleTypeLabel,
  points
}: {
  bundleTypeLabel: string;
  points: string[];
}) {
  return (
    <section>
      <h2 className="text-2xl font-black tracking-tight text-slate-900">Who should use {bundleTypeLabel.toLowerCase()} data?</h2>
      <ul className="mt-4 space-y-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-slate-700 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function InternalLinks({ network, bundleType }: { network: NetworkName; bundleType: NetworkTemplateBundleType }) {
  const links = buildRelatedLinks(network, bundleType);

  return (
    <section>
      <h2 className="text-2xl font-black tracking-tight text-slate-900">Useful Next Steps</h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <a className="block h-full rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-500" href={link.href}>
              <span className="font-black text-slate-900">{link.label}</span>
              <span className="mt-2 block text-sm leading-relaxed text-slate-600">{link.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ReviewSources({ bundles }: { bundles: PreparedBundle[] }) {
  const sources = [...new Map(
    bundles
      .filter((bundle) => bundle.sourceUrl && bundle.sourceLabel)
      .map((bundle) => [
        bundle.sourceUrl as string,
        {
          href: bundle.sourceUrl as string,
          label: bundle.sourceLabel as string,
          checkedRows: bundles.filter(
            (candidate) => candidate.sourceUrl === bundle.sourceUrl && isVerifiedWithDate(candidate)
          ).length,
          totalRows: bundles.filter((candidate) => candidate.sourceUrl === bundle.sourceUrl).length
        }
      ])
  ).values()];

  if (sources.length === 0) return null;

  return (
    <section id="review-sources" className="border-y border-slate-200 bg-white py-8 md:py-10">
      <div className="mb-6 flex items-start gap-3">
        <ShieldCheck className="mt-1 h-6 w-6 flex-shrink-0 text-[#1b6d24]" aria-hidden="true" />
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Official sources and review status</h2>
          <p className="mt-2 max-w-3xl font-medium leading-relaxed text-slate-600">
            DataCost records operator sources row by row. A reachable source does not automatically verify every price, so rows without a checked date remain marked for confirmation.
          </p>
        </div>
      </div>
      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {sources.map((source) => (
          <a
            key={source.href}
            href={source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid min-h-[72px] gap-2 py-5 transition-colors hover:text-[#1b6d24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b6d24] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_auto] md:items-start md:gap-6"
          >
            <span className="font-black text-slate-900 group-hover:text-[#1b6d24]">{source.label}</span>
            <span className="text-sm font-medium leading-relaxed text-slate-600">
              {source.checkedRows} of {source.totalRows} listed row{source.totalRows === 1 ? '' : 's'} from this source {source.checkedRows === 1 ? 'has' : 'have'} a recorded verification date.
            </span>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[#1b6d24]" aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}

export function FAQSection({ faqs }: { faqs: NetworkTemplateFAQ[] }) {
  return (
    <section>
      <h2 className="text-2xl font-black tracking-tight text-slate-900">Frequently Asked Questions</h2>
      <div className="mt-4 space-y-4">
        {faqs.map((faq) => (
          <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-black text-slate-900">{faq.question}</h3>
            <p className="mt-2 text-slate-700 leading-relaxed">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export const NetworkPageTemplate: React.FC<NetworkPageTemplateProps> = ({
  network,
  bundleType,
  seoData,
  bundleData,
  introText,
  networkInsight,
  bestForItems,
  faqs
}) => {
  const bundleTypeLabel = toBundleTypeLabel(bundleType);
  const canonicalUrl = toCanonicalUrl(seoData.canonicalPath);
  const title = seoData.title;
  const description = seoData.description;
  const shouldNoindex = isNoindexRoute(seoData.canonicalPath);
  const networkSlug = getNetworkSlug(network);
  const datePublishedIso = getDefaultPublishedIso();
  const dateModifiedIso = getBundleTypeModifiedIso(networkSlug);
  const lastReviewed = formatIsoForDisplay(dateModifiedIso);

  const preparedBundles = useMemo<PreparedBundle[]>(() => {
    return [...bundleData]
      .sort((a, b) => getEvidenceSortRank(a) - getEvidenceSortRank(b) || a.price - b.price);
  }, [bundleData]);

  const verifiedPreparedBundles = useMemo(
    () => preparedBundles.filter(isVerifiedWithDate),
    [preparedBundles]
  );

  const citationUrls = [...new Set(verifiedPreparedBundles
    .map((bundle) => bundle.sourceUrl)
    .filter((url): url is string => Boolean(url)))];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonicalUrl,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    citation: citationUrls,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    }
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: canonicalUrl,
    datePublished: datePublishedIso,
    dateModified: dateModifiedIso,
    citation: citationUrls,
    author: {
      '@type': 'Person',
      name: SITE_EDITOR_NAME,
      jobTitle: SITE_EDITOR_ROLE,
      description: SITE_EDITOR_BIO
    },
    reviewedBy: {
      '@type': 'Person',
      name: SITE_EDITOR_NAME,
      jobTitle: SITE_EDITOR_ROLE
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_BRAND_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: SITE_LOGO_URL
      }
    },
    image: DEFAULT_OG_IMAGE_URL
  };

  const itemListSchema = buildBundleItemListSchema(
    `${network} ${bundleTypeLabel} data bundles`,
    canonicalUrl,
    verifiedPreparedBundles,
    () => canonicalUrl
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Network', href: '/network/' },
    { label: network, href: `/network/${getNetworkSlug(network)}/` },
    { label: `${network} ${bundleTypeLabel} Data`, href: seoData.canonicalPath }
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-slate-900">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {shouldNoindex && <meta name="robots" content="noindex,follow" />}
        <meta name="keywords" content={seoData.keywords.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_PRODUCT_NAME} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE_URL} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        {verifiedPreparedBundles.length > 0 && (
          <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        )}
      </Helmet>

      <Breadcrumbs items={breadcrumbItems} />

      <header className="mb-8">
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">
          {network} {bundleTypeLabel} Data Deals (2026)
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
          {introText}
        </p>
      </header>
      <div className="space-y-10">
        <QuickAnswerCard
          network={network}
          bundleTypeLabel={bundleTypeLabel}
          bundleType={bundleType}
          bundles={preparedBundles}
        />
        <BundleTable
          bundles={preparedBundles}
          network={network}
          bundleTypeLabel={bundleTypeLabel}
          bundleType={bundleType}
        />
        <BestForSection bundleTypeLabel={bundleTypeLabel} points={bestForItems} />
        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            {network} {bundleTypeLabel} Insights for South Africa
          </h2>
          <p className="mt-3 text-slate-700 leading-relaxed">{networkInsight}</p>
        </section>
        <InternalLinks network={network} bundleType={bundleType} />
        <ReviewSources bundles={preparedBundles} />
        <FAQSection faqs={faqs} />
        <AuthorReviewBlock
          lastReviewed={lastReviewed}
          trustSummary="This comparison keeps operator sources, verification status, validity and restricted-use allocations visible so an unchecked price is never presented as confirmed."
        />
      </div>
    </main>
  );
};
