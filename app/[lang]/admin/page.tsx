import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrders, getAllUsers, getMyOrders } from "@/lib/Functions";
import CreateProduct from "./components/create-product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/Authoptions";
import { User } from "@/lib/generated/prisma/client";
export const metadata = {
  title: "Vogue-Haven Admin page",
  description:
    "Admin page for Vogue-Haven, view users, orders and add new products for Vogue-Haven store",
};
export default async function AdminPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const ar = lang === "ar";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const users = await getAllUsers();
  const orders = await getAllOrders();
  const my_orders = await getMyOrders(email || "");

  const translations = {
    dashboard: ar ? "لوحة التحكم" : "Admin Dashboard",
    items: ar ? "المنتجات" : "Items",
    users: ar ? "المستخدمين" : "Users",
    orders: ar ? "الطلبات " : "Orders",
    my_orders: ar ? "طلباتي" : "My Orders",
    createProduct: ar ? "المنتجات" : "Product",
    noUsers: ar ? "لا يوجد مستخدمين بعد 😾" : "No users Yet 😾",
    noOrders: ar
      ? "لا توجد طلبات بعد. ابتسم، سيأتي يوم وتصبح غنيًا إن شاء الله 😊"
      : "No orders yet. Smile, there will be one day, and you will be rich inshaa allah 😊",
    name: ar ? "الاسم" : "Name",
    email: ar ? "البريد الإلكتروني" : "Email",
    role: ar ? "الدور" : "Role",
    orderId: ar ? "رقم الطلب" : "Order ID",
    subTotal: ar ? "المجموع الفرعي" : "Subtotal",
    userEmail: ar ? "بريد المستخدم" : "User Email",
  };

  return (
    <div className=" py-8 px-2 mx-auto min-h-[80vh]  max-w-6xl border  ">
      <Tabs defaultValue="users">
        <TabsList className="text-white flex gap-2 w-fit  items-center m-auto  p-2 ">
          <TabsTrigger className="hover:bg-my-main" value="users">
            {translations.users}
          </TabsTrigger>
          <TabsTrigger className="hover:bg-my-main" value="orders">
            {translations.orders}
          </TabsTrigger>
          <TabsTrigger className="hover:bg-my-main" value="my orders">
            {translations.my_orders}
          </TabsTrigger>
          <TabsTrigger className="hover:bg-my-main" value="create-product">
            {translations.createProduct}
          </TabsTrigger>
        </TabsList>

        {/* Users Table */}
        <TabsContent value="users">
          <div className="mt-6">
            {users.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{translations.name}</TableHead>
                    <TableHead>{translations.email}</TableHead>
                    <TableHead>{translations.role}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user: User) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <h1 className="text-center text-2xl font-bold">
                {translations.noUsers}
              </h1>
            )}
          </div>
        </TabsContent>

        {/* All Orders Table */}
        <TabsContent value="orders">
          <div dir={ar ? "rtl" : "ltr"} className="mt-6">
            {orders.length > 0 ? (
              <Table>
                <TableHeader dir={ar ? "rtl" : "ltr"}>
                  <TableRow>
                    <TableHead className={ar ? "text-right" : "text-left"}>
                      {translations.orderId}
                    </TableHead>

                    <TableHead className={ar ? "text-right" : "text-left"}>
                      {translations.subTotal}
                    </TableHead>
                    <TableHead className={ar ? "text-right" : "text-left"}>
                      {translations.userEmail}
                    </TableHead>
                    <TableHead className={ar ? "text-right" : "text-left"}>
                      {translations.items}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody dir={ar ? "rtl" : "ltr"}>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>${order.totalPrice}</TableCell>
                      <TableCell>{order.User.email}</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside">
                          {order.OrderItem.map((item) => (
                            <li key={item.id}>
                              {ar ? item.Product.name_ar : item.Product.name_en}{" "}
                              x {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-lg">{translations.noOrders}</p>
            )}
          </div>
        </TabsContent>

        {/* My Orders Table */}
        <TabsContent value="my orders">
          <div dir={ar ? "rtl" : "ltr"} className="mt-6">
            {my_orders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className={ar ? "text-right" : "text-left"}>
                      {translations.orderId}
                    </TableHead>
                    <TableHead className={ar ? "text-right" : "text-left"}>
                      {translations.subTotal}
                    </TableHead>
                    <TableHead className={ar ? "text-right" : "text-left"}>
                      {translations.userEmail}
                    </TableHead>
                    <TableHead className={ar ? "text-right" : "text-left"}>
                      {translations.items}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {my_orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>${order.totalPrice}</TableCell>
                      <TableCell>{order.User.email}</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside">
                          {order.OrderItem.map((item) => (
                            <li key={item.id}>
                              {ar ? item.Product.name_ar : item.Product.name_en}
                              x {item.quantity}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-lg">{translations.noOrders}</p>
            )}
          </div>
        </TabsContent>

        {/* Create Product Tab */}
        <TabsContent dir={ar ? "rtl" : "ltr"} value="create-product">
          <CreateProduct />
        </TabsContent>
      </Tabs>
    </div>
  );
}
