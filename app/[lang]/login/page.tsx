"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import React from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const { lang } = useParams();
  const ar = lang === "ar";

  return (
    <div className="border rounded-lg mx-auto max-w-md p-6 mt-10 shadow-lg  ">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-6 ">
        {ar ? "تسجيل الدخول" : "Login"}
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

      {/* Login Button */}
      <Button className="w-full from-green-500 to-blue-600 bg-gradient-to-r hover:opacity-90 transition toast mb-4">
        {ar ? "تسجيل الدخول" : "Login"}
      </Button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t "></div>
        <span className="mx-4 text-gray-500 dark:text-gray-400">
          {ar ? "أو" : "OR"}
        </span>
        <div className="flex-grow border-t "></div>
      </div>

      {/* GitHub Login Button */}
      <Button
        onClick={() => signIn("github")}
        className="w-full bg-gray-800 text-white hover:bg-gray-900 toast mb-4"
      >
        {ar ? "تسجيل الدخول باستخدام GitHub" : "Login with GitHub"}
      </Button>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {ar ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
        <Link
          href={`/${lang}/signup`}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
        >
          {ar ? "سجل هنا" : "Sign up"}
        </Link>
      </p>
    </div>
  );
};

export default Page;
