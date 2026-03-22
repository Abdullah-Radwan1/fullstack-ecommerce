"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import useCartStore from "@/zustand/store";
import { toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";
import { selectedprismaProduct } from "@/lib/types";

// Define the props for the component

interface AddtoCartProps {
  item: selectedprismaProduct;
  classname?: string;
  varient?: "default" | "outline" | "ghost" | "link" | "destructive";
}

const AddtoCart: React.FC<AddtoCartProps> = ({ item, classname, varient }) => {
  const t = useTranslations();
  const locale = useLocale();
  const addCartItem = useCartStore((state) => state.addCartItem);

  return (
    <Button
      variant={varient}
      className={`${classname}`}
      onClick={() => {
        addCartItem(item); // Add the item to the cart
        toast.success(t("addedToCartToast")); // Show a toast notification
      }}
    >
      {t("addToCart")}
    </Button>
  );
};

export default AddtoCart;
