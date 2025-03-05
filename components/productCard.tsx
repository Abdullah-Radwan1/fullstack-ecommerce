import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import AddtoCart from "@/lib/AddtoCart"; // Ensure this is a Client Component
import { Heart } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col items-start gap-1 max-w-[200px] w-full cursor-pointer">
      {/* Image Container */}
      <Link href={`/product/${product.id}`}>
        <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            className="group-hover:scale-105 transition-transform duration-300 object-contain w-4/5 h-4/5 md:w-full md:h-full"
            width={800}
            height={800}
          />
        </div>
      </Link>

      {/* Product Name */}
      <p className="md:text-base font-medium pt-2 w-full truncate">
        {product.name}
      </p>

      {/* Product Description */}
      <p className="w-full text-xs text-gray-500/70 max-sm:hidden line-clamp-2">
        {product.description}
      </p>

      {/* Price and Add to Cart Button */}
      <div className="flex items-center justify-between w-full mt-1">
        <p className="text-base font-medium">${Number(product.basePrice)}</p>
        {/* Ensure AddtoCart is a Client Component */}
        <AddtoCart item={product} classname="text-xs " varient="outline" />
      </div>
    </div>
  );
}
