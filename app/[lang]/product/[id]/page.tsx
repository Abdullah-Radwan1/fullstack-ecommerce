import { db } from "@/lib/db";
import React from "react";

import Image from "next/image";
import { assets } from "@/public/svg/assets";
import { Loader2 } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import ProductCard from "@/components/productCard";
import { relatedProducts } from "@/lib/Functions";
import AddtoCart from "@/zustand/AddtoCart";
import CheckoutButton from "../../checkout/components/CheckoutButton";

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

const Page = async ({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) => {
  const { id, lang } = await params;
  const ar = lang === "ar";

  const t = translations[lang]; // Get translations for the current language
  console.log(lang, "in cart");
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
              <Separator className="h-[0.2px] bg-gray-300 w-full" />
              <div className="flex items-center gap-2">
                <AddtoCart classname="flex-1" item={product} />

                <CheckoutButton lang={lang} />
              </div>
            </div>
          </div>
          <div className="relative flex-1 h-[300px] bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              loading="lazy" // Experimental lazy loading
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
      <Separator />
      {/* Related Products Section */}
      <h2 className="text-2xl font-bold mt-6">{t.relatedProducts}</h2>{" "}
      {/* Use translation for "Related Products" */}
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
        {relatedFunc.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Page;
