"use client";

import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";

export default function LogoutDialog({ ar }: { ar: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between border-destructive/30 text-destructive hover:bg-destructive hover:text-foreground transition-all"
        >
          <span>{ar ? "تسجيل الخروج" : "Sign Out"}</span>
          <LogOut className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {ar ? "هل أنت متأكد؟" : "Are you sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {ar
              ? "سيتم تسجيل خروجك من حسابك. يمكنك تسجيل الدخول مرة أخرى في أي وقت."
              : "You will be signed out of your account. You can sign back in anytime."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {ar ? "إلغاء" : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSignOut}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                {ar ? "جاري الخروج..." : "Signing out..."}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                {ar ? "تسجيل الخروج" : "Sign Out"}
              </span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
