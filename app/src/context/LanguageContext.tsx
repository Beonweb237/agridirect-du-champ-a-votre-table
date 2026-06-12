import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type Lang = 'fr' | 'en';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string | Record<string, string>;
}

const translations: Record<Lang, Record<string, string | Record<string, string>>> = {
  fr: {
    // Navbar
    'nav.marketplace': 'Marche',
    'nav.producers': 'Producteurs',
    'nav.map': 'Carte',
    'nav.dashboard': 'Tableau de Bord',
    'nav.about': 'A Propos',
    'nav.chat': 'Chat',
    'nav.login': 'Connexion',
    'nav.searchPlaceholder': 'Rechercher cacao, tomates, poulet ferme...',

    // Hero
    'home.hero.overline': 'MARCHE AGRICOLE DIRECT',
    'home.hero.title': 'Du Champ a Votre Table, Sans Intermediaire',
    'home.hero.subtitle': 'Achetez cacao, cafe, fruits, legumes et volailles en direct des producteurs camerounais. Frais, tracables, equitable.',
    'home.hero.ctaPrimary': 'Explorer le Marche',
    'home.hero.ctaSecondary': 'Devenir Producteur',
    'home.hero.searchPlaceholder': 'Rechercher cacao, tomates, poulet ferme...',
    'home.hero.scrollLabel': 'Defiler pour decouvrir',

    // Trust Bar
    'home.trust.payment': 'Paiement Securise MoMo & Orange Money',
    'home.trust.delivery': 'Livraison Partout au Cameroun',
    'home.trust.traceability': 'Tracabilite Complete par QR',
    'home.trust.verified': 'Producteurs Certifies & Verifies',

    // Categories
    'home.categories.overline': 'CATEGORIES',
    'home.categories.title': 'Trouvez Vos Produits Frais',
    'home.categories.subtitle': 'Parcourez nos categories par type de produit et trouvez exactement ce qu\'il vous faut.',
    'home.categories.cacao': 'Cacao & Cafe',
    'home.categories.fruits': 'Fruits & Legumes',
    'home.categories.poultry': 'Volailles & Oeufs',
    'home.categories.cereals': 'Cereales & Legumineuses',
    'home.categories.honey': 'Miel & Produits Naturels',
    'home.categories.spices': 'Plantes & Epices',
    'home.categories.producers': 'producteurs',

    // Seasonal Banner
    'home.seasonal.badge': 'EN SAISON',
    'home.seasonal.title': 'C\'est la Saison des Mangues !',
    'home.seasonal.text': 'Profitez des meilleures mangues du Cameroun, recoltees a maturite par nos producteurs de la region du Littoral. Prix direct producteur jusqu\'a 30% moins cher.',
    'home.seasonal.cta': 'Voir les Offres',

    // Featured Products
    'home.products.overline': 'PRODUITS POPULAIRES',
    'home.products.title': 'Les Favoris du Moment',
    'home.products.seeAll': 'Voir Tout',
    'home.products.seasonal': 'En Saison',
    'home.products.organic': 'Bio',
    'home.products.unit.kg': 'FCFA/kg',
    'home.products.unit.botte': 'FCFA/botte',
    'home.products.unit.piece': 'FCFA/piece',
    'home.products.unit.plateau': 'FCFA/plateau',

    // Product names
    'product.cacao': 'Feves de Cacao Premium',
    'product.coffee': 'Cafe Arabica Torrefie',
    'product.plantain': 'Plantains Murs',
    'product.tomatoes': 'Tomates Vigne',
    'product.okra': 'Gombos Frais',
    'product.papaya': 'Papayes Pays',
    'product.eggs': 'Oeufs Fermiers',
    'product.carrots': 'Carottes Bio',

    // Producer Spotlight
    'home.producers.overline': 'NOS PRODUCTEURS',
    'home.producers.title': 'Rencontrez Ceux Qui Nourrissent le Cameroun',
    'home.producers.subtitle': 'Chaque produit sur AgriDirect vient d\'un producteur verifie, passionne par son terroir.',
    'home.producers.seeProfile': 'Voir Profil',
    'home.producers.reviews': 'avis',

    // Producer names & quotes
    'producer.1.name': 'Jean-Pierre Ndongo',
    'producer.1.location': 'Bafoussam, Ouest',
    'producer.1.specialty': 'Cacao,Cafe',
    'producer.1.rating': '4.8',
    'producer.1.reviews': '124',
    'producer.1.quote': 'J\'ai plante mes premiers cacaoyers avec mon pere il y a plus de 30 ans. Aujourd\'hui, je partage cette passion avec vous.',

    'producer.2.name': 'Marie-Claire Fotso',
    'producer.2.location': 'Yaounde, Centre',
    'producer.2.specialty': 'Volailles,Oeufs',
    'producer.2.rating': '4.9',
    'producer.2.reviews': '89',
    'producer.2.quote': 'Mes poules sont elevees en liberte, avec des aliments 100% naturels. La qualite commence par le bien-etre animal.',

    'producer.3.name': 'Emmanuel Tchamba',
    'producer.3.location': 'Nkolfoulou, Centre',
    'producer.3.specialty': 'Legumes Bio',
    'producer.3.rating': '4.7',
    'producer.3.reviews': '156',
    'producer.3.quote': 'L\'agriculture biologique n\'est pas une mode, c\'est un retour aux sources. Nos legumes poussent comme la nature l\'intend.',

    // How It Works
    'home.how.overline': 'COMMENT CA MARCHE',
    'home.how.title': 'Simple comme une Recolte',
    'home.how.step1.title': 'Recherchez',
    'home.how.step1.desc': 'Parcourez notre catalogue par categorie, region ou prix. Trouvez cacao, fruits, legumes, volailles et plus.',
    'home.how.step2.title': 'Commandez',
    'home.how.step2.desc': 'Ajoutez au panier, payez en toute securite via MTN MoMo ou Orange Money. Votre argent est protege en escrow.',
    'home.how.step3.title': 'Recevez',
    'home.how.step3.desc': 'Nos partenaires transporteurs livrent vos produits frais a votre porte dans les 24-48h selon votre region.',
    'home.how.step4.title': 'Tracez',
    'home.how.step4.desc': 'Scannez le QR code sur votre colis pour voir l\'origine exacte, la date de recolte et les certifications bio.',

    // Stats
    'home.stats.producers': 'Producteurs Verifies',
    'home.stats.orders': 'Commandes Livrees',
    'home.stats.revenue': 'Revenus aux Producteurs',
    'home.stats.rating': 'Note Moyenne',

    // CTA Banner
    'home.cta.title': 'Pret a Gouter la Difference ?',
    'home.cta.subtitle': 'Rejoignez des milliers d\'acheteurs qui soutiennent directement les producteurs camerounais.',
    'home.cta.primary': 'Commencer a Acheter',
    'home.cta.secondary': 'Devenir Producteur',

    // Footer
    'footer.tagline': 'Le premier marketplace agricole du Cameroun. Du producteur a votre table, sans intermediaire.',
    'footer.products.title': 'Categories',
    'footer.company.title': 'AgriDirect',
    'footer.support.title': 'Aide',
    'footer.newsletter.title': 'Restez Informe',
    'footer.newsletter.placeholder': 'Votre email',
    'footer.newsletter.button': 'S\'abonner',
    'footer.copyright': '© 2024 AgriDirect. Tous droits reserves.',

    // Footer links
    'footer.link.about': 'A Propos',
    'footer.link.how': 'Comment Ca Marche',
    'footer.link.producers': 'Nos Producteurs',
    'footer.link.blog': 'Blog',
    'footer.link.careers': 'Carrieres',
    'footer.link.help': 'Centre d\'Aide',
    'footer.link.contact': 'Contact',
    'footer.link.terms': 'Conditions d\'Utilisation',
    'footer.link.privacy': 'Politique de Confidentialite',
    'footer.link.driver': 'Devenir Livreur',

    // Bottom Nav
    'bottomnav.home': 'Accueil',
    'bottomnav.market': 'Marche',
    'bottomnav.map': 'Carte',
    'bottomnav.cart': 'Panier',
    'bottomnav.profile': 'Profil',

    // Cart
    'cart.title': 'Mon Panier',
    'cart.empty.title': 'Votre Panier est Vide',
    'cart.empty.subtitle': 'Decouvrez nos produits frais des producteurs camerounais.',
    'cart.empty.cta': 'Explorer le Marche',
    'cart.continue': 'Continuer les Achats',
    'cart.clear': 'Vider le Panier',
    'cart.clearConfirm': 'Voulez-vous vraiment vider votre panier ?',
    'cart.remove': 'Supprimer',
    'cart.item.unit': 'FCFA',
    'cart.subtotal': 'Sous-total',
    'cart.delivery': 'Livraison',
    'cart.delivery.calculate': 'A calculer',
    'cart.escrow': 'Protection Escrow AgriDirect',
    'cart.escrow.tooltip': 'Votre argent est securise jusqu\'a la reception de votre commande.',
    'cart.total': 'Total',
    'cart.checkout': 'Passer la Commande',
    'cart.items.count': 'articles',
    'cart.item': 'article',
    'cart.trust.secure': 'Paiement Securise',
    'cart.trust.escrow': 'Escrow Protege',
    'cart.trust.tracking': 'Livraison Tracee',
    'checkout.step.delivery': 'Livraison',
    'checkout.step.payment': 'Paiement',
    'checkout.step.confirmation': 'Confirmation',
    'delivery.title': 'Informations de Livraison',
    'delivery.subtitle': 'Ou souhaitez-vous recevoir votre commande ?',
    'delivery.name': 'Prenom et Nom',
    'delivery.name.placeholder': 'Prenom et Nom',
    'delivery.phone': 'Telephone',
    'delivery.phone.placeholder': '+237 6XX XXX XXX',
    'delivery.address': 'Adresse de Livraison',
    'delivery.address.placeholder': 'Quartier, Rue, Point de repere...',
    'delivery.city': 'Ville',
    'delivery.city.placeholder': 'Selectionnez une ville',
    'delivery.type': 'Mode de Livraison',
    'delivery.notes': 'Instructions (optionnel)',
    'delivery.notes.placeholder': 'Instructions pour le livreur (code porte, etage, etc.)',
    'delivery.cta': 'Continuer vers le Paiement',
    'delivery.savedAddresses': 'Adresses enregistrees',
    'delivery.useGps': 'Utiliser ma Position',
    'payment.title': 'Paiement Securise',
    'payment.escrow.title': 'Votre paiement est protege par notre systeme Escrow',
    'payment.escrow.subtitle': 'L\'argent reste securise jusqu\'a ce que vous confirmiez la reception.',
    'payment.recap': 'Resume de la commande',
    'payment.momo': 'MTN Mobile Money',
    'payment.momo.desc': 'Paiement instantane via votre compte MTN MoMo',
    'payment.momo.number': 'Numero MTN MoMo',
    'payment.momo.placeholder': '6XX XXX XXX',
    'payment.orange': 'Orange Money',
    'payment.orange.desc': 'Paiement securise via votre compte Orange Money',
    'payment.orange.number': 'Numero Orange Money',
    'payment.orange.placeholder': '6XX XXX XXX',
    'payment.cta': 'Payer',
    'payment.processing': 'Traitement en cours...',
    'payment.modal.title': 'Veuillez valider le paiement sur votre telephone',
    'payment.modal.desc': 'Un popup de confirmation devrait apparaitre sur votre telephone. Veuillez entrer votre code PIN MoMo/Orange Money pour confirmer.',
    'payment.modal.cancel': 'Annuler',
    'payment.escrow.flow.you': 'Vous',
    'payment.escrow.flow.escrow': 'Escrow AgriDirect',
    'payment.escrow.flow.producer': 'Producteur',
    'payment.escrow.secured': 'securises en escrow',
    'payment.escrow.info': 'Le producteur sera paye apres votre confirmation de reception.',
    'confirm.title': 'Commande Confirmee !',
    'confirm.order': 'Commande',
    'confirm.message': 'Votre paiement de {total} FCFA a ete securise en escrow. Le producteur prepare votre commande.',
    'confirm.summary.title': 'Resume de la Commande',
    'confirm.delivery': 'Livraison',
    'confirm.payment': 'Methode de paiement',
    'confirm.step1': 'En Preparation',
    'confirm.step1.desc': 'Le producteur prepare vos articles',
    'confirm.step2': 'En Livraison',
    'confirm.step2.desc': 'Suivi en temps reel disponible',
    'confirm.step3': 'Livre',
    'confirm.step3.desc': 'Confirmez la reception pour liberer le paiement',
    'confirm.track': 'Suivre ma Commande',
    'confirm.shop': 'Continuer les Achats',
    'confirm.invoice': 'Telecharger la Facture',
    'confirm.estimated': 'Livraison estimee',
    'validation.required': 'Ce champ est obligatoire',
    'validation.phone': 'Numero de telephone invalide',
  },
  en: {
    // Navbar
    'nav.marketplace': 'Marketplace',
    'nav.producers': 'Producers',
    'nav.map': 'Map',
    'nav.dashboard': 'Dashboard',
    'nav.about': 'About',
    'nav.chat': 'Chat',
    'nav.login': 'Login',
    'nav.searchPlaceholder': 'Search cacao, tomatoes, farm chicken...',

    // Hero
    'home.hero.overline': 'DIRECT AGRICULTURAL MARKET',
    'home.hero.title': 'From Farm to Your Table, No Middleman',
    'home.hero.subtitle': 'Buy cacao, coffee, fruits, vegetables and poultry directly from Cameroonian producers. Fresh, traceable, fair.',
    'home.hero.ctaPrimary': 'Explore Marketplace',
    'home.hero.ctaSecondary': 'Become a Producer',
    'home.hero.searchPlaceholder': 'Search cacao, tomatoes, farm chicken...',
    'home.hero.scrollLabel': 'Scroll to discover',

    // Trust Bar
    'home.trust.payment': 'Secure Payment MoMo & Orange Money',
    'home.trust.delivery': 'Delivery Nationwide in Cameroon',
    'home.trust.traceability': 'Full Traceability by QR Code',
    'home.trust.verified': 'Certified & Verified Producers',

    // Categories
    'home.categories.overline': 'CATEGORIES',
    'home.categories.title': 'Find Your Fresh Products',
    'home.categories.subtitle': 'Browse our categories by product type and find exactly what you need.',
    'home.categories.cacao': 'Cacao & Coffee',
    'home.categories.fruits': 'Fruits & Vegetables',
    'home.categories.poultry': 'Poultry & Eggs',
    'home.categories.cereals': 'Cereals & Legumes',
    'home.categories.honey': 'Honey & Natural Products',
    'home.categories.spices': 'Plants & Spices',
    'home.categories.producers': 'producers',

    // Seasonal Banner
    'home.seasonal.badge': 'IN SEASON',
    'home.seasonal.title': 'It\'s Mango Season!',
    'home.seasonal.text': 'Enjoy the best mangoes from Cameroon, harvested at maturity by our producers from the Littoral region. Direct producer prices up to 30% cheaper.',
    'home.seasonal.cta': 'See Offers',

    // Featured Products
    'home.products.overline': 'POPULAR PRODUCTS',
    'home.products.title': 'Current Favorites',
    'home.products.seeAll': 'See All',
    'home.products.seasonal': 'In Season',
    'home.products.organic': 'Organic',
    'home.products.unit.kg': 'FCFA/kg',
    'home.products.unit.botte': 'FCFA/bunch',
    'home.products.unit.piece': 'FCFA/piece',
    'home.products.unit.plateau': 'FCFA/tray',

    // Product names
    'product.cacao': 'Premium Cacao Beans',
    'product.coffee': 'Roasted Arabica Coffee',
    'product.plantain': 'Ripe Plantains',
    'product.tomatoes': 'Vine Tomatoes',
    'product.okra': 'Fresh Okra',
    'product.papaya': 'Local Papayas',
    'product.eggs': 'Farm Eggs',
    'product.carrots': 'Organic Carrots',

    // Producer Spotlight
    'home.producers.overline': 'OUR PRODUCERS',
    'home.producers.title': 'Meet Those Who Feed Cameroon',
    'home.producers.subtitle': 'Every product on AgriDirect comes from a verified producer, passionate about their land.',
    'home.producers.seeProfile': 'See Profile',
    'home.producers.reviews': 'reviews',

    // Producer names & quotes
    'producer.1.name': 'Jean-Pierre Ndongo',
    'producer.1.location': 'Bafoussam, West',
    'producer.1.specialty': 'Cacao,Coffee',
    'producer.1.rating': '4.8',
    'producer.1.reviews': '124',
    'producer.1.quote': 'I planted my first cacao trees with my father over 30 years ago. Today, I share this passion with you.',

    'producer.2.name': 'Marie-Claire Fotso',
    'producer.2.location': 'Yaounde, Centre',
    'producer.2.specialty': 'Poultry,Eggs',
    'producer.2.rating': '4.9',
    'producer.2.reviews': '89',
    'producer.2.quote': 'My hens are free-range, fed 100% natural food. Quality starts with animal welfare.',

    'producer.3.name': 'Emmanuel Tchamba',
    'producer.3.location': 'Nkolfoulou, Centre',
    'producer.3.specialty': 'Organic Vegetables',
    'producer.3.rating': '4.7',
    'producer.3.reviews': '156',
    'producer.3.quote': 'Organic farming is not a trend, it\'s a return to our roots. Our vegetables grow as nature intended.',

    // How It Works
    'home.how.overline': 'HOW IT WORKS',
    'home.how.title': 'Simple as a Harvest',
    'home.how.step1.title': 'Search',
    'home.how.step1.desc': 'Browse our catalog by category, region or price. Find cacao, fruits, vegetables, poultry and more.',
    'home.how.step2.title': 'Order',
    'home.how.step2.desc': 'Add to cart, pay securely via MTN MoMo or Orange Money. Your money is protected in escrow.',
    'home.how.step3.title': 'Receive',
    'home.how.step3.desc': 'Our transport partners deliver fresh products to your door within 24-48h depending on your region.',
    'home.how.step4.title': 'Trace',
    'home.how.step4.desc': 'Scan the QR code on your package to see the exact origin, harvest date and organic certifications.',

    // Stats
    'home.stats.producers': 'Verified Producers',
    'home.stats.orders': 'Orders Delivered',
    'home.stats.revenue': 'Revenue to Producers',
    'home.stats.rating': 'Average Rating',

    // CTA Banner
    'home.cta.title': 'Ready to Taste the Difference?',
    'home.cta.subtitle': 'Join thousands of buyers who directly support Cameroonian producers.',
    'home.cta.primary': 'Start Buying',
    'home.cta.secondary': 'Become a Producer',

    // Footer
    'footer.tagline': 'Cameroon\'s first agricultural marketplace. From producer to your table, with no middleman.',
    'footer.products.title': 'Categories',
    'footer.company.title': 'AgriDirect',
    'footer.support.title': 'Help',
    'footer.newsletter.title': 'Stay Informed',
    'footer.newsletter.placeholder': 'Your email',
    'footer.newsletter.button': 'Subscribe',
    'footer.copyright': '© 2024 AgriDirect. All rights reserved.',

    // Footer links
    'footer.link.about': 'About',
    'footer.link.how': 'How It Works',
    'footer.link.producers': 'Our Producers',
    'footer.link.blog': 'Blog',
    'footer.link.careers': 'Careers',
    'footer.link.help': 'Help Center',
    'footer.link.contact': 'Contact',
    'footer.link.terms': 'Terms of Use',
    'footer.link.privacy': 'Privacy Policy',
    'footer.link.driver': 'Become a Driver',

    // Bottom Nav
    'bottomnav.home': 'Home',
    'bottomnav.market': 'Market',
    'bottomnav.map': 'Map',
    'bottomnav.cart': 'Cart',
    'bottomnav.profile': 'Profile',

    // Cart
    'cart.title': 'My Cart',
    'cart.empty.title': 'Your Cart is Empty',
    'cart.empty.subtitle': 'Discover fresh products from Cameroonian producers.',
    'cart.empty.cta': 'Explore Marketplace',
    'cart.continue': 'Continue Shopping',
    'cart.clear': 'Clear Cart',
    'cart.clearConfirm': 'Are you sure you want to clear your cart?',
    'cart.remove': 'Remove',
    'cart.item.unit': 'FCFA',
    'cart.subtotal': 'Subtotal',
    'cart.delivery': 'Delivery',
    'cart.delivery.calculate': 'To be calculated',
    'cart.escrow': 'AgriDirect Escrow Protection',
    'cart.escrow.tooltip': 'Your money is secured until you receive your order.',
    'cart.total': 'Total',
    'cart.checkout': 'Place Order',
    'cart.items.count': 'items',
    'cart.item': 'item',
    'cart.trust.secure': 'Secure Payment',
    'cart.trust.escrow': 'Escrow Protected',
    'cart.trust.tracking': 'Tracked Delivery',
    'checkout.step.delivery': 'Delivery',
    'checkout.step.payment': 'Payment',
    'checkout.step.confirmation': 'Confirmation',
    'delivery.title': 'Delivery Information',
    'delivery.subtitle': 'Where would you like to receive your order?',
    'delivery.name': 'Full Name',
    'delivery.name.placeholder': 'First and Last Name',
    'delivery.phone': 'Phone Number',
    'delivery.phone.placeholder': '+237 6XX XXX XXX',
    'delivery.address': 'Delivery Address',
    'delivery.address.placeholder': 'Neighborhood, Street, Landmark...',
    'delivery.city': 'City',
    'delivery.city.placeholder': 'Select a city',
    'delivery.type': 'Delivery Type',
    'delivery.notes': 'Instructions (optional)',
    'delivery.notes.placeholder': 'Delivery instructions (door code, floor, etc.)',
    'delivery.cta': 'Continue to Payment',
    'delivery.savedAddresses': 'Saved Addresses',
    'delivery.useGps': 'Use My Location',
    'payment.title': 'Secure Payment',
    'payment.escrow.title': 'Your payment is protected by our Escrow system',
    'payment.escrow.subtitle': 'Money stays secure until you confirm receipt.',
    'payment.recap': 'Order summary',
    'payment.momo': 'MTN Mobile Money',
    'payment.momo.desc': 'Instant payment via your MTN MoMo account',
    'payment.momo.number': 'MTN MoMo Number',
    'payment.momo.placeholder': '6XX XXX XXX',
    'payment.orange': 'Orange Money',
    'payment.orange.desc': 'Secure payment via your Orange Money account',
    'payment.orange.number': 'Orange Money Number',
    'payment.orange.placeholder': '6XX XXX XXX',
    'payment.cta': 'Pay',
    'payment.processing': 'Processing...',
    'payment.modal.title': 'Please validate the payment on your phone',
    'payment.modal.desc': 'A confirmation popup should appear on your phone. Please enter your MoMo/Orange Money PIN to confirm.',
    'payment.modal.cancel': 'Cancel',
    'payment.escrow.flow.you': 'You',
    'payment.escrow.flow.escrow': 'AgriDirect Escrow',
    'payment.escrow.flow.producer': 'Producer',
    'payment.escrow.secured': 'secured in escrow',
    'payment.escrow.info': 'Producer will be paid after you confirm receipt.',
    'confirm.title': 'Order Confirmed!',
    'confirm.order': 'Order',
    'confirm.message': 'Your payment of {total} FCFA has been secured in escrow. The producer is preparing your order.',
    'confirm.summary.title': 'Order Summary',
    'confirm.delivery': 'Delivery',
    'confirm.payment': 'Payment method',
    'confirm.step1': 'Preparing',
    'confirm.step1.desc': 'The producer is preparing your items',
    'confirm.step2': 'In Transit',
    'confirm.step2.desc': 'Real-time tracking available',
    'confirm.step3': 'Delivered',
    'confirm.step3.desc': 'Confirm receipt to release payment',
    'confirm.track': 'Track My Order',
    'confirm.shop': 'Continue Shopping',
    'confirm.invoice': 'Download Invoice',
    'confirm.estimated': 'Estimated delivery',
    'validation.required': 'This field is required',
    'validation.phone': 'Invalid phone number',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  toggleLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fr');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'fr' ? 'en' : 'fr'));
  }, []);

  const t = useCallback(
    (key: string): string | Record<string, string> => {
      const value = translations[lang][key];
      return value !== undefined ? value : key;
    },
    [lang],
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export { LanguageContext };
