"use server";

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
}
