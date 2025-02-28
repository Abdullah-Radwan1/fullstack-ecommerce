import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import AuthButton from "@/lib/auth/SignoutButton";
import { userOrders } from "@/lib/Functions";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Lock } from "lucide-react";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { lang: string } }) => {
  const session = await getServerSession(authOptions);
  const { lang } = params;
  const ar = lang === "ar";

  if (!session || !session.user?.email) {
    return redirect("/login");
  }

  const email = session.user.email;
  const name = session.user.name;
  const image = session.user.image;
  const role = session.user.role;

  const orders = await userOrders(email);

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
        <h1 className="text-4xl font-bold w-full text-center flex justify-center gap-2">
          {ar ? "مرحبًا" : "Welcome"} {name}
          {role === "ADMIN" ? (
            <div className="flex items-center gap-2">
              ({ar ? "مدير" : "Admin"} <Lock color="royalblue" />)
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
      <Separator className="h-1 bg-gradient-to-r from-green-500 to-blue-700 w-96 m-auto" />
      <div>
        <h1 className="text-4xl font-bold text-center">
          {ar ? "طلباتك" : "Your Orders"}
        </h1>

        <div>
          {orders.length >= 1 ? (
            orders.map((order) => (
              <div key={order.id} className="border p-4 rounded-lg my-4">
                <h1>
                  {ar ? "رقم الطلب" : "Order ID"}: {order.id}
                </h1>
                <h2>
                  {ar ? "تاريخ الطلب" : "Order Date"}:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </h2>
                <h3>{ar ? "المنتجات" : "Products"}</h3>
                <div>
                  {order.products.map((product) => (
                    <div key={product.id} className="border-t pt-2 mt-2">
                      <h4>{product.productId}</h4>
                      <p>
                        {ar ? "الكمية" : "Quantity"}: {product.quantity}
                      </p>
                      <p></p>
                    </div>
                  ))}
                </div>
              </div>
            ))
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
