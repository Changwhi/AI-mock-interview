import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/",
  "/main(.*)",
  "/(auth)/sign-in(.*)",
  "/(auth)/sign-up(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],

};
