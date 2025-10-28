import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

/**
 * Middleware function to handle:
 * 1. Locale detection and redirection
 * 2. Authentication-based redirects
 * 3. Role-based access control
 */
export async function middleware(request: NextRequest) {
  // Extract the pathname from the incoming request URL.
  // Example: for "https://example.com/en/signin" → pathname = "/en/signin"
  const { pathname } = request.nextUrl;

  // Redirect localized robots.txt files to the root "/robots.txt"
  // Example: "/en/robots.txt" → "/robots.txt"
  if (pathname.match(/^\/(en|ar)\/robots\.txt$/)) {
    const url = request.nextUrl.clone(); // Create a mutable copy of the URL
    url.pathname = "/robots.txt"; // Set the new pathname
    return NextResponse.redirect(url); // Return a redirect response
  }

  // Define the locales your app supports
  const locales = ["en", "ar"];
  // Define the default locale if no match is found
  const defaultLocale = "en";

  // Create a Negotiator instance using the request headers
  // This allows us to detect the preferred language of the user's browser
  const negotiator = new Negotiator({
    headers: Object.fromEntries(request.headers),
  });
  // Get an array of languages the client prefers
  // Example: ["ar", "en-US;q=0.8", "en;q=0.5"]
  const languages = negotiator.languages();
  // Match the best supported locale based on the user's preferred languages
  const detectedLocale = match(languages, locales, defaultLocale);

  // Split the pathname into segments to extract the language from the URL
  // Example: "/en/signin" → ["", "en", "signin"]
  const pathSegments = pathname.split("/");
  // Get the first segment after "/" to determine the language
  const lang = pathSegments[1];
  // Check if the extracted language is one of the supported locales
  const isSupportedLocale = locales.includes(lang);
  // Decide which locale to use: the one in the URL or fallback to detected/browser locale
  const locale = isSupportedLocale ? lang : detectedLocale;

  // Retrieve the NextAuth session token from the request and decode it
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET, // Should match your NextAuth secret
  });

  // If the user is logged in (session exists)
  if (session) {
    // Prevent logged-in users from accessing signin/signup pages
    if (pathname === `/${locale}/signin` || pathname === `/${locale}/signup`) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url)); // Redirect to homepage
    }

    // Redirect non-admin users from accessing admin pages
    const userRole = session.role; // Extract role from session token
    if (userRole === "USER" && pathname.startsWith(`/${locale}/admin`)) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  }

  // If the URL does not contain a supported locale, redirect to localized version
  // Example: "/signin" → "/en/signin" or "/ar/signin" based on browser preference
  if (!isSupportedLocale) {
    const newPathname = `/${locale}${pathname}`;
    request.nextUrl.pathname = newPathname; // Update the URL pathname
    return NextResponse.redirect(request.nextUrl); // Redirect to localized path
  }

  // Allow the request to proceed to the original URL
  return NextResponse.next();
}

// Configure the middleware matcher
// Exclude internal Next.js paths, API routes, Stripe webhooks, and static files
export const config = {
  matcher: [
    "/((?!_next/|api/|webhooks/stripe|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|css|js|json|lottie)).*)",
  ],
};
