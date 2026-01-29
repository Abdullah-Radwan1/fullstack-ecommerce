"use client";

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
  const { lang } = useParams();
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

  const totalPrice = getTotalPrice();
  const totalItems = getQuantity();

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
            className="mt-4 bg-gradient-to-r from-my-main to-my-secondary text-background hover:shadow-lg hover:scale-105 transition-all"
          >
            <Link href={ar ? "/ar/products" : "/en/products"}>
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
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-my-main/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-my-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Cart Stats */}
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
          {/* Cart Items Table */}
          <div className="lg:col-span-2">
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm shadow-xl">
              <div className="h-1 w-full bg-gradient-to-r from-my-main via-my-secondary to-my-main" />

              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-my-main/20 to-my-secondary/20 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-my-main" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    {ar ? "المنتجات المختارة" : "Selected Products"}
                  </h2>
                </div>
              </CardHeader>

              <CardContent>
                <div className="rounded-lg border border-border/30 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gradient-to-r from-my-main/10 to-my-secondary/10">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="font-bold text-foreground">
                          {ar ? "المنتج" : "Product"}
                        </TableHead>
                        <TableHead className="font-bold text-foreground text-center">
                          {ar ? "السعر" : "Price"}
                        </TableHead>
                        <TableHead className="font-bold text-foreground text-center">
                          {ar ? "الكمية" : "Quantity"}
                        </TableHead>
                        <TableHead className="font-bold text-foreground text-center">
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
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border/40">
                                <Image
                                  src={item.image}
                                  alt={ar ? item.name_ar : item.name_en}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {ar ? item.name_ar : item.name_en}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  ${item.basePrice} {ar ? "لكل" : "each"}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell className="text-center">
                            <Badge className="bg-gradient-to-r from-my-main/20 to-my-secondary/20 text-foreground border-my-main/30">
                              ${(item.basePrice * item.quantity!).toFixed(2)}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => removeCartItem(item.id)}
                                className="w-8 h-8 hover:bg-my-main/20 hover:text-my-main transition-all"
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
                                className="w-8 h-8 hover:bg-my-main/20 hover:text-my-main transition-all"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex justify-center">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => removeItemFromCart(item.id)}
                                className="hover:bg-destructive hover:text-white hover:border-destructive transition-all"
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

              {/* Clear Cart Button */}
              <CardFooter className="flex justify-center pt-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-destructive/30 text-destructive hover:bg-destructive hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {ar ? "تفريغ السلة" : "Clear Cart"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border-border/40">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-center">
                        {ar ? "هل أنت متأكد؟" : "Are you sure?"}
                      </AlertDialogTitle>
                      <p className="text-center text-muted-foreground">
                        {ar
                          ? "سيتم حذف جميع المنتجات من سلة التسوق"
                          : "All products will be removed from your cart"}
                      </p>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex gap-3">
                      <AlertDialogCancel className="border-border">
                        {ar ? "إلغاء" : "Cancel"}
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={clearCart}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        {ar ? "نعم، احذف" : "Yes, Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm shadow-xl sticky top-8">
              <div className="h-1 w-full bg-gradient-to-r from-my-main via-my-secondary to-my-main" />

              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-my-main" />
                  {ar ? "ملخص الطلب" : "Order Summary"}
                </h2>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded border border-border/40 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={ar ? item.name_ar : item.name_en}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {ar ? item.name_ar : item.name_en}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} × ${item.basePrice}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ${(item.basePrice * item.quantity!).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="bg-border/40" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {ar ? "الإجمالي الفرعي" : "Subtotal"}
                    </span>
                    <span className="font-medium">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {ar ? "الشحن" : "Shipping"}
                    </span>
                    <Badge variant="outline" className="border-my-main/30">
                      {ar ? "مجاني" : "FREE"}
                    </Badge>
                  </div>
                </div>

                <Separator className="bg-border/40" />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">
                    {ar ? "الإجمالي الكلي" : "Total Amount"}
                  </span>
                  <div className="text-right">
                    <p className="text-3xl font-bold bg-gradient-to-r from-my-main to-my-secondary bg-clip-text text-transparent">
                      ${totalPrice.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {ar ? "شامل الضريبة" : "Tax included"}
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-my-main to-my-secondary text-background hover:shadow-lg hover:scale-[1.02] transition-all py-6 text-lg"
                >
                  <Link href={ar ? `/ar/checkout` : `/en/checkout`}>
                    {ar ? "المتابعة للدفع" : "Proceed to Checkout"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Continue Shopping */}
            <Button
              asChild
              variant="outline"
              className="w-full mt-4 border-border hover:border-my-main hover:bg-my-main/10 transition-all"
            >
              <Link href={ar ? `/ar/products` : `/en/products`}>
                <Plus className="w-4 h-4 mr-2" />
                {ar ? "إضافة المزيد من المنتجات" : "Add More Products"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
