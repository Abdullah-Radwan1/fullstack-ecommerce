"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function signoutButton() {
  return (
    <Button
      name="sign-out"
      variant={"destructive"}
      className="m-auto flex hover:cursor-pointer hover:scale-105 transition ustify-center"
      onClick={async () => {
        await signOut();
      }}
    >
      Sign Out
    </Button>
  );
}
