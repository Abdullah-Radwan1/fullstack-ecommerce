import "../globals.css";
import { Navbar } from "@/components/navbar/Navebar";

import SessionProvider from "@/lib/auth/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/Authoptions";
import Sidebar from "@/components/sidebar/AppSidebar";
import { inter } from "@/app/font/font";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import Loading from "./loading";
// using next fotns
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
      // Apply the font variable here
      className={` ${inter.className} antialiased`}
      suppressHydrationWarning
      dir={lang === "ar" ? "rtl" : "ltr"}
      lang={lang}
    >
      <body>
        <SessionProvider session={session}>
          <Navbar />

          <Sidebar />
          <main className="max-w-[90%] lg:max-w-[75%] mx-auto ">
            {children}
            <Footer lang={lang} />
          </main>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
