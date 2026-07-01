import db from "@/data/db.json";

export function getDashboardByRole(roleId: string) {
  return db.dashboards.find((d) => d.roleId === roleId);
}

export function getPermissionsByRole(roleId: string) {
  return db.permissions.find((p) => p.roleId === roleId);
}
