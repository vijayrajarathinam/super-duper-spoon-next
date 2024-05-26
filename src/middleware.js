import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRouter = createRouteMatcher(["/sign-in", "/sign-up"]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRouter(request)) auth().protect();
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
