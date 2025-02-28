// app/api/products/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const skip = (page - 1) * 1; // Pagination logic
  const take = 1;

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

  return NextResponse.json(products);
}
