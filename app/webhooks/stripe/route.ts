import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const event = await stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (
      event.type === "charge.succeeded" ||
      event.type === "payment_intent.succeeded"
    ) {
      const charge = event.data.object as Stripe.Charge;
      const email = charge.billing_details?.email;
      const productsMetadata = charge.metadata?.products;

      if (!email || !productsMetadata) {
        return new NextResponse("Bad Request: Missing products or email", {
          status: 400,
        });
      }
    }

    return new NextResponse("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new NextResponse("Webhook processing failed", { status: 400 });
  }
}
