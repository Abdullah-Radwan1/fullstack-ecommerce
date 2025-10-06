"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
// import { ModeToggle } from "@/components/header/ModeToggle";
import { LanguageToggle } from "./LanguageToggle";

import {
  Loader2,
  Lock,
  Menu,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useCartStore, { useSidebarStore } from "@/zustand/store";
import { useEffect, useState } from "react"; // Import useEffect and useState
import { Button } from "../ui/button";

export function Navbar() {
  const { data: session } = useSession();
  const { lang } = useParams() as { lang: string };
  const ar = lang === "ar";
  const role = session?.user?.role;

  // State to track if the component has mounted
  const [isMounted, setIsMounted] = useState(false);

  // Get the quantity from the store
  const quantity = useCartStore((state) => state.getQuantity());

  // Set isMounted to true after the component mounts
  const [scrolled, setScrolled] = useState(false);
  const { togglestate, setTogglestate } = useSidebarStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    setIsMounted(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`overflow-hidden z-50 sticky top-0 w-full transition-colors duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-sm border-b" : ""
      }`}
    >
      <div className="relative w-[90%] md:w-[70%] lg:w-[70%] mx-auto rounded-xl">
        <main className="flex justify-evenly items-center pt-2">
          {/* logo */}
          <Link
            href={ar ? "/" : "/en"}
            className="text-lg xl:text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-700 bg-clip-text text-transparent"
          >
            {lang === "ar" ? " ڤوجيه هاڤن" : "Vogue-Haven   "}
          </Link>
          <NavigationMenu dir={ar ? "rtl" : "ltr"} className="py-2  ">
            <NavigationMenuList>
              {/* Products */}

              <NavigationMenuItem>
                <NavigationMenuLink
                  href={ar ? "/products" : "/en/products"}
                  className={`${navigationMenuTriggerStyle()}hidden md:block  `}
                >
                  {ar ? "المنتجات" : "Products"}
                </NavigationMenuLink>
              </NavigationMenuItem>

              {role === "ADMIN" && (
                <NavigationMenuItem className="hidden md:block">
                  <NavigationMenuLink
                    href={ar ? "/admin" : "/en/admin"}
                    className={`${navigationMenuTriggerStyle()} hidden md:block  `}
                  >
                    <div className="flex items-center gap-2">
                      {ar ? "الادمن " : "Admin"} <Lock size={15} />
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}

              {/* cart*/}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href={ar ? "/cart" : "/en/cart"}
                  className={`${navigationMenuTriggerStyle()} hidden md:block  `}
                >
                  <ShoppingBag size={20} />
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <LanguageToggle />
              </NavigationMenuItem>
              <NavigationMenuItem className="md:hidden">
                <Button
                  variant={"ghost"}
                  className="relative inline-block"
                  onClick={() => setTogglestate(true)}
                >
                  <ShoppingCart size={28} />
                  {/* Only render quantity after mounting */}
                  {isMounted && (
                    <div className="absolute  -right-1 -top-1 rounded-full w-4 h-4 border p-2 text-xs flex items-center justify-center">
                      {quantity}
                    </div>
                  )}
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Menu className="h-10 w-10 hover:bg-muted transition hover:cursor-pointer rounded-lg p-3 " />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="md:hidden" align="end">
                  <DropdownMenuItem>
                    <Link href={ar ? "/products" : "/en/products"}>
                      {ar ? "المنتجات" : "products"}
                    </Link>
                  </DropdownMenuItem>
                  {/* admin or  not  */}
                  {role === "ADMIN" && (
                    <DropdownMenuItem asChild>
                      <Link href={ar ? "/admin" : "/en/admin"}>
                        {ar ? "الادمن" : "Admin"}
                        <Lock />
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    {session ? (
                      <Link
                        className="flex items-center gap-2"
                        href={ar ? "/profile" : "/en/profile"}
                      >
                        {session.user?.name}
                        <Avatar className="size-8">
                          <AvatarImage
                            src={session.user?.image || "/png.png"}
                            alt="@shadcn"
                          />
                          <AvatarFallback>
                            <Loader2 className="animate-spin" />
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                    ) : (
                      <Link
                        href={ar ? "/login" : "/en/login"}
                        className="text-base  flex items-center gap-2  "
                      >
                        {ar ? "تسجيل" : "Login"}
                        <User size={20} />
                      </Link>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </NavigationMenu>

          <div className="hidden md:block">
            {session ? (
              <div className="flex items-center gap-2">
                <div className="relative inline-block cursor-pointer hover:bg-muted p-2 transition rounded-lg ">
                  <ShoppingCart
                    onClick={() => setTogglestate(true)}
                    size={20}
                  />
                  {/* Only render quantity after mounting */}
                  {isMounted && (
                    <div className="absolute  -right-2 -top-2 rounded-full w-4 h-4 border p-2 text-xs flex items-center justify-center">
                      {quantity}
                    </div>
                  )}
                </div>
                <Link
                  href={ar ? "/profile" : "/en/profile"}
                  className="text-base  flex gap-2 items-end border rounded-full  "
                >
                  <Avatar className="size-8">
                    <AvatarImage
                      src={session.user?.image || "/png.png"}
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      <Loader2 className="animate-spin" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href={ar ? "/login" : "/en/login"}
                  className=" flex gap-2  "
                >
                  <p className="bg-gradient-to-r from-green-500 to-blue-700  bg-clip-text text-transparent">
                    {ar ? "تسجيل" : "Login"}
                  </p>
                  <User size={20} color="#008B8B" />
                </Link>
                <Button
                  variant={"ghost"}
                  className="relative inline-block"
                  onClick={() => setTogglestate(true)}
                >
                  <ShoppingCart size={28} />
                  {/* Only render quantity after mounting */}
                  {isMounted && (
                    <div className="absolute  -right-1 -top-1 rounded-full w-4 h-4 border p-2 text-xs flex items-center justify-center">
                      {quantity}
                    </div>
                  )}
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm  leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
