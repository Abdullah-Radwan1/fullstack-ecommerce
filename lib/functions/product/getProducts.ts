"use server";

import { db } from "@/prisma/db";
import { cache } from "react";

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
          { name_en: { contains: search, mode: "insensitive" as const } },
          { name_ar: { contains: search, mode: "insensitive" as const } },
          {
            description_en: { contains: search, mode: "insensitive" as const },
          },
          {
            description_ar: { contains: search, mode: "insensitive" as const },
          },
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
    select: {
      id: true,
      name_en: true,
      name_ar: true,
      description_en: true,
      description_ar: true,
      basePrice: true,
      image: true,
      categoryId: true,
    },
  });

  const nextPageProducts = await db.product.findMany({
    skip: skip + take,
    take: 1,
    where: baseWhere,
  });

  return {
    products,
    hasMore: nextPageProducts.length > 0,
  };
});
