import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Producer } from '@/data/producers';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface ProducerMiniCardProps {
  producer: Producer;
}

export default function ProducerMiniCard({ producer }: ProducerMiniCardProps) {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const specialty = lang === 'fr' ? producer.specialty : producer.specialtyEn;
  const location = lang === 'fr' ? producer.location : producer.locationEn;
  const memberLabel = lang === 'fr' ? 'Membre depuis' : 'Member since';
  const salesLabel = lang === 'fr' ? 'ventes' : 'sales';
  const viewProfile = lang === 'fr' ? 'Voir le Profil' : 'View Profile';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="bg-leaf-light rounded-2xl p-6 max-w-[1024px] mx-auto"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Avatar */}
        <img
          src={producer.avatar}
          alt={producer.name}
          className="w-[72px] h-[72px] rounded-full object-cover border-3 border-leaf/20 shrink-0"
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-body-sm text-soil-600 mb-0.5">
            {lang === 'fr' ? 'Vendu par' : 'Sold by'}
          </p>
          <h3 className="font-display text-display-sm text-soil-900">{producer.name}</h3>
          <p className="text-body-sm text-soil-600 mt-0.5">
            {specialty} — {location}
          </p>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-sun fill-sun" />
              <span className="text-body-sm font-semibold text-soil-700">{producer.rating}</span>
              <span className="text-body-sm text-soil-500">({producer.reviewCount})</span>
            </div>
            <span className="text-soil-400">|</span>
            <span className="text-body-sm text-soil-500">
              {memberLabel} {producer.memberSince} — {producer.totalSales} {salesLabel}
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate(`/producer/${producer.id}`)}
          className="shrink-0 h-11 px-6 border-[1.5px] border-soil-300 rounded-[10px] text-soil-700 font-semibold text-sm hover:bg-white hover:border-soil-400 transition-all"
        >
          {viewProfile}
        </button>
      </div>
    </motion.div>
  );
}
