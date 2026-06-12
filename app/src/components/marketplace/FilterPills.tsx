import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { CATEGORIES } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

interface FilterPillsProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onOpenAdvancedFilters: () => void;
  hasActiveFilters: boolean;
}

export default function FilterPills({
  activeCategory,
  onCategoryChange,
  onOpenAdvancedFilters,
  hasActiveFilters,
}: FilterPillsProps) {
  const { lang } = useLanguage();

  return (
    <div className="flex items-center gap-2 mt-3 overflow-x-auto hide-scrollbar pb-1">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.key;
        const label = lang === 'fr' ? cat.label : cat.labelEn;

        return (
          <motion.button
            key={cat.key}
            onClick={() => onCategoryChange(cat.key)}
            whileTap={{ scale: 1.05 }}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
              isActive
                ? 'bg-terracotta text-white'
                : 'bg-soil-200 text-soil-700 hover:bg-soil-300'
            }`}
          >
            {cat.icon && <span className="mr-1">{cat.icon}</span>}
            {label}
          </motion.button>
        );
      })}

      {/* Promo pill */}
      <motion.button
        onClick={() => onCategoryChange('promo')}
        whileTap={{ scale: 1.05 }}
        className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
          activeCategory === 'promo'
            ? 'bg-terracotta text-white'
            : 'bg-soil-200 text-soil-700 hover:bg-soil-300'
        }`}
      >
        <span className="mr-1">{'\u{1F4B0}'}</span>
        {lang === 'fr' ? 'En Promo' : 'On Sale'}
      </motion.button>

      {/* Organic pill */}
      <motion.button
        onClick={() => onCategoryChange('organic')}
        whileTap={{ scale: 1.05 }}
        className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
          activeCategory === 'organic'
            ? 'bg-terracotta text-white'
            : 'bg-soil-200 text-soil-700 hover:bg-soil-300'
        }`}
      >
        <span className="mr-1">{'\u{1F33F}'}</span>
        {lang === 'fr' ? 'Bio & Certifie' : 'Organic & Certified'}
      </motion.button>

      {/* Advanced filters button */}
      <motion.button
        onClick={onOpenAdvancedFilters}
        whileTap={{ scale: 0.95 }}
        className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border-[1.5px] transition-colors duration-200 flex items-center gap-1.5 ${
          hasActiveFilters
            ? 'border-terracotta text-terracotta bg-terracotta-light'
            : 'border-soil-300 text-soil-700 hover:bg-soil-100'
        }`}
      >
        <Filter size={14} />
        {lang === 'fr' ? 'Filtres' : 'Filters'}
      </motion.button>
    </div>
  );
}
