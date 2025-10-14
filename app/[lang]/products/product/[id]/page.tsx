export const revalidate = 10;
import { db } from "@/prisma/db";
import React from "react";
import Image from "next/image";
import { assets } from "@/public/svg/assets";
import { Loader2 } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import ProductCard from "@/components/productCard";
import { relatedProducts } from "@/lib/Functions";
import AddtoCart from "@/zustand/AddtoCart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

// Translation dictionary
type Translations = {
  [key: string]: {
    productNotFound: string;
    quantity: string;
    addToCart: string;
    checkout: string;
    relatedProducts: string;
  };
};
const translations: Translations = {
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
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await db.product.findUnique({
    where: { id: id },
  });

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
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}
const Page = async ({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) => {
  const { id, lang } = await params;
  const ar = lang === "ar";

  const t = translations[lang]; // Get translations for the current language

  const product = await db.product.findUnique({
    where: { id: id },
  });

  if (product == null) {
    return <Loader2 />;
  }
  const relatedFunc = await relatedProducts(product.categoryId);

  return (
    <main className="max-w-[80%] mx-auto p-4" dir={ar ? "rtl" : "ltr"}>
      <div className="mx-auto">
        <div className="flex items-start lg:gap-16 gap-4  flex-col-reverse sm:flex-row">
          {/* Left column - Product Image */}
          {/* Right column - Product Details and Actions */}
          <div className="p-6 space-y-4 flex-1 w-full ">
            <div className="space-y-4">
              <h1 className="scroll-m-20 text-4xl  font-bold">
                {product.name}
              </h1>
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
              <p className="leading-7">{product.description}</p>
              <p className="text-3xl font-bold">
                ${Number(product.basePrice).toFixed(2)}
              </p>
            </div>

            <div className="space-y-4">
              <Separator className="h-[0.2px] bg-gray-200 w-full" />
              <div className="flex items-center gap-2">
                <AddtoCart classname="flex-1" item={product} />
                <Link
                  className="flex-1 "
                  href={ar ? `/ar/checkout` : `/en/checkout`}
                >
                  <Button
                    name="checkout"
                    className="w-full flex-1 bg-gradient-to-r from-my-main  to-my-secondary  text-white hover:opacity-80 transition "
                  >
                    {ar ? "الدفع" : "Checkout"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative h-[265px] flex-1  rounded-lg ">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              loading="lazy" // Experimental lazy loading
              className="object-contain py-2 w-full h-full"
            />
          </div>
        </div>
      </div>
      <Separator />
      {/* Related Products Section */}
      <h2 className="text-2xl font-bold mt-6">{t.relatedProducts}</h2>{" "}
      {/* Use translation for "Related Products" */}
      <div className="grid grid-cols-1 sm:grid-cols-2   lg:grid-cols-2 xl:grid-cols-3  2xl:grid-cols-4 gap-6 mt-6">
        {relatedFunc.map((product) => (
          <ProductCard lang={lang} key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Page;

// ✅ This tells Next.js to statically build these params (or ISR them if revalidate is set)
export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: { id: true },
  });

  // You can support both English and Arabic

  return products.flatMap((product) => [
    { id: product.id, lang: "en" },
    { id: product.id, lang: "ar" },
  ]);
}
