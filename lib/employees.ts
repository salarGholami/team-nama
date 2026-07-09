import type { Employee } from "@/types/employee";
import { getDB } from "@/lib/data-access/db";

/**
 * Returns a single employee by id (string or number).
 * If no match is found, `null` is returned.
 */
export async function getEmployeeById(
  id: string | number,
): Promise<Employee | null> {
  const db = await getDB();
  const emp = (db.users as any[]).find((u: any) => String(u.id) === String(id));
  return (emp as Employee) ?? null;
}

/**
 * Utility to fetch all employees from the database.
 */
export async function getAllEmployees(): Promise<Employee[]> {
  const db = await getDB();
  return db.users as Employee[];
}
