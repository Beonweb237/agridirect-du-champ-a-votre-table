import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { useCart, CartProvider } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import CartItemCard from '@/components/cart/CartItemCard';
import OrderSummary from '@/components/cart/OrderSummary';
import StepIndicator from '@/components/cart/StepIndicator';
import DeliveryForm from '@/components/cart/DeliveryForm';
import PaymentSection from '@/components/cart/PaymentSection';
import ConfirmationSection from '@/components/cart/ConfirmationSection';

function CartPageContent() {
  const { t } = useLanguage();
  const {
    items,
    checkoutStep,
    setCheckoutStep,
    subtotal,
    deliveryCost,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal + deliveryCost;

  const handleCheckout = useCallback(() => {
    setCheckoutStep('delivery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setCheckoutStep]);

  const isCartView = checkoutStep === 'cart';
  const isDelivery = checkoutStep === 'delivery';
  const isPayment = checkoutStep === 'payment';
  const isConfirmation = checkoutStep === 'confirmation';
  const showStepIndicator = isDelivery || isPayment || isConfirmation;

  return (
    <Layout>
      <div className="min-h-[100dvh] bg-soil-50 pt-[56px] md:pt-[64px]">
        {/* Page Header */}
        <div className="bg-white border-b border-soil-200">
          <div className="max-w-[1280px] mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showStepIndicator && (
                <button
                  onClick={() => {
                    if (isDelivery) setCheckoutStep('cart');
                    else if (isPayment) setCheckoutStep('delivery');
                  }}
                  className="p-2 -ml-2 text-soil-700 hover:text-soil-900 transition-colors md:hidden"
                  aria-label="Go back"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div>
                <h1 className="font-display text-display-md text-soil-900">
                  {isConfirmation
                    ? (t('confirm.title') as string)
                    : isDelivery
                      ? (t('checkout.step.delivery') as string)
                      : isPayment
                        ? (t('payment.title') as string)
                        : (t('cart.title') as string)}
                </h1>
                {!showStepIndicator && (
                  <p className="text-body-sm text-soil-600 mt-0.5">
                    {itemCount} {itemCount > 1 ? (t('cart.items.count') as string) : (t('cart.item') as string)}
                    {items.length > 0 && ` — ${total.toLocaleString()} FCFA`}
                  </p>
                )}
              </div>
            </div>

            {/* Desktop back buttons for checkout */}
            {showStepIndicator && !isConfirmation && (
              <div className="hidden md:flex items-center gap-2">
                {isPayment && (
                  <button
                    onClick={() => setCheckoutStep('delivery')}
                    className="px-4 py-2 text-sm text-soil-600 hover:text-soil-900 transition-colors"
                  >
                    {t('checkout.step.delivery') as string}
                  </button>
                )}
                {isDelivery && (
                  <button
                    onClick={() => setCheckoutStep('cart')}
                    className="px-4 py-2 text-sm text-soil-600 hover:text-soil-900 transition-colors"
                  >
                    {t('cart.title') as string}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Step Indicator */}
        <AnimatePresence>
          {showStepIndicator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border-b border-soil-200"
            >
              <StepIndicator currentStep={checkoutStep} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <div className="max-w-[1280px] mx-auto px-4 py-6 md:py-8">
          <AnimatePresence mode="wait">
            {/* Cart View */}
            {isCartView && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {items.length === 0 ? (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center">
                    <ShoppingCart size={64} className="text-soil-300 mb-4" />
                    <h2 className="font-display text-display-md text-soil-900">
                      {t('cart.empty.title') as string}
                    </h2>
                    <p className="text-body text-soil-600 mt-2 max-w-sm">
                      {t('cart.empty.subtitle') as string}
                    </p>
                    <button
                      onClick={() => navigate('/marketplace')}
                      className="mt-6 px-8 h-14 bg-terracotta text-white font-semibold text-[15px] rounded-[10px] hover:bg-terracotta-dark active:scale-[0.98] transition-all duration-200"
                    >
                      {t('cart.empty.cta') as string}
                    </button>
                  </div>
                ) : (
                  /* Cart with items */
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Left: Cart Items */}
                    <div className="flex-1 lg:max-w-[60%]">
                      <div className="space-y-0">
                        {items.map((item, index) => (
                          <CartItemCard key={item.id} item={item} index={index} />
                        ))}
                      </div>

                      {/* Cart Actions */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-soil-200">
                        <button
                          onClick={() => navigate('/marketplace')}
                          className="flex items-center gap-2 text-soil-700 hover:text-soil-900 text-[14px] font-medium transition-colors"
                        >
                          <ArrowRight size={16} className="rotate-180" />
                          {t('cart.continue') as string}
                        </button>
                        <button
                          onClick={clearCart}
                          className="flex items-center gap-2 text-error hover:opacity-80 text-[14px] font-medium transition-opacity"
                        >
                          <Trash2 size={16} />
                          {t('cart.clear') as string}
                        </button>
                      </div>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:w-[40%]">
                      <div className="lg:sticky lg:top-[100px]">
                        <OrderSummary onCheckout={handleCheckout} />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Delivery Step */}
            {isDelivery && (
              <motion.div
                key="delivery"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                  <div className="flex-1 lg:max-w-[60%]">
                    <DeliveryForm />
                  </div>
                  <div className="lg:w-[40%]">
                    <div className="lg:sticky lg:top-[100px]">
                      <OrderSummary onCheckout={handleCheckout} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payment Step */}
            {isPayment && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                  <div className="flex-1 lg:max-w-[60%]">
                    <PaymentSection />
                  </div>
                  <div className="lg:w-[40%]">
                    <div className="lg:sticky lg:top-[100px]">
                      <OrderSummary onCheckout={handleCheckout} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Confirmation Step */}
            {isConfirmation && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ConfirmationSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}

// Wrap the page content with CartProvider
export default function Cart() {
  return (
    <CartProvider>
      <CartPageContent />
    </CartProvider>
  );
}
