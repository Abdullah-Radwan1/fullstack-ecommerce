import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { allOrders, allUsers } from "@/lib/Functions";
import CreateProduct from "./components/create-product";
import { LockKeyhole } from "lucide-react";

export default async function AdminPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const ar = lang === "ar";

  // Fetch users and orders data
  const users = await allUsers();
  const orders = await allOrders();

  // Arabic translations
  const translations = {
    dashboard: ar ? "لوحة التحكم" : "Admin Dashboard",
    users: ar ? "المستخدمين" : "Users",
    orders: ar ? "الطلبات" : "Orders",
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
    <div className="  p-8 w-full md:w-[50%] lg:w-[40%] m-auto min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-6 justify-center flex items-center gap-2">
        {translations.dashboard} <LockKeyhole color="royalblue" />
      </h1>
      <Tabs defaultValue="users" className="w-full ">
        <TabsList className=" flex  w-fit items-center m-auto">
          <TabsTrigger value="users">{translations.users}</TabsTrigger>
          <TabsTrigger value="orders">{translations.orders}</TabsTrigger>
          <TabsTrigger value="create-product">
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
                  <div key={user.id} className="p-4 border rounded-lg">
                    <p>
                      {translations.name}: {user.name}
                    </p>
                    <p>
                      {translations.email}: {user.email}
                    </p>
                    <p>
                      {translations.role}: {user.role}
                    </p>
                  </div>
                ))
              ) : (
                <h1 className="text-center text-2xl font-bold">
                  {translations.noUsers}
                </h1>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Orders Tab Content */}
        <TabsContent className="text-center" value="orders">
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">
              {translations.orders}
            </h2>
            <div className="space-y-2">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg">
                    <p>
                      {translations.orderId}: {order.id}
                    </p>
                    <p>
                      {translations.subTotal}: ${order.subTotal}
                    </p>
                    <p>
                      {translations.userEmail}: {order.userEmail}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center">{translations.noOrders}</p>
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
