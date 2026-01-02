// proxy.ts
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
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  // مسیرهای عمومی — همه اجازه دارن
  if (PUBLIC_PATHS.includes(pathname as any)) {
    if (token && pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // اگر مسیر با /dashboard شروع بشه
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      // لاگین نشده → برو لاگین
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // توکن هست → نقش رو بگیر
    let role = "employee"; // پیش‌فرض
    try {
      const payload = JSON.parse(atob(token));
      role = payload.role || "employee";
    } catch {
      // توکن نامعتبر → لاگین
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // اگر دقیقاً /dashboard باشه → به داشبورد نقش خودش ببر
    if (pathname === "/dashboard") {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    // اگر مسیر با نقش مطابقت نداشته باشه → به داشبورد خودش ببر
    if (!pathname.startsWith(`/dashboard/${role}`)) {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }

    // همه چیز درست → اجازه بده
    return NextResponse.next();
  }

  // بقیه مسیرها (مثل /tasks, /settings) — اگر توکن باشه اجازه بده
  if (token) {
    return NextResponse.next();
  }

  // اگر توکن نباشه و مسیر محافظت‌شده باشه → لاگین
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
