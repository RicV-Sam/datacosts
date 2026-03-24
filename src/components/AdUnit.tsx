import React from 'react';

interface AdUnitProps {
  type: 'aboveFold' | 'inContent' | 'stickyMobile';
  className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ type, className = '' }) => {
  // These are placeholders for Google AdSense or similar ad providers
  const getStyles = () => {
    switch (type) {
      case 'aboveFold':
        return 'w-full min-h-[90px] md:min-h-[250px] bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-300 rounded-2xl mb-8';
      case 'inContent':
        return 'w-full min-h-[250px] bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-300 rounded-3xl my-12';
      case 'stickyMobile':
        return 'fixed bottom-0 left-0 right-0 h-[60px] bg-white border-t border-slate-100 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-slate-300 z-40 md:hidden';
      default:
        return '';
    }
  };

  return (
    <div className={`${getStyles()} ${className}`} aria-hidden="true">
      <div className="flex flex-col items-center gap-1">
        <span>Advertisement</span>
        <span className="opacity-50">Ad Slot: {type}</span>
      </div>
    </div>
  );
};
