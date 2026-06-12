import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Star, Package, Users, Clock, MessageCircle, Heart, Share2,
  MapPin, BadgeCheck, ChevronLeft, ChevronDown, ChevronUp,
  Truck, Navigation, ExternalLink,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getProducerById } from '@/data/producers';
import MiniMap from '@/components/producer/MiniMap';
import CertificationCard from '@/components/producer/CertificationCard';
import ReviewCard from '@/components/producer/ReviewCard';
import ProductCard from '@/components/producer/ProductCard';

export default function ProducerProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const producer = getProducerById(Number(id));
  const [following, setFollowing] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const coverScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  if (!producer) {
    return (
      <div className="pt-20 px-6 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="font-display text-display-lg text-soil-900">
          {isEn ? 'Producer not found' : 'Producteur non trouve'}
        </h1>
        <button
          onClick={() => navigate('/map')}
          className="mt-4 px-6 py-2.5 bg-terracotta text-white rounded-xl font-semibold hover:bg-terracotta-dark transition-colors"
        >
          {isEn ? 'Back to Map' : 'Retour a la Carte'}
        </button>
      </div>
    );
  }

  const sortedProducts = [...producer.products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  const avgRating = producer.rating;
  const totalReviews = producer.reviews;

  return (
    <div className="min-h-[100dvh] bg-soil-50">
      {/* Back button (mobile) */}
      <div className="fixed top-16 left-0 right-0 z-40 pointer-events-none">
        <div className="px-4 py-2">
          <button
            onClick={() => navigate(-1)}
            className="pointer-events-auto md:hidden flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-sm font-medium text-soil-700 hover:bg-white transition-colors"
          >
            <ChevronLeft size={16} />
            {isEn ? 'Back' : 'Retour'}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative overflow-hidden">
        {/* Cover image with parallax */}
        <motion.div
          style={{ y: coverY, scale: coverScale }}
          className="relative h-[300px] md:h-[400px] overflow-hidden"
        >
          <img
            src={producer.coverImage}
            alt={producer.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soil-900/80 via-soil-900/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 pb-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
              className="font-display text-display-lg md:text-display-xl text-white"
            >
              {producer.name}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-2 mt-2"
            >
              <MapPin size={16} className="text-leaf-light" />
              <span className="text-white/90 text-body">{producer.location}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Avatar - overlapping */}
        <div className="relative max-w-[1024px] mx-auto px-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
            className="absolute -top-16 left-6 md:left-8"
          >
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-[5px] border-white shadow-xl overflow-hidden bg-soil-200">
              <img
                src={producer.avatar}
                alt={producer.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Producer Identity */}
      <div className="relative max-w-[1024px] mx-auto px-6 pt-16 md:pt-20 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Name + Verification */}
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-display text-display-md text-soil-900">{producer.name}</h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-light text-sky text-body-sm font-medium">
              <BadgeCheck size={14} />
              {isEn ? 'Verified Producer' : 'Producteur Verifie'}
            </span>
          </div>

          {/* Title */}
          <p className="text-body-lg text-soil-600 mt-1">
            {isEn ? producer.titleEn : producer.title}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1.5 mt-2">
            <MapPin size={15} className="text-leaf" />
            <span className="text-body text-soil-600">{producer.location}</span>
          </div>

          {/* GPS Coordinates */}
          <p className="font-mono text-xs text-soil-500 mt-1">
            {producer.latitude.toFixed(4)}° N, {producer.longitude.toFixed(4)}° E
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 py-3 border-y border-soil-200">
            <div className="flex items-center gap-1.5">
              <Star size={16} className="text-sun fill-sun" />
              <span className="text-sm font-semibold text-soil-900">{producer.rating}</span>
              <span className="text-body-sm text-soil-500">({totalReviews} {isEn ? 'reviews' : 'avis'})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Package size={16} className="text-soil-600" />
              <span className="text-body-sm text-soil-700">
                {producer.sales} {isEn ? 'sales' : 'ventes'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={16} className="text-soil-600" />
              <span className="text-body-sm text-soil-700">
                {isEn ? 'Member since' : 'Membre depuis'} {producer.memberSince}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-soil-600" />
              <span className="text-body-sm text-soil-700">
                {isEn ? 'Responds in' : 'Repond en'} {isEn ? producer.responseTimeEn : producer.responseTime}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex gap-3 mt-5"
          >
            <button
              onClick={() => navigate(`/chat?producer=${producer.id}`)}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-terracotta text-white font-semibold rounded-xl hover:bg-terracotta-dark hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle size={18} />
              {isEn ? 'Contact' : 'Contacter'}
            </button>
            <button
              onClick={() => setFollowing(!following)}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold border transition-all hover:scale-[1.02] active:scale-[0.98] ${
                following
                  ? 'bg-terracotta-light border-terracotta text-terracotta'
                  : 'border-soil-300 text-soil-700 hover:bg-soil-100'
              }`}
            >
              <Heart size={18} className={following ? 'fill-terracotta' : ''} />
              {following ? (isEn ? 'Following' : 'Suivi') : (isEn ? 'Follow' : 'Suivre')}
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: producer.name,
                    text: isEn
                      ? `Check out ${producer.name} on AgriDirect`
                      : `Decouvrez ${producer.name} sur AgriDirect`,
                    url: window.location.href,
                  });
                }
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 border border-soil-300 rounded-xl text-soil-700 font-semibold hover:bg-soil-100 transition-all"
            >
              <Share2 size={18} />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* About Section */}
      <section className="bg-white py-8 px-6">
        <div className="max-w-[1024px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-display-md text-soil-900 mb-4">
              {isEn ? 'Their Story' : 'Son Histoire'}
            </h3>
            <div className={`relative ${bioExpanded ? '' : 'max-h-32 overflow-hidden'}`}>
              <p className="text-body-lg text-soil-700 leading-relaxed whitespace-pre-line">
                {isEn ? producer.bioEn : producer.bio}
              </p>
              {!bioExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
              )}
            </div>
            <button
              onClick={() => setBioExpanded(!bioExpanded)}
              className="flex items-center gap-1 mt-2 text-terracotta font-semibold text-sm hover:text-terracotta-dark transition-colors"
            >
              {bioExpanded ? (
                <>
                  {isEn ? 'Show less' : 'Reduire'}
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  {isEn ? 'Read more' : 'Lire la suite'}
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </motion.div>

          {/* Photo gallery */}
          <div className="flex gap-3 mt-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2">
            {[producer.coverImage, producer.avatar, producer.coverImage].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="snap-start flex-shrink-0 w-48 md:w-56 aspect-[3/2] rounded-xl overflow-hidden"
              >
                <img
                  src={img}
                  alt={`${producer.name} - ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-400"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-8 px-6">
        <div className="max-w-[1024px] mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-display text-display-sm text-soil-900 mb-4"
          >
            {isEn ? 'Certifications & Commitments' : 'Certifications & Engagements'}
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {producer.certifications.map((cert, index) => (
              <CertificationCard key={cert.id} cert={cert} index={index} isEn={isEn} />
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products-section" className="bg-white py-8 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="font-display text-display-md text-soil-900">
                {isEn ? 'Their Products' : 'Ses Produits'}
              </h3>
              <p className="text-body-sm text-soil-500 mt-1">
                {producer.products.length} {isEn ? 'products' : 'produits'}
              </p>
            </motion.div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 px-3 bg-soil-100 border border-soil-200 rounded-lg text-sm text-soil-700 outline-none focus:border-terracotta"
            >
              <option value="default">{isEn ? 'Relevance' : 'Pertinence'}</option>
              <option value="price-asc">{isEn ? 'Price: Low to High' : 'Prix: Croissant'}</option>
              <option value="price-desc">{isEn ? 'Price: High to Low' : 'Prix: Decroissant'}</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} isEn={isEn} />
            ))}
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="bg-soil-100 py-8 px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <h3 className="font-display text-display-md text-soil-900">
              {isEn ? 'Where to Find Us' : 'Ou Nous Trouver'}
            </h3>
            <p className="text-body text-soil-600 mt-1">
              {producer.location}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <MiniMap
              latitude={producer.latitude}
              longitude={producer.longitude}
              producerName={producer.name}
              categoryLabel={isEn ? producer.categoryLabelEn : producer.categoryLabel}
              farmSize={producer.farmSize}
            />
          </motion.div>

          {/* Surrounding area info */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4">
            <div className="flex items-center gap-1.5">
              <Truck size={15} className="text-leaf" />
              <span className="text-body-sm text-soil-600">
                {isEn
                  ? `Delivery: 24-48h to Douala, Yaounde`
                  : `Livraison: 24-48h vers Douala, Yaounde`
                }
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Navigation size={15} className="text-sky" />
              <span className="text-body-sm text-soil-600">
                {isEn ? '~320 km from Yaounde' : '~320 km de Yaounde'}
              </span>
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${producer.latitude},${producer.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-terracotta font-semibold text-sm hover:text-terracotta-dark transition-colors"
            >
              {isEn ? 'Get Directions' : 'Itineraire'}
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-8 px-6">
        <div className="max-w-[1024px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between mb-4"
          >
            <div>
              <h3 className="font-display text-display-md text-soil-900">
                {isEn ? 'Reviews' : 'Avis'}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(avgRating) ? 'text-sun fill-sun' : 'text-soil-300'}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-soil-900">{avgRating}</span>
                <span className="text-body-sm text-soil-500">
                  ({totalReviews} {isEn ? 'reviews' : 'avis'})
                </span>
              </div>
            </div>
          </motion.div>

          <div className="space-y-3">
            {producer.reviewsList.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>

          {/* Write review button */}
          <button className="mt-4 w-full py-3 border border-soil-300 rounded-xl text-soil-700 font-semibold hover:bg-soil-100 transition-colors">
            {isEn ? 'Write a Review' : 'Ecrire un Avis'}
          </button>
        </div>
      </section>

      {/* CTA Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-terracotta py-10 px-6"
      >
        <div className="max-w-[1024px] mx-auto text-center">
          <h3 className="font-display text-display-md text-white">
            {isEn
              ? `Buy Direct from ${producer.name.split(' ')[0]}`
              : `Achetez Direct chez ${producer.name.split(' ')[0]}`
            }
          </h3>
          <p className="text-body-lg text-white/80 mt-2 max-w-xl mx-auto">
            {isEn
              ? 'Support a local producer and receive fresh, traceable, quality products.'
              : 'Soutenez un producteur local et recevez des produits frais, tracables et de qualite.'
            }
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('products-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-terracotta font-semibold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {isEn ? 'See All Their Products' : 'Voir Tous ses Produits'}
          </button>
        </div>
      </motion.section>
    </div>
  );
}
