import React from 'react';
import { Tag, Calculator, Phone, Trophy } from 'lucide-react';

interface MobileNavProps {
  onScrollTo: (id: string) => void;
  activeSection: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onScrollTo, activeSection }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 pb-6 pt-2 bg-white/90 backdrop-blur-md border-t border-slate-100 shadow-lg z-50 h-20">
      <button onClick={() => onScrollTo('deals')} className={`flex flex-col items-center justify-center ${activeSection === 'deals' ? 'text-[#1b6d24]' : 'text-slate-400'}`}>
        <Tag className="w-5 h-5" />
        <span className="text-[10px] font-semibold mt-1">Deals</span>
      </button>
      <button onClick={() => onScrollTo('calculator')} className={`flex flex-col items-center justify-center ${activeSection === 'calculator' ? 'text-[#1b6d24]' : 'text-slate-400'}`}>
        <Calculator className="w-5 h-5" />
        <span className="text-[10px] font-semibold mt-1">Calc</span>
      </button>
      <button onClick={() => onScrollTo('ussd')} className={`flex flex-col items-center justify-center ${activeSection === 'ussd' ? 'text-[#1b6d24]' : 'text-slate-400'}`}>
        <Phone className="w-5 h-5" />
        <span className="text-[10px] font-semibold mt-1">USSD</span>
      </button>
      <button onClick={() => onScrollTo('scorecard')} className={`flex flex-col items-center justify-center ${activeSection === 'scorecard' ? 'text-[#1b6d24]' : 'text-slate-400'}`}>
        <Trophy className="w-5 h-5" />
        <span className="text-[10px] font-semibold mt-1">Stats</span>
      </button>
    </nav>
  );
};
