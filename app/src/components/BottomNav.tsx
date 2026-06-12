import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, MapPin, ShoppingCart, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const cartCount = 2;

  const tabs = [
    { path: '/', icon: Home, label: t('bottomnav.home') },
    { path: '/marketplace', icon: ShoppingBag, label: t('bottomnav.market') },
    { path: '/map', icon: MapPin, label: t('bottomnav.map') },
    { path: '/cart', icon: ShoppingCart, label: t('bottomnav.cart'), badge: cartCount },
    { path: '/dashboard', icon: User, label: t('bottomnav.profile') },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-soil-200 safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const isActive =
            tab.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(tab.path);
          const Icon = tab.icon;

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center gap-0.5 w-full h-full relative transition-colors ${
                isActive ? 'text-terracotta' : 'text-soil-400'
              }`}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-terracotta text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {tab.label as string}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
