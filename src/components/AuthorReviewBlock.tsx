import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, UserRound } from 'lucide-react';
import {
  SITE_EDITOR_BIO,
  SITE_EDITOR_NAME,
  SITE_EDITOR_ROLE,
  SITE_EDITOR_TRUST_SUMMARY
} from '../seo/siteConstants';

interface AuthorReviewBlockProps {
  lastReviewed: string;
  className?: string;
  trustSummary?: string;
}

export const AuthorReviewBlock: React.FC<AuthorReviewBlockProps> = ({
  lastReviewed,
  className = '',
  trustSummary = SITE_EDITOR_TRUST_SUMMARY
}) => {
  return (
    <section className={`bg-white border border-slate-100 rounded-2xl p-6 shadow-sm ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#a0f399]/30 text-[#1b6d24]">
          <UserRound className="h-5 w-5" />
        </div>
        <div className="space-y-3 text-sm text-slate-700">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Author and review notes</p>
            <h2 className="mt-1 text-lg font-black tracking-tight text-slate-900">Written by {SITE_EDITOR_NAME}</h2>
            <p className="font-bold text-[#1b6d24]">{SITE_EDITOR_ROLE}</p>
            <p className="mt-2 leading-relaxed">{SITE_EDITOR_BIO}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="flex items-start gap-2 font-bold text-slate-900">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1b6d24]" />
              Reviewed / updated: {lastReviewed}
            </p>
            <p className="mt-2 leading-relaxed">
              <strong>Why trust this guide:</strong> {trustSummary}
            </p>
            <p className="mt-2 leading-relaxed">
              Found something outdated?{' '}
              <Link to="/contact/#corrections" className="font-semibold text-[#1b6d24] hover:underline">
                Send a correction
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
