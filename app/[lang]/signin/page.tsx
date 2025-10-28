"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

const Page = () => {
  const { lang } = useParams();
  const router = useRouter();

  const ar = lang === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Hash password before sending
    });

    if (res?.error) {
      setErrorMsg(res.error);
      setLoading(false);
    } else {
      setLoading(false);
      router.push(ar ? "/" : "/en"); // Redirect to dashboard on success
    }
  };

  return (
    <div className="border animate-slide-up-fade rounded-md mx-auto max-w-md p-6  shadow-lg  ">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-6">
        {ar ? "تسجيل الدخول " : "Welcome Back "}
      </h1>

      {/* Error Message */}
      {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

      {/* signin Form */}
      <form className="space-y-4" onSubmit={handleSignin}>
        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">{ar ? "البريد الإلكتروني" : "Email"}</Label>
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
        <div className="space-y-2">
          <Label htmlFor="password">{ar ? "كلمة المرور" : "Password"}</Label>
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

        {/* signin Button */}
        <Button
          name="signin"
          type="submit"
          className="w-full bg-gradient-to-r from-my-main  to-my-secondary  hover:opacity-90 transition mb-4"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin mx-auto" />
          ) : ar ? (
            "تسجيل الدخول"
          ) : (
            "signin"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t"></div>
        <span className="mx-4 text-gray-500">{ar ? "أو" : "OR"}</span>
        <div className="flex-grow border-t"></div>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-sm ">
        {ar ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
        <Link
          href={`/${lang}/signup`}
          className="text-my-main hover:text-my-secondary"
        >
          {ar ? "سجل هنا" : "Sign up"}
        </Link>
      </p>
    </div>
  );
};

export default Page;
