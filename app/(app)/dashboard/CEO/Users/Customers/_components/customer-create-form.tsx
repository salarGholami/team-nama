"use client";

import useActionState from "@/lib/hooks/useActionState";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import { createCustomer } from "@/lib/actions/customers";

export default function CustomerCreateForm() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(createCustomer, {
    success: undefined,
  });

  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard/ceo/users/customers");
      router.refresh();
    }
  }, [state?.success, router]);

  return (
    <form
      action={
        typeof formAction === "function" ? undefined : (formAction as any)
      }
      onSubmit={(e) => {
        e.preventDefault();
        if (typeof formAction === "function")
          formAction(e.currentTarget as HTMLFormElement);
      }}
      className="space-y-6"
    >
      <InputField label="نام کامل" name="name" required />
      <InputField label="ایمیل" name="email" type="email" required />
      <InputField label="شماره تلفن" name="phone" />
      <InputField label="دپارتمان" name="department" placeholder="اختیاری" />
      <input type="hidden" name="roleId" value="Client" />

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
          {isPending ? "در حال ایجاد..." : "ایجاد مشتری"}
        </Button>
      </div>
    </form>
  );
}
