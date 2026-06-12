import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface PaginationProps {
  displayed: number;
  total: number;
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function Pagination({
  displayed,
  total,
  isLoading,
  hasMore,
  onLoadMore,
}: PaginationProps) {
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <p className="text-body-sm text-soil-500">
        {lang === 'fr'
          ? `Afficher ${displayed} sur ${total} produits`
          : `Showing ${displayed} of ${total} products`}
      </p>

      {hasMore ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onLoadMore}
          disabled={isLoading}
          className="w-[200px] h-[52px] border-[1.5px] border-soil-300 rounded-[10px] text-soil-700 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-soil-50 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin text-soil-500" />
          ) : (
            lang === 'fr' ? 'Charger Plus' : 'Load More'
          )}
        </motion.button>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-body text-soil-500 flex items-center gap-2"
        >
          {lang === 'fr' ? 'Vous avez tout vu !' : 'You\'ve seen it all!'}
          <span className="text-lg">{'\u{1F331}'}</span>
        </motion.p>
      )}
    </div>
  );
}
