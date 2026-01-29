"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";

export default function SignOutButton() {
  const { signOut } = useClerk();

  return (
    <Button
      variant="destructive"
      className="flex m-auto hover:scale-105 transition-transform my-4"
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
}
