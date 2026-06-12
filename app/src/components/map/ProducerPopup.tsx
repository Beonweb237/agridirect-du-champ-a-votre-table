import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Producer } from '@/data/producers';

interface ProducerPopupProps {
  producer: Producer;
}

export default function ProducerPopup({ producer }: ProducerPopupProps) {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  return (
    <div className="min-w-[220px] max-w-[260px]">
      <div className="relative">
        <div
          className="w-full h-16 bg-cover bg-center rounded-lg mb-2"
          style={{ backgroundImage: `url(${producer.coverImage})` }}
        />
      </div>
      <h3 className="font-display text-[15px] font-semibold text-soil-900 mb-1">
        {producer.name}
      </h3>
      <div className="flex items-center gap-1 mb-1.5">
        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-soil-600">
          <MapPin size={11} className="text-leaf" />
          {producer.location}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-label bg-soil-200 text-soil-700">
          {isEn ? producer.categoryLabelEn : producer.categoryLabel}
        </span>
        <span className="inline-flex items-center gap-0.5 text-body-sm text-soil-600">
          <Star size={12} className="text-sun fill-sun" />
          {producer.rating}
        </span>
      </div>
      <button
        onClick={() => navigate(`/producer/${producer.id}`)}
        className="text-terracotta text-sm font-semibold hover:text-terracotta-dark transition-colors"
      >
        {isEn ? (t('map.seeProfile') as string || 'See Profile') : (t('map.seeProfile') as string || 'Voir Profil')} →
      </button>
    </div>
  );
}
