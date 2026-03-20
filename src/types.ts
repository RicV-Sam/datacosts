export type NetworkName = 'MTN' | 'Vodacom' | 'Telkom' | 'Cell C' | 'Rain';

export interface Bundle {
  id: string;
  network: NetworkName;
  name: string;
  price: number;
  volume: string; // e.g. "10GB"
  validity: string; // e.g. "30 Days"
  type: 'Prepaid' | 'Contract' | 'Monthly' | 'Weekly' | 'Daily';
  anytimeData: string;
  nightData?: string;
  costPerGb: number;
  isBestValue?: boolean;
  isSpeedKing?: boolean;
}

export interface NetworkStats {
  network: NetworkName;
  coverage: string;
  avgSpeed5G: string;
  resilience: string;
  pricePoint: string;
}

export interface NetworkMetadata {
  name: NetworkName;
  color: string;
  textColor: string;
  logoLetter: string;
  description: string;
  ussdBalance: string;
}
