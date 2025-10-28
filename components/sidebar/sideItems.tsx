"use client";
import Image from "next/image";
import React from "react";
import { Minus, Plus, X } from "lucide-react";

import useCartStore, { CartItem } from "@/zustand/store";
import { Button } from "../ui/button";

const Sideitem = ({ CartItem }: { CartItem: CartItem }) => {
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
      <div className="p-4 mt-6 mb-6 bg-background/90 backdrop-blur-sm  shadow-md flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            width={50}
            height={50}
            alt={CartItem.name}
            src={CartItem.image}
          />
          <div className="flex flex-col gap-1 items-start">
            <span className="text-sm font-base">{CartItem.name}</span>
            <span className="text-xs text-secondary-foreground ">
              {CartItem.basePrice}$
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-x-2">
          <Button
            variant={"ghost"}
            onClick={decrementQuantity}
            className="p-1   transition"
          >
            <Minus size={16} />
          </Button>

          <p className=" font-semibold">{CartItem.quantity}</p>

          <Button
            variant={"ghost"}
            onClick={incrementQuantity}
            className="px-1    transition"
          >
            <Plus size={16} />
          </Button>
        </div>

        <X
          color="red"
          onClick={deleteTheProduct}
          className=" hover:cursor-pointer "
          size={18}
        />
      </div>
    </>
  );
};

export default Sideitem;
