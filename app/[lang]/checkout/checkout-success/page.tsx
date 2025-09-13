import React from "react";
import { CheckCircle, Mail } from "lucide-react"; // Import an icon for visual feedback
import Link from "next/link";

const SuccessPage = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const ar = lang === "ar";

  // Arabic translations
  const translations = {
    heading: ar ? "تم الدفع بنجاح!" : "Payment Successful!",
    message: ar
      ? "شكرًا لشرائك. يرجى التحقق من بريدك الإلكتروني للحصول على تأكيد الطلب والتفاصيل."
      : "Thank you for your purchase. Please check your email for the order confirmation and details.",
    button: ar ? "العودة إلى الصفحة الرئيسية" : "Return Home",
  };

  return (
    <div className="min-h-screen  flex items-start justify-center p-6">
      {/* Card */}
      <div
        className={`bg-muted p-8 rounded-md shadow-lg max-w-md w-full text-center transform transition-all duration-500 ease-in-out hover:scale-105 `}
      >
        {/* Icon */}
        <div className="flex justify-center animate-bounce">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold mt-6  animate-fade-in">
          {translations.heading}
        </h1>

        {/* Message */}
        <span className="text-sm my-4 text-red-500">
          {" "}
          {ar
            ? "خدمه البريد الالكتروني معطله حاليا"
            : "Email service is currently down"}
        </span>
        <p className=" text-muted-foreground animate-fade-in-delay">
          {translations.message}
        </p>

        {/* Button */}
        <div className="mt-8 animate-fade-in-delay-2 grid grid-cols-1">
          <Link
            href="/"
            className="  bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 "
          >
            {translations.button}
          </Link>
          <Link
            target="_blank"
            href="https://mail.google.com/"
            className="bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white px-6 py-2 rounded-md hover:opacity-90 flex items-center justify-center gap-2 mt-4"
          >
            Gmail
            <Mail />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
