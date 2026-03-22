import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { getServerTranslator } from "@/lib/i18n/serverTranslator";

import { Crown, Sparkles, Mail, Package, Shield } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMyOrders } from "@/lib/Functions";
import { db } from "@/prisma/db";
import Link from "next/link";
import LogoutDialog from "./LogoutDialog";

export const metadata = {
  description: "Your profile page for Vogue-Haven",
};

const Page = async () => {
  // Get Auth info + locale - run in parallel
  const [{ userId }, locale] = await Promise.all([auth(), getLocale()]);
  const t = await getServerTranslator("ProfilePage");
  const isArabic = locale === "ar";

  if (!userId) {
    redirect("/signin");
  }

  // Fetch all user data in parallel
  const [clerkUser, dbUser, orders] = await Promise.all([
    currentUser(),
    db.user.findUnique({
      where: { clerkId: userId },
      select: { role: true },
    }),
    getMyOrders(userId),
  ]);

  const email = clerkUser?.emailAddresses?.[0]?.emailAddress || "";
  const name = clerkUser?.firstName || clerkUser?.fullName || "User";
  const image = clerkUser?.imageUrl || "/avatar.png";
  const role = dbUser?.role ?? "USER";

  return (
    <div
      className="min-h-screen bg-background pt-6 pb-20 px-4"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-my-main/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-my-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Profile Header Card */}
        <Card className="relative overflow-hidden border-border/40 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm shadow-xl">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-my-main to-transparent" />

          <CardContent className="pt-8 pb-6">
            {/* Profile Image with Glow Effect */}
            <div className="relative mx-auto w-40 h-40">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-my-main to-my-secondary blur-lg opacity-30 animate-pulse" />
              <div className="relative w-full h-full rounded-full border-4 border-my-main/30 overflow-hidden z-10">
                <Image
                  src={image}
                  alt="profile"
                  fill
                  className="object-cover"
                  priority
                  sizes="160px"
                />
              </div>

              {/* Role Badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20">
                <Badge
                  className={`px-4 py-1.5 font-semibold border-2 flex items-center whitespace-nowrap ${
                    role === "ADMIN"
                      ? "bg-gradient-to-r from-my-main to-my-secondary text-primary-foreground border-my-main"
                      : "bg-gradient-to-r from-muted to-muted/80 text-foreground border-border"
                  }`}
                >
                  {role === "ADMIN" ? (
                    <Crown
                      className={`w-4 h-4 ${isArabic ? "ml-2" : "mr-2"}`}
                    />
                  ) : (
                    <Shield
                      className={`w-4 h-4 ${isArabic ? "ml-2" : "mr-2"}`}
                    />
                  )}
                  {role === "ADMIN" ? t("admin") : t("user")}
                </Badge>
              </div>
            </div>

            {/* Name & Greeting */}
            <div className="text-center mt-8 space-y-2">
              <h1 className="text-4xl font-bold">
                {t("welcome")}{" "}
                <span className="bg-gradient-to-r from-my-main to-my-secondary bg-clip-text text-transparent">
                  {name}
                </span>
              </h1>

              {/* Email with Icon */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/40">
                <Mail className="w-4 h-4 text-my-main" />
                <p className="text-sm text-muted-foreground truncate max-w-xs">
                  {email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats & Actions Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Orders Card */}
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-my-main" />
                {t("yourOrders")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="text-6xl font-bold bg-gradient-to-b from-my-main to-my-secondary bg-clip-text text-transparent mb-4">
                  {orders.length}
                </div>
                <p className="text-lg">
                  {orders.length ? t("ordersInProgress") : t("noOrders")}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {orders.length ? t("lastUpdated") : t("startShopping")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-my-main" />
                {t("quickActions")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-between border-border hover:border-my-main hover:bg-my-main/10 transition-all"
                asChild
              >
                <Link
                  href="/shop"
                  className="flex items-center justify-between w-full"
                >
                  <span>{t("shopNow")}</span>
                  <Sparkles className="w-4 h-4" />
                </Link>
              </Button>

              <LogoutDialog />
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders List */}
        {orders.length > 0 && (
          <>
            <div className="relative py-4">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-my-main to-my-secondary animate-pulse" />
              </div>
            </div>

            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {t("recentOrders")}
                  <Badge className="ml-2 bg-my-main/20 text-my-main border-my-main/30">
                    {orders.length} {t("order")}
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {orders.slice(0, 3).map((order, index) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    index={index}
                    isArabic={isArabic}
                    t={t}
                  />
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

function OrderCard({
  order,
  index,
  isArabic,
  t,
}: {
  order: any;
  index: number;
  isArabic: boolean;
  t: any;
}) {
  const totalItems = order.OrderItem.reduce(
    (sum: number, i: any) => sum + i.quantity,
    0,
  );

  return (
    <div className="rounded-xl border border-border/40 p-4 space-y-4 hover:border-my-main/30 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-my-main/20 to-my-secondary/20 flex items-center justify-center font-bold">
            {index + 1}
          </div>
          <div>
            <p className="font-semibold">
              {t("orderNumber")} {order.id.slice(0, 8)}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Badge className="bg-my-main/20 text-my-main border-my-main/30">
          ${order.totalPrice.toFixed(2)}
        </Badge>
      </div>

      <div className="space-y-3">
        {order.OrderItem.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg bg-muted/30 p-3"
          >
            <div className="relative w-12 h-12 rounded-md overflow-hidden border border-border/40 shrink-0">
              <Image
                src={item.Product.image}
                alt={isArabic ? item.Product.name_ar : item.Product.name_en}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="flex-1 min-w-0 text-start">
              <p className="font-medium truncate">
                {isArabic ? item.Product.name_ar : item.Product.name_en}
              </p>
              <p className="text-xs text-muted-foreground">
                ${item.Product.basePrice} × {item.quantity}
              </p>
            </div>
            <Badge variant="outline" className="border-my-main/30">
              x{item.quantity}
            </Badge>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-border/40">
        <span className="text-sm text-muted-foreground">
          {t("items")}: {totalItems}
        </span>
        <Badge variant="outline" className="border-green-500/30 text-green-400">
          {t("paid")}
        </Badge>
      </div>
    </div>
  );
}

export default Page;
