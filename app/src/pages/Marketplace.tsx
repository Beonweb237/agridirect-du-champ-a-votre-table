import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/marketplace/ProductCard';
import FilterPills from '@/components/marketplace/FilterPills';
import FilterDrawer, { initialFilters, type FilterState } from '@/components/marketplace/FilterDrawer';
import ActiveFiltersBar from '@/components/marketplace/ActiveFiltersBar';
import Pagination from '@/components/marketplace/Pagination';
import EmptyState from '@/components/marketplace/EmptyState';
import { filterProducts, SORT_OPTIONS } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

const ITEMS_PER_PAGE = 12;

export default function Marketplace() {
  const { lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState('all');
  const [sortKey, setSortKey] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  // Apply category from filter pills (special values)
  const handleCategoryChange = useCallback(
    (cat: string) => {
      setActiveCategory(cat);
      setVisibleCount(ITEMS_PER_PAGE);
      // For special category pills like promo/organic, we handle in filtering
    },
    [],
  );

  // Filter and sort products
  const filtered = useMemo(() => {
    let category = activeCategory;
    let certs = [...filters.certifications];

    // Handle special category pills
    if (activeCategory === 'promo') {
      category = 'all';
    }
    if (activeCategory === 'organic') {
      category = 'all';
      if (!certs.includes('bio')) certs = [...certs, 'bio'];
    }

    let result = filterProducts(
      category,
      searchQuery,
      filters.regions,
      certs,
      filters.minPrice,
      filters.maxPrice,
      filters.inStockOnly,
      sortKey,
    );

    // Post-filter for promo
    if (activeCategory === 'promo') {
      result = result.filter((p) => p.isPromo);
    }

    // Post-filter for rating
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    return result;
  }, [activeCategory, searchQuery, filters, sortKey]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      setIsLoading(false);
    }, 400);
  };

  const handleClearFilter = (type: keyof FilterState) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (type === 'minPrice' || type === 'maxPrice') {
        next.minPrice = 0;
        next.maxPrice = 50000;
      } else if (type === 'regions') {
        next.regions = [];
      } else if (type === 'certifications') {
        next.certifications = [];
      } else if (type === 'inStockOnly') {
        next.inStockOnly = false;
      } else if (type === 'minRating') {
        next.minRating = 0;
      }
      return next;
    });
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleClearAll = () => {
    setFilters(initialFilters);
    setActiveCategory('all');
    setSearchParams({});
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleResetEmpty = () => {
    setFilters(initialFilters);
    setActiveCategory('all');
    setSearchParams({});
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const hasActiveFilters =
    filters.minPrice > 0 ||
    filters.maxPrice < 50000 ||
    filters.regions.length > 0 ||
    filters.certifications.length > 0 ||
    filters.inStockOnly ||
    filters.minRating > 0;

  const title = lang === 'fr' ? 'Le Marche' : 'The Market';
  const resultText =
    lang === 'fr'
      ? `${filtered.length.toLocaleString()} produit${filtered.length > 1 ? 's' : ''}`
      : `${filtered.length.toLocaleString()} product${filtered.length > 1 ? 's' : ''}`;

  return (
    <Layout>
      {/* Page Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-soil-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-[72px] pb-3">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <h1 className="font-display text-display-md text-soil-900">{title}</h1>
              <span className="hidden sm:inline text-body-sm text-soil-500">{resultText}</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort dropdown */}
              <div className="relative">
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value)}
                  className="appearance-none h-9 pl-3 pr-8 bg-soil-50 border border-soil-200 rounded-lg text-sm text-soil-700 cursor-pointer hover:bg-soil-100 transition-colors focus:outline-none focus:border-terracotta"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {lang === 'fr' ? opt.label : opt.labelEn}
                    </option>
                  ))}
                </select>
                <SlidersHorizontal
                  size={14}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-soil-500 pointer-events-none"
                />
              </div>

              {/* View toggle */}
              <div className="hidden sm:flex items-center bg-soil-100 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-terracotta' : 'text-soil-500'
                  }`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-terracotta' : 'text-soil-500'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Filter pills */}
          <FilterPills
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            onOpenAdvancedFilters={() => setDrawerOpen(true)}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Active filters bar */}
        <ActiveFiltersBar
          filters={filters}
          onClearFilter={handleClearFilter}
          onClearAll={handleClearAll}
        />
      </div>

      {/* Product Grid */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
        {filtered.length === 0 ? (
          <EmptyState onReset={handleResetEmpty} />
        ) : viewMode === 'grid' ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            layout
          >
            {visible.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div className="space-y-4" layout>
            {visible.map((product, i) => (
              <ProductListCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <Pagination
            displayed={visible.length}
            total={filtered.length}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        )}
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onApply={setFilters}
        resultCount={filtered.length}
      />
    </Layout>
  );
}

/* ------------------------------------------------------------------ */
/*  ProductListCard — horizontal card for list view                    */
/* ------------------------------------------------------------------ */
import { Heart, MapPin, Star, ShoppingCart } from 'lucide-react';
import type { Product } from '@/data/products';
import { useNavigate } from 'react-router-dom';

function ProductListCard({ product, index }: { product: Product; index: number }) {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [favorited, setFavorited] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const name = lang === 'fr' ? product.name : product.nameEn;
  const location = lang === 'fr' ? product.location : product.locationEn;
  const unit = lang === 'fr' ? product.unit : product.unitEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="group flex gap-4 bg-soil-50 rounded-[14px] shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden p-3"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image */}
      <div className="relative w-[120px] h-[120px] shrink-0 rounded-[10px] overflow-hidden">
        <img
          src={product.image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
        />
        {product.isSeasonal && (
          <span className="absolute top-2 left-2 px-2 py-0.5 bg-sun-light text-sun text-[10px] font-bold tracking-wider rounded-full">
            {lang === 'fr' ? 'EN SAISON' : 'IN SEASON'}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 py-1">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-label text-soil-500 uppercase tracking-wider">
              {lang === 'fr' ? product.category : product.categoryEn}
            </span>
            <h3 className="font-display text-display-sm text-soil-900 mt-0.5 line-clamp-1">
              {name}
            </h3>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFavorited((f) => !f);
            }}
            className="shrink-0 p-1"
          >
            <Heart
              size={18}
              className={favorited ? 'text-terracotta fill-terracotta' : 'text-soil-400'}
              strokeWidth={favorited ? 0 : 1.5}
            />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <img src={product.producerAvatar} alt="" className="w-5 h-5 rounded-full object-cover" />
          <span className="text-body-sm text-soil-500">{product.producerName}</span>
          <MapPin size={12} className="text-soil-400" />
          <span className="text-body-sm text-soil-500">{location}</span>
        </div>

        <p className="text-body-sm text-soil-600 mt-1 line-clamp-2">
          {lang === 'fr' ? product.description : product.descriptionEn}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-price text-soil-900">{product.price.toLocaleString()} FCFA</span>
            <span className="text-body-sm text-soil-500">/ {unit}</span>
            {product.oldPrice && (
              <span className="text-body-sm text-soil-400 line-through ml-1">{product.oldPrice.toLocaleString()} FCFA</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-sun fill-sun" />
              <span className="text-body-sm font-semibold text-soil-700">{product.rating}</span>
            </div>
            <button
              onClick={handleAddToCart}
              className={`h-8 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                addedToCart ? 'bg-leaf text-white' : 'bg-leaf text-white hover:bg-leaf-dark'
              }`}
            >
              <ShoppingCart size={14} />
              {addedToCart
                ? lang === 'fr' ? 'Ajoute!' : 'Added!'
                : lang === 'fr' ? 'Ajouter' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
