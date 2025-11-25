"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import useCartStore from "@/zustand/store";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { selectedprismaProduct } from "@/lib/types";

// Define the props for the component

interface AddtoCartProps {
  item: selectedprismaProduct;
  classname?: string;
  varient?: "default" | "outline" | "ghost" | "link" | "destructive";
}

const AddtoCart: React.FC<AddtoCartProps> = ({ item, classname, varient }) => {
  const { lang } = useParams();
  const addCartItem = useCartStore((state) => state.addCartItem);
  const ar = lang === "ar";
  return (
    <Button
      variant={varient}
      className={`${classname}`}
      onClick={() => {
        addCartItem(item); // Add the item to the cart
        toast.success(ar ? "تمت الإضافة إلى السلة" : "Added to cart"); // Show a toast notification
      }}
    >
      {ar ? "اضف للسلة" : "Add to Cart"}
    </Button>
  );
};

export default AddtoCart;
