import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Camera, MapPin, FileText } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AttachmentMenuComponent = memo(function AttachmentMenuComponent({ open, onClose }: Props) {
  const { lang } = useLanguage();

  const t = {
    photo: lang === 'fr' ? 'Photo' : 'Photo',
    camera: lang === 'fr' ? 'Camera' : 'Camera',
    location: lang === 'fr' ? 'Localisation' : 'Location',
    document: lang === 'fr' ? 'Document' : 'Document',
  };

  const items = [
    { icon: Image, label: t.photo, color: 'text-sky' },
    { icon: Camera, label: t.camera, color: 'text-terracotta' },
    { icon: MapPin, label: t.location, color: 'text-leaf' },
    { icon: FileText, label: t.document, color: 'text-sun' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/20 z-[55]"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="fixed bottom-0 left-0 right-0 z-[60] bg-white rounded-t-2xl p-6 pb-8 shadow-xl"
          >
            <div className="w-10 h-1 bg-soil-300 rounded-full mx-auto mb-6" />
            <div className="grid grid-cols-4 gap-4">
              {items.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={onClose}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-14 h-14 rounded-2xl bg-soil-100 flex items-center justify-center hover:bg-soil-200 transition-colors">
                    <item.icon size={24} className={item.color} />
                  </div>
                  <span className="text-body-sm text-soil-700">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default AttachmentMenuComponent;
