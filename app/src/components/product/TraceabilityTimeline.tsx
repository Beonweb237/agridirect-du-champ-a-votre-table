import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sprout, Leaf, CheckCircle2, Sun, Package } from 'lucide-react';
import type { TraceabilityStep } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

const iconMap: Record<string, React.ElementType> = {
  sprout: Sprout,
  leaf: Leaf,
  check: CheckCircle2,
  sun: Sun,
  package: Package,
};

interface TraceabilityTimelineProps {
  steps: TraceabilityStep[];
  qrCode: string;
  certifications: string[];
  certificationsEn: string[];
}

export default function TraceabilityTimeline({
  steps,
  qrCode,
  certifications,
  certificationsEn,
}: TraceabilityTimelineProps) {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const certLabels = lang === 'fr' ? certifications : certificationsEn;

  const certBadgeClass = (i: number) => {
    const classes = [
      'bg-leaf-light text-leaf-dark',
      'bg-sky-light text-sky',
      'bg-sun-light text-sun',
    ];
    return classes[i % classes.length];
  };

  const certIcon = (i: number) => {
    const icons = ['\u{1F33F}', '\u{1F3C6}', '\u{2696}'];
    return icons[i % icons.length];
  };

  return (
    <div ref={ref} className="max-w-[1024px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-light mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A8FBF" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        </div>
        <h2 className="font-display text-display-md text-soil-900 mb-2">
          {lang === 'fr' ? 'Traçabilité Complète' : 'Full Traceability'}
        </h2>
        <p className="text-body text-soil-600 max-w-md mx-auto">
          {lang === 'fr'
            ? 'Scannez le QR code pour voir le parcours complet de ce produit.'
            : 'Scan the QR code to see the complete journey of this product.'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-12">
        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="w-[200px] h-[200px] bg-white rounded-2xl border-2 border-soil-200 flex items-center justify-center p-4 mb-4">
            {/* QR code placeholder using a grid pattern */}
            <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-0.5">
              {Array.from({ length: 49 }).map((_, i) => {
                const isCorner =
                  (i < 14 && (i % 7 < 2 || i % 7 > 4)) ||
                  (i > 34 && (i % 7 < 2 || i % 7 > 4)) ||
                  (i % 7 === 0 && i > 13 && i < 35) ||
                  (i % 7 === 6 && i > 13 && i < 35);
                const isPattern = [8, 9, 10, 15, 16, 17, 22, 23, 24, 32, 38, 39, 40, 44, 46].includes(i);
                return (
                  <div
                    key={i}
                    className={`${isCorner || isPattern ? 'bg-soil-900' : Math.random() > 0.5 ? 'bg-soil-900' : 'bg-white'}`}
                  />
                );
              })}
            </div>
          </div>
          <code className="text-[12px] font-mono text-soil-500 mb-1">{qrCode}</code>
          <p className="text-body-sm text-soil-600">
            {lang === 'fr' ? 'Scannez avec votre téléphone' : 'Scan with your phone'}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-leaf/20" />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = iconMap[step.icon] || CheckCircle2;
              const title = lang === 'fr' ? step.title : step.titleEn;
              const desc = lang === 'fr' ? step.description : step.descriptionEn;
              const date = lang === 'fr' ? step.date : step.dateEn;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.15 + i * 0.12,
                    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                  }}
                  className="relative flex gap-4 pl-1"
                >
                  {/* Icon */}
                  <div className="relative z-10 shrink-0 w-8 h-8 rounded-full bg-leaf-light flex items-center justify-center">
                    <Icon size={16} className="text-leaf" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <h4 className="text-body font-semibold text-soil-900">{title}</h4>
                      <span className="text-body-sm text-soil-500">{date}</span>
                    </div>
                    <p className="text-body-sm text-soil-600">{desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certifications */}
      {certLabels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex flex-wrap gap-2 mt-8 justify-center"
        >
          {certLabels.map((cert, i) => (
            <span
              key={cert}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-label ${certBadgeClass(i)}`}
            >
              <span>{certIcon(i)}</span>
              {cert}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
