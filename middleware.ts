import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Route matcher for the user. If the user's on '/sign-in' then this will be TRUE.
const isPublicRoute = createRouteMatcher(["/", "/sign-in"]);

// Middleware to check if a user is authenticated before allowing them to access certain routes.
export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // Logged in user will have a userId meaning that the user is authenticated.
  if (!isPublicRoute(req) && !userId) {
    return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
