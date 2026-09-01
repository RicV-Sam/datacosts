import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { bundles, networkMetadata } from '../data';
import { networkPages } from '../data/networks';
import { Footer } from '../components/Footer';
import { BUNDLE_TYPE_MAP, getNetworkFacetRoutes } from '../config/routeCatalog';
import { Bundle, NavigateFunction, NetworkName } from '../types';
import {
  NetworkPageTemplate,
  NetworkTemplateBundleType,
  NetworkTemplateFAQ
} from '../components/NetworkPageTemplate';

interface BundleTypePageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

const SUPPORTED_BUNDLE_TYPES = new Set<NetworkTemplateBundleType>([
  'cheapest-1gb',
  'daily-data',
  'weekly-data',
  'social-data',
  'night-data',
  'monthly-data'
]);

function toBundleTypeLabel(bundleType: NetworkTemplateBundleType): string {
  const labels: Record<string, string> = {
    'cheapest-1gb': 'Cheapest 1GB',
    'daily-data': 'Daily',
    'weekly-data': 'Weekly',
    'social-data': 'Social',
    'night-data': 'Night',
    'monthly-data': 'Monthly'
  };
  return labels[bundleType] ?? bundleType.replace(/-/g, ' ');
}

function getIntro(
  network: NetworkName,
  bundleType: NetworkTemplateBundleType,
  hasPublishedRows: boolean
): string {
  const label = toBundleTypeLabel(bundleType).toLowerCase();

  if (!hasPublishedRows && bundleType === 'monthly-data') {
    return `Check the current ${network} monthly-data route without relying on an old or account-specific price. DataCost is retaining this page for continuity while withholding exact rows that did not pass the latest public-source review.`;
  }

  if (!hasPublishedRows && bundleType === 'cheapest-1gb') {
    return `Check current ${network} 1GB availability without relying on an old or account-specific price. DataCost is retaining this page for continuity while withholding exact rows that did not pass the latest public-source review.`;
  }

  if (!hasPublishedRows) {
    return `Check current ${network} ${label} availability without relying on an old or account-specific price. Exact rows are withheld until they pass a public-source review.`;
  }

  if (network === 'Vodacom' && bundleType === 'night-data') {
    return 'Compare Vodacom Night Owl and prepaid LTE bundles by price, anytime allocation, night allocation, validity and the hours in which night data can actually be used.';
  }

  if (bundleType === 'monthly-data') {
    return `Compare the ${network} monthly data options recorded by DataCost, including 30-day validity, once-off or recurring status, source evidence and the restrictions to confirm before paying.`;
  }

  if (bundleType === 'cheapest-1gb') {
    return `Compare ${network} 1GB general-use data options by listed price, validity and source status. Night-only and social bundles are excluded because they are not substitutes for ordinary mobile data.`;
  }

  return `Compare ${network} ${label} data options in South Africa with listed prices, bundle validity, source status and practical restrictions to confirm before buying.`;
}

function getNetworkInsight(network: NetworkName, bundleType: NetworkTemplateBundleType): string {
  const typeHint: Record<string, string> = {
    'weekly-data': 'Weekly shoppers should verify current validity windows before assuming all 7-day bundles behave the same.',
    'social-data': 'Social bundle users should confirm which apps are zero-rated and where usage falls back to normal data.',
    'night-data': 'Night bundle buyers should always verify the exact start and end times for off-peak windows.',
    'monthly-data': 'Monthly buyers should compare once-off versus recurring options to avoid avoidable airtime drain.'
  };

  if (network === 'Vodacom') {
    return `Vodacom Just4You and account-specific app offers can vary by subscriber profile. Compare any live offer with the listed ${toBundleTypeLabel(bundleType).toLowerCase()} menu on allocation, validity and price. ${typeHint[bundleType] ?? ''}`.trim();
  }

  if (network === 'MTN') {
    return `MTN Made4U and campaign-specific channels can show line-specific offers, while MyTownOffers also depends on prepaid eligibility and location. Compare allocation, validity and live price before buying. ${typeHint[bundleType] ?? ''}`.trim();
  }

  if (network === 'Telkom') {
    return `Compare Telkom's current source-checked rows on allocation, validity and price. Bundle behavior also depends on local coverage and, for night offers, Night Surfer-style usage windows that do not mirror anytime data behavior. ${typeHint[bundleType] ?? ''}`.trim();
  }

  if (network === 'Cell C') {
    return `Cell C MyConnecta offers require number verification in the app or website and can vary by line. Use *147# for the standard bundle menu, then compare any live MyConnecta terms before topping up. ${typeHint[bundleType] ?? ''}`.trim();
  }

  return `Rain positioning is typically always-on and app-managed rather than USSD-driven, so monthly comparisons are often more relevant than short-validity prepaid behavior. ${typeHint[bundleType] ?? ''}`.trim();
}

