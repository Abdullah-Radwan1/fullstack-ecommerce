import type { Metadata } from "next";

import "../globals.css";
import { NavigationMenuDemo } from "@/components/header/Navebar";

import { ThemeProvider } from "@/lib/ThemeProvider";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import SessionProvider from "@/lib/auth/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/Authoptions";

export const metadata: Metadata = {
  description: "Vogue Haven Ecommerce",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const title = lang === "ar" ? "ڤوجيه هاڤن" : "Vogue-Haven";
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <html
      // Apply the font variable here
      suppressHydrationWarning
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
    >
      <head>
        {/* Apply the dynamic title */}
        <title>{title}</title>
      </head>

      <body className=" min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <NavigationMenuDemo />

            {children}
          </SessionProvider>
          <Toaster />
        </ThemeProvider>

        <Footer lang={lang} />
      </body>
    </html>
  );
}
