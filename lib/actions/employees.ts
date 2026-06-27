"use server";

import { getDB } from "@/lib/data-access/db";
import { revalidatePath } from "next/cache";

export async function updateEmployee(payload: {
  id: number;
  name: string;
  email: string;
  department?: string;
}) {
  const db = await getDB();

  const index = db.users.findIndex((u) => u.id === payload.id);

  if (index === -1) return;

  db.users[index] = {
    ...db.users[index],
    name: payload.name,
    email: payload.email,
    department: payload.department ?? "",
  };

  revalidatePath("/dashboard/ceo");
  revalidatePath(`/dashboard/employees/${payload.id}`);
}
