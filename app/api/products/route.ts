// app/api/products/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const skip = (page - 1) * 8; // Pagination logic
  const take = 8;

  const products = await db.product.findMany({
    skip,
    take,
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } }, // Search by name
        { description: { contains: search, mode: "insensitive" } }, // Search by description
      ],
      ...(category &&
        category !== "all" && {
          categoryId: parseInt(category), // Parse categoryId as a number
        }),
    },
    orderBy: { createdAt: "desc" }, // Sort by creation date
  });
  const nextPageProducts = await db.product.findMany({
    skip: skip + take,
    take: 1,
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
      ...(category &&
        category !== "all" && {
          categoryId: parseInt(category),
        }),
    },
  });
  const hasMore = nextPageProducts.length > 0;
  return NextResponse.json({ products, hasMore });
}
