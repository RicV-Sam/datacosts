import React from 'react';
import { Menu, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onScrollTo: (id: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onScrollTo, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'deals', label: 'Deals' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'networks', label: 'Networks' },
    { id: 'guides', label: 'Guides' },
    { id: 'ussd', label: 'USSD Codes' },
    { id: 'scorecard', label: 'Scorecard' },
  ];

  return (
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
  );
};
