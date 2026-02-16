import { ROLE_IDS, type RoleId } from "@/types/user";

export function isRoleId(value: string): value is RoleId {
  return ROLE_IDS.includes(value as RoleId);
}
