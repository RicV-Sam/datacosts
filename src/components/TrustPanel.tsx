import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

interface TrustPanelProps {
  lastReviewed: string;
  sources?: string;
  reviewer?: string;
  correctionHref?: string;
  className?: string;
}

export const TrustPanel: React.FC<TrustPanelProps> = ({
  lastReviewed,
  sources = 'Operator websites, public USSD menus, network apps, and official support pages where available.',
  reviewer = 'Reviewed by DataCost editorial team',
  correctionHref = '/contact/',
  className = ''
}) => {
  return (
    <section className={`bg-white border border-slate-100 rounded-2xl p-6 text-sm text-slate-600 shadow-sm ${className}`}>
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#1b6d24] mt-0.5 flex-shrink-0" />
        <div className="space-y-2">
          <p className="font-black text-slate-900">{reviewer}</p>
          <p><strong>Last reviewed:</strong> {lastReviewed}</p>
          <p><strong>Sources we check:</strong> {sources}</p>
          <p>
            Found outdated info?{' '}
            <Link to={correctionHref} className="text-[#1b6d24] font-semibold hover:underline">
              Send a correction
            </Link>.
          </p>
        </div>
      </div>
    </section>
  );
};
