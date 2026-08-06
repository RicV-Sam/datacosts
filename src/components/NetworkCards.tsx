import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Router, TowerControl, Signal, Globe, Zap, ArrowRight } from 'lucide-react';
import { NetworkName } from '../types';
import { networkMetadata, bundles } from '../data';
import { networkPages } from '../data/networks';
import { formatIsoForDisplay, getNetworkPageModifiedIso } from '../seo/contentDates';

interface NetworkCardProps {
  network: NetworkName;
  onViewDeals: (network: NetworkName) => void;
}

const NetworkIcon = ({ network, className }: { network: NetworkName; className?: string }) => {
  switch (network) {
    case 'Vodacom': return <Router className={className} />;
    case 'MTN': return <TowerControl className={className} />;
    case 'Telkom': return <Signal className={className} />;
    case 'Cell C': return <Globe className={className} />;
    case 'Rain': return <Zap className={className} />;
  }
};

export const NetworkCard: React.FC<NetworkCardProps & { hasLowestReviewedCostPerGb?: boolean }> = ({ network, onViewDeals, hasLowestReviewedCostPerGb }) => {
  const meta = networkMetadata[network];
  const allNetworkBundles = bundles.filter(b => b.network === network);
  const verifiedBundles = allNetworkBundles.filter(b => b.sourceConfidence === 'verified' && Boolean(b.lastVerified));
  const comparableAnytimeBundles = verifiedBundles.filter(
    b => b.productType === 'smartphone_once_off_data' || b.productType === 'smartphone_recurring_data'
  );
  const networkBundles = [...verifiedBundles, ...allNetworkBundles.filter(b => !verifiedBundles.includes(b))].slice(0, 2);
  const minCostPerGb = comparableAnytimeBundles.length > 0
    ? Math.min(...comparableAnytimeBundles.filter(b => b.costPerGb > 0).map(b => b.costPerGb))
    : Infinity;
  const minimumListedPrice = Math.min(...allNetworkBundles.map(b => b.price));
  const networkPage = Object.values(networkPages).find(p => p.networkName === network);
  const lastUpdated = networkPage ? formatIsoForDisplay(getNetworkPageModifiedIso(networkPage.slug)) : '';

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden group border border-white shadow-xl hover:shadow-2xl hover:border-[#a0f399]/30 transition-all duration-300 flex flex-col min-h-[400px]"
    >
      {hasLowestReviewedCostPerGb && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-[#a0f399] text-[#1b6d24] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            Lowest reviewed cost/GB
          </span>
        </div>
      )}
      <div
        className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"
        style={{ color: meta.color }}
      >
        <NetworkIcon network={network} className="w-32 h-32" />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg border border-white/20"
          style={{ backgroundColor: meta.color, color: meta.textColor }}
        >
          {meta.logoLetter}
        </div>
        <div>
          <h2 className="text-2xl font-black text-[#031636] tracking-tight">{network}</h2>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{verifiedBundles.length} verified · {allNetworkBundles.length} listed</span>
        </div>
      </div>

      <div className="space-y-6 flex-grow mb-8">
        {networkBundles.map(bundle => (
          <div key={bundle.id} className="flex justify-between items-center pb-3 border-b border-slate-50">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-bold mb-0.5">{bundle.name}</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                {bundle.volume} · {bundle.sourceConfidence === 'verified' ? 'Source checked' : 'Confirm live'}
              </span>
            </div>
            <span className="text-xl font-black text-[#031636]">R{bundle.price}</span>
          </div>
        ))}
        <div className="flex flex-col gap-1 py-3 px-4 bg-slate-50 rounded-xl border border-slate-100/50">
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider">Lowest Verified Anytime Cost/GB</span>
          <span className="text-2xl font-black text-[#1b6d24]">
            {network === 'Rain' ? 'Unlimited' : Number.isFinite(minCostPerGb) ? `R${minCostPerGb.toFixed(2)}` : 'N/A'}
          </span>
          {network === 'Rain' && (
            <span className="text-[10px] text-slate-400 font-bold uppercase">Listed from R{minimumListedPrice}/month</span>
          )}
        </div>
      </div>

      <div className="mb-6">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Updated: {lastUpdated}</span>
      </div>

      <a
        href={`/network/${networkPage?.slug || network.toLowerCase().replace(/[^a-z0-9]/g, '')}/`}
        onClick={(e) => { e.preventDefault(); onViewDeals(network); }}
        className="w-full py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2 group/btn transition-all active:scale-95 shadow-lg"
        style={{ backgroundColor: meta.color, color: meta.textColor }}
      >
        Compare {network} Data Prices
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );
};

export const NetworkCards: React.FC<{ onViewDeals: (network: NetworkName) => void }> = ({ onViewDeals }) => {
  const networks: NetworkName[] = ['Vodacom', 'MTN', 'Telkom', 'Cell C', 'Rain'];

  const lowestReviewedCostNetwork = useMemo(() => {
    const costs = networks.map(n => {
      const networkCosts = bundles
        .filter(
          b =>
            b.network === n &&
            (b.productType === 'smartphone_once_off_data' || b.productType === 'smartphone_recurring_data') &&
            b.sourceConfidence === 'verified' &&
            Boolean(b.lastVerified) &&
            b.costPerGb > 0
        )
        .map(b => b.costPerGb);
      return { network: n, minCost: networkCosts.length > 0 ? Math.min(...networkCosts) : Infinity };
    });
    return costs.sort((a, b) => a.minCost - b.minCost)[0]?.network;
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24" id="deals">
      {networks.map(network => (
        <NetworkCard
          key={network}
          network={network}
          onViewDeals={onViewDeals}
          hasLowestReviewedCostPerGb={network === lowestReviewedCostNetwork}
        />
      ))}
    </section>
  );
};
