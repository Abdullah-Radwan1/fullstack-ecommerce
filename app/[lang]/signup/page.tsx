"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation";
import { signIn } from "next-auth/react";

const SignUpPage = () => {
  const { lang } = useParams() as { lang: string };
  const ar = lang === "ar";

  return (
    <div className="border rounded-lg mx-auto max-w-md p-6 mt-10 shadow-lg ">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-6 ">
        {ar ? "إنشاء حساب" : "Sign Up"}
      </h1>

      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-1 ">
          {ar ? "البريد الإلكتروني" : "Email"}
        </label>
        <Input
          id="email"
          type="email"
          placeholder={ar ? "أدخل بريدك الإلكتروني" : "Enter your email"}
          className="w-full"
        />
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium mb-1 ">
          {ar ? "كلمة المرور" : "Password"}
        </label>
        <Input
          id="password"
          type="password"
          placeholder={ar ? "أدخل كلمة المرور" : "Enter your password"}
          className="w-full"
        />
      </div>

      {/* Confirm Password Input */}
      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium mb-1 "
        >
          {ar ? "تأكيد كلمة المرور" : "Confirm Password"}
        </label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder={ar ? "أعد إدخال كلمة المرور" : "Re-enter your password"}
          className="w-full"
        />
      </div>

      {/* Sign Up Button */}
      <Button className="w-full from-green-500 to-blue-600 bg-gradient-to-r hover:opacity-90 transition text-white mb-4">
        {ar ? "إنشاء حساب" : "Sign Up"}
      </Button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        <span className="mx-4 text-gray-500 dark:text-gray-400">
          {ar ? "أو" : "OR"}
        </span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      {/* GitHub Sign Up Button */}
      <Button
        onClick={() => signIn("github")}
        className="w-full bg-gray-800 hover:bg-gray-900 text-white mb-4"
      >
        {ar ? "التسجيل باستخدام GitHub" : "Sign Up with GitHub"}
      </Button>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {ar ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
        <Link
          href={`/${lang}/login`}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
        >
          {ar ? "سجل الدخول هنا" : "Login here"}
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
