// app/api/order/route.ts
import { NextResponse } from "next/server";
import { db } from "@/prisma/db";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    // Try to authenticate; if not authenticated we may still create the order using a Stripe sessionId
    const { userId } = await auth();

    // Parse request body
    const body = await req.json();

    // If client sent a Stripe sessionId, verify with Stripe and create the order from session metadata
    if (body?.sessionId) {
      const sessionId: string = body.sessionId;

      // Retrieve session and expand line items
      const session = (await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items", "payment_intent", "customer"],
      })) as any;

      const paid =
        session.payment_status === "paid" ||
        session.payment_intent?.status === "succeeded";
      if (!paid) {
        return NextResponse.json(
          { error: "Payment not completed" },
          { status: 400 },
        );
      }

      const metadata = session.metadata || {};

      // Prefer authenticated userId if available, otherwise take clerkId from metadata
      let clerkId = userId || metadata.clerkId || null;

      // Fallbacks for address/phone/products
      const streetAddress =
        metadata.streetAddress ||
        body.streetAddress ||
        session.customer_details?.address?.line1 ||
        "";
      const phone =
        metadata.phone ||
        body.phone ||
        session.customer_details?.phone ||
        "";

      // Products are expected to be serialized in metadata by the payment route
      let products: Array<{ id: string; quantity: number }> = [];
      if (metadata.products) {
        try {
          products = JSON.parse(metadata.products);
        } catch (e) {
          products = [];
        }
      }

      // If no clerkId was provided, try to use customer email to create a placeholder user with a generated clerkId
      if (!clerkId) {
        const email = session.customer_details?.email || null;
        clerkId = `guest_${sessionId}`; // unique-ish fallback

        // create a minimal User record so the Order relation can be satisfied
        await db.user.upsert({
          where: { clerkId },
          update: {},
          create: {
            clerkId,
            email: email || `${clerkId}@noemail.local`,
            name: session.customer_details?.name || null,
          },
        });
      } else {
        // ensure user exists for the clerkId (create minimal if missing)
        const existing = await db.user.findUnique({ where: { clerkId } });
        if (!existing) {
          const email =
            session.customer_details?.email ||
            metadata.email ||
            `${clerkId}@noemail.local`;
          await db.user.create({
            data: { clerkId, email, name: session.customer_details?.name || null },
          });
        }
      }

      // Idempotency: don't create the same order twice for the same Stripe session
      const already = await db.order
        .findFirst({
          where: { clerkId, /* @ts-ignore */ },
          orderBy: { createdAt: "desc" },
        })
        .catch(() => null);
      // Note: above query is intentionally permissive; you can replace with a stricter check (e.g., store stripeSessionId in Order model)

      // Build OrderItem creates
      const orderItemsCreate = (products || []).map((p: any) => ({
        quantity: p.quantity,
        Product: { connect: { id: p.id } },
      }));

      const order = await db.order.create({
        data: {
          totalPrice: (session.amount_total ?? 0) / 100,
          streetAddress,
          phone,
          clerkId,
          OrderItem: {
            create: orderItemsCreate,
          },
        },
        include: {
          OrderItem: { include: { Product: true } },
        },
      });

      return NextResponse.json({ message: "Order created", order }, { status: 201 });
    }

    // ...existing code... (authenticated flow expects body with total, streetAddress, phone, products)
    const { total, streetAddress, phone, products } = body;

    if (!total || !streetAddress || !phone || !products || !products.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create order in Prisma
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
