"use server";

import { db } from "@/prisma/db";
import { cache } from "react";

// Cache revalidation for 60 seconds
interface GetProductsParams {
  page?: number;
  search?: string;
  category?: string;
  min?: string;
  max?: string;
}

export const getProducts = cache(async function getProducts({
  page = 1,
  search = "",
  category = "",
  min,
  max,
}: GetProductsParams) {
  const categories =
    category && category !== "all"
      ? category.split(",").map((id) => parseInt(id))
      : [];

  const skip = (page - 1) * 8;
  const take = 8;

  const baseWhere = {
    AND: [
      {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
        ],
      },
      ...(categories.length > 0 && !category.includes("all")
        ? [{ categoryId: { in: categories } }]
        : []),
      ...(min ? [{ basePrice: { gte: parseFloat(min) } }] : []),
      ...(max ? [{ basePrice: { lte: parseFloat(max) } }] : []),
    ],
  };

  const products = await db.product.findMany({
    skip,
    take,
    where: baseWhere,
    orderBy: { createdAt: "desc" },
  });

  const nextPageProducts = await db.product.findMany({
    skip: skip + take,
    take: 1,
    where: baseWhere,
  });

  const hasMore = nextPageProducts.length > 0;

  return { products, hasMore };
});
