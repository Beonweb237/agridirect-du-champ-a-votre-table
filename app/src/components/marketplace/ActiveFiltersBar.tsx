import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { FilterState } from './FilterDrawer';
import { useLanguage } from '@/context/LanguageContext';

interface ActiveFiltersBarProps {
  filters: FilterState;
  onClearFilter: (type: keyof FilterState) => void;
  onClearAll: () => void;
}

export default function ActiveFiltersBar({ filters, onClearFilter, onClearAll }: ActiveFiltersBarProps) {
  const { lang } = useLanguage();
  const hasActiveFilters =
    filters.minPrice > 0 ||
    filters.maxPrice < 50000 ||
    filters.regions.length > 0 ||
    filters.certifications.length > 0 ||
    filters.inStockOnly ||
    filters.minRating > 0;

  if (!hasActiveFilters) return null;

  const pills: { label: string; type: keyof FilterState; value: string }[] = [];

  if (filters.minPrice > 0 || filters.maxPrice < 50000) {
    pills.push({
      label: `${filters.minPrice.toLocaleString()} — ${filters.maxPrice.toLocaleString()} FCFA`,
      type: 'minPrice',
      value: 'price',
    });
  }

  filters.regions.forEach((region) => {
    pills.push({ label: region, type: 'regions', value: region });
  });

  filters.certifications.forEach((cert) => {
    const label =
      cert === 'bio'
        ? lang === 'fr'
          ? 'Bio'
          : 'Organic'
        : cert === 'gap'
          ? 'GAP'
          : cert === 'equitable'
            ? lang === 'fr'
              ? 'Equitable'
              : 'Fair Trade'
            : 'HACCP';
    pills.push({ label, type: 'certifications', value: cert });
  });

  if (filters.inStockOnly) {
    pills.push({
      label: lang === 'fr' ? 'En stock' : 'In stock',
      type: 'inStockOnly',
      value: 'true',
    });
  }

  if (filters.minRating > 0) {
    pills.push({
      label: `${filters.minRating}+ \u2605`,
      type: 'minRating',
      value: String(filters.minRating),
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-soil-50 border-b border-soil-200 px-4 sm:px-6 py-2.5"
    >
      <div className="flex items-center flex-wrap gap-2 max-w-[1280px] mx-auto">
        <AnimatePresence mode="popLayout">
          {pills.map((pill, i) => (
            <motion.button
              key={`${pill.type}-${pill.value}`}
              initial={{ opacity: 0, x: -12, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              onClick={() => onClearFilter(pill.type)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-soil-300 rounded-full text-body-sm text-soil-700 hover:border-terracotta hover:text-terracotta transition-colors"
            >
              {pill.label}
              <X size={12} />
            </motion.button>
          ))}
        </AnimatePresence>

        <button
          onClick={onClearAll}
          className="text-body-sm text-terracotta hover:text-terracotta-dark font-medium transition-colors ml-1"
        >
          {lang === 'fr' ? 'Reinitialiser tout' : 'Clear all'}
        </button>
      </div>
    </motion.div>
  );
}
