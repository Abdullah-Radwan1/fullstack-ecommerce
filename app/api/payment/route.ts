import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productsNames, totalPrice } = body;

    if (!productsNames || !totalPrice) {
      console.warn("🚨 Missing products or totalPrice");

      return NextResponse.json(
        { error: "Missing products or total price" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(totalPrice) * 100), // Stripe expects cents
      currency: "usd",
      metadata: {
        products: JSON.stringify(productsNames),
        totalPrice: totalPrice,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Stripe error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error("❌ Stripe error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
