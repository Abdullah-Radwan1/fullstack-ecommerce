"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) setErrorMsg(res.error);
    else router.push(ar ? "/" : "/en");

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-md shadow-lg animate-slide-up-fade">
      <h1 className="text-2xl font-bold text-center mb-6">
        {ar ? "تسجيل الدخول" : "Welcome Back"}
      </h1>

      {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

      <form className="space-y-4" onSubmit={handleSignin}>
        <div className="space-y-2">
          <Label htmlFor="email">{ar ? "البريد الإلكتروني" : "Email"}</Label>
          <Input
            id="email"
            type="email"
            placeholder={ar ? "أدخل بريدك الإلكتروني" : "Enter your email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{ar ? "كلمة المرور" : "Password"}</Label>
          <Input
            id="password"
            type="password"
            placeholder={ar ? "أدخل كلمة المرور" : "Enter your password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          
          type="submit"
          className="w-full bg-gradient-to-r from-my-main to-my-secondary hover:opacity-90"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin mx-auto" />
          ) : ar ? (
            "تسجيل الدخول"
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t"></div>
        <span className="mx-4 text-gray-500">{ar ? "أو" : "OR"}</span>
        <div className="flex-grow border-t"></div>
      </div>

      <p className="text-center text-sm">
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
