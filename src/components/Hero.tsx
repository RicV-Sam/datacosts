import React from 'react';
import { BadgeCheck, Info } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="mb-16 pt-8 md:pt-16" id="home">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
        <div className="max-w-2xl relative">
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
            className="text-5xl md:text-7xl font-black tracking-tighter text-[#031636] leading-[0.85] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#031636] to-[#1b6d24]"
          >
            Compare SA's <br className="hidden md:block" />
            Top Data Plans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg md:text-xl max-w-lg leading-relaxed font-medium"
          >
            Objective, unbiased analysis of South Africa's mobile networks. We compare cost, coverage, and speed so you don't have to.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative group shrink-0"
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
    </section>
  );
};
