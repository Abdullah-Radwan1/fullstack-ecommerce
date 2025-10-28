export const revalidate = 10;

import { db } from "@/prisma/db";
import React from "react";
import Image from "next/image";
import { assets } from "@/public/svg/assets";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/productCard";
import { relatedProducts } from "@/lib/Functions";
import AddtoCart from "@/zustand/AddtoCart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

// 🌍 Translation dictionary
const translations = {
  en: {
    productNotFound: "Product not found",
    quantity: "Quantity",
    addToCart: "Add to Cart",
    checkout: "Checkout",
    relatedProducts: "Related Products",
  },
  ar: {
    productNotFound: "المنتج غير موجود",
    quantity: "الكمية",
    addToCart: "أضف إلى السلة",
    checkout: "الدفع",
    relatedProducts: "منتجات ذات صلة",
  },
} as const;

// 🧠 Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await db.product.findUnique({ where: { id } });

  if (!product) {
    return {
      title: "Product Not Found - Vogue Haven",
      description: "This product does not exist in the store.",
    };
  }

  return {
    title: `${product.name} - Vogue Haven`,
    description: product.description || "Find out more about this product.",
    openGraph: {
      title: `${product.name} - Vogue Haven`,
      description: product.description || "Check out this product.",
      images: [
        { url: product.image, width: 800, height: 600, alt: product.name },
      ],
    },
  };
}

// 🧩 Page Component
const Page = async ({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) => {
  const { id, lang } = await params;
  const ar = lang === "ar";
  const t = translations[lang as keyof typeof translations];

  const product = await db.product.findUnique({ where: { id } });
  if (!product)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <Loader2 className="animate-spin mb-4" />
        <p className="text-lg text-muted-foreground">{t.productNotFound}</p>
      </div>
    );

  const relatedFunc = await relatedProducts(product.categoryId);

  return (
    <main className="max-w-[80%] mx-auto p-4" dir={ar ? "rtl" : "ltr"}>
      <section className="flex flex-col-reverse sm:flex-row items-start lg:gap-16 gap-4">
        {/* ✅ Product Details */}
        <div className="p-6 space-y-4 flex-1 w-full">
          <h1 className="scroll-m-20 text-4xl font-bold">{product.name}</h1>

          {/* Rating (static demo) */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                className="h-4 w-4"
                src={
                  index < Math.floor(4)
                    ? assets.star_icon
                    : assets.star_dull_icon
                }
                alt="star_icon"
              />
            ))}
          </div>

          <p className="leading-7 text-muted-foreground">
            {product.description}
          </p>

          <p className="text-3xl font-bold">
            ${Number(product.basePrice).toFixed(2)}
          </p>

          <Separator className="h-[0.2px] bg-gray-200 w-full my-4" />

          <div className="flex items-center gap-2">
            <AddtoCart
              classname="flex-1 bg-my-main hover:bg-my-main/90"
              item={product}
            />
            <Link
              href={ar ? `/ar/checkout` : `/en/checkout`}
              className="flex-1"
            >
              <Button
                name="checkout"
                className="w-full bg-my-secondary hover:bg-my-secondary/90"
              >
                {t.checkout}
              </Button>
            </Link>
          </div>
        </div>

        {/* ✅ Product Image */}
        <div className="relative h-[265px] flex-1 flex justify-center items-center">
          <Image
            src={product.image}
            alt={product.name || "Product image"}
            width={500}
            height={500}
            loading="lazy"
            className="object-contain w-full h-full"
          />
        </div>
      </section>

      {/* ✅ Related Products */}
      <Separator className="my-8" />
      <h2 className="text-2xl font-bold mb-4">{t.relatedProducts}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {relatedFunc.length > 0 ? (
          relatedFunc.map((related) => (
            <ProductCard key={related.id} product={related} lang={lang} />
          ))
        ) : (
          <p className="text-muted-foreground">
            {ar ? "لا توجد منتجات ذات صلة." : "No related products found."}
          </p>
        )}
      </div>
    </main>
  );
};

export default Page;

// ✅ ISR Static Params
export async function generateStaticParams() {
  const products = await db.product.findMany({ select: { id: true } });

  return products.flatMap((product) => [
    { id: product.id, lang: "en" },
    { id: product.id, lang: "ar" },
  ]);
}
