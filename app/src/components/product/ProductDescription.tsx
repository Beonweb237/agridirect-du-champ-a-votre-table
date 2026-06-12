import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ProductDescriptionProps {
  description: string;
  descriptionEn: string;
}

interface AccordionItem {
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
}

export default function ProductDescription({ description, descriptionEn }: ProductDescriptionProps) {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const accordionItems: AccordionItem[] = [
    {
      title: 'Details Techniques',
      titleEn: 'Technical Details',
      content: 'Produit agricole naturel. Sans conservateurs artificiels. Conditionnement eco-responsable. Poids net conforme a la description.',
      contentEn: 'Natural agricultural product. No artificial preservatives. Eco-friendly packaging. Net weight as described.',
    },
    {
      title: 'Conseils de Conservation',
      titleEn: 'Storage Tips',
      content: 'Conserver dans un endroit frais et sec a l\'abri de la lumiere directe. Pour une fraicheur optimale, consommer dans les 7 jours suivant la livraison.',
      contentEn: 'Store in a cool, dry place away from direct light. For optimal freshness, consume within 7 days of delivery.',
    },
    {
      title: 'Conditions de Livraison',
      titleEn: 'Delivery Conditions',
      content: 'Livraison disponible dans toutes les regions du Cameroun. Delai: 24-48h pour les grandes villes, 48-72h pour les zones rurales. Frais de livraison calcules au checkout.',
      contentEn: 'Delivery available in all regions of Cameroon. Timeline: 24-48h for major cities, 48-72h for rural areas. Shipping costs calculated at checkout.',
    },
  ];

  const desc = lang === 'fr' ? description : descriptionEn;

  return (
    <div ref={ref} className="max-w-[1024px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <h2 className="font-display text-display-md text-soil-900 mb-4">
          {lang === 'fr' ? 'À Propos de ce Produit' : 'About This Product'}
        </h2>

        {/* Description text — handle markdown-like formatting */}
        <div className="text-body text-soil-700 whitespace-pre-line mb-6 leading-relaxed">
          {desc.split('\\n').map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**')) {
              return (
                <p key={i} className="font-semibold text-soil-900 mt-4 mb-2">
                  {line.replace(/\*\*/g, '')}
                </p>
              );
            }
            if (line.startsWith('- ')) {
              return (
                <li key={i} className="ml-4 mb-1 text-soil-700">
                  {line.replace('- ', '')}
                </li>
              );
            }
            if (line.trim() === '') return null;
            return <p key={i} className="mb-2">{line}</p>;
          })}
        </div>

        {/* Accordion items */}
        <div className="space-y-2">
          {accordionItems.map((item) => {
            const title = lang === 'fr' ? item.title : item.titleEn;
            const content = lang === 'fr' ? item.content : item.contentEn;
            const isOpen = openItems.has(title);

            return (
              <div key={title} className="border border-soil-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleItem(title)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-soil-50 transition-colors"
                >
                  <span className="text-body font-semibold text-soil-900">{title}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={18} className="text-soil-500" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-body text-soil-700">{content}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
