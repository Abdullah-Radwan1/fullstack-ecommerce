import { revalidatePath } from "next/cache";
import { cache } from "./cache";
import { db } from "./db";

export const first_10_products = cache(
  async () => {
    return await db.product.findMany({ take: 10 });
  },
  ["first_10_products"],
  { revalidate: 60 }
);

export const bestSellers = cache(
  async () => {
    return await db.product.findMany({
      take: 4,
      where: { orders: { some: {} } },
      orderBy: { orders: { _count: "desc" } },
      include: { sizes: true, orders: true },
    });
  },
  ["bestSellers"],
  { revalidate: 60 }
);
