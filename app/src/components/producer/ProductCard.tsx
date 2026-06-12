import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/data/producers';

interface ProductCardProps {
  product: Product;
  index: number;
  isEn: boolean;
}

export default function ProductCard({ product, index, isEn }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-soil-50 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all cursor-pointer group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={isEn ? product.nameEn : product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h4 className="text-sm font-semibold text-soil-900 truncate">
          {isEn ? product.nameEn : product.name}
        </h4>
        <div className="flex items-center justify-between mt-2">
          <span className="text-price text-terracotta">{product.price.toLocaleString()} <span className="text-body-sm font-normal text-soil-500">FCFA/{product.unit}</span></span>
        </div>
      </div>
    </motion.div>
  );
}
