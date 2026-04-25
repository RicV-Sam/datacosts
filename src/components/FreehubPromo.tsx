import React, { useEffect } from 'react';
import { ArrowRight, Gift, Sparkles } from 'lucide-react';
import { AdPlacement, freehubPromoUrl } from '../config/ads';
import { trackHouseAdClick, trackHouseAdView } from '../utils/tracking';

type HouseAdPageType = 'home' | 'guide' | 'problem' | 'network' | 'generic';

interface FreehubPromoProps {
  placement: AdPlacement;
  pageType?: HouseAdPageType;
  variant?: string;
  className?: string;
}

const COPY_BY_VARIANT: Record<string, { label: string; headline: string; body: string; cta: string }> = {
  home: {
    label: 'More ways to save',
    headline: 'Find South African freebies, competitions and rewards',
    body: 'DataCost helps you compare mobile costs. Freehub helps you discover competitions, vouchers and everyday rewards in one place.',
    cta: 'Explore Freehub'
  },
  guide: {
    label: 'From our network',
    headline: 'Looking for more ways to stretch your budget?',
    body: 'Freehub tracks South African competitions, vouchers, freebies and rewards so you can quickly see what is live.',
    cta: 'See what is live'
  },
  problem: {
    label: 'More ways to save',
    headline: 'Fix the problem, then find extra savings',
    body: 'After sorting out your airtime or data issue, check Freehub for current competitions, vouchers and rewards.',
    cta: 'Visit Freehub'
  },
  network: {
    label: 'From our network',
    headline: 'Data deals are not the only way to save',
    body: 'Compare data on DataCost, then browse Freehub for South African giveaways, vouchers and free rewards.',
    cta: 'Browse Freehub'
  },
  generic: {
    label: 'More ways to save',
    headline: 'Find South African freebies, competitions and rewards',
    body: 'Freehub collects competitions, vouchers, freebies and rewards so you can quickly see what is live.',
    cta: 'Explore Freehub'
  }
};

function inferPageType(pathname: string): HouseAdPageType {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/network/')) return 'network';
  if (pathname.startsWith('/data-problems/') || pathname.startsWith('/fix-mobile-problems/')) return 'problem';
  if (pathname.startsWith('/guides/') || pathname.includes('ussd')) return 'guide';
  return 'generic';
}

function getCurrentPath(): string {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname || '/';
}

function getVariant(placement: AdPlacement, pageType: HouseAdPageType, explicitVariant?: string): string {
  if (explicitVariant) return explicitVariant;
  if (placement === 'aboveFold' && pageType === 'home') return 'home';
  return pageType;
}

export const FreehubPromo: React.FC<FreehubPromoProps> = ({ placement, pageType, variant, className = '' }) => {
  const pathname = getCurrentPath();
  const resolvedPageType = pageType ?? inferPageType(pathname);
  const resolvedVariant = getVariant(placement, resolvedPageType, variant);
  const copy = COPY_BY_VARIANT[resolvedVariant] ?? COPY_BY_VARIANT.generic;
  const isAboveFold = placement === 'aboveFold';

  useEffect(() => {
    trackHouseAdView({
      placement,
      page_path: pathname,
      destination_url: freehubPromoUrl,
      variant: resolvedVariant
    });
  }, [pathname, placement, resolvedVariant]);

  const shortBody = resolvedPageType === 'problem'
    ? 'Freehub tracks SA competitions, vouchers and rewards.'
    : 'Freehub tracks SA freebies, vouchers and rewards.';

  return (
    <aside
      className={[
        'w-full overflow-hidden border border-emerald-100 bg-white shadow-sm',
        isAboveFold ? 'rounded-2xl mb-8' : 'rounded-3xl my-8',
        className
      ].join(' ')}
      aria-label={`${copy.label}: ${copy.headline}`}
    >
      <div className="flex flex-col gap-3 p-4 sm:gap-4 sm:p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#a0f399]/30 text-[#1b6d24]">
            {isAboveFold ? <Sparkles className="h-5 w-5" /> : <Gift className="h-5 w-5" />}
          </div>
          <div>
            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#1b6d24]">{copy.label}</p>
            <h2 className="text-base font-black tracking-tight text-[#031636] sm:text-xl">{copy.headline}</h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 sm:hidden">{shortBody}</p>
            <p className="mt-2 hidden max-w-2xl text-sm font-medium leading-relaxed text-slate-600 sm:block">{copy.body}</p>
          </div>
        </div>
        <a
          href={freehubPromoUrl}
          className="inline-flex min-h-[44px] flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-[#031636] px-5 text-sm font-black text-white transition-colors hover:bg-[#1b6d24]"
          onClick={() =>
            trackHouseAdClick({
              placement,
              page_path: pathname,
              destination_url: freehubPromoUrl,
              variant: resolvedVariant
            })
          }
        >
          {copy.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </aside>
  );
};
