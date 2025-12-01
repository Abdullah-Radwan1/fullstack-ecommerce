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
import { User, Order, OrderItem, Product } from "@/lib/generated/prisma/client";
import { Card } from "@/components/ui/card";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const ar = lang === "ar";

  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "";

  const users: User[] = await getAllUsers();
  const orders: (Order & {
    User: User;
    OrderItem: (OrderItem & { Product: Product })[];
  })[] = await getAllOrders();
  const myOrders: (Order & {
    User: User;
    OrderItem: (OrderItem & { Product: Product })[];
  })[] = await getMyOrders(email);

  const t = {
    users: ar ? "المستخدمين" : "Users",
    orders: ar ? "الطلبات" : "Orders",
    myOrders: ar ? "طلباتي" : "My Orders",
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

  // -------- Reusable Strictly Typed Orders Table --------
  const renderOrdersTable = (
    list: (Order & {
      User: User;
      OrderItem: (OrderItem & { Product: Product })[];
    })[]
  ) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t.orderId}</TableHead>
          <TableHead>{t.subTotal}</TableHead>
          <TableHead>{t.userEmail}</TableHead>
          <TableHead>{t.users}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {list.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>${order.totalPrice}</TableCell>
            <TableCell>{order.User.email}</TableCell>

            <TableCell>
              <ul className="list-disc list-inside">
                {order.OrderItem.map((item) => (
                  <li key={item.id}>
                    {ar ? item.Product.name_ar : item.Product.name_en} ×{" "}
                    {item.quantity}
                  </li>
                ))}
              </ul>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const tabData = [
    {
      val: "users",
      label: t.users,
      content: users.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.name}</TableHead>
              <TableHead>{t.email}</TableHead>
              <TableHead>{t.role}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
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
        renderOrdersTable(orders)
      ) : (
        <p className="text-center">{t.noOrders}</p>
      ),
    },

    {
      val: "myOrders",
      label: t.myOrders,
      content: myOrders.length ? (
        renderOrdersTable(myOrders)
      ) : (
        <p className="text-center">{t.noOrders}</p>
      ),
    },

    {
      val: "create-product",
      label: t.createProduct,
      content: <CreateProduct />,
    },
  ];

  return (
    <Card className="m-8 p-6 mx-auto max-w-6xl min-h-[80vh]">
      <Tabs defaultValue="users">
        <TabsList className="mx-auto mb-6 flex w-fit gap-2 p-1 rounded-lg bg-card">
          {tabData.map((tab) => (
            <TabsTrigger
              key={tab.val}
              value={tab.val}
              className="px-2 sm:px-4 py-1 rounded-md data-[state=active]:bg-my-main data-[state=active]:text-black"
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
