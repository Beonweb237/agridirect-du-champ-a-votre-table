import { useLanguage } from '@/context/LanguageContext';
import Layout from '@/components/Layout';

export default function About() {
  const { t } = useLanguage();
  return (
    <Layout>
      <div className="pt-20 px-6 min-h-[60vh]">
        <h1 className="font-display text-display-lg text-soil-900">{t('nav.about') as string}</h1>
        <p className="text-soil-600 mt-2">About page coming soon...</p>
      </div>
    </Layout>
  );
}
