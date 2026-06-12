import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';
import { REGIONS, CERTIFICATIONS } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  regions: string[];
  certifications: string[];
  inStockOnly: boolean;
  minRating: number;
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApply: (filters: FilterState) => void;
  resultCount: number;
}

export const initialFilters: FilterState = {
  minPrice: 0,
  maxPrice: 50000,
  regions: [],
  certifications: [],
  inStockOnly: false,
  minRating: 0,
};

export default function FilterDrawer({ isOpen, onClose, filters, onApply, resultCount }: FilterDrawerProps) {
  const { lang } = useLanguage();
  const [local, setLocal] = useState<FilterState>(filters);

  const handleReset = () => {
    setLocal(initialFilters);
  };

  const handleApply = () => {
    onApply(local);
    onClose();
  };

  const toggleRegion = (region: string) => {
    setLocal((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }));
  };

  const toggleCert = (cert: string) => {
    setLocal((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert],
    }));
  };

  const toggleRating = (rating: number) => {
    setLocal((prev) => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating,
    }));
  };

  const t = (fr: string, en: string) => (lang === 'fr' ? fr : en);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] overflow-y-auto shadow-xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-soil-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="font-display text-display-sm text-soil-900">{t('Filtres', 'Filters')}</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-body-sm text-terracotta hover:text-terracotta-dark transition-colors"
                >
                  <RotateCcw size={14} />
                  {t('Reinitialiser', 'Reset')}
                </button>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-soil-100 transition-colors"
                >
                  <X size={20} className="text-soil-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Price Range */}
              <div>
                <h3 className="text-body font-semibold text-soil-900 mb-4">{t('Prix', 'Price')}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-body-sm text-soil-500 mb-1 block">{t('Min', 'Min')}</label>
                    <input
                      type="number"
                      value={local.minPrice}
                      onChange={(e) => setLocal((p) => ({ ...p, minPrice: Number(e.target.value) }))}
                      className="w-full h-12 bg-soil-50 border border-soil-300 rounded-[10px] px-3 text-soil-900 font-mono"
                    />
                  </div>
                  <span className="text-soil-400 mt-5">—</span>
                  <div className="flex-1">
                    <label className="text-body-sm text-soil-500 mb-1 block">{t('Max', 'Max')}</label>
                    <input
                      type="number"
                      value={local.maxPrice}
                      onChange={(e) => setLocal((p) => ({ ...p, maxPrice: Number(e.target.value) }))}
                      className="w-full h-12 bg-soil-50 border border-soil-300 rounded-[10px] px-3 text-soil-900 font-mono"
                    />
                  </div>
                </div>
                <p className="text-body-sm text-soil-500 mt-2">FCFA</p>
              </div>

              {/* Regions */}
              <div>
                <h3 className="text-body font-semibold text-soil-900 mb-4">{t('Region', 'Region')}</h3>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((region) => (
                    <button
                      key={region}
                      onClick={() => toggleRegion(region)}
                      className={`px-3 py-2 rounded-full text-sm transition-colors ${
                        local.regions.includes(region)
                          ? 'bg-terracotta text-white'
                          : 'bg-soil-100 text-soil-700 hover:bg-soil-200'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-body font-semibold text-soil-900 mb-4">{t('Certification', 'Certification')}</h3>
                <div className="space-y-2.5">
                  {CERTIFICATIONS.map((cert) => {
                    const label = lang === 'fr' ? cert.label : cert.labelEn;
                    return (
                      <label key={cert.key} className="flex items-center gap-3 cursor-pointer">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            local.certifications.includes(cert.key)
                              ? 'bg-terracotta border-terracotta'
                              : 'border-soil-300'
                          }`}
                          onClick={() => toggleCert(cert.key)}
                        >
                          {local.certifications.includes(cert.key) && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                          )}
                        </div>
                        <span className="text-body text-soil-700">{label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-body font-semibold text-soil-900 mb-4">{t('Disponibilite', 'Availability')}</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    className={`w-11 h-6 rounded-full flex items-center px-0.5 transition-colors ${
                      local.inStockOnly ? 'bg-terracotta justify-end' : 'bg-soil-300 justify-start'
                    }`}
                    onClick={() => setLocal((p) => ({ ...p, inStockOnly: !p.inStockOnly }))}
                  >
                    <div className="w-5 h-5 rounded-full bg-white shadow-sm transition-transform" />
                  </div>
                  <span className="text-body text-soil-700">{t('En stock uniquement', 'In stock only')}</span>
                </label>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-body font-semibold text-soil-900 mb-4">{t('Notation minimale', 'Minimum Rating')}</h3>
                <div className="flex gap-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => toggleRating(rating)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                        local.minRating === rating
                          ? 'bg-terracotta text-white'
                          : 'bg-soil-100 text-soil-700 hover:bg-soil-200'
                      }`}
                    >
                      {rating}+
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-soil-200 p-4">
              <button
                onClick={handleApply}
                className="w-full h-14 bg-terracotta text-white rounded-[12px] font-semibold text-base hover:bg-terracotta-dark hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {t('Appliquer', 'Apply')} ({resultCount} {t('resultats', 'results')})
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
