import React from 'react';
import { Menu, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { guides } from '../data/guides';

interface HeaderProps {
  onScrollTo: (id: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onScrollTo, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const navItems = [
    { id: 'deals', label: 'Deals' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'networks', label: 'Networks' },
    { id: 'guides', label: 'Guides' },
    { id: 'ussd', label: 'USSD Codes' },
    { id: 'scorecard', label: 'Scorecard' },
  ];

  const searchItems = React.useMemo(() => [
    { id: 'home', title: 'Home', subtitle: 'Back to homepage', type: 'scroll' as const, value: 'home' },
    { id: 'deals', title: 'Deals', subtitle: 'Jump to latest data deals', type: 'scroll' as const, value: 'deals' },
    { id: 'calculator', title: 'Calculator', subtitle: 'Estimate your data usage', type: 'scroll' as const, value: 'calculator' },
    { id: 'networks', title: 'Networks', subtitle: 'Compare all mobile networks', type: 'scroll' as const, value: 'networks' },
    { id: 'guides', title: 'Guides', subtitle: 'Browse all guides', type: 'scroll' as const, value: 'guides' },
    { id: 'ussd', title: 'USSD Codes', subtitle: 'Find shortcode commands', type: 'scroll' as const, value: 'ussd' },
    { id: 'scorecard', title: 'Scorecard', subtitle: 'View network scorecard', type: 'scroll' as const, value: 'scorecard' },
    { id: 'travel-sims', title: 'Best Travel SIMs & eSIMs for South Africa', subtitle: 'Tourist connectivity guide', type: 'route' as const, value: '/travel-sims-south-africa/' },
    ...guides.slice(0, 8).map((guide) => ({
      id: guide.slug,
      title: guide.title,
      subtitle: guide.metaDescription,
      type: 'route' as const,
      value: `/guides/${guide.slug}/`
    }))
  ], []);

  const filteredSearchItems = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return searchItems.slice(0, 8);
    }
    return searchItems
      .filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(query))
      .slice(0, 10);
  }, [searchItems, searchQuery]);

  React.useEffect(() => {
    if (!isSearchOpen) return;
    const timer = setTimeout(() => searchInputRef.current?.focus(), 0);
    return () => clearTimeout(timer);
  }, [isSearchOpen]);

  React.useEffect(() => {
    if (!isSearchOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen]);

  const handleSearchItemClick = (item: { type: 'scroll' | 'route'; value: string }) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    if (item.type === 'scroll') {
      onScrollTo(item.value);
      return;
    }
    navigate(item.value);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-slate-50 rounded-xl transition-colors md:hidden"
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onScrollTo('home'); }}
              className="text-xl font-black tracking-tighter font-headline hover:opacity-80 transition-opacity"
            >
              DataCost.co.za
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navItems.map(item => (
              <a
                key={item.id}
                href={
                  item.id === 'ussd' ? '/ussd-codes-south-africa/' :
                  item.id === 'guides' ? '/guides/' :
                  item.id === 'networks' ? '/network/' :
                  `#${item.id}`
                }
                onClick={(e) => {
                  e.preventDefault();
                  onScrollTo(item.id);
                }}
                className={`text-sm font-bold transition-all hover:translate-y-[-1px] ${
                  activeSection === item.id ? 'text-[#1b6d24]' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
              aria-label="Search"
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
                      item.id === 'ussd' ? '/ussd-codes-south-africa/' :
                      item.id === 'guides' ? '/guides/' :
                      item.id === 'networks' ? '/network/' :
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

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/30 p-4"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }}
          >
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              className="max-w-2xl mx-auto mt-14 bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-100">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search guides, tools, and pages..."
                    className="w-full h-12 rounded-2xl border border-slate-200 pl-11 pr-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#a0f399]/50 focus:border-[#1b6d24]"
                  />
                </div>
              </div>
              <div className="max-h-[60vh] overflow-auto p-2">
                {filteredSearchItems.length === 0 ? (
                  <div className="p-4 text-sm text-slate-500">No results found.</div>
                ) : (
                  filteredSearchItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSearchItemClick(item)}
                      className="w-full text-left p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="font-bold text-slate-900 text-sm line-clamp-1">{item.title}</div>
                      <div className="text-xs text-slate-500 mt-1 line-clamp-1">{item.subtitle}</div>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
