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

const DASHBOARD_SEGMENT_MAP: Record<string, string> = {
  ceo: "CEO",
  backenddeveloper: "BackendDeveloper",
  client: "Client",
  cto: "CTO",
  frontenddeveloper: "FrontendDeveloper",
  productmanager: "ProductManager",
  projectmanager: "ProjectManager",
  qaeengineer: "QAEngineer",
  salesmanager: "SalesManager",
  sto: "STO",
  uidesigner: "UIDesigner",
  users: "Users",
  employees: "Employees",
  customers: "Customers",
  settings: "Settings",
  request: "Request",
  roles: "Roles",
  access: "Access",
  "roles&access": "Roles&Access",
  loanrequest: "LoanRequest",
  leaverequest: "LeaveRequest",
  salaryincreaserequset: "SalaryIncreaseRequset",
  new: "new",
  edit: "edit",
};

function normalizeDashboardPath(pathname: string) {
  if (!pathname.startsWith("/dashboard")) return pathname;

  const segments = pathname.split("/").filter(Boolean);
  if (!segments.length || segments[0].toLowerCase() !== "dashboard") {
    return pathname;
  }

  const normalizedSegments = segments.map((segment, index) => {
    if (index === 0) return "dashboard";
    if (segment.startsWith("[") && segment.endsWith("]")) return segment;
    if (/^\d+$/.test(segment)) return segment;

    const lower = segment.toLowerCase();
    return (
      DASHBOARD_SEGMENT_MAP[lower] ??
      segment.charAt(0).toUpperCase() + segment.slice(1)
    );
  });

  return `/${normalizedSegments.join("/")}`;
}

function getCanonicalDashboardPath(role: string) {
  const normalizedRole = role?.trim();
  if (!normalizedRole) return "/dashboard/employee";

  const roleSegment =
    DASHBOARD_SEGMENT_MAP[normalizedRole.toLowerCase()] ??
    normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1);

  return `/dashboard/${roleSegment}`;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalizedPathname = normalizeDashboardPath(pathname);

  if (normalizedPathname !== pathname) {
    const redirectUrl = new URL(request.url);
    redirectUrl.pathname = normalizedPathname;
    return NextResponse.redirect(redirectUrl);
  }

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

    const canonicalDashboardPath = getCanonicalDashboardPath(role);

    // /dashboard → /dashboard/{role}
    if (pathname === "/dashboard") {
      return NextResponse.redirect(
        new URL(canonicalDashboardPath, request.url),
      );
    }

    const normalizedCurrentPath = normalizeDashboardPath(pathname);

    // جلوگیری از دسترسی به نقش دیگر
    if (
      normalizedCurrentPath !== canonicalDashboardPath &&
      !normalizedCurrentPath.startsWith(`${canonicalDashboardPath}/`)
    ) {
      return NextResponse.redirect(
        new URL(canonicalDashboardPath, request.url),
      );
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
