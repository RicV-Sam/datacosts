import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getRedirectAlias } from '../config/redirectAliases';
import { SITE_PRODUCT_NAME, toCanonicalUrl } from '../seo/siteConstants';

export const RedirectPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const alias = getRedirectAlias(location.pathname);
  const targetPath = alias?.to ?? '/';
  const targetLabel = alias?.label ?? SITE_PRODUCT_NAME;
  const canonicalUrl = toCanonicalUrl(targetPath);

  useEffect(() => {
    if (!alias) {
      navigate('/', { replace: true });
      return;
    }

    const timer = window.setTimeout(() => {
      navigate(alias.to, { replace: true });
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [alias, navigate]);

  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans flex items-center justify-center px-4 py-12">
      <Helmet>
        <title>{targetLabel} | DataCost</title>
        <meta name="description" content={`This DataCost page has moved to ${targetLabel}.`} />
        <meta name="robots" content="noindex,follow" />
        <meta httpEquiv="refresh" content={`5;url=${targetPath}`} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <main className="max-w-xl w-full bg-white border border-slate-100 rounded-3xl p-8 shadow-sm text-center">
        <p className="text-xs font-black uppercase tracking-widest text-[#1b6d24] mb-3">Page moved</p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{targetLabel}</h1>
        <p className="text-slate-600 leading-relaxed mb-6">
          This shortcut now points to the canonical DataCost page. You will be sent there automatically.
        </p>
        <Link
          to={targetPath}
          replace
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#031636] px-5 text-sm font-black text-white hover:bg-[#1b6d24] transition-colors"
        >
          Open canonical page
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </main>
    </div>
  );
};
