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

import { useLocale, useTranslations } from "next-intl";

export default function LogoutDialog() {
  const locale = useLocale();
  const t = useTranslations("SignOut");
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useClerk();

  const isArabic = locale === "ar";

  const handleSignOut = async (e: React.MouseEvent) => {
    // Prevent the dialog from closing prematurely if needed
    e.preventDefault();
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
          <span>{t("signOut")}</span>
          <LogOut className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent dir={isArabic ? "rtl" : "ltr"}>
        <AlertDialogHeader className={isArabic ? "text-right" : "text-left"}>
          <AlertDialogTitle>{t("areYouSure")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("logoutDescription")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel disabled={isLoading}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSignOut}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                {t("signingOut")}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogOut className={`w-4 h-4 ${isArabic ? "rotate-180" : ""}`} />
                {t("signOut")}
              </span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
