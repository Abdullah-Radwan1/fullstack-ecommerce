import { db } from "@/prisma/db";
import { updateClerkUserRole } from "@/lib/auth/clerk-utils";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const raw = await req.clone().text();
  console.debug("Webhook raw body length:", raw?.length ?? 0);

  let evt: any;
  try {
    // Prefer verified event; this will throw if verification fails
    evt = await verifyWebhook(req);
  } catch (err) {
    console.error("Webhook verification failed:", err);

    // Development fallback: if webhook secret is not configured, try to parse raw body
    if (!process.env.CLERK_WEBHOOK_SECRET && raw) {
      try {
        evt = JSON.parse(raw);
        console.warn(
          "Using raw payload as event (no webhook secret configured)",
        );
      } catch (e) {
        console.error("Failed to parse raw body:", e);
        return new Response("Invalid payload", { status: 400 });
      }
    } else {
      return new Response("Error verifying webhook", { status: 400 });
    }
  }

  // Normalize event type and data for different Clerk payload shapes
  const eventType = evt.type ?? evt.event_type;
  const data = evt.data ?? evt.data?.object ?? evt.data?.attributes ?? evt;
  console.debug(
    "Clerk webhook event:",
    eventType,
    "data id:",
    data?.id ?? data?.user_id,
  );

  try {
    if (eventType === "user.created") {
      const id = data.id ?? evt.data?.id;

      // Try multiple common locations for emails and names
      const email =
        data.email_addresses?.[0]?.email_address ??
        data.primary_email_address ??
        data.email ??
        (Array.isArray(data.emails) ? data.emails[0]?.email : undefined) ??
        null;

      const first_name = data.first_name ?? data.firstName ?? data.given_name;
      const last_name = data.last_name ?? data.lastName ?? data.family_name;
      const name = `${first_name ?? ""} ${last_name ?? ""}`.trim() || undefined;

      if (!id) {
        console.error("No user id in webhook payload");
        return new Response("No user id", { status: 400 });
      }

      const user = await db.user.upsert({
        where: { clerkId: id },
        update: {
          email: email ?? undefined,
          name: name ?? undefined,
        },
        create: {
          clerkId: id,
          email: email ?? undefined,
          name: name ?? undefined,
          role: "USER", // Default role for new users
        },
      });

      // Sync role to Clerk publicMetadata
      await updateClerkUserRole(id, user.role);
      console.debug("Upserted user:", {
        clerkId: id,
        email: user.email,
        role: user.role,
      });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error handling webhook:", err);
    return new Response("Error handling webhook", { status: 500 });
  }
}
