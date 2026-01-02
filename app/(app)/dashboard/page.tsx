// app/(app)/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardRoot() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let role = "employee";
  try {
    const payload = JSON.parse(atob(token));
    role = payload.role || "employee";
  } catch {
    redirect("/login");
  }

  // ریدایرکت به داشبورد مخصوص نقش
  redirect(`/dashboard/${role}`);
}
