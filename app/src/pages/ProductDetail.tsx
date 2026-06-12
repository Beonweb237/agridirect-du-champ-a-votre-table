import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Star,
  MapPin,
  BadgeCheck,
  Sun,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShoppingCart,
  MessageCircle,
  Minus,
  Plus,
} from 'lucide-react';
import Layout from '@/components/Layout';
import ImageGallery from '@/components/product/ImageGallery';
import ProductDescription from '@/components/product/ProductDescription';
import ProducerMiniCard from '@/components/product/ProducerMiniCard';
import TraceabilityTimeline from '@/components/product/TraceabilityTimeline';
import ReviewsSection from '@/components/product/ReviewsSection';
import RelatedProducts from '@/components/product/RelatedProducts';
import { getProductById, getRelatedProducts } from '@/data/products';
import { getProducerById } from '@/data/producers';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const productId = Number(id);

  const product = useMemo(() => getProductById(productId), [productId]);
  const producer = useMemo(() => (product ? getProducerById(product.producerId) : undefined), [product]);
  const relatedProducts = useMemo(() => (product ? getRelatedProducts(product) : []), [product]);

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [buyNow, setBuyNow] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="pt-24 px-6 min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="font-display text-display-lg text-soil-900 mb-4">
            {lang === 'fr' ? 'Produit non trouve' : 'Product not found'}
          </h1>
          <button
            onClick={() => navigate('/marketplace')}
            className="h-12 px-6 bg-terracotta text-white rounded-[10px] font-semibold hover:bg-terracotta-dark transition-colors"
          >
            {lang === 'fr' ? 'Retour au Marche' : 'Back to Marketplace'}
          </button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleBuyNow = () => {
    setBuyNow(true);
    setTimeout(() => {
      setBuyNow(false);
      navigate('/cart');
    }, 800);
  };

  const incrementQty = () => setQuantity((q) => q + 1);
  const decrementQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const name = lang === 'fr' ? product.name : product.nameEn;
  const category = lang === 'fr' ? product.category : product.categoryEn;
  const location = lang === 'fr' ? product.location : product.locationEn;
  const unit = lang === 'fr' ? product.unit : product.unitEn;
  const subtotal = product.price * quantity;

  // Breadcrumb labels
  const breadcrumbHome = lang === 'fr' ? 'Marche' : 'Market';

  // Stock status display
  const stockConfig = {
    in_stock: {
      icon: CheckCircle2,
      color: 'text-leaf',
      bg: 'bg-leaf-light',
      text: lang === 'fr' ? `En Stock (${product.stockAmount} disponibles)` : `In Stock (${product.stockAmount} available)`,
    },
    low_stock: {
      icon: AlertCircle,
      color: 'text-warning',
      bg: 'bg-warning/10',
      text: lang === 'fr' ? `Stock Limite (${product.stockAmount} restants)` : `Low Stock (${product.stockAmount} remaining)`,
    },
    preorder: {
      icon: Clock,
      color: 'text-warning',
      bg: 'bg-warning/10',
      text: lang === 'fr' ? 'Precommande — Livraison sous 5 jours' : 'Preorder — Delivery within 5 days',
    },
  };

  const stock = stockConfig[product.stockStatus];
  const StockIcon = stock.icon;

  return (
    <Layout>
      {/* Mobile back button */}
      <div className="md:hidden fixed top-[60px] left-2 z-30">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
        >
          <ChevronLeft size={20} className="text-soil-700" />
        </button>
      </div>

      {/* Section 2: Product Hero */}
      <section className="pt-[72px] md:pt-[84px] pb-8 md:pb-12 bg-white">
        <div className="max-w-[1024px] mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="hidden md:flex items-center gap-2 text-body-sm text-soil-500 mb-4">
            <button onClick={() => navigate('/marketplace')} className="hover:text-terracotta transition-colors">
              {breadcrumbHome}
            </button>
            <span>{'>'}</span>
            <button
              onClick={() => navigate(`/marketplace?category=${product.category}`)}
              className="hover:text-terracotta transition-colors"
            >
              {category}
            </button>
            <span>{'>'}</span>
            <span className="text-soil-700">{name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-6 md:gap-10">
            {/* Left: Image Gallery */}
            <ImageGallery
              images={product.images}
              productName={name}
              isSeasonal={product.isSeasonal}
              isOrganic={product.isOrganic}
              isPromo={product.isPromo}
              discountPercent={product.discountPercent}
            />

            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            >
              {/* Category pill */}
              <span className="inline-block px-3 py-1 bg-soil-200 text-soil-700 text-label rounded-full mb-3">
                {category}
              </span>

              {/* Product name */}
              <h1 className="font-display text-display-lg text-soil-900">{name}</h1>

              {/* Producer row */}
              {producer && (
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={producer.avatar}
                    alt={producer.name}
                    className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    onClick={() => navigate(`/producer/${producer.id}`)}
                  />
                  <div>
                    <p className="text-body text-soil-700">
                      {lang === 'fr' ? 'Par' : 'By'}{' '}
                      <button
                        onClick={() => navigate(`/producer/${producer.id}`)}
                        className="font-semibold hover:text-terracotta transition-colors"
                      >
                        {producer.name}
                      </button>
                    </p>
                    <div className="flex items-center gap-1.5">
                      <BadgeCheck size={14} className="text-sky" />
                      <span className="text-body-sm text-sky">
                        {lang === 'fr' ? 'Verifie' : 'Verified'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Rating */}
              <button
                onClick={() => {
                  document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 mt-3 hover:opacity-80 transition-opacity"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'text-sun fill-sun' : 'text-soil-300'}
                    />
                  ))}
                </div>
                <span className="text-body-sm font-semibold text-soil-700">{product.rating}</span>
                <span className="text-body-sm text-soil-500">
                  ({product.reviewCount} {lang === 'fr' ? 'avis' : 'reviews'})
                </span>
              </button>

              {/* Location */}
              <div className="flex items-center gap-1.5 mt-2">
                <MapPin size={14} className="text-soil-500" />
                <span className="text-body-sm text-soil-500">
                  {location}, {lang === 'fr' ? 'Region' : 'Region'} {product.region}
                </span>
              </div>

              {/* Price Block */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-6 p-5 bg-soil-50 rounded-[14px]"
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-price-lg text-soil-900">{product.price.toLocaleString()} FCFA</span>
                  <span className="text-body text-soil-500">/ {unit}</span>
                  {product.oldPrice && (
                    <span className="text-body-sm text-soil-400 line-through ml-2">
                      {product.oldPrice.toLocaleString()} FCFA
                    </span>
                  )}
                </div>

                {/* Seasonal indicator */}
                {product.isSeasonal && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <Sun size={14} className="text-sun" />
                    <span className="text-body-sm text-sun">
                      {lang === 'fr'
                        ? `Prix Saisonnier — Economisez ${product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 17}%`
                        : `Seasonal Price — Save ${product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 17}%`}
                    </span>
                  </div>
                )}

                {/* Stock status */}
                <div className={`flex items-center gap-1.5 mt-2 ${stock.color}`}>
                  <StockIcon size={14} />
                  <span className="text-body-sm">{stock.text}</span>
                </div>
              </motion.div>

              {/* Quantity Selector */}
              <div className="mt-5">
                <label className="text-body-sm text-soil-600 mb-2 block">
                  {lang === 'fr' ? 'Quantite' : 'Quantity'}
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center h-12 bg-soil-50 rounded-[10px] border border-soil-200 overflow-hidden">
                    <button
                      onClick={decrementQty}
                      className="w-12 h-full flex items-center justify-center bg-soil-200 hover:bg-soil-300 transition-colors"
                    >
                      <Minus size={16} className="text-soil-700" />
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={quantity}
                      className="w-16 h-full text-center font-mono text-lg text-soil-900 bg-transparent border-none outline-none"
                    />
                    <button
                      onClick={incrementQty}
                      className="w-12 h-full flex items-center justify-center bg-soil-200 hover:bg-soil-300 transition-colors"
                    >
                      <Plus size={16} className="text-soil-700" />
                    </button>
                  </div>
                  <span className="text-body text-soil-500">{unit}</span>
                </div>

                {/* Subtotal */}
                <p className="text-price text-soil-900 mt-3">
                  {lang === 'fr' ? 'Total' : 'Total'}: {subtotal.toLocaleString()} FCFA
                </p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-5 flex flex-col gap-3"
              >
                <button
                  onClick={handleAddToCart}
                  className={`w-full h-14 rounded-[12px] font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
                    addedToCart
                      ? 'bg-leaf text-white'
                      : 'bg-terracotta text-white hover:bg-terracotta-dark hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      {lang === 'fr' ? 'Ajoute au Panier !' : 'Added to Cart!'}
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      {lang === 'fr' ? 'Ajouter au Panier' : 'Add to Cart'}
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className={`w-full h-14 rounded-[12px] font-semibold text-base flex items-center justify-center transition-all duration-300 ${
                    buyNow
                      ? 'bg-leaf text-white'
                      : 'bg-leaf text-white hover:bg-leaf-dark hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {buyNow
                    ? lang === 'fr' ? 'Redirection...' : 'Redirecting...'
                    : lang === 'fr' ? 'Acheter Maintenant' : 'Buy Now'}
                </button>

                <button
                  onClick={() => navigate('/chat')}
                  className="w-full h-12 rounded-[10px] font-semibold text-sm flex items-center justify-center gap-2 border-[1.5px] border-soil-300 text-soil-700 hover:bg-soil-50 transition-all"
                >
                  <MessageCircle size={18} />
                  {lang === 'fr' ? 'Contacter le Producteur' : 'Contact Producer'}
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Traceability & Certifications */}
      <section className="py-8 md:py-12 bg-soil-100">
        <TraceabilityTimeline
          steps={product.traceability}
          qrCode={`QR-AGRI-2024-${product.category.substring(0, 3).toUpperCase()}-${String(product.id).padStart(6, '0')}`}
          certifications={product.certifications}
          certificationsEn={product.certificationsEn}
        />
      </section>

      {/* Section 4: Product Description */}
      <section className="py-8 md:py-12 bg-white">
        <ProductDescription
          description={product.description}
          descriptionEn={product.descriptionEn}
        />
      </section>

      {/* Section 5: Producer Mini-Card */}
      {producer && (
        <section className="py-6 md:py-8 bg-white">
          <ProducerMiniCard producer={producer} />
        </section>
      )}

      {/* Section 6: Reviews */}
      <section id="reviews" className="py-8 md:py-12 bg-white">
        <ReviewsSection
          reviews={product.reviews}
          averageRating={product.rating}
          totalReviews={product.reviewCount}
        />
      </section>

      {/* Section 7: Related Products */}
      <section className="py-8 md:py-12 bg-soil-100">
        <RelatedProducts products={relatedProducts} categoryKey={product.category} />
      </section>
    </Layout>
  );
}
