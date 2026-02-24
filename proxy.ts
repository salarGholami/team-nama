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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // ---------------------------
  // PUBLIC ROUTES
  // ---------------------------
  if (PUBLIC_PATHS.includes(pathname as any)) {
    if (token && pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // ---------------------------
  // DASHBOARD ROUTES
  // ---------------------------
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    let role = "employee";

    try {
      const payload = JSON.parse(Buffer.from(token, "base64").toString());
      role = (payload.role ?? "employee").toLowerCase(); // ⭐ مهم
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // /dashboard → /dashboard/{role}
    if (pathname === "/dashboard") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    // جلوگیری از دسترسی به نقش دیگر
    if (!pathname.startsWith(`/dashboard/${role}`)) {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    return NextResponse.next();
  }

  // ---------------------------
  // OTHER ROUTES
  // ---------------------------
  if (token) return NextResponse.next();

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
