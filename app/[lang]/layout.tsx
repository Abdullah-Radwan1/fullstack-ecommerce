import "../globals.css";
import { Navbar } from "@/components/navbar/Navebar";
import Sidebar from "@/components/sidebar/AppSidebar";
import { lato } from "@/app/font/font";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import Loading from "../loading";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Vogue-Haven Store",
  description: "Vogue-Haven - Your Fashion Destination",
};

export const revalidate = 10;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // ✅ Correct typing
}) {
  const { lang } = await params; // ✅ await the dynamic params
  const Footer = dynamic(() => import("@/components/footer"), {
    loading: () => <Loading />,
  });

  return (
    <html
      className={`${lato.className} antialiased`}
      suppressHydrationWarning
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
    >
      <ClerkProvider>
        <body className="flex min-h-screen flex-col">
          <Sidebar />

          <Navbar />
          <main className="flex-1 content-center">{children}</main>

          <Footer lang={lang} />
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
