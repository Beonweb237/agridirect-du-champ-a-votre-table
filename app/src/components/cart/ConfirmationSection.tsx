import { motion } from 'framer-motion';
import { CheckCircle2, Package, Truck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function ConfirmationSection() {
  const { lang, t } = useLanguage();
  const {
    orderNumber,
    subtotal,
    deliveryCost,
    deliveryInfo,
    paymentMethod,
    paymentPhone,
    items,
    resetCheckout,
  } = useCart();
  const navigate = useNavigate();

  const total = subtotal + deliveryCost;

  const handleContinueShopping = () => {
    resetCheckout();
    navigate('/marketplace');
  };

  const handleTrackOrder = () => {
    navigate('/dashboard');
  };

  const steps = [
    {
      icon: Package,
      title: t('confirm.step1') as string,
      desc: t('confirm.step1.desc') as string,
      active: true,
    },
    {
      icon: Truck,
      title: t('confirm.step2') as string,
      desc: t('confirm.step2.desc') as string,
      active: false,
    },
    {
      icon: CheckCircle,
      title: t('confirm.step3') as string,
      desc: t('confirm.step3.desc') as string,
      active: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 md:p-12 rounded-2xl max-w-[768px] mx-auto text-center"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
        className="relative inline-flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.4, 1.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
          className="absolute w-24 h-24 rounded-full border-4 border-success/30"
        />
        <CheckCircle2 size={80} className="text-success" strokeWidth={1.5} />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="font-display text-display-lg text-soil-900 mt-6"
      >
        {t('confirm.title') as string}
      </motion.h2>

      {/* Order Number */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="font-mono text-[16px] text-soil-500 mt-2"
      >
        {t('confirm.order') as string} #{orderNumber}
      </motion.p>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="text-body-lg text-soil-600 mt-4 max-w-md mx-auto"
      >
        {(t('confirm.message') as string).replace('{total}', total.toLocaleString())}
      </motion.p>

      {/* Order Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-6 p-6 bg-soil-50 rounded-2xl text-left"
      >
        <h3 className="font-display text-display-sm text-soil-900 mb-4">
          {t('confirm.summary.title') as string}
        </h3>

        {/* Items list */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-soil-200 shrink-0">
                <img
                  src={item.image}
                  alt={lang === 'fr' ? item.name : item.nameEn}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/product-cacao.jpg';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-soil-900 truncate">
                  {lang === 'fr' ? item.name : item.nameEn}
                </p>
                <p className="text-[12px] text-soil-500">
                  x{item.quantity}
                </p>
              </div>
              <p className="text-[14px] font-bold text-soil-900 shrink-0">
                {(item.price * item.quantity).toLocaleString()} FCFA
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-soil-200 my-4" />

        {/* Delivery */}
        <div className="flex justify-between items-center text-[14px]">
          <span className="text-soil-600">{t('confirm.delivery') as string}</span>
          <span className="text-soil-900">
            {deliveryInfo?.city} — {deliveryInfo?.address}
          </span>
        </div>

        {/* Payment method */}
        <div className="flex justify-between items-center text-[14px] mt-2">
          <span className="text-soil-600">{t('confirm.payment') as string}</span>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold"
              style={{
                backgroundColor: paymentMethod === 'momo' ? '#F5A623' : '#FF6600',
                color: paymentMethod === 'momo' ? '#1C1917' : '#fff',
              }}
            >
              {paymentMethod === 'momo' ? 'M' : 'OM'}
            </div>
            <span className="text-soil-900 font-mono text-[13px]">
              {paymentPhone.replace(/(\d{2})(\d{3})(\d{3})/, '$1 $2 $3')}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-soil-200">
          <span className="text-[15px] font-semibold text-soil-900">{t('cart.total') as string}</span>
          <span className="text-price-lg text-soil-900">{total.toLocaleString()} FCFA</span>
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-6"
      >
        <p className="text-sm font-medium text-soil-700 mb-3">
          {t('confirm.estimated') as string}: <span className="text-leaf">{deliveryInfo?.city ? '24-48h' : 'N/A'}</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.3 }}
              className={`flex-1 p-4 rounded-xl border-[1.5px] text-center ${
                step.active
                  ? 'border-leaf bg-leaf-light/40'
                  : 'border-soil-200 bg-soil-50'
              }`}
            >
              <step.icon
                size={24}
                className={`mx-auto ${step.active ? 'text-leaf' : 'text-soil-400'}`}
              />
              <p className={`text-[13px] font-semibold mt-2 ${step.active ? 'text-leaf-dark' : 'text-soil-600'}`}>
                {step.title}
              </p>
              <p className="text-[12px] text-soil-500 mt-0.5">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="mt-8 flex flex-col gap-3"
      >
        <button
          onClick={handleTrackOrder}
          className="w-full h-14 bg-terracotta text-white font-semibold text-[15px] rounded-[10px] hover:bg-terracotta-dark active:scale-[0.98] transition-all duration-200"
        >
          {t('confirm.track') as string}
        </button>
        <button
          onClick={handleContinueShopping}
          className="w-full h-12 border-[1.5px] border-soil-300 text-soil-900 font-medium text-[15px] rounded-[10px] hover:bg-soil-100 transition-all duration-200"
        >
          {t('confirm.shop') as string}
        </button>
      </motion.div>
    </motion.div>
  );
}
