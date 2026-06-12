import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

interface RelatedProductsProps {
  products: Product[];
  categoryKey: string;
}

export default function RelatedProducts({ products, categoryKey }: RelatedProductsProps) {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = dir === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const title = lang === 'fr' ? 'Vous Pourriez Aussi Aimer' : 'You Might Also Like';
  const seeMore = lang === 'fr' ? 'Voir Plus' : 'See More';

  return (
    <div ref={ref} className="max-w-[1280px] mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-display-md text-soil-900"
        >
          {title}
        </motion.h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/marketplace?category=${categoryKey}`)}
            className="text-body-sm text-soil-600 hover:text-terracotta transition-colors"
          >
            {seeMore} →
          </button>
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-soil-300 flex items-center justify-center hover:bg-soil-50 transition-colors"
            >
              <ChevronLeft size={16} className="text-soil-600" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-soil-300 flex items-center justify-center hover:bg-soil-50 transition-colors"
            >
              <ChevronRight size={16} className="text-soil-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2"
      >
        {products.map((product, i) => {
          const name = lang === 'fr' ? product.name : product.nameEn;
          const unit = lang === 'fr' ? product.unit : product.unitEn;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => navigate(`/product/${product.id}`)}
              className="snap-start shrink-0 w-[220px] bg-soil-50 rounded-[14px] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-t-[14px]">
                <img
                  src={product.image}
                  alt={name}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-400"
                />
                {product.isSeasonal && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-sun-light text-sun text-[10px] font-bold rounded-full">
                    {lang === 'fr' ? 'EN SAISON' : 'IN SEASON'}
                  </span>
                )}
                {product.isPromo && product.discountPercent && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-terracotta text-white text-[10px] font-bold rounded-full">
                    -{product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-3">
                <h4 className="font-display text-sm font-semibold text-soil-900 line-clamp-2 mb-1">
                  {name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-soil-900">
                    {product.price.toLocaleString()} FCFA
                  </span>
                  <span className="text-body-sm text-soil-500">/ {unit}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
