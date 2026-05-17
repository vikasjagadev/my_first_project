import { create } from 'zustand';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  image: string;
  quantity: number;
  rewards: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalRewards: () => number;
  setIsOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  
  addToCart: (product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity: 1 }] };
    });
  },
  
  removeFromCart: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  
  updateQuantity: (id, delta) => {
    set((state) => ({
      items: state.items.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }),
    }));
  },
  
  clearCart: () => set({ items: [] }),
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0);
  },

  getTotalRewards: () => {
    return get().items.reduce((total, item) => total + (item.rewards * item.quantity), 0);
  },
  
  setIsOpen: (isOpen) => set({ isOpen }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));
