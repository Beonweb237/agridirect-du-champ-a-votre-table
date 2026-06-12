import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Producer } from '@/data/producers';

interface ProducerSidebarProps {
  producers: Producer[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onClose: () => void;
  isOpen: boolean;
  userLocation: [number, number] | null;
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export default function ProducerSidebar({
  producers,
  selectedId,
  onSelect,
  onClose,
  isOpen,
  userLocation,
}: ProducerSidebarProps) {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-[55] md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="fixed right-0 top-[56px] bottom-0 w-full max-w-[360px] bg-white z-[60] shadow-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-soil-200">
              <div>
                <h2 className="font-display text-display-sm text-soil-900">
                  {isEn ? 'Nearby Producers' : 'Producteurs a Proximite'}
                </h2>
                <p className="text-body-sm text-soil-500 mt-0.5">
                  {producers.length} {isEn ? 'producers' : 'producteurs'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-soil-400 hover:text-soil-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {producers.map((producer, index) => (
                <motion.div
                  key={producer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={() => {
                    onSelect(producer.id);
                    navigate(`/producer/${producer.id}`);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    selectedId === producer.id
                      ? 'bg-leaf-light border border-leaf'
                      : 'bg-soil-50 hover:bg-soil-100 border border-transparent'
                  }`}
                >
                  <div
                    className="w-14 h-14 rounded-lg bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url(${producer.avatar})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-soil-900 truncate">
                      {producer.name}
                    </h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin size={11} className="text-leaf shrink-0" />
                      <span className="text-body-sm text-soil-500 truncate">
                        {producer.location}
                      </span>
                    </div>
                    {userLocation && (
                      <p className="text-body-sm text-sky mt-0.5">
                        {getDistance(userLocation[0], userLocation[1], producer.latitude, producer.longitude)} km
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-0.5 text-body-sm text-soil-600">
                        <Star size={11} className="text-sun fill-sun" />
                        {producer.rating}
                      </span>
                      <span className="text-body-sm text-soil-400">
                        ({producer.reviews} {isEn ? 'reviews' : 'avis'})
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-soil-400 shrink-0" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
