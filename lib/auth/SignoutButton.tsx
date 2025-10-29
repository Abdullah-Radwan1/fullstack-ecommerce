"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <Button
      name="signout"
      variant="destructive"
      className="flex m-auto hover:scale-105 transition-transform my-4"
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
}