function getBestFor(network: NetworkName, bundleType: NetworkTemplateBundleType): string[] {
  if (bundleType === 'weekly-data') {
    return [
      `${network} users who top up once a week and want less friction than daily recharges.`,
      'Students and commuters who need predictable short-cycle data budgeting.',
      'Users comparing weekly price stability against monthly lock-in risk.'
    ];
  }

  if (bundleType === 'social-data') {
    return [
      `${network} users who mostly use WhatsApp and other social apps, not full-time open browsing.`,
      'Budget-conscious prepaid users who want app-specific access for messaging.',
      'Families managing low-data plans where social traffic is the main usage type.'
    ];
  }

  if (bundleType === 'night-data') {
    return [
      `${network} users scheduling large downloads overnight to reduce daytime spend.`,
      'Gamers and streamers doing updates in off-peak windows.',
      'Households with fixed nighttime usage routines and strict budget targets.'
    ];
  }

  if (bundleType === 'daily-data') {
    return [
      `${network} users who buy smaller bundles for same-day usage and tight spending control.`,
      'People who need temporary data without committing to longer validity periods.',
      'Users topping up for specific travel, work, or study days.'
    ];
  }

  if (bundleType === 'cheapest-1gb') {
    return [
      `${network} users who consistently buy around 1GB per recharge.`,
      'Budget-first prepaid users comparing value across short and medium validity windows.',
      'Users tracking headline affordability while still checking cost per GB.'
    ];
  }

  return [
    `${network} users who buy data monthly and care about stable value per gigabyte.`,
    'Remote workers and students with recurring 30-day usage patterns.',
    'Users comparing entry-level versus high-volume monthly bundles before renewal.'
  ];
}

function buildFaqs(
  network: NetworkName,
  bundleType: NetworkTemplateBundleType,
  bundlesForPage: Bundle[]
): NetworkTemplateFAQ[] {
  const label = toBundleTypeLabel(bundleType).toLowerCase();
  const verifiedBundles = bundlesForPage.filter(
    (bundle) => bundle.sourceConfidence === 'verified' && Boolean(bundle.lastVerified)
  );
  const lowestVerified = [...verifiedBundles].sort((a, b) => a.price - b.price)[0];

  if (bundleType === 'night-data') {
    return [
      {
        question: `When can I use ${network} night data?`,
        answer:
          network === 'Vodacom'
            ? 'Vodacom Night Owl data is restricted to midnight until 05:00. Confirm the window and the qualifying product on the official terms before buying.'
            : `${network} night data is restricted to an off-peak window. Check the source beside the bundle because the hours and qualifying products can change.`
      },
      {
        question: `How should I compare ${network} night bundles?`,
        answer: 'Compare the anytime allocation and night allocation separately. A large total is poor value if you cannot use the night portion during its restricted hours.'
      },
      {
        question: `Can I use ${network} night data during the day?`,
        answer: 'No. The night allocation is only consumed inside the stated off-peak window. Daytime use normally comes from an anytime bundle or another available balance.'
      },
      {
        question: `Are all prices on this page verified?`,
        answer: `No. Rows with a checked date were matched to an official source; rows marked “Recheck before buying” need confirmation on the ${network} app, website or self-service menu.`
      }
    ];
  }

  if (bundleType === 'monthly-data') {
    return [
      {
        question: `What is the lowest checked ${network} monthly option on this page?`,
        answer: lowestVerified
          ? `${lowestVerified.name} at R${lowestVerified.price} is the lowest row on this page with a recorded verification date. Confirm the final menu on your own line before buying.`
          : `DataCost does not currently publish an exact ${network} monthly price on this page because no publicly reproducible row passed the latest source check. Confirm the live menu with ${network}.`
      },
      {
        question: `What is the difference between once-off and recurring ${network} data?`,
        answer: 'A once-off bundle expires without renewing. A recurring bundle can renew automatically when the next cycle starts, so check the purchase type before confirming.'
      },
      {
        question: `How should I compare ${network} monthly bundles?`,
        answer: 'Compare usable anytime data, validity, renewal behavior and listed Rand per GB together. Do not count restricted night data as ordinary daytime data.'
      },
      {
        question: `Why might my ${network} price differ from this page?`,
        answer: 'Operator menus can vary by SIM, tariff plan, app profile, campaign and checkout channel. The source status beside each row shows whether DataCost recorded a checked date.'
      }
    ];
  }

  if (bundleType === 'cheapest-1gb') {
    return [
      {
        question: `What is the lowest checked ${network} 1GB option on this page?`,
        answer: lowestVerified
          ? `${lowestVerified.name} at R${lowestVerified.price} is the lowest general-use 1GB row here with a recorded verification date.`
          : `DataCost does not currently publish an exact general-use ${network} 1GB price on this page because no publicly reproducible row passed the latest source check. Confirm the live daily, weekly and monthly menus before choosing.`
      },
      {
        question: `Why does validity matter for a ${network} 1GB bundle?`,
        answer: 'A lower price can come with one-day or seven-day expiry. Choose the cheapest option you can realistically use before it expires, not merely the lowest number.'
      },
      {
        question: `Does this comparison include ${network} night-only 1GB bundles?`,
        answer: 'No. Night-only and social bundles are excluded from the general-use 1GB ranking because their restricted usage is not directly comparable with anytime data.'
      },
      {
        question: `Where should I confirm the final ${network} price?`,
        answer: `Use the official source linked beside the row, then confirm the final option in the ${network} app, website or self-service menu for your own line.`
      }
    ];
  }

  return [
    {
      question: `How should I compare ${network} ${label} bundles?`,
      answer: 'Compare listed price, usable allocation, validity and source status together, then confirm the final option on your own line.'
    },
    {
      question: `Are all ${network} ${label} prices the same for every customer?`,
      answer: 'Not always. App, SIM, tariff-plan and campaign-specific offers can differ, so rows without a checked date need a manual confirmation.'
    },
    {
      question: `Where can I confirm a ${network} ${label} bundle?`,
      answer: `Open the official source linked beside the row and confirm the purchase in the ${network} app, website or self-service menu.`
    },
    {
      question: 'What does “Recheck before buying” mean?',
      answer: 'The row has a primary source, but DataCost does not have a sufficiently recent recorded price check for that exact offer.'
    }
  ];
}

