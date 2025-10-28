import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  name: string;
  id: string;
  image: string;
  basePrice: number;
  quantity?: number;
};
export type sidebarState = {
  togglestate: boolean;
  setTogglestate: (togglestate: boolean) => void;
};
type imageState = {
  setImageUrl: (imageUrl: string) => void;
  imageUrl: string;
  setImageName: (imageName: string) => void;
  imageName: string;
};
type CartState = {
  items: CartItem[];
  addCartItem: (item: CartItem) => void;
  removeCartItem: (id: string) => void;
  removeItemFromCart: (id: string) => void;
  clearCart: () => void;
  getQuantity: () => number; // Getter for total quantity
  getTotalPrice: () => number; // Getter for total price
};
// store.ts

interface SearchStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: "search-storage", // the key in localStorage
      partialize: (state) => ({ searchQuery: state.searchQuery }), // only persist searchQuery
    }
  )
);

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addCartItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: (i.quantity || 0) + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }
      },
      removeCartItem: (id) =>
        set((state) => ({
          items: state.items.reduce((acc, i) => {
            if (i.id === id && i.quantity && i.quantity > 1) {
              acc.push({ ...i, quantity: i.quantity - 1 });
            } else if (i.id !== id || (i.quantity && i.quantity > 1)) {
              acc.push(i);
            }
            return acc;
          }, [] as CartItem[]),
        })),
      removeItemFromCart: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      clearCart: () => set({ items: [] }),
      getQuantity: () => {
        return get().items.reduce((acc, item) => acc + (item.quantity || 0), 0);
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (acc, item) => acc + item.basePrice * (item.quantity || 0),
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
const useImageStore = create<imageState>()(
  persist(
    (set) => ({
      imageUrl: "",
      imageName: "",
      setImageUrl: (imageUrl) => set({ imageUrl }),
      setImageName: (imageName) => set({ imageName }),
    }),
    {
      name: "image-storage",
    }
  )
);
const useSidebarStore = create<sidebarState>()(
  persist(
    (set) => ({
      togglestate: false,
      setTogglestate: (togglestate) => set({ togglestate }),
    }),
    {
      name: "sidebar-storage",
    }
  )
);
export default useCartStore;
export { useImageStore, useSidebarStore };
