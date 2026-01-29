import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "@/prisma/db"; // your Prisma client

/**
 * Get the logged-in user from Clerk and upsert them into Neon DB via Prisma
 */
export async function getOrCreateUser() {
  const { userId } = await auth(); // get the logged-in user
  if (!userId) return null;

  // Get Clerk user info using server-side SDK
  // Clerk server API automatically resolves the user
  const { s } = await clerkClient();

  const email = clerkUser.primaryEmailAddress?.emailAddress || "";
  const name =
    clerkUser.firstName || clerkUser.lastName || clerkUser.fullName || "";
  const image = clerkUser.imageUrl || "";

  // Upsert into your Neon DB using Prisma
  const user = await db.user.upsert({
    where: { clerkId: userId },
    update: { email, name, image },
    create: { clerkId: userId, email, name, image },
  });

  return user;
}
