"use client";

import { SignUp } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Page = () => {
  const { lang } = useParams<{ lang: string }>();
  const ar = lang === "ar";

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-my-main/10 blur-[140px]" />
        <div className="absolute top-1/4 -left-32 h-72 w-72 rounded-full bg-my-main/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-72 w-72 rounded-full bg-my-secondary/5 blur-3xl" />
      </div>

      <Card className="relative w-full max-w-md overflow-hidden rounded-xl border border-border/50 bg-card/95 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur">
        {/* Top gold accent */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-my-main to-transparent shadow-[0_0_12px_var(--my-main)]" />

        <CardHeader className="space-y-3 pb-4 text-center">
          {/* Logo / mark */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-my-main/25 to-my-secondary/25">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-my-main to-my-secondary shadow-[0_0_15px_var(--my-main)]" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {ar ? "إنشاء حساب" : "Create account"}
          </h1>

          <p className="text-sm text-muted-foreground">
            {ar ? "انضم إلينا اليوم" : "Join us today"}
          </p>
        </CardHeader>

        <CardContent className="pt-2">
          <SignUp
            routing="path"
            path={`/${lang}/signup`}
            signInUrl={`/${lang}/signin`}
            redirectUrl={`/${lang}`}
            forceRedirectUrl={`/${lang}`}
            appearance={{
              elements: {
                card: "bg-transparent shadow-none",

                /* Badges (Last used, etc.) */
                badge: "bg-black/80 border border-white/20",
                badgeText: "!text-white font-medium",

                /* Divider */
                dividerLine: "bg-border/30",
                dividerText: "text-muted-foreground",

                /* Labels & text */
                formFieldLabel: "text-foreground font-medium",
                footerActionText: "text-muted-foreground",

                /* Inputs */
                formFieldInput:
                  "bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:border-my-main/50 focus:ring-my-main/20",

                /* Primary button */
                formButtonPrimary:
                  "bg-gradient-to-r from-my-main to-my-secondary text-background font-semibold shadow-[0_0_20px_var(--my-main)] hover:shadow-[0_0_35px_var(--my-main)] transition-all",

                /* Social buttons */
                socialButtonsBlockButton:
                  "border border-border/50 bg-card hover:border-my-main/50 hover:bg-my-main/5 transition-colors",
                socialButtonsBlockButtonText: "text-foreground font-medium",

                /* Footer link */
                footerActionLink:
                  "text-my-main hover:text-my-secondary font-medium",

                /* Hide Clerk headers */
                headerTitle: "hidden",
                headerSubtitle: "hidden",

                socialButtonsProviderIcon: "dark:invert",
              },

              variables: {
                /* 🔥 THIS is the most important part */
                colorPrimary: "hsl(var(--my-main))",
                colorText: "hsl(var(--foreground))",
                colorTextSecondary: "hsl(var(--muted-foreground))",
                colorBackground: "transparent",
                colorInputBackground: "hsl(var(--input))",
                colorInputText: "hsl(var(--foreground))",
                colorNeutral: "hsl(var(--foreground))",
                colorAlphaShade: "hsl(var(--foreground))",
                borderRadius: "0.75rem",
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
