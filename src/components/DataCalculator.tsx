import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Youtube, Instagram, MessageCircle, Globe, Info, Zap, TrendingDown, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { bundles, networkMetadata } from '../data';
import { Bundle } from '../types';

const USAGE_RATES = {
  video: 1.5, // GB per hour (HD)
  social: 0.2, // GB per hour
  chat: 0.05, // GB per hour
  web: 0.1, // GB per hour
};

export const DataCalculator: React.FC = () => {
  const [usage, setUsage] = useState({
    video: 1,
    social: 2,
    chat: 1,
    web: 1,
  });
  const [useCase, setUseCase] = useState<'mobile' | 'home'>('mobile');
  const [currentSpend, setCurrentSpend] = useState<number | ''>('');
  const [showMethodology, setShowMethodology] = useState(false);

  const totalDataNeeded = useMemo(() => {
    const daily = 
      usage.video * USAGE_RATES.video +
      usage.social * USAGE_RATES.social +
      usage.chat * USAGE_RATES.chat +
      usage.web * USAGE_RATES.web;
    return daily * 30; // Monthly
  }, [usage]);

  const recommendations = useMemo(() => {
    const validBundles = bundles.filter(b => {
      if (b.volume === 'Unlimited') return true;
      const vol = parseInt(b.volume.replace('GB', ''));
      return vol >= totalDataNeeded;
    });

    if (validBundles.length === 0) return null;

    const filteredBundles = validBundles.filter(b => {
      const isFixed = networkMetadata[b.network].type === 'fixed';
      // Deprioritize Rain (fixed) for "mobile" use case unless "heavy usage" (> 20GB) and "home" is selected
      if (useCase === 'mobile' && isFixed) return false;
      return true;
    });

    // If no bundles left after filtering (e.g., only Rain was valid but excluded), fallback to all valid but mark Rain as lower
    const bundlesToRank = filteredBundles.length > 0 ? filteredBundles : validBundles;

    // Best Value (lowest cost per GB)
    const bestValue = [...bundlesToRank].sort((a, b) => {
      const aCost = a.volume === 'Unlimited' ? 0.01 : a.costPerGb;
      const bCost = b.volume === 'Unlimited' ? 0.01 : b.costPerGb;
      return aCost - bCost;
    })[0];

    // Cheapest (absolute lowest price)
    const cheapest = [...bundlesToRank].sort((a, b) => a.price - b.price)[0];

    // Heavy User Recommend (if usage > 50GB)
    const heavyUser = totalDataNeeded > 50
      ? validBundles.find(b => b.volume === 'Unlimited')
      : null;

    let savings = 0;
    if (typeof currentSpend === 'number' && cheapest) {
      savings = Math.max(0, currentSpend - cheapest.price);
    }

    return { bestValue, cheapest, heavyUser, savings };
  }, [totalDataNeeded, currentSpend, useCase]);

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-white shadow-xl hover:shadow-2xl transition-all duration-300" id="calculator">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#031636] rounded-xl flex items-center justify-center text-white">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-black text-[#031636]">Data Usage Calculator</h3>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Estimate your monthly needs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">How do you mainly use your data?</span>
            <div className="flex gap-2">
              <button
                onClick={() => setUseCase('mobile')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  useCase === 'mobile'
                    ? 'bg-[#031636] text-white shadow-lg'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>📱</span> On the go
              </button>
              <button
                onClick={() => setUseCase('home')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  useCase === 'home'
                    ? 'bg-[#031636] text-white shadow-lg'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>🏠</span> Mostly at home
              </button>
            </div>
          </div>

          <UsageSlider 
            label="Video Streaming (HD)" 
            icon={<Youtube className="w-4 h-4" />} 
            value={usage.video} 
            onChange={(v) => setUsage(prev => ({ ...prev, video: v }))}
            unit="hrs/day"
            max={10}
          />
          <UsageSlider 
            label="Social Media" 
            icon={<Instagram className="w-4 h-4" />} 
            value={usage.social} 
            onChange={(v) => setUsage(prev => ({ ...prev, social: v }))}
            unit="hrs/day"
            max={10}
          />
          <UsageSlider 
            label="Messaging & Chat" 
            icon={<MessageCircle className="w-4 h-4" />} 
            value={usage.chat} 
            onChange={(v) => setUsage(prev => ({ ...prev, chat: v }))}
            unit="hrs/day"
            max={10}
          />
          <UsageSlider 
            label="Web Browsing" 
            icon={<Globe className="w-4 h-4" />} 
            value={usage.web} 
            onChange={(v) => setUsage(prev => ({ ...prev, web: v }))}
            unit="hrs/day"
            max={10}
          />

          <div className="pt-6 border-t border-slate-100">
            <label className="block text-sm font-bold text-slate-700 mb-2">
              I currently pay (R/month)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R</span>
              <input
                type="number"
                placeholder="0"
                value={currentSpend}
                onChange={(e) => setCurrentSpend(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a0f399] font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block">Estimated Monthly Need</span>
            <div className="text-6xl font-black text-[#031636] tracking-tighter">
              {totalDataNeeded.toFixed(1)}<span className="text-2xl ml-1">GB</span>
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {recommendations ? (
                <>
                  {recommendations.savings > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#a0f399] p-4 rounded-xl text-[#1b6d24] text-center mb-4 border border-[#1b6d24]/20"
                    >
                      <p className="text-xs font-black uppercase tracking-widest mb-1">Potential Monthly Saving</p>
                      <p className="text-3xl font-black">R{recommendations.savings.toFixed(2)}</p>
                      <p className="text-[10px] font-bold mt-1">By switching to {recommendations.cheapest.network}</p>
                    </motion.div>
                  )}
                  <RecommendationCard
                    type="Cheapest Option"
                    bundle={recommendations.cheapest}
                    icon={<TrendingDown className="w-3.5 h-3.5" />}
                    color="blue"
                    showFixedLabel={networkMetadata[recommendations.cheapest.network].type === 'fixed'}
                  />
                  {recommendations.bestValue.id !== recommendations.cheapest.id && (
                    <RecommendationCard
                      type="Best Value Option"
                      bundle={recommendations.bestValue}
                      icon={<Star className="w-3.5 h-3.5" />}
                      color="green"
                      showFixedLabel={networkMetadata[recommendations.bestValue.network].type === 'fixed'}
                    />
                  )}
                  {recommendations.heavyUser && (
                    <RecommendationCard
                      type="Recommended for Heavy Users"
                      bundle={recommendations.heavyUser}
                      icon={<Zap className="w-3.5 h-3.5" />}
                      color="orange"
                      showFixedLabel={networkMetadata[recommendations.heavyUser.network].type === 'fixed'}
                    />
                  )}
                  {networkMetadata[recommendations.cheapest.network].type === 'fixed' && (
                    <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl mt-4">
                      <p className="text-[10px] font-bold text-blue-700 leading-tight italic">
                        This option is best for home use and may not suit on-the-go usage.
                      </p>
                    </div>
                  )}
                  <p className="text-[10px] text-slate-500 font-medium mt-4 italic leading-relaxed">
                    {recommendations.cheapest.network} gives you {recommendations.cheapest.volume} for R{recommendations.cheapest.price}
                    {recommendations.cheapest.volume !== 'Unlimited' && `, which is R${recommendations.cheapest.costPerGb.toFixed(2)} per GB`}.
                  </p>
                </>
              ) : (
                <div className="flex items-center gap-2 text-slate-400 text-sm justify-center py-8">
                  <Info className="w-4 h-4" />
                  <span>Adjust sliders to see recommendations</span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="mt-12 pt-8 border-t border-slate-100">
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="flex items-center gap-2 text-slate-500 hover:text-[#031636] transition-colors"
        >
          {showMethodology ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          <span className="text-sm font-bold uppercase tracking-widest">How we calculate results</span>
        </button>

        <AnimatePresence>
          {showMethodology && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xs font-black text-[#031636] uppercase mb-2">Usage Estimation</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We use industry-standard averages for data consumption: HD Video (~1.5GB/hr), Social Media (~200MB/hr), and basic web browsing/messaging.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#031636] uppercase mb-2">Cost Logic</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    "Cheapest" is the absolute lowest price for a bundle that meets your data needs. "Best Value" prioritizes the lowest cost per GB.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#031636] uppercase mb-2">Data Sources</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Pricing is pulled directly from network provider websites and updated daily. We only include standard prepaid and monthly bundles.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const RecommendationCard: React.FC<{
  type: string;
  bundle: Bundle;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'orange';
  showFixedLabel?: boolean;
}> = ({ type, bundle, icon, color, showFixedLabel }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-[#a0f399]/20 text-[#217128] border-[#a0f399]/30',
    orange: 'bg-orange-50 text-orange-700 border-orange-100',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col gap-1">
          <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full uppercase border ${colorClasses[color]} w-fit`}>
            {icon} {type}
          </span>
          {showFixedLabel && (
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-600 uppercase tracking-wider w-fit">
              🏠 Best for home use
            </span>
          )}
        </div>
        <span className="text-xs font-black text-[#031636]">{bundle.network}</span>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <h4 className="font-bold text-slate-900 text-sm leading-tight">{bundle.name}</h4>
          <span className="text-[10px] text-slate-500 font-medium">{bundle.volume} • {bundle.validity}</span>
        </div>
        <div className="text-xl font-black text-[#031636]">R{bundle.price}</div>
      </div>
    </motion.div>
  );
};

const UsageSlider: React.FC<{
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (v: number) => void;
  unit: string;
  max: number;
}> = ({ label, icon, value, onChange, unit, max }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 text-slate-700">
        {icon}
        <span className="text-sm font-bold">{label}</span>
      </div>
      <span className="text-xs font-bold text-[#031636]">{value} {unit}</span>
    </div>
    <input 
      type="range" 
      min="0" 
      max={max} 
      step="0.5"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#031636]"
    />
  </div>
);
