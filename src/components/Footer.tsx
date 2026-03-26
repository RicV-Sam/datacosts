import React from 'react';
import { guides } from '../data/guides';
import { NavigateFunction } from '../types';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onNavigateTo: NavigateFunction;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onNavigateTo }) => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 pb-32 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

        {/* Brand */}
        <div className="col-span-2 lg:col-span-2">
          <span className="text-lg font-black text-[#031636] mb-4 block">
            DataCost.co.za
          </span>
          <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
            © 2026 DataCost.co.za - South Africa's Independent Data Comparison. We help you find the best value without the bias.
          </p>
        </div>

        {/* Guides (SEO GOLD 🔥) */}
        <div className="flex flex-col gap-4">
          <a
            href="/guides/"
            onClick={(e) => { e.preventDefault(); onNavigateTo('guides-index'); }}
            className="font-bold text-sm uppercase tracking-wider hover:text-[#1b6d24] transition-colors"
          >
            Guides
          </a>

          {guides.map(guide => (
            <a
              key={guide.slug}
              href={`/guides/${guide.slug}/`}
              onClick={(e) => { e.preventDefault(); onNavigateTo('guide', guide.slug); }}
              className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors line-clamp-1 block"
            >
              {guide.title.split(' - ')[0]}
            </a>
          ))}

          <a
            href="/ussd-codes-south-africa/"
            onClick={(e) => { e.preventDefault(); onNavigateTo('ussd'); }}
            className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block"
          >
            USSD Codes Directory
          </a>

          <a
            href="/guides/cheapest-data-south-africa/"
            className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Cheapest Data South Africa
          </a>

          <a
            href="/guides/cheapest-1gb-data-south-africa/"
            className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Cheapest 1GB Data
          </a>

          <a
            href="/guides/best-data-deals-south-africa/"
            className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Best Data Deals
          </a>

          <a
            href="/guides/best-prepaid-data-deals-south-africa/"
            className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Best Prepaid Data Deals
          </a>

          <a
            href="/guides/cheapest-monthly-data-south-africa/"
            className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Cheapest Monthly Data
          </a>

          <a
            href="/guides/cheapest-10gb-data-south-africa/"
            className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Cheapest 10GB Data
          </a>

          <a
            href="/guides/cheapest-unlimited-data-south-africa/"
            className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Cheapest Unlimited Data
          </a>

          <a
            href="/guides/best-sim-only-deals-south-africa/"
            className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Best SIM-Only Deals
          </a>

          <a
            href="/guides/cheapest-whatsapp-bundles-south-africa/"
            className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Cheapest WhatsApp Bundles
          </a>

          <a
            href="/guides/vodacom-vs-mtn-data-prices/"
            className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Vodacom vs MTN
          </a>

          <a
            href="/guides/stop-wasp-subscriptions-south-africa/"
            className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Stop WASP Subscriptions
          </a>

          <a
            href="/travel-sims-south-africa/"
            onClick={(e) => { e.preventDefault(); onNavigateTo('travel-sims'); }}
            className="text-left text-[11px] text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Travel SIMs & eSIMs
          </a>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-sm uppercase tracking-wider">Resources</h5>

          <a href="/about/" className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors block">
            About
          </a>

          <a
            href="/network/"
            className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Network Comparison
          </a>

          <a
            href="/ussd-codes-south-africa/"
            onClick={(e) => { e.preventDefault(); onNavigateTo('ussd'); }}
            className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors block"
          >
            Check Data Balance
          </a>

          <a href="/methodology/" className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors block">
            Methodology
          </a>

          <a href="/editorial-policy/" className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors block">
            Editorial Policy
          </a>

          <a href="/contact/" className="text-left text-xs text-slate-500 hover:text-slate-900 transition-colors block">
            Contact
          </a>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4">
          <h5 className="font-bold text-sm uppercase tracking-wider">Legal</h5>

          <a href="/privacy-policy/" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
            Privacy Policy
          </a>

          <a href="/terms/" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
            Terms of Service
          </a>
        </div>

      </div>
    </footer>
  );
};
