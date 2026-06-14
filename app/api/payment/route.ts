import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  // Determine base URL with explicit scheme
  let baseUrl: string;
  const origin = req.headers.get('origin');
  if (origin && /^https?:\/\//i.test(origin)) {
    baseUrl = origin;
  } else {
    const host = req.headers.get('host') ?? 'localhost:3000';
    const protocol = req.headers.get('x-forwarded-proto') ?? 'http';
    baseUrl = `${protocol}://${host}`;
  }

  try {
    const { userId } = await auth();
    const body = await req.json();
    const { products, totalPrice, locale, streetAddress, phone } = body;

    if (!products || !products.length || !totalPrice || !streetAddress || !phone) {
      console.warn("🚨 Missing checkout parameters");

      return NextResponse.json(
        { error: "Missing required checkout parameters" },
        { status: 400 }
      );
    }

    const lineItems = products.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: locale === "ar" ? item.name_ar : item.name_en,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(Number(item.basePrice) * 100), // amount in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      metadata: {
        clerkId: userId || "",
        streetAddress,
        phone,
        products: JSON.stringify(products.map((p: any) => ({ id: p.id, quantity: p.quantity }))),
      },
      success_url: `${baseUrl}${locale ? `/${locale}` : ""}/checkout/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}${locale ? `/${locale}` : ""}/checkout`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Stripe error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error("❌ Stripe error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
