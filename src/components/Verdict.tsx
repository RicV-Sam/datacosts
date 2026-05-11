import React from 'react';
import { Trophy, Banknote, Bolt } from 'lucide-react';

export const Verdict: React.FC = () => {
  return (
    <section className="bg-[#031636] text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#1b6d24]/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="relative z-10">
        <h3 className="text-3xl font-black tracking-tighter mb-8">The Final Verdict</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#a0f399] flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-[#217128]" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Value Watch</p>
              <h4 className="text-xl font-bold">MTN</h4>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                MTN often looks competitive in DataCost's bundle comparisons, especially where Boosta-style offers are available.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <Banknote className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Budget Fit</p>
              <h4 className="text-xl font-bold">Telkom</h4>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                Telkom can be a strong budget option in the current DataCost dataset, especially for users who have reliable local coverage.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#1a2b4c] flex items-center justify-center shrink-0">
              <Bolt className="w-6 h-6 text-[#8293ba]" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Performance Fit</p>
              <h4 className="text-xl font-bold">Vodacom</h4>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                Vodacom is positioned as a coverage-first option in this comparison; verify performance where you actually use data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
