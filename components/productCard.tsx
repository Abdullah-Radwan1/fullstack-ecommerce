"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  console.log(product.image);
  return (
    <div className="space-y-4 m-auto max-w-sm hover:scale-105 transition duration-100 ease-in-out transform-gpu">
      {/* Image Container */}

      <div
        className="w-72 h-72 relative rounded-lg bg-muted cursor-pointer"
        onClick={() => router.push(`/product/${product.id}`)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain m-auto p-2"
          priority // or loading="lazy" depending on the use case
        />
      </div>

      <div className="flex justify-between">
        <div>
          <h3 className="text-lg">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
        <p className="text-lg font-semibold">{Number(product.basePrice)}$</p>
      </div>

      <div className="flex gap-4">
        <Button variant="ghost" size="icon" className="flex-shrink-0">
          <HeartIcon className="size-4" />
        </Button>
        <Button variant="ghost" className="w-full">
          <Link href={`/product/${product.id}`} className="w-full">
            Add to Cart
          </Link>
        </Button>
      </div>
    </div>
  );
}
