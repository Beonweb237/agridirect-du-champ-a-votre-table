// Mock data for the Producer Dashboard

export const revenueData = [
  { date: '16 Oct', revenue: 52000, orders: 3 },
  { date: '17 Oct', revenue: 78000, orders: 4 },
  { date: '18 Oct', revenue: 45000, orders: 2 },
  { date: '19 Oct', revenue: 91000, orders: 5 },
  { date: '20 Oct', revenue: 63000, orders: 3 },
  { date: '21 Oct', revenue: 112000, orders: 6 },
  { date: '22 Oct', revenue: 58000, orders: 3 },
  { date: '23 Oct', revenue: 87000, orders: 4 },
  { date: '24 Oct', revenue: 95000, orders: 5 },
  { date: '25 Oct', revenue: 42000, orders: 2 },
  { date: '26 Oct', revenue: 71000, orders: 4 },
  { date: '27 Oct', revenue: 105000, orders: 6 },
  { date: '28 Oct', revenue: 67000, orders: 3 },
  { date: '29 Oct', revenue: 89000, orders: 5 },
  { date: '30 Oct', revenue: 74000, orders: 4 },
  { date: '31 Oct', revenue: 56000, orders: 3 },
  { date: '01 Nov', revenue: 98000, orders: 5 },
  { date: '02 Nov', revenue: 125000, orders: 7 },
  { date: '03 Nov', revenue: 81000, orders: 4 },
  { date: '04 Nov', revenue: 67000, orders: 3 },
  { date: '05 Nov', revenue: 93000, orders: 5 },
  { date: '06 Nov', revenue: 118000, orders: 6 },
  { date: '07 Nov', revenue: 72000, orders: 4 },
  { date: '08 Nov', revenue: 85000, orders: 4 },
  { date: '09 Nov', revenue: 132000, orders: 8 },
  { date: '10 Nov', revenue: 76000, orders: 4 },
  { date: '11 Nov', revenue: 64000, orders: 3 },
  { date: '12 Nov', revenue: 145000, orders: 8 },
  { date: '13 Nov', revenue: 89000, orders: 5 },
  { date: '14 Nov', revenue: 110000, orders: 6 },
  { date: '15 Nov', revenue: 68000, orders: 4 },
];

export const sparklineRevenue = [
  42000, 45000, 52000, 48000, 61000, 58000, 72000,
  68000, 75000, 82000, 78000, 91000, 88000, 95000,
  102000, 98000, 112000, 105000, 118000, 125000,
  132000, 128000, 135000, 142000, 138000, 145000,
  152000, 148000, 155000, 162000,
];

export const sparklineOrders = [2, 3, 2, 4, 3, 5, 4, 3, 4, 5, 4, 6, 5, 4, 6, 5, 7, 6, 5, 7, 8, 6, 7, 8, 7, 9, 8, 7, 9, 8];

export interface KPICard {
  title: string;
  titleEn: string;
  value: string;
  change: string;
  changeEn: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  sparkline?: number[];
}

export const kpiCards: KPICard[] = [
  {
    title: 'Revenus (30j)',
    titleEn: 'Revenue (30d)',
    value: '2,450,000 FCFA',
    change: '+23% vs mois dernier',
    changeEn: '+23% vs last month',
    icon: 'trendingUp',
    iconBg: 'bg-leaf-light',
    iconColor: 'text-leaf',
    sparkline: sparklineRevenue,
  },
  {
    title: 'Commandes (30j)',
    titleEn: 'Orders (30d)',
    value: '48',
    change: '+8 vs mois dernier',
    changeEn: '+8 vs last month',
    icon: 'package',
    iconBg: 'bg-sky-light',
    iconColor: 'text-sky',
    sparkline: sparklineOrders,
  },
  {
    title: 'Nouveaux Clients (30j)',
    titleEn: 'New Customers (30d)',
    value: '17',
    change: '+5 vs mois dernier',
    changeEn: '+5 vs last month',
    icon: 'users',
    iconBg: 'bg-sun-light',
    iconColor: 'text-sun',
  },
  {
    title: 'Note Moyenne',
    titleEn: 'Average Rating',
    value: '4.8',
    change: 'Basé sur 127 avis',
    changeEn: 'Based on 127 reviews',
    icon: 'star',
    iconBg: 'bg-terracotta-light',
    iconColor: 'text-terracotta',
  },
];

