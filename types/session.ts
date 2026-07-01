import type { RoleId } from "./user";

export interface SessionUser {
  id: number;
  roleId: RoleId;
  name: string;
  email: string;
  avatar: string;
}
