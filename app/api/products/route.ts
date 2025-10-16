import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const search = (searchParams.get("search") || "").trim();

  const categoryParam = searchParams.get("category") || "";
  // category=1,2,3  → convert to [1,2,3]
  const categories =
    categoryParam && categoryParam !== "all"
      ? categoryParam.split(",").map((id) => parseInt(id))
      : [];

  // Price range
  const minPrice = searchParams.get("min");
  const maxPrice = searchParams.get("max");

  const skip = (page - 1) * 8;
  const take = 8;
  // 🧠 Build Prisma `where` condition dynamically
  const baseWhere = {
    AND: [
      {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
        ],
      },
      // ✅ Categories filter (if provided)
      ...(categories.length > 0 && !categoryParam.includes("all")
        ? [{ categoryId: { in: categories } }]
        : []),

      // ✅ Price filters (only apply if numeric)
      ...(minPrice ? [{ basePrice: { gte: parseFloat(minPrice) } }] : []),
      ...(maxPrice ? [{ basePrice: { lte: parseFloat(maxPrice) } }] : []),
    ],
  };

  // 🔹 Fetch products for the current page
  const products = await db.product.findMany({
    skip,
    take,
    where: baseWhere,
    orderBy: { createdAt: "desc" },
  });

  // 🔹 Check if there are more products for pagination
  const nextPageProducts = await db.product.findMany({
    skip: skip + take,
    take: 1,
    where: baseWhere,
  });

  const hasMore = nextPageProducts.length > 0;

  return NextResponse.json({ products, hasMore });
}
