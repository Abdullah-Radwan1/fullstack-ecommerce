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
import Link from "next/link";

const Page = () => {
  const { lang } = useParams();
  const ar = lang === "ar";

  const {
    items: cartItems,
    removeCartItem,
    clearCart,
    removeItemFromCart,
    addCartItem,
    getTotalPrice,
  } = useCartStore();

  const totalPrice = getTotalPrice();

  return cartItems.length > 0 ? (
    <div
      className={`p-6 flex flex-col items-center min-h-[80vh] ${
        ar ? "rtl" : "ltr"
      }`}
    >
      {/* Title */}
      <h1 className="text-3xl font-extrabold mb-8 text-my-main tracking-wide">
        {ar ? "منتجاتي" : "My Products"}
      </h1>

      <div className="w-full max-w-5xl bg-card rounded-xl shadow-lg p-4 border border-border animate-slide-up">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/20">
              <TableHead className="text-center text-my-main">
                {ar ? "الاسم" : "Name"}
              </TableHead>
              <TableHead className="text-center text-my-main">
                {ar ? "الصورة" : "Image"}
              </TableHead>
              <TableHead className="text-center text-my-main">
                {ar ? "السعر" : "Price"}
              </TableHead>
              <TableHead className="text-center text-my-main">
                {ar ? "الكمية" : "Quantity"}
              </TableHead>
              <TableHead className="text-center text-my-main">
                {ar ? "الإجراءات" : "Actions"}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cartItems.map((item) => (
              <TableRow
                key={item.id}
                className="text-center hover:bg-muted/10 transition-colors"
              >
                <TableCell className="font-semibold">
                  {ar ? item.name_ar : item.name_en}
                </TableCell>
                <TableCell className="flex justify-center">
                  <Image
                    src={item.image}
                    alt={ar ? item.name_ar : item.name_en}
                    width={100}
                    height={100}
                    className="w-16 h-16 object-contain rounded-md border border-border bg-background"
                  />
                </TableCell>
                <TableCell className="text-my-main font-medium">
                  ${item.basePrice}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      aria-label="decrease"
                      variant="outline"
                      size="sm"
                      onClick={() => removeCartItem(item.id)}
                      className="hover:bg-my-main/20 hover:text-my-main transition"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Button
                      aria-label="add to cart"
                      variant="outline"
                      size="sm"
                      onClick={() => addCartItem(item)}
                      className="hover:bg-my-main/20 hover:text-my-main transition"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      aria-label="remove item"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItemFromCart(item.id)}
                      className="hover:bg-destructive hover:text-white transition"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableCaption>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
              <h1 className="text-2xl font-bold text-my-main">
                {ar ? "الإجمالي" : "Total"}:{" "}
                <span className="text-foreground">${totalPrice}</span>
              </h1>
              <Button
                className="bg-my-main text-background hover:bg-accent transition"
              >
                <Link
                  href={ar ? `/ar/checkout` : `/en/checkout`}
                >
                  {ar ? "الدفع" : "Checkout"}
                </Link>
              </Button>
            </div>
          </TableCaption>
        </Table>

        {/* Clear Cart Dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="mx-auto mt-6 flex items-center hover:bg-destructive hover:text-white transition"
            >
              {ar ? "تفريغ السلة" : "Clear Cart"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center text-lg font-semibold">
                {ar ? "هل تريد تفريغ السلة؟" : "Do you want to clear the cart?"}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex gap-2 m-auto">
              <AlertDialogCancel>{ar ? "إلغاء" : "Cancel"}</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-white hover:opacity-90"
                onClick={clearCart}
              >
                {ar ? "حذف" : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  ) : (
    <h1 className="text-center flex items-center justify-center text-3xl font-bold min-h-[55vh] text-my-main ">
      {ar ? "السلة فارغة 😭" : "No products yet 😭"}
    </h1>
  );
};

export default Page;
