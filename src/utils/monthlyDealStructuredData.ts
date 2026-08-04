import type { MonthlyDataDealOffer } from '../data/monthlyDeals';
import {
  DEFAULT_OG_IMAGE_URL,
  SITE_EDITOR_BIO,
  SITE_EDITOR_NAME,
  SITE_EDITOR_ROLE,
  SITE_PRODUCT_NAME,
  SITE_URL
} from '../seo/siteConstants';
import { getDealOfferMetrics } from './monthlyDealRanking';

function buildOfferItem(offer: MonthlyDataDealOffer) {
  const metrics = getDealOfferMetrics(offer);
  const properties = [
    { '@type': 'PropertyValue', name: 'Pooled anytime data', value: `${offer.allocation.anytimeGb}GB` },
    { '@type': 'PropertyValue', name: 'Night data', value: `${offer.allocation.nightGb}GB` },
    { '@type': 'PropertyValue', name: 'Streaming-only data', value: `${offer.allocation.streamingGb}GB` },
    { '@type': 'PropertyValue', name: 'Social-only data', value: `${offer.allocation.socialGb}GB` },
    { '@type': 'PropertyValue', name: 'Validity', value: offer.validity.label },
    { '@type': 'PropertyValue', name: 'Billing', value: offer.billing === 'once_off' ? 'Once-off purchase' : 'Recurring monthly' },
    { '@type': 'PropertyValue', name: 'Purchase channels', value: offer.purchaseChannels.join(', ') },
    { '@type': 'PropertyValue', name: 'Official source checked', value: offer.source.checkedAt },
    {
      '@type': 'PropertyValue',
      name: 'Cost per anytime GB',
      value: metrics.costPerAnytimeGb === null ? 'Not comparable' : `R${metrics.costPerAnytimeGb.toFixed(2)}`
    },
    {
      '@type': 'PropertyValue',
      name: 'Cost per advertised GB',
      value: metrics.costPerAdvertisedGb === null ? 'Not comparable' : `R${metrics.costPerAdvertisedGb.toFixed(2)}`
    }
  ];

  for (const restricted of offer.allocation.otherRestricted) {
    properties.push({
      '@type': 'PropertyValue',
      name: restricted.label,
      value: `${restricted.gb}GB — ${restricted.restriction}`
    });
  }

  if (offer.allocation.conditionalBonusGb && offer.allocation.conditionalBonusNote) {
    properties.push({
      '@type': 'PropertyValue',
      name: 'Conditional bonus data',
      value: `${offer.allocation.conditionalBonusGb}GB — ${offer.allocation.conditionalBonusNote}`
    });
  }

  return {
    '@type': 'Service',
    name: offer.offerName,
    description: `${offer.advertisedDataLabel}. ${offer.eligibility}`,
    provider: {
      '@type': 'Organization',
      name: offer.providerName
    },
    areaServed: 'ZA',
    serviceType: 'Mobile data bundle',
    url: offer.source.url,
    additionalProperty: properties,
    offers: {
      '@type': 'Offer',
      url: offer.source.url,
      price: offer.priceZar.toFixed(2),
      priceCurrency: 'ZAR',
      category: offer.billing === 'once_off' ? 'Once-off data bundle' : 'Monthly mobile data'
    }
  };
}

export function buildMonthlyDealItemListSchema(
  name: string,
  canonicalUrl: string,
  offers: MonthlyDataDealOffer[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url: canonicalUrl,
    numberOfItems: offers.length,
    itemListElement: offers.map((offer, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: buildOfferItem(offer)
    }))
  };
}

export function buildMonthlyDealWinnerItemListSchema(
  name: string,
  canonicalUrl: string,
  offers: MonthlyDataDealOffer[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url: canonicalUrl,
    numberOfItems: offers.length,
    itemListElement: offers.map((offer, index) => {
      const metrics = getDealOfferMetrics(offer);
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: offer.offerName,
          provider: {
            '@type': 'Organization',
            name: offer.providerName
          },
          offers: {
            '@type': 'Offer',
            price: offer.priceZar.toFixed(2),
            priceCurrency: 'ZAR'
          },
          additionalProperty: {
            '@type': 'PropertyValue',
            name: 'Cost per anytime GB',
            value: metrics.costPerAnytimeGb === null ? 'Not comparable' : `R${metrics.costPerAnytimeGb.toFixed(2)}`
          }
        }
      };
    })
  };
}

export function buildMonthlyDealArticleSchema(options: {
  headline: string;
  description: string;
  canonicalUrl: string;
  datePublished: string;
  dateModified: string;
  sourceUrls: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.headline,
    description: options.description,
    url: options.canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': options.canonicalUrl },
    image: DEFAULT_OG_IMAGE_URL,
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    citation: options.sourceUrls,
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
      name: SITE_PRODUCT_NAME,
      url: SITE_URL
    }
  };
}
