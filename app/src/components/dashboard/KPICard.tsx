import { memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Package, Users, Star } from 'lucide-react';
import type { KPICard as KPICardType } from '@/data/dashboardData';
import { useLanguage } from '@/context/LanguageContext';
import { SparklineChart } from './SparklineChart';

const iconMap = {
  trendingUp: TrendingUp,
  package: Package,
  users: Users,
  star: Star,
};

interface Props {
  card: KPICardType;
  index: number;
}

const KPICardComponent = memo(function KPICardComponent({ card, index }: Props) {
  const { lang } = useLanguage();
  const Icon = iconMap[card.icon as keyof typeof iconMap] || TrendingUp;
  const title = lang === 'fr' ? card.title : card.titleEn;
  const change = lang === 'fr' ? card.change : card.changeEn;
  const isRating = card.icon === 'star';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
      className="bg-soil-50 rounded-[14px] p-5 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-full ${card.iconBg} flex items-center justify-center`}>
          <Icon size={18} className={card.iconColor} />
        </div>
        {card.sparkline && (
          <div className="w-[80px] h-[28px]">
            <SparklineChart data={card.sparkline} color={card.iconColor.replace('text-', '')} />
          </div>
        )}
        {isRating && (
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={12}
                className={s <= 4 ? 'text-sun fill-sun' : s === 5 ? 'text-sun opacity-40' : 'text-soil-300'}
                fill={s <= 4 ? '#D4A017' : s === 5 ? '#D4A017' : 'none'}
              />
            ))}
          </div>
        )}
      </div>
      <p className="text-body-sm text-soil-500">{title}</p>
      <p className="font-mono text-[22px] font-bold text-soil-900 leading-tight">{card.value}</p>
      <p className={`text-body-sm ${change.startsWith('+') ? 'text-leaf' : 'text-soil-500'}`}>
        {change}
      </p>
    </motion.div>
  );
});

export default KPICardComponent;
