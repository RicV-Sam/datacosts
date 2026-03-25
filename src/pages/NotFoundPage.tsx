import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, SearchX } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { MobileNav } from '../components/MobileNav';
import { NavigateFunction } from '../types';

interface NotFoundPageProps {
  onNavigate: NavigateFunction;
  onScrollTo: (id: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, onScrollTo }) => {
  return (
    <div className="min-h-screen bg-mesh text-[#1a1c1c] font-sans pb-24">
      <Helmet>
        <title>Page Not Found (404) | DataCost</title>
        <meta
          name="description"
          content="The page you requested could not be found. Browse our data comparison pages, guides, and USSD directory."
        />
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />
      </Helmet>

      <Header onScrollTo={onScrollTo} activeSection="home" />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <section className="bg-white border border-slate-100 rounded-[2rem] p-8 md:p-12 shadow-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-6">
            <SearchX className="w-8 h-8" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Error 404</p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Page Not Found</h1>
          <p className="text-slate-600 font-medium max-w-xl mx-auto mb-8">
            The URL you entered is invalid or no longer exists. Use the links below to continue browsing valid comparison pages.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-2xl bg-[#031636] text-white font-black text-sm hover:bg-[#1b6d24] transition-colors inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go to Homepage
            </button>
            <button
              onClick={() => onNavigate('guides-index')}
              className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-black text-sm hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              Browse Guides
            </button>
            <button
              onClick={() => onNavigate('ussd')}
              className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-black text-sm hover:border-[#1b6d24] hover:text-[#1b6d24] transition-colors"
            >
              USSD Directory
            </button>
          </div>
        </section>
      </main>

      <Footer onScrollTo={onScrollTo} onNavigateTo={onNavigate} />
      <MobileNav onScrollTo={onScrollTo} activeSection="home" />
    </div>
  );
};
