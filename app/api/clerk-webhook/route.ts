import { db } from "@/prisma/db";
import { updateClerkUserRole } from "@/lib/auth/clerk-utils";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let event: any;
  const hasSecret = !!process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  try {
    if (hasSecret) {
      // Production: verify webhook
      event = await verifyWebhook(req);
    } else {
      // Local dev: parse raw body without verification
      const rawBody = await req.text();
      event = JSON.parse(rawBody);
      console.warn("⚠️ Webhook signature verification DISABLED (local)");
    }
  } catch (err) {
    console.error("❌ Webhook verification/parsing failed:", err);
    return new NextResponse("Invalid webhook", { status: 400 });
  }


  // Only handle user.created
  if (event.type !== "user.created") {
    return new NextResponse("Ignored event", { status: 200 });
  }

  // ✅ Extract user data
  const userData = event.data;
  const clerkId = userData.id;
  const email = userData.email_addresses?.[0]?.email_address ?? null;
  const firstName = userData.first_name ?? "";
  const lastName = userData.last_name ?? "";
  const name = `${firstName} ${lastName}`.trim() || null;

  if (!clerkId) {
    console.error("❌ Missing clerk user id", JSON.stringify(event, null, 2));
    return new NextResponse("Missing user id", { status: 400 });
  }

  if (!email) {
    console.error("❌ Missing email", JSON.stringify(event, null, 2));
    return new NextResponse("Missing email", { status: 400 });
  }

  try {
    const dbUser = await db.user.upsert({
      where: { clerkId },
      update: { email, name },
      create: { clerkId, email, name, role: "USER" },
    });

    // Sync role to Clerk
    await updateClerkUserRole(clerkId, dbUser.role);



    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("❌ DB error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
