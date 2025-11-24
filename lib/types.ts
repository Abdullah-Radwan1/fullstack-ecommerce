import { Product } from "./generated/prisma/browser";

export type selectedprismaProduct = Omit<
  Product,
  "createdAt" | "updatedAt" | "userId"
>;
