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

function normalizeDashboardPath(pathname: string): string {
  if (!pathname.startsWith("/dashboard")) {
    return pathname;
  }

  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length || segments[0].toLowerCase() !== "dashboard") {
    return pathname;
  }

  const normalizedSegments = segments.map((segment, index) => {
    if (index === 0) {
      return "dashboard";
    }

    if (segment.startsWith("[") && segment.endsWith("]")) {
      return segment;
    }

    if (/^\d+$/.test(segment)) {
      return segment;
    }

    const lower = segment.toLowerCase();

    return (
      DASHBOARD_SEGMENT_MAP[lower] ??
      segment.charAt(0).toUpperCase() + segment.slice(1)
    );
  });

  return `/${normalizedSegments.join("/")}`;
}

function getCanonicalDashboardPath(role: string): string {
  const normalizedRole = role?.trim();

  if (!normalizedRole) {
    return "/dashboard/employee";
  }

  const roleSegment =
    DASHBOARD_SEGMENT_MAP[normalizedRole.toLowerCase()] ??
    normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1);

  return `/dashboard/${roleSegment}`;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * -------------------------------------------------------
   * STATIC ASSETS
   * -------------------------------------------------------
   *
   * Files inside /public must NEVER pass through
   * authentication middleware.
   *
   * Examples:
   *
   * /logos/logo-dark.png
   * /logos/logo-light.png
   * /images/team/1.jpg
   * /images/avatar/workers/CEO/salar.png
   * -------------------------------------------------------
   */

  const isStaticAsset =
    pathname.startsWith("/logos/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/fonts/") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/_next/");

  if (isStaticAsset) {
    return NextResponse.next();
  }

  /**
   * -------------------------------------------------------
   * DASHBOARD PATH NORMALIZATION
   * -------------------------------------------------------
   */

  const normalizedPathname = normalizeDashboardPath(pathname);

  if (normalizedPathname !== pathname) {
    const redirectUrl = new URL(request.url);

    redirectUrl.pathname = normalizedPathname;

    return NextResponse.redirect(redirectUrl);
  }

  /**
   * -------------------------------------------------------
   * AUTH TOKEN
   * -------------------------------------------------------
   */

  const token = request.cookies.get("token")?.value;

  /**
   * -------------------------------------------------------
   * PUBLIC ROUTES
   * -------------------------------------------------------
   */

  if (PUBLIC_PATHS.includes(pathname as (typeof PUBLIC_PATHS)[number])) {
    if (token && pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  /**
   * -------------------------------------------------------
   * DASHBOARD ROUTES
   * -------------------------------------------------------
   */

  if (pathname.startsWith("/dashboard")) {
    /**
     * User is not authenticated.
     */
    if (!token) {
      const loginUrl = new URL("/login", request.url);

      loginUrl.searchParams.set("callbackUrl", pathname);

      return NextResponse.redirect(loginUrl);
    }

    /**
     * Decode session token.
     */
    let role = "employee";

    try {
      const payload = JSON.parse(Buffer.from(token, "base64").toString());

      role = (payload.role ?? "employee").toLowerCase();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    /**
     * Get user's canonical dashboard.
     */
    const canonicalDashboardPath = getCanonicalDashboardPath(role);

    /**
     * /dashboard
     *      ↓
     * /dashboard/{role}
     */
    if (pathname === "/dashboard") {
      return NextResponse.redirect(
        new URL(canonicalDashboardPath, request.url),
      );
    }

    /**
     * Normalize current dashboard route.
     */
    const normalizedCurrentPath = normalizeDashboardPath(pathname);

    /**
     * Prevent access to another role's dashboard.
     */
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

  /**
   * -------------------------------------------------------
   * OTHER PROTECTED ROUTES
   * -------------------------------------------------------
   */

  if (token) {
    return NextResponse.next();
  }

  /**
   * No authentication → Login
   */
  return NextResponse.redirect(new URL("/login", request.url));
}

/**
 * ---------------------------------------------------------
 * MATCHER
 * ---------------------------------------------------------
 *
 * Proxy should not run for:
 *
 * - API routes
 * - Next static assets
 * - Next image optimizer
 * - favicon
 * - public assets
 *
 * Public asset folders are additionally protected inside
 * proxy() itself so they can never accidentally hit auth.
 * ---------------------------------------------------------
 */

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logos|images|icons|fonts).*)",
  ],
};
