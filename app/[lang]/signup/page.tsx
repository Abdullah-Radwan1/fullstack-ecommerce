"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

const SignUpPage = () => {
  const { lang } = useParams() as { lang: string };
  const router = useRouter();
  const ar = lang === "ar";

  // State for form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // State for role

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setLoading(true);
      e.preventDefault();

      // Basic validation
      if (password !== confirmPassword) {
        setError(ar ? "كلمة المرور غير متطابقة" : "Passwords do not match");
        return;
      }

      // Call the signIn function with credentials
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirect
        name: username,
        email,
        password,
        role, // Include the selected role
        isSignUp: "true", // Indicate sign-up
        callbackUrl: ar ? "/ar" : "/en", // Redirect after successful sign-up
      });

      // Handle the result

      if (result?.error) {
        setError(result.error);
      } else {
        // Redirect to the dashboard or any other route
        router.push(ar ? "/ar" : "/en");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // TypeScript knows `error` is an Error object with a `message` property
      } else {
        setError("An unknown error occurred"); // Handle cases where the error is not an Error object
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border animate-slide-up-fade rounded-md mx-auto max-w-md p-6 mt-10 shadow-lg">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center mb-6">
        {ar ? "إنشاء حساب" : "Sign Up"}
      </h1>

      {/* Display error message */}
      {error && (
        <div className="mb-4 text-red-500 text-center text-sm">{error}</div>
      )}

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Username Input */}
        <div className="space-y-4">
          <Label htmlFor="username">{ar ? "اسم المستخدم" : "User name"}</Label>
          <Input
            id="username"
            type="text"
            placeholder={ar ? "ادخل اسم المستخدم" : "Enter your user name"}
            className="w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

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

        {/* Role Select */}
        <div className="space-y-2">
          <Label htmlFor="role">{ar ? "الدور" : "Role"}</Label>
          <Select
            dir={ar ? "rtl" : "ltr"}
            onValueChange={(value) => setRole(value)}
          >
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

        {/* Confirm Password Input */}
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
            className="w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Sign Up Button */}
        <Button
          name="SignUp"
          disabled={loading}
          type="submit"
          className="w-full from-my-main  to-my-secondary bg-gradient-to-r hover:opacity-90 transition text-white mb-4"
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

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        <span className="mx-4 text-gray-500 dark:text-gray-400">
          {ar ? "أو" : "OR"}
        </span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
      </div>

      {/* signin Link */}
      <p className="text-center text-sm ">
        {ar ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
        <Link
          href={`/${lang}/signin`}
          className="text-my-main hover:text-my-secondary"
        >
          {ar ? "سجل الدخول هنا" : "signin here"}
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
