import { db } from "@/prisma/db";
import { updateClerkUserRole } from "@/lib/auth/clerk-utils";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let event: any;

  const hasSecret = !!process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  try {
    if (hasSecret) {
      // ✅ Production: Clerk verifies + parses body
      event = await verifyWebhook(req);
    } else {
      // ⚠️ Local testing only (NO signature verification)
      const rawBody = await req.text();
      event = JSON.parse(rawBody);
      console.warn("⚠️ Webhook signature verification DISABLED (local)");
    }
  } catch (err) {
    console.error("❌ Webhook verification/parsing failed:", err);
    return new NextResponse("Invalid webhook", { status: 400 });
  }

  const eventType = event.type;
  const userData = event.data;

  // Only handle "user.created"
  if (eventType !== "user.created") {
    console.log("ℹ️ Ignored event:", eventType);
    return new NextResponse("Ignored event", { status: 200 });
  }

  // Extract user info from Clerk payload
  const clerkId = userData.id;
  const email = userData.email_addresses?.[0]?.email_address ?? null;
  const firstName = userData.first_name ?? "";
  const lastName = userData.last_name ?? "";
  const name = `${firstName} ${lastName}`.trim() || null;

  try {
    // Upsert user into Prisma DB
    const dbUser = await db.user.upsert({
      where: { clerkId },
      update: {
        email,
        name,
      },
      create: {
        clerkId,
        email,
        name,
        role: "USER",
      },
    });

    // Sync role to Clerk public metadata
    await updateClerkUserRole(clerkId, dbUser.role);

    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    return new NextResponse("Server error", { status: 500 });
  }
}