export interface Order {
  id: string;
  client: string;
  clientEn: string;
  products: string;
  productsEn: string;
  total: string;
  status: 'delivered' | 'in-progress' | 'preparing' | 'pending-payment';
  date: string;
}

export const recentOrders: Order[] = [
  {
    id: '#AGRI-240315-00847',
    client: 'Marie D.',
    clientEn: 'Marie D.',
    products: 'Feves Cacao x2',
    productsEn: 'Cacao Beans x2',
    total: '7,000 FCFA',
    status: 'delivered',
    date: '15 Nov',
  },
  {
    id: '#AGRI-240315-00846',
    client: 'Resto Le Jardin',
    clientEn: 'Resto Le Jardin',
    products: 'Cafe x1, Cacao x3',
    productsEn: 'Coffee x1, Cacao x3',
    total: '16,800 FCFA',
    status: 'in-progress',
    date: '14 Nov',
  },
  {
    id: '#AGRI-240315-00845',
    client: 'Paul K.',
    clientEn: 'Paul K.',
    products: 'Papaye x5',
    productsEn: 'Papaya x5',
    total: '6,000 FCFA',
    status: 'preparing',
    date: '14 Nov',
  },
  {
    id: '#AGRI-240315-00844',
    client: 'Supermarche Etoile',
    clientEn: 'Supermarket Etoile',
    products: 'Oeufs x10, Poulet x5',
    productsEn: 'Eggs x10, Chicken x5',
    total: '32,500 FCFA',
    status: 'delivered',
    date: '13 Nov',
  },
  {
    id: '#AGRI-240315-00843',
    client: 'Aminata F.',
    clientEn: 'Aminata F.',
    products: 'Plantain x3',
    productsEn: 'Plantain x3',
    total: '1,500 FCFA',
    status: 'pending-payment',
    date: '12 Nov',
  },
  {
    id: '#AGRI-240315-00842',
    client: 'Hotel Mont Febe',
    clientEn: 'Hotel Mont Febe',
    products: 'Cafe x5, Cacao x2',
    productsEn: 'Coffee x5, Cacao x2',
    total: '24,500 FCFA',
    status: 'delivered',
    date: '11 Nov',
  },
];

export const statusConfig = {
  delivered: {
    label: 'Livree',
    labelEn: 'Delivered',
    bg: 'bg-leaf-light',
    text: 'text-leaf-dark',
    dot: 'bg-leaf',
  },
  'in-progress': {
    label: 'En Cours',
    labelEn: 'In Progress',
    bg: 'bg-sky-light',
    text: 'text-sky',
    dot: 'bg-sky',
  },
  preparing: {
    label: 'En Preparation',
    labelEn: 'Preparing',
    bg: 'bg-sun-light',
    text: 'text-sun',
    dot: 'bg-sun',
  },
  'pending-payment': {
    label: 'En Attente Paiement',
    labelEn: 'Pending Payment',
    bg: 'bg-terracotta-light',
    text: 'text-terracotta',
    dot: 'bg-terracotta',
  },
};

export interface InventoryItem {
  id: string;
  name: string;
  nameEn: string;
  stock: number;
  maxStock: number;
  sales30d: number;
  image: string;
}

