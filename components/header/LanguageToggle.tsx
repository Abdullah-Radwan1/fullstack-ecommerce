"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  //redirect by default delete the searchparams
  function changeLanguage(lang: string) {
    // Remove the current language prefix from the pathname
    const currentPathWithoutLang = pathname.replace(/^\/(ar|en)/, "");

    // Preserve the search params
    const searchParamsString = searchParams.toString();
    const queryString = searchParamsString ? `?${searchParamsString}` : "";

    // Redirect to the new language with the same path and search params
    router.push(`/${lang}/${currentPathWithoutLang}${queryString}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
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
