"use client";
/* eslint react-hooks/set-state-in-effect: "off" */

import { useEffect, useState } from "react";
import useCartStore from "@/zustand/store";
import CheckoutForm from "./components/CheckoutForm";
import { Loader2 } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { toast } from "sonner";

export default function CheckoutPage() {
  const products = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const { lang } = useParams();
  const ar = lang === "ar";

  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (products.length === 0 && getTotalPrice() === 0) {
      toast.error(ar ? "سلة التسوق فارغة" : "Your cart is empty");
      redirect(ar ? "/ar/products" : "/products");
    }
    // Avoid calculating derived state outside useEffect
    const totalPrice = getTotalPrice();
    const productsNames = products.map((item) => item.name);

    const createPaymentIntent = async () => {
      try {
        const res = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productsNames, totalPrice }),
        });

        const data = await res.json();

        setClientSecret(data.clientSecret);
        setLoading(false);
      } catch (err) {
        console.error("❌ Payment Intent Error:", err);
      }
    };

    createPaymentIntent();
  }, [products, getTotalPrice, ar]); // empty deps = run once on mount only

  if (clientSecret) {
    return (
      <main className="mt-8 max-w-3xl mx-auto p-2 space-y-4 min-h-screen ">
        <CheckoutForm clientSecret={clientSecret} />
      </main>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin" />
    </div>
  );
}