function buildSeoTitle(network: NetworkName, bundleType: NetworkTemplateBundleType): string {
  const label = toBundleTypeLabel(bundleType);

  if (bundleType === 'monthly-data') {
    return `${network} Monthly Data Deals South Africa (2026)`;
  }

  if (bundleType === 'cheapest-1gb') {
    return `${network} Cheapest 1GB Data Deals (2026)`;
  }

  return `${network} ${label} Data Deals (2026)`;
}

function buildSeoDescription(
  network: NetworkName,
  bundleType: NetworkTemplateBundleType,
  hasPublishedRows: boolean
): string {
  const label = toBundleTypeLabel(bundleType).toLowerCase();

  if (!hasPublishedRows && bundleType === 'monthly-data') {
    return `Check current ${network} monthly data availability in South Africa. Exact prices are withheld unless they pass DataCost's latest public-source review.`;
  }

  if (!hasPublishedRows && bundleType === 'cheapest-1gb') {
    return `Check current ${network} 1GB data availability in South Africa. Exact prices are withheld unless they pass DataCost's latest public-source review.`;
  }

  if (!hasPublishedRows) {
    return `Check current ${network} ${label} availability in South Africa. Exact prices are withheld until they pass a public-source review.`;
  }

  if (bundleType === 'monthly-data') {
    return `Compare ${network} monthly data deals in South Africa by price, validity, and cost per GB. Find practical 30-day prepaid options for 2026.`;
  }

  if (bundleType === 'cheapest-1gb') {
    return `Compare ${network} 1GB data deals in South Africa by price, validity, and cost per GB. Check small prepaid top-up value for 2026.`;
  }

  return `Compare listed ${network} ${label} data options in South Africa by price, validity, usable allocation and source status before you buy.`;
}

export const BundleTypePage: React.FC<BundleTypePageProps> = ({ onNavigate, onScrollTo }) => {
  const { networkSlug, bundleType } = useParams<{ networkSlug: string; bundleType: string }>();
  const networkData = networkSlug ? networkPages[networkSlug] : null;
  const network = networkData ? networkMetadata[networkData.networkName] : null;
  const bundleTypeKey = (bundleType ?? '') as NetworkTemplateBundleType;
  const typeConfig = BUNDLE_TYPE_MAP[bundleTypeKey];
  const canonicalPath = networkSlug && bundleType
    ? `/network/${networkSlug}/${bundleType}/`
    : '';
  const isPublishedFacet = canonicalPath !== '' && getNetworkFacetRoutes().includes(canonicalPath);

  if (!network || !networkSlug || !typeConfig || !SUPPORTED_BUNDLE_TYPES.has(bundleTypeKey) || !isPublishedFacet) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Helmet>
          <title>Page Not Found | DataCost</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1 className="text-4xl font-black mb-4">Page Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md text-center">
          We could not find the filtered network page you requested.
        </p>
        <button
          onClick={() => onNavigate('network')}
          className="px-8 py-4 bg-[#031636] text-white rounded-2xl font-black hover:bg-emerald-600 transition-colors"
        >
          Back to Networks
        </button>
      </div>
    );
  }

  const matchingBundles = bundles
    .filter((bundle) => bundle.network === network.name)
    .filter((bundle) => typeConfig.filter(bundle))
    .sort((a, b) => a.price - b.price);
  const hasPublishedRows = matchingBundles.length > 0;

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <NetworkPageTemplate
        network={network.name}
        bundleType={bundleTypeKey}
        seoData={{
          title: buildSeoTitle(network.name, bundleTypeKey),
          description: buildSeoDescription(network.name, bundleTypeKey, hasPublishedRows),
          keywords: [
            `${network.name.toLowerCase()} ${bundleTypeKey}`,
            `${network.name.toLowerCase()} data deals`,
            'south africa prepaid data'
          ],
          canonicalPath
        }}
        bundleData={matchingBundles}
        introText={getIntro(network.name, bundleTypeKey, hasPublishedRows)}
        networkInsight={getNetworkInsight(network.name, bundleTypeKey)}
        bestForItems={getBestFor(network.name, bundleTypeKey)}
        faqs={buildFaqs(network.name, bundleTypeKey, matchingBundles)}
      />
      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
    </div>
  );
};
