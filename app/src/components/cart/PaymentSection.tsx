import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Smartphone, Loader2, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function PaymentSection() {
  const { t } = useLanguage();
  const {
    subtotal,
    deliveryCost,
    paymentMethod,
    setPaymentMethod,
    paymentPhone,
    setPaymentPhone,
    setCheckoutStep,
    setIsProcessing,
    isProcessing,
    generateOrderNumber,
    deliveryInfo,
    items,
  } = useCart();
  const [phoneError, setPhoneError] = useState('');
  const [showEscrow, setShowEscrow] = useState(false);

  const total = subtotal + deliveryCost;

  const validatePhone = (phone: string) => {
    const clean = phone.replace(/\s/g, '');
    if (!clean) return false;
    if (paymentMethod === 'momo') {
      return /^6\d{8}$/.test(clean);
    }
    if (paymentMethod === 'orange-money') {
      return /^6\d{8}$/.test(clean);
    }
    return false;
  };

  const handlePayment = () => {
    if (!paymentMethod) return;
    if (!validatePhone(paymentPhone)) {
      setPhoneError(t('validation.phone') as string);
      return;
    }
    setPhoneError('');
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowEscrow(true);
      generateOrderNumber();

      // After showing escrow, move to confirmation
      setTimeout(() => {
        setCheckoutStep('confirmation');
      }, 2500);
    }, 3000);
  };

  const handleCancel = () => {
    setIsProcessing(false);
    setShowEscrow(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="bg-white p-6 rounded-2xl max-w-[768px] mx-auto relative"
    >
      {/* Title */}
      <h2 className="font-display text-display-md text-soil-900">
        {t('payment.title') as string}
      </h2>

      {/* Escrow Banner */}
      <div className="mt-4 p-4 bg-leaf-light rounded-xl flex items-start gap-3">
        <ShieldCheck size={24} className="text-leaf shrink-0 mt-0.5" />
        <div>
          <p className="text-[15px] font-semibold text-leaf-dark">
            {t('payment.escrow.title') as string}
          </p>
          <p className="text-[13px] text-soil-600 mt-0.5">
            {t('payment.escrow.subtitle') as string}
          </p>
        </div>
      </div>

      {/* Order Recap */}
      <div className="mt-4 p-4 bg-soil-50 rounded-xl text-[14px] text-soil-700">
        <p>
          <strong>{items.reduce((s, i) => s + i.quantity, 0)}</strong>{' '}
          {items.reduce((s, i) => s + i.quantity, 0) > 1
            ? (t('cart.items.count') as string)
            : (t('cart.item') as string)}
          {' — '}
          {t('cart.delivery') as string} {deliveryInfo?.city ? `(${deliveryInfo.city})` : ''}
          {' — '}
          <strong>{t('cart.total') as string}: {total.toLocaleString()} FCFA</strong>
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="mt-6 space-y-3">
        {/* MTN MoMo */}
        <motion.label
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`flex items-start gap-4 p-5 rounded-[14px] border-[2px] cursor-pointer transition-all duration-200 ${
            paymentMethod === 'momo'
              ? 'border-[#F5A623] bg-[#F5A623]/5'
              : 'border-soil-200 hover:border-soil-300'
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="momo"
            checked={paymentMethod === 'momo'}
            onChange={() => {
              setPaymentMethod('momo');
              setPhoneError('');
            }}
            className="mt-1 w-4 h-4 accent-terracotta"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-[#1C1917] font-bold text-sm"
                style={{ backgroundColor: '#F5A623' }}
              >
                MoMo
              </div>
              <div>
                <p className="text-[15px] font-semibold text-soil-900">
                  {t('payment.momo') as string}
                </p>
                <p className="text-[13px] text-soil-600">
                  {t('payment.momo.desc') as string}
                </p>
              </div>
            </div>

            <AnimatePresence>
              {paymentMethod === 'momo' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 overflow-hidden"
                >
                  <label className="block text-sm font-medium text-soil-700 mb-1.5">
                    {t('payment.momo.number') as string}
                  </label>
                  <input
                    type="tel"
                    placeholder={t('payment.momo.placeholder') as string}
                    value={paymentPhone}
                    onChange={(e) => {
                      setPaymentPhone(e.target.value);
                      setPhoneError('');
                    }}
                    className={`w-full h-12 bg-soil-50 border-[1.5px] rounded-[10px] px-4 text-[15px] outline-none transition-all ${
                      phoneError
                        ? 'border-error shadow-[0_0_0_3px_rgba(194,59,43,0.1)]'
                        : 'border-soil-300 focus:border-[#F5A623] focus:shadow-[0_0_0_3px_rgba(245,166,35,0.15)]'
                    }`}
                  />
                  {phoneError && <p className="text-error text-[13px] mt-1">{phoneError}</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.label>

        {/* Orange Money */}
        <motion.label
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`flex items-start gap-4 p-5 rounded-[14px] border-[2px] cursor-pointer transition-all duration-200 ${
            paymentMethod === 'orange-money'
              ? 'border-[#FF6600] bg-[#FF6600]/5'
              : 'border-soil-200 hover:border-soil-300'
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="orange-money"
            checked={paymentMethod === 'orange-money'}
            onChange={() => {
              setPaymentMethod('orange-money');
              setPhoneError('');
            }}
            className="mt-1 w-4 h-4 accent-terracotta"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: '#FF6600' }}
              >
                OM
              </div>
              <div>
                <p className="text-[15px] font-semibold text-soil-900">
                  {t('payment.orange') as string}
                </p>
                <p className="text-[13px] text-soil-600">
                  {t('payment.orange.desc') as string}
                </p>
              </div>
            </div>

            <AnimatePresence>
              {paymentMethod === 'orange-money' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 overflow-hidden"
                >
                  <label className="block text-sm font-medium text-soil-700 mb-1.5">
                    {t('payment.orange.number') as string}
                  </label>
                  <input
                    type="tel"
                    placeholder={t('payment.orange.placeholder') as string}
                    value={paymentPhone}
                    onChange={(e) => {
                      setPaymentPhone(e.target.value);
                      setPhoneError('');
                    }}
                    className={`w-full h-12 bg-soil-50 border-[1.5px] rounded-[10px] px-4 text-[15px] outline-none transition-all ${
                      phoneError
                        ? 'border-error shadow-[0_0_0_3px_rgba(194,59,43,0.1)]'
                        : 'border-soil-300 focus:border-[#FF6600] focus:shadow-[0_0_0_3px_rgba(255,102,0,0.15)]'
                    }`}
                  />
                  {phoneError && <p className="text-error text-[13px] mt-1">{phoneError}</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.label>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        disabled={!paymentMethod || isProcessing}
        className="w-full h-14 mt-6 rounded-[12px] font-semibold text-[17px] text-white transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]"
        style={{
          backgroundColor:
            paymentMethod === 'momo' ? '#F5A623' : paymentMethod === 'orange-money' ? '#FF6600' : '#C75B2A',
        }}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={20} className="animate-spin" />
            {t('payment.processing') as string}
          </span>
        ) : (
          <span>
            {t('payment.cta') as string} {total.toLocaleString()} FCFA
          </span>
        )}
      </button>

      {/* Back Button */}
      <button
        onClick={() => setCheckoutStep('delivery')}
        disabled={isProcessing}
        className="w-full h-12 mt-2 text-soil-600 font-medium text-sm hover:text-soil-900 transition-colors disabled:opacity-40"
      >
        {t('cart.continue') as string}
      </button>

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && !showEscrow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl"
            >
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
                style={{
                  backgroundColor: paymentMethod === 'momo' ? '#F5A623' : '#FF6600',
                }}
              >
                <Smartphone size={28} className="text-white" />
              </div>
              <h3 className="font-display text-display-sm text-soil-900">
                {t('payment.modal.title') as string}
              </h3>
              <p className="text-body-sm text-soil-600 mt-2">
                {t('payment.modal.desc') as string}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-soil-500">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm">{t('payment.processing') as string}</span>
              </div>
              <button
                onClick={handleCancel}
                className="mt-6 px-6 py-2 text-soil-600 font-medium text-sm hover:text-soil-900 transition-colors"
              >
                {t('payment.modal.cancel') as string}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Escrow Visualization */}
      <AnimatePresence>
        {showEscrow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl"
            >
              {/* Escrow Flow Diagram */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {/* You */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center">
                    <Lock size={20} className="text-white" />
                  </div>
                  <span className="text-[11px] font-medium text-soil-600 mt-1">
                    {t('payment.escrow.flow.you') as string}
                  </span>
                </motion.div>

                {/* Line 1 */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="w-16 h-0.5 bg-soil-300 origin-left"
                />

                {/* Escrow */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="w-14 h-14 rounded-full bg-escrow flex items-center justify-center"
                  >
                    <ShieldCheck size={24} className="text-white" />
                  </motion.div>
                  <span className="text-[11px] font-medium text-leaf mt-1 text-center">
                    {t('payment.escrow.flow.escrow') as string}
                  </span>
                </motion.div>

                {/* Line 2 */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  className="w-16 h-0.5 border-t border-dashed border-soil-300"
                />

                {/* Producer */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-soil-400 flex items-center justify-center">
                    <span className="text-white text-lg">P</span>
                  </div>
                  <span className="text-[11px] font-medium text-soil-500 mt-1">
                    {t('payment.escrow.flow.producer') as string}
                  </span>
                </motion.div>
              </div>

              <div className="text-center">
                <p className="text-leaf font-semibold text-[15px]">
                  {total.toLocaleString()} FCFA {t('payment.escrow.secured') as string}
                </p>
                <p className="text-[13px] text-soil-600 mt-1">
                  {t('payment.escrow.info') as string}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin text-leaf" />
                  <span className="text-sm text-soil-500">
                    {t('payment.processing') as string}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
