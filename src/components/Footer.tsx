import React from 'react';
import { NavigateFunction } from '../types';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onNavigateTo: NavigateFunction;
}

const featuredGuides = [
  { href: '/guides/cheapest-data-south-africa/', label: 'Cheapest Data South Africa' },
  { href: '/guides/airtime-data-saving-tips-south-africa/', label: 'Airtime & Data Saving Tips' },
  { href: '/guides/cheapest-1gb-data-south-africa/', label: 'Cheapest 1GB Data' },
  { href: '/guides/best-monthly-data-deals-south-africa/', label: 'Best Monthly Data Deals' },
  { href: '/guides/vodacom-vs-mtn-data-prices/', label: 'Vodacom vs MTN Data Prices' }
];

export const Footer: React.FC<FooterProps> = ({ onNavigateTo }) => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 pb-32 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2 lg:col-span-2">
          <span className="text-lg font-black text-[#031636] mb-4 block">DataCost.co.za</span>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
            © 2026 DataCost.co.za - South Africa&apos;s Independent Data Comparison. We help you find the best value without the bias.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <a href="/fix-mobile-problems/" onClick={(e) => { e.preventDefault(); onNavigateTo('fix-problem'); }} className="font-bold text-sm uppercase tracking-wider hover:text-[#1b6d24] transition-colors">
            Fix a Problem
          </a>

          <a href="/guides/" onClick={(e) => { e.preventDefault(); onNavigateTo('guides-index'); }} className="font-bold text-sm uppercase tracking-wider hover:text-[#1b6d24] transition-colors">
            Guides
          </a>

          {featuredGuides.map((guide) => (
            <a key={guide.href} href={guide.href} className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block">
              {guide.label}
            </a>
          ))}

          <a href="/ussd-codes-south-africa/" onClick={(e) => { e.preventDefault(); onNavigateTo('ussd'); }} className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block">
            USSD Codes Directory
          </a>

          <a href="/alerts/" onClick={(e) => { e.preventDefault(); onNavigateTo('alerts'); }} className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block">
            Alerts
          </a>

          <a href="/travel-sims-south-africa/" onClick={(e) => { e.preventDefault(); onNavigateTo('travel-sims'); }} className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block">
            Travel SIMs &amp; eSIMs
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-sm uppercase tracking-wider">Resources</h5>
          <a href="/about/" className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors block">About</a>
          <a href="/network/" className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors block">Network Comparison</a>
          <a href="/methodology/" className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors block">Methodology</a>
          <a href="/editorial-policy/" className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors block">Editorial Policy</a>
          <a href="/contact/" className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors block">Contact</a>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-sm uppercase tracking-wider">Legal</h5>
          <a href="/privacy-policy/" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</a>
          <a href="/terms/" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Terms &amp; Conditions</a>
          <a href="/cookie-policy/" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};
