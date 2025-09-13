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
import { Minus, Plus, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "@/components/Link";

const Page = () => {
  const { lang } = useParams();
  const ar = lang === "ar";
  const cartItems = useCartStore((state) => state.items);
  const removeCartItem = useCartStore((state) => state.removeCartItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const items = useCartStore((state) => state.items);
  return cartItems.length > 0 ? (
    <div
      className={`p-6 flex flex-col items-center min-h-[70vh] ${
        ar ? "rtl" : "ltr"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">
        {ar ? "منتجاتي" : "My products"}
      </h1>
      <div className="w-full max-w-4xl">
        <Table>
          <TableCaption>
            <div className="flex items-center justify-center gap-4 ">
              <h1 className=" text-3xl ">
                {ar ? "الإجمالي" : "Total"} {totalPrice}$
              </h1>
              <Button variant={"outline"}>
                <Link href={ar ? `/ar/checkout` : `/en/checkout`}>
                  {" "}
                  checkout
                </Link>
              </Button>{" "}
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">
                {ar ? "الاسم" : "Name"}
              </TableHead>
              <TableHead className="text-center">
                {ar ? "الصورة" : "Image"}
              </TableHead>
              <TableHead className="text-center">
                {ar ? "السعر" : "Price"}
              </TableHead>
              <TableHead className="text-center">
                {ar ? "الكمية" : "Quantity"}
              </TableHead>
              <TableHead className="text-center">
                {ar ? "الإجراءات" : "Actions"}
              </TableHead>
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
                      <Minus />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addCartItem(item)}
                    >
                      <Plus />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItemFromCart(item.id)}
                    >
                      <X />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"outline"}
              className="m-auto flex items-center mt-6 hover:bg-destructive hover:text-white"
            >
              {ar ? "تفريغ السلة" : "Clear Cart"}{" "}
              {/* Arabic: "تفريغ السلة", English: "Clear Cart" */}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                {ar ? "هل تريد تفريغ السله ؟" : "Clear the cart from products?"}{" "}
                {/* Arabic: "هل أنت متأكد تمامًا؟", English: "Are you absolutely sure?" */}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex gap-2 m-auto">
              <AlertDialogCancel>
                {ar ? "إلغاء" : "Cancel"}{" "}
                {/* Arabic: "إلغاء", English: "Cancel" */}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  clearCart();
                }}
              >
                {ar ? "حذف" : "Delete"} {/* Arabic: "حذف", English: "Delete" */}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  ) : (
    <h1 className="text-center flex items-center justify-center text-3xl font-bold min-h-[55vh]">
      {ar ? "السلة فارغة 😭" : "No products yet 😭"}
    </h1>
  );
};

export default Page;
