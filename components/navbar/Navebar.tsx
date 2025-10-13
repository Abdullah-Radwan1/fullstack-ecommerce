"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LanguageToggle } from "./LanguageToggle";
import useCartStore, { useSidebarStore } from "@/zustand/store";
import { cn } from "@/lib/utils";
import { Columns2, Loader2, Lock, ShoppingBasket, User } from "lucide-react";
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
  const quantity = useCartStore((state) => state.getQuantity());

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = (arText: string, enText: string) => (ar ? arText : enText);

  const routes = {
    home: ar ? "/" : "/en",
    products: ar ? "/products" : "/en/products",
    admin: ar ? "/admin" : "/en/admin",
    login: ar ? "/login" : "/en/login",
    profile: ar ? "/profile" : "/en/profile",
    cart: ar ? "/cart" : "/en/cart",
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300 border-b",
        scrolled && "bg-background/90 backdrop-blur-sm"
      )}
    >
      <div className="flex items-center justify-between mx-auto w-[90%] md:w-[80%] py-3">
        {/* -------- Left: Logo -------- */}
        <Link
          href={routes.home}
          className="text-lg  xl:text-2xl font-bold bg-gradient-to-r from-my-main  to-my-secondary  bg-clip-text text-transparent"
        >
          {t("ڤوجيه هاڤن", "Vogue-Haven")}
        </Link>

        {/* -------- Center: Search Bar -------- */}
        <div className="hidden md:flex flex-1 items-center w-full relative">
          <SearchBar ar={ar} />
        </div>

        {/* -------- Right: Actions -------- */}
        <div className=" flex items-center gap-3">
          {/* products */}
          <Link href={routes.products} className="hidden md:block">
            <Button name="shop-now" variant="outline">
              {t("تسوق الآن", "Shop Now")}
            </Button>
          </Link>
          {/* Admin */}
          {role === "ADMIN" && (
            <Link
              href={routes.admin}
              className="flex items-center gap-1 text-sm hover:text-primary transition"
            >
              <Lock />
              {t("الادمن", "Admin")}
            </Link>
          )}

          {/* Language Toggle */}

          {/* Cart */}
          <div
            className=" cursor-pointer hover:bg-muted p-2 rounded-lg transition"
            onClick={() => setTogglestate(true)}
          >
            <Columns2 />
          </div>
          {/* cart page */}
          <Link className="relative hover:bg-accent p-2" href={routes.cart}>
            {" "}
            <ShoppingBasket />
            {isMounted && <CartBadge quantity={quantity} />}
          </Link>
          {/* Language Toggle */}
          <LanguageToggle />

          {/* Login / Profile */}
          {session ? (
            <Link href={routes.profile} className="border rounded-full">
              <Avatar className="size-8">
                <AvatarImage src={session.user?.image || "/png.png"} />
                <AvatarFallback>
                  <Loader2 className="animate-spin" />
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link
              href={routes.login}
              className="flex items-center gap-1 text-sm text-foreground hover:bg-accent p-2 transition"
            >
              <span className="sr-only">Login</span>
              <User />
            </Link>
          )}
        </div>
      </div>

      {/* -------- Mobile Search Bar (below navbar) -------- */}
      <div className="flex md:hidden items-center mx-6 relative">
        <SearchBar ar={ar} />
      </div>
    </header>
  );
}

/* --------------------------- Helper --------------------------- */
function CartBadge({ quantity }: { quantity: number }) {
  return (
    <div className="absolute -right-2 -top-2 rounded-full w-4 h-4 border text-xs flex items-center justify-center bg-blue-600">
      {quantity}
    </div>
  );
}
