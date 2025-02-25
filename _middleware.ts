import { NextResponse, NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { cookies } from "next/headers";

const locales = ["en", "ar"];
const headers = { "accept-language": "ar,en;q=0.5" };
const languages = new Negotiator({ headers }).languages();
const defaultLocale = "ar";
// Get the preferred locale, similar to the above or using a library
function getLocale() {
 return match(languages, locales, defaultLocale);
}

export async function middleware(request: NextRequest) {
 // Check if there is any supported locale in the pathname
 const { pathname } = request.nextUrl;

 // Check if the pathname has a locale
 const pathnameHasLocale = locales.some(
  (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
 );

 if (!pathnameHasLocale) {
  const locale = getLocale();

  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
 }



 return NextResponse.next();
 // Redirect if there is no locale
}

export const config = {
 matcher: [
  // Skip all internal paths (_next)
  "/((?!_next/|api/|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|css|js|json|lottie)).*)",

  // Optional: only run on root (/) URL
  // '/'
 ],
};
