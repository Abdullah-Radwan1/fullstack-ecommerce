import React from "react";
import { CheckCircle, Mail } from "lucide-react";
import Link from "next/link";

const SuccessPage = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const ar = lang === "ar";

  const translations = {
    heading: ar ? "تم الدفع بنجاح!" : "Payment Successful!",
    message: ar
      ? "شكرًا لشرائك. يرجى التحقق من بريدك الإلكتروني للحصول على تأكيد الطلب والتفاصيل."
      : "Thank you for your purchase. Please check your email for the order confirmation and details.",
    button: ar ? "العودة إلى الصفحة الرئيسية" : "Return Home",
    emailDown: ar
      ? "خدمة البريد الإلكتروني معطّلة حاليًا"
      : "Email service is currently down",
    gmail: ar ? "فتح Gmail" : "Open Gmail",
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 ${
        ar ? "rtl" : "ltr"
      }`}
    >
      <div className="bg-card border border-border p-8 rounded-xl shadow-lg max-w-md w-full text-center animate-fade-in">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-my-main animate-bounce" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-my-main tracking-wide">
          {translations.heading}
        </h1>

        {/* Subtext */}
        <p className="text-muted-foreground mt-4 mb-2 leading-relaxed">
          {translations.message}
        </p>

        {/* Email service note */}
        <p className="text-red-500 text-sm mb-4 animate-fade-in-delay">
          {translations.emailDown}
        </p>

        {/* Buttons */}
        <div className="grid grid-cols-1 gap-4 mt-6 animate-slide-up">
          <Link
            href={ar ? "/ar" : "/en"}
            className="bg-my-main text-background font-medium px-6 py-2 rounded-md transition-transform duration-300 hover:scale-105 hover:bg-accent"
          >
            {translations.button}
          </Link>

          <Link
            target="_blank"
            href="https://mail.google.com/"
            className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-background font-medium px-6 py-2 rounded-md flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-105"
          >
            {translations.gmail}
            <Mail className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
