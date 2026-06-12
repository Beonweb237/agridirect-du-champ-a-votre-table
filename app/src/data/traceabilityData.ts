// Mock data for traceability page — realistic cacao product from South Cameroon

export interface TimelineStep {
  id: number;
  status: 'completed' | 'current' | 'future';
  date: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  details: string;
  location: string;
}

export interface QualityMetric {
  id: number;
  label: string;
  labelEn: string;
  value: string;
  status: 'conforme' | 'warning' | 'alert';
  range: string;
  progress: number; // 0-100
}

export interface Certification {
  id: number;
  name: string;
  nameEn: string;
  certifier: string;
  date: string;
  icon: 'leaf' | 'award' | 'scale';
}

export interface ProducerInfo {
  name: string;
  avatar: string;
  title: string;
  titleEn: string;
  location: string;
  rating: number;
  reviewCount: number;
  memberSince: string;
  salesCount: number;
  phone: string;
  bio: string;
  bioEn: string;
}

export interface TraceabilityData {
  productId: string;
  traceId: string;
  productName: string;
  productNameEn: string;
  productImage: string;
  variety: string;
  varietyEn: string;
  harvestDate: string;
  harvestDateEn: string;
  location: string;
  locationEn: string;
  region: string;
  regionEn: string;
  isOrganic: boolean;
  timeline: TimelineStep[];
  producer: ProducerInfo;
  qualityMetrics: QualityMetric[];
  certifications: Certification[];
  shareUrl: string;
}

