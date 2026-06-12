import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Sprout, Search, ChevronDown, ShieldCheck, Truck, QrCode, BadgeCheck,
  Sun, MapPin, Star, TrendingUp, Package, Banknote,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';

/* ─────────────────────── Animation helpers ─────────────────────── */
const easeOut = [0.25, 0.1, 0.25, 1] as [number, number, number, number];
const easeDramatic = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeSpring = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

function fadeUp(delay = 0, duration = 0.5) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: easeOut },
  };
}

function ScrollReveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────── Hero Section ─────────────────────── */
function HeroSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) setShowScroll(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        poster="/hero-produce.jpg"
        style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 0.8s ease-out' }}
      >
        <source src="/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(45,41,38,0.55) 0%, rgba(45,41,38,0.7) 70%, rgba(45,41,38,0.95) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[640px] mx-auto px-6 text-center pt-20 pb-24">
        {/* Overline */}
        <motion.div {...fadeUp(0.3, 0.4)} transition={{ ...fadeUp(0.3, 0.4).transition, ease: easeDramatic }}>
          <span className="inline-flex items-center gap-1.5 bg-sun-light/90 text-sun px-3 py-1.5 rounded-full text-label">
            <Sprout size={14} />
            {t('home.hero.overline') as string}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.5, 0.6)}
          transition={{ ...fadeUp(0.5, 0.6).transition, ease: easeDramatic }}
          className="font-display text-[32px] md:text-display-xl font-bold text-white mt-4 leading-tight"
          style={{ letterSpacing: '-0.03em' }}
        >
          {t('home.hero.title') as string}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.7, 0.5)}
          transition={{ ...fadeUp(0.7, 0.5).transition, ease: easeDramatic }}
          className="text-body-lg text-white/80 mt-4 max-w-[520px] mx-auto"
        >
          {t('home.hero.subtitle') as string}
        </motion.p>

        {/* CTA Row */}
        <motion.div
          {...fadeUp(0.9, 0.4)}
          transition={{ ...fadeUp(0.9, 0.4).transition, ease: easeDramatic }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          <button
            onClick={() => navigate('/marketplace')}
            className="bg-terracotta text-white font-semibold text-[15px] px-6 py-3.5 rounded-[10px] hover:bg-terracotta-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            style={{ transitionTimingFunction: 'var(--ease-out)' }}
          >
            {t('home.hero.ctaPrimary') as string}
          </button>
          <button
            onClick={() => navigate('/about')}
            className="bg-transparent border-[1.5px] border-white/40 text-white font-semibold text-[15px] px-6 py-3.5 rounded-[10px] hover:bg-white/10 hover:border-white/60 transition-all duration-200"
          >
            {t('home.hero.ctaSecondary') as string}
          </button>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          {...fadeUp(1.0, 0.4)}
          transition={{ ...fadeUp(1.0, 0.4).transition, ease: easeDramatic }}
          onSubmit={handleSearch}
          className="mt-8"
        >
          <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-[14px] h-14 px-4 shadow-lg">
            <Search size={18} className="text-soil-400 shrink-0" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t('home.hero.searchPlaceholder') as string}
              className="flex-1 bg-transparent border-none outline-none ml-3 text-[15px] text-soil-900 placeholder:text-soil-500"
            />
          </div>
        </motion.form>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: showScroll ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-white/60 text-[11px]">{t('home.hero.scrollLabel') as string}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────── Trust Bar ─────────────────────── */
function TrustBar() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const items = [
    { icon: ShieldCheck, color: 'text-leaf', text: t('home.trust.payment') },
    { icon: Truck, color: 'text-sky', text: t('home.trust.delivery') },
    { icon: QrCode, color: 'text-terracotta', text: t('home.trust.traceability') },
    { icon: BadgeCheck, color: 'text-sun', text: t('home.trust.verified') },
  ];

  return (
    <section ref={ref} className="bg-soil-100 py-5 px-6">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08, ease: easeOut }}
              className="flex flex-col items-center text-center gap-2"
            >
              <Icon size={24} className={item.color} />
              <span className="text-body-sm text-soil-700 leading-tight">{item.text as string}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────── Featured Categories ─────────────────────── */
