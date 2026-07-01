"use server";

<<<<<<< HEAD
import { httpClient } from "@/services/http/client";
import { Employee } from "@/types/employee";

export interface EmployeeActionState {
  success?: boolean;
  error?: string;
  message?: string;
  employee?: Employee;
}

export async function updateEmployee(
  state: EmployeeActionState | undefined,
  formData: FormData,
): Promise<EmployeeActionState> {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    if (!id) {
      return {
        success: false,
        error: "معرّف کارمند مفقود است",
      };
    }

    if (!name || !email) {
      return {
        success: false,
        error: "نام و ایمیل الزامی هستند",
      };
    }

    const response = await httpClient.put(`/employees/${id}`, {
      name,
      email,
      phone,
    });

    return {
      success: true,
      message: "کارمند با موفقیت بروزرسانی شد",
      employee: response,
    };
  } catch (error) {
    console.error("Error updating employee:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "خطا در بروزرسانی کارمند",
    };
  }
=======
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
>>>>>>> feature/dashboard-ui
}
