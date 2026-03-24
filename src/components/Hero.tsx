import React from 'react';
import { BadgeCheck, Info, ArrowRight, Calculator, Phone } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  return (
    <section className="mb-16 pt-8 md:pt-16" id="home">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-12">
        <div className="max-w-2xl relative text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#a0f399]/20 text-[#217128] rounded-full mb-6 border border-[#a0f399]/30"
          >
            <BadgeCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Independent Analysis • Updated Daily</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tighter text-[#031636] leading-[0.95] md:leading-[0.85] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#031636] to-[#1b6d24]"
          >
            Find the Cheapest Data in South Africa — Right Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg md:text-xl max-w-lg leading-relaxed font-medium mx-auto md:mx-0"
          >
            Compare MTN, Vodacom, Telkom, Cell C & Rain. Updated regularly.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative group shrink-0 hidden md:block"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b6d24] to-[#a0f399] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity rounded-3xl" />
          <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-white/50 flex flex-col items-center justify-center text-center min-w-[240px]">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 block">Avg. 10GB Cost</span>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-[#031636]">R149</span>
              <span className="text-sm font-bold text-[#1b6d24]">-12% YoY</span>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-50 w-full flex items-center justify-center gap-2 text-slate-500">
              <Info className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">March 2026 Benchmark</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <button
          onClick={() => onScrollTo('deals')}
          className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#a0f399]/50 transition-all group text-left min-h-[44px]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <ArrowRight className="w-5 h-5" />
            </div>
            <span className="font-bold text-[#031636]">Compare Prices</span>
          </div>
        </button>

        <button
          onClick={() => onScrollTo('calculator')}
          className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#a0f399]/50 transition-all group text-left min-h-[44px]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#a0f399]/20 rounded-xl flex items-center justify-center text-[#217128]">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="font-bold text-[#031636]">Use Calculator</span>
          </div>
        </button>

        <button
          onClick={() => onScrollTo('ussd')}
          className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#a0f399]/50 transition-all group text-left min-h-[44px]"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
              <Phone className="w-5 h-5" />
            </div>
            <span className="font-bold text-[#031636]">View USSD Codes</span>
          </div>
        </button>
      </motion.div>
    </section>
  );
};