function FeaturedCategories() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const categories = [
    { icon: '\uD83C\uDF31', name: t('home.categories.cacao'), count: 12, path: '/marketplace?category=cacao-cafe' },
    { icon: '\uD83E\uDD6C', name: t('home.categories.fruits'), count: 28, path: '/marketplace?category=fruits-legumes' },
    { icon: '\uD83D\uDC14', name: t('home.categories.poultry'), count: 15, path: '/marketplace?category=volailles' },
    { icon: '\uD83C\uDF3E', name: t('home.categories.cereals'), count: 9, path: '/marketplace?category=cereales' },
    { icon: '\uD83C\uDF6F', name: t('home.categories.honey'), count: 7, path: '/marketplace?category=naturels' },
    { icon: '\uD83C\uDF3F', name: t('home.categories.spices'), count: 11, path: '/marketplace?category=epices' },
  ];

  return (
    <section className="bg-white py-12 md:py-20 px-6">
      <div className="max-w-[1024px] mx-auto">
        <ScrollReveal>
          <span className="text-label text-terracotta uppercase tracking-widest">
            {t('home.categories.overline') as string}
          </span>
          <h2 className="font-display text-display-lg text-soil-900 mt-2">
            {t('home.categories.title') as string}
          </h2>
          <p className="text-body-lg text-soil-600 mt-2 max-w-[520px]">
            {t('home.categories.subtitle') as string}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.path} delay={i * 0.1}>
              <button
                onClick={() => navigate(cat.path)}
                className="w-full bg-soil-50 rounded-2xl p-6 text-left hover:bg-terracotta-light hover:-translate-y-1 transition-all duration-300 group"
                style={{ transitionTimingFunction: 'var(--ease-out)' }}
              >
                <span className="text-[48px] leading-none">{cat.icon}</span>
                <h3 className="font-display text-display-sm text-soil-900 mt-3 group-hover:text-terracotta-dark transition-colors">
                  {cat.name as string}
                </h3>
                <p className="text-body-sm text-soil-500 mt-1">
                  {cat.count} {t('home.categories.producers') as string}
                </p>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Seasonal Banner ─────────────────────── */
function SeasonalBanner() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="bg-sun-light py-6 md:py-8 px-6">
      <ScrollReveal>
        <div className="max-w-[1024px] mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sun size={32} className="text-sun" />
              <span className="bg-sun text-white px-3 py-1 rounded-full text-label">
                {t('home.seasonal.badge') as string}
              </span>
            </div>
            <h3 className="font-display text-display-md text-soil-900 mt-2">
              {t('home.seasonal.title') as string}
            </h3>
            <p className="text-body text-soil-700 mt-2 max-w-[520px]">
              {t('home.seasonal.text') as string}
            </p>
            <button
              onClick={() => navigate('/marketplace?seasonal=true')}
              className="mt-4 bg-leaf text-white font-semibold text-[15px] px-5 py-3 rounded-[10px] hover:bg-leaf-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              {t('home.seasonal.cta') as string}
            </button>
          </div>

          {/* Decorative fruit circles */}
          <div className="flex items-center justify-center shrink-0">
            <div className="flex -space-x-4">
              {['/product-papaya.jpg', '/hero-produce.jpg', '/product-carrots.jpg'].map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15, ease: easeSpring }}
                  className="w-[100px] h-[100px] rounded-full border-4 border-white overflow-hidden shadow-md"
                  style={{ zIndex: 3 - i, transform: `rotate(${i * 8 - 8}deg)` }}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ─────────────────────── Featured Products ─────────────────────── */
