import { authOptions } from "@/lib/auth/Authoptions";
import AuthButton from "@/lib/auth/SignoutButton";
import { myOrders } from "@/lib/Functions";
import { Separator } from "@/components/ui/separator";
import { Lock } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  description: "Your profile page for Vogue-Haven",
};

const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const session = await getServerSession(authOptions);
  const { lang } = await params;
  const ar = lang === "ar";

  if (!session?.user?.email) redirect("/signin");

  const { email, name, image, role } = session.user;
  const orders = await myOrders(email);

  return (
    <div className="space-y-8 mt-10 min-h-[55vh] max-w-3xl mx-auto text-center">
      {/* Profile Info */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-52 h-52">
          <Image
            src={image || "/png.png"}
            alt="profile"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex flex-col items-center gap-1">
          {ar ? "مرحبًا" : "Welcome"} {name}
          <span className="text-xl flex items-center gap-1 font-normal">
            (
            {role === "ADMIN"
              ? ar
                ? "ادمن"
                : " Admin"
              : ar
              ? "مستخدم"
              : "User"}
            {role === "ADMIN" && <Lock color="gold" />})
          </span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {ar ? "البريد الإلكتروني" : "Email"}: {email}
        </p>
      </div>

      {/* Sign Out */}
      <AuthButton />

      {/* Separator */}
      <Separator className="h-1 bg-gradient-to-r from-my-main to-my-secondary w-1/2 mx-auto" />

      {/* Orders Section */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">{ar ? "طلباتك" : "Your Orders"}</h2>
        <p className="text-muted-foreground">
          {orders.length
            ? ar
              ? `لديك ${orders.length} ${
                  orders.length === 1 ? "طلب قيد التنفيذ" : "طلبات قيد التنفيذ"
                }`
              : `You have ${orders.length} ${
                  orders.length === 1
                    ? "order in progress"
                    : "orders in progress"
                }`
            : ar
            ? "لا توجد طلبات بعد 😒"
            : "No orders yet 😒"}
        </p>
      </div>
    </div>
  );
};

export default Page;
