import { redirect } from "next/navigation";
import { getServerSession } from "./session";
import { hasPermission } from "@/lib/rbac/access-control";
import type { Permission } from "@/lib/rbac/permissions";

export async function requirePermission(permission: Permission) {
  const session = await getServerSession();

  if (!session) redirect("/login");

  if (!hasPermission(session.roleId, permission)) redirect("/unauthorized");

  return session;
}
