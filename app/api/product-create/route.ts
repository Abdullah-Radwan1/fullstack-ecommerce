import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, description, basePrice, categoryId, image, userId } =
      await req.json();

    // Ensure required fields exist
    if (
      !name ||
      !description ||
      !basePrice ||
      !categoryId ||
      !image ||
      !userId
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Create product in database
    const productCount = await db.product.count({
      where: { userId },
    });
    if (productCount >= 2) {
      return NextResponse.json(
        { error: "You can only create 2 products" },
        { status: 400 }
      );
    }
    const product = await db.product.create({
      data: {
        name,
        description,
        basePrice: parseFloat(basePrice), // Ensure basePrice is a number
        categoryId: parseInt(categoryId), // Ensure categoryId is a number
        image,
      },
    });
    const linkProductToUser = await db.user.update({
      where: { id: userId },
      data: { products: { connect: { id: product.id } } },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
