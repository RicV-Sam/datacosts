import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AlertsSignupCardProps {
  title: string;
  description: string;
  ctaLabel: string;
  onCtaClick: () => void;
  icon: LucideIcon;
  comingSoon?: boolean;
}

export const AlertsSignupCard: React.FC<AlertsSignupCardProps> = ({
  title,
  description,
  ctaLabel,
  onCtaClick,
  icon: Icon,
  comingSoon = false
}) => {
  return (
    <article className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="w-11 h-11 rounded-2xl bg-[#031636]/5 text-[#031636] flex items-center justify-center mb-3">
        <Icon className="w-5 h-5" />
      </div>

      <h3 className="text-lg font-black tracking-tight text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>

      <button
        type="button"
        onClick={onCtaClick}
        className={`mt-4 min-h-[44px] w-full rounded-xl px-4 text-sm font-black ${
          comingSoon
            ? 'border border-slate-200 text-slate-700 bg-white'
            : 'bg-[#031636] text-white hover:bg-[#1b6d24] transition-colors'
        }`}
      >
        {ctaLabel}
      </button>
    </article>
  );
};

