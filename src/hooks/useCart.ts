import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pizza, CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (pizza: Pizza) => void;
  removeItem: (pizzaId: string) => void;
  updateQuantity: (pizzaId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (pizza) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.pizza.id === pizza.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.pizza.id === pizza.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...currentItems, { pizza, quantity: 1 }] });
        }
      },
      removeItem: (pizzaId) => {
        set({ items: get().items.filter((item) => item.pizza.id !== pizzaId) });
      },
      updateQuantity: (pizzaId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(pizzaId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.pizza.id === pizzaId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      get total() {
        return get().items.reduce(
          (sum, item) => sum + item.pizza.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'pizza-cart-storage',
    }
  )
);
