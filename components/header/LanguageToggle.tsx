"use client";

import * as React from "react";
import { Languages, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect, useParams, usePathname } from "next/navigation";

export function LanguageToggle() {
  const { setTheme } = useTheme();
  const { lang } = useParams();
  const pathname = usePathname();
  function changeLanguage(lang: string) {
    const currentPathWithoutLang = pathname.replace(/^\/(ar|en)/, "");
    if (lang == "ar") {
      redirect(`/ar${currentPathWithoutLang}`);
    } else {
      redirect(`/en${currentPathWithoutLang}`);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem] " />

          <span className="sr-only ">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("ar")}>
          العربيه
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
