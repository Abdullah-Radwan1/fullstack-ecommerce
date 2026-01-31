"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageToggle } from "./LanguageToggle";
import useCartStore, { useSidebarStore } from "@/zustand/store";
import { cn } from "@/lib/utils";
import { Columns2, Loader2, ShoppingBasket, User } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { Button } from "../ui/button";

export function Navbar() {
  const { lang } = useParams() as { lang: string };
  const ar = lang === "ar";

  const { user, isLoaded, isSignedIn } = useUser();

  // State for the user's role
  const role =
    (user?.publicMetadata as { role?: "USER" | "ADMIN" })?.role ?? "USER";

  const [scrolled, setScrolled] = useState(false);
  const { setTogglestate } = useSidebarStore();

  const quantity = useCartStore((state) =>
    state.items.reduce((acc, it) => acc + (it.quantity || 0), 0),
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = (arText: string, enText: string) => (ar ? arText : enText);

  const routes = {
    home: `/${lang}`,
    products: `/${lang}/shop`,
    admin: `/${lang}/admin`,
    signin: `/${lang}/signin`,
    profile: `/${lang}/profile`,
    cart: `/${lang}/cart`,
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all",
        scrolled &&
          "bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={routes.home}
          className="text-xl font-bold bg-gradient-to-r from-my-main to-my-secondary bg-clip-text text-transparent"
        >
          {t("ڤوجيه هاڤن", "Vogue Haven")}
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 justify-center">
          <SearchBar ar={ar} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Products */}
          <Link href={routes.products} className="hidden  md:block">
            <Button className="text-black">{t("تسوق الآن", "Shop Now")}</Button>
          </Link>

          {/* Admin button */}
          {role === "ADMIN" && (
            <Link href={routes.admin} className="text-md font-medium">
              <Button variant="ghost">{t("لوحة التحكم", "Admin")}</Button>
            </Link>
          )}

          {/* Language Toggle */}
          <LanguageToggle />

          {/* Sidebar */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTogglestate(true)}
          >
            <Columns2 className="size-5" />
          </Button>

          {/* Cart */}
          <Link href={routes.cart} className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingBasket className="size-5" />
            </Button>
            {quantity > 0 && <CartBadge quantity={quantity} />}
          </Link>

          {/* Profile / Sign in */}
          {!isLoaded ? (
            <Loader2 className="size-5 animate-spin" />
          ) : isSignedIn ? (
            <Link href={routes.profile}>
              <Avatar className="size-7">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>{user.firstName?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href={routes.signin}>
              <Button variant="ghost" size="icon">
                <User className="size-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar ar={ar} />
      </div>
    </header>
  );
}

/* ---------------- Cart Badge ---------------- */
function CartBadge({ quantity }: { quantity: number }) {
  return (
    <span className="absolute -top-1.5 -right-1.5 h-4 w-4 flex items-center justify-center rounded-full bg-my-main text-xs font-bold text-black">
      {quantity}
    </span>
  );
}
