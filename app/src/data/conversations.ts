// Mock conversation data for the Chat page
// Conversations between buyers and Cameroonian producers

export type MessageType = 'text' | 'product' | 'order' | 'image' | 'location';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  sender: 'sent' | 'received';
  timestamp: string;
  status?: 'sent' | 'read';
  product?: {
    name: string;
    nameEn: string;
    price: string;
    image: string;
  };
  order?: {
    id: string;
    status: string;
    statusEn: string;
  };
}

export interface Conversation {
  id: string;
  producerName: string;
  producerNameEn: string;
  avatar: string;
  online: boolean;
  lastActive?: string;
  lastActiveEn?: string;
  unread: number;
  productThumbnail?: string;
  productName?: string;
  productNameEn?: string;
  messages: Message[];
}

export const conversations: Conversation[] = [
  // Conversation 1: Cacao beans purchase
  {
    id: 'conv-1',
    producerName: 'Jean-Pierre Ndongo',
    producerNameEn: 'Jean-Pierre Ndongo',
    avatar: 'JN',
    online: true,
    unread: 2,
    productThumbnail: '/images/product-cacao.jpg',
    productName: 'Feves de Cacao Premium',
    productNameEn: 'Premium Cacao Beans',
    messages: [
      {
        id: 'm1-1',
        type: 'text',
        content: "Bonjour Jean-Pierre ! Vos feves de cacao sont-elles encore disponibles ? Je cherche 5kg pour ma chocolaterie.",
        sender: 'sent',
        timestamp: '09:15',
        status: 'read',
      },
      {
        id: 'm1-2',
        type: 'text',
        content: "Bonjour ! Oui, j'ai encore 42kg en stock. Les feves sont de la recolte d'octobre, tres bien fermentees.",
        sender: 'received',
        timestamp: '09:22',
      },
      {
        id: 'm1-3',
        type: 'text',
        content: "Parfait ! La fermentation est complete ? Et vous livrez a Douala ?",
        sender: 'sent',
        timestamp: '09:25',
        status: 'read',
      },
      {
        id: 'm1-4',
        type: 'text',
        content: "Oui, fermentation 100% complete (7 jours). Pour Douala, livraison sous 48h via notre partenaire. 3,500 FCFA/kg + 1,500 FCFA livraison.",
        sender: 'received',
        timestamp: '09:30',
      },
      {
        id: 'm1-5',
        type: 'product',
        content: '',
        sender: 'received',
        timestamp: '09:31',
        product: {
          name: 'Feves de Cacao Premium',
          nameEn: 'Premium Cacao Beans',
          price: '3,500 FCFA/kg',
          image: '/images/product-cacao.jpg',
        },
      },
      {
        id: 'm1-6',
        type: 'text',
        content: "Je prends 5kg alors. Je passe la commande maintenant !",
        sender: 'sent',
        timestamp: '09:35',
        status: 'read',
      },
      {
        id: 'm1-7',
        type: 'order',
        content: 'Commande #AGRI-240315-00847 creee',
        sender: 'received',
        timestamp: '09:36',
        order: {
          id: '#AGRI-240315-00847',
          status: 'Commande confirmee',
          statusEn: 'Order confirmed',
        },
      },
      {
        id: 'm1-8',
        type: 'text',
        content: "Votre commande est prete ! Le livreur passe ce soir vers 18h. Voici son numero: 6XX XXX XXX.",
        sender: 'received',
        timestamp: '14:30',
      },
      {
        id: 'm1-9',
        type: 'text',
        content: "Super, merci beaucoup Jean-Pierre ! Les feves sont bien fermentees et pretes a etre expediees demain matin.",
        sender: 'received',
        timestamp: '14:32',
      },
    ],
  },
  // Conversation 2: Eggs order
  {
    id: 'conv-2',
    producerName: 'Marie-Claire Fotso',
    producerNameEn: 'Marie-Claire Fotso',
    avatar: 'MF',
    online: false,
    lastActive: 'Vu il y a 5 min',
    lastActiveEn: 'Seen 5 min ago',
    unread: 0,
    productThumbnail: '/images/product-eggs.jpg',
    productName: 'Oeufs Fermiers',
    productNameEn: 'Farm Eggs',
    messages: [
      {
        id: 'm2-1',
        type: 'text',
        content: "Bonjour Marie-Claire, je voudrais commander 10 plateaux d'oeufs pour mon restaurant. Est-ce possible pour demain ?",
        sender: 'sent',
        timestamp: '08:30',
        status: 'read',
      },
      {
        id: 'm2-2',
        type: 'text',
        content: "Bonjour ! Avec plaisir. Merci pour votre commande ! Les oeufs seront prets a 8h demain. Voulez-vous que je les livre ou vous venez les chercher ?",
        sender: 'received',
        timestamp: '08:45',
      },
      {
        id: 'm2-3',
        type: 'text',
        content: "Je peux envoyer mon livreur a 9h. C'est 1,200 FCFA le plateau, c'est bien ca ?",
        sender: 'sent',
        timestamp: '08:50',
        status: 'read',
      },
      {
        id: 'm2-4',
        type: 'text',
        content: "Exactement. 12,000 FCFA pour les 10 plateaux. Je prepare ca tout de suite et je vous envoie la confirmation.",
        sender: 'received',
        timestamp: '08:52',
      },
      {
        id: 'm2-5',
        type: 'order',
        content: "Commande #AGRI-240315-00850 confirmee",
        sender: 'received',
        timestamp: '08:55',
        order: {
          id: '#AGRI-240315-00850',
          status: 'En preparation',
          statusEn: 'Preparing',
        },
      },
      {
        id: 'm2-6',
        type: 'text',
        content: "Parfait, merci beaucoup ! A demain 9h alors.",
        sender: 'sent',
        timestamp: '09:00',
        status: 'read',
      },
    ],
  },
  // Conversation 3: Vegetable delivery tracking
  {
    id: 'conv-3',
    producerName: 'Emmanuel Tchamba',
    producerNameEn: 'Emmanuel Tchamba',
    avatar: 'ET',
    online: true,
    unread: 1,
    productThumbnail: '/images/product-carrots.jpg',
    productName: 'Carottes Bio',
    productNameEn: 'Organic Carrots',
    messages: [
      {
        id: 'm3-1',
        type: 'text',
        content: "Salut Emmanuel, je voudrais des carottes et des tomates bio pour cette semaine. Qu'est-ce que tu as de disponible ?",
        sender: 'sent',
        timestamp: 'Hier',
        status: 'read',
      },
      {
        id: 'm3-2',
        type: 'text',
        content: "Salut ! J'ai des carottes fraiches et des tomates vine recoltees ce matin. 800 FCFA/kg les carottes et 1,000 FCFA/kg les tomates. Combien il vous faut ?",
        sender: 'received',
        timestamp: 'Hier',
      },
      {
        id: 'm3-3',
        type: 'text',
        content: "5kg de carottes et 3kg de tomates. Tu livres a Yaounde centre ?",
        sender: 'sent',
        timestamp: 'Hier',
        status: 'read',
      },
      {
        id: 'm3-4',
        type: 'text',
        content: "Oui, pas de probleme. Livraison a 1,000 FCFA. Total 7,000 + 1,000 = 8,000 FCFA. Je prepare le panier maintenant.",
        sender: 'received',
        timestamp: 'Hier',
      },
      {
        id: 'm3-5',
        type: 'order',
        content: "Commande #AGRI-240315-00852 en preparation",
        sender: 'received',
        timestamp: 'Hier',
        order: {
          id: '#AGRI-240315-00852',
          status: 'En cours de livraison',
          statusEn: 'Out for delivery',
        },
      },
      {
        id: 'm3-6',
        type: 'text',
        content: "Votre livraison est en route. Le livreur arrive dans 20 min. Preparez les 8,000 FCFA svp.",
        sender: 'received',
        timestamp: '10:45',
      },
    ],
  },
  // Conversation 4: Support - Payment confirmation
  {
    id: 'conv-4',
    producerName: 'Support AgriDirect',
    producerNameEn: 'AgriDirect Support',
    avatar: 'AD',
    online: true,
    unread: 0,
    messages: [
      {
        id: 'm4-1',
        type: 'text',
        content: "Bonjour, j'ai un probleme avec mon paiement MoMo. La transaction a ete debitee mais la commande n'apparait pas.",
        sender: 'sent',
        timestamp: 'Hier',
        status: 'read',
      },
      {
        id: 'm4-2',
        type: 'text',
        content: "Bonjour, nous avons bien recu votre message. Nous verifions votre transaction avec MTN MoMo. Pouvez-vous nous donner votre numero de telephone et l'ID de transaction ?",
        sender: 'received',
        timestamp: 'Hier',
      },
      {
        id: 'm4-3',
        type: 'text',
        content: "Mon numero: 6XX XXX XXX. ID transaction: MOMO240315A8847. C'etait pour 13,600 FCFA.",
        sender: 'sent',
        timestamp: 'Hier',
        status: 'read',
      },
      {
        id: 'm4-4',
        type: 'text',
        content: "Merci. Nous avons verifie et votre paiement de 13,600 FCFA a ete confirme. Votre commande #AGRI-240315-00848 est maintenant validee et en preparation.",
        sender: 'received',
        timestamp: 'Hier',
      },
      {
        id: 'm4-5',
        type: 'order',
        content: "Paiement confirme - Commande validee",
        sender: 'received',
        timestamp: 'Hier',
        order: {
          id: '#AGRI-240315-00848',
          status: 'Paiement confirme',
          statusEn: 'Payment confirmed',
        },
      },
      {
        id: 'm4-6',
        type: 'text',
        content: "Super, merci pour votre aide rapide !",
        sender: 'sent',
        timestamp: 'Hier',
        status: 'read',
      },
      {
        id: 'm4-7',
        type: 'text',
        content: "Avec plaisir ! N'hesitez pas si vous avez d'autres questions. Bonne journee.",
        sender: 'received',
        timestamp: 'Hier',
      },
    ],
  },
  // Conversation 5: Plantain wholesale inquiry
  {
    id: 'conv-5',
    producerName: 'Aminata Fofang',
    producerNameEn: 'Aminata Fofang',
    avatar: 'AF',
    online: false,
    lastActive: 'Vu il y a 30 min',
    lastActiveEn: 'Seen 30 min ago',
    unread: 3,
    productThumbnail: '/images/product-plantain.jpg',
    productName: 'Plantains Murs',
    productNameEn: 'Ripe Plantains',
    messages: [
      {
        id: 'm5-1',
        type: 'text',
        content: "Bonjour Aminata, je suis interesse par vos plantains en gros. Je gere un petit marche a Douala et j'ai besoin de 20 bottes par semaine. Quel prix pouvez-vous me faire ?",
        sender: 'sent',
        timestamp: 'Hier',
        status: 'read',
      },
      {
        id: 'm5-2',
        type: 'text',
        content: "Bonjour ! Merci pour votre interet. Pour 20 bottes par semaine, je peux vous faire un prix de 500 FCFA la botte au lieu de 700 FCFA. C'est une reduction de 28% !",
        sender: 'received',
        timestamp: 'Hier',
      },
      {
        id: 'm5-3',
        type: 'text',
        content: "C'est un excellent prix ! Et la qualite est garantie ?",
        sender: 'sent',
        timestamp: 'Hier',
        status: 'read',
      },
      {
        id: 'm5-4',
        type: 'text',
        content: "Absolument ! Mes plantains sont recoltes a maturite parfaite. Pas de plantains trop verts ni trop murs. Je vous joins une photo de la derniere recolte.",
        sender: 'received',
        timestamp: 'Hier',
      },
      {
        id: 'm5-5',
        type: 'product',
        content: '',
        sender: 'received',
        timestamp: 'Hier',
        product: {
          name: 'Plantains Murs',
          nameEn: 'Ripe Plantains',
          price: '500 FCFA/botte (prix gros)',
          image: '/images/product-plantain.jpg',
        },
      },
      {
        id: 'm5-6',
        type: 'text',
        content: "Parfait, je valide la commande pour 20 bottes. Quand peut-on commencer ?",
        sender: 'sent',
        timestamp: '08:00',
        status: 'read',
      },
      {
        id: 'm5-7',
        type: 'text',
        content: "Des demain si vous voulez ! Je prepare votre premier lot ce soir. Livraison a 6h du matin sur Douala.",
        sender: 'received',
        timestamp: '08:15',
      },
      {
        id: 'm5-8',
        type: 'text',
        content: "C'est parfait, merci Aminata ! Je vous confirme l'adresse de livraison dans quelques minutes.",
        sender: 'sent',
        timestamp: '08:20',
        status: 'sent',
      },
      {
        id: 'm5-9',
        type: 'text',
        content: "Entendu ! J'attends votre message. Bonne journee.",
        sender: 'received',
        timestamp: '08:25',
      },
    ],
  },
  // Conversation 6: Coffee shop Arabica inquiry
  {
    id: 'conv-6',
    producerName: 'Pierre Essomba',
    producerNameEn: 'Pierre Essomba',
    avatar: 'PE',
    online: true,
    unread: 1,
    productThumbnail: '/images/product-coffee.jpg',
    productName: 'Cafe Arabica Torrefie',
    productNameEn: 'Roasted Arabica Coffee',
    messages: [
      {
        id: 'm6-1',
        type: 'text',
        content: "Bonjour Pierre, j'ouvre un cafe a Yaounde et je cherche un fournisseur de cafe Arabica de qualite. Pouvez-vous me parler de vos torrefactions ?",
        sender: 'sent',
        timestamp: 'Hier',
        status: 'read',
      },
      {
        id: 'm6-2',
        type: 'text',
        content: "Bonjour, felicitations pour votre projet ! Je torrefie mes grains moi-meme a Bafoussam. J'ai trois profils : leger, medium, et fonce. Quel profil vous interesse ?",
        sender: 'received',
        timestamp: 'Hier',
      },
      {
        id: 'm6-3',
        type: 'text',
        content: "Le medium me semble ideal pour notre clientele. Quel est le prix au kg ?",
        sender: 'sent',
        timestamp: 'Hier',
        status: 'read',
      },
      {
        id: 'm6-4',
        type: 'text',
        content: "Le medium est a 4,500 FCFA/kg. Pour un cafe, je propose un contrat mensuel avec 10% de reduction a partir de 20kg/mois. Ca vous dit ?",
        sender: 'received',
        timestamp: 'Hier',
      },
      {
        id: 'm6-5',
        type: 'text',
        content: "C'est tres interessant ! Je vais commencer avec 15kg pour tester, puis on passe au contrat mensuel. Vous livrez a Yaounde ?",
        sender: 'sent',
        timestamp: '07:30',
        status: 'read',
      },
      {
        id: 'm6-6',
        type: 'text',
        content: "Oui, livraison gratuite a Yaounde a partir de 15kg. Je peux expedier des demain si vous confirmez la commande aujourd'hui !",
        sender: 'received',
        timestamp: '07:45',
      },
    ],
  },
  // Conversation 7: Papaya seasonal order
  {
    id: 'conv-7',
    producerName: 'Grace Mballa',
    producerNameEn: 'Grace Mballa',
    avatar: 'GM',
    online: false,
    lastActive: 'Vu il y a 1h',
    lastActiveEn: 'Seen 1h ago',
    unread: 0,
    productThumbnail: '/images/product-papaya.jpg',
    productName: 'Papayes Pays',
    productNameEn: 'Local Papayas',
    messages: [
      {
        id: 'm7-1',
        type: 'text',
        content: "Bonjour Grace, vos papayes sont superbes sur les photos. J'aimerais en commander pour mon smoothie bar. Avez-vous des quantites en gros ?",
        sender: 'sent',
        timestamp: 'Lun',
        status: 'read',
      },
      {
        id: 'm7-2',
        type: 'text',
        content: "Merci beaucoup ! Oui, j'ai une belle production cette saison. Pour le gros, c'est 400 FCFA/kg a partir de 10kg. Elles sont parfaitement mures pour des smoothies.",
        sender: 'received',
        timestamp: 'Lun',
      },
      {
        id: 'm7-3',
        type: 'product',
        content: '',
        sender: 'received',
        timestamp: 'Lun',
        product: {
          name: 'Papayes Pays',
          nameEn: 'Local Papayas',
          price: '400 FCFA/kg (gros)',
          image: '/images/product-papaya.jpg',
        },
      },
      {
        id: 'm7-4',
        type: 'text',
        content: "Genial, je prends 15kg. Comment se passe la livraison ?",
        sender: 'sent',
        timestamp: 'Lun',
        status: 'read',
      },
      {
        id: 'm7-5',
        type: 'text',
        content: "Parfait ! 6,000 FCFA au total. Je prepare les papayes et je vous envoie via notre livreur demain matin. Paiement a la livraison OK pour vous ?",
        sender: 'received',
        timestamp: 'Lun',
      },
      {
        id: 'm7-6',
        type: 'text',
        content: "Parfait, merci Grace ! A demain alors.",
        sender: 'sent',
        timestamp: 'Mar',
        status: 'read',
      },
    ],
  },
  // Conversation 8: Okra for restaurant
  {
    id: 'conv-8',
    producerName: 'Joseph Mbarga',
    producerNameEn: 'Joseph Mbarga',
    avatar: 'JM',
    online: true,
    unread: 2,
    productThumbnail: '/images/product-okra.jpg',
    productName: 'Gombos Frais',
    productNameEn: 'Fresh Okra',
    messages: [
      {
        id: 'm8-1',
        type: 'text',
        content: "Bonjour Joseph, je suis chef au Restaurant Savane et je cherche des gombos frais 3 fois par semaine. Pouvez-vous assurer ce rythme ?",
        sender: 'sent',
        timestamp: 'Mar',
        status: 'read',
      },
      {
        id: 'm8-2',
        type: 'text',
        content: "Bonjour Chef ! Avec plaisir de travailler avec vous. Oui, je peux vous livrer du lundi, mercredi et vendredi. Combien de kg par livraison ?",
        sender: 'received',
        timestamp: 'Mar',
      },
      {
        id: 'm8-3',
        type: 'text',
        content: "5kg par livraison, soit 15kg par semaine. Vos gombos sont bio ?",
        sender: 'sent',
        timestamp: 'Mar',
        status: 'read',
      },
      {
        id: 'm8-4',
        type: 'text',
        content: "Oui, 100% bio, sans pesticides. Mes gombos sont recoltes le matin meme de la livraison pour garantir la fraicheur. 600 FCFA/kg.",
        sender: 'received',
        timestamp: 'Mar',
      },
      {
        id: 'm8-5',
        type: 'text',
        content: "C'est notre philosophie aussi : le frais et le local. On fait un essai cette semaine ?",
        sender: 'sent',
        timestamp: 'Mer',
        status: 'read',
      },
      {
        id: 'm8-6',
        type: 'text',
        content: "Volontiers ! Je vous prepare votre premier lot de 5kg pour demain. Livraison a 10h au Restaurant Savane. C'est bien ca ?",
        sender: 'received',
        timestamp: 'Mer',
      },
      {
        id: 'm8-7',
        type: 'text',
        content: "Exactement. 3,000 FCFA pour les 5kg. Merci Joseph !",
        sender: 'sent',
        timestamp: 'Jeu',
        status: 'read',
      },
      {
        id: 'm8-8',
        type: 'text',
        content: "Vos gombos sont en route ! Le livreur arrive dans 15 minutes. Bon appétit a vos clients !",
        sender: 'received',
        timestamp: '09:30',
      },
      {
        id: 'm8-9',
        type: 'text',
        content: "Excellente qualite Joseph ! On confirme le contrat hebdomadaire. Vous pouvez commencer des lundi prochain.",
        sender: 'sent',
        timestamp: '11:00',
        status: 'sent',
      },
      {
        id: 'm8-10',
        type: 'text',
        content: "Merci beaucoup Chef ! C'est un honneur de travailler avec le Restaurant Savane. A lundi pour la prochaine livraison !",
        sender: 'received',
        timestamp: '11:15',
      },
    ],
  },
];
