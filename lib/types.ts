import { Product } from "@/prisma/src/generated/client";

export type selectedprismaProduct = Omit<
  Product,
  "createdAt" | "updatedAt" | "userId"
>;
