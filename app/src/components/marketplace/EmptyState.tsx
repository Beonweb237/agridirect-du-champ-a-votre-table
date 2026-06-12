import { SearchX } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <SearchX size={64} className="text-soil-300 mb-6" />
      <h2 className="font-display text-display-md text-soil-900 mb-3">
        {lang === 'fr' ? 'Aucun produit trouve' : 'No products found'}
      </h2>
      <p className="text-body text-soil-600 max-w-md mb-8">
        {lang === 'fr'
          ? 'Essayez de modifier vos filtres ou elargissez votre recherche.'
          : 'Try adjusting your filters or broadening your search.'}
      </p>
      <button
        onClick={onReset}
        className="h-12 px-8 bg-terracotta text-white rounded-[10px] font-semibold text-sm hover:bg-terracotta-dark hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        {lang === 'fr' ? 'Reinitialiser les Filtres' : 'Reset Filters'}
      </button>
    </div>
  );
}
