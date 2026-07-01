"use server";

import { getDB } from "@/lib/data-access/db";
import { revalidatePath } from "next/cache";

export type EmployeeActionState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function createEmployee(
  prevState: EmployeeActionState | undefined,
  formData: FormData,
): Promise<EmployeeActionState> {
  const payload = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    roleId: String(formData.get("roleId") ?? "employee"),
  };

  if (!payload.name.trim() || !payload.email.trim()) {
    return {
      success: false,
      error: "نام و ایمیل الزامی است.",
    };
  }

  const db = await getDB();
  const newEmployee = {
    id: Date.now(),
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    roleId: payload.roleId,
    password: "",
    department: "",
    joinDate: new Date().toISOString(),
    avatar: "",
    onlineStatus: true,
    workStatus: "active" as const,
  };

  db.users.push(newEmployee);

  revalidatePath("/dashboard/ceo");

  return {
    success: true,
    message: "کارمند با موفقیت ایجاد شد.",
  };
}

export async function updateEmployee(
  prevState: EmployeeActionState | undefined,
  formData: FormData,
): Promise<EmployeeActionState> {
  const payload = {
    id: Number(formData.get("id") ?? 0),
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    department: String(formData.get("department") ?? ""),
  };

  if (!payload.id || !payload.name.trim() || !payload.email.trim()) {
    return {
      success: false,
      error: "اطلاعات ورودی نامعتبر است.",
    };
  }

  const db = await getDB();
  const index = db.users.findIndex((u) => u.id === payload.id);

  if (index === -1) {
    return {
      success: false,
      error: "کارمند موردنظر یافت نشد.",
    };
  }

  db.users[index] = {
    ...db.users[index],
    name: payload.name,
    email: payload.email,
    department: payload.department,
  };

  revalidatePath("/dashboard/ceo");
  revalidatePath(`/dashboard/employees/${payload.id}`);

  return {
    success: true,
    message: "تغییرات با موفقیت ذخیره شد.",
  };
}
