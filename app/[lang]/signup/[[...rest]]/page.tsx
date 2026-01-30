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
                badge: "bg-muted/80 border border-border",
                badgeText: "text-muted-foreground font-medium",

                /* Divider */
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground",

                /* Labels & text */
                formFieldLabel: "text-foreground font-medium",
                formFieldRadioLabelTitle__emailAddress: "ss",
                formFieldHintText: "text-muted-foreground/80",
                footerActionText: "text-muted-foreground",
                identityPreviewText: "text-foreground",
                formFieldSuccessText: "text-green-400",

                /* Inputs - WHITE BORDERS with dark theme fixes */
                formFieldInput:
                  "bg-input border border-white/30 text-foreground placeholder:text-muted-foreground/70 focus:border-white/70 focus:ring-white/20 transition-colors",

                /* Password strength indicator */
                formFieldSuccess: "text-green-400",
                formFieldWarning: "text-amber-400",
                formFieldError: "text-red-400",
                formFieldErrorText: "text-red-400",
                formFieldShowPasswordIcon: "text-foreground",
                formFieldAction: "text-my-main hover:text-my-secondary",

                /* Primary button */
                formButtonPrimary:
                  "bg-gradient-to-r from-my-main to-my-secondary text-background font-semibold shadow-[0_0_20px_var(--my-main)/30] hover:shadow-[0_0_35px_var(--my-main)/40] transition-all hover:opacity-90",

                /* Social buttons */
                socialButtonsBlockButton:
                  "border border-white/20 bg-card text-foreground hover:border-my-main/50 hover:bg-my-main/5 transition-colors",
                socialButtonsBlockButtonText: "text-foreground font-medium",
                socialButtonsBlockButtonArrow: "text-foreground",

                /* Footer link */
                footerActionLink:
                  "text-my-main hover:text-my-secondary font-medium transition-colors",

                /* Hide Clerk headers */
                headerTitle: "hidden",
                headerSubtitle: "hidden",

                /* Icons */
                socialButtonsProviderIcon:
                  "dark:invert-0 filter brightness-200",
                userButtonAvatarBox: "border-2 border-white/20",
                avatarBox: "border-2 border-white/20",
              },

              variables: {
                /* Colors for dark theme */
                colorPrimary: "#FFD700", // Your my-main gold

                colorDanger: "#ef4444",
                colorSuccess: "#10b981",
                colorWarning: "#f59e0b",
                colorText: "#f9f9f9", // Your foreground
                colorTextSecondary: "#bfbfbf", // Your muted-foreground
                colorTextOnPrimaryBackground: "#111", // Your background
                colorBackground: "transparent",
                colorInputBackground: "#1c1c1c", // Your card color
                colorInputText: "#f9f9f9", // Your foreground

                colorNeutral: "#f9f9f9", // Your foreground

                borderRadius: "0.75rem",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                fontWeight: {
                  normal: "400",
                  medium: "500",
                  semibold: "600",
                },
              },

              layout: {
                socialButtonsPlacement: "bottom",
                socialButtonsVariant: "blockButton",
                logoPlacement: "none",
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
