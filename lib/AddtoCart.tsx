"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import useCartStore from "@/zustand/store";
import { toast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";

// Define the props for the component
interface AddtoCartProps {
  item: {
    id: string;
    name: string;
    image: string;
    basePrice: number;
  };
}

const AddtoCart: React.FC<AddtoCartProps> = ({ item }) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const { lang } = useParams();
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
