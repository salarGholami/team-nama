import fs from "fs";
import path from "path";

export type RoleItem = { id: string; title: string };
export type NavItem = { label: string; href: string; icon: string };

export type DB = {
  roles: RoleItem[];
  links: Record<string, NavItem[]>;
};

const DB_PATH = path.join(process.cwd(), "db.json");

export function getDB(): DB {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  const data = JSON.parse(raw) as DB;
  return data;
}

// utility برای گرفتن title از id
export function getRoleTitle(roleId: string): string {
  const db = getDB();
  const role = db.roles.find((r) => r.id === roleId);
  return role?.title ?? roleId;
}
