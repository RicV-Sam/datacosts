import { Bundle, NetworkName } from '../types';
import { networkPages } from '../data/networks';
import { SITE_ORIGIN } from '../seo/siteConstants';

const BASE_URL = SITE_ORIGIN;
const DEFAULT_CATEGORY = 'Mobile Data Bundle';
const DEFAULT_AVAILABILITY = 'https://schema.org/InStock';

const networkImageByName: Record<NetworkName, string> = {
  Vodacom: `${BASE_URL}/images/networks/vodacom.svg`,
  MTN: `${BASE_URL}/images/networks/mtn.svg`,
  'Cell C': `${BASE_URL}/images/networks/cell-c.svg`,
  Telkom: `${BASE_URL}/images/networks/telkom.svg`,
  Rain: `${BASE_URL}/images/networks/rain.svg`
};

const networkSlugByName = Object.values(networkPages).reduce<Record<NetworkName, string>>((acc, page) => {
  acc[page.networkName] = page.slug;
  return acc;
}, {} as Record<NetworkName, string>);

export function getNetworkPageUrl(network: NetworkName): string {
  const slug = networkSlugByName[network];
  return `${BASE_URL}/network/${slug}/`;
}

export function getNetworkImageUrl(network: NetworkName): string {
  return networkImageByName[network];
}

function buildOffer(offerUrl: string, price: number, availability = DEFAULT_AVAILABILITY) {
  return {
    '@type': 'Offer',
    price: price.toFixed(2),
    priceCurrency: 'ZAR',
    availability,
    url: offerUrl
  };
}

function buildBundleComparisonEntitySchema(bundle: Bundle, itemUrl: string, availability = DEFAULT_AVAILABILITY) {
  return {
    '@type': 'Service',
    name: bundle.name,
    description: `Prepaid ${bundle.volume} mobile data bundle from ${bundle.network} in South Africa.`,
    provider: {
      '@type': 'Organization',
      name: bundle.network,
      url: getNetworkPageUrl(bundle.network)
    },
    areaServed: 'ZA',
    serviceType: 'Prepaid Mobile Data Bundle',
    image: getNetworkImageUrl(bundle.network),
    url: itemUrl,
    offers: buildOffer(itemUrl, bundle.price, availability)
  };
}

export function buildBundleProductSchema(
  bundle: Bundle,
  options?: {
    productUrl?: string;
    offerUrl?: string;
    description?: string;
    availability?: string;
  }
) {
  const productUrl = options?.productUrl || getNetworkPageUrl(bundle.network);
  const offerUrl = options?.offerUrl || productUrl;
  const availability = options?.availability || DEFAULT_AVAILABILITY;

  return {
    '@type': 'Product',
    name: bundle.name,
    description:
      options?.description ||
      `Compare the ${bundle.name} prepaid data bundle in South Africa, including price and cost per GB.`,
    image: getNetworkImageUrl(bundle.network),
    brand: {
      '@type': 'Brand',
      name: bundle.network
    },
    category: DEFAULT_CATEGORY,
    url: productUrl,
    offers: buildOffer(offerUrl, bundle.price, availability)
  };
}

export function buildBundleItemListSchema(
  name: string,
  url: string,
  bundles: Bundle[],
  getBundleUrl: (bundle: Bundle) => string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url,
    itemListElement: bundles.map((bundle, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: buildBundleComparisonEntitySchema(bundle, getBundleUrl(bundle))
    }))
  };
}
