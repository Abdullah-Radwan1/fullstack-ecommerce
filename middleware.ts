import { NextResponse, type NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

const locales = ["en", "ar"];
const defaultLocale = "en";

// Public routes matcher
const publicRoutesMatcher = createRouteMatcher([
  "/en",
  "/ar",
  "/en/signin",
  "/ar/signin",
  "/en/signin/(.*)",
  "/ar/signin/(.*)",
  "/en/signup",
  "/ar/signup",
  "/en/signup/(.*)",
  "/en/products",
  "/ar/products",
  "/ar/products/(.*)",
]);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Skip locale detection for API and static routes
  const isApiOrStatic =
    pathname.startsWith("/api/") || pathname.startsWith("/_next/");
  if (isApiOrStatic) {
    return NextResponse.next();
  }

  // Robots.txt
  if (pathname.match(/^\/(en|ar)\/robots\.txt$/)) {
    const url = request.nextUrl.clone();
    url.pathname = "/robots.txt";
    return NextResponse.redirect(url);
  }

  // Locale detection
  let detectedLocale = defaultLocale;
  try {
    const negotiator = new Negotiator({
      headers: Object.fromEntries(request.headers),
    });
    const languages = negotiator.languages() || [];
    // Filter out invalid locale codes
    const validLanguages = languages.filter((lang) =>
      /^[a-z]{2}(-[A-Z]{2})?$/.test(lang),
    );
    detectedLocale =
      validLanguages.length > 0
        ? match(validLanguages, locales, defaultLocale)
        : defaultLocale;
  } catch (error) {
    console.error("Locale detection error:", error);
    detectedLocale = defaultLocale;
  }

  const pathSegments = pathname.split("/");
  const lang = pathSegments[1];
  const isSupportedLocale = locales.includes(lang);
  const locale = isSupportedLocale ? lang : detectedLocale;

  // Redirect non-supported locale
  if (!isSupportedLocale) {
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Public routes
  if (publicRoutesMatcher(request)) {
    return NextResponse.next();
  }

  // Authenticated routes
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL(`/${locale}/signin`, request.url));
  }
  interface MyPublicMetadata {
    role?: "USER" | "ADMIN";
  }
  // Admin route check
  if (pathname.startsWith(`/${locale}/admin`)) {
    const role = sessionClaims?.role as string | undefined;
    console.log(role, "ddd");
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|css|js|json|lottie)).*)",
  ],
};
