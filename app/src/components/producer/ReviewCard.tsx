import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Review } from '@/data/producers';

interface ReviewCardProps {
  review: Review;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="p-4 bg-soil-50 rounded-xl"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-terracotta-light flex items-center justify-center text-terracotta font-semibold text-xs">
          {review.author.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-soil-900">{review.author}</p>
          <p className="text-body-sm text-soil-500">{review.date}</p>
        </div>
        <div className="ml-auto flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < review.rating ? 'text-sun fill-sun' : 'text-soil-300'}
            />
          ))}
        </div>
      </div>
      <p className="text-body text-soil-700">{review.comment}</p>
    </motion.div>
  );
}
