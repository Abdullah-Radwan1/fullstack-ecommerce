import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllOrders, getAllUsers, getMyOrders } from "@/lib/Functions";
import CreateProduct from "./components/create-product";
import { auth } from "@clerk/nextjs/server";
import { User, Order, OrderItem, Product } from "@/lib/generated/prisma/client";
import {
  Shield,
  Package,
  Users,
  PlusCircle,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const ar = lang === "ar";

  const { userId } = await auth();
  const email = "";

  const users: User[] = await getAllUsers();
  const orders: (Order & {
    User: User;
    OrderItem: (OrderItem & { Product: Product })[];
  })[] = await getAllOrders();
  const myOrders: (Order & {
    User: User;
    OrderItem: (OrderItem & { Product: Product })[];
  })[] = await getMyOrders(email);
  console.log(myOrders);
  // Calculate stats
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0,
  );
  console.log(userId);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const adminUsers = users.filter((user) => user.role === "ADMIN").length;

  const t = {
    users: ar ? "المستخدمين" : "Users",
    orders: ar ? "الطلبات" : "Orders",
    myOrders: ar ? "طلباتي" : "My Orders",
    createProduct: ar ? "المنتجات" : "Products",
    noUsers: ar ? "لا يوجد مستخدمين 😾" : "No users Yet 😾",
    noOrders: ar ? "لا توجد طلبات بعد 😅" : "No orders yet 😅",
    name: ar ? "الاسم" : "Name",
    email: ar ? "البريد الإلكتروني" : "Email",
    role: ar ? "الدور" : "Role",
    orderId: ar ? "رقم الطلب" : "Order ID",
    subTotal: ar ? "المجموع" : "Total",
    userEmail: ar ? "بريد المستخدم" : "User Email",
    dashboard: ar ? "لوحة التحكم" : "Dashboard",
    totalRevenue: ar ? "إجمالي الإيرادات" : "Total Revenue",
    avgOrder: ar ? "متوسط الطلب" : "Avg. Order",
    adminCount: ar ? "المشرفين" : "Admins",
    recentOrders: ar ? "الطلبات الأخيرة" : "Recent Orders",
    allUsers: ar ? "جميع المستخدمين" : "All Users",
  };

  // Enhanced Orders Table with Styling
  const renderOrdersTable = (
    list: (Order & {
      User: User;
      OrderItem: (OrderItem & { Product: Product })[];
    })[],
    isCompact = false,
  ) => (
    <div className="rounded-lg border border-border/40 overflow-hidden">
      <Table>
        <TableHeader className="bg-gradient-to-r from-my-main/10 to-my-secondary/10">
          <TableRow className="hover:bg-transparent">
            <TableHead className="font-bold text-foreground">
              {t.orderId}
            </TableHead>
            <TableHead className="font-bold text-foreground">
              {t.subTotal}
            </TableHead>
            <TableHead className="font-bold text-foreground">
              {t.userEmail}
            </TableHead>
            <TableHead className="font-bold text-foreground">
              {ar ? "المنتجات" : "Products"}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {list.slice(0, isCompact ? 5 : undefined).map((order) => (
            <TableRow
              key={order.id}
              className="hover:bg-gradient-to-r hover:from-my-main/5 hover:to-my-secondary/5 transition-colors group"
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-my-main to-my-secondary" />
                  <span className="font-mono text-sm">
                    #{order.id.slice(0, 8)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className="bg-gradient-to-r from-my-main/20 to-my-secondary/20 text-foreground border-my-main/30">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {order.totalPrice.toFixed(2)}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {order.User.email}
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {order.OrderItem.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">
                        {ar ? item.Product.name_ar : item.Product.name_en}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs border-my-main/30"
                      >
                        ×{item.quantity}
                      </Badge>
                    </div>
                  ))}
                  {order.OrderItem.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{order.OrderItem.length - 2} {ar ? "أكثر" : "more"}
                    </Badge>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const tabData = [
    {
      val: "users",
      label: t.users,
      icon: <Users className="w-4 h-4" />,
      content: users.length ? (
        <div className="rounded-lg border border-border/40 overflow-hidden">
          <Table>
            <TableHeader className="bg-gradient-to-r from-my-main/10 to-my-secondary/10">
              <TableRow>
                <TableHead>{t.name}</TableHead>
                <TableHead>{t.email}</TableHead>
                <TableHead>{t.role}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-my-main/5 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-my-main/20 to-my-secondary/20 flex items-center justify-center">
                        <span className="text-sm font-bold">
                          {user.name?.[0] || user.email[0]}
                        </span>
                      </div>
                      {user.name || "-"}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.role === "ADMIN"
                          ? "bg-gradient-to-r from-my-main to-my-secondary text-background"
                          : "bg-muted text-foreground"
                      }
                    >
                      {user.role === "ADMIN"
                        ? ar
                          ? "أدمن"
                          : "Admin"
                        : ar
                          ? "مستخدم"
                          : "User"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground">{t.noUsers}</p>
        </div>
      ),
    },
    {
      val: "orders",
      label: t.orders,
      icon: <Package className="w-4 h-4" />,
      content: orders.length ? (
        renderOrdersTable(orders)
      ) : (
        <div className="text-center py-12">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground">{t.noOrders}</p>
        </div>
      ),
    },
    {
      val: "myOrders",
      label: t.myOrders,
      icon: <Shield className="w-4 h-4" />,
      content: myOrders.length ? (
        renderOrdersTable(myOrders, true)
      ) : (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground">{t.noOrders}</p>
        </div>
      ),
    },
    {
      val: "create-product",
      label: t.createProduct,
      icon: <PlusCircle className="w-4 h-4" />,
      content: <CreateProduct />,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-my-main/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-my-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t.dashboard}</h1>
            <p className="text-muted-foreground">
              {ar ? "إدارة المتجر والمستخدمين" : "Manage store and users"}
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-my-main to-my-secondary text-background px-4 py-1.5">
            <Shield className="w-4 h-4 mr-2" />
            {ar ? "وضع المشرف" : "Admin Mode"}
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border/40 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t.totalRevenue}
                  </p>
                  <p className="text-2xl font-bold">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-my-main/20 to-my-secondary/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-my-main" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.avgOrder}</p>
                  <p className="text-2xl font-bold">
                    ${avgOrderValue.toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-my-main/20 to-my-secondary/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-my-main" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t.adminCount}
                  </p>
                  <p className="text-2xl font-bold">{adminUsers}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-my-main/20 to-my-secondary/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-my-main" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm shadow-xl">
          <div className="h-1 w-full bg-gradient-to-r from-my-main via-my-secondary to-my-main" />

          <CardContent className="p-6">
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="mb-6 bg-card border border-border/40 p-1 w-full md:w-auto mx-auto rounded-lg">
                {tabData.map((tab) => (
                  <TabsTrigger
                    key={tab.val}
                    value={tab.val}
                    className="px-4 py-2 rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-my-main data-[state=active]:to-my-secondary data-[state=active]:text-background transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="group-data-[state=active]:scale-110 transition-transform">
                        {tab.icon}
                      </span>
                      {tab.label}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabData.map((tab) => (
                <TabsContent
                  key={tab.val}
                  value={tab.val}
                  dir={ar ? "rtl" : "ltr"}
                  className="animate-in fade-in duration-300"
                >
                  {tab.content}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
