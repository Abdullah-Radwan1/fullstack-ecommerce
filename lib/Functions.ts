import { cache } from "./cache";
import { db } from "./db";

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
