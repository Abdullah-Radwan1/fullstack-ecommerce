import React from "react";
import { CheckCircle } from "lucide-react"; // Import an icon for visual feedback

const SuccessPage = ({ params }: { params: { lang: string } }) => {
  const ar = params.lang === "ar";

  // Arabic translations
  const translations = {
    heading: ar ? "تم الدفع بنجاح!" : "Payment Successful!",
    message: ar
      ? "شكرًا لشرائك. يرجى التحقق من بريدك الإلكتروني للحصول على تأكيد الطلب والتفاصيل."
      : "Thank you for your purchase. Please check your email for the order confirmation and details.",
    button: ar ? "العودة إلى الصفحة الرئيسية" : "Return Home",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      {/* Card */}
      <div
        className={`bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center transform transition-all duration-500 ease-in-out hover:scale-105 ${
          ar ? "text-right" : "text-left"
        }`}
      >
        {/* Icon */}
        <div className="flex justify-center animate-bounce">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold mt-6 text-gray-800 animate-fade-in">
          {translations.heading}
        </h1>

        {/* Message */}
        <p className="mt-4 text-gray-600 animate-fade-in-delay">
          {translations.message}
        </p>

        {/* Button */}
        <div className="mt-8 animate-fade-in-delay-2">
          <a
            href="/"
            className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            {translations.button}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
