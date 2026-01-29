"use client";

import { SignIn } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Page = () => {
  const { lang } = useParams<{ lang: string }>();
  const ar = lang === "ar";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/40 bg-card dark:bg-card/90 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="mb-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-my-main/20 to-my-secondary/20 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-my-main to-my-secondary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {ar ? "تسجيل الدخول" : "Welcome Back"}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {ar ? "أدخل بياناتك للمتابعة" : "Sign in to continue"}
          </p>
        </CardHeader>

        <CardContent className="pt-4">
          <SignIn
            routing="path"
            path={`/${lang}/signin`}
            signUpUrl={`/${lang}/signup`}
            redirectUrl={`/${lang}`}
            forceRedirectUrl={`/${lang}`}
            appearance={{
              elements: {
                socialButtonsBlockButton:
                  "border-border hover:border-my-main/50 transition-colors !text-white",
                socialButtonsBlockButtonText: "text-white", // This targets the text specifically
                formButtonPrimary:
                  "bg-my-main hover:bg-my-secondary text-background font-medium transition-all",
                footerActionLink:
                  "text-my-main hover:text-my-secondary transition-colors",

                formFieldInput:
                  "border-border focus:border-my-main focus:ring-my-main/20",
                card: "shadow-none bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsProviderIcon: "dark:invert",
              },
              variables: {
                colorPrimary: "#ffd700", // my-main
                colorText: "hsl(var(--foreground))",
                colorBackground: "hsl(var(--card))",
                colorInputBackground: "hsl(var(--card))",
                colorInputText: "hsl(var(--foreground))",
              },
            }}
          />
        </CardContent>

        {/* Decorative border */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-my-main/30 to-transparent rounded-b-lg" />
      </Card>

      {/* Background accents */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-my-main/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-my-secondary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Page;
