import React from 'react';
import { Home, Tag, Calculator, Phone, LifeBuoy } from 'lucide-react';

interface MobileNavProps {
  onScrollTo: (id: string) => void;
  activeSection: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onScrollTo, activeSection }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 pb-6 pt-2 bg-white/90 backdrop-blur-md border-t border-slate-100 shadow-lg z-50 h-20">
      <button onClick={() => onScrollTo('home')} className={`flex flex-col items-center justify-center ${activeSection === 'home' ? 'text-[#1b6d24]' : 'text-slate-400'}`}>
        <Home className="w-4 h-4" />
        <span className="text-[9px] font-semibold mt-1">Home</span>
      </button>
      <button onClick={() => onScrollTo('compare-data')} className={`flex flex-col items-center justify-center ${activeSection === 'compare-data' || activeSection === 'deals' ? 'text-[#1b6d24]' : 'text-slate-400'}`}>
        <Tag className="w-4 h-4" />
        <span className="text-[9px] font-semibold mt-1">Compare</span>
      </button>
      <button onClick={() => onScrollTo('calculator')} className={`flex flex-col items-center justify-center ${activeSection === 'calculator' ? 'text-[#1b6d24]' : 'text-slate-400'}`}>
        <Calculator className="w-4 h-4" />
        <span className="text-[9px] font-semibold mt-1">Calc</span>
      </button>
      <button onClick={() => onScrollTo('ussd')} className={`flex flex-col items-center justify-center ${activeSection === 'ussd' ? 'text-[#1b6d24]' : 'text-slate-400'}`}>
        <Phone className="w-4 h-4" />
        <span className="text-[9px] font-semibold mt-1">USSD</span>
      </button>
      <button onClick={() => onScrollTo('fix-problem')} className={`flex flex-col items-center justify-center ${activeSection === 'fix-problem' ? 'text-[#1b6d24]' : 'text-slate-400'}`}>
        <LifeBuoy className="w-4 h-4" />
        <span className="text-[9px] font-semibold mt-1">Fix</span>
      </button>
    </nav>
  );
};
