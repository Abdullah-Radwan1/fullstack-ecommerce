"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

import useCartStore from "@/zustand/store";
import CheckoutForm from "./components/CheckoutForm";

export default function CheckoutPage() {
  const products = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const locale = useLocale();
  const t = useTranslations("CheckoutPage");
  const router = useRouter();

  useEffect(() => {
    if (products.length === 0 && getTotalPrice() === 0) {
      toast.error(t("emptyCartToast"));
      router.push("/shop");
    }
  }, [products, getTotalPrice, locale]);

  return (
    <main className="container mx-auto mt-10 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-my-main mb-6">
        {t("checkoutTitle")}
      </h1>

      <CheckoutForm  />
    </main>
  );
}
