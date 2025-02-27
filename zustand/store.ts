import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  name: string;
  id: string;
  image: string;
  basePrice: number;
  quantity?: number;
};

type CartState = {
  items: CartItem[];
  addCartItem: (item: CartItem) => void;
  removeCartItem: (id: string) => void;
  removeItemFromCart: (id: string) => void;
  clearCart: () => void;
};

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addCartItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            items: get().items.map((item) =>
              item.id === item.id
                ? { ...item, quantity: (item.quantity || 0) + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
      },
      removeCartItem: (id) => {
        set({
          items: get()
            .items.map((i) =>
              i.id === id && i.quantity && i.quantity > 1
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => !(i.id === id && i.quantity === 1)),
        });
      },
      removeItemFromCart: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
