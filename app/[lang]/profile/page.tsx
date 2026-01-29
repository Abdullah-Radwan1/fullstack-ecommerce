import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

import { Crown, Sparkles, Mail, Package, Shield } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMyOrders } from "@/lib/Functions";
import AuthButton from "@/lib/auth/SignoutButton";
import { db } from "@/prisma/db";
import Link from "next/link";

export const metadata = {
  description: "Your profile page for Vogue-Haven",
};

const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  // Get Auth info
  const { userId } = await auth();
  const { lang } = await params;
  const ar = lang === "ar";

  if (!userId) {
    redirect(ar ? "/ar/signin" : "/en/signin");
  }

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress || "";
  const name = clerkUser?.firstName || clerkUser?.fullName || "";
  const image = clerkUser?.imageUrl || "/avatar.png";

  const dbUser = await db.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  });
  const role = dbUser?.role ?? "USER";

  const orders = await getMyOrders(email);

  return (
    <div className="min-h-screen bg-background pt-6 pb-20 px-4">
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
                />
              </div>

              {/* Role Badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20">
                <Badge
                  className={`px-4 py-1.5 font-semibold border-2 ${
                    role === "ADMIN"
                      ? "bg-gradient-to-r from-my-main to-my-secondary text-background border-my-main"
                      : "bg-gradient-to-r from-muted to-muted/80 text-foreground border-border"
                  }`}
                >
                  {role === "ADMIN" ? (
                    <Crown className="w-4 h-4 mr-2" />
                  ) : (
                    <Shield className="w-4 h-4 mr-2" />
                  )}
                  {role === "ADMIN"
                    ? ar
                      ? "أدمن"
                      : "Admin"
                    : ar
                      ? "مستخدم"
                      : "User"}
                </Badge>
              </div>
            </div>

            {/* Name & Greeting */}
            <div className="text-center mt-8 space-y-2">
              <h1 className="text-4xl font-bold">
                {ar ? "مرحبًا" : "Welcome"}{" "}
                <span className="bg-gradient-to-r from-my-main to-my-secondary bg-clip-text text-transparent">
                  {name}
                </span>
              </h1>

              {/* Email with Icon */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/40">
                <Mail className="w-4 h-4 text-my-main" />
                <p className="text-sm text-muted-foreground">{email}</p>
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
                {ar ? "طلباتك" : "Your Orders"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="text-6xl font-bold bg-gradient-to-b from-my-main to-my-secondary bg-clip-text text-transparent mb-4">
                  {orders.length}
                </div>
                <p className="text-lg">
                  {orders.length
                    ? ar
                      ? `طلبات قيد التنفيذ 🚀`
                      : `Orders in progress 🚀`
                    : ar
                      ? "لا توجد طلبات بعد"
                      : "No orders yet"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {orders.length
                    ? ar
                      ? `آخر تحديث: الآن`
                      : `Last updated: Now`
                    : ar
                      ? "ابدأ التسوق الآن!"
                      : "Start shopping now!"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-my-main" />
                {ar ? "إجراءات سريعة" : "Quick Actions"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-between border-border hover:border-my-main hover:bg-my-main/10 transition-all"
                asChild
              >
                <Link href={ar ? "/ar/products" : "/en/products"}>
                  <span>{ar ? "التسوق الآن" : "Shop Now"}</span>
                  <Sparkles className="w-4 h-4" />
                </Link>
              </Button>

              <AuthButton />
            </CardContent>
          </Card>
        </div>

        {/* Decorative Separator */}
        <div className="relative py-4">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-my-main to-my-secondary animate-pulse" />
          </div>
        </div>

        {/* Recent Orders List */}
        {orders.length > 0 && (
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {ar ? "الطلبات الأخيرة" : "Recent Orders"}
                <Badge className="ml-2 bg-my-main/20 text-my-main border-my-main/30">
                  {orders.length} {ar ? "جديد" : "new"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orders.slice(0, 3).map((order, index) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-my-main/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-my-main/20 to-my-secondary/20 flex items-center justify-center">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {ar ? "قيد المعالجة" : "Processing"}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-my-main/30">
                      {ar ? "معلق" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Page;
