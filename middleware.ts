import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const isAdminRoute = createRouteMatcher(["/:locale/admin(.*)", "/admin(.*)"]);
const intlMiddleware = createMiddleware(routing);

export default clerkMiddleware(async (auth, req) => {
  // 1. If it's an API route, DON'T run intlMiddleware
  // This prevents the /en/api/payment 404 error
  if (req.nextUrl.pathname.startsWith("/api")) {
    return; // Clerk still processes this, but next-intl is skipped
  }

  // 2. Protect Admin Routes
  if (isAdminRoute(req)) {
    const locale = req.nextUrl.pathname.split("/")[1] || "en";
    await auth.protect({
      unauthenticatedUrl: new URL(`/${locale}/signin`, req.url).toString(),
    });
  }

  // 3. Run internationalization for all other routes
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // This allows the middleware to run for EVERY route (including API)
    // so Clerk can detect the session, but our 'if' statement above
    // stops next-intl from messing with the API URLs.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
