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
import { Card } from "@/components/ui/card";

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

  const t = {
    users: ar ? "المستخدمين" : "Users",
    orders: ar ? "الطلبات" : "Orders",
    my_orders: ar ? "طلباتي" : "My Orders",
    createProduct: ar ? "المنتجات" : "Product",
    noUsers: ar ? "لا يوجد مستخدمين 😾" : "No users Yet 😾",
    noOrders: ar ? "لا توجد طلبات بعد 😅" : "No orders yet 😅",
    name: ar ? "الاسم" : "Name",
    email: ar ? "البريد الإلكتروني" : "Email",
    role: ar ? "الدور" : "Role",
    orderId: ar ? "رقم الطلب" : "Order ID",
    subTotal: ar ? "المجموع الفرعي" : "Subtotal",
    userEmail: ar ? "بريد المستخدم" : "User Email",
  };

  const tabData = [
    {
      val: "users",
      label: t.users,
      content: users.length ? (
        <Table className="rounded-lg border border-border">
          <TableHeader>
            <TableRow>
              <TableHead>{t.name}</TableHead>
              <TableHead>{t.email}</TableHead>
              <TableHead>{t.role}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&>*:nth-child(odd)]:bg-card/40">
            {users.map((user: User) => (
              <TableRow
                key={user.id}
                className="hover:bg-my-secondary/10 transition"
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center">{t.noUsers}</p>
      ),
    },

    {
      val: "orders",
      label: t.orders,
      content: orders.length ? (
        <Table className="rounded-lg border border-border">
          <TableHeader>
            <TableRow>
              <TableHead>{t.orderId}</TableHead>
              <TableHead>{t.subTotal}</TableHead>
              <TableHead>{t.userEmail}</TableHead>
              <TableHead>{t.users}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&>*:nth-child(odd)]:bg-card/40">
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-my-secondary/10 transition"
              >
                <TableCell>{order.id}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>{order.User.email}</TableCell>
                <TableCell>
                  <ul className="list-disc list-inside">
                    {order.OrderItem.map((item) => (
                      <li key={item.id}>
                        {ar ? item.Product.name_ar : item.Product.name_en} x{" "}
                        {item.quantity}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center">{t.noOrders}</p>
      ),
    },

    {
      val: "my_orders",
      label: t.my_orders,
      content: my_orders.length ? (
        <Table className="rounded-lg border border-border">
          <TableHeader>
            <TableRow>
              <TableHead>{t.orderId}</TableHead>
              <TableHead>{t.subTotal}</TableHead>
              <TableHead>{t.userEmail}</TableHead>
              <TableHead>{t.users}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&>*:nth-child(odd)]:bg-card/40">
            {my_orders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-my-secondary/10 transition"
              >
                <TableCell>{order.id}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>{order.User.email}</TableCell>
                <TableCell>
                  <ul className="list-disc list-inside">
                    {order.OrderItem.map((item) => (
                      <li key={item.id}>
                        {ar ? item.Product.name_ar : item.Product.name_en} x{" "}
                        {item.quantity}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <h1 className="text-center text-2xl">{t.noOrders}</h1>
      ),
    },

    {
      val: "create-product",
      label: t.createProduct,
      content: <CreateProduct />,
    },
  ];

  return (
    <Card className="m-8 p-6 mx-auto min-h-[80vh] max-w-6xl border border-border/60 bg-card/50 backdrop-blur-xl shadow-xl rounded-2xl">
      <Tabs defaultValue="users">
        <TabsList className="mx-auto mb-8 flex w-fit gap-2 rounded-xl bg-card/40 backdrop-blur-md p-2 border border-border shadow-inner">
          {tabData.map((tab) => (
            <TabsTrigger
              key={tab.val}
              value={tab.val}
              className="relative px-4  text-sm font-medium rounded-lg transition-all duration-300
                         hover:bg-my-secondary/30 hover:text-my-main
                         data-[state=active]:bg-my-main data-[state=active]:text-black
                         data-[state=active]:shadow-lg data-[state=active]:shadow-my-main/40"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabData.map((tab) => (
          <TabsContent key={tab.val} value={tab.val} dir={ar ? "rtl" : "ltr"}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}
