import React from 'react';
import { Menu, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
const SiteSearchDialog = React.lazy(() => import('./SiteSearchDialog'));

class SearchBoundary extends React.Component<{ children: React.ReactNode; onClose: () => void }, { failed: boolean }> {
  declare props: { children: React.ReactNode; onClose: () => void };
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return <div role="alert" className="fixed right-4 top-20 z-[60] max-w-sm rounded-lg border border-slate-300 bg-white p-4 shadow-lg">
      <p className="font-semibold">Search could not load.</p>
      <p className="mt-2 text-sm leading-6">Reload the page to try again, or <a className="underline" href="/sitemap/">browse all pages</a>.</p>
      <button type="button" onClick={this.props.onClose} className="mt-2 min-h-11 rounded-lg border border-slate-400 px-4">Close</button>
    </div>;
  }
}

interface HeaderProps {
  onScrollTo: (id: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onScrollTo, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'compare-data', label: 'Compare Data' },
    { id: 'ussd', label: 'USSD Codes' },
    { id: 'fix-problem', label: 'Fix a Problem' },
    { id: 'networks', label: 'Networks' },
    { id: 'fibre', label: 'Fibre' },
    { id: 'guides', label: 'Guides' },
    { id: 'trust', label: 'Trust' }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 min-h-16 py-2 flex justify-between items-center gap-2">
          <div className="flex min-w-0 items-center gap-2 md:gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="shrink-0 p-2 hover:bg-slate-50 rounded-xl transition-colors md:hidden"
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onScrollTo('home'); }}
              className="min-w-0 [overflow-wrap:anywhere] text-xl font-black tracking-tighter font-headline hover:opacity-80 transition-opacity"
            >
              DataCost.co.za
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-5" aria-label="Main Navigation">
            {navItems.map(item => (
              <a
                key={item.id}
                href={
                  item.id === 'home' ? '/' :
                  item.id === 'compare-data' ? '/network/' :
                  item.id === 'ussd' ? '/ussd-codes-south-africa/' :
                  item.id === 'fix-problem' ? '/fix/' :
                  item.id === 'guides' ? '/guides/' :
                  item.id === 'networks' ? '/network/' :
                  item.id === 'fibre' ? '/fibre/' :
                  item.id === 'trust' ? '/trust/' :
                  `#${item.id}`
                }
                onClick={(e) => {
                  e.preventDefault();
                  onScrollTo(item.id);
                }}
                className={`text-xs font-bold transition-all hover:translate-y-[-1px] ${
                  activeSection === item.id ? 'text-[#1b6d24]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
              aria-label="Search"
              aria-haspopup="dialog"
              aria-expanded={isSearchOpen}
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-2">
                {navItems.map(item => (
                  <a
                    key={item.id}
                    href={
                      item.id === 'home' ? '/' :
                      item.id === 'compare-data' ? '/network/' :
                      item.id === 'ussd' ? '/ussd-codes-south-africa/' :
                      item.id === 'fix-problem' ? '/fix/' :
                      item.id === 'guides' ? '/guides/' :
                      item.id === 'networks' ? '/network/' :
                      item.id === 'fibre' ? '/fibre/' :
                      item.id === 'trust' ? '/trust/' :
                      `#${item.id}`
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      onScrollTo(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left p-4 rounded-xl font-bold ${
                      activeSection === item.id ? 'bg-[#a0f399]/10 text-[#1b6d24]' : 'text-slate-600'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
      </AnimatePresence>
      </header>

      {isSearchOpen && <SearchBoundary onClose={() => setIsSearchOpen(false)}><React.Suspense fallback={<p role="status" className="fixed right-4 top-20 z-[60] rounded-lg bg-white p-4 shadow">Loading search…</p>}>
        <SiteSearchDialog onClose={() => setIsSearchOpen(false)} />
      </React.Suspense></SearchBoundary>}
    </>
  );
};
