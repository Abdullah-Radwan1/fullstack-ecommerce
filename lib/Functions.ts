// Cached functions return plain JSON-serializable objects, solving the Prisma Decimal issue.
import { cache } from "./cache";
import { db } from "./db";
import { Product } from "@prisma/client";

export const first_10_products = cache(
  async () => {
    return await db.product.findMany({ take: 10 });
  },
  ["first_10_products"],
  { revalidate: 5 }
);

export const bestSellers = cache(
  async () => {
    return await db.product.findMany({
      take: 4,
      where: { orders: { some: {} } },
      orderBy: { orders: { _count: "desc" } },
      include: { orders: true },
    });
  },
  ["bestSellers"],
  { revalidate: 10 }
);

export async function createproduct({
  name,
  description,
  image,
  basePrice,
  categoryId,
}: Product) {
  const product = await db.product.create({
    data: {
      name,
      description,
      image,
      basePrice: basePrice,
      categoryId: categoryId,
    },
  });
  return product;
}

export const relatedProducts = cache(
  async (categoryId: number) => {
    return await db.product.findMany({
      where: { categoryId },
      take: 4,
    });
  },
  ["relatedProducts"],
  { revalidate: 10 }
);