function FeaturedProducts() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const products = [
    { name: t('product.cacao'), price: '3 500', unit: t('home.products.unit.kg'), location: 'Nkolafamba, Centre', image: '/product-cacao.jpg', badge: 'seasonal' as const },
    { name: t('product.coffee'), price: '4 200', unit: t('home.products.unit.kg'), location: 'Bafoussam, Ouest', image: '/product-coffee.jpg' },
    { name: t('product.plantain'), price: '500', unit: t('home.products.unit.botte'), location: 'Obala, Centre', image: '/product-plantain.jpg', badge: 'organic' as const },
    { name: t('product.tomatoes'), price: '800', unit: t('home.products.unit.kg'), location: 'Mfou, Centre', image: '/product-tomatoes.jpg' },
    { name: t('product.okra'), price: '600', unit: t('home.products.unit.kg'), location: 'Ebolowa, Sud', image: '/product-okra.jpg' },
    { name: t('product.papaya'), price: '1 200', unit: t('home.products.unit.piece'), location: 'Douala, Littoral', image: '/product-papaya.jpg', badge: 'seasonal' as const },
    { name: t('product.eggs'), price: '1 500', unit: t('home.products.unit.plateau'), location: 'Yaounde, Centre', image: '/product-eggs.jpg', badge: 'organic' as const },
    { name: t('product.carrots'), price: '700', unit: t('home.products.unit.kg'), location: 'Bafoussam, Ouest', image: '/product-carrots.jpg', badge: 'organic' as const },
  ];

  return (
    <section className="bg-white py-12 md:py-20 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <ScrollReveal>
            <span className="text-label text-terracotta uppercase tracking-widest">
              {t('home.products.overline') as string}
            </span>
            <h2 className="font-display text-display-lg text-soil-900 mt-2">
              {t('home.products.title') as string}
            </h2>
          </ScrollReveal>
          <ScrollReveal className="hidden md:block">
            <button
              onClick={() => navigate('/marketplace')}
              className="text-soil-700 hover:text-terracotta text-sm font-medium transition-colors"
            >
              {t('home.products.seeAll') as string} &rarr;
            </button>
          </ScrollReveal>
        </div>

        {/* Grid / Carousel */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2 -mx-6 px-6 md:mx-0 md:px-0">
          {products.map((product, i) => (
            <motion.button
              key={product.name as string}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: easeOut }}
              onClick={() => navigate(`/product/${i + 1}`)}
              className="snap-start shrink-0 w-[280px] md:w-auto bg-soil-50 rounded-[14px] overflow-hidden text-left shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
              style={{ transitionTimingFunction: 'var(--ease-out)' }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name as string}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                />
                {product.badge && (
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-label ${
                      product.badge === 'seasonal'
                        ? 'bg-sun-light text-sun'
                        : 'bg-leaf-light text-leaf-dark'
                    }`}
                  >
                    {product.badge === 'seasonal'
                      ? (t('home.products.seasonal') as string)
                      : (t('home.products.organic') as string)}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="inline-block bg-soil-200 text-soil-700 px-2.5 py-0.5 rounded-full text-label mb-2">
                  {(product.name as string).split(' ')[0]}
                </span>
                <h3 className="font-display text-[16px] font-semibold text-soil-900 leading-tight">
                  {product.name as string}
                </h3>
                <div className="flex items-center gap-1 mt-1.5 text-body-sm text-soil-500">
                  <MapPin size={12} />
                  <span>{product.location}</span>
                </div>
                <p className="text-price text-soil-900 mt-2">
                  {product.price} <span className="text-body-sm font-normal text-soil-500">{product.unit as string}</span>
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Mobile See All */}
        <div className="mt-6 text-center md:hidden">
          <button
            onClick={() => navigate('/marketplace')}
            className="text-soil-700 hover:text-terracotta text-sm font-medium transition-colors"
          >
            {t('home.products.seeAll') as string} &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Producer Spotlight ─────────────────────── */
function ProducerSpotlight() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const producers = [
    {
      name: t('producer.1.name'),
      location: t('producer.1.location'),
      specialty: (t('producer.1.specialty') as string).split(','),
      rating: t('producer.1.rating'),
      reviews: t('producer.1.reviews'),
      quote: t('producer.1.quote'),
      image: '/farmer-portrait-1.jpg',
      id: 1,
    },
    {
      name: t('producer.2.name'),
      location: t('producer.2.location'),
      specialty: (t('producer.2.specialty') as string).split(','),
      rating: t('producer.2.rating'),
      reviews: t('producer.2.reviews'),
      quote: t('producer.2.quote'),
      image: '/farmer-portrait-2.jpg',
      id: 2,
    },
    {
      name: t('producer.3.name'),
      location: t('producer.3.location'),
      specialty: (t('producer.3.specialty') as string).split(','),
      rating: t('producer.3.rating'),
      reviews: t('producer.3.reviews'),
      quote: t('producer.3.quote'),
      image: '/farmer-portrait-3.jpg',
      id: 3,
    },
  ];

  return (
    <section className="bg-soil-100 py-12 md:py-20 px-6">
      <div className="max-w-[1024px] mx-auto">
        <ScrollReveal>
          <span className="text-label text-leaf uppercase tracking-widest">
            {t('home.producers.overline') as string}
          </span>
          <h2 className="font-display text-display-lg text-soil-900 mt-2">
            {t('home.producers.title') as string}
          </h2>
          <p className="text-body-lg text-soil-600 mt-2 max-w-[560px]">
            {t('home.producers.subtitle') as string}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {producers.map((producer, i) => (
            <motion.div
              key={producer.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: easeOut }}
              className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              {/* Top image */}
              <div className="relative h-[160px] overflow-hidden">
                <img
                  src={producer.image}
                  alt={producer.name as string}
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)',
                  }}
                />
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.12, ease: easeSpring }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2"
                >
                  <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-md">
                    <img
                      src={producer.image}
                      alt={producer.name as string}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="pt-10 pb-5 px-5 text-center">
                <h3 className="font-display text-display-sm font-semibold text-soil-900">
                  {producer.name as string}
                </h3>
                <div className="flex items-center justify-center gap-1 mt-1 text-body-sm text-soil-500">
                  <MapPin size={12} />
                  <span>{producer.location as string}</span>
                </div>

                {/* Specialty pills */}
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  {producer.specialty.map((s) => (
                    <span
                      key={s}
                      className="bg-leaf-light text-leaf-dark px-2.5 py-0.5 rounded-full text-label"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mt-3">
                  <Star size={14} className="text-sun fill-sun" />
                  <span className="text-body-sm font-medium text-soil-700">
                    {producer.rating as string}
                  </span>
                  <span className="text-body-sm text-soil-500">
                    ({producer.reviews as string} {t('home.producers.reviews') as string})
                  </span>
                </div>

                {/* Quote */}
                <p className="text-body-sm text-soil-600 italic mt-3 line-clamp-2">
                  &ldquo;{producer.quote as string}&rdquo;
                </p>

                {/* CTA */}
                <button
                  onClick={() => navigate(`/producer/${producer.id}`)}
                  className="mt-4 text-soil-700 hover:text-terracotta text-sm font-medium transition-colors"
                >
                  {t('home.producers.seeProfile') as string} &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── How It Works ─────────────────────── */
function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    { num: '01', title: t('home.how.step1.title'), desc: t('home.how.step1.desc'), image: '/step-1-search.jpg' },
    { num: '02', title: t('home.how.step2.title'), desc: t('home.how.step2.desc'), image: '/step-2-order.jpg' },
    { num: '03', title: t('home.how.step3.title'), desc: t('home.how.step3.desc'), image: '/step-3-delivery.jpg' },
    { num: '04', title: t('home.how.step4.title'), desc: t('home.how.step4.desc'), image: '/step-4-trace.jpg' },
  ];

  return (
    <section className="bg-white py-12 md:py-20 px-6">
      <div className="max-w-[1024px] mx-auto">
        <ScrollReveal>
          <span className="text-label text-terracotta uppercase tracking-widest">
            {t('home.how.overline') as string}
          </span>
          <h2 className="font-display text-display-lg text-soil-900 mt-2">
            {t('home.how.title') as string}
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-8 md:gap-10 mt-10">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.15}>
              <div className="relative">
                {/* Step number */}
                <span className="font-mono text-[48px] font-bold text-terracotta/20 leading-none select-none">
                  {step.num}
                </span>

                {/* Image */}
                <div className="mt-2 rounded-xl overflow-hidden h-[160px] md:h-[200px]">
                  <img
                    src={step.image}
                    alt={step.title as string}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text */}
                <h3 className="font-display text-display-sm font-semibold text-soil-900 mt-4">
                  {step.title as string}
                </h3>
                <p className="text-body text-soil-600 mt-2">{step.desc as string}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Stats & Impact ─────────────────────── */
function StatsSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const stats = [
    { target: 2400, suffix: '+', label: t('home.stats.producers'), icon: TrendingUp, color: 'text-leaf' },
    { target: 18000, suffix: '+', label: t('home.stats.orders'), icon: Package, color: 'text-sun' },
    { target: 156, prefix: '', suffix: 'M FCFA', label: t('home.stats.revenue'), icon: Banknote, color: 'text-terracotta' },
    { target: 4.8, suffix: '/5', label: t('home.stats.rating'), icon: Star, color: 'text-sun' },
  ];

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(stats.map((s) => {
        if (s.target === 4.8) {
          return Math.round(s.target * eased * 10) / 10;
        }
        return Math.floor(s.target * eased);
      }));

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView]);

  const formatNumber = (num: number, i: number) => {
    if (stats[i].target === 4.8) return num.toFixed(1);
    return num.toLocaleString();
  };

  return (
    <section ref={ref} className="bg-soil-900 py-12 md:py-16 px-6">
      <div className="max-w-[1024px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1, ease: easeOut }}
                className="text-center"
              >
                <Icon size={24} className={`mx-auto ${stat.color}`} />
                <p className="font-mono text-[28px] md:text-[40px] font-bold text-white mt-3 leading-tight">
                  {formatNumber(counts[i], i)}{stat.suffix}
                </p>
                <p className="text-body-sm text-soil-400 mt-1">{stat.label as string}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── CTA Banner ─────────────────────── */
function CTABanner() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="bg-leaf py-12 md:py-16 px-6">
      <div className="max-w-[640px] mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-display text-display-lg text-white">
            {t('home.cta.title') as string}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-body-lg text-white/80 mt-3">
            {t('home.cta.subtitle') as string}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => navigate('/marketplace')}
              className="bg-white text-leaf font-semibold text-[15px] px-6 py-3.5 rounded-[10px] hover:bg-soil-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              {t('home.cta.primary') as string}
            </button>
            <button
              onClick={() => navigate('/about')}
              className="bg-transparent border-[1.5px] border-white/50 text-white font-semibold text-[15px] px-6 py-3.5 rounded-[10px] hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              {t('home.cta.secondary') as string}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─────────────────────── Home Page ─────────────────────── */
export default function Home() {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Layout>
      <HeroSection />
      <TrustBar />
      <FeaturedCategories />
      <SeasonalBanner />
      <FeaturedProducts />
      <ProducerSpotlight />
      <HowItWorks />
      <StatsSection />
      <CTABanner />
    </Layout>
  );
}
