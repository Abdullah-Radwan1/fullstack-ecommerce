import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { Product } from "@prisma/client";

const product = {
  name: "Red Hat",
  href: "#",
  image: "https://bundui-images.netlify.app/products/04.jpeg",
  price: "$28",
  category: "Clothing",
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="   space-y-4 m-auto ">
      <figure className="group-hover:opacity-90">
        <Image
          className="w-full rounded-lg aspect-square bg-muted"
          src={product.image}
          width={200}
          height={300}
          alt={product.name}
        />
      </figure>
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
          <Link href={`/product/${product.id}`}>Add to Card</Link>
        </Button>
      </div>
    </div>
  );
}
