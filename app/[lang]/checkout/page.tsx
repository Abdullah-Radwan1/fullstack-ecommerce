"use client";

import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import useCartStore from "@/zustand/store";
import CheckoutForm from "./components/CheckoutForm";

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
      return;
    }

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
      } catch (err) {
        console.error("❌ Payment Intent Error:", err);
        toast.error(ar ? "حدث خطأ أثناء الدفع" : "Payment error occurred");
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [products, getTotalPrice, ar]);

  if (loading || !clientSecret) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-my-main" size={48} />
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-my-main mb-6">
        {ar ? "الدفع" : "Checkout"}
      </h1>
      <div className="bg-card p-6 rounded-xl shadow-md">
        <CheckoutForm clientSecret={clientSecret} />
      </div>
    </main>
  );
}
