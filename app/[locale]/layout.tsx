import "../globals.css";
import { Navbar } from "@/components/navbar/Navebar";

import { lato } from "@/app/font/font";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import Loading from "../loading";
import { ClerkProvider } from "@clerk/nextjs";
import { arSA, enUS } from "@clerk/localizations";
import type { DeepPartial, LocalizationResource } from "@clerk/types";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const Footer = dynamic(() => import("@/components/footer"), {
    loading: () => <Loading />,
  });
  const Sidebar = dynamic(() => import("@/components/sidebar/AppSidebar"), {
    loading: () => <Loading />,
  });
  const ar = locale === "ar";

  const localization = (
    ar
      ? {
          ...arSA,

          formFieldLabel__emailAddress: "البريد الإلكتروني",
          formFieldLabel__password: "كلمة المرور",
          formFieldLabel__username: "اسم المستخدم",

          formFieldInputPlaceholder__emailAddress: "example@email.com",
          formFieldInputPlaceholder__password: "••••••••",
          formFieldInputPlaceholder__username: "abdullah",

          signUp: {
            title: "إنشاء حساب",
            subtitle: "انضم إلينا اليوم",
          },
        }
      : enUS
  ) as DeepPartial<LocalizationResource>;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html
      className={`${lato.className} antialiased`}
      suppressHydrationWarning
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
    >
      <ClerkProvider localization={localization}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <body className="flex min-h-screen flex-col">
            <Sidebar />

            <Navbar />
            <main className="flex-1 content-center">{children}</main>

            <Footer />
            <Toaster />
          </body>
        </NextIntlClientProvider>
      </ClerkProvider>
    </html>
  );
}
