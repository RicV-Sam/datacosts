import React, { useState, useMemo } from 'react';
import { Search, Phone, Copy, Check, Filter, ArrowRight } from 'lucide-react';
import { ussdCodes } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export const USSDCodeFinder: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeNetwork, setActiveNetwork] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const networks = useMemo(() => {
    return Array.from(new Set(ussdCodes.map(c => c.network)));
  }, []);

  const filteredCodes = useMemo(() => {
    return ussdCodes.filter(c => {
      const matchesSearch = c.purpose.toLowerCase().includes(search.toLowerCase()) || 
                            c.code.includes(search);
      const matchesNetwork = activeNetwork ? c.network === activeNetwork : true;
      return matchesSearch && matchesNetwork;
    });
  }, [search, activeNetwork]);

  const handleCopy = (code: string) => {
    if (code === 'N/A (App only)') return;
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white shadow-2xl hover:shadow-2xl transition-all duration-300" id="ussd">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#a0f399]/20 rounded-2xl flex items-center justify-center text-[#217128] border border-[#a0f399]/30">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-3xl font-black text-[#031636] tracking-tight">USSD Code Finder</h3>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Instant access to network services</p>
          </div>
        </div>

        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for 'balance', 'data', or a code..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-lg font-medium focus:outline-none focus:ring-4 focus:ring-[#a0f399]/20 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        <button 
          onClick={() => setActiveNetwork(null)}
          className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
            activeNetwork === null 
              ? 'bg-[#031636] text-white shadow-lg'
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
          }`}
        >
          All Networks
        </button>
        {networks.map(network => (
          <button 
            key={network}
            onClick={() => setActiveNetwork(network)}
            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeNetwork === network 
                ? 'bg-[#031636] text-white shadow-lg'
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
            }`}
          >
            {network}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCodes.map((code, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={`${code.network}-${idx}`}
              className="group p-6 bg-slate-50/50 rounded-3xl border border-slate-100/50 hover:border-[#a0f399] hover:bg-white hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.1em] border ${
                  code.network === 'Vodacom' ? 'bg-[#E60000]/10 text-[#E60000] border-[#E60000]/20' :
                  code.network === 'MTN' ? 'bg-[#FFCC00]/20 text-[#031636] border-[#FFCC00]/30' :
                  code.network === 'Telkom' ? 'bg-blue-100 text-blue-600 border-blue-200' :
                  code.network === 'Rain' ? 'bg-orange-100 text-orange-600 border-orange-200' :
                  'bg-slate-200 text-slate-600 border-slate-300'
                }`}>
                  {code.network}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{code.category}</span>
              </div>
              <h4 className="font-black text-slate-900 mb-6 text-lg tracking-tight">{code.purpose}</h4>
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group-hover:border-[#a0f399]/50 transition-colors">
                <code className="text-xl font-black text-[#031636] tracking-widest">{code.code}</code>
                <button
                  onClick={() => handleCopy(code.code)}
                  disabled={code.code === 'N/A (App only)'}
                  className="p-3 text-slate-400 hover:text-[#217128] hover:bg-[#a0f399]/10 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Copy code"
                >
                  {copiedId === code.code ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredCodes.length === 0 && (
        <div className="text-center py-24 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase tracking-widest">No USSD codes found for "{search}"</p>
        </div>
      )}
    </div>
  );
};
