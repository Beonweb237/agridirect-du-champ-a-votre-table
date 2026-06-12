import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    },
  };

  return (
    <footer className="bg-soil-900 text-soil-400">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-[1280px] mx-auto px-6 py-12 md:py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-1.5 mb-4">
              <Leaf size={22} className="text-terracotta" />
              <span className="font-display text-xl font-bold text-white">
                AgriDirect
              </span>
            </div>
            <p className="text-body-sm leading-relaxed mb-5 max-w-[280px]">
              {t('footer.tagline') as string}
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-soil-800 flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-200"
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon size={16} />
                </a>
              ))}
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-soil-800 flex items-center justify-center hover:bg-terracotta hover:text-white transition-all duration-200"
                onClick={(e) => e.preventDefault()}
              >
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </motion.div>

          {/* Products Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-sm mb-4">
              {t('footer.products.title') as string}
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: t('home.categories.cacao'), path: '/marketplace?category=cacao-cafe' },
                { label: t('home.categories.fruits'), path: '/marketplace?category=fruits-legumes' },
                { label: t('home.categories.poultry'), path: '/marketplace?category=volailles' },
                { label: t('home.categories.cereals'), path: '/marketplace?category=cereales' },
                { label: t('home.categories.honey'), path: '/marketplace?category=naturels' },
                { label: t('home.categories.spices'), path: '/marketplace?category=epices' },
              ].map((item) => (
                <li key={item.path}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-body-sm hover:text-terracotta transition-colors duration-200"
                  >
                    {item.label as string}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-sm mb-4">
              {t('footer.company.title') as string}
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: t('footer.link.about'), path: '/about' },
                { label: t('footer.link.how'), path: '/about' },
                { label: t('footer.link.producers'), path: '/marketplace' },
                { label: t('footer.link.blog'), path: '#' },
                { label: t('footer.link.careers'), path: '#' },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => item.path !== '#' && navigate(item.path)}
                    className={`text-body-sm hover:text-terracotta transition-colors duration-200 ${
                      item.path === '#' ? 'cursor-default opacity-50' : ''
                    }`}
                  >
                    {item.label as string}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support + Newsletter Column */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold text-sm mb-4">
              {t('footer.support.title') as string}
            </h4>
            <ul className="space-y-2.5 mb-6">
              {[
                { label: t('footer.link.help'), path: '#' },
                { label: t('footer.link.contact'), path: '#' },
                { label: t('footer.link.terms'), path: '#' },
                { label: t('footer.link.privacy'), path: '#' },
                { label: t('footer.link.driver'), path: '#' },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => item.path !== '#' && navigate(item.path)}
                    className={`text-body-sm hover:text-terracotta transition-colors duration-200 ${
                      item.path === '#' ? 'cursor-default opacity-50' : ''
                    }`}
                  >
                    {item.label as string}
                  </button>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <h4 className="text-white font-semibold text-sm mb-3">
              {t('footer.newsletter.title') as string}
            </h4>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.newsletter.placeholder') as string}
                className="flex-1 min-w-0 bg-soil-800 border border-soil-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-soil-500 outline-none focus:border-terracotta transition-colors"
              />
              <button
                type="submit"
                className="bg-terracotta text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-terracotta-dark transition-colors shrink-0"
              >
                {t('footer.newsletter.button') as string}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-6 border-t border-soil-800 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-body-sm text-soil-500">
            {t('footer.copyright') as string}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-body-sm font-semibold text-[#F5A623]">MoMo</span>
            <span className="text-body-sm font-semibold text-[#FF6600]">Orange Money</span>
            <span className="text-body-sm font-semibold text-soil-500">Visa</span>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
