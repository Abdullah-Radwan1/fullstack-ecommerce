"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import useCartStore from "@/zustand/store";
import { toast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { Product } from "@prisma/client";

// Define the props for the component
interface AddtoCartProps {
  item: Product;
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
      className={`${classname}   `}
      onClick={() => {
        addCartItem(item); // Add the item to the cart
        toast({
          title: ar ? "تم اضافه المنتج بنجاح" : "product added successfully",

          variant: "success",
        });
      }}
    >
      {ar ? "اضف للسلة" : "Add to Cart"}
    </Button>
  );
};

export default AddtoCart;
