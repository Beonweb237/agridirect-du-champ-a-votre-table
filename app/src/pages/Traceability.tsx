import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  BadgeCheck, Sprout, MapPin, Leaf,
  Check, QrCode, Share2, Link,
  AlertCircle, Phone, Star,
  CheckCircle2,
  Sun,
  Tractor, PackageOpen, Truck, HandHelping,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';
import { cacaoTraceabilityData } from '@/data/traceabilityData';
import type { TimelineStep, QualityMetric, Certification } from '@/data/traceabilityData';

/* ─── easing ─── */
const easeDramatic = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeOut = [0.25, 0.1, 0.25, 1] as [number, number, number, number];
const easeSpring = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

/* ─── local translations ─── */
const traceT: Record<string, Record<string, string>> = {
  fr: {
    'trace.hero.verified': 'Produit Vérifié AgriDirect',
    'trace.hero.traceId': 'Code Traçabilité',
    'trace.hero.harvested': 'Récolté le',
    'trace.hero.organic': 'Certifié Bio',

    'trace.journey.title': 'Le Parcours de Votre Produit',
    'trace.journey.subtitle': 'De la graine à votre table, chaque étape est enregistrée et vérifiable.',

    'trace.producer.label': 'Produit par',
    'trace.producer.memberSince': 'Membre AgriDirect depuis',
    'trace.producer.sales': 'ventes réalisées',
    'trace.producer.viewProfile': 'Voir son Profil',

    'trace.quality.title': 'Rapport de Qualité',
    'trace.quality.subtitle': 'Analyse du lot réalisée par laboratoire certifié',
    'trace.quality.lab': 'Analyse réalisée par',
    'trace.quality.date': 'Date d\'analyse',
    'trace.quality.method': 'Méthode',
    'trace.quality.accredited': 'Laboratoire Accrédité ISO 17025',
    'trace.quality.conforme': 'Conforme',

    'trace.cta.title': 'Chaque Produit a une Histoire',
    'trace.cta.subtitle': 'Achetez directement des producteurs camerounais et découvrez l\'origine de chaque produit.',
    'trace.cta.explore': 'Explorer le Marché AgriDirect',
    'trace.cta.share': 'Partager cette traçabilité',
    'trace.cta.whatsapp': 'WhatsApp',
    'trace.cta.facebook': 'Facebook',
    'trace.cta.copy': 'Copier le Lien',
    'trace.cta.copied': 'Lien copié !',

    'trace.certifications.title': 'Certifications Vérifiées',

    'trace.error.title': 'Code QR Non Reconnu',
    'trace.error.message': 'Ce code de traçabilité n\'est pas reconnu dans notre système. Il se peut que le produit ne provienne pas d\'AgriDirect ou que le code soit invalide.',
    'trace.error.scan': 'Scanner un Autre QR',
    'trace.error.report': 'Signaler un Produit Contrefait',

    'trace.timeline.planting': 'Plantation des Cacaoyers',
    'trace.timeline.growing': 'Culture & Entretien',
    'trace.timeline.harvest': 'Récolte Manuelle',
    'trace.timeline.fermentation': 'Fermentation & Séchage Naturel',
    'trace.timeline.packaging': 'Contrôle Qualité & Conditionnement',
    'trace.timeline.delivery': 'Transport & Livraison',
  },
  en: {
    'trace.hero.verified': 'AgriDirect Verified Product',
    'trace.hero.traceId': 'Traceability Code',
    'trace.hero.harvested': 'Harvested on',
    'trace.hero.organic': 'Certified Organic',

    'trace.journey.title': 'Your Product\'s Journey',
    'trace.journey.subtitle': 'From seed to table, every step is recorded and verifiable.',

    'trace.producer.label': 'Produced by',
    'trace.producer.memberSince': 'AgriDirect member since',
    'trace.producer.sales': 'sales completed',
    'trace.producer.viewProfile': 'View Profile',

    'trace.quality.title': 'Quality Report',
    'trace.quality.subtitle': 'Batch analysis performed by certified laboratory',
    'trace.quality.lab': 'Analysis performed by',
    'trace.quality.date': 'Analysis date',
    'trace.quality.method': 'Method',
    'trace.quality.accredited': 'ISO 17025 Accredited Laboratory',
    'trace.quality.conforme': 'Compliant',

    'trace.cta.title': 'Every Product Has a Story',
    'trace.cta.subtitle': 'Buy directly from Cameroonian producers and discover the origin of each product.',
    'trace.cta.explore': 'Explore the AgriDirect Marketplace',
    'trace.cta.share': 'Share this traceability',
    'trace.cta.whatsapp': 'WhatsApp',
    'trace.cta.facebook': 'Facebook',
    'trace.cta.copy': 'Copy Link',
    'trace.cta.copied': 'Link copied!',

    'trace.certifications.title': 'Verified Certifications',

    'trace.error.title': 'QR Code Not Recognized',
    'trace.error.message': 'This traceability code is not recognized in our system. The product may not come from AgriDirect or the code may be invalid.',
    'trace.error.scan': 'Scan Another QR',
    'trace.error.report': 'Report Counterfeit Product',

    'trace.timeline.planting': 'Cacao Tree Planting',
    'trace.timeline.growing': 'Growing & Care',
    'trace.timeline.harvest': 'Hand Harvesting',
    'trace.timeline.fermentation': 'Fermentation & Natural Drying',
    'trace.timeline.packaging': 'Quality Control & Packaging',
    'trace.timeline.delivery': 'Transport & Delivery',
  },
};

