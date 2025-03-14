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
import { ModeToggle } from "@/components/header/ModeToggle";
import { LanguageToggle } from "./LanguageToggle";

import { Loader2, Lock, Menu, ShoppingCart, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useCartStore from "@/zustand/store";
import { useEffect, useState } from "react"; // Import useEffect and useState

export function NavigationMenuDemo() {
  const { data: session } = useSession();
  const { lang } = useParams() as { lang: string };
  const ar = lang === "ar";
  const role = session?.user?.role;

  // State to track if the component has mounted
  const [isMounted, setIsMounted] = useState(false);

  // Get the quantity from the store
  const quantity = useCartStore((state) => state.getQuantity());

  // Set isMounted to true after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="flex justify-evenly items-center pt-2">
      {/* logo */}
      <Link
        href={ar ? "/" : "/en"}
        className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-700 bg-clip-text text-transparent"
      >
        {lang === "ar" ? " ڤوجيه هاڤن" : "Vogue-Haven   "}
      </Link>
      <NavigationMenu dir={ar ? "rtl" : "ltr"} className="py-2  ">
        <NavigationMenuList>
          {/* Products */}
          <NavigationMenuItem className="hidden md:block">
            <Link
              href={ar ? "/products" : "/en/products"}
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {ar ? "المنتجات" : "products"}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {/* About Links  */}

          <NavigationMenuItem className="hidden md:block">
            <Link href={ar ? "/about" : "/en/about"} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {ar ? "من نحن" : "About"}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {role === "ADMIN" && (
            <NavigationMenuItem className="hidden md:block">
              <Link href={ar ? "/admin" : "/en/admin"} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} flex items-center gap-2`}
                >
                  {ar ? "الادمن " : "Admin"} <Lock size={15} />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )}

          {/* cart*/}
          <NavigationMenuItem className="">
            <Link className="relative" href="/cart" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} relative`}
              >
                <ShoppingCart />
                {/* Only render quantity after mounting */}
                {isMounted && (
                  <div className="absolute  -right-1 -top-1 rounded-full w-4 h-4 border p-2 text-xs flex items-center justify-center">
                    {quantity}
                  </div>
                )}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <LanguageToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2">
                <Menu className="h-6 w-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={ar ? "/about" : "/en/about"}>
                  {ar ? "من نحن" : "About"}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {session ? (
                  <div className="flex items-center gap-2">
                    <Link
                      href={ar ? "/profile" : "/en/profile"}
                      className="text-base  flex gap-2 items-center  "
                    >
                      {session.user?.name}
                    </Link>
                    <Avatar>
                      <AvatarImage
                        src={session.user?.image || "/png.png"}
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        <Loader2 className="animate-spin" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <Link
                    href={ar ? "/login" : "/en/login"}
                    className="text-base  flex gap-2 items-center  "
                  >
                    Account
                    <UserCircle className="size-6" />
                  </Link>
                )}
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </NavigationMenu>

      <div className="hidden md:block">
        {session ? (
          <div className="flex items-center gap-2">
            <Link
              href={ar ? "/profile" : "/en/profile"}
              className="text-base  flex gap-2 items-end  "
            >
              {session.user?.name}

              <Avatar>
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
          <Link
            href={ar ? "/login" : "/en/login"}
            className="text-base  flex gap-2 items-center  "
          >
            Account
            <UserCircle className="size-6" />
          </Link>
        )}
      </div>
    </main>
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
