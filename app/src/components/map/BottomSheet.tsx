import { useState, useRef, useCallback } from 'react';
import type { PanInfo } from 'framer-motion';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, MessageCircle, BadgeCheck, Navigation } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Producer } from '@/data/producers';

interface BottomSheetProps {
  producer: Producer | null;
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export default function BottomSheet({ producer, isExpanded, onExpand, onCollapse }: BottomSheetProps) {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [isDragging, setIsDragging] = useState(false);
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const PEEK_HEIGHT = 120;
  const EXPANDED_HEIGHT = typeof window !== 'undefined' ? window.innerHeight * 0.75 : 600;

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      setIsDragging(false);
      const threshold = 50;
      if (isExpanded) {
        if (info.offset.y > threshold || info.velocity.y > 300) {
          onCollapse();
        } else {
          animate(y, 0, { type: 'spring', stiffness: 400, damping: 30 });
        }
      } else {
        if (info.offset.y < -threshold || info.velocity.y < -300) {
          onExpand();
        } else {
          animate(y, 0, { type: 'spring', stiffness: 400, damping: 30 });
        }
      }
    },
    [isExpanded, onCollapse, onExpand, y],
  );

  const handleDrag = useCallback(
    (_: unknown, info: PanInfo) => {
      if (isExpanded && info.offset.y > 0) {
        y.set(info.offset.y);
      } else if (!isExpanded && info.offset.y < 0) {
        y.set(info.offset.y);
      }
    },
    [isExpanded, y],
  );

  if (!producer) {
    return (
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-[55] md:hidden"
        style={{ height: PEEK_HEIGHT }}
      >
        <div className="flex flex-col items-center pt-3 pb-2">
          <div className="w-10 h-1 bg-soil-300 rounded-full mb-3" />
          <p className="text-body-sm text-soil-500 px-6 text-center">
            {isEn ? 'Select a producer on the map' : 'Selectionnez un producteur sur la carte'}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-[55] md:hidden overflow-hidden"
      style={{
        height: isExpanded ? EXPANDED_HEIGHT : PEEK_HEIGHT,
        y: isDragging ? y : 0,
      }}
      drag="y"
      dragConstraints={{ top: -EXPANDED_HEIGHT + PEEK_HEIGHT, bottom: 0 }}
      dragElastic={0.15}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Drag handle */}
      <div className="flex flex-col items-center pt-3 pb-2 shrink-0">
        <div className="w-10 h-1 bg-soil-300 rounded-full mb-2" />
      </div>

      {/* Peek content */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-white shadow-md"
            style={{ backgroundImage: `url(${producer.avatar})` }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-sm font-semibold text-soil-900 truncate">
              {producer.name}
            </h3>
            <div className="flex items-center gap-1">
              <MapPin size={11} className="text-leaf" />
              <span className="text-body-sm text-soil-500 truncate">{producer.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={13} className="text-sun fill-sun" />
            <span className="text-sm font-semibold text-soil-700">{producer.rating}</span>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="px-4 pb-6 overflow-y-auto"
          style={{ height: EXPANDED_HEIGHT - PEEK_HEIGHT - 20 }}
        >
          {/* Cover */}
          <div
            className="w-full h-40 rounded-xl bg-cover bg-center mb-4"
            style={{ backgroundImage: `url(${producer.coverImage})` }}
          >
            <div className="w-full h-full bg-gradient-to-t from-soil-900/60 to-transparent rounded-xl" />
          </div>

          {/* Info */}
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-display text-display-sm text-soil-900">{producer.name}</h2>
            <BadgeCheck size={18} className="text-sky shrink-0" />
          </div>
          <p className="text-body text-soil-600 mb-1">
            {isEn ? producer.titleEn : producer.title}
          </p>
          <p className="text-body-sm text-soil-500 mb-3">
            <MapPin size={12} className="inline text-leaf mr-1" />
            {producer.location}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 py-3 border-y border-soil-200">
            <div className="text-center">
              <div className="flex items-center gap-0.5 text-soil-900">
                <Star size={13} className="text-sun fill-sun" />
                <span className="font-semibold text-sm">{producer.rating}</span>
              </div>
              <span className="text-body-sm text-soil-500">{producer.reviews} {isEn ? 'reviews' : 'avis'}</span>
            </div>
            <div className="w-px h-8 bg-soil-200" />
            <div className="text-center">
              <span className="font-semibold text-sm text-soil-900">{producer.sales}</span>
              <span className="block text-body-sm text-soil-500">{isEn ? 'sales' : 'ventes'}</span>
            </div>
            <div className="w-px h-8 bg-soil-200" />
            <div className="text-center">
              <span className="font-semibold text-sm text-soil-900">{producer.farmSize}</span>
              <span className="block text-body-sm text-soil-500">{isEn ? 'farm' : 'ferme'}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/chat?producer=${producer.id}`)}
              className="flex-1 flex items-center justify-center gap-2 bg-terracotta text-white font-semibold py-3 rounded-xl hover:bg-terracotta-dark transition-colors"
            >
              <MessageCircle size={18} />
              {isEn ? 'Contact' : 'Contacter'}
            </button>
            <button
              onClick={() => {
                const url = `https://www.google.com/maps/dir/?api=1&destination=${producer.latitude},${producer.longitude}`;
                window.open(url, '_blank');
              }}
              className="flex items-center justify-center gap-2 px-4 border border-soil-300 rounded-xl text-soil-700 hover:bg-soil-100 transition-colors"
            >
              <Navigation size={16} />
            </button>
          </div>

          {/* Products preview */}
          <h3 className="font-display text-sm font-semibold text-soil-900 mt-5 mb-2">
            {isEn ? 'Products' : 'Produits'} ({producer.products.length})
          </h3>
          <div className="space-y-2">
            {producer.products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-soil-50"
              >
                <div
                  className="w-10 h-10 rounded-lg bg-cover bg-center shrink-0"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-soil-900 truncate">
                    {isEn ? product.nameEn : product.name}
                  </p>
                  <p className="text-body-sm text-soil-500">{product.price} FCFA/{product.unit}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate(`/producer/${producer.id}`)}
            className="w-full mt-4 py-3 border border-terracotta text-terracotta font-semibold rounded-xl hover:bg-terracotta-light transition-colors"
          >
            {isEn ? 'See Full Profile' : 'Voir le Profil Complet'} →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
