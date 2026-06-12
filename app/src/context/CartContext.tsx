import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  nameEn: string;
  producer: string;
  producerId: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  category: string;
}

export interface DeliveryInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  deliveryType: 'standard' | 'express' | 'pickup';
  notes: string;
}

export type CheckoutStep = 'cart' | 'delivery' | 'payment' | 'confirmation';

export type PaymentMethod = 'momo' | 'orange-money' | null;

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  deliveryInfo: DeliveryInfo | null;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  deliveryCost: number;
  setDeliveryCost: (cost: number) => void;
  checkoutStep: CheckoutStep;
  setCheckoutStep: (step: CheckoutStep) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  paymentPhone: string;
  setPaymentPhone: (phone: string) => void;
  orderNumber: string;
  generateOrderNumber: () => string;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  resetCheckout: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
  deliveryInfo: null,
  setDeliveryInfo: () => {},
  deliveryCost: 0,
  setDeliveryCost: () => {},
  checkoutStep: 'cart',
  setCheckoutStep: () => {},
  paymentMethod: null,
  setPaymentMethod: () => {},
  paymentPhone: '',
  setPaymentPhone: () => {},
  orderNumber: '',
  generateOrderNumber: () => '',
  isProcessing: false,
  setIsProcessing: () => {},
  resetCheckout: () => {},
});

// Sample initial cart data with Cameroonian products
const initialItems: CartItem[] = [
  {
    id: 'cacao-premium-001',
    name: 'Feves de Cacao Premium',
    nameEn: 'Premium Cacao Beans',
    producer: 'Jean-Pierre Ndongo',
    producerId: 'producer-1',
    price: 3500,
    unit: 'kg',
    quantity: 2,
    image: '/product-cacao.jpg',
    category: 'cacao',
  },
  {
    id: 'farm-eggs-001',
    name: 'Oeufs Fermiers Frais x30',
    nameEn: 'Farm Fresh Eggs x30',
    producer: 'Marie-Claire Fotso',
    producerId: 'producer-2',
    price: 1500,
    unit: 'plateau',
    quantity: 1,
    image: '/product-eggs.jpg',
    category: 'poultry',
  },
  {
    id: 'papaya-local-001',
    name: 'Papayes Pays',
    nameEn: 'Local Papayas',
    producer: 'Verger Littoral',
    producerId: 'producer-4',
    price: 1200,
    unit: 'piece',
    quantity: 3,
    image: '/product-papaya.jpg',
    category: 'fruits',
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [paymentPhone, setPaymentPhone] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateOrderNumber = useCallback(() => {
    const date = new Date();
    const dateStr = date.toISOString().slice(2, 10).replace(/-/g, '');
    const random = Math.floor(10000 + Math.random() * 90000);
    const orderNum = `AGRI-${dateStr}-${random}`;
    setOrderNumber(orderNum);
    return orderNum;
  }, []);

  const resetCheckout = useCallback(() => {
    setCheckoutStep('cart');
    setPaymentMethod(null);
    setPaymentPhone('');
    setDeliveryInfo(null);
    setDeliveryCost(0);
    setIsProcessing(false);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        deliveryInfo,
        setDeliveryInfo,
        deliveryCost,
        setDeliveryCost,
        checkoutStep,
        setCheckoutStep,
        paymentMethod,
        setPaymentMethod,
        paymentPhone,
        setPaymentPhone,
        orderNumber,
        generateOrderNumber,
        isProcessing,
        setIsProcessing,
        resetCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export { CartContext };
