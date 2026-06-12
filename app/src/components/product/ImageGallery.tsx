import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Heart, Share2, ZoomIn, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  isSeasonal: boolean;
  isOrganic: boolean;
  isPromo: boolean;
  discountPercent?: number;
}

export default function ImageGallery({
  images,
  productName,
  isSeasonal,
  isOrganic,
  isPromo,
  discountPercent,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
      setSelectedIndex(index);
    },
    [emblaApi],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image / carousel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
        className="relative aspect-square rounded-2xl overflow-hidden bg-soil-100"
      >
        {/* Mobile: Embla carousel */}
        <div className="md:hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((img, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0">
                <img
                  src={img}
                  alt={`${productName} ${i + 1}`}
                  className="w-full aspect-square object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Single image with crossfade */}
        <div className="hidden md:block relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedIndex}
              src={images[selectedIndex]}
              alt={`${productName} ${selectedIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
              onClick={() => setLightboxOpen(true)}
            />
          </AnimatePresence>
        </div>

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isSeasonal && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-sun-light text-sun text-label rounded-full">
              {'\u2600'} EN SAISON
            </span>
          )}
          {isOrganic && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-leaf-light text-leaf-dark text-label rounded-full">
              {'\u{1F33F}'} BIO
            </span>
          )}
          {isPromo && discountPercent && (
            <span className="inline-flex items-center px-2.5 py-1 bg-terracotta text-white text-label rounded-full font-bold">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => setFavorited((f) => !f)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <motion.div
              animate={favorited ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
            >
              <Heart
                size={18}
                className={favorited ? 'text-terracotta fill-terracotta' : 'text-soil-600'}
                strokeWidth={favorited ? 0 : 1.5}
              />
            </motion.div>
          </button>
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors">
            <Share2 size={18} className="text-soil-600" />
          </button>
          <button
            onClick={() => setLightboxOpen(true)}
            className="hidden md:flex w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <ZoomIn size={18} className="text-soil-600" />
          </button>
        </div>

        {/* Mobile carousel arrows */}
        <div className="md:hidden absolute inset-y-0 left-0 flex items-center z-10">
          <button onClick={scrollPrev} className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center ml-2">
            <ChevronLeft size={18} className="text-soil-700" />
          </button>
        </div>
        <div className="md:hidden absolute inset-y-0 right-0 flex items-center z-10">
          <button onClick={scrollNext} className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center mr-2">
            <ChevronRight size={18} className="text-soil-700" />
          </button>
        </div>
      </motion.div>

      {/* Thumbnails (desktop) */}
      <div className="hidden md:flex gap-2 overflow-x-auto hide-scrollbar">
        {images.map((img, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onClick={() => scrollTo(i)}
            className={`shrink-0 w-[72px] h-[72px] rounded-xl overflow-hidden border-2 transition-colors ${
              selectedIndex === i ? 'border-terracotta' : 'border-transparent hover:border-soil-300'
            }`}
          >
            <img src={img} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
          </motion.button>
        ))}
      </div>

      {/* Mobile dot indicators */}
      <div className="flex md:hidden justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              selectedIndex === i ? 'bg-terracotta' : 'bg-soil-300'
            }`}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"
              onClick={() => setLightboxOpen(false)}
            >
              <X size={20} />
            </button>
            <img
              src={images[selectedIndex]}
              alt={productName}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
