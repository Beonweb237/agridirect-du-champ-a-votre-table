export type Category = 'all' | 'cacao' | 'fruits' | 'poultry' | 'cereals' | 'honey' | 'spices';

export interface Product {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  unit: string;
  image: string;
  category: Category;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Certification {
  id: number;
  name: string;
  nameEn: string;
  code: string;
  verifiedDate: string;
}

export interface Producer {
  id: number;
  name: string;
  title: string;
  titleEn: string;
  location: string;
  region: string;
  regionEn: string;
  latitude: number;
  longitude: number;
  category: Category;
  categoryLabel: string;
  categoryLabelEn: string;
  rating: number;
  reviews: number;
  sales: number;
  memberSince: string;
  responseTime: string;
  responseTimeEn: string;
  avatar: string;
  coverImage: string;
  bio: string;
  bioEn: string;
  certifications: Certification[];
  products: Product[];
  reviewsList: Review[];
  farmSize: string;
}

export const categories: { id: Category; label: string; labelEn: string }[] = [
  { id: 'all', label: 'Tout', labelEn: 'All' },
  { id: 'cacao', label: 'Cacao & Cafe', labelEn: 'Cacao & Coffee' },
  { id: 'fruits', label: 'Fruits & Legumes', labelEn: 'Fruits & Vegetables' },
  { id: 'poultry', label: 'Volailles', labelEn: 'Poultry' },
  { id: 'cereals', label: 'Cereales', labelEn: 'Cereals' },
  { id: 'honey', label: 'Miel', labelEn: 'Honey' },
  { id: 'spices', label: 'Plantes & Epices', labelEn: 'Plants & Spices' },
];

export const producers: Producer[] = [
  {
    id: 1,
    name: 'Jean-Pierre Ndongo',
    title: 'Producteur de Cacao & Cafe — 3eme Generation',
    titleEn: 'Cacao & Coffee Producer — 3rd Generation',
    location: 'Bafoussam, Region de l\'Ouest',
    region: 'Ouest',
    regionEn: 'West',
    latitude: 5.1456,
    longitude: 10.5234,
    category: 'cacao',
    categoryLabel: 'Cacao & Cafe',
    categoryLabelEn: 'Cacao & Coffee',
    rating: 4.8,
    reviews: 127,
    sales: 342,
    memberSince: '2022',
    responseTime: '~2h',
    responseTimeEn: '~2h',
    avatar: '/farmer-portrait-1.jpg',
    coverImage: '/farmer-portrait-1.jpg',
    bio: 'Je suis Jean-Pierre Ndongo, producteur de cacao et de cafe dans les collines de Bafoussam depuis plus de 25 ans. Mon exploitation de 12 hectares a ete fondee par mon grand-pere dans les annees 1960, et je perpetue aujourd\'hui son savoir-faire avec mes trois enfants. Nous cultivons exclusivement des varietes locales adaptees a notre terroir — Forastero pour le cacao et Arabica pour le cafe. Toute notre production est 100% biologique, sans pesticides ni engrais chimiques. La fermentation et le sechage se font naturellement, selon les methodes que ma famille a perfectionnees sur trois generations.',
    bioEn: 'I am Jean-Pierre Ndongo, a cacao and coffee producer in the hills of Bafoussam for over 25 years. My 12-hectare farm was founded by my grandfather in the 1960s, and I continue his craft today with my three children. We exclusively grow local varieties adapted to our terroir — Forastero for cacao and Arabica for coffee. All our production is 100% organic, without pesticides or chemical fertilizers.',
    farmSize: '12 hectares',
    certifications: [
      { id: 1, name: 'Agriculture Biologique', nameEn: 'Organic Agriculture', code: 'AB-2024-CMR-0047', verifiedDate: '15 Mars 2024' },
      { id: 2, name: 'Commerce Equitable', nameEn: 'Fair Trade', code: 'FLO-8842', verifiedDate: '22 Jan 2024' },
      { id: 3, name: 'GAP (Bonne Pratique Agricole)', nameEn: 'GAP (Good Agricultural Practice)', code: 'GAP-Cameroun-2024', verifiedDate: '10 Fev 2024' },
      { id: 4, name: 'Agroforesterie Durable', nameEn: 'Sustainable Agroforestry', code: 'RSE-CMR-112', verifiedDate: '5 Avr 2024' },
    ],
    products: [
      { id: 101, name: 'Feves de Cacao Premium', nameEn: 'Premium Cacao Beans', price: 2500, unit: 'kg', image: '/product-cacao.jpg', category: 'cacao' },
      { id: 102, name: 'Cafe Arabica Torrefie', nameEn: 'Roasted Arabica Coffee', price: 4500, unit: 'kg', image: '/product-coffee.jpg', category: 'cacao' },
      { id: 103, name: 'Cacao en Poudre Bio', nameEn: 'Organic Cacao Powder', price: 3800, unit: 'kg', image: '/product-cacao.jpg', category: 'cacao' },
      { id: 104, name: 'Cafe Moulu Tradition', nameEn: 'Traditional Ground Coffee', price: 4200, unit: 'kg', image: '/product-coffee.jpg', category: 'cacao' },
    ],
    reviewsList: [
      { id: 1, author: 'Amadou K.', rating: 5, date: '2024-05-15', comment: 'Excellent cacao, fermentation parfaite. Mes clients adorent le gout.' },
      { id: 2, author: 'Sophie M.', rating: 5, date: '2024-05-10', comment: 'Le cafe est exceptionnel, aroma riche et corse. Livraison rapide.' },
      { id: 3, author: 'Bernard T.', rating: 4, date: '2024-04-28', comment: 'Tres bon produit, packaging soigne. Je recommande.' },
    ],
  },
  {
    id: 2,
    name: 'Marie-Claire Fotso',
    title: 'Eleveuse de Volailles & Productrice d\'Oeufs',
    titleEn: 'Poultry Farmer & Egg Producer',
    location: 'Yaounde, Region du Centre',
    region: 'Centre',
    regionEn: 'Centre',
    latitude: 3.8480,
    longitude: 11.5150,
    category: 'poultry',
    categoryLabel: 'Volailles',
    categoryLabelEn: 'Poultry',
    rating: 4.9,
    reviews: 89,
    sales: 567,
    memberSince: '2021',
    responseTime: '~1h',
    responseTimeEn: '~1h',
    avatar: '/farmer-portrait-2.jpg',
    coverImage: '/farmer-portrait-2.jpg',
    bio: 'Mes poules sont elevees en liberte dans les environs de Yaounde, avec des aliments 100% naturels composes de mais, de son et de calcium marin. Je produis des oeufs frais chaque jour, collectes le matin et livres dans les 24h. La qualite commence par le bien-etre animal. Mon exploitation compte plus de 500 poules pondeuses et je forme aussi des jeunes femmes a l\'aviculture.',
    bioEn: 'My hens are free-range around Yaounde, fed 100% natural food made of corn, bran, and marine calcium. I collect fresh eggs every morning and deliver within 24h. Quality starts with animal welfare. My farm has over 500 laying hens and I also train young women in poultry farming.',
    farmSize: '3 hectares',
    certifications: [
      { id: 1, name: 'Bien-etre Animal Certifie', nameEn: 'Animal Welfare Certified', code: 'BWA-CMR-2024', verifiedDate: '12 Jan 2024' },
      { id: 2, name: 'Alimentation Naturelle', nameEn: 'Natural Feed', code: 'AN-2024-CMR-0023', verifiedDate: '3 Fev 2024' },
      { id: 3, name: 'GAP (Bonne Pratique Agricole)', nameEn: 'GAP', code: 'GAP-CMR-089', verifiedDate: '18 Mar 2024' },
    ],
    products: [
      { id: 201, name: 'Oeufs Fermiers Frais', nameEn: 'Fresh Farm Eggs', price: 1200, unit: 'plateau', image: '/product-eggs.jpg', category: 'poultry' },
      { id: 202, name: 'Poulet de Chair Bio', nameEn: 'Organic Chicken', price: 5500, unit: 'piece', image: '/product-eggs.jpg', category: 'poultry' },
      { id: 203, name: 'Poulet de Ferme Entier', nameEn: 'Whole Farm Chicken', price: 6500, unit: 'piece', image: '/product-eggs.jpg', category: 'poultry' },
    ],
    reviewsList: [
      { id: 1, author: 'Chef Pierre', rating: 5, date: '2024-05-20', comment: 'Les oeufs sont super frais, jaune bien fonce. Parfait pour ma patisserie.' },
      { id: 2, author: 'Grace N.', rating: 5, date: '2024-05-12', comment: 'Poulet tendre et savoureux. Livraison toujours a l\'heure.' },
    ],
  },
  {
    id: 3,
    name: 'Emmanuel Tchamba',
    title: 'Producteur de Legumes Biologiques',
    titleEn: 'Organic Vegetable Producer',
    location: 'Nkolfoulou, Region du Centre',
    region: 'Centre',
    regionEn: 'Centre',
    latitude: 3.9167,
    longitude: 11.7333,
    category: 'fruits',
    categoryLabel: 'Fruits & Legumes',
    categoryLabelEn: 'Fruits & Vegetables',
    rating: 4.7,
    reviews: 156,
    sales: 423,
    memberSince: '2020',
    responseTime: '~3h',
    responseTimeEn: '~3h',
    avatar: '/farmer-portrait-3.jpg',
    coverImage: '/farmer-portrait-3.jpg',
    bio: 'L\'agriculture biologique n\'est pas une mode, c\'est un retour aux sources. Nos legumes poussent comme la nature l\'intend, sans engrais chimiques ni pesticides. Je cultive sur 8 hectares a Nkolfoulou des tomates, carottes, gombos, et epinards. Chaque produit est recolte a maturite et soigneusement lave avant livraison.',
    bioEn: 'Organic farming is not a trend, it\'s a return to our roots. Our vegetables grow as nature intended, without chemical fertilizers or pesticides. I grow tomatoes, carrots, okra, and spinach on 8 hectares in Nkolfoulou. Each product is harvested at maturity and carefully washed before delivery.',
    farmSize: '8 hectares',
    certifications: [
      { id: 1, name: 'Agriculture Biologique', nameEn: 'Organic Agriculture', code: 'AB-2024-CMR-0031', verifiedDate: '20 Fev 2024' },
      { id: 2, name: 'Sans Pesticides', nameEn: 'Pesticide-Free', code: 'SP-CMR-2024-067', verifiedDate: '15 Mar 2024' },
      { id: 3, name: 'Agriculture Durable', nameEn: 'Sustainable Agriculture', code: 'AD-CMR-112', verifiedDate: '8 Avr 2024' },
    ],
    products: [
      { id: 301, name: 'Tomates Vigne', nameEn: 'Vine Tomatoes', price: 800, unit: 'kg', image: '/product-tomatoes.jpg', category: 'fruits' },
      { id: 302, name: 'Carottes Bio', nameEn: 'Organic Carrots', price: 600, unit: 'botte', image: '/product-carrots.jpg', category: 'fruits' },
      { id: 303, name: 'Gombos Frais', nameEn: 'Fresh Okra', price: 500, unit: 'kg', image: '/product-okra.jpg', category: 'fruits' },
      { id: 304, name: 'Epinards Frais', nameEn: 'Fresh Spinach', price: 400, unit: 'botte', image: '/product-carrots.jpg', category: 'fruits' },
    ],
    reviewsList: [
      { id: 1, author: 'Restaurant Le Coin', rating: 5, date: '2024-05-18', comment: 'Tomates toujours parfaites, livraison reguliere. Notre fournisseur principal.' },
      { id: 2, author: 'Aline K.', rating: 4, date: '2024-05-08', comment: 'Legumes frais et bien laves. Prix un peu eleve mais qualite au rendez-vous.' },
    ],
  },
  {
    id: 4,
    name: 'Pauline Mengue',
    title: 'Productrice de Plantains & Bananes',
    titleEn: 'Plantain & Banana Producer',
    location: 'Kumba, Region du Sud-Ouest',
    region: 'Sud-Ouest',
    regionEn: 'South-West',
    latitude: 4.6333,
    longitude: 9.4500,
    category: 'fruits',
    categoryLabel: 'Fruits & Legumes',
    categoryLabelEn: 'Fruits & Vegetables',
    rating: 4.6,
    reviews: 74,
    sales: 289,
    memberSince: '2023',
    responseTime: '~4h',
    responseTimeEn: '~4h',
    avatar: '/farmer-portrait-3.jpg',
    coverImage: '/farmer-portrait-3.jpg',
    bio: 'Je cultive des plantains et bananes sur 15 hectares dans la fertile region de Kumba. Nos sols volcaniques donnent des fruits particulierement savoureux et nourrissants. Les plantains sont recoltes a differents stades de maturite selon vos besoins — verts pour le chips, murs pour le miondo.',
    bioEn: 'I grow plantains and bananas on 15 hectares in the fertile Kumba region. Our volcanic soils produce particularly flavorful and nutritious fruits. Plantains are harvested at different stages of maturity according to your needs — green for chips, ripe for miondo.',
    farmSize: '15 hectares',
    certifications: [
      { id: 1, name: 'Agriculture Biologique', nameEn: 'Organic Agriculture', code: 'AB-2024-CMR-0056', verifiedDate: '10 Jan 2024' },
      { id: 2, name: 'Commerce Equitable', nameEn: 'Fair Trade', code: 'FLO-9034', verifiedDate: '5 Mar 2024' },
    ],
    products: [
      { id: 401, name: 'Plantains Murs', nameEn: 'Ripe Plantains', price: 300, unit: 'kg', image: '/product-plantain.jpg', category: 'fruits' },
      { id: 402, name: 'Plantains Verts', nameEn: 'Green Plantains', price: 250, unit: 'kg', image: '/product-plantain.jpg', category: 'fruits' },
      { id: 403, name: 'Bananes Pays', nameEn: 'Local Bananas', price: 200, unit: 'kg', image: '/product-plantain.jpg', category: 'fruits' },
    ],
    reviewsList: [
      { id: 1, author: 'Mamadou F.', rating: 5, date: '2024-05-14', comment: 'Meilleurs plantains de la region. Toujours a bonne maturite.' },
    ],
  },
  {
    id: 5,
    name: 'Samuel Eto\'o Fils',
    title: 'Producteur de Miel & Produits de la Ruche',
    titleEn: 'Honey & Bee Products Producer',
    location: 'Dschang, Region de l\'Ouest',
    region: 'Ouest',
    regionEn: 'West',
    latitude: 5.4437,
    longitude: 10.0536,
    category: 'honey',
    categoryLabel: 'Miel',
    categoryLabelEn: 'Honey',
    rating: 4.9,
    reviews: 63,
    sales: 198,
    memberSince: '2022',
    responseTime: '~2h',
    responseTimeEn: '~2h',
    avatar: '/farmer-portrait-1.jpg',
    coverImage: '/farmer-portrait-1.jpg',
    bio: 'Mes ruches sont installees dans les collines de Dschang, entourees de forets primaires et de champs de cafe. Mes abeilles butinent sur une grande diversite de fleurs, ce qui donne un miel aux aromes complexes et incomparables. Je pratique l\'apiculture traditionnelle respectueuse des abeilles, sans fumee ni stress.',
    bioEn: 'My hives are set up in the hills of Dschang, surrounded by primary forests and coffee fields. My bees forage on a wide variety of flowers, producing honey with complex and incomparable aromas. I practice traditional beekeeping that respects the bees, without smoke or stress.',
    farmSize: '5 hectares',
    certifications: [
      { id: 1, name: 'Miel Biologique', nameEn: 'Organic Honey', code: 'AB-MIEL-2024-008', verifiedDate: '25 Jan 2024' },
      { id: 2, name: 'Apiculture Durable', nameEn: 'Sustainable Beekeeping', code: 'APIC-CMR-2024-45', verifiedDate: '14 Fev 2024' },
    ],
    products: [
      { id: 501, name: 'Miel Sauvage Foret', nameEn: 'Wild Forest Honey', price: 3500, unit: 'kg', image: '/product-papaya.jpg', category: 'honey' },
      { id: 502, name: 'Miel de Cafeier', nameEn: 'Coffee Blossom Honey', price: 4000, unit: 'kg', image: '/product-papaya.jpg', category: 'honey' },
      { id: 503, name: 'Pollen d\'Abeille', nameEn: 'Bee Pollen', price: 5000, unit: 'kg', image: '/product-papaya.jpg', category: 'honey' },
    ],
    reviewsList: [
      { id: 1, author: 'Dr. Nkeng', rating: 5, date: '2024-05-16', comment: 'Miel exceptionnel, texture et gout incomparables. Mes patients adorent.' },
    ],
  },
  {
    id: 6,
    name: 'Florence Ngonde',
    title: 'Productrice de Cacao & Epices',
    titleEn: 'Cacao & Spices Producer',
    location: 'Ebolowa, Region du Sud',
    region: 'Sud',
    regionEn: 'South',
    latitude: 2.9167,
    longitude: 11.1500,
    category: 'cacao',
    categoryLabel: 'Cacao & Cafe',
    categoryLabelEn: 'Cacao & Coffee',
    rating: 4.7,
    reviews: 92,
    sales: 276,
    memberSince: '2021',
    responseTime: '~3h',
    responseTimeEn: '~3h',
    avatar: '/farmer-portrait-2.jpg',
    coverImage: '/farmer-portrait-2.jpg',
    bio: 'Dans la region du Sud, je cultive du cacao d\'exception aux cotes du poivre noir, du gingembre et du piment. Le climat equatorial d\'Ebolowa est parfait pour ces cultures. Je travaille avec un cooperative de 12 femmes productrices pour garantir des revenus equitables a toutes.',
    bioEn: 'In the South region, I grow exceptional cacao alongside black pepper, ginger, and chili. The equatorial climate of Ebolowa is perfect for these crops. I work with a cooperative of 12 women producers to ensure fair income for all.',
    farmSize: '10 hectares',
    certifications: [
      { id: 1, name: 'Agriculture Biologique', nameEn: 'Organic Agriculture', code: 'AB-2024-CMR-0078', verifiedDate: '5 Fev 2024' },
      { id: 2, name: 'Commerce Equitable Femmes', nameEn: 'Women Fair Trade', code: 'FLO-FEM-2024-12', verifiedDate: '8 Mar 2024' },
      { id: 3, name: 'GAP', nameEn: 'GAP', code: 'GAP-CMR-156', verifiedDate: '20 Avr 2024' },
    ],
    products: [
      { id: 601, name: 'Feves de Cacao Fermente', nameEn: 'Fermented Cacao Beans', price: 2800, unit: 'kg', image: '/product-cacao.jpg', category: 'cacao' },
      { id: 602, name: 'Poivre Noir de Penja', nameEn: 'Penja Black Pepper', price: 6000, unit: 'kg', image: '/product-cacao.jpg', category: 'spices' },
      { id: 603, name: 'Gingembre Frais', nameEn: 'Fresh Ginger', price: 1200, unit: 'kg', image: '/product-okra.jpg', category: 'spices' },
    ],
    reviewsList: [
      { id: 1, author: 'Chocolatier Amadou', rating: 5, date: '2024-05-19', comment: 'Cacao de tres haute qualite, fermentation impeccable. Mon chocolat prefere.' },
    ],
  },
  {
    id: 7,
    name: 'Robert Mbarga',
    title: 'Producteur de Cereales & Legumineuses',
    titleEn: 'Cereals & Legumes Producer',
    location: 'Maroua, Region de l\'Extreme-Nord',
    region: 'Extreme-Nord',
    regionEn: 'Far-North',
    latitude: 10.5910,
    longitude: 14.3240,
    category: 'cereals',
    categoryLabel: 'Cereales',
    categoryLabelEn: 'Cereals',
    rating: 4.5,
    reviews: 45,
    sales: 187,
    memberSince: '2023',
    responseTime: '~5h',
    responseTimeEn: '~5h',
    avatar: '/farmer-portrait-1.jpg',
    coverImage: '/farmer-portrait-1.jpg',
    bio: 'Dans les terres arides de l\'Extreme-Nord, je cultive du mil, du sorgho, du niebe et du arachide en utilisant des techniques agricoles intelligentes adaptees au climat Sahelien. Mon exploitation emploie 15 personnes du village et nous formons les jeunes aux techniques de culture en zone soudano-sahelienne.',
    bioEn: 'In the arid lands of the Far-North, I grow millet, sorghum, cowpeas, and peanuts using smart farming techniques adapted to the Sahelian climate. My farm employs 15 people from the village and we train youth in Sudanian-Sahelian farming techniques.',
    farmSize: '25 hectares',
    certifications: [
      { id: 1, name: 'Agriculture Durable Sahel', nameEn: 'Sahel Sustainable Agriculture', code: 'ADS-CMR-2024-23', verifiedDate: '12 Jan 2024' },
      { id: 2, name: 'GAP', nameEn: 'GAP', code: 'GAP-CMR-189', verifiedDate: '28 Fev 2024' },
    ],
    products: [
      { id: 701, name: 'Mil Blanc', nameEn: 'White Millet', price: 500, unit: 'kg', image: '/product-carrots.jpg', category: 'cereals' },
      { id: 702, name: 'Sorgho Rouge', nameEn: 'Red Sorghum', price: 450, unit: 'kg', image: '/product-carrots.jpg', category: 'cereals' },
      { id: 703, name: 'Haricot Niebe', nameEn: 'Cowpeas', price: 800, unit: 'kg', image: '/product-okra.jpg', category: 'cereals' },
    ],
    reviewsList: [
      { id: 1, author: 'Maimouna A.', rating: 5, date: '2024-05-10', comment: 'Tres bon mil, bien propre et bien sec. Livraison dans les delais.' },
    ],
  },
  {
    id: 8,
    name: 'Agnes Kotto',
    title: 'Productrice de Fruits Tropicaux',
    titleEn: 'Tropical Fruit Producer',
    location: 'Douala, Region du Littoral',
    region: 'Littoral',
    regionEn: 'Littoral',
    latitude: 4.0483,
    longitude: 9.7043,
    category: 'fruits',
    categoryLabel: 'Fruits & Legumes',
    categoryLabelEn: 'Fruits & Vegetables',
    rating: 4.8,
    reviews: 118,
    sales: 445,
    memberSince: '2020',
    responseTime: '~1h',
    responseTimeEn: '~1h',
    avatar: '/farmer-portrait-2.jpg',
    coverImage: '/farmer-portrait-2.jpg',
    bio: 'Mon verger tropical a la peripherie de Douala produit des papayes, mangues, ananas et avocats d\'exception. Le climat chaud et humide du Littoral est parfait pour nos fruits qui sont recoltes a pleine maturite, jamais verts. Je livre directement aux restaurants et hotels de Douala et Yaounde.',
    bioEn: 'My tropical orchard on the outskirts of Douala produces exceptional papayas, mangoes, pineapples, and avocados. The warm, humid climate of the Littoral is perfect for our fruits which are harvested at full maturity, never green. I deliver directly to restaurants and hotels in Douala and Yaounde.',
    farmSize: '18 hectares',
    certifications: [
      { id: 1, name: 'Agriculture Biologique', nameEn: 'Organic Agriculture', code: 'AB-2024-CMR-0091', verifiedDate: '15 Jan 2024' },
      { id: 2, name: 'Fruits Maturite garantie', nameEn: 'Tree-Ripened Guarantee', code: 'FMG-CMR-2024-34', verifiedDate: '2 Mar 2024' },
      { id: 3, name: 'GAP', nameEn: 'GAP', code: 'GAP-CMR-234', verifiedDate: '10 Avr 2024' },
    ],
    products: [
      { id: 801, name: 'Papayes Pays', nameEn: 'Local Papayas', price: 600, unit: 'piece', image: '/product-papaya.jpg', category: 'fruits' },
      { id: 802, name: 'Mangues Shelly', nameEn: 'Shelly Mangoes', price: 500, unit: 'kg', image: '/product-papaya.jpg', category: 'fruits' },
      { id: 803, name: 'Ananas Victoria', nameEn: 'Victoria Pineapples', price: 400, unit: 'piece', image: '/product-papaya.jpg', category: 'fruits' },
      { id: 804, name: 'Avocats Pays', nameEn: 'Local Avocados', price: 300, unit: 'piece', image: '/product-papaya.jpg', category: 'fruits' },
    ],
    reviewsList: [
      { id: 1, author: 'Hotel Sawa', rating: 5, date: '2024-05-21', comment: 'Fruits toujours impeccables, qualite hotel. Relation de confiance depuis 2 ans.' },
      { id: 2, author: 'Patricia M.', rating: 5, date: '2024-05-15', comment: 'Mangues sucrees et juteuses. Les meilleures de Douala!' },
    ],
  },
  {
    id: 9,
    name: 'Jacques Mballa',
    title: 'Producteur de Cafe de Specialite',
    titleEn: 'Specialty Coffee Producer',
    location: 'Bafoussam, Region de l\'Ouest',
    region: 'Ouest',
    regionEn: 'West',
    latitude: 5.1600,
    longitude: 10.5400,
    category: 'cacao',
    categoryLabel: 'Cacao & Cafe',
    categoryLabelEn: 'Cacao & Coffee',
    rating: 4.9,
    reviews: 56,
    sales: 167,
    memberSince: '2022',
    responseTime: '~2h',
    responseTimeEn: '~2h',
    avatar: '/farmer-portrait-1.jpg',
    coverImage: '/farmer-portrait-1.jpg',
    bio: 'Je produis un cafe de specialite Arabica a plus de 1500m d\'altitude sur les hauteurs de Bafoussam. Chaque lot est trace, numerote et torrefie sur mesure. Mon cafe a remporte le prix du meilleur cafe de l\'Ouest en 2023. Je travaille en direct avec des torrefacteurs de Douala et Yaounde.',
    bioEn: 'I produce specialty Arabica coffee at over 1500m altitude in the heights of Bafoussam. Each lot is traced, numbered, and custom-roasted. My coffee won the Best Coffee of the West award in 2023. I work directly with roasters in Douala and Yaounde.',
    farmSize: '6 hectares',
    certifications: [
      { id: 1, name: 'Cafe de Specialite', nameEn: 'Specialty Coffee', code: 'SCA-CMR-2024-12', verifiedDate: '18 Jan 2024' },
      { id: 2, name: 'Agriculture Biologique', nameEn: 'Organic Agriculture', code: 'AB-2024-CMR-0103', verifiedDate: '22 Fev 2024' },
      { id: 3, name: 'Commerce Equitable', nameEn: 'Fair Trade', code: 'FLO-9456', verifiedDate: '15 Mar 2024' },
    ],
    products: [
      { id: 901, name: 'Cafe Arabica Grade 1', nameEn: 'Arabica Grade 1 Coffee', price: 6000, unit: 'kg', image: '/product-coffee.jpg', category: 'cacao' },
      { id: 902, name: 'Cafe Micro-Lot 2024', nameEn: 'Micro-Lot Coffee 2024', price: 8500, unit: 'kg', image: '/product-coffee.jpg', category: 'cacao' },
    ],
    reviewsList: [
      { id: 1, author: 'Cafe Douala', rating: 5, date: '2024-05-17', comment: 'Cafe exceptionnel, notes florales et chocolat. Nos clients adorent.' },
    ],
  },
  {
    id: 10,
    name: 'Cecile Manga',
    title: 'Productrice de Volailles & Epices',
    titleEn: 'Poultry & Spices Producer',
    location: 'Bafang, Region de l\'Ouest',
    region: 'Ouest',
    regionEn: 'West',
    latitude: 5.1667,
    longitude: 10.1833,
    category: 'poultry',
    categoryLabel: 'Volailles',
    categoryLabelEn: 'Poultry',
    rating: 4.6,
    reviews: 67,
    sales: 234,
    memberSince: '2023',
    responseTime: '~3h',
    responseTimeEn: '~3h',
    avatar: '/farmer-portrait-2.jpg',
    coverImage: '/farmer-portrait-2.jpg',
    bio: 'Mon elevage de poules de race locale a Bafang produit des oeufs et de la viande de qualite superieure. En complement, je cultive du basilic, du persil et des oignons verts. Mes clients apprecient la fraicheur et la saveur authentique de mes produits.',
    bioEn: 'My local breed chicken farm in Bafang produces superior quality eggs and meat. In addition, I grow basil, parsley, and green onions. My customers appreciate the freshness and authentic flavor of my products.',
    farmSize: '4 hectares',
    certifications: [
      { id: 1, name: 'Volailles Race Locale', nameEn: 'Local Breed Poultry', code: 'VRL-CMR-2024-45', verifiedDate: '8 Jan 2024' },
      { id: 2, name: 'GAP', nameEn: 'GAP', code: 'GAP-CMR-267', verifiedDate: '25 Fev 2024' },
    ],
    products: [
      { id: 1001, name: 'Oeufs de Poule Locale', nameEn: 'Local Chicken Eggs', price: 1500, unit: 'plateau', image: '/product-eggs.jpg', category: 'poultry' },
      { id: 1002, name: 'Poulet Race Locale', nameEn: 'Local Breed Chicken', price: 6000, unit: 'piece', image: '/product-eggs.jpg', category: 'poultry' },
      { id: 1003, name: 'Basilic Frais', nameEn: 'Fresh Basil', price: 300, unit: 'botte', image: '/product-carrots.jpg', category: 'spices' },
    ],
    reviewsList: [
      { id: 1, author: 'Marie T.', rating: 5, date: '2024-05-12', comment: 'Oeufs et basilic frais a chaque fois. Qualite constante.' },
    ],
  },
  {
    id: 11,
    name: 'Philippe Nkom',
    title: 'Producteur de Riz & Legumineuses',
    titleEn: 'Rice & Legumes Producer',
    location: 'Yagoua, Region de l\'Extreme-Nord',
    region: 'Extreme-Nord',
    regionEn: 'Far-North',
    latitude: 10.3400,
    longitude: 15.2300,
    category: 'cereals',
    categoryLabel: 'Cereales',
    categoryLabelEn: 'Cereals',
    rating: 4.4,
    reviews: 38,
    sales: 156,
    memberSince: '2023',
    responseTime: '~6h',
    responseTimeEn: '~6h',
    avatar: '/farmer-portrait-1.jpg',
    coverImage: '/farmer-portrait-1.jpg',
    bio: 'Je cultive du riz irrigue dans les basses terres inondables de Yagoua, pres du Logone. Notre riz est de variete locale, tres parfume et apprecie dans toute la region. Nous utilisons des techniques de culture ameliorees transmises de generation en generation.',
    bioEn: 'I grow irrigated rice in the low-lying floodplains of Yagoua, near the Logone river. Our rice is a local variety, very fragrant and appreciated throughout the region. We use improved farming techniques passed down from generation to generation.',
    farmSize: '20 hectares',
    certifications: [
      { id: 1, name: 'Riz Local de Qualite', nameEn: 'Quality Local Rice', code: 'RLQ-CMR-2024-67', verifiedDate: '15 Jan 2024' },
      { id: 2, name: 'Agriculture Durable', nameEn: 'Sustainable Agriculture', code: 'AD-CMR-289', verifiedDate: '5 Mar 2024' },
    ],
    products: [
      { id: 1101, name: 'Riz Local Yagoua', nameEn: 'Yagoua Local Rice', price: 700, unit: 'kg', image: '/product-carrots.jpg', category: 'cereals' },
      { id: 1102, name: 'Riz Decortique', nameEn: 'Husked Rice', price: 850, unit: 'kg', image: '/product-carrots.jpg', category: 'cereals' },
    ],
    reviewsList: [
      { id: 1, author: 'Fatima A.', rating: 4, date: '2024-05-08', comment: 'Riz parfume et bien propre. Bon rapport qualite-prix.' },
    ],
  },
  {
    id: 12,
    name: 'Josephine Mbida',
    title: 'Productrice de Legumes & Epices',
    titleEn: 'Vegetables & Spices Producer',
    location: 'Mbalmayo, Region du Centre',
    region: 'Centre',
    regionEn: 'Centre',
    latitude: 3.5167,
    longitude: 11.5000,
    category: 'fruits',
    categoryLabel: 'Fruits & Legumes',
    categoryLabelEn: 'Fruits & Vegetables',
    rating: 4.7,
    reviews: 83,
    sales: 312,
    memberSince: '2021',
    responseTime: '~2h',
    responseTimeEn: '~2h',
    avatar: '/farmer-portrait-2.jpg',
    coverImage: '/farmer-portrait-2.jpg',
    bio: 'A Mbalmayo, je cultive une grande variete de legumes — aubergines, poivrons, oignons, et tomates — ainsi que des epices comme le basilic et le persil. Mon jardin nourrit plus de 50 familles de la region chaque semaine. Je crois en une agriculture proche des gens, qui preserve l\'environnement et cree du lien social.',
    bioEn: 'In Mbalmayo, I grow a wide variety of vegetables — eggplants, peppers, onions, and tomatoes — as well as herbs like basil and parsley. My garden feeds more than 50 families in the region every week. I believe in agriculture close to people, that preserves the environment and creates social bonds.',
    farmSize: '5 hectares',
    certifications: [
      { id: 1, name: 'Agriculture Biologique', nameEn: 'Organic Agriculture', code: 'AB-2024-CMR-0115', verifiedDate: '20 Jan 2024' },
      { id: 2, name: 'GAP', nameEn: 'GAP', code: 'GAP-CMR-312', verifiedDate: '15 Fev 2024' },
      { id: 3, name: 'Agriculture Urbaine Durable', nameEn: 'Sustainable Urban Agriculture', code: 'AUD-CMR-2024-78', verifiedDate: '5 Mar 2024' },
    ],
    products: [
      { id: 1201, name: 'Aubergines Fraiches', nameEn: 'Fresh Eggplants', price: 400, unit: 'kg', image: '/product-okra.jpg', category: 'fruits' },
      { id: 1202, name: 'Poivrons Mix', nameEn: 'Mixed Peppers', price: 600, unit: 'kg', image: '/product-tomatoes.jpg', category: 'fruits' },
      { id: 1203, name: 'Oignons Frais', nameEn: 'Fresh Onions', price: 500, unit: 'botte', image: '/product-carrots.jpg', category: 'fruits' },
    ],
    reviewsList: [
      { id: 1, author: 'Restaurant Mbalmayo', rating: 5, date: '2024-05-18', comment: 'Legumes frais livres chaque matin. Qualite parfaite pour nos plats.' },
    ],
  },
  {
    id: 13,
    name: 'Daniel Abena',
    title: 'Producteur de Cacao de Grand Cru',
    titleEn: 'Grand Cru Cacao Producer',
    location: 'Ambam, Region du Sud',
    region: 'Sud',
    regionEn: 'South',
    latitude: 2.3833,
    longitude: 11.2833,
    category: 'cacao',
    categoryLabel: 'Cacao & Cafe',
    categoryLabelEn: 'Cacao & Coffee',
    rating: 4.8,
    reviews: 41,
    sales: 134,
    memberSince: '2022',
    responseTime: '~3h',
    responseTimeEn: '~3h',
    avatar: '/farmer-portrait-1.jpg',
    coverImage: '/farmer-portrait-1.jpg',
    bio: 'A Ambam, pres de la frontiere equatoriale, je cultive des varietes de cacao Trinitario et Criollo parmi les plus recherchees au monde. Mon cacao est utilise par des chocolatiers artisanaux en Europe. Chaque feve est selectionnee a la main et fermente avec un soin meticuleux.',
    bioEn: 'In Ambam, near the equatorial border, I grow Trinitario and Criollo cacao varieties among the most sought-after in the world. My cacao is used by artisan chocolatiers in Europe. Each bean is hand-selected and fermented with meticulous care.',
    farmSize: '8 hectares',
    certifications: [
      { id: 1, name: 'Cacao Grand Cru', nameEn: 'Grand Cru Cacao', code: 'CGC-CMR-2024-08', verifiedDate: '10 Jan 2024' },
      { id: 2, name: 'Agriculture Biologique', nameEn: 'Organic Agriculture', code: 'AB-2024-CMR-0129', verifiedDate: '5 Fev 2024' },
      { id: 3, name: 'Commerce Equitable', nameEn: 'Fair Trade', code: 'FLO-9789', verifiedDate: '18 Mar 2024' },
    ],
    products: [
      { id: 1301, name: 'Cacao Trinitario', nameEn: 'Trinitario Cacao', price: 5000, unit: 'kg', image: '/product-cacao.jpg', category: 'cacao' },
      { id: 1302, name: 'Cacao Criollo', nameEn: 'Criollo Cacao', price: 7500, unit: 'kg', image: '/product-cacao.jpg', category: 'cacao' },
    ],
    reviewsList: [
      { id: 1, author: 'Chocolat Paris', rating: 5, date: '2024-05-15', comment: 'Cacao d\'exception, complexite aromatique incroyable.' },
    ],
  },
  {
    id: 14,
    name: 'Marguerite Eyenga',
    title: 'Productrice de Fruits de Mer & Legumes',
    titleEn: 'Coastal Vegetables & Fruits Producer',
    location: 'Limbe, Region du Sud-Ouest',
    region: 'Sud-Ouest',
    regionEn: 'South-West',
    latitude: 4.0242,
    longitude: 9.2147,
    category: 'fruits',
    categoryLabel: 'Fruits & Legumes',
    categoryLabelEn: 'Fruits & Vegetables',
    rating: 4.6,
    reviews: 52,
    sales: 198,
    memberSince: '2023',
    responseTime: '~2h',
    responseTimeEn: '~2h',
    avatar: '/farmer-portrait-2.jpg',
    coverImage: '/farmer-portrait-2.jpg',
    bio: 'Sur les flancs du Mont Cameroun, je cultive des legumes et fruits qui beneficient d\'un sol volcanique exceptionnellement riche. Mes tomates, poivrons et bananes plantain sont connus dans tout Limbe pour leur gout incomparable. Le climat frais de haute altitude est notre secret.',
    bioEn: 'On the slopes of Mount Cameroon, I grow vegetables and fruits that benefit from exceptionally rich volcanic soil. My tomatoes, peppers, and plantains are known throughout Limbe for their incomparable taste. The cool high-altitude climate is our secret.',
    farmSize: '7 hectares',
    certifications: [
      { id: 1, name: 'Sol Volcanique Biologique', nameEn: 'Organic Volcanic Soil', code: 'SVB-CMR-2024-34', verifiedDate: '15 Jan 2024' },
      { id: 2, name: 'GAP', nameEn: 'GAP', code: 'GAP-CMR-345', verifiedDate: '20 Fev 2024' },
    ],
    products: [
      { id: 1401, name: 'Tomates Mont Cameroun', nameEn: 'Mount Cameroon Tomatoes', price: 900, unit: 'kg', image: '/product-tomatoes.jpg', category: 'fruits' },
      { id: 1402, name: 'Poivrons Doux', nameEn: 'Sweet Peppers', price: 700, unit: 'kg', image: '/product-tomatoes.jpg', category: 'fruits' },
      { id: 1403, name: 'Plantains Volcaniques', nameEn: 'Volcanic Plantains', price: 350, unit: 'kg', image: '/product-plantain.jpg', category: 'fruits' },
    ],
    reviewsList: [
      { id: 1, author: 'Chef James', rating: 5, date: '2024-05-14', comment: 'Tomates avec un gout extraordinaire, vraiment different.' },
    ],
  },
  {
    id: 15,
    name: 'Thomas Nkoulou',
    title: 'Apiculteur & Producteur de Propolis',
    titleEn: 'Beekeeper & Propolis Producer',
    location: 'Oku, Region du Nord-Ouest',
    region: 'Nord-Ouest',
    regionEn: 'North-West',
    latitude: 6.2167,
    longitude: 10.5167,
    category: 'honey',
    categoryLabel: 'Miel',
    categoryLabelEn: 'Honey',
    rating: 4.9,
    reviews: 34,
    sales: 112,
    memberSince: '2022',
    responseTime: '~4h',
    responseTimeEn: '~4h',
    avatar: '/farmer-portrait-1.jpg',
    coverImage: '/farmer-portrait-1.jpg',
    bio: 'Dans les hauts plateaux de Oku, a plus de 2000m d\'altitude, mes abeilles butinent sur les fleurs sauvages de la savane guineenne. Le miel d\'Oku est mondialement connu pour sa qualite et ses proprietes medicinales. Je produis aussi de la propolis, du pollen et de la gellee royale.',
    bioEn: 'In the highlands of Oku, at over 2000m altitude, my bees forage on wild flowers of the Guinean savanna. Oku honey is world-renowned for its quality and medicinal properties. I also produce propolis, pollen, and royal jelly.',
    farmSize: '10 hectares',
    certifications: [
      { id: 1, name: 'Miel d\'Oku AOC', nameEn: 'Oku Honey AOC', code: 'AOC-MIEL-OKU-2024', verifiedDate: '5 Jan 2024' },
      { id: 2, name: 'Agriculture Biologique', nameEn: 'Organic Agriculture', code: 'AB-2024-CMR-0144', verifiedDate: '12 Fev 2024' },
      { id: 3, name: 'Apiculture Traditionnelle', nameEn: 'Traditional Beekeeping', code: 'APIC-TRAD-CMR-56', verifiedDate: '28 Mar 2024' },
    ],
    products: [
      { id: 1501, name: 'Miel d\'Oku Pur', nameEn: 'Pure Oku Honey', price: 5000, unit: 'kg', image: '/product-papaya.jpg', category: 'honey' },
      { id: 1502, name: 'Propolis Naturelle', nameEn: 'Natural Propolis', price: 8000, unit: 'kg', image: '/product-papaya.jpg', category: 'honey' },
      { id: 1503, name: 'Gelee Royale Fraiche', nameEn: 'Fresh Royal Jelly', price: 12000, unit: 'kg', image: '/product-papaya.jpg', category: 'honey' },
    ],
    reviewsList: [
      { id: 1, author: 'Pharmacie Centrale', rating: 5, date: '2024-05-10', comment: 'Miel d\'une purete exceptionnelle. Nos clients reviennent specialement pour lui.' },
    ],
  },
];

export function getProducerById(id: number): Producer | undefined {
  return producers.find((p) => p.id === id);
}

export function getProducersByCategory(category: Category): Producer[] {
  if (category === 'all') return producers;
  return producers.filter((p) => p.category === category);
}

export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}
