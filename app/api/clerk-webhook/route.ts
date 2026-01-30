import { db } from "@/prisma/db";
import { updateClerkUserRole } from "@/lib/auth/clerk-utils";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let event: any;
  const hasSecret = !!process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  try {
    if (hasSecret) {
      // ✅ Production: verify signature + parse body
      event = await verifyWebhook(req);
    } else {
      // ⚠️ Local development only
      const rawBody = await req.text();
      event = JSON.parse(rawBody);
      console.warn("⚠️ Clerk webhook signature verification DISABLED (local)");
    }
  } catch (err) {
    console.error("❌ Webhook verification/parsing failed:", err);
    return new NextResponse("Invalid webhook", { status: 400 });
  }

  console.log("📦 Clerk webhook event:", event.type);

  // ✅ We care about session.created
  if (event.type !== "session.created") {
    return new NextResponse("Ignored event", { status: 200 });
  }

  // ✅ Correct payload shape for session.created
  const user = event.data?.user;

  if (!user) {
    console.error("❌ session.created event missing user object");
    return new NextResponse("Invalid payload", { status: 400 });
  }

  const clerkId = user.id;
  const email = user.email_addresses?.[0]?.email_address ?? null;

  const firstName = user.first_name ?? "";
  const lastName = user.last_name ?? "";
  const name = `${firstName} ${lastName}`.trim() || null;

  if (!clerkId || !email) {
    console.error("❌ Missing required user fields", { clerkId, email });
    return new NextResponse("Missing user data", { status: 400 });
  }

  try {
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

    // 🔁 Sync role back to Clerk publicMetadata
    await updateClerkUserRole(clerkId, dbUser.role);

    console.log("✅ User synced successfully:", dbUser.id);

    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("❌ Database error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
