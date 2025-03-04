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
}

const AddtoCart: React.FC<AddtoCartProps> = ({ item }) => {
  const { lang } = useParams();
  const addCartItem = useCartStore((state) => state.addCartItem);
  const ar = lang === "ar";
  return (
    <Button
      className="w-full"
      onClick={() => {
        addCartItem(item); // Add the item to the cart
        toast({
          title: ar ? "تم اضافه المنتج بنجاح" : "product added successfully",

          variant: "success",
        });
      }}
    >
      Add to Cart
    </Button>
  );
};

export default AddtoCart;
