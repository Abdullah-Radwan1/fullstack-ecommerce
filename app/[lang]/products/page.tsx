import { getProducts } from "@/lib/functions/product/getProducts";
import ProductsClient from "./ProductClient";

export const revalidate = 60; // cache for 60s

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { products, hasMore } = await getProducts({ page: 1 });
  const { lang } = await params;
  return (
    <section className="container mx-auto min-h-[70vh] p-6 space-y-8">
      <h1 className="text-3xl text-center font-bold mb-4">
        {lang === "ar" ? " منتجاتك 💛 " : "Your Products 💛"}
      </h1>
      <ProductsClient
        lang={lang}
        initialProducts={products}
        hasMore={hasMore}
      />
    </section>
  );
}
