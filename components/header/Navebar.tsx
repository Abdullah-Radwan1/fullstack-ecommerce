"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/header/ModeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useParams } from "next/navigation";
import { Menu, User2, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavigationMenuDemo() {
  const { lang } = useParams();
  let ar = lang === "ar";

  return (
    <main className="flex justify-evenly items-center">
      {/* logo */}
      <Link
        href={ar ? "/" : "/en"}
        className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-700 bg-clip-text text-transparent"
      >
        {lang === "ar" ? " ڤوجيه هاڤن" : "Vogue-Haven   "}
      </Link>
      <NavigationMenu dir={ar ? "rtl" : "ltr"} className="py-2 container ">
        <NavigationMenuList>
          {/* Home Link */}

          {/* Menu with Subcategories */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              {ar ? "المنيو" : "Menu"}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-2 w-[200px]">
                <ListItem
                  href={ar ? "/menu" : "/en/menu"}
                  title={ar ? "المنتجات" : "Products"}
                >
                  {ar
                    ? "تصفح جميع المنتجات الحديثة"
                    : "Browse all our latest products."}
                </ListItem>
                <ListItem
                  href={ar ? "/menu/labtobs" : "/en/menu/labtobs"}
                  title={ar ? "لاب توب" : "labtobs"}
                >
                  {ar
                    ? "تصفح جميع مجموعة اللاب توب"
                    : "brosse all our latest labtobs."}
                </ListItem>

                <ListItem
                  href={ar ? "/menu/accessories" : "/en/menu/accessories"}
                  title={ar ? "الاكسسوارات" : "Accessories"}
                >
                  {ar
                    ? "تصفح جميع الاكسسوارات الاثرية لجميع المواعيد"
                    : "Browse trendy accessories for all occasions."}
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Contact and About Links - Desktop */}

          <NavigationMenuItem className="hidden md:block">
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {ar ? "من نحن" : "About"}
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
                <Link href="/about">{ar ? "من نحن" : "About"}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={ar ? "/login" : "/en/login"}
                  className="text-base  flex gap-2 items-center  "
                >
                  Acount
                  <UserCircle className="size-6" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </NavigationMenu>

      <div className="hidden md:block">
        <Link
          href={ar ? "/login" : "/en/login"}
          className="text-base  flex gap-2 items-center  "
        >
          Acount
          <UserCircle className="size-6" />
        </Link>
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
