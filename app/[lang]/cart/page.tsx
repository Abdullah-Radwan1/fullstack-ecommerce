"use client";

import { useMemo } from "react";
import useCartStore from "@/zustand/store";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Minus,
  Plus,
  X,
  ShoppingCart,
  Trash2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
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
  const { lang } = useParams<{ lang: string }>();
  const ar = lang === "ar";

  const {
    items: cartItems,
    removeCartItem,
    clearCart,
    removeItemFromCart,
    addCartItem,
    getTotalPrice,
    getQuantity,
  } = useCartStore();

  const totalPrice = useMemo(() => getTotalPrice(), [cartItems]);
  const totalItems = useMemo(() => getQuantity(), [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="relative mx-auto w-32 h-32">
            <div className="absolute inset-0 bg-gradient-to-r from-my-main/20 to-my-secondary/20 rounded-full blur-xl" />
            <ShoppingCart className="w-32 h-32 text-my-main/50 relative z-10" />
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-my-main to-my-secondary bg-clip-text text-transparent">
            {ar ? "السلة فارغة" : "Cart is Empty"}
          </h1>

          <p className="text-muted-foreground text-lg">
            {ar
              ? "ابدأ بإضافة بعض المنتجات الرائعة!"
              : "Start by adding some amazing products!"}
          </p>

          <Button
            asChild
            className="bg-gradient-to-r from-my-main to-my-secondary text-background hover:shadow-lg hover:scale-105 transition-all"
          >
            <Link href={ar ? "/ar/shop" : "/en/shop"}>
              <Sparkles className="w-4 h-4 mr-2" />
              {ar ? "التسوق الآن" : "Shop Now"}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-background p-4 md:p-8 ${ar ? "rtl" : "ltr"}`}
    >
      {/* background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-my-main/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-my-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">
              {ar ? "سلة التسوق" : "Shopping Cart"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {ar
                ? "راجع منتجاتك قبل الدفع"
                : "Review your products before checkout"}
            </p>
          </div>

          <Badge className="bg-gradient-to-r from-my-main/20 to-my-secondary/20 text-foreground border-my-main/30 px-4 py-2 text-lg">
            <ShoppingCart className="w-5 h-5 mr-2" />
            {totalItems} {ar ? "عنصر" : totalItems === 1 ? "item" : "items"}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart table */}
          <Card className="lg:col-span-2 border-border/40 bg-card/50 backdrop-blur-sm shadow-xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-my-main via-my-secondary to-my-main" />

            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-my-main/20 to-my-secondary/20 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-my-main" />
                </div>
                <h2 className="text-2xl font-bold">
                  {ar ? "المنتجات المختارة" : "Selected Products"}
                </h2>
              </div>
            </CardHeader>

            <CardContent className="p-0 md:p-6">
              {/* ✅ FIXED: Simplified horizontal scrolling */}
              <div className="overflow-x-auto">
                <Table className="min-w-[600px] lg:min-w-full">
                  <TableHeader className="bg-gradient-to-r from-my-main/10 to-my-secondary/10">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-bold py-4">
                        {ar ? "المنتج" : "Product"}
                      </TableHead>
                      <TableHead className="font-bold text-center py-4">
                        {ar ? "السعر" : "Price"}
                      </TableHead>
                      <TableHead className="font-bold text-center py-4">
                        {ar ? "الكمية" : "Quantity"}
                      </TableHead>
                      <TableHead className="font-bold text-center py-4">
                        {ar ? "الإجراءات" : "Actions"}
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow
                        key={item.id}
                        className="hover:bg-gradient-to-r hover:from-my-main/5 hover:to-my-secondary/5 transition-colors group"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border/40 shrink-0">
                              <Image
                                src={item.image}
                                alt={ar ? item.name_ar : item.name_en}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                                sizes="64px"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium truncate">
                                {ar ? item.name_ar : item.name_en}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ${item.basePrice} {ar ? "لكل" : "each"}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="text-center py-4">
                          <Badge className="bg-gradient-to-r from-my-main/20 to-my-secondary/20 border-my-main/30">
                            ${(item.basePrice * item.quantity!).toFixed(2)}
                          </Badge>
                        </TableCell>

                        <TableCell className="py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => removeCartItem(item.id)}
                              className="h-8 w-8"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="min-w-8 text-center font-bold">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => addCartItem(item)}
                              className="h-8 w-8"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>

                        <TableCell className="py-4">
                          <div className="flex justify-center">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => removeItemFromCart(item.id)}
                              className="h-8 w-8 hover:bg-destructive hover:text-white"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center pt-6">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-destructive/30 text-destructive hover:bg-destructive hover:text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {ar ? "تفريغ السلة" : "Clear Cart"}
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                      {ar ? "هل أنت متأكد؟" : "Are you sure?"}
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      {ar ? "إلغاء" : "Cancel"}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={clearCart}>
                      {ar ? "نعم، احذف" : "Yes, Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>

          {/* Summary */}
          <div>
            <Card className="sticky top-8 border-border/40 bg-card/50 backdrop-blur-sm shadow-xl">
              <div className="h-1 w-full bg-gradient-to-r from-my-main via-my-secondary to-my-main" />

              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-my-main" />
                  {ar ? "ملخص الطلب" : "Order Summary"}
                </h2>
              </CardHeader>

              <CardContent className="space-y-6">
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>{ar ? "الإجمالي" : "Total"}</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-my-main to-my-secondary text-background"
                >
                  <Link href={ar ? "/ar/checkout" : "/en/checkout"}>
                    {ar ? "المتابعة للدفع" : "Proceed to Checkout"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
