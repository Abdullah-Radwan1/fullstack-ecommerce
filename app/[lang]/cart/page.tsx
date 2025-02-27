"use client";

import useCartStore from "@/zustand/store";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams } from "next/navigation";

const Page = () => {
  const { lang } = useParams();
  const ar = lang === "ar";
  const cartItems = useCartStore((state) => state.items);
  const removeCartItem = useCartStore((state) => state.removeCartItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const addCartItem = useCartStore((state) => state.addCartItem);

  return cartItems.length > 0 ? (
    <div className="p-6 flex flex-col items-center  min-h-[70vh]">
      <h1 className="text-2xl font-bold mb-6 text-center">Cart Items</h1>
      <div className="w-full max-w-4xl">
        <Table>
          <TableCaption className="text-center">
            A list of your cart items.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id} className="text-center">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="flex justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-16 h-16 object-contain rounded"
                  />
                </TableCell>
                <TableCell>${item.basePrice}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCartItem(item.id)}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addCartItem(item)}
                    >
                      Add
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-6 flex justify-center">
          <Button variant="destructive" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <h1 className="text-center flex items-center justify-center text-3xl font-bold min-h-[55vh]">
      {" "}
      {ar ? " السلة فارغة😭" : "No products yet 😭"}
    </h1>
  );
};

export default Page;
