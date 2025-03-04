import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import purchaseReciept from "@/email/purchaseReciept";
import { render } from "@react-email/components";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

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
      console.log("Received metadata:", productsMetadata);

      if (!email || !productsMetadata) {
        return new NextResponse("Bad Request: Missing products or email", {
          status: 400,
        });
      }

      try {
        let products;
        try {
          products = JSON.parse(productsMetadata);
        } catch (jsonError) {
          console.error("Invalid JSON format for products:", jsonError);
          return new NextResponse("Invalid product data format", {
            status: 400,
          });
        }

        const user = await db.user.upsert({
          where: { email },
          create: { email },
          update: {},
        });

        const order = await db.order.create({
          data: {
            totalPrice: charge.amount / 100,
            streetAddress: charge.billing_details?.address?.line1 || "s",
            phone: charge.billing_details?.phone || "s",
            userId: user.id,
            orderItems: {
              create: products.map((product: any) => ({
                quantity: product.quantity,
                product: { connect: { id: product.id } },
              })),
            },
          },
          include: {
            orderItems: { include: { product: true } },
          },
        });

        console.log("Order created successfully", order.id);

        await resend.emails.send({
          from: `Support <${process.env.SENDER_EMAIL}>`,
          to: email,
          subject: "Order Confirmation",
          react: purchaseReciept({
            order: {
              id: order.id,
              totalPrice: order.totalPrice,
              userId: order.userId,
              products: order.orderItems.map((item) => ({
                name: item.product.name,
                quantity: item.quantity,
                price: item.product.basePrice,
              })),
            },
          }),
        });

        console.log("Confirmation email sent to", email);
      } catch (parseError) {
        console.error("Error processing product data:", parseError);
        return new NextResponse("Invalid product data format", { status: 400 });
      }
    }

    return new NextResponse("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new NextResponse("Webhook processing failed", { status: 400 });
  }
}
