"use server";

import { getDB, saveDB } from "@/lib/data-access/db";
import { revalidatePath } from "next/cache";

export type CustomerActionState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function createCustomer(
  prevState: CustomerActionState | undefined,
  formData: FormData,
): Promise<CustomerActionState> {
  const payload = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    department: String(formData.get("department") ?? ""),
    roleId: String(formData.get("roleId") ?? "Client"),
  };

  if (!payload.name.trim() || !payload.email.trim()) {
    return {
      success: false,
      error: "نام و ایمیل الزامی است.",
    };
  }

  const db = await getDB();
  const newCustomer = {
    id: Date.now(),
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    roleId: payload.roleId,
    password: "",
    department: payload.department,
    joinDate: new Date().toISOString(),
    avatar: "",
    onlineStatus: true,
    workStatus: "active" as const,
  };

  db.users.push(newCustomer);

  await saveDB(db);

  revalidatePath("/dashboard/ceo/users/customers");

  return {
    success: true,
    message: "مشتری با موفقیت ایجاد شد.",
  };
}

export async function updateCustomer(
  prevState: CustomerActionState | undefined,
  formData: FormData,
): Promise<CustomerActionState> {
  const payload = {
    id: Number(formData.get("id") ?? 0),
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    department: String(formData.get("department") ?? ""),
  };

  if (!payload.id || !payload.name.trim() || !payload.email.trim()) {
    return {
      success: false,
      error: "اطلاعات ورودی نامعتبر است.",
    };
  }

  const db = await getDB();
  const index = (db.users as any[]).findIndex((u: any) => u.id === payload.id);

  if (index === -1) {
    return {
      success: false,
      error: "مشتری موردنظر یافت نشد.",
    };
  }

  db.users[index] = {
    ...db.users[index],
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    department: payload.department,
  };

  await saveDB(db);

  revalidatePath("/dashboard/ceo/users/customers");
  revalidatePath(`/dashboard/ceo/users/customers/${payload.id}`);

  return {
    success: true,
    message: "تغییرات با موفقیت ذخیره شد.",
  };
}
