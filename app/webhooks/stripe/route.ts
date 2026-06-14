import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/prisma/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature") as string;
    const event = await stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;

      if (!metadata) {
        return new NextResponse("Bad Request: Missing metadata", { status: 400 });
      }

      const { clerkId, streetAddress, phone, products } = metadata;

      if (!clerkId || !streetAddress || !phone || !products) {
        return new NextResponse("Bad Request: Missing order info in metadata", { status: 400 });
      }

      const parsedProducts = JSON.parse(products); // [{ id, quantity }]

      // Create order using Prisma
      const order = await db.order.create({
        data: {
          totalPrice: (session.amount_total ?? 0) / 100, // amount in USD
          streetAddress,
          phone,
          clerkId,
          OrderItem: {
            create: parsedProducts.map((p: { id: string; quantity: number }) => ({
              quantity: p.quantity,
              Product: { connect: { id: p.id } },
            })),
          },
        },
      });

    }

    return new NextResponse("Webhook processed successfully", { status: 200 });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return new NextResponse(`Webhook processing failed: ${error.message}`, { status: 400 });
  }
}
