import { NextResponse, NextRequest } from "next/server";

const locales = ["en", "ar"]; // Supported locales
const defaultLocale = "ar"; // Default locale

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract the lang from the pathname (e.g., /en/login -> "en")
  const pathSegments = pathname.split("/");
  const lang = pathSegments[1]; // The first segment is the lang

  // Check if the lang is supported
  const isSupportedLocale = locales.includes(lang);

  // If the lang is not supported, fallback to the default locale
  const locale = isSupportedLocale ? lang : defaultLocale;

  // Check for the next-auth.session-token cookie
  const sessionToken = request.cookies.get("next-auth.session-token");

  // If the session token exists and the user is trying to access login/signup, redirect to home
  if (sessionToken) {
    if (pathname === `/${locale}/login` || pathname === `/${locale}/signup`) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url)); // Redirect to localized homepage
    }
  }

  // If the lang is not in the pathname, redirect to the localized version of the path
  if (!isSupportedLocale) {
    const newPathname = `/${locale}${pathname}`;
    request.nextUrl.pathname = newPathname;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next/|api/|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|css|js|json|lottie)).*)",
  ],
};
