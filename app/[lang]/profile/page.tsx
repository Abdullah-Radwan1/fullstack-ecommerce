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
  description: "Your profile page for Vogue-Haven ",
};
const Page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const session = await getServerSession(authOptions);
  const { lang } = await params;
  const ar = lang === "ar";

  if (!session || !session.user?.email) {
    return redirect("/login");
  }

  const email = session.user.email;
  const name = session.user.name;
  const image = session.user.image;
  const role = session.user.role;
  const orders = await myOrders(email);
  return (
    <div className="space-y-5 mt-10 min-h-[55vh]">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-52 h-52">
          <Image
            src={image || "/png.png"}
            alt="profile"
            fill
            className="rounded-full"
          />
        </div>
        <h1 className=" sm:text-3xl md:text-4xl text-2xl font-bold w-full text-center flex justify-center mt-2 gap-2">
          {ar ? "مرحبًا" : "Welcome"} {name}
          {role === "ADMIN" ? (
            <div className="flex items-center gap-2">
              ({ar ? "ادمن" : "Admin"} <Lock color="gold" />)
            </div>
          ) : (
            <div>({ar ? "مستخدم" : "User"})</div>
          )}
        </h1>
        <p>
          {ar ? "البريد الإلكتروني" : "Email"}: {email}
        </p>
      </div>
      <div>
        <AuthButton />
      </div>
      <Separator className="h-1 bg-gradient-to-r from-my-main  to-my-secondary  w-[50%] m-auto" />
      <div>
        <h1 className="text-3xl font-bold text-center">
          {ar ? "طلباتك" : "Your Orders"}
        </h1>
        <div>
          {orders.length >= 1 ? (
            <h1 className="text-center">
              {ar ? " لديك " : "You have "}
              <strong>{orders.length}</strong>{" "}
              {ar
                ? orders.length === 1
                  ? "طلب قيد التنفيذ"
                  : "طلبات قيد التنفيذ"
                : orders.length === 1
                ? "order in progress"
                : "orders in progress"}
            </h1>
          ) : (
            <h1 className="text-center">
              {ar ? "لا توجد طلبات بعد 😒" : "No orders yet 😒"}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
