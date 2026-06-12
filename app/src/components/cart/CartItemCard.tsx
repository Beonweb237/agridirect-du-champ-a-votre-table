import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import type { CartItem } from '@/context/CartContext';

interface CartItemCardProps {
  item: CartItem;
  index: number;
}

export default function CartItemCard({ item, index }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCart();
  const { lang, t } = useLanguage();
  const [removing, setRemoving] = useState(false);

  const x = useMotionValue(0);
  const bgOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => removeItem(item.id), 300);
  };

  const handleDecrement = () => {
    if (item.quantity <= 1) {
      handleRemove();
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const itemTotal = item.price * item.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={removing ? { opacity: 0, x: -200, height: 0, marginBottom: 0 } : { opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -200, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: removing ? 0 : index * 0.08 }}
      className="relative overflow-hidden rounded-xl mb-3"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Swipe delete background (mobile) */}
      <motion.div
        className="absolute inset-0 bg-error rounded-xl flex items-center justify-end pr-6 md:hidden"
        style={{ opacity: bgOpacity }}
      >
        <div className="flex items-center gap-2 text-white font-medium">
          <Trash2 size={18} />
          <span className="text-sm">{t('cart.remove') as string}</span>
        </div>
      </motion.div>

      {/* Item card */}
      <motion.div
        className="flex items-center p-4 bg-soil-50 rounded-xl relative z-10"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.x < -80) {
            handleRemove();
          }
        }}
      >
        {/* Product Image */}
        <div className="w-20 h-20 rounded-[10px] overflow-hidden bg-soil-200 shrink-0">
          <img
            src={item.image}
            alt={lang === 'fr' ? item.name : item.nameEn}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/product-cacao.jpg';
            }}
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col ml-4 flex-grow min-w-0">
          <p className="text-[15px] font-semibold text-soil-900 leading-snug line-clamp-2">
            {lang === 'fr' ? item.name : item.nameEn}
          </p>
          <p className="text-[13px] text-soil-500 mt-0.5">{item.producer}</p>
          <p className="text-[13px] text-soil-600 mt-0.5">
            {item.price.toLocaleString()} FCFA/{item.unit}
          </p>
        </div>

        {/* Quantity Stepper */}
        <div className="flex items-center gap-0 ml-3 shrink-0">
          <button
            onClick={handleDecrement}
            className="w-9 h-9 flex items-center justify-center rounded-l-lg border border-soil-300 bg-soil-50 hover:bg-soil-100 transition-colors"
            aria-label="Decrease quantity"
          >
            {item.quantity <= 1 ? (
              <Trash2 size={14} className="text-error" />
            ) : (
              <Minus size={14} className="text-soil-700" />
            )}
          </button>
          <div className="w-9 h-9 flex items-center justify-center border-t border-b border-soil-300 bg-white">
            <span className="text-sm font-semibold text-soil-900">{item.quantity}</span>
          </div>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-r-lg border border-soil-300 bg-soil-50 hover:bg-soil-100 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={14} className="text-soil-700" />
          </button>
        </div>

        {/* Price & Remove */}
        <div className="ml-4 flex flex-col items-end shrink-0">
          <p className="text-[15px] font-bold text-soil-900">
            {itemTotal.toLocaleString()} FCFA
          </p>
          <button
            onClick={handleRemove}
            className="mt-1 p-1 text-soil-400 hover:text-error transition-colors hidden md:block"
            aria-label="Remove item"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
