import { fingerprintMaterialClaim } from './wp1LegacyManifest';

export const WP1_EVIDENCE_FINGERPRINT_PROJECTION_VERSION = 'wp1-release-a.6-projection-v1' as const;

export type EvidenceSubjectOwner =
  | 'ussd_repository'
  | 'price_collection'
  | 'promotion_collection'
  | 'device_collection'
  | 'problem_guides';

type SemanticRecord = Readonly<Record<string, unknown>>;

/**
 * USSD identity is the stable repository ID, operator, purpose, dial code and
 * dialability. Explanation and note text are presentation/editorial fields.
 */
export function projectUssdSubject(record: SemanticRecord): SemanticRecord {
  return {
    id: record.id,
    network: record.network,
    category: record.category,
    action: record.action,
    code: record.code,
    dialable: record.dialable ?? null
  };
}

/**
 * Price identity includes the product key, operator, amount (ZAR unless an
 * explicit currency is introduced), allowance and validity/product category.
 * Display names, marketing copy, source labels and calculated cost-per-GB are
 * deliberately excluded.
 */
export function projectPriceSubject(record: SemanticRecord): SemanticRecord {
  return {
    id: record.id,
    slug: record.slug,
    network: record.network,
    price: record.price,
    currency: record.currency ?? 'ZAR',
    volume: record.volume,
    validity: record.validity,
    type: record.type,
    anytimeData: record.anytimeData,
    nightData: record.nightData ?? null,
    productType: record.productType ?? null,
    nightWindow: record.nightWindow ?? null
  };
}

/** Promotion dates remain governed by the source/freshness layer. */
export function projectPromotionSubject(record: SemanticRecord): SemanticRecord {
  return {
    id: record.id,
    provider: record.provider,
    promoType: record.promoType,
    category: record.category
  };
}

/** Device authority is tied to the diagnostic identity and owned category. */
export function projectDeviceSubject(record: SemanticRecord): SemanticRecord {
  return {
    id: record.id,
    slug: record.slug,
    cluster: record.cluster,
    provider: record.provider ?? null,
    serviceType: record.serviceType
  };
}

/**
 * Problem guides use their stable claim slug. Fixed operator facts use the
 * operator and fixed claim scope. All visible guide text and ordering is
 * presentation-only for authority purposes.
 */
export function projectProblemGuideSubject(record: SemanticRecord): SemanticRecord {
  if (typeof record.operator === 'string') {
    return {
      operator: record.operator,
      claimScope: record.claimScope
    };
  }
  return { slug: record.slug };
}

const OWNER_KIND = Object.freeze({
  ussd_repository: 'ussd_code',
  price_collection: 'price',
  promotion_collection: 'promotion',
  device_collection: 'device_step',
  problem_guides: 'evergreen_fact'
} as const);

export function fingerprintEvidenceSubject(owner: EvidenceSubjectOwner, record: SemanticRecord): string {
  const claim = owner === 'ussd_repository'
    ? projectUssdSubject(record)
    : owner === 'price_collection'
      ? projectPriceSubject(record)
      : owner === 'promotion_collection'
        ? projectPromotionSubject(record)
        : owner === 'device_collection'
          ? projectDeviceSubject(record)
          : projectProblemGuideSubject(record);

  return fingerprintMaterialClaim({
    projectionVersion: WP1_EVIDENCE_FINGERPRINT_PROJECTION_VERSION,
    owner,
    kind: OWNER_KIND[owner],
    claim
  });
}
