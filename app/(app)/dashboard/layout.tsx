import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import db from "@/data/db.json";

type Payload = { role: string };

// تایپ RoleId مطابق db.json
type RoleId = keyof typeof db.links;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  let role: RoleId;

  try {
    const payload = JSON.parse(
      Buffer.from(token, "base64").toString(),
    ) as Payload;

    // بررسی اینکه role دریافتی معتبر است
    if (!payload.role || !(payload.role in db.links)) {
      redirect("/login");
    }

    role = payload.role as RoleId;
  } catch {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar نقش و لینک‌ها را از db.json می‌گیرد */}
      <Sidebar role={role} />
      <main className="flex-1">
        <Header />
        {children}
      </main>
    </div>
  );
}
