"use client";
import Link from "@/components/Link";
import { Button } from "@/components/ui/button";
import useCartStore from "@/zustand/store";
import React, { useEffect, useState } from "react";

const CheckoutButton = ({ lang }: { lang: string }) => {
  const ar = lang === "ar";
  const [isMounted, setIsMounted] = useState(false);

  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  useEffect(() => {
    setIsMounted(true);
  }, [items]);
  if (!isMounted) {
    return null;
  }
  return (
    isMounted && (
      <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-700 text-white hover:opacity-80 transition ">
        <Link
          href={
            ar
              ? `/ar/checkout?products=${JSON.stringify(items)}&totalPrice=${totalPrice}`
              : `/en/checkout?products=${JSON.stringify(items)}&totalPrice=${totalPrice}`
          }
        >
          {" "}
          {ar ? "الدفع" : "Checkout"}
        </Link>
      </Button>
    )
  );
};

export default CheckoutButton;
