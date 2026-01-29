/**
 * Utility to update a Clerk user's publicMetadata with role
 * This syncs your Prisma database role to Clerk so middleware can read it
 */

export async function updateClerkUserRole(
  clerkId: string,
  role: string = "USER",
) {
  const secretKey = process.env.CLERK_SECRET_KEY;

  if (!secretKey) {
    console.warn(
      "CLERK_SECRET_KEY not configured, skipping Clerk metadata update",
    );
    return;
  }

  try {
    const response = await fetch(`https://api.clerk.com/v1/users/${clerkId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_metadata: {
          role,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Failed to update Clerk metadata for ${clerkId}: ${error}`);
      return;
    }

    console.log(`Updated Clerk user ${clerkId} with role: ${role}`);
  } catch (err) {
    console.error("Error updating Clerk user metadata:", err);
  }
}
