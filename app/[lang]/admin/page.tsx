import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { allOrders, allUsers, myOrders } from "@/lib/Functions";
import CreateProduct from "./components/create-product";
import { LockKeyhole } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AdminPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const ar = lang === "ar";
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  // Fetch users and orders data
  const users = await allUsers();
  const orders = await allOrders();
  const my_orders = await myOrders(email || "");
  // Arabic translations
  const translations = {
    dashboard: ar ? "لوحة التحكم" : "Admin Dashboard",
    items: ar ? "المنتجات" : "Items",
    users: ar ? "المستخدمين" : "Users",
    orders: ar ? "الطلبات" : "Orders",
    my_orders: ar ? "طلباتي" : "My Orders",
    createProduct: ar ? "إنشاء منتج" : "Create Product",
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
    <div className="p-8 w-full md:w-[80%] lg:w-[70%] m-auto min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-6 justify-center flex items-center gap-2">
        {translations.dashboard} <LockKeyhole color="royalblue" />
      </h1>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="flex w-fit items-center m-auto bg-gray-100 p-2 rounded-lg">
          <TabsTrigger
            value="users"
            className="px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
          >
            {translations.users}
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
          >
            {translations.orders}
          </TabsTrigger>
          <TabsTrigger
            value="my orders"
            className="px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
          >
            {translations.my_orders}
          </TabsTrigger>
          <TabsTrigger
            value="create-product"
            className="px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
          >
            {translations.createProduct}
          </TabsTrigger>
        </TabsList>

        {/* Users Tab Content */}
        <TabsContent className="text-center" value="users">
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">{translations.users}</h2>
            <div className="space-y-2">
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p className="text-gray-700">
                      {translations.name}:{" "}
                      <span className="font-medium">{user.name}</span>
                    </p>
                    <p className="text-gray-700">
                      {translations.email}:{" "}
                      <span className="font-medium">{user.email}</span>
                    </p>
                    <p className="text-gray-700">
                      {translations.role}:{" "}
                      <span className="font-medium">{user.role}</span>
                    </p>
                  </div>
                ))
              ) : (
                <h1 className="text-center text-2xl font-bold text-gray-600">
                  {translations.noUsers}
                </h1>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Orders Tab Content */}
        <TabsContent className="text-start" value="orders">
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">
              {translations.orders}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                  >
                    <p className="text-gray-700">
                      {translations.orderId}:{" "}
                      <span className="font-medium">{order.id}</span>
                    </p>
                    <p className="text-gray-700">
                      {translations.subTotal}:{" "}
                      <span className="font-medium">${order.totalPrice}</span>
                    </p>
                    <p className="text-gray-700">
                      {translations.userEmail}:{" "}
                      <span className="font-medium">{order.user.email}</span>
                    </p>
                    <div className="mt-2">
                      <p className="text-gray-700">{translations.items}:</p>
                      <ul className="list-disc list-inside">
                        {order.orderItems.map((i) => (
                          <li key={i.id} className="text-gray-600">
                            {i.product.name} x {i.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">
                  {translations.noOrders}
                </p>
              )}
            </div>
          </div>
        </TabsContent>
        {/* my Orders Tab Content */}
        <TabsContent className="text-start" value="my orders">
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">
              {translations.my_orders}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {my_orders.length > 0 ? (
                my_orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                  >
                    <p className="text-gray-700">
                      {translations.orderId}:{" "}
                      <span className="font-medium">{order.id}</span>
                    </p>
                    <p className="text-gray-700">
                      {translations.subTotal}:{" "}
                      <span className="font-medium">${order.totalPrice}</span>
                    </p>
                    <p className="text-gray-700">
                      {translations.userEmail}:{" "}
                      <span className="font-medium">{order.user.email}</span>
                    </p>
                    <div className="mt-2">
                      <p className="text-gray-700">{translations.items}:</p>
                      <ul className="list-disc list-inside">
                        {order.orderItems.map((i) => (
                          <li key={i.id} className="text-gray-600">
                            {i.product.name} x {i.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">
                  {translations.noOrders}
                </p>
              )}
            </div>
          </div>
        </TabsContent>
        {/* Create Product Tab Content */}
        <TabsContent dir={ar ? "rtl" : "ltr"} value="create-product">
          <CreateProduct />
        </TabsContent>
      </Tabs>
    </div>
  );
}
