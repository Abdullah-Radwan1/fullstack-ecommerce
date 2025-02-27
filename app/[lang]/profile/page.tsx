import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import AuthButton from "@/lib/auth/SignoutButton";
import { userOrders } from "@/lib/Functions";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);

  console.log(session);

  const email = session?.user?.email;
  const name = session?.user?.name;
  const image = session?.user?.image;
  console.log(session);
  if (!session || !email) {
    return redirect("/login");
  }
  const orders = await userOrders(email);

  return (
    <div className="space-y-5 mt-10 min-h-[55vh] ">
      <div className="flex flex-col items-center justify-center ">
        <div className="relative w-52 h-52">
          <Image
            src={image || "/png.png"}
            alt="profile"
            fill
            className="rounded-full"
          />
        </div>
        <h1 className="text-4xl font-bold">Welcome {name}</h1>
        email : {email}
      </div>
      <div>
        <AuthButton />
      </div>
      <Separator className="h-1  bg-gradient-to-r from-green-500 to-blue-700 w-96 m-auto" />
      <div>
        <h1 className="text-4xl font-bold text-center">Your orders</h1>

        <div>
          {orders.length >= 1 ? (
            orders.map((order) => (
              <div key={order.id}>
                <h1>Order Id: {order.id}</h1>
                <h2>Order Date: {Date(order.createdAt)}</h2>
                <h3>Products</h3>
                <div>
                  {order.products.map((product) => (
                    <div key={product.id}>
                      <h4>{product.orderId}</h4>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: {product.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center">No orders yet 😒</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
