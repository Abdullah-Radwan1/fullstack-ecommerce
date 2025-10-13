"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function signoutButton() {
  return (
    <Button
      name="sign-out"
      variant={"destructive"}
      className="m-auto flex  justify-center"
      onClick={async () => {
        await signOut();
      }}
    >
      Sign Out
    </Button>
  );
}
