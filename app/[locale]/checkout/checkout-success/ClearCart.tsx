"use client";

import { useEffect } from "react";
import useCartStore from "@/zustand/store";

export default function ClearCart() {
  useEffect(() => {
    useCartStore.getState().clearCart();
  }, []);

  return null;
}
