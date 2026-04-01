import React from 'react';
import { BadgeCheck, Info, ArrowRight, Calculator, Phone } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  return (
    <section className="mb-10 pt-6 md:pt-12" id="home">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-12">
        <div className="max-w-2xl relative text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#a0f399]/20 text-[#217128] rounded-full mb-6 border border-[#a0f399]/30"
          >
            <BadgeCheck className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Independent Analysis | Updated Regularly</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tighter text-[#031636] leading-[0.95] md:leading-[0.85] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#031636] to-[#1b6d24]"
          >
            Find the Cheapest Data in South Africa Right Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg md:text-xl max-w-lg leading-relaxed font-medium mx-auto md:mx-0"
          >
            Compare MTN, Vodacom, Telkom, Cell C and Rain. Get practical tools and clear next steps.
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
        className="bg-white border border-slate-100 rounded-3xl p-4 md:p-6 shadow-sm"
      >
        <h2 className="text-lg md:text-xl font-black text-[#031636] mb-4">What do you want to do?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => onScrollTo('compare-data')}
            className="flex items-center justify-between p-5 bg-[#031636] rounded-2xl border border-[#031636] shadow-sm hover:bg-[#1b6d24] hover:border-[#1b6d24] transition-all group text-left min-h-[52px] text-white"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-black">Compare Data Prices</span>
                <span className="text-xs text-slate-200">Primary action</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => onScrollTo('calculator')}
            className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#a0f399]/50 transition-all group text-left min-h-[52px]"
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
            className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#a0f399]/50 transition-all group text-left min-h-[52px]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                <Phone className="w-5 h-5" />
              </div>
              <span className="font-bold text-[#031636]">Find USSD Codes</span>
            </div>
          </button>

          <button
            onClick={() => onScrollTo('fix-problem')}
            className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#a0f399]/50 transition-all group text-left min-h-[52px]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                <Info className="w-5 h-5" />
              </div>
              <span className="font-bold text-[#031636]">Fix a Problem</span>
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
