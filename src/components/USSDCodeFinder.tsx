import React, { useState, useMemo } from 'react';
import { Search, Phone, Copy, Check, Filter } from 'lucide-react';
import { ussdCodes } from '../data';

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
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-white shadow-xl hover:shadow-2xl transition-all duration-300" id="ussd">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#a0f399] rounded-xl flex items-center justify-center text-[#217128]">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#031636]">USSD Code Finder</h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Quick access to network services</p>
          </div>
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for 'balance', 'data', or a code..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#a0f399]/50 transition-all"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button 
          onClick={() => setActiveNetwork(null)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeNetwork === null 
              ? 'bg-[#031636] text-white' 
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          All Networks
        </button>
        {networks.map(network => (
          <button 
            key={network}
            onClick={() => setActiveNetwork(network)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeNetwork === network 
                ? 'bg-[#031636] text-white' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {network}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCodes.map((code, idx) => (
          <div 
            key={`${code.network}-${idx}`}
            className="group p-4 bg-slate-50 rounded-xl border border-transparent hover:border-[#a0f399] hover:bg-white transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                code.network === 'Vodacom' ? 'bg-[#E60000]/10 text-[#E60000]' :
                code.network === 'MTN' ? 'bg-[#FFCC00]/20 text-[#031636]' :
                code.network === 'Telkom' ? 'bg-blue-100 text-blue-600' :
                'bg-slate-200 text-slate-600'
              }`}>
                {code.network}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{code.category}</span>
            </div>
            <h4 className="font-bold text-slate-900 mb-4">{code.purpose}</h4>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-100">
              <code className="text-lg font-black text-[#031636] tracking-widest">{code.code}</code>
              <button 
                onClick={() => handleCopy(code.code)}
                className="p-2 text-slate-400 hover:text-[#217128] hover:bg-[#a0f399]/10 rounded-lg transition-all"
                title="Copy code"
              >
                {copiedId === code.code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCodes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-sm">No USSD codes found matching your search.</p>
        </div>
      )}
    </div>
  );
};
