import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: {
    mode: "always",
    prefixes: {
      en: "",
      ar: "",
      // (/zh will be used as-is)
    },
  },
});
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
