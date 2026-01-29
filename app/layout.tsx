import "./globals.css";
import { lato } from "@/app/font/font";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Vogue-Haven Store",
  description: "Vogue-Haven - Your Fashion Destination",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${lato.className} antialiased`} suppressHydrationWarning>
      <ClerkProvider>
        <body className="flex min-h-screen flex-col">{children}</body>
      </ClerkProvider>
    </html>
  );
}
