import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, ChevronDown } from 'lucide-react';
import type { Review } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export default function ReviewsSection({ reviews, averageRating, totalReviews }: ReviewsSectionProps) {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(3);
  const [helpfulSet, setHelpfulSet] = useState<Set<number>>(new Set());

  const ratingDistribution = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 15 },
    { stars: 3, pct: 4 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 1 },
  ];

  const filtered = activeFilter === 'all'
    ? reviews
    : reviews.filter((r) => r.rating === Number(activeFilter));

  const visible = filtered.slice(0, visibleCount);

  const toggleHelpful = (id: number) => {
    setHelpfulSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const t = (fr: string, en: string) => (lang === 'fr' ? fr : en);

  const filterTabs = [
    { key: 'all', label: t('Tous', 'All') },
    { key: '5', label: '5 ' + t('Etoiles', 'Stars') },
    { key: '4', label: '4 ' + t('Etoiles', 'Stars') },
    { key: '3', label: '3 ' + t('Etoiles', 'Stars') },
  ];

  return (
    <div ref={ref} className="max-w-[1024px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-display-md text-soil-900">
            {t('Avis Clients', 'Customer Reviews')}
          </h2>
          <p className="text-body-sm text-soil-500 mt-1">
            {totalReviews} {t('avis', 'reviews')}
          </p>
        </div>
        <button className="shrink-0 h-10 px-5 border-[1.5px] border-soil-300 rounded-[10px] text-soil-700 font-semibold text-sm hover:bg-soil-50 transition-colors self-start">
          {t('Ecrire un Avis', 'Write a Review')}
        </button>
      </div>

      {/* Rating Summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-8 mb-8"
      >
        {/* Big rating */}
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[48px] font-bold text-soil-900 leading-none">{averageRating}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.floor(averageRating) ? 'text-sun fill-sun' : 'text-soil-300'}
                />
              ))}
            </div>
          </div>
          <p className="text-body-sm text-soil-500 mt-1">{t('sur 5', 'out of 5')}</p>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 space-y-1.5">
          {ratingDistribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-3">
              <span className="text-body-sm text-soil-600 w-3">{d.stars}</span>
              <Star size={12} className="text-sun fill-sun shrink-0" />
              <div className="flex-1 h-2 bg-soil-200 rounded-full overflow-hidden max-w-[200px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${d.pct}%` } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + d.stars * 0.1 }}
                  className="h-full bg-sun rounded-full"
                />
              </div>
              <span className="text-body-sm text-soil-500 w-8">{d.pct}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveFilter(tab.key);
              setVisibleCount(3);
            }}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === tab.key
                ? 'bg-terracotta text-white'
                : 'bg-soil-100 text-soil-700 hover:bg-soil-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Review cards */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {visible.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-soil-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-soil-200 flex items-center justify-center text-soil-600 font-semibold text-sm">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-body font-semibold text-soil-900">{review.author}</p>
                    <p className="text-body-sm text-soil-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < review.rating ? 'text-sun fill-sun' : 'text-soil-300'}
                    />
                  ))}
                </div>
              </div>

              {/* Title */}
              <h4 className="text-body font-semibold text-soil-800 mb-1">
                {lang === 'fr' ? review.title : review.titleEn}
              </h4>

              {/* Body */}
              <p className="text-body text-soil-700 mb-3">
                {lang === 'fr' ? review.body : review.bodyEn}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(lang === 'fr' ? review.tags : review.tagsEn).map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-soil-100 text-soil-600 text-body-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Helpful */}
              <button
                onClick={() => toggleHelpful(review.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-body-sm transition-colors ${
                  helpfulSet.has(review.id)
                    ? 'bg-sky-light text-sky'
                    : 'bg-soil-50 text-soil-600 hover:bg-soil-100'
                }`}
              >
                <ThumbsUp size={14} />
                {t('Utile', 'Helpful')} ({review.helpful + (helpfulSet.has(review.id) ? 1 : 0)})
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show more */}
      {visibleCount < filtered.length && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setVisibleCount((c) => c + 3)}
          className="w-full mt-6 h-12 flex items-center justify-center gap-2 text-soil-600 hover:text-soil-900 transition-colors text-sm font-medium"
        >
          <ChevronDown size={18} />
          {t('Voir Plus', 'Show More')}
        </motion.button>
      )}
    </div>
  );
}
