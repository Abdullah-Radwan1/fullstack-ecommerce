"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageToggle } from "./LanguageToggle";
import useCartStore, { useSidebarStore } from "@/zustand/store";
import { cn } from "@/lib/utils";
import { Columns2, Loader2, ShoppingBasket, User } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { Button } from "../ui/button";

export function Navbar() {
  const { data: session } = useSession();
  const { lang } = useParams() as { lang: string };
  const ar = lang === "ar";
  const role = session?.user?.role;

  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setTogglestate } = useSidebarStore();

  // ✅ Derive quantity from items so Zustand tracks items and re-renders correctly
  const quantity = useCartStore((state) =>
    state.items.reduce((acc, it) => acc + (it.quantity || 0), 0)
  );

  useEffect(() => {
    // mark mounted (fixes SSR hydration / conditional UI)
    setIsMounted(true);

    const handleScroll = () => {
      setScrolled((prev) => {
        const next = window.scrollY > 10;
        return prev === next ? prev : next;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = (arText: string, enText: string) => (ar ? arText : enText);
  const routes = {
    home: ar ? "/ar" : "/en",
    products: ar ? "/ar/products" : "/products",
    admin: ar ? "/ar/admin" : "/admin",
    signin: ar ? "/ar/signin" : "/signin",
    profile: ar ? "/ar/profile" : "/profile",
    cart: ar ? "/ar/cart" : "/cart",
  };
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all",
        scrolled &&
          "bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 md:px-8 py-3">
        {/* Logo */}
        <Link
          href={routes.home}
          className="text-lg md:text-2xl font-bold bg-gradient-to-r from-my-main to-my-secondary bg-clip-text text-transparent"
        >
          {t("ڤوجيه هاڤن", "Vogue-Haven")}
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 justify-center ">
          <SearchBar ar={ar} />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Products Button */}
          <Link href={routes.products} className="hidden md:block">
            <Button name="shop now">{t("تسوق الآن", "Shop Now")}</Button>
          </Link>

          {/* Admin Link */}
          {role === "ADMIN" && (
            <Link href={routes.admin} className="underline text-sm font-medium">
              {t("لوحة التحكم", "Admin")}
            </Link>
          )}

          {/* Language Toggle */}
          <LanguageToggle />

          {/* Sidebar Toggle */}
          <Button
            name="sidebar"
            variant="ghost"
            size="icon"
            onClick={() => setTogglestate(true)}
          >
            <Columns2 className="size-5" />
          </Button>

          {/* Cart */}
          <Link href={routes.cart} className="relative">
            <Button name="cart" variant="ghost" size="icon">
              <ShoppingBasket className="size-5" />
            </Button>

            {/* render badge only after mount to avoid SSR mismatch */}
            {quantity > 0 && <CartBadge quantity={quantity} />}
          </Link>

          {/* Profile / Signin */}
          {session ? (
            <Link href={routes.profile}>
              <Avatar className="size-8">
                <AvatarImage
                  alt="user image"
                  src={session.user?.image || "/png.png"}
                />
                <AvatarFallback>
                  <Loader2 className="size-4 animate-spin" />
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href={routes.signin}>
              <Button name="signin" variant="ghost" size="icon">
                <User className="size-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="flex md:hidden px-4 pb-3">
        <SearchBar ar={ar} />
      </div>
    </header>
  );
}

/* --------------------------- Cart Badge --------------------------- */
function CartBadge({ quantity }: { quantity: number }) {
  return (
    <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-my-main text-xs font-bold text-black">
      {quantity}
    </span>
  );
}
