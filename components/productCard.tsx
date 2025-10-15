import Image from "next/image";
import Link from "next/link";
import { Product } from "@/prisma/src/generated/client";
import AddtoCart from "@/zustand/AddtoCart"; // Client Component

export default function ProductCard({
  product,
  lang,
}: {
  product: Product;
  lang: string;
}) {
  const ar = lang === "ar";

  return (
    <div className="w-full my-4 flex flex-col gap-2 cursor-pointer min-h-full rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      {/* Image Container */}
      <Link
        className="w-full h-52 relative block"
        href={
          ar
            ? `/ar/products/product/${product.id}`
            : `/en/products/product/${product.id}`
        }
      >
        <div className="w-full h-full bg-card rounded-lg flex items-center justify-center overflow-hidden relative">
          <Image
            src={product.image}
            alt={product.name}
            className="object-contain h-full w-full p-2"
            width={700}
            height={700}
          />
        </div>
      </Link>

      {/* Product Name */}
      <p className="font-semibold pt-2 text-foreground truncate px-2">
        {product.name}
      </p>

      {/* Product Description */}
      <p className="w-full text-xs text-muted-foreground line-clamp-2 px-2 max-sm:hidden">
        {product.description}
      </p>

      {/* Price and Add to Cart Button */}
      <div className="flex items-center justify-between w-full mt-2 px-2">
        <AddtoCart item={product} classname="text-my-main " varient="outline" />
        <span className="bg-my-secondary text-background px-3 py-1 rounded-lg text-sm font-medium shadow-sm">
          ${Number(product.basePrice)}
        </span>
      </div>
    </div>
  );
}
