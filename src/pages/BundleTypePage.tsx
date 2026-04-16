import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { bundles, networkMetadata } from '../data';
import { networkPages } from '../data/networks';
import { Footer } from '../components/Footer';
import { AdUnit } from '../components/AdUnit';
import { BUNDLE_TYPE_MAP } from '../config/routeCatalog';
import { NavigateFunction, NetworkName } from '../types';
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

function getIntro(network: NetworkName, bundleType: NetworkTemplateBundleType): string {
  const label = toBundleTypeLabel(bundleType).toLowerCase();
  return `Compare ${network} ${label} data deals in South Africa with a pricing table, bundle validity checks, and cost-per-GB context built for prepaid decision-making in 2026.`;
}

function getNetworkInsight(network: NetworkName, bundleType: NetworkTemplateBundleType): string {
  const typeHint: Record<string, string> = {
    'weekly-data': 'Weekly shoppers should verify current validity windows before assuming all 7-day bundles behave the same.',
    'social-data': 'Social bundle users should confirm which apps are zero-rated and where usage falls back to normal data.',
    'night-data': 'Night bundle buyers should always verify the exact start and end times for off-peak windows.',
    'monthly-data': 'Monthly buyers should compare once-off versus recurring options to avoid avoidable airtime drain.'
  };

  if (network === 'Vodacom') {
    return `Vodacom pricing can vary by subscriber profile through Just4You and app-led offers, so the listed ${toBundleTypeLabel(bundleType).toLowerCase()} menu is a baseline, not always your final checkout price. ${typeHint[bundleType] ?? ''}`.trim();
  }

  if (network === 'MTN') {
    return `MTN frequently personalizes bundle pricing through Made4U and campaign-specific channels, and social bundles can differ in how WhatsApp or chat usage is metered versus open internet traffic. ${typeHint[bundleType] ?? ''}`.trim();
  }

  if (network === 'Telkom') {
    return `Telkom often competes on prepaid value, but bundle behavior depends on local coverage quality and, for night offers, Night Surfer-style usage windows that do not mirror anytime data behavior. ${typeHint[bundleType] ?? ''}`.trim();
  }

  if (network === 'Cell C') {
    return `Cell C value is usually promotion-led, so weekly and social pricing can shift quickly between campaigns; users should validate active offers before topping up and avoid assuming older menus are still live. ${typeHint[bundleType] ?? ''}`.trim();
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

function buildFaqs(network: NetworkName, bundleType: NetworkTemplateBundleType, cheapestName: string): NetworkTemplateFAQ[] {
  const label = toBundleTypeLabel(bundleType).toLowerCase();
  const hasSocial = bundleType === 'social-data';
  const hasNight = bundleType === 'night-data';

  return [
    {
      question: `What is the cheapest ${network} ${label} data bundle?`,
      answer: cheapestName
        ? `Based on the latest listed dataset on this page, ${cheapestName} is currently the lowest priced ${network} ${label} option.`
        : `No clearly matched ${network} ${label} bundle is currently available in this dataset.`
    },
    {
      question: `How should I compare ${network} ${label} bundles?`,
      answer: 'Compare total price, validity, and cost per GB together so you do not overpay on short-validity offers with attractive headline pricing.'
    },
    {
      question: `Does ${network} social data include WhatsApp?`,
      answer: hasSocial
        ? `Many ${network} social bundles include WhatsApp, but inclusions can change by campaign, so verify app coverage before purchase.`
        : `For social-specific access, check the dedicated ${network} social data page where app inclusion terms are tracked separately.`
    },
    {
      question: `When can I use ${network} night data?`,
      answer: hasNight
        ? `${network} night data is generally restricted to defined off-peak windows, so confirm the current usage hours on official channels before buying.`
        : `Night data usually works only during off-peak windows; use the ${network} night-data page when planning overnight usage.`
    }
  ];
}

function buildSeoTitle(network: NetworkName, bundleType: NetworkTemplateBundleType): string {
  const label = toBundleTypeLabel(bundleType);
  return `${network} ${label} Data Deals (2026) | DataCost SA`;
}

function buildSeoDescription(network: NetworkName, bundleType: NetworkTemplateBundleType): string {
  const label = toBundleTypeLabel(bundleType).toLowerCase();
  return `Compare ${network} ${label} data deals in South Africa with live pricing, validity, and cost per GB insights. Find the cheapest options for 2026 prepaid buyers.`;
}

export const BundleTypePage: React.FC<BundleTypePageProps> = ({ onNavigate, onScrollTo }) => {
  const { networkSlug, bundleType } = useParams<{ networkSlug: string; bundleType: string }>();
  const networkData = networkSlug ? networkPages[networkSlug] : null;
  const network = networkData ? networkMetadata[networkData.networkName] : null;
  const bundleTypeKey = (bundleType ?? '') as NetworkTemplateBundleType;
  const typeConfig = BUNDLE_TYPE_MAP[bundleTypeKey];

  if (!network || !networkSlug || !typeConfig || !SUPPORTED_BUNDLE_TYPES.has(bundleTypeKey)) {
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

  const bundleData = matchingBundles.map((bundle) => ({
    name: bundle.name,
    price: bundle.price,
    data: bundle.volume,
    validity: bundle.validity
  }));

  const cheapestName = bundleData[0]?.name ?? '';

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <NetworkPageTemplate
        network={network.name}
        bundleType={bundleTypeKey}
        seoData={{
          title: buildSeoTitle(network.name, bundleTypeKey),
          description: buildSeoDescription(network.name, bundleTypeKey),
          keywords: [
            `${network.name.toLowerCase()} ${bundleTypeKey}`,
            `${network.name.toLowerCase()} data deals`,
            'south africa prepaid data'
          ],
          canonicalPath: `/network/${networkSlug}/${bundleTypeKey}/`
        }}
        bundleData={bundleData}
        introText={getIntro(network.name, bundleTypeKey)}
        networkInsight={getNetworkInsight(network.name, bundleTypeKey)}
        bestForItems={getBestFor(network.name, bundleTypeKey)}
        faqs={buildFaqs(network.name, bundleTypeKey, cheapestName)}
      />
      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <AdUnit type="stickyMobile" />
    </div>
  );
};
