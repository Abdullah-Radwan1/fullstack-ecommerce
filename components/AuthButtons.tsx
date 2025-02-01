"use client";

import { signOut } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Pages, Routes } from "@/lib/enums";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

function AuthButtons() {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { lang } = useParams();  // Changed from 'locale' to 'lang'

  // Manual translations based on lang
  const loginText = lang === "ar" ? "تسجيل الدخول" : "Login";
  const registerText = lang === "ar" ? "إنشاء حساب" : "Register";
  const signOutText = lang === "ar" ? "تسجيل الخروج" : "Sign Out";

  return (
    <div>
      {session.data?.user && (
        <div className="flex items-center gap-10">
          <Button className="!px-8 !rounded-full" size="lg" onClick={() => signOut()}>
            {signOutText}  {/* Button text based on lang */}
          </Button>
        </div>
      )}
      {!session.data?.user && (
        <div className="flex items-center gap-6">
          <Button
            className={`${
              pathname.startsWith(`/${lang}/${Routes.AUTH}/${Pages.LOGIN}`)
                ? "text-primary"
                : "text-accent"
            } hover:text-primary duration-200 transition-colors font-semibold hover:no-underline !px-0`}
            size="lg"
            variant="link"
            onClick={() => router.push(`/${lang}/${Routes.AUTH}/${Pages.LOGIN}`)}
          >
            {loginText}  {/* Button text based on lang */}
          </Button>
          <Button
            className="!px-8 !rounded-full"
            size="lg"
            onClick={() => router.push(`/${lang}/${Routes.AUTH}/${Pages.Register}`)}
          >
            {registerText}  {/* Button text based on lang */}
          </Button>
        </div>
      )}
    </div>
  );
}

export default AuthButtons;
