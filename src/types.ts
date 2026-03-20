export interface Bundle {
  id: string;
  network: 'MTN' | 'Vodacom' | 'Telkom' | 'Cell C' | 'Rain';
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
  network: string;
  coverage: string;
  avgSpeed5G: string;
  resilience: string;
  pricePoint: string;
}
