import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Truck, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

interface OrderSummaryProps {
  onCheckout: () => void;
}

export default function OrderSummary({ onCheckout }: OrderSummaryProps) {
  const { t } = useLanguage();
  const { items, subtotal, deliveryCost } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal + deliveryCost;
  const canCheckout = items.length > 0;

  return (
    <div className="bg-soil-50 rounded-2xl p-6">
      <h3 className="font-display text-display-sm text-soil-900 mb-4">
        {t('cart.subtotal') as string}
      </h3>

      {/* Subtotal row */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[15px] text-soil-700">
          {t('cart.subtotal') as string} ({itemCount} {itemCount > 1 ? (t('cart.items.count') as string) : (t('cart.item') as string)})
        </span>
        <motion.span
          key={subtotal}
          initial={{ scale: 1.1, color: '#C75B2A' }}
          animate={{ scale: 1, color: '#2D2926' }}
          transition={{ duration: 0.3 }}
          className="text-[15px] font-semibold text-soil-900"
        >
          {subtotal.toLocaleString()} FCFA
        </motion.span>
      </div>

      {/* Delivery row */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[15px] text-soil-700">{t('cart.delivery') as string}</span>
        <span className={`text-[14px] ${deliveryCost > 0 ? 'font-semibold text-soil-900' : 'text-soil-500'}`}>
          {deliveryCost > 0 ? `${deliveryCost.toLocaleString()} FCFA` : (t('cart.delivery.calculate') as string)}
        </span>
      </div>

      {/* Escrow row */}
      <div className="flex items-center gap-2 mb-2 group relative">
        <ShieldCheck size={16} className="text-leaf shrink-0" />
        <span className="text-[13px] text-leaf font-medium">{t('cart.escrow') as string}</span>
        {/* Tooltip */}
        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-soil-800 text-white text-[12px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-56 z-10">
          {t('cart.escrow.tooltip') as string}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-soil-300 my-4" />

      {/* Total */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-[17px] font-bold text-soil-900">{t('cart.total') as string}</span>
        <motion.span
          key={total}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-price-lg text-soil-900"
        >
          {total.toLocaleString()} FCFA
        </motion.span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={!canCheckout}
        className="w-full h-14 bg-terracotta text-white font-semibold text-[15px] rounded-[10px] hover:bg-terracotta-dark active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none"
      >
        {t('cart.checkout') as string}
      </button>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-soil-500">
          <Lock size={14} />
          <span className="text-[12px]">{t('cart.trust.secure') as string}</span>
        </div>
        <div className="flex items-center gap-1.5 text-soil-500">
          <ShieldCheck size={14} />
          <span className="text-[12px]">{t('cart.trust.escrow') as string}</span>
        </div>
        <div className="flex items-center gap-1.5 text-soil-500">
          <Truck size={14} />
          <span className="text-[12px]">{t('cart.trust.tracking') as string}</span>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[80] flex items-center justify-center p-4"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle size={24} className="text-warning" />
                <h3 className="font-display text-display-sm text-soil-900">
                  {t('cart.clear') as string}
                </h3>
              </div>
              <p className="text-body text-soil-600 mb-6">
                {t('cart.clearConfirm') as string}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 h-12 border-[1.5px] border-soil-300 text-soil-700 font-medium rounded-[10px] hover:bg-soil-100 transition-colors"
                >
                  {t('payment.modal.cancel') as string}
                </button>
                <button
                  onClick={() => {
                    // clearCart is available via context if needed
                    setShowClearConfirm(false);
                  }}
                  className="flex-1 h-12 bg-error text-white font-medium rounded-[10px] hover:opacity-90 transition-opacity"
                >
                  {t('cart.clear') as string}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
