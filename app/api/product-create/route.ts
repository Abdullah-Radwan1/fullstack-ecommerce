import { NextResponse } from "next/server";
import { db } from "@/prisma/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const {
      name_ar,
      name_en,
      description_ar,
      description_en,
      basePrice,
      categoryId,
      image,
    } = await req.json();

    // Ensure required fields exist
    if (
      !name_ar ||
      !name_en ||
      !description_ar ||
      !description_en ||
      !basePrice ||
      !categoryId ||
      !image
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Limit products per user
    const productCount = await db.product.count({
      where: { userId },
    });

    if (productCount >= 2) {
      return NextResponse.json(
        { error: "You can only create 2 products" },
        { status: 400 },
      );
    }

    // Create product
    const product = await db.product.create({
      data: {
        name_ar,
        name_en,
        description_ar,
        userId: userId as string, // ✅ link to the user

        description_en,
        basePrice: parseFloat(basePrice),
        categoryId: parseInt(categoryId, 10),
        image,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
