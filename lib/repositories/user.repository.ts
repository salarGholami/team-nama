import db from "@/data/db.json";
import type { User } from "@/types/user";
import { ROLE_IDS } from "@/types/user";

function isRoleId(role: string): role is User["roleId"] {
  return ROLE_IDS.includes(role as any);
}

function mapToUser(raw: any): User | undefined {
  if (!isRoleId(raw.roleId)) return undefined;

  return {
    ...raw,
    roleId: raw.roleId,
  };
}

export function findUserByEmail(email: string): User | undefined {
  const raw = db.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase(),
  );
  return raw ? mapToUser(raw) : undefined;
}

export function findUserById(id: number): User | undefined {
  const raw = db.users.find((u) => u.id === id);
  return raw ? mapToUser(raw) : undefined;
}
