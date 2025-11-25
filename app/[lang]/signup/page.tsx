"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const SignUpPage = () => {
  const { lang } = useParams() as { lang: string };
  const router = useRouter();
  const ar = lang === "ar";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // ADMIN or USER
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError(ar ? "كلمة المرور غير متطابقة" : "Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        name: username,
        email,
        password,
        role,
        isSignUp: "true",
        callbackUrl: ar ? "/ar" : "/en",
      });

      if (result?.error) setError(result.error);
      else router.push(ar ? "/ar" : "/en");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded-md shadow-lg animate-slide-up-fade">
      <h1 className="text-2xl font-bold text-center mb-6">
        {ar ? "إنشاء حساب" : "Sign Up"}
      </h1>

      {error && (
        <p className="text-center text-red-500 mb-4 text-sm">{error}</p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="username">{ar ? "اسم المستخدم" : "User name"}</Label>
          <Input
            id="username"
            type="text"
            placeholder={ar ? "ادخل اسم المستخدم" : "Enter your user name"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

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
          <Label htmlFor="role">{ar ? "الدور" : "Role"}</Label>
          <Select dir={ar ? "rtl" : "ltr"} onValueChange={setRole}>
            <SelectTrigger id="role" className="w-full">
              <SelectValue placeholder={ar ? "أدخل الدور" : "Select a Role"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{ar ? "الدور" : "Role"}</SelectLabel>
                <SelectItem value="ADMIN">{ar ? "ادمن" : "Admin"}</SelectItem>
                <SelectItem value="USER">{ar ? "مستخدم" : "User"}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            {ar ? "تأكيد كلمة المرور" : "Confirm Password"}
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder={
              ar ? "أعد إدخال كلمة المرور" : "Re-enter your password"
            }
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button
         
          type="submit"
          className="w-full bg-gradient-to-r from-my-main to-my-secondary hover:opacity-90"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin m-auto" />
          ) : ar ? (
            "إنشاء حساب"
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        <span className="mx-4 text-gray-500 dark:text-gray-400">
          {ar ? "أو" : "OR"}
        </span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      <p className="text-center text-sm">
        {ar ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
        <Link
          href={`/${lang}/signin`}
          className="text-my-main hover:text-my-secondary"
        >
          {ar ? "سجل الدخول هنا" : "Sign in here"}
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
