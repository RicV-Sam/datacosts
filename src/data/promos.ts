export type PromoCategory = 'airtime' | 'data' | 'fibre' | 'bank-app' | 'retailer' | 'network';

export type PromoVerificationStatus = 'verified' | 'pending' | 'expired' | 'rejected';

export type Promo = {
  id: string;
  title: string;
  provider: string;
  promoType: string;
  category: PromoCategory;
  summary: string;
  verificationStatus: PromoVerificationStatus;
  sourceUrl?: string;
  termsUrl?: string;
  startDate?: string;
  endDate?: string;
  lastChecked?: string;
  notes?: string;
  isSponsored: boolean;
  displayPriority: number;
};

export const verifiedPromos: Promo[] = [];

export const promoWatchTypes = [
  'Recharge promos',
  'Retailer till promos',
  'SIM and RICA promos',
  'Bank app data offers',
  'Fibre installation and router promos',
  'Prepaid fibre voucher promos'
];
