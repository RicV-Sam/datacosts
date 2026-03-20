import React from 'react';
import { Globe, Gauge, BatteryCharging, Banknote, ShieldCheck } from 'lucide-react';
import { networkStats } from '../data';
import { motion } from 'motion/react';

export const Scorecard: React.FC = () => {
  return (
    <section className="mb-24" id="scorecard">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 bg-[#a0f399]/20 rounded-2xl flex items-center justify-center text-[#217128]">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-4xl font-black text-[#031636] tracking-tight">Independent Scorecard</h3>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Benchmark comparison for Q1 2026</p>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-4 md:p-8 border border-white shadow-2xl overflow-x-auto">
        <div className="min-w-[800px] lg:min-w-0">
          <div className="hidden lg:grid grid-cols-6 gap-6 mb-8 px-6 py-6 bg-slate-50/50 rounded-2xl border border-slate-100">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Network Metric</div>
            {networkStats.map(stat => (
              <div key={stat.network} className="text-[10px] font-black uppercase tracking-[0.2em] text-[#031636] text-center">{stat.network}</div>
            ))}
          </div>

        <div className="space-y-6">
          {/* Coverage */}
          <MetricRow
            label="Coverage"
            icon={<Globe className="w-5 h-5" />}
            stats={networkStats.map(s => ({ network: s.network, value: s.coverage }))}
          />
          {/* Speed */}
          <MetricRow
            label="Avg. 5G"
            icon={<Gauge className="w-5 h-5" />}
            stats={networkStats.map(s => ({ network: s.network, value: s.avgSpeed5G }))}
            highlight="160 Mbps"
          />
          {/* Resilience */}
          <MetricRow
            label="Resilience"
            icon={<BatteryCharging className="w-5 h-5" />}
            stats={networkStats.map(s => ({ network: s.network, value: s.resilience }))}
          />
          {/* Cost */}
          <MetricRow
            label="Price Point"
            icon={<Banknote className="w-5 h-5" />}
            stats={networkStats.map(s => ({ network: s.network, value: s.pricePoint }))}
          />
        </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            *Cell C roams on MTN/Vodacom infrastructure in most areas.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1b6d24]" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Market Leader</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Budget King</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MetricRow: React.FC<{
  label: string;
  icon: React.ReactNode;
  stats: { network: string; value: string }[];
  highlight?: string;
}> = ({ label, icon, stats, highlight }) => (
  <div className="group grid grid-cols-1 lg:grid-cols-6 gap-4 px-6 py-6 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
    <div className="flex items-center gap-4">
      <div className="p-2.5 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-[#031636] transition-colors border border-slate-50">
        {icon}
      </div>
      <span className="font-black text-[#031636] tracking-tight">{label}</span>
    </div>
    {stats.map(stat => (
      <div key={stat.network} className="flex lg:flex-col lg:items-center justify-between lg:justify-center px-4 py-3 lg:p-0 bg-slate-50/50 lg:bg-transparent rounded-xl lg:rounded-none">
        <span className="text-[10px] lg:hidden font-black text-slate-400 uppercase tracking-widest">{stat.network}</span>
        <span className={`text-sm font-bold ${stat.value === highlight ? 'text-[#1b6d24]' : 'text-slate-600'}`}>
          {stat.value}
        </span>
      </div>
    ))}
  </div>
);
