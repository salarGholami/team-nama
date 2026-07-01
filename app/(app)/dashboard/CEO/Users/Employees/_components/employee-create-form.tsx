"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createEmployee } from "@/lib/actions/employees";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import Select from "@/components/ui/Select";

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

      <Select
        label="نقش"
        value="employee"
        onChange={() => undefined}
        options={[
          { label: "توسعه‌دهنده", value: "developer" },
          { label: "طراح", value: "designer" },
          { label: "کارمند", value: "employee" },
        ]}
      />

      {state?.error && (
        <div className="text-red-400 text-sm bg-red-950/40 p-3 rounded">
          {state.error}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button type="button" onClick={() => router.back()}>
          انصراف
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "در حال ایجاد..." : "ایجاد کارمند"}
        </Button>
      </div>
    </form>
  );
}
