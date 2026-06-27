"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createEmployee } from "@/lib/actions/employees";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // اگر داری

export default function EmployeeCreateForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(createEmployee, {
    success: undefined,
  });

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard/ceo/users/employees");
      router.refresh();
    }
  }, [state?.success, router]);

  return (
    <form action={formAction} className="space-y-6">
      <InputField label="نام کامل" name="name" required />
      <InputField label="ایمیل" name="email" type="email" required />
      <InputField label="شماره تلفن" name="phone" />

      {/* اگر نقش و دپارتمان داری */}
      <div>
        <label className="block text-sm mb-1">نقش</label>
        <Select name="roleId" required>
          <SelectTrigger>
            <SelectValue placeholder="انتخاب نقش" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="developer">توسعه‌دهنده</SelectItem>
            <SelectItem value="designer">طراح</SelectItem>
            {/* از دیتابیس بکش اگر داری */}
          </SelectContent>
        </Select>
      </div>

      {/* فیلدهای بیشتر مثل department, joinDate, ... */}

      {state?.error && (
        <div className="text-red-400 text-sm bg-red-950/40 p-3 rounded">
          {state.error}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="ghost" type="button" onClick={() => router.back()}>
          انصراف
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "در حال ایجاد..." : "ایجاد کارمند"}
        </Button>
      </div>
    </form>
  );
}
