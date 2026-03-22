"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";

// IMPORTANT: Import these from your local i18n/navigation file
// usually created via createNavigation(routing)
import { usePathname, useRouter } from "@/i18n/routing";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function changeLanguage(nextLocale: "en" | "ar") {
    startTransition(() => {
      // .replace keeps the user on the same page but switches the locale
      // it automatically handles the [locale] prefix in the URL
      router.replace({ pathname, query: params }, { locale: nextLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="transition bg-none hover:bg-accent p-1"
          aria-label="language"
          disabled={isPending}
        >
          <Languages className={isPending ? "opacity-50" : ""} />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("ar")}>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
