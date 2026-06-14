import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Routes requiring authentication
const isProtectedRoute = createRouteMatcher([
  "/:locale/profile(.*)",
  "/profile(.*)",
  "/:locale/checkout(.*)",
  "/checkout(.*)",
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
    // Catch root paths
    "/",
    
    // Catch your multi-language pages
    "/(ar|en)/:path*", 

    // Catch application routes but explicitly exclude API routes and static assets
    // Adding 'api' to the lookahead block prevents the matcher from running middleware over normal API streams
    "/((?!_next/static|_next/image|api|favicon.ico|apple-icon.png|manifest.json|.*\\..*$).*)",
    
    // Keep internal Clerk tracking awake
    "/__clerk/(.*)",
  ],
};