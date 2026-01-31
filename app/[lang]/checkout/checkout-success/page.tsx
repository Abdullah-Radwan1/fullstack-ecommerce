import {
  CheckCircle,
  Mail,
  Home,
  Sparkles,
  Package,
  ShoppingBag,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SuccessPage = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const ar = lang === "ar";

  const translations = {
    heading: ar ? "تم الدفع بنجاح!" : "Payment Successful!",
    subheading: ar ? "تهانينا على شرائك!" : "Congratulations on your purchase!",
    message: ar
      ? "شكرًا لثقتك بنا. تم تأكيد طلبك بنجاح وستصلك تفاصيل الشحن قريبًا."
      : "Thank you for trusting us. Your order has been confirmed and shipping details will arrive soon.",
    emailNote: ar
      ? "تحقق من بريدك الإلكتروني للحصول على تأكيد الطلب"
      : "Check your email for order confirmation",
    emailDown: ar
      ? "ملاحظة: خدمة البريد الإلكتروني مؤقتة غير متوفرة"
      : "Note: Email service is temporarily unavailable",
    gmail: ar ? "فتح Gmail" : "Open Gmail",
    returnHome: ar ? "العودة للرئيسية" : "Return Home",
    continueShopping: ar ? "متابعة التسوق" : "Continue Shopping",
    orderNumber: ar ? "رقم الطلب" : "Order #",
    estimatedDelivery: ar ? "التوصيل المقدر" : "Estimated Delivery",
    days: ar ? "أيام عمل" : "Business Days",
    stepsTitle: ar ? "الخطوات التالية" : "Next Steps",
    steps: [
      { icon: Mail, label: ar ? "البريد" : "Email" },
      { icon: Package, label: ar ? "الشحن" : "Ship" },
      { icon: Home, label: ar ? "تسوق" : "Shop" },
    ],
  };

  const orderNumber = `ORD-${Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, "0")}`;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-my-main/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-my-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-2xl">
        <Card className="border-border/40 bg-card/50 shadow-xl">
          {/* Gradient Top */}
          <div className="h-1 w-full bg-gradient-to-r from-my-main to-my-secondary" />

          {/* Header */}
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-20 h-20 mb-4">
              <div className="w-full h-full rounded-full bg-my-main/20 border-2 border-my-main/30 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-my-main" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-my-main mb-2">
              {translations.heading}
            </h1>
            <p className="text-muted-foreground flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-my-main" />
              {translations.subheading}
            </p>
          </CardHeader>

          {/* Content */}
          <CardContent className="space-y-6">
            {/* Order Details */}
            <section className="border border-border/30 rounded-lg p-4">
              <div className="flex flex-wrap justify-evenly gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingBag className="w-4 h-4 text-my-main" />
                    <span className="text-sm text-muted-foreground">
                      {translations.orderNumber}
                    </span>
                  </div>
                  <Badge className="bg-my-main/20 text-foreground border-my-main/30 font-mono">
                    {orderNumber}
                  </Badge>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-my-main" />
                    <span className="text-sm text-muted-foreground">
                      {translations.estimatedDelivery}
                    </span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    3-5 {translations.days}
                  </Badge>
                </div>
              </div>
            </section>

            {/* Confirmation Message */}
            <section className="text-center space-y-3">
              <p className="text-muted-foreground">{translations.message}</p>
              <div className="text-sm text-my-main flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                {translations.emailNote}
              </div>
              <div className="text-sm text-destructive">
                ⚠️ {translations.emailDown}
              </div>
            </section>

            {/* Steps */}
            <section className="bg-my-main/5 border border-my-main/20 rounded-lg p-4">
              <h3 className="font-bold mb-3 text-center">
                {translations.stepsTitle}
              </h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                {translations.steps.map((step, i) => (
                  <div key={i} className="p-2">
                    <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-my-main/20 flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-my-main" />
                    </div>
                    <p className="text-xs">
                      {i + 1}. {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </CardContent>

          {/* Footer Buttons */}
          <CardFooter className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              <Button asChild variant="outline" className="border-border">
                <Link
                  href={ar ? "/ar" : "/en"}
                  className="flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  {translations.returnHome}
                </Link>
              </Button>

              <Button
                asChild
                className="bg-gradient-to-r from-[#EA4335] to-[#FBBC05] text-background"
              >
                <Link
                  href="https://mail.google.com/"
                  target="_blank"
                  className="flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {translations.gmail}
                </Link>
              </Button>

              <Button
                asChild
                className="bg-gradient-to-r from-my-main to-my-secondary text-background"
              >
                <Link
                  href={ar ? "/ar/shop" : "/en/shop"}
                  className="flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {translations.continueShopping}
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm text-muted-foreground flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-my-main" />
          {ar ? "تم تأمين طلبك بنجاح" : "Your order is secured"}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
