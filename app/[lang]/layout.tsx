import type { Metadata } from "next";

import "../globals.css";
import { NavigationMenuDemo } from "@/components/header/Navebar";

import { ThemeProvider } from "@/lib/ThemeProvider";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

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
      <body>
        {" "}
        {/* Apply the font class here */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="sr-only ">das</div>
          <NavigationMenuDemo />
          {children}
          <Toaster />
        </ThemeProvider>
        <Footer params={params} />
      </body>
    </html>
  );
}
