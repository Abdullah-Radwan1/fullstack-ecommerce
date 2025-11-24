"use client";
import Image from "next/image";
import React from "react";
import { Minus, Plus, X } from "lucide-react";

import useCartStore, { CartItem } from "@/zustand/store";
import { Button } from "../ui/button";

const Sideitem = ({ CartItem, ar }: { CartItem: CartItem; ar: boolean }) => {
  const { removeItemFromCart, addCartItem, removeCartItem } = useCartStore();

  const incrementQuantity = () => addCartItem(CartItem);
  const decrementQuantity = () => {
    removeCartItem(CartItem.id);
  };
  const deleteTheProduct = () => {
    removeItemFromCart(CartItem.id);
  };

  return (
    <>
      <div className="p-4  flex-col sm:flex-row items-start gap-y-3 mt-6 mb-6 bg-background/90 backdrop-blur-sm  shadow-md flex justify-between ">
        <div className="flex items-center gap-2">
          <Image
            width={50}
            height={50}
            alt={ar ? CartItem.name_ar : CartItem.name_en}
            src={CartItem.image}
          />
          <div className="flex flex-col gap-1 items-start">
            <span className="text-xs font-base">
              {ar ? CartItem.name_ar : CartItem.name_en}
            </span>
            <span className="text-xs text-secondary-foreground ">
              {CartItem.basePrice}$
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-x-2">
          <Button
            name="decrease"
            variant={"ghost"}
            onClick={decrementQuantity}
            className="p-1   transition"
          >
            <Minus size={16} />
          </Button>

          <p className=" font-semibold">{CartItem.quantity}</p>

          <Button
            name="increase"
            variant={"ghost"}
            onClick={incrementQuantity}
            className="px-1    transition"
          >
            <Plus size={16} />
          </Button>
          <X
            name="remove"
            color="red"
            onClick={deleteTheProduct}
            className=" hover:cursor-pointer "
            size={18}
          />
        </div>
      </div>
    </>
  );
};

export default Sideitem;
