import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { NavigationMenuDemo } from "@/components/header/Navebar";

import { getServerSession } from "next-auth";
import SessionProviders from "@/lib/SessionProvider";
import { ThemeProvider } from "@/lib/ThemeProvider";
import Footer from "@/components/footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

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
  const session = await getServerSession(); // Runs on the server

  const { lang } = await params;
  const title = lang === "ar" ? "ڤوجيه هاڤن" : "Vogue-Haven";

  return (
    <html
      className="system"
      suppressHydrationWarning
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
    >
      <head>
        {/* Apply the dynamic title */}
        <title>{title}</title>
      </head>
      <body className={roboto.variable}>
        <SessionProviders session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="sr-only ">das</div>
            <NavigationMenuDemo />
            {children}
          </ThemeProvider>
        </SessionProviders>
        <Footer params={params} />
      </body>
    </html>
  );
}
