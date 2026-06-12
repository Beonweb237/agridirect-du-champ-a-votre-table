import { motion } from 'framer-motion';
import { Leaf, Award, ShieldCheck, Sprout, BadgeCheck } from 'lucide-react';
import type { Certification } from '@/data/producers';

const iconMap: Record<string, React.ElementType> = {
  'Agriculture Biologique': Leaf,
  'Organic Agriculture': Leaf,
  'Miel Biologique': Leaf,
  'Miel d\'Oku AOC': Leaf,
  'Cafe de Specialite': Award,
  'Specialty Coffee': Award,
  'Cacao Grand Cru': Award,
  'Commerce Equitable': Award,
  'Fair Trade': Award,
  'Commerce Equitable Femmes': Award,
  'Women Fair Trade': Award,
  'GAP (Bonne Pratique Agricole)': ShieldCheck,
  'GAP (Good Agricultural Practice)': ShieldCheck,
  'GAP': ShieldCheck,
  'Bien-etre Animal Certifie': ShieldCheck,
  'Animal Welfare Certified': ShieldCheck,
  'Sans Pesticides': ShieldCheck,
  'Pesticide-Free': ShieldCheck,
  'Agroforesterie Durable': Sprout,
  'Sustainable Agroforestry': Sprout,
  'Apiculture Durable': Sprout,
  'Sustainable Beekeeping': Sprout,
  'Agriculture Durable': Sprout,
  'Sustainable Agriculture': Sprout,
};

const colorMap: Record<string, string> = {
  'Agriculture Biologique': '#4A7C3F',
  'Organic Agriculture': '#4A7C3F',
  'Miel Biologique': '#4A7C3F',
  'Miel d\'Oku AOC': '#4A7C3F',
  'Cafe de Specialite': '#D4A017',
  'Specialty Coffee': '#D4A017',
  'Cacao Grand Cru': '#D4A017',
  'Commerce Equitable': '#D4A017',
  'Fair Trade': '#D4A017',
  'GAP (Bonne Pratique Agricole)': '#4A8FBF',
  'GAP': '#4A8FBF',
  'Bien-etre Animal Certifie': '#4A8FBF',
  'Sans Pesticides': '#4A8FBF',
  'Agroforesterie Durable': '#C75B2A',
  'Sustainable Agroforestry': '#C75B2A',
};

interface CertificationCardProps {
  cert: Certification;
  index: number;
  isEn: boolean;
}

export default function CertificationCard({ cert, index, isEn }: CertificationCardProps) {
  const IconComp = iconMap[cert.name] || BadgeCheck;
  const color = colorMap[cert.name] || '#4A7C3F';
  const name = isEn ? cert.nameEn : cert.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="flex items-start gap-3 p-4 bg-white rounded-xl border border-soil-200 hover:shadow-card transition-shadow"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}15` }}
      >
        <IconComp size={20} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-soil-900">{name}</h4>
        <p className="text-body-sm text-soil-600 mt-0.5">{cert.code}</p>
        <p className="text-body-sm text-soil-500 mt-1">
          {isEn ? 'Verified:' : 'Verifie le:'} {cert.verifiedDate}
        </p>
      </div>
      <BadgeCheck size={18} className="text-leaf shrink-0" />
    </motion.div>
  );
}