function useTraceT(key: string): string {
  const { lang } = useLanguage();
  return (traceT[lang]?.[key] ?? traceT['fr'][key] ?? key) as string;
}

/* ═══════════════════════════════════════════
   ERROR STATE (Invalid QR)
   ═══════════════════════════════════════════ */
function TraceErrorState() {
  const t = useTraceT;
  const navigate = useNavigate();

  return (
    <div className="min-h-[80dvh] flex items-center justify-center px-6 pt-20 pb-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-[480px] text-center"
      >
        <motion.div
          animate={{ x: [0, -6, 6, -6, 6, 0] }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <AlertCircle size={64} className="text-error mx-auto mb-6" />
        </motion.div>
        <h2 className="font-display text-display-md text-soil-900">
          {t('trace.error.title')}
        </h2>
        <p className="text-body text-soil-600 mt-3">{t('trace.error.message')}</p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => navigate('/marketplace')}
            className="px-6 py-3.5 bg-terracotta text-white font-semibold text-[15px] rounded-[10px] hover:bg-terracotta-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            {t('trace.error.scan')}
          </button>
          <button
            onClick={() => {}}
            className="text-error text-body font-medium hover:underline"
          >
            {t('trace.error.report')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TRACEABILITY HERO
   ═══════════════════════════════════════════ */
function TraceHero({ data }: { data: typeof cacaoTraceabilityData }) {
  const t = useTraceT;
  const { lang } = useLanguage();

  return (
    <section className="bg-leaf-light pt-20 pb-12 sm:pb-16 px-6">
      <div className="max-w-[640px] mx-auto text-center">
        {/* Verified badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: easeSpring }}
          className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-xs"
        >
          <BadgeCheck size={28} className="text-leaf" />
          <span className="text-body font-semibold text-leaf-dark">
            {t('trace.hero.verified')}
          </span>
        </motion.div>

        {/* Product title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeDramatic }}
          className="font-display text-display-lg sm:text-[32px] lg:text-[36px] text-soil-900 mt-5 leading-[1.1] tracking-[-0.02em]"
        >
          {lang === 'fr' ? data.productName : data.productNameEn}
        </motion.h1>

        {/* Trace ID */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-mono text-[13px] text-soil-500 mt-2"
        >
          {t('trace.hero.traceId')}: {data.traceId}
        </motion.p>

        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: easeOut }}
          className="mt-5 mx-auto w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] rounded-2xl overflow-hidden shadow-card bg-soil-100"
        >
          <img
            src={data.productImage}
            alt={lang === 'fr' ? data.productName : data.productNameEn}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-5"
        >
          <span className="inline-flex items-center gap-1.5 text-body-sm text-soil-600">
            <Sprout size={16} className="text-leaf" />
            {t('trace.hero.harvested')} {lang === 'fr' ? data.harvestDate : data.harvestDateEn}
          </span>
          <span className="inline-flex items-center gap-1.5 text-body-sm text-soil-600">
            <MapPin size={16} className="text-terracotta" />
            {lang === 'fr' ? data.location : data.locationEn}
          </span>
          <span className="inline-flex items-center gap-1.5 text-body-sm text-soil-600">
            <Leaf size={16} className="text-leaf" />
            {t('trace.hero.organic')}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TIMELINE STEP ICON
   ═══════════════════════════════════════════ */
function StepIcon({ step, index }: { step: TimelineStep; index: number }) {
  if (step.status === 'completed') {
    return (
      <div className="w-10 h-10 rounded-full bg-leaf flex items-center justify-center">
        <Check size={20} className="text-white" />
      </div>
    );
  }
  if (step.status === 'current') {
    return (
      <div className="relative w-10 h-10 rounded-full bg-terracotta flex items-center justify-center">
        <span className="text-white font-semibold text-sm">{index + 1}</span>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-terracotta animate-ping opacity-40" />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-soil-200 flex items-center justify-center">
      <span className="text-soil-400 font-semibold text-sm">{index + 1}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   JOURNEY TIMELINE
   ═══════════════════════════════════════════ */
function JourneyTimeline({ steps }: { steps: TimelineStep[] }) {
  const t = useTraceT;
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const stepIcons = [Tractor, Sprout, HandHelping, Sun, PackageOpen, Truck];

  return (
    <section className="bg-white py-12 sm:py-16 px-6" ref={ref}>
      <div className="max-w-[1024px] mx-auto">
        <AnimatedSection>
          <h2 className="font-display text-display-lg sm:text-[32px] lg:text-[36px] text-soil-900 leading-[1.1] tracking-[-0.02em]">
            {t('trace.journey.title')}
          </h2>
          <p className="text-body text-soil-600 mt-2 max-w-[600px]">
            {t('trace.journey.subtitle')}
          </p>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative mt-12">
          {/* Central connecting line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-soil-200" />
          {/* Mobile line */}
          <div className="md:hidden absolute left-5 top-0 bottom-0 w-[3px] bg-soil-200" />

          <div className="space-y-10 md:space-y-0">
            {steps.map((step, i) => {
              const StepIconComp = stepIcons[i] || Check;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.12 * i, ease: easeOut }}
                  className={`relative md:grid md:grid-cols-2 md:gap-8 ${i > 0 ? 'md:mt-10' : ''}`}
                >
                  {/* Desktop layout: alternating left/right */}
                  {/* Node on the line */}
                  <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-10">
                    <StepIcon step={step} index={i} />
                  </div>

                  {/* Content */}
                  <div
                    className={`md:px-12 ${isLeft ? 'md:text-right md:col-start-1' : 'md:col-start-2'}`}
                  >
                    {/* Mobile node + content */}
                    <div className="md:hidden flex items-start gap-4">
                      <div className="relative z-10 shrink-0">
                        <StepIcon step={step} index={i} />
                      </div>
                      <div className="flex-1 pb-2">
                        <TimelineCard step={step} StepIconComp={StepIconComp} lang={lang} />
                      </div>
                    </div>

                    {/* Desktop content */}
                    <div className="hidden md:block pb-4">
                      <TimelineCard step={step} StepIconComp={StepIconComp} lang={lang} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  step,
  StepIconComp,
  lang,
}: {
  step: TimelineStep;
  StepIconComp: React.ComponentType<{ size: number; className?: string }>;
  lang: string;
}) {
  const t = useTraceT;

  return (
    <div className={`bg-soil-50 rounded-2xl p-5 sm:p-6 ${step.status === 'current' ? 'ring-2 ring-terracotta/30' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        <StepIconComp size={18} className="text-soil-600" />
        <span className="text-body-sm font-medium text-soil-500">
          {step.status === 'current' ? t('trace.timeline.delivery') : step.date}
        </span>
        {step.status === 'current' && (
          <span className="ml-auto inline-flex items-center gap-1 text-label uppercase tracking-[0.06em] bg-terracotta text-white px-2 py-0.5 rounded-full">
            En cours
          </span>
        )}
      </div>
      <h3 className="font-display text-display-sm text-soil-900">
        {lang === 'fr' ? step.title : step.titleEn}
      </h3>
      <p className="text-body text-soil-600 mt-2 leading-relaxed">
        {lang === 'fr' ? step.description : step.descriptionEn}
      </p>
      <p className="font-mono text-[12px] text-soil-500 mt-3 bg-soil-100 rounded-lg px-3 py-2">
        {step.details}
      </p>
      {step.status === 'current' && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-body-sm text-soil-600">
            <Truck size={16} className="text-terracotta" />
            <span>{step.location}</span>
          </div>
          {/* Mini progress bar for delivery */}
          <div className="mt-3">
            <div className="flex items-center gap-2 text-body-sm">
              <span className="text-leaf font-medium flex items-center gap-1">
                <CheckCircle2 size={14} /> Préparé
              </span>
              <span className="text-soil-300">→</span>
              <span className="text-terracotta font-medium flex items-center gap-1">
                <Truck size={14} /> En Route
              </span>
              <span className="text-soil-300">→</span>
              <span className="text-soil-400 flex items-center gap-1">
                <PackageOpen size={14} /> Livré
              </span>
            </div>
            <div className="mt-2 h-2 bg-soil-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '66%' }}
                transition={{ duration: 1.2, delay: 0.5, ease: easeOut }}
                className="h-full bg-gradient-to-r from-leaf to-terracotta rounded-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CERTIFICATIONS ROW
   ═══════════════════════════════════════════ */
function CertificationsSection({ certs }: { certs: Certification[] }) {
  const t = useTraceT;
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section className="bg-soil-50 py-10 px-6" ref={ref}>
      <div className="max-w-[1024px] mx-auto">
        <h3 className="font-display text-display-sm text-soil-900 text-center mb-8">
          {t('trace.certifications.title')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 * i, ease: easeOut }}
              className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-xs"
            >
              <BadgeCheck size={22} className="text-sky shrink-0 mt-0.5" />
              <div>
                <p className="text-body font-semibold text-soil-900">
                  {lang === 'fr' ? cert.name : cert.nameEn}
                </p>
                <p className="text-body-sm text-soil-500">{cert.certifier}</p>
                <p className="text-body-sm text-soil-400">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PRODUCER CARD
   ═══════════════════════════════════════════ */
function ProducerCard({ producer }: { producer: typeof cacaoTraceabilityData.producer }) {
  const t = useTraceT;
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: easeOut }}
      className="max-w-[768px] mx-auto px-6"
    >
      <div className="bg-soil-50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-leaf-light bg-soil-200">
            <img
              src={producer.avatar}
              alt={producer.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-body-sm text-soil-500">{t('trace.producer.label')}</p>
          <h3 className="font-display text-display-sm text-soil-900">{producer.name}</h3>
          <p className="text-body text-soil-600 mt-1">
            {lang === 'fr' ? producer.title : producer.titleEn}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="inline-flex items-center gap-1 text-body-sm text-sun">
              <Star size={14} fill="currentColor" />
              {producer.rating} ({producer.reviewCount} avis)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 mt-2 text-body-sm text-soil-500">
            <span>{t('trace.producer.memberSince')} {producer.memberSince}</span>
            <span>{producer.salesCount} {t('trace.producer.sales')}</span>
          </div>

          <p className="text-body-sm text-soil-600 mt-3 leading-relaxed">
            {lang === 'fr' ? producer.bio : producer.bioEn}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              onClick={() => navigate('/producer/1')}
              className="px-4 py-2.5 border-[1.5px] border-soil-300 text-soil-900 font-medium text-[14px] rounded-[10px] hover:bg-soil-100 hover:border-soil-400 transition-all duration-200"
            >
              {t('trace.producer.viewProfile')}
            </button>
            <a
              href={`tel:${producer.phone}`}
              className="inline-flex items-center gap-1.5 text-body-sm text-sky hover:underline"
            >
              <Phone size={14} />
              {producer.phone}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   QUALITY REPORT
   ═══════════════════════════════════════════ */
function QualityReport({ metrics }: { metrics: QualityMetric[] }) {
  const t = useTraceT;
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section className="bg-white py-12 sm:py-16 px-6" ref={ref}>
      <div className="max-w-[1024px] mx-auto">
        <AnimatedSection>
          <h2 className="font-display text-display-md text-soil-900">
            {t('trace.quality.title')}
          </h2>
          <p className="text-body text-soil-600 mt-1">{t('trace.quality.subtitle')}</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.06 * i, ease: easeOut }}
              className="bg-soil-50 rounded-xl p-5"
            >
              <p className="text-body-sm text-soil-500">
                {lang === 'fr' ? metric.label : metric.labelEn}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-mono text-[22px] text-soil-900">{metric.value}</span>
                <span className="inline-flex items-center gap-1 text-body-sm text-leaf">
                  <CheckCircle2 size={14} />
                  {t('trace.quality.conforme')}
                </span>
              </div>
              <p className="text-body-sm text-soil-400 mt-1">{metric.range}</p>

              {/* Progress bar */}
              <div className="mt-3 h-2 bg-soil-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${metric.progress}%` } : {}}
                  transition={{ duration: 0.8, delay: 0.1 * i, ease: easeOut }}
                  className="h-full bg-leaf rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lab info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-8 bg-sky-light rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3"
        >
          <BadgeCheck size={22} className="text-sky shrink-0" />
          <div className="flex-1">
            <p className="text-body-sm text-soil-600">
              <span className="font-medium text-soil-900">{t('trace.quality.lab')}:</span>{' '}
              Laboratoire QualiCam, Yaoundé
            </p>
            <div className="flex flex-wrap gap-x-4 mt-1 text-body-sm text-soil-500">
              <span>{t('trace.quality.date')}: 22 Octobre 2024</span>
              <span>{t('trace.quality.method')}: ISO 2451 / Codex Stan 105-1981</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-label uppercase tracking-[0.06em] bg-sky text-white px-3 py-1.5 rounded-full shrink-0">
            {t('trace.quality.accredited')}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA & SHARE SECTION
   ═══════════════════════════════════════════ */
function CTAShareSection({ shareUrl }: { shareUrl: string }) {
  const t = useTraceT;
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-leaf py-12 sm:py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.4, ease: easeOut }}
        className="max-w-[640px] mx-auto text-center"
      >
        <QrCode size={40} className="text-white mx-auto mb-4" />
        <h2 className="font-display text-display-md text-white">
          {t('trace.cta.title')}
        </h2>
        <p className="text-body-lg text-white/80 mt-3">
          {t('trace.cta.subtitle')}
        </p>

        <button
          onClick={() => navigate('/marketplace')}
          className="mt-6 px-6 py-3.5 bg-white text-leaf font-semibold text-[15px] rounded-[10px] hover:bg-soil-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          {t('trace.cta.explore')}
        </button>

        {/* Share row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="text-body-sm text-white/60">{t('trace.cta.share')}:</span>
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 text-white text-[13px] font-medium rounded-lg hover:bg-white/20 transition-colors"
          >
            <Share2 size={14} />
            {t('trace.cta.whatsapp')}
          </button>
          <button
            onClick={() => {}}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 text-white text-[13px] font-medium rounded-lg hover:bg-white/20 transition-colors"
          >
            <Share2 size={14} />
            {t('trace.cta.facebook')}
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 text-white text-[13px] font-medium rounded-lg hover:bg-white/20 transition-colors"
          >
            <Link size={14} />
            {copied ? t('trace.cta.copied') : t('trace.cta.copy')}
          </button>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── AnimatedSection helper ─── */
function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN TRACEABILITY PAGE
   ═══════════════════════════════════════════ */
export default function Traceability() {
  const { qr } = useParams<{ qr: string }>();
  // Treat specific QR as valid for demo
  const isValid = qr === 'AGRI-2024-CAC-001847' || qr === 'demo' || qr?.startsWith('AGRI-');
  const data = cacaoTraceabilityData;

  if (!isValid) {
    return (
      <Layout>
        <TraceErrorState />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col">
        <TraceHero data={data} />
        <JourneyTimeline steps={data.timeline} />
        <CertificationsSection certs={data.certifications} />
        <div className="bg-white py-8">
          <ProducerCard producer={data.producer} />
        </div>
        <QualityReport metrics={data.qualityMetrics} />
        <CTAShareSection shareUrl={data.shareUrl} />
      </div>
    </Layout>
  );
}
