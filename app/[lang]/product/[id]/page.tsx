import { db } from "@/lib/db";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "@/components/Link";
import { Loader2 } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import ProductCard from "@/components/productCard";
import { relatedProducts } from "@/lib/Functions";
import AddtoCart from "@/lib/AddtoCart";

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
      <Card className="mx-auto">
        <CardContent className="p-0">
          <div className="flex items-center justify-start g flex-col sm:flex-row">
            {/* Left column - Product Image */}
            {/* Right column - Product Details and Actions */}
            <div className="p-6 space-y-4 flex-1">
              <div className="space-y-4">
                <h1 className="scroll-m-20 text-4xl font-bold">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold">
                  ${Number(product.basePrice).toFixed(2)}
                </p>
                <p className="leading-7">{product.description}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.quantity}</label>{" "}
                  {/* Use translation for "Quantity" */}
                  <Input type="number" min="1" defaultValue="1" />
                </div>

                <AddtoCart item={product} />

                <Link
                  className="w-full bg-muted m-auto mt-8"
                  href={
                    ar
                      ? `/ar/product/${id}/checkout`
                      : `/en/product/${id}/checkout`
                  }
                >
                  <Button className="w-full mt-3" size="lg">
                    {t.checkout} {/* Use translation for "Checkout" */}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative flex-1 h-[400px] bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                width={1000}
                height={1000}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Separator />
      {/* Related Products Section */}
      <h2 className="text-2xl font-bold mt-6">{t.relatedProducts}</h2>{" "}
      {/* Use translation for "Related Products" */}
      <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-6">
        {relatedFunc.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Page;
