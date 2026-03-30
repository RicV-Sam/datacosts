import React from 'react';

export type AlertTypeKey =
  | 'cheapest_data_deals'
  | 'airtime_specials'
  | 'verified_competitions'
  | 'network_updates'
  | 'useful_ussd_tools';

export type NetworkKey = 'mtn' | 'vodacom' | 'cellc' | 'telkom' | 'all_networks';
export type AlertFrequency = 'instant_alerts' | 'weekly_digest' | 'major_deals_only';

export interface AlertsPreferenceState {
  alertTypes: AlertTypeKey[];
  networks: NetworkKey[];
  frequency: AlertFrequency;
}

interface AlertsPreferencesProps {
  value: AlertsPreferenceState;
  onChange: (next: AlertsPreferenceState) => void;
}

const alertTypeOptions: Array<{ key: AlertTypeKey; label: string }> = [
  { key: 'cheapest_data_deals', label: 'Cheapest data deals' },
  { key: 'airtime_specials', label: 'Airtime specials' },
  { key: 'verified_competitions', label: 'Verified competitions' },
  { key: 'network_updates', label: 'Network updates' },
  { key: 'useful_ussd_tools', label: 'Useful USSD tools' }
];

const networkOptions: Array<{ key: NetworkKey; label: string }> = [
  { key: 'mtn', label: 'MTN' },
  { key: 'vodacom', label: 'Vodacom' },
  { key: 'cellc', label: 'Cell C' },
  { key: 'telkom', label: 'Telkom' },
  { key: 'all_networks', label: 'All networks' }
];

const frequencyOptions: Array<{ key: AlertFrequency; label: string }> = [
  { key: 'instant_alerts', label: 'Instant alerts' },
  { key: 'weekly_digest', label: 'Weekly digest' },
  { key: 'major_deals_only', label: 'Only major deals' }
];

function toggleArrayValue<T extends string>(items: T[], target: T): T[] {
  return items.includes(target) ? items.filter((item) => item !== target) : [...items, target];
}

export const AlertsPreferences: React.FC<AlertsPreferencesProps> = ({ value, onChange }) => {
  const updateAlertType = (key: AlertTypeKey) => {
    onChange({ ...value, alertTypes: toggleArrayValue(value.alertTypes, key) });
  };

  const updateNetworks = (key: NetworkKey) => {
    if (key === 'all_networks') {
      const isSelected = value.networks.includes('all_networks');
      onChange({ ...value, networks: isSelected ? [] : ['all_networks'] });
      return;
    }

    const withoutAll = value.networks.filter((network) => network !== 'all_networks');
    const nextNetworks = toggleArrayValue(withoutAll, key);
    onChange({ ...value, networks: nextNetworks });
  };

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black tracking-tight text-slate-900">Choose What You Want Alerts For</h2>

      <div className="mt-5">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Alert Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {alertTypeOptions.map((option) => {
            const isActive = value.alertTypes.includes(option.key);
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => updateAlertType(option.key)}
                className={`min-h-[44px] rounded-xl border px-3 text-left text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-[#1b6d24] border-[#1b6d24] text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-[#1b6d24] hover:text-[#1b6d24]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Networks</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {networkOptions.map((option) => {
            const isActive = value.networks.includes(option.key);
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => updateNetworks(option.key)}
                className={`min-h-[44px] rounded-xl border px-3 text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-[#031636] border-[#031636] text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-[#031636] hover:text-[#031636]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Frequency</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {frequencyOptions.map((option) => {
            const isActive = value.frequency === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => onChange({ ...value, frequency: option.key })}
                className={`min-h-[44px] rounded-xl border px-3 text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-[#0f6a7a] border-[#0f6a7a] text-white'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-[#0f6a7a] hover:text-[#0f6a7a]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

