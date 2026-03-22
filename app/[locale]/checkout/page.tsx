"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import useCartStore from "@/zustand/store";
import CheckoutForm from "./components/CheckoutForm";

export default function CheckoutPage() {
  const products = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const locale = useLocale();
  const t = useTranslations("CheckoutPage");
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (products.length === 0 && getTotalPrice() === 0) {
      toast.error(t("emptyCartToast"));
      router.push("/shop");
    }

    const totalPrice = getTotalPrice();
    const productsNames = products.map((item) =>
      locale === "ar" ? item.name_ar : item.name_en,
    );

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
        toast.error(t("paymentError"));
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [products, getTotalPrice, locale]);

  if (loading || !clientSecret) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-my-main" size={48} />
      </div>
    );
  }

  return (
    <main className="container mx-auto mt-10 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-my-main mb-6">
        {t("checkoutTitle")}
      </h1>

      <CheckoutForm clientSecret={clientSecret} />
    </main>
  );
}
