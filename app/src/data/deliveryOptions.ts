export interface DeliveryOption {
  id: 'standard' | 'express' | 'pickup';
  label: string;
  labelEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  estimatedTime: string;
  estimatedTimeEn: string;
}

export const deliveryOptions: DeliveryOption[] = [
  {
    id: 'standard',
    label: 'Livraison Standard',
    labelEn: 'Standard Delivery',
    description: '24-48h',
    descriptionEn: '24-48h',
    price: 1500,
    estimatedTime: '24-48 heures',
    estimatedTimeEn: '24-48 hours',
  },
  {
    id: 'express',
    label: 'Livraison Express',
    labelEn: 'Express Delivery',
    description: '12-24h',
    descriptionEn: '12-24h',
    price: 3000,
    estimatedTime: '12-24 heures',
    estimatedTimeEn: '12-24 hours',
  },
  {
    id: 'pickup',
    label: 'Retrait chez le Producteur',
    labelEn: 'Pickup from Producer',
    description: 'Gratuit',
    descriptionEn: 'Free',
    price: 0,
    estimatedTime: 'Sur rendez-vous',
    estimatedTimeEn: 'By appointment',
  },
];

export const cameroonCities = [
  'Yaounde',
  'Douala',
  'Bafoussam',
  'Bamenda',
  'Garoua',
  'Maroua',
  'Ngaoundere',
  'Bertoua',
  'Ebolowa',
  'Buea',
];

export const deliveryCosts: Record<string, Record<string, number>> = {
  Yaounde: { standard: 1500, express: 3000, pickup: 0 },
  Douala: { standard: 1500, express: 3000, pickup: 0 },
  Bafoussam: { standard: 2000, express: 3500, pickup: 0 },
  Bamenda: { standard: 2000, express: 3500, pickup: 0 },
  Garoua: { standard: 2500, express: 4000, pickup: 0 },
  Maroua: { standard: 2500, express: 4000, pickup: 0 },
  Ngaoundere: { standard: 2500, express: 4000, pickup: 0 },
  Bertoua: { standard: 2000, express: 3500, pickup: 0 },
  Ebolowa: { standard: 1500, express: 3000, pickup: 0 },
  Buea: { standard: 2000, express: 3500, pickup: 0 },
};
