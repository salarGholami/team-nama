"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  updateEmployee,
  type UpdateEmployeeState,
} from "@/lib/actions/employees";
import type { Employee } from "@/types/employee";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input-field";

interface Props {
  employee: Employee;
}

export default function EmployeeEditForm({ employee }: Props) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    UpdateEmployeeState,
    FormData
  >(updateEmployee, { success: undefined });

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard/ceo/users/employees");
      router.refresh(); // برای به‌روزرسانی لیست بعد از ذخیره
    }
  }, [state?.success, router]);

  return (
    <form
      action={formAction}
      className="bg-white/5 p-6 rounded-2xl shadow-md space-y-6"
    >
      <input type="hidden" name="id" value={employee.id} />

      <div>
        <InputField
          label="نام کامل"
          name="name"
          defaultValue={employee.name || ""}
          required
        />
      </div>

      <div>
        <InputField
          label="ایمیل"
          name="email"
          type="email"
          defaultValue={employee.email || ""}
          required
        />
      </div>

      <div>
        <InputField
          label="شماره تلفن"
          name="phone"
          defaultValue={employee.phone || ""}
          placeholder="اختیاری"
        />
      </div>

      {state?.error && (
        <div className="text-red-400 text-sm bg-red-950/40 p-3 rounded-lg border border-red-800/50">
          {state.error}
        </div>
      )}

      {state?.message && state.success && (
        <div className="text-green-400 text-sm bg-green-950/40 p-3 rounded-lg border border-green-800/50">
          {state.message}
        </div>
      )}

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </div>
    </form>
  );
}
