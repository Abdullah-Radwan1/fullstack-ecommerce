// app/api/order/route.ts
import { NextResponse } from "next/server";
import { db } from "@/prisma/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    // ✅ Get the logged-in user
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Parse request body
    const body = await req.json();
    const { total, streetAddress, phone, products } = body;

    if (!total || !streetAddress || !phone || !products || !products.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // ✅ Create order in Prisma
    const order = await db.order.create({
      data: {
        totalPrice: total / 100,
        streetAddress,
        phone,
        clerkId: userId, // Clerk ID from auth

        // Order items
        OrderItem: {
          create: products.map((p: { id: string; quantity: number }) => ({
            quantity: p.quantity,
            Product: { connect: { id: p.id } },
          })),
        },
      },
      include: {
        OrderItem: { include: { Product: true } },
      },
    });

    return NextResponse.json(
      { message: "Order created", order },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { error: "Failed to create order", details: err.message },
      { status: 500 },
    );
  }
}
