import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allOrders, allUsers, myOrders } from "@/lib/Functions";
import CreateProduct from "./components/create-product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/Authoptions";
import { User } from "@/prisma/src/generated/client";
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
  const users = await allUsers();
  const orders = await allOrders();
  const my_orders = await myOrders(email || "");

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
    <div className=" py-8 px-2 w-full md:w-[100%] lg:w-[70%] m-auto min-h-[60vh]">
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="flex w-fit  items-center m-auto bg-muted p-2 rounded-md">
          <TabsTrigger
            value="users"
            className="px-4 py-2 rounded-md  transition-colors"
          >
            {translations.users}
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="px-4 py-2 rounded-md  transition-colors "
          >
            {translations.orders}
          </TabsTrigger>
          <TabsTrigger
            value="my orders"
            className="px-4 py-2 rounded-md  transition-colors"
          >
            {translations.my_orders}
          </TabsTrigger>
          <TabsTrigger
            value="create-product"
            className="px-4 py-2 rounded-md  transition-colors"
          >
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
                <TableBody dir={ar ? "ltr" : "ltr"}>
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
                <TableHeader>
                  <TableRow>
                    <TableHead>{translations.orderId}</TableHead>
                    <TableHead>{translations.subTotal}</TableHead>
                    <TableHead>{translations.userEmail}</TableHead>
                    <TableHead>{translations.items}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>${order.totalPrice}</TableCell>
                      <TableCell>{order.user.email}</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside">
                          {order.orderItems.map((item) => (
                            <li key={item.id}>
                              {item.product.name} x {item.quantity}
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
                    <TableHead>{translations.orderId}</TableHead>
                    <TableHead>{translations.subTotal}</TableHead>
                    <TableHead>{translations.userEmail}</TableHead>
                    <TableHead>{translations.items}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {my_orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>${order.totalPrice}</TableCell>
                      <TableCell>{order.user.email}</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside">
                          {order.orderItems.map((item) => (
                            <li key={item.id}>
                              {item.product.name} x {item.quantity}
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
