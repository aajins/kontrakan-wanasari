import { NextRequest, NextResponse } from "next/server";

export const AUTH_COOKIE = "kw-admin-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public admin routes (login page)
  if (
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/login/")
  ) {
    // If already logged in and accessing login, redirect to dashboard
    const authCookie = request.cookies.get(AUTH_COOKIE);
    if (authCookie?.value) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Protect all admin routes
  if (pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get(AUTH_COOKIE);
    if (!authCookie?.value) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
