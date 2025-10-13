"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Page = () => {
  const { lang } = useParams();
  const router = useRouter();

  const ar = lang === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await signIn("credentials", {
      email,
      password, // Hash password before sending
      redirect: false, // Avoid page reload
    });

    if (res?.error) {
      setErrorMsg(res.error);
      setLoading(false);
      setGithubLoading(false);
    } else {
      setLoading(false);
      router.push(ar ? "/" : "/en"); // Redirect to dashboard on success
      setGithubLoading(false);
    }
  };

  return (
    <div className="border animate-slide-up-fade rounded-md mx-auto max-w-md p-6 mt-10 shadow-lg min-h-[55vh]">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-6">
        {ar ? "تسجيل الدخول" : "Login"}
      </h1>

      {/* Error Message */}
      {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

      {/* Login Form */}
      <form onSubmit={handleLogin}>
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            {ar ? "البريد الإلكتروني" : "Email"}
          </label>
          <Input
            id="email"
            type="email"
            placeholder={ar ? "أدخل بريدك الإلكتروني" : "Enter your email"}
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            {ar ? "كلمة المرور" : "Password"}
          </label>
          <Input
            id="password"
            type="password"
            placeholder={ar ? "أدخل كلمة المرور" : "Enter your password"}
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <Button
          name="login"
          type="submit"
          className="w-full bg-gradient-to-r from-my-main  to-my-secondary  hover:opacity-90 transition mb-4"
          disabled={loading}
        >
          {loading ? (
            ar ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              "Logging in..."
            )
          ) : ar ? (
            "تسجيل الدخول"
          ) : (
            "Login"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t"></div>
        <span className="mx-4 text-gray-500">{ar ? "أو" : "OR"}</span>
        <div className="flex-grow border-t"></div>
      </div>

      {/* GitHub Login Button */}
      <Button
        disabled={loading || githubLoading}
        onClick={() => signIn("github")}
        className="w-full bg-gray-800 text-white hover:bg-gray-900 mb-4"
      >
        {ar ? "تسجيل الدخول باستخدام GitHub" : "Login with GitHub"}
      </Button>

      {/* Sign Up Link */}
      <p className="text-center text-sm ">
        {ar ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
        <Link
          href={`/${lang}/signup`}
          className="text-my-main hover:text-blue-700"
        >
          {ar ? "سجل هنا" : "Sign up"}
        </Link>
      </p>
    </div>
  );
};

export default Page;
