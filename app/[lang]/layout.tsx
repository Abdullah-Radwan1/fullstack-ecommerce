import "../globals.css";
import { Navbar } from "@/components/navbar/Navebar";
import SessionProvider from "@/lib/auth/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/Authoptions";
import Sidebar from "@/components/sidebar/AppSidebar";
import { lato } from "@/app/font/font";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import Loading from "../loading";

export const metadata = {
  title: "Vogue-Haven Store",
  description: "Vogue-Haven - Your Fashion Destination",
};

export const revalidate = 10;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const session = await getServerSession(authOptions);
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
      <SessionProvider session={session}>
        <body className="flex min-h-screen flex-col">
          <Navbar />
          <Sidebar />
          <main className="flex-1  content-center">{children}</main>
          <Footer lang={lang} />
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
