import { ROLE_PERMISSIONS, type Permission } from "./permissions";
import type { RoleId } from "@/types/user";

export function hasPermission(roleId: RoleId, permission: Permission): boolean {
  return ROLE_PERMISSIONS[roleId]?.includes(permission) ?? false;
}
