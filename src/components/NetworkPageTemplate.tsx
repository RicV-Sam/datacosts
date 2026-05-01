import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { AdUnit } from './AdUnit';
import { NetworkName } from '../types';
import { DEFAULT_OG_IMAGE_URL, SITE_PRODUCT_NAME, toCanonicalUrl } from '../seo/siteConstants';

export type NetworkTemplateBundleType = 'weekly-data' | 'social-data' | 'night-data' | 'monthly-data' | string;

export interface NetworkTemplateBundle {
  name: string;
  price: number;
  data: string;
  validity: string;
}

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
  bundleData: NetworkTemplateBundle[];
  introText: string;
  networkInsight: string;
  bestForItems: string[];
  faqs: NetworkTemplateFAQ[];
}

type PreparedBundle = NetworkTemplateBundle & {
  costPerGb: number | null;
};

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

function parseDataToGb(volume: string): number | null {
  const cleaned = volume.trim().toUpperCase().replace(/\s+/g, '');
  const match = cleaned.match(/^(\d+(?:\.\d+)?)(MB|GB|TB)$/);
  if (!match) return null;

  const amount = Number(match[1]);
  const unit = match[2];
  if (Number.isNaN(amount) || amount <= 0) return null;

  if (unit === 'MB') return amount / 1024;
  if (unit === 'GB') return amount;
  if (unit === 'TB') return amount * 1024;
  return null;
}

function formatRand(value: number): string {
  return `R${value.toFixed(0)}`;
}

function formatCostPerGb(value: number | null): string {
  if (value === null || Number.isNaN(value) || value <= 0) return 'N/A';
  return `R${value.toFixed(2)}`;
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
        href: `/network/${networkSlug}/cheapest-1gb/`,
        label: `${network} cheapest 1GB`,
        description: 'Compare the smaller top-up path before buying a monthly bundle.'
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
  return links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function QuickAnswerCard({
  network,
  bundleTypeLabel,
  keyword,
  bundles
}: {
  network: NetworkName;
  bundleTypeLabel: string;
  keyword: string;
  bundles: PreparedBundle[];
}) {
  const cheapest = bundles[0];
  const prices = bundles.map((bundle) => bundle.price).sort((a, b) => a - b);
  const lowestPrice = prices[0];
  const highestPrice = prices[prices.length - 1];
  const priceRange = prices.length > 1 ? `${formatRand(lowestPrice)} to ${formatRand(highestPrice)}` : formatRand(lowestPrice);
  const cheapestLine = cheapest ? `${cheapest.name} at ${formatRand(cheapest.price)}.` : 'No matching bundles are currently listed.';

  return (
    <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-8" aria-label="Quick answer">
      <h2 className="text-2xl font-black tracking-tight text-emerald-900">
        Quick Answer: {network} {bundleTypeLabel} Data
      </h2>
      <p className="mt-3 text-slate-700 leading-relaxed">
        {network} {keyword} bundles are popular for users who need focused prepaid value without long commitments. {cheapestLine} Typical listed pricing ranges from {priceRange}, depending on active promotions and validity terms.
      </p>
    </section>
  );
}

export function BundleTable({ bundles }: { bundles: PreparedBundle[] }) {
  return (
    <section aria-label="Bundle comparison table">
      <h2 className="text-2xl font-black tracking-tight text-slate-900">Compare Bundle Prices and Value</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Bundle Name</th>
              <th scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Price</th>
              <th scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Data Volume</th>
              <th scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Validity</th>
              <th scope="col" className="px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500">Cost per GB</th>
            </tr>
          </thead>
          <tbody>
            {bundles.map((bundle) => (
              <tr key={`${bundle.name}-${bundle.validity}`} className="border-t border-slate-100">
                <td className="px-4 py-3 font-semibold text-slate-900">{bundle.name}</td>
                <td className="px-4 py-3 text-slate-700">{formatRand(bundle.price)}</td>
                <td className="px-4 py-3 text-slate-700">{bundle.data}</td>
                <td className="px-4 py-3 text-slate-700">{bundle.validity}</td>
                <td className="px-4 py-3 text-slate-700">{formatCostPerGb(bundle.costPerGb)}</td>
              </tr>
            ))}
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
  const keyword = `${bundleTypeLabel.toLowerCase()} data`;
  const canonicalUrl = toCanonicalUrl(seoData.canonicalPath);
  const title = seoData.title;
  const description = seoData.description;

  const preparedBundles = useMemo<PreparedBundle[]>(() => {
    return [...bundleData]
      .map((bundle) => {
        const volumeInGb = parseDataToGb(bundle.data);
        const costPerGb = volumeInGb && volumeInGb > 0 ? bundle.price / volumeInGb : null;
        return { ...bundle, costPerGb };
      })
      .sort((a, b) => a.price - b.price);
  }, [bundleData]);

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

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${network} ${bundleTypeLabel} data bundles`,
    itemListElement: preparedBundles.map((bundle, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: bundle.name,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'ZAR',
          price: bundle.price.toFixed(2)
        },
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Data volume', value: bundle.data },
          { '@type': 'PropertyValue', name: 'Validity', value: bundle.validity },
          { '@type': 'PropertyValue', name: 'Cost per GB', value: formatCostPerGb(bundle.costPerGb) }
        ]
      }
    }))
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-slate-900">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
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
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <header className="mb-8">
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">
          {network} {bundleTypeLabel} Data Deals (2026)
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">
          {introText}
        </p>
      </header>

      <AdUnit type="aboveFold" className="mb-8" />

      <div className="space-y-10">
        <QuickAnswerCard
          network={network}
          bundleTypeLabel={bundleTypeLabel}
          keyword={keyword}
          bundles={preparedBundles}
        />
        <BundleTable bundles={preparedBundles} />
        <AdUnit type="inContent" />
        <BestForSection bundleTypeLabel={bundleTypeLabel} points={bestForItems} />
        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            {network} {bundleTypeLabel} Insights for South Africa
          </h2>
          <p className="mt-3 text-slate-700 leading-relaxed">{networkInsight}</p>
        </section>
        <InternalLinks network={network} bundleType={bundleType} />
        <FAQSection faqs={faqs} />
      </div>

      <AdUnit type="inContent" className="mt-10" />
    </main>
  );
};
