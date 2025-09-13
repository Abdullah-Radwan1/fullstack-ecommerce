import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = (searchParams.get("search") || "").trim();
  const category = searchParams.get("category") || "";
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
      ...(category && category !== "all"
        ? [{ categoryId: parseInt(category) }]
        : []),
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

  return NextResponse.json({ products, hasMore });
}