export const cacaoTraceabilityData: TraceabilityData = {
  productId: 'AGRI-2024-CAC-001847',
  traceId: 'AGRI-2024-CAC-001847',
  productName: 'Fèves de Cacao Premium — Variété Forastero',
  productNameEn: 'Premium Cacao Beans — Forastero Variety',
  productImage: '/images/product-cacao.jpg',
  variety: 'Forastero',
  varietyEn: 'Forastero',
  harvestDate: '15 Oct 2024',
  harvestDateEn: 'Oct 15, 2024',
  location: 'Kribi, Sud',
  locationEn: 'Kribi, South',
  region: 'Région du Sud',
  regionEn: 'South Region',
  isOrganic: true,
  timeline: [
    {
      id: 1,
      status: 'completed',
      date: 'Mars 2021',
      title: 'Plantation des Cacaoyers',
      titleEn: 'Cacao Tree Planting',
      description: 'Plants de cacao Forastero issus du programme de certification ICCRI, plantés sur une parcelle de 3 hectares à 150m d\'altitude dans la forêt côtière de Kribi. Les sols volcaniques riches en minéraux donnent un cacao aux arômes unique.',
      descriptionEn: 'Forastero cacao plants from the ICCRI certification program, planted on a 3-hectare plot at 150m altitude in the Kribi coastal forest. Volcanic mineral-rich soils produce uniquely flavored cacao.',
      details: 'Variété: Forastero | Altitude: 150m | Parcelle: CAC-KRI-007 | Sol: Volcanique',
      location: 'Kribi, Sud',
    },
    {
      id: 2,
      status: 'completed',
      date: 'Mars 2021 — Sept 2024',
      title: 'Culture & Entretien',
      titleEn: 'Growing & Care',
      description: 'Culture en agroforesterie avec des bananiers, avocatiers et papayers comme ombrage naturel. Aucun pesticide chimique utilisé — protection par extraits végétaux (neem, piment). Engrais organiques compostés sur place avec la paille de cacao.',
      descriptionEn: 'Agroforestry with banana, avocado and papaya trees as natural shade. No chemical pesticides — plant-based protection (neem, chili). Organic fertilizers composted on-site with cacao pod husks.',
      details: 'Méthode: Agroforesterie | Ombrage: 35% | Certification: AB-2024-CMR-0047',
      location: 'Kribi, Sud',
    },
    {
      id: 3,
      status: 'completed',
      date: '15 Octobre 2024',
      title: 'Récolte Manuelle',
      titleEn: 'Hand Harvesting',
      description: 'Récolte à la main des cabosses à maturité optimale (couleur jaune-orange vif). Sélection rigoureuse: seules les cabosses parfaitement mûres avec un son creux au tapotement sont cueillies. Chaque cabosse est inspectée individuellement.',
      descriptionEn: 'Hand-picked pods at optimal maturity (bright yellow-orange color). Rigorous selection: only perfectly ripe pods with a hollow sound when tapped are harvested. Each pod is individually inspected.',
      details: 'Heure: 06:00 — 10:30 | Température: 26°C | Humidité: 82% | Maturité: 100%',
      location: 'Kribi, Sud',
    },
    {
      id: 4,
      status: 'completed',
      date: '15 — 23 Oct 2024',
      title: 'Fermentation & Séchage Naturel',
      titleEn: 'Fermentation & Natural Drying',
      description: 'Fermentation en caisses en bois de raffia pendant 7 jours (retournement quotidien des fèves). Température contrôlée: 45-50°C. Séchage naturel au soleil sur claies en bambou pendant 7 jours supplémentaires. Humidité finale optimale.',
      descriptionEn: 'Fermentation in raffia wood boxes for 7 days (daily bean turning). Controlled temperature: 45-50°C. Natural sun-drying on bamboo racks for 7 additional days. Final humidity at optimal level.',
      details: 'Fermentation: 7 jours | Séchage: 7 jours | Humidité finale: 6.8% | pH: 5.4',
      location: 'Kribi, Sud',
    },
    {
      id: 5,
      status: 'completed',
      date: '24 Octobre 2024',
      title: 'Contrôle Qualité & Conditionnement',
      titleEn: 'Quality Control & Packaging',
      description: 'Tri manuel des fèves par calibre (grade A: 100g/100 fèves). Analyse en laboratoire certifié ISO 17025 à Yaoundé. Conditionnement en sacs jute bio de 50kg avec étiquette QR de traçabilité AgriDirect.',
      descriptionEn: 'Manual bean sorting by caliber (Grade A: 100g/100 beans). Analysis at ISO 17025 certified laboratory in Yaoundé. Packaged in 50kg organic jute bags with AgriDirect QR traceability label.',
      details: 'Poids net: 50kg | Calibre: Grade A | Lot: LOT-2024-CAC-0847 | Test: Conforme',
      location: 'Yaoundé, Labo QualiCam',
    },
    {
      id: 6,
      status: 'current',
      date: 'En cours',
      title: 'Transport & Livraison',
      titleEn: 'Transport & Delivery',
      description: 'Votre commande est en route ! Transport par camion réfrigéré via partenaire AgriDirect Express. Température contrôlée à 18°C. Livraison prévue sous 24-48h selon votre région.',
      descriptionEn: 'Your order is on its way! Transport by refrigerated truck via AgriDirect Express partner. Temperature controlled at 18°C. Delivery expected within 24-48h depending on your region.',
      details: 'Transporteur: AgriDirect Express | Température: 18°C | Destination: Douala/Bonapriso',
      location: 'En transit',
    },
  ],
  producer: {
    name: 'Jean-Pierre Mougang',
    avatar: '/images/farmer-portrait-1.jpg',
    title: 'Producteur de Cacao — 3ème Génération',
    titleEn: 'Cacao Producer — 3rd Generation',
    location: 'Kribi, Région du Sud, Cameroun',
    rating: 4.9,
    reviewCount: 156,
    memberSince: '2022',
    salesCount: 342,
    phone: '+237 6 89 45 23 17',
    bio: 'Troisième génération de producteurs de cacao, Jean-Pierre cultive 12 hectares de cacaoyers Forastero dans la région de Kribi. Sa famille perpétue les techniques traditionnelles de fermentation tout en adoptant les pratiques bio modernes. Ses fèves sont recherchées par les chocolatiers artisanaux de Douala et Yaoundé.',
    bioEn: 'Third-generation cacao producer, Jean-Pierre cultivates 12 hectares of Forastero cacao in the Kribi region. His family perpetuates traditional fermentation techniques while adopting modern organic practices. His beans are sought after by artisanal chocolatiers in Douala and Yaoundé.',
  },
  qualityMetrics: [
    {
      id: 1,
      label: 'Fraîcheur',
      labelEn: 'Freshness',
      value: '94%',
      status: 'conforme',
      range: 'Seuil: >90%',
      progress: 94,
    },
    {
      id: 2,
      label: 'Teneur en Beurre',
      labelEn: 'Butter Content',
      value: '54.2%',
      status: 'conforme',
      range: 'Norme: 50-58%',
      progress: 70,
    },
    {
      id: 3,
      label: 'Humidité',
      labelEn: 'Moisture',
      value: '6.8%',
      status: 'conforme',
      range: 'Norme: <7%',
      progress: 97,
    },
    {
      id: 4,
      label: 'Fermentation',
      labelEn: 'Fermentation',
      value: 'Complète (7j)',
      status: 'conforme',
      range: 'Norme: 5-7 jours',
      progress: 100,
    },
    {
      id: 5,
      label: 'Calibre',
      labelEn: 'Bean Size',
      value: 'Grade A',
      status: 'conforme',
      range: '100g/100 fèves',
      progress: 100,
    },
    {
      id: 6,
      label: 'Sans Pesticides',
      labelEn: 'Pesticide Free',
      value: 'Non détecté',
      status: 'conforme',
      range: 'Seuil: 0',
      progress: 100,
    },
  ],
  certifications: [
    {
      id: 1,
      name: 'Agriculture Biologique',
      nameEn: 'Organic Agriculture',
      certifier: 'Bureau Veritas Cameroun',
      date: '15 Mars 2024',
      icon: 'leaf',
    },
    {
      id: 2,
      name: 'Bonne Pratique Agricole (GAP)',
      nameEn: 'Good Agricultural Practice (GAP)',
      certifier: 'ICCRI — Institut du Cacao',
      date: '20 Juin 2024',
      icon: 'award',
    },
    {
      id: 3,
      name: 'Commerce Équitable',
      nameEn: 'Fair Trade',
      certifier: 'FLO Cert',
      date: '10 Jan 2024',
      icon: 'scale',
    },
  ],
  shareUrl: 'https://agridirect.cm/trace/AGRI-2024-CAC-001847',
};

// Invalid QR error mock
export const invalidQrData = {
  errorTitle: 'Code QR Non Reconnu',
  errorTitleEn: 'QR Code Not Recognized',
  errorMessage: 'Ce code de traçabilité n\'est pas reconnu dans notre système. Il se peut que le produit ne provienne pas d\'AgriDirect ou que le code soit invalide.',
  errorMessageEn: 'This traceability code is not recognized in our system. The product may not come from AgriDirect or the code may be invalid.',
};
