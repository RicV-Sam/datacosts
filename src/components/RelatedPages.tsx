import React from 'react';
import { Link } from 'react-router-dom';
import { Bundle } from '../types';
import { ArrowRight } from 'lucide-react';
import { bundles } from '../data';

interface RelatedPagesProps {
  currentBundle?: Bundle;
  currentNetwork?: string;
  className?: string;
}

export const RelatedPages: React.FC<RelatedPagesProps> = ({ currentBundle, currentNetwork, className = '' }) => {
  const getRelatedPages = () => {
    // 1. Same network
    let related = bundles.filter((b: Bundle) =>
      b.network === (currentNetwork || currentBundle?.network) &&
      b.id !== currentBundle?.id
    );

    // 2. Similar size if currentBundle exists
    if (currentBundle) {
      const sizeRelated = bundles.filter((b: Bundle) =>
        b.volume === currentBundle.volume &&
        b.network !== currentBundle.network
      );
      related = [...related, ...sizeRelated];
    }

    // 3. Static high-value pages
    const staticPages = [
      { name: 'Cheapest Data in South Africa', url: '/cheapest-data-south-africa/' },
      { name: 'USSD Code Directory', url: '/ussd-codes-south-africa/' },
      { name: 'Vodacom vs MTN Data Prices', url: '/vodacom-vs-mtn-data-prices/' }
    ];

    return {
      dynamic: related.slice(0, 3),
      static: staticPages
    };
  };

  const { dynamic, static: staticPages } = getRelatedPages();

  return (
    <div className={`mt-20 pt-10 border-t border-slate-100 ${className}`}>
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Related Comparisons</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dynamic.map((bundle: Bundle) => (
          <Link
            key={bundle.id}
            to={`/network/${bundle.network.toLowerCase().replace(' ', '')}/${bundle.slug}/`}
            className="p-6 bg-white border border-slate-100 rounded-2xl hover:border-[#a0f399] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#1b6d24] mb-2">{bundle.network}</div>
              <h4 className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">{bundle.name}</h4>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
              View Price
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
        {staticPages.map((page) => (
          <Link
            key={page.url}
            to={page.url}
            className="p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:border-[#a0f399] transition-all group flex flex-col justify-between"
          >
            <h4 className="font-bold text-slate-900 group-hover:text-[#1b6d24] transition-colors">{page.name}</h4>
            <div className="mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400">
              Go to Page
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
