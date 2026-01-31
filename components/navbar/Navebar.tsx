"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageToggle } from "./LanguageToggle";
import useCartStore, { useSidebarStore } from "@/zustand/store";
import { cn } from "@/lib/utils";
import {
  Columns2,
  LayoutDashboard,
  Loader2,
  LogIn,
  PanelLeft,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCartIcon,
  User,
  UserCircle,
} from "lucide-react";
import { SearchBar } from "./SearchBar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import LogoutDialog from "@/app/[lang]/profile/LogoutDialog";

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
        "sticky top-0 z-50 w-full border-b border-border transition-all",
        scrolled
          ? "bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
          : "bg-background",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-3 flex flex-wrap items-center justify-between">
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
        {/* ================= Actions ================= */}

        <div className="flex items-center gap-2">
          {/* ---------- Desktop actions ---------- */}

          <div className="hidden md:flex items-center gap-2">
            <Link href={routes.products}>
              <Button className="bg-primary  hover:bg-my-secondary">
                {t("المتجر", "Shop")} <ShoppingCartIcon />
              </Button>
            </Link>

            {role === "ADMIN" && (
              <Link href={routes.admin}>
                <Button
                  variant="ghost"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {t("لوحة التحكم", "Admin")}
                </Button>
              </Link>
            )}

            <LanguageToggle />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTogglestate(true)}
              className="text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <Columns2 className="size-5" />
            </Button>

            <Link href={routes.cart} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <ShoppingBasket className="size-5" />
              </Button>
              {quantity > 0 && <CartBadge quantity={quantity} />}
            </Link>

            {!isLoaded ? (
              <Loader2 className="size-5 animate-spin text-foreground" />
            ) : isSignedIn ? (
              <Link href={routes.profile}>
                <Avatar className="size-7 border border-border">
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.firstName?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Link href={routes.signin}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <User className="size-5" />
                </Button>
              </Link>
            )}
          </div>

          {/* ---------- Mobile actions ---------- */}
          <div className="flex items-center gap-1 md:hidden">
            {/* Language – always visible */}
            <LanguageToggle />

            {/* Cart – always visible */}
            <Link href={routes.cart} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <ShoppingBasket className="size-5" />
              </Button>
              {quantity > 0 && <CartBadge quantity={quantity} />}
            </Link>

            {/* Dropdown menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <MoreVertical className="size-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 bg-card text-card-foreground border border-border rounded-lg shadow-lg"
              >
                {/* Shop */}
                <DropdownMenuItem asChild>
                  <Link
                    href={routes.products}
                    className="flex items-center gap-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    <ShoppingBag className="size-4" />
                    {t("تسوق الآن", "Shop")}
                  </Link>
                </DropdownMenuItem>

                {/* Admin */}
                {role === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link
                      href={routes.admin}
                      className="flex items-center gap-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    >
                      <LayoutDashboard className="size-4" />
                      {t("لوحة التحكم", "Admin")}
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator className="bg-border" />

                {/* Sidebar */}
                <DropdownMenuItem
                  onClick={() => setTogglestate(true)}
                  className="flex items-center gap-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  <PanelLeft className="size-4" />
                  {t("القائمة الجانبية", "Sidebar")}
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-border" />

                {/* Profile / Sign in */}
                <DropdownMenuItem asChild>
                  {isSignedIn ? (
                    <Link
                      href={routes.profile}
                      className="flex items-center gap-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    >
                      <UserCircle className="size-4" />
                      {t("الملف الشخصي", "Profile")}
                    </Link>
                  ) : (
                    <Link
                      href={routes.signin}
                      className="flex items-center gap-3 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    >
                      <LogIn className="size-4" />
                      {t("تسجيل الدخول", "Sign in")}
                    </Link>
                  )}
                </DropdownMenuItem>

                {/* Sign out */}
                {isSignedIn && (
                  <>
                    <DropdownMenuSeparator className="bg-border" />
                    <LogoutDialog ar={ar} />
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* ================= End Actions ================= */}
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
