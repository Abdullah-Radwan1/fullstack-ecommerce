export const revalidate = 10;

import { db } from "@/prisma/db";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductPageClient from "../ProductPageClient";
import { relatedProducts } from "@/lib/Functions";
import { getServerTranslator } from "@/lib/i18n/serverTranslator";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const t = await getServerTranslator();

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
        <h1 className="text-2xl font-bold mb-2">{t("productNotFound")}</h1>
        <p className="text-muted-foreground mb-6">{t("productUnavailable")}</p>
        <Button
          asChild
          className="bg-gradient-to-r from-my-main to-my-secondary text-background"
        >
          <Link href="/shop">{t("viewAllProducts")}</Link>
        </Button>
      </div>
    );

  const relatedFunc = await relatedProducts(product.categoryId);

  return <ProductPageClient product={product} relatedProducts={relatedFunc} />;
};

export default Page;
