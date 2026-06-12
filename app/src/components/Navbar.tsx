import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Menu, X, Leaf } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const cartCount = 2;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
    }
  };

  const navLinks = [
    { path: '/marketplace', label: t('nav.marketplace') as string },
    { path: '/map', label: t('nav.map') as string },
    { path: '/about', label: t('nav.about') as string },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-250 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-[12px] border-b border-soil-200 shadow-xs'
            : 'bg-transparent'
        }`}
        style={{ height: '56px' }}
      >
        <div className="max-w-[1280px] mx-auto px-4 h-full flex items-center justify-between">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 text-soil-700 hover:text-soil-900 transition-colors"
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1 mr-2">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-terracotta'
                      : 'text-soil-700 hover:text-soil-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 shrink-0"
            >
              <Leaf size={20} className="text-terracotta" />
              <span
                className="font-display text-[18px] font-bold text-terracotta tracking-tight"
              >
                AgriDirect
              </span>
            </button>
          </div>

          {/* Center: Search (desktop) */}
          <form
            onSubmit={handleSearch}
            className={`hidden md:flex items-center transition-all duration-300 ${
              searchFocused ? 'flex-1 max-w-md mx-4' : 'w-48'
            }`}
          >
            <div
              className={`flex items-center w-full bg-soil-100 border rounded-full transition-all duration-200 ${
                searchFocused
                  ? 'border-terracotta shadow-[0_0_0_3px_#F2E0D6]'
                  : 'border-soil-200'
              }`}
              style={{ height: '40px' }}
            >
              <Search size={16} className="ml-3 text-soil-400 shrink-0" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder={t('nav.searchPlaceholder') as string}
                className="flex-1 bg-transparent border-none outline-none px-2 text-sm text-soil-900 placeholder:text-soil-500"
              />
            </div>
          </form>

          {/* Right: Lang toggle + Cart + Avatar */}
          <div className="flex items-center gap-1">
            {/* Language toggle (desktop) */}
            <div className="hidden md:flex items-center gap-1 text-sm mr-2">
              <button
                onClick={() => lang === 'en' && toggleLang()}
                className={`px-1.5 py-1 font-medium transition-colors ${
                  lang === 'fr' ? 'text-terracotta' : 'text-soil-500 hover:text-soil-700'
                }`}
              >
                FR
              </button>
              <span className="text-soil-400">|</span>
              <button
                onClick={() => lang === 'fr' && toggleLang()}
                className={`px-1.5 py-1 font-medium transition-colors ${
                  lang === 'en' ? 'text-terracotta' : 'text-soil-500 hover:text-soil-700'
                }`}
              >
                EN
              </button>
            </div>

            {/* Cart */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 text-soil-700 hover:text-soil-900 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-terracotta text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Avatar / Login */}
            <button
              onClick={() => navigate('/dashboard')}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-leaf text-white text-sm font-semibold ml-1 hover:bg-leaf-dark transition-colors"
            >
              A
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-[60] md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[70] md:hidden shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-soil-200">
                <div className="flex items-center gap-1.5">
                  <Leaf size={20} className="text-terracotta" />
                  <span className="font-display text-[18px] font-bold text-terracotta">
                    AgriDirect
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-soil-700"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="p-4">
                {/* Mobile search */}
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="flex items-center bg-soil-100 border border-soil-200 rounded-full h-11 px-3">
                    <Search size={16} className="text-soil-400 shrink-0" />
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder={t('nav.searchPlaceholder') as string}
                      className="flex-1 bg-transparent border-none outline-none px-2 text-sm text-soil-900 placeholder:text-soil-500"
                    />
                  </div>
                </form>

                {/* Nav links */}
                <div className="space-y-1">
                  {[
                    { path: '/', label: 'bottomnav.home' },
                    { path: '/marketplace', label: 'nav.marketplace' },
                    { path: '/map', label: 'nav.map' },
                    { path: '/dashboard', label: 'nav.dashboard' },
                    { path: '/chat', label: 'nav.chat' },
                    { path: '/about', label: 'nav.about' },
                  ].map((link) => (
                    <button
                      key={link.path}
                      onClick={() => navigate(link.path)}
                      className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive(link.path)
                          ? 'bg-terracotta-light text-terracotta'
                          : 'text-soil-700 hover:bg-soil-100'
                      }`}
                    >
                      {t(link.label) as string}
                    </button>
                  ))}
                </div>

                {/* Language toggle */}
                <div className="mt-4 pt-4 border-t border-soil-200">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-soil-500">Langue / Language:</span>
                    <button
                      onClick={() => lang === 'en' && toggleLang()}
                      className={`px-2 py-1 font-medium transition-colors ${
                        lang === 'fr' ? 'text-terracotta' : 'text-soil-500'
                      }`}
                    >
                      FR
                    </button>
                    <span className="text-soil-400">|</span>
                    <button
                      onClick={() => lang === 'fr' && toggleLang()}
                      className={`px-2 py-1 font-medium transition-colors ${
                        lang === 'en' ? 'text-terracotta' : 'text-soil-500'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
