import { getDB } from "@/lib/data-access/db";
import { Customers } from "@/types/customers";

export async function getCustomerById(
  id: string | number,
): Promise<Customers | null> {
  const db = await getDB();
  const emp = (db.users as any[]).find((u: any) => String(u.id) === String(id));
  return (emp as Customers) ?? null;
}

export async function getAllCustomers(): Promise<Customers[]> {
  const db = await getDB();

  return (db.users as any[]).filter(
    (user: any) => user.roleId === "Client",
  ) as Customers[];
}
