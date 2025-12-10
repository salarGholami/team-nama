import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/otp",
  "/about",
  "/contact",
  "/privacy",
] as const;

function isPublicPath(
  pathname: string
): pathname is (typeof PUBLIC_PATHS)[number] {
  return PUBLIC_PATHS.includes(pathname as (typeof PUBLIC_PATHS)[number]);
}

const PROTECTED_PATHS = [
  "/dashboard",
  "/dashboard/admin",
  "/dashboard/manager",
  "/dashboard/employee",
  "/dashboard/hr",
  "/dashboard/frontend",
  "/dashboard/backend",
  "/dashboard/uiux",
  "/tasks",
  "/tasks/new",
  "/tasks/[id]",
  "/tasks/[id]/edit",
  "/settings",
  "/settings/profile",
  "/settings/appearance",
  "/settings/security",
  "/settings/notifications",
] as const;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (isPublicPath(pathname)) {
    if (token && pathname === "/") {
      const dashboardUrl = new URL("/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }

  if (
    !PROTECTED_PATHS.some((protectedPath) => pathname.startsWith(protectedPath))
  ) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
