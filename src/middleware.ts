import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { getSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicPaths = ["/login", "/signup", "/verify-email"];

  // Skip auth check for public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  const session = await getSession(await headers());

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Add path info to headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-path", pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api).*)"],
};
