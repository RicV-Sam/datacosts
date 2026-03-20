import React from 'react';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 pb-32 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <span className="text-lg font-black text-[#031636] mb-4 block">DataCost.co.za</span>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
            © 2024 DataCost.co.za - South Africa's Independent Data Comparison. We help you find the best value without the bias.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-sm uppercase tracking-wider">Resources</h5>
          <button onClick={() => onScrollTo('home')} className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors">About Us</button>
          <button onClick={() => onScrollTo('scorecard')} className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors">Network Map</button>
          <a href="#" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Contact</a>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-sm uppercase tracking-wider">Legal</h5>
          <a href="#" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
