import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MapPin, Star, ShoppingCart } from 'lucide-react';
import type { Product } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [favorited, setFavorited] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorited((f) => !f);
  };

  const name = lang === 'fr' ? product.name : product.nameEn;
  const categoryLabel = lang === 'fr' ? product.category : product.categoryEn;
  const location = lang === 'fr' ? product.location : product.locationEn;
  const unit = lang === 'fr' ? product.unit : product.unitEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
      className="group bg-soil-50 rounded-[14px] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden rounded-t-[14px]">
        <img
          src={product.image}
          alt={name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {!imgLoaded && (
          <div className="absolute inset-0 bg-soil-200 animate-shimmer" />
        )}

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isSeasonal && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-sun-light text-sun text-label rounded-full">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              {lang === 'fr' ? 'EN SAISON' : 'IN SEASON'}
            </span>
          )}
          {product.isOrganic && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-leaf-light text-leaf-dark text-label rounded-full">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              {lang === 'fr' ? 'BIO' : 'ORGANIC'}
            </span>
          )}
          {product.isPromo && product.discountPercent && (
            <span className="inline-flex items-center px-2.5 py-1 bg-terracotta text-white text-label rounded-full font-bold">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          aria-label="Favorite"
        >
          <motion.div
            animate={favorited ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
          >
            <Heart
              size={18}
              className={favorited ? 'text-terracotta fill-terracotta' : 'text-soil-600'}
              strokeWidth={favorited ? 0 : 1.5}
            />
          </motion.div>
        </button>
      </div>

      {/* Content area */}
      <div className="p-4">
        {/* Category pill */}
        <span className="inline-block px-3 py-1 bg-soil-200 text-soil-700 text-label rounded-full mb-2">
          {categoryLabel}
        </span>

        {/* Product name */}
        <h3 className="font-display text-display-sm text-soil-900 line-clamp-2 mb-2 min-h-[52px]">
          {name}
        </h3>

        {/* Producer row */}
        <div className="flex items-center gap-2 mb-1">
          <img
            src={product.producerAvatar}
            alt={product.producerName}
            className="w-5 h-5 rounded-full object-cover"
            loading="lazy"
          />
          <span className="text-body-sm text-soil-500 truncate">{product.producerName}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mb-3">
          <MapPin size={12} className="text-soil-500 shrink-0" />
          <span className="text-body-sm text-soil-500">{location}, {product.region}</span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-price text-soil-900">{product.price.toLocaleString()} FCFA</span>
            <span className="text-body-sm text-soil-500">/ {unit}</span>
          </div>
          {product.oldPrice && (
            <span className="text-body-sm text-soil-400 line-through">{product.oldPrice.toLocaleString()} FCFA</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            <Star size={14} className="text-sun fill-sun" />
            <span className="text-body-sm font-semibold text-soil-700">{product.rating}</span>
          </div>
          <span className="text-body-sm text-soil-500">({product.reviewCount})</span>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          className={`w-full h-10 rounded-[10px] text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
            addedToCart
              ? 'bg-leaf text-white'
              : 'bg-leaf text-white hover:bg-leaf-dark hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {addedToCart ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              {lang === 'fr' ? 'Ajoute !' : 'Added!'}
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              {lang === 'fr' ? 'Ajouter au Panier' : 'Add to Cart'}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
