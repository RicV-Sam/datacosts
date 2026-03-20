import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Youtube, Instagram, MessageCircle, Globe, Info } from 'lucide-react';
import { bundles } from '../data';

const USAGE_RATES = {
  video: 1.5, // GB per hour (HD)
  social: 0.2, // GB per hour
  chat: 0.05, // GB per hour
  web: 0.1, // GB per hour
};

export const DataCalculator: React.FC = () => {
  const [usage, setUsage] = useState({
    video: 0,
    social: 0,
    chat: 0,
    web: 0,
  });

  const totalDataNeeded = useMemo(() => {
    const daily = 
      usage.video * USAGE_RATES.video +
      usage.social * USAGE_RATES.social +
      usage.chat * USAGE_RATES.chat +
      usage.web * USAGE_RATES.web;
    return daily * 30; // Monthly
  }, [usage]);

  const recommendedBundle = useMemo(() => {
    return bundles
      .filter(b => {
        const vol = parseInt(b.volume.replace('GB', ''));
        return vol >= totalDataNeeded;
      })
      .sort((a, b) => a.price - b.price)[0];
  }, [totalDataNeeded]);

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
        </div>

        <div className="bg-slate-50 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
          <div className="mb-6">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block">Estimated Monthly Need</span>
            <div className="text-6xl font-black text-[#031636] tracking-tighter">
              {totalDataNeeded.toFixed(1)}<span className="text-2xl ml-1">GB</span>
            </div>
          </div>

          {recommendedBundle ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={recommendedBundle.id}
              className="w-full bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-[#217128] bg-[#a0f399]/20 px-2 py-0.5 rounded uppercase">Best Fit</span>
                <span className="text-sm font-black text-[#031636]">{recommendedBundle.network}</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-1">{recommendedBundle.name}</h4>
              <div className="text-2xl font-black text-[#031636] mb-4">R{recommendedBundle.price}</div>
              <button className="w-full bg-[#031636] text-white py-3 rounded-full text-sm font-bold hover:opacity-90 transition-opacity">
                Get This Deal
              </button>
            </motion.div>
          ) : (
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Info className="w-4 h-4" />
              <span>Adjust sliders to see recommendations</span>
            </div>
          )}
        </div>
      </div>
    </div>
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
