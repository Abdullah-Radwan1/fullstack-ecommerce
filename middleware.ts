import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt"; // Use getToken to decode the session token

const locales = ["en", "ar"]; // Supported locales
const defaultLocale = "ar"; // Default locale

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract the lang from the pathname (e.g., /en/login -> "en")
  const pathSegments = pathname.split("/");
  const lang = pathSegments[1]; // The first segment is the lang  // e.g., "/en/login" => "en"

  // Check if the lang is supported
  const isSupportedLocale = locales.includes(lang);

  // If the lang is not supported, fallback to the default locale
  const locale = isSupportedLocale ? lang : defaultLocale;

  // Get the session token from cookies
  // const sessionToken = request.cookies.get("next-auth.session-token")?.value;

  // Decode the session token to get user information
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET, // Ensure this matches your NextAuth secret
  });

  // If the user is authenticated (session exists)
  if (session) {
    // Redirect authenticated users away from login/signup pages
    if (pathname === `/${locale}/login` || pathname === `/${locale}/signup`) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url)); // Redirect to localized homepage
    }

    // Example: Redirect users based on their role
    const userRole = session.role; // Assuming the session contains a `role` field
    if (userRole === "USER" && pathname.startsWith(`/${locale}/admin`)) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
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
    "/((?!_next/|api/|webhooks/stripe|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|css|js|json|lottie)).*)",
  ],
};
