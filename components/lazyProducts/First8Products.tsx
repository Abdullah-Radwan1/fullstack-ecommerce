import { getFirst8Products } from "@/lib/Functions";
import ProductCard from "@/components/productCard";

export default async function First8Products({ lang }: { lang: string }) {
  const products = await getFirst8Products();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} lang={lang} />
      ))}
    </div>
  );
}
