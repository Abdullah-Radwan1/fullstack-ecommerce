// app/api/order/route.ts (if using App Router)
import { NextResponse } from "next/server";
import { db } from "@/prisma/db";

// import purchaseReciept from "@/email/purchaseReciept";
import { getUser } from "@/lib/Functions";
// import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("resend key is not defined");
}
// const resend = new Resend(process.env.RESEND_API_KEY as string); // no export

export async function POST(req: Request) {
  const body = await req.json();
  const { total, streetAddress, phone, email, products } = body;
  if (!total || !streetAddress || !phone || !email || !products) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const user = await getUser(email);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const order = await db.order.create({
    data: {
      totalPrice: total / 100,
      streetAddress,
      phone,
      userId: user.id,
      orderItems: {
        create: products.map((product: { id: string; quantity: number }) => ({
          quantity: product.quantity,
          product: { connect: { id: product.id } },
        })),
      },
    },
    include: {
      orderItems: { include: { product: true } },
    },
  });
  if (!order) {
    return NextResponse.json({ error: "Order not created" }, { status: 500 });
  }
  // await resend.emails.send({
  //   from: `Support <${process.env.SENDER_EMAIL}>`,
  //   to: email,
  //   subject: "Vogue Haven Order Confirmation",
  //   react: purchaseReciept({
  //     order: {
  //       id: order.id,
  //       totalPrice: order.totalPrice,
  //       userId: order.userId,
  //       products: order.orderItems.map((product) => ({
  //         name: product.product.name,
  //         quantity: product.quantity,
  //         price: product.product.basePrice,
  //       })),
  //     },
  //   }),
  // });
  return NextResponse.json({
    message: "Order created successfully",
    status: 201,
  });
}
