import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import AddtoCart from "@/zustand/AddtoCart"; // Ensure this is a Client Component

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="mx-auto w-full my-4 flex flex-col items-start gap-1  cursor-pointer">
      {/* Image Container */}
      <Link className="min-w-[230px] w-full" href={`/product/${product.id}`}>
        <div className="cursor-pointer group relative bg-muted rounded-lg  h-52 flex items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            className="group-hover:scale-105 transition-transform duration-300 object-contain p-4  h-4/5 md:w-full md:h-full w-full"
            width={700}
            height={700}
          />
        </div>
      </Link>

      {/* Product Name */}
      <p className=" font-semibold pt-2 w-full truncate">{product.name}</p>

      {/* Product Description */}
      <p className="w-full text-xs text-muted-foreground max-sm:hidden line-clamp-2">
        {product.description}
      </p>

      {/* Price and Add to Cart Button */}
      <div className="flex items-center justify-between w-full mt-2">
        {/* Ensure AddtoCart is a Client Component */}
        <AddtoCart
          item={product}
          classname="border border-green-600 text-green-600 px-4 py-1 rounded-full "
          varient="outline"
        />
        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md ">
          ${Number(product.basePrice)}
        </span>
      </div>
    </div>
  );
}