export const inventory: InventoryItem[] = [
  { id: '1', name: 'Feves de Cacao', nameEn: 'Cacao Beans', stock: 38, maxStock: 50, sales30d: 12, image: '/images/product-cacao.jpg' },
  { id: '2', name: 'Cafe Arabica', nameEn: 'Arabica Coffee', stock: 18, maxStock: 30, sales30d: 8, image: '/images/product-coffee.jpg' },
  { id: '3', name: 'Oeufs Fermiers', nameEn: 'Farm Eggs', stock: 89, maxStock: 100, sales30d: 22, image: '/images/product-eggs.jpg' },
  { id: '4', name: 'Plantains', nameEn: 'Plantains', stock: 8, maxStock: 25, sales30d: 6, image: '/images/product-plantain.jpg' },
  { id: '5', name: 'Tomates Vigne', nameEn: 'Vine Tomatoes', stock: 42, maxStock: 60, sales30d: 15, image: '/images/product-tomatoes.jpg' },
  { id: '6', name: 'Papayes Pays', nameEn: 'Local Papayas', stock: 2, maxStock: 20, sales30d: 10, image: '/images/product-papaya.jpg' },
  { id: '7', name: 'Gombos Frais', nameEn: 'Fresh Okra', stock: 15, maxStock: 40, sales30d: 5, image: '/images/product-okra.jpg' },
  { id: '8', name: 'Carottes Bio', nameEn: 'Organic Carrots', stock: 35, maxStock: 45, sales30d: 9, image: '/images/product-carrots.jpg' },
];

export interface StockAlert {
  id: string;
  productName: string;
  productNameEn: string;
  severity: 'warning' | 'critical';
  message: string;
  messageEn: string;
  current: number;
  max: number;
}

export const stockAlerts: StockAlert[] = [
  {
    id: '1',
    productName: 'Plantains',
    productNameEn: 'Plantains',
    severity: 'warning',
    message: "Stock bas (8/25). Pensez a reapprovisionner.",
    messageEn: 'Low stock (8/25). Consider restocking.',
    current: 8,
    max: 25,
  },
  {
    id: '2',
    productName: 'Papayes Pays',
    productNameEn: 'Local Papayas',
    severity: 'critical',
    message: "Rupture imminente (2/20). Stock epuise dans ~2 jours.",
    messageEn: 'Nearly out (2/20). Stock depleted in ~2 days.',
    current: 2,
    max: 20,
  },
  {
    id: '3',
    productName: 'Gombos Frais',
    productNameEn: 'Fresh Okra',
    severity: 'warning',
    message: "Stock bas (15/40). Reapprovisionnement conseille.",
    messageEn: 'Low stock (15/40). Restocking advised.',
    current: 15,
    max: 40,
  },
];

export interface CustomerType {
  name: string;
  nameEn: string;
  value: number;
  color: string;
}

export const customerTypes: CustomerType[] = [
  { name: 'Restaurants', nameEn: 'Restaurants', value: 45, color: '#C75B2A' },
  { name: 'Menages', nameEn: 'Households', value: 30, color: '#4A7C3F' },
  { name: 'Supermarches', nameEn: 'Supermarkets', value: 20, color: '#4A8FBF' },
  { name: 'Autres', nameEn: 'Others', value: 5, color: '#BDB8B2' },
];

export interface TopCustomer {
  id: string;
  name: string;
  nameEn: string;
  avatar: string;
  totalSpent: string;
  orderCount: number;
}

export const topCustomers: TopCustomer[] = [
  { id: '1', name: 'Restaurant Le Jardin', nameEn: 'Restaurant Le Jardin', avatar: 'RL', totalSpent: '485,000 FCFA', orderCount: 12 },
  { id: '2', name: 'Supermarche Etoile', nameEn: 'Supermarket Etoile', avatar: 'SE', totalSpent: '320,000 FCFA', orderCount: 8 },
  { id: '3', name: 'Marie D.', nameEn: 'Marie D.', avatar: 'MD', totalSpent: '85,000 FCFA', orderCount: 6 },
  { id: '4', name: 'Paul K.', nameEn: 'Paul K.', avatar: 'PK', totalSpent: '62,000 FCFA', orderCount: 5 },
  { id: '5', name: 'Hotel Mont Febe', nameEn: 'Hotel Mont Febe', avatar: 'HF', totalSpent: '58,000 FCFA', orderCount: 4 },
];

export const orderFilterTabs = [
  { key: 'all', label: 'Tout', labelEn: 'All' },
  { key: 'in-progress', label: 'En Cours', labelEn: 'In Progress' },
  { key: 'delivered', label: 'Livree', labelEn: 'Delivered' },
  { key: 'pending', label: 'En Attente', labelEn: 'Pending' },
];
