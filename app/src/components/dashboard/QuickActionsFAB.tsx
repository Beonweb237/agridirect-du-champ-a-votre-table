import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Package, MessageCircle, BarChart3, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const QuickActionsFAB = memo(function QuickActionsFAB() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const actions = [
    {
      icon: Package,
      label: lang === 'fr' ? 'Nouvelle Commande' : 'New Order',
      onClick: () => navigate('/marketplace'),
    },
    {
      icon: MessageCircle,
      label: lang === 'fr' ? 'Messages' : 'Messages',
      onClick: () => navigate('/chat'),
    },
    {
      icon: BarChart3,
      label: lang === 'fr' ? 'Rapport' : 'Report',
      onClick: () => {},
    },
  ];

  return (
    <>
      {/* Mobile Quick Actions Bar */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-soil-200 z-40 px-4 py-2 flex justify-around items-center">
        <button
          onClick={() => {}}
          className="flex flex-col items-center gap-0.5 text-soil-500 hover:text-terracotta transition-colors"
        >
          <Plus size={20} />
          <span className="text-[10px] font-medium">
            {lang === 'fr' ? 'Ajouter' : 'Add'}
          </span>
        </button>
        <button
          onClick={() => navigate('/marketplace')}
          className="flex flex-col items-center gap-0.5 text-soil-500 hover:text-terracotta transition-colors"
        >
          <Package size={20} />
          <span className="text-[10px] font-medium">
            {lang === 'fr' ? 'Commande' : 'Order'}
          </span>
        </button>
        <button
          onClick={() => navigate('/chat')}
          className="flex flex-col items-center gap-0.5 text-soil-500 hover:text-terracotta transition-colors relative"
        >
          <MessageCircle size={20} />
          <span className="text-[10px] font-medium">
            {lang === 'fr' ? 'Messages' : 'Chat'}
          </span>
          <span className="absolute -top-0.5 -right-1 w-4 h-4 bg-terracotta text-white text-[9px] rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <button
          onClick={() => {}}
          className="flex flex-col items-center gap-0.5 text-soil-500 hover:text-terracotta transition-colors"
        >
          <BarChart3 size={20} />
          <span className="text-[10px] font-medium">
            {lang === 'fr' ? 'Rapport' : 'Report'}
          </span>
        </button>
      </div>

      {/* Desktop FAB */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {open && (
            <div className="absolute bottom-16 right-0 flex flex-col gap-2 items-end">
              {actions.map((action, i) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, scale: 0, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 10 }}
                  transition={{
                    duration: 0.2,
                    delay: i * 0.05,
                    ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
                  }}
                  onClick={() => {
                    action.onClick();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 group"
                >
                  <span className="px-3 py-1.5 bg-soil-800 text-white text-body-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {action.label}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-soil-100 flex items-center justify-center text-soil-700 hover:bg-soil-200 transition-colors shadow-card">
                    <action.icon size={18} />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-terracotta text-white flex items-center justify-center shadow-lg hover:bg-terracotta-dark transition-colors"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Plus size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
});

export default QuickActionsFAB;
