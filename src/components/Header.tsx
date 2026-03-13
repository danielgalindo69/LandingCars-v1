import { useState, useEffect } from 'react';
import { Car, Heart, Menu, Search, User, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  wishlistCount: number;
  isHomePage?: boolean;
}

const NAV_LINKS = [
  { label: 'Inicio',    key: 'home' },
  { label: 'Vehículos', key: 'cars' },
  { label: 'Contacto',  key: 'contact' },
];

export function Header({ onNavigate, wishlistCount, isHomePage = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHomePage && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent border-transparent'
          : 'bg-[#030213]/95 backdrop-blur-md border-b border-white/10 shadow-2xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <Car className="h-8 w-8 text-amber-400 mr-2 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-bold text-white tracking-wide">
              Auto<span className="text-amber-400">Lux</span>
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(({ label, key }) => (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className="relative text-white/80 hover:text-white transition-colors duration-200 group text-sm tracking-wide uppercase"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onNavigate('wishlist')}
              className="relative p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200">
              <User className="h-5 w-5" />
            </button>

            {/* Mobile menu */}
            <button
              className="md:hidden p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#030213]/98 backdrop-blur-md">
            <div className="px-2 pt-3 pb-4 space-y-1">
              {NAV_LINKS.map(({ label, key }) => (
                <button
                  key={key}
                  onClick={() => { onNavigate(key); setIsMenuOpen(false); }}
                  className="block w-full px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg text-left transition-colors duration-200 uppercase tracking-wide text-sm"
                >
                  {label}
                </button>
              ))}
              <div className="px-4 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar vehículos..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 text-sm outline-none focus:border-amber-400/50 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
