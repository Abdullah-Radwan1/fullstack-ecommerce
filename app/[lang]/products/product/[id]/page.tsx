export const revalidate = 10;

import { db } from "@/prisma/db";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Package,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/productCard";
import AddtoCart from "@/zustand/AddtoCart";
import { relatedProducts } from "@/lib/Functions";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

const translations = {
  en: {
    productNotFound: "Product not found",
    quantity: "Quantity",
    addToCart: "Add to Cart",
    checkout: "Checkout",
    relatedProducts: "Related Products",
    noRelated: "No related products found.",
    inStock: "In Stock",
    freeShipping: "Free Shipping",
    daysReturn: "30-Day Return",
    warranty: "1 Year Warranty",
    description: "Description",
    specifications: "Specifications",
    share: "Share",
    addToWishlist: "Add to Wishlist",
  },
  ar: {
    productNotFound: "المنتج غير موجود",
    quantity: "الكمية",
    addToCart: "أضف إلى السلة",
    checkout: "الدفع",
    relatedProducts: "منتجات ذات صلة",
    noRelated: "لا توجد منتجات ذات صلة.",
    inStock: "متوفر",
    freeShipping: "شحن مجاني",
    daysReturn: "إرجاع 30 يوم",
    warranty: "ضمان سنة واحدة",
    description: "الوصف",
    specifications: "المواصفات",
    share: "مشاركة",
    addToWishlist: "إضافة للمفضلة",
  },
} as const;

const Page = async ({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) => {
  const { lang, id } = await params;
  const ar = lang === "ar";
  const t = translations[lang as keyof typeof translations];

  const product = await db.product.findUnique({
    where: { id },
    select: {
      id: true,
      name_ar: true,
      name_en: true,
      description_ar: true,
      description_en: true,
      basePrice: true,
      image: true,
      categoryId: true,
      createdAt: true,
    },
  });

  if (!product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <div className="relative w-32 h-32 mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-my-main/10 to-my-secondary/10 rounded-full blur-xl" />
          <Loader2 className="w-32 h-32 text-my-main animate-spin relative z-10" />
        </div>
        <h1 className="text-2xl font-bold mb-2">{t.productNotFound}</h1>
        <p className="text-muted-foreground mb-6">
          {ar
            ? "المنتج غير متوفر حالياً"
            : "This product is currently unavailable"}
        </p>
        <Button
          asChild
          className="bg-gradient-to-r from-my-main to-my-secondary text-background"
        >
          <Link href={ar ? "/ar/products" : "/en/products"}>
            {ar ? "عرض جميع المنتجات" : "View All Products"}
          </Link>
        </Button>
      </div>
    );

  const relatedFunc = await relatedProducts(product.categoryId);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-my-main/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-my-secondary/5 rounded-full blur-3xl" />
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href={ar ? "/ar" : "/en"}
            className="hover:text-my-main transition-colors"
          >
            {ar ? "الرئيسية" : "Home"}
          </Link>
          <span>/</span>
          <Link
            href={ar ? "/ar/products" : "/en/products"}
            className="hover:text-my-main transition-colors"
          >
            {ar ? "المتجر" : "Shop"}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">
            {ar ? product.name_ar : product.name_en}
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left: Image & Features */}
          <div className="flex flex-col space-y-6 h-full">
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden flex-1">
              <div className="h-1 w-full bg-gradient-to-r from-my-main via-my-secondary to-my-main" />
              <CardContent className="p-8 flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-lg">
                  <Image
                    src={product.image}
                    alt={ar ? product.name_ar : product.name_en}
                    fill
                    priority
                    className="object-contain transition-transform duration-500 hover:scale-105"
                  />
                  {Date.now() - new Date(product.createdAt).getTime() <
                    7 * 24 * 60 * 60 * 1000 && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-my-main to-my-secondary text-background border-none">
                      {ar ? "جديد" : "NEW"}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[t.freeShipping, t.daysReturn, t.warranty].map((label, idx) => {
                const icons = [Truck, RotateCcw, Shield];
                const Icon = icons[idx];
                return (
                  <Card
                    key={label}
                    className="border-border/30 bg-card/30 text-center p-4"
                  >
                    <Icon className="w-6 h-6 text-my-main mx-auto mb-2" />
                    <p className="text-sm font-medium">{label}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right: Details & Actions */}
          <div
            className="flex flex-col space-y-8 h-full"
            dir={ar ? "rtl" : "ltr"}
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {ar ? product.name_ar : product.name_en}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? "fill-my-main text-my-main" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.5)</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <p className="text-4xl font-bold bg-gradient-to-r from-my-main to-my-secondary bg-clip-text text-transparent">
                  ${Number(product.basePrice).toFixed(2)}
                </p>
                <Badge variant="outline" className="border-my-main/30">
                  {ar ? "شامل الضريبة" : "Tax Included"}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{t.description}</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {ar ? product.description_ar : product.description_en}
              </p>
            </div>

            <Separator className="bg-border/40" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AddtoCart
                classname="w-full py-6 text-lg bg-gradient-to-r from-my-main to-my-secondary text-background hover:shadow-lg hover:scale-105 transition-all"
                item={product}
              />
              <Link
                href={ar ? "/ar/checkout" : "/en/checkout"}
                className="w-full"
              >
                <Button className="w-full py-6 text-lg bg-gradient-to-r from-my-secondary to-accent text-background hover:shadow-lg hover:scale-105 transition-all">
                  {t.checkout}
                </Button>
              </Link>
            </div>

            <Card className="border-border/40 bg-card/30 mt-auto">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">{t.specifications}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      label: ar ? "السعر" : "Price",
                      value: `$${Number(product.basePrice).toFixed(2)}`,
                    },
                    { label: ar ? "الحالة" : "Status", value: t.inStock },
                    {
                      label: ar ? "تاريخ الإضافة" : "Added",
                      value: new Date(product.createdAt).toLocaleDateString(
                        lang,
                        { year: "numeric", month: "short", day: "numeric" },
                      ),
                    },
                    {
                      label: ar ? "آخر تحديث" : "Last Updated",
                      value: new Date(product.createdAt).toLocaleDateString(
                        lang,
                        { month: "short", day: "numeric" },
                      ),
                    },
                  ].map((spec) => (
                    <div key={spec.label}>
                      <p className="text-sm text-muted-foreground">
                        {spec.label}
                      </p>
                      <p className="font-medium">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-my-main to-my-secondary rounded-full" />
              {t.relatedProducts}
            </h2>
            <Link
              href={ar ? "/ar/products" : "/en/products"}
              className="text-my-main hover:text-my-secondary transition-colors flex items-center gap-2"
            >
              {ar ? "عرض الكل" : "View All"}
              <ArrowRight className={`w-4 h-4 ${ar ? "rotate-180" : ""}`} />
            </Link>
          </div>

          {relatedFunc.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedFunc.map((related) => (
                <ProductCard key={related.id} product={related} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-my-main/10 to-my-secondary/10 flex items-center justify-center">
                <Package className="w-12 h-12 text-my-main/50" />
              </div>
              <p className="text-muted-foreground">{t.noRelated}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
