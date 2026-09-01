import React from 'react';
import { Banknote, MapPinned, SlidersHorizontal } from 'lucide-react';

export const Verdict: React.FC = () => {
  return (
    <section className="bg-[#031636] text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#1b6d24]/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="relative z-10">
        <h3 className="text-3xl font-black tracking-tighter mb-8">Three checks before choosing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#a0f399] flex items-center justify-center shrink-0">
              <Banknote className="w-6 h-6 text-[#217128]" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Price</p>
              <h4 className="text-xl font-bold">Compare like for like</h4>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                Compare source-checked rows with the same product type, allocation and validity, then confirm the checkout price.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <MapPinned className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Coverage</p>
              <h4 className="text-xl font-bold">Check your locations</h4>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                Use the current official map and a local SIM test at home, work and the routes where you need data.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[#1a2b4c] flex items-center justify-center shrink-0">
              <SlidersHorizontal className="w-6 h-6 text-[#8293ba]" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Product fit</p>
              <h4 className="text-xl font-bold">Read the restrictions</h4>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                Check whether data is anytime, night-only, social-only, personalised, recurring or tied to a router before buying.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
