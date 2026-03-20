import { Bundle, NetworkStats } from './types';

export const bundles: Bundle[] = [
  {
    id: 'mtn-monthly-50gb',
    network: 'MTN',
    name: 'MTN Monthly 50GB',
    price: 299,
    volume: '50GB',
    validity: '30 Days',
    type: 'Monthly',
    anytimeData: '25GB',
    nightData: '25GB',
    costPerGb: 5.98,
    isBestValue: true,
  },
  {
    id: 'mtn-monthly-10gb',
    network: 'MTN',
    name: 'MTN Monthly 10GB',
    price: 149,
    volume: '10GB',
    validity: '30 Days',
    type: 'Monthly',
    anytimeData: '10GB',
    costPerGb: 14.90,
  },
  {
    id: 'voda-monthly-20gb',
    network: 'Vodacom',
    name: 'Vodacom 20GB Anytime',
    price: 299,
    volume: '20GB',
    validity: '30 Days',
    type: 'Monthly',
    anytimeData: '20GB',
    costPerGb: 14.95,
    isSpeedKing: true,
  },
  {
    id: 'voda-monthly-10gb',
    network: 'Vodacom',
    name: 'Vodacom 10GB Anytime',
    price: 199,
    volume: '10GB',
    validity: '30 Days',
    type: 'Monthly',
    anytimeData: '10GB',
    costPerGb: 19.90,
  },
  {
    id: 'telkom-prepaid-20gb',
    network: 'Telkom',
    name: 'Telkom 20GB Prepaid',
    price: 99,
    volume: '20GB',
    validity: '30 Days',
    type: 'Prepaid',
    anytimeData: '20GB',
    costPerGb: 4.95,
  },
  {
    id: 'cellc-monthly-10gb',
    network: 'Cell C',
    name: 'Cell C 10GB Monthly',
    price: 129,
    volume: '10GB',
    validity: '30 Days',
    type: 'Monthly',
    anytimeData: '10GB',
    costPerGb: 12.90,
  },
  {
    id: 'rain-unlimited-4g',
    network: 'Rain',
    name: 'Rain Unlimited 4G',
    price: 479,
    volume: 'Unlimited',
    validity: '30 Days',
    type: 'Monthly',
    anytimeData: 'Unlimited',
    costPerGb: 0,
  },
];

export interface USSDCode {
  network: string;
  purpose: string;
  code: string;
  category: 'Balance' | 'Data' | 'Settings' | 'Other';
}

export const ussdCodes: USSDCode[] = [
  { network: 'Vodacom', purpose: 'Check Balance', code: '*135#', category: 'Balance' },
  { network: 'Vodacom', purpose: 'Buy Data', code: '*135*2#', category: 'Data' },
  { network: 'Vodacom', purpose: 'Transfer Data', code: '*135*1002#', category: 'Data' },
  { network: 'Vodacom', purpose: 'Check My Number', code: '*135*501#', category: 'Other' },
  { network: 'MTN', purpose: 'Check Balance', code: '*136#', category: 'Balance' },
  { network: 'MTN', purpose: 'Buy Data', code: '*136*2#', category: 'Data' },
  { network: 'MTN', purpose: 'Transfer Data', code: '*136*3#', category: 'Data' },
  { network: 'MTN', purpose: 'Check My Number', code: '*123*888#', category: 'Other' },
  { network: 'Telkom', purpose: 'Check Balance', code: '*188#', category: 'Balance' },
  { network: 'Telkom', purpose: 'Buy Data', code: '*180#', category: 'Data' },
  { network: 'Cell C', purpose: 'Check Balance', code: '*101#', category: 'Balance' },
  { network: 'Cell C', purpose: 'Buy Data', code: '*147#', category: 'Data' },
  { network: 'Rain', purpose: 'Check Balance', code: 'N/A (App only)', category: 'Balance' },
];

export const networkStats: NetworkStats[] = [
  {
    network: 'Vodacom',
    coverage: '99.8% (Gold Standard)',
    avgSpeed5G: '160 Mbps',
    resilience: 'High investment in backup',
    pricePoint: 'Premium pricing',
  },
  {
    network: 'MTN',
    coverage: '99.2% (Excellent)',
    avgSpeed5G: '145 Mbps',
    resilience: 'Aggressive Battery Rollout',
    pricePoint: 'Aggressive Promos',
  },
  {
    network: 'Telkom',
    coverage: '95% (Good in Cities)',
    avgSpeed5G: '110 Mbps',
    resilience: 'Moderate backup infrastructure',
    pricePoint: 'Budget Friendly',
  },
  {
    network: 'Cell C',
    coverage: '96% (Roaming on MTN)',
    avgSpeed5G: '90 Mbps',
    resilience: 'Dependent on partners',
    pricePoint: 'Value focused',
  },
  {
    network: 'Rain',
    coverage: 'Urban Metros only',
    avgSpeed5G: '200 Mbps+',
    resilience: 'High (Newer infrastructure)',
    pricePoint: 'Unlimited Fixed-LTE',
  },
];
