import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Routes requiring authentication
const isProtectedRoute = createRouteMatcher([
  // "/:locale/profile(.*)",
  // "/profile(.*)",
  // "/:locale/checkout(.*)",
  // "/checkout(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // 1. ABSOLUTE API BYPASS: If it's an API route, stop here and let Next.js handle it naturally.
  // This prevents next-intl from redirecting it to /en/api/payment
  if (pathname.startsWith("/api") || pathname.includes("/api/")) {
    return; 
  }

  // 2. Protect pages if matched
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // 3. Apply localization to standard pages
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};