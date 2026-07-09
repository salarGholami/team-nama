"use client";

import useActionState from "@/lib/hooks/useActionState";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import { CustomerActionState, updateCustomer } from "@/lib/actions/customers";
import { Customers } from "@/types/customers";

interface Props {
  customer: Customers;
}

export default function CustomerEditForm({ customer }: Props) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    CustomerActionState | undefined,
    FormData
  >(updateCustomer, undefined);

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
      className="bg-white/5 p-6 rounded-2xl shadow-md space-y-6"
    >
      <input type="hidden" name="id" value={customer.id} />

      <div>
        <InputField
          label="نام کامل"
          name="name"
          defaultValue={customer.name || ""}
          required
        />
      </div>

      <div>
        <InputField
          label="ایمیل"
          name="email"
          type="email"
          defaultValue={customer.email || ""}
          required
        />
      </div>

      <div>
        <InputField
          label="شماره تلفن"
          name="phone"
          defaultValue={customer.phone || ""}
          placeholder="اختیاری"
        />
      </div>

      <div>
        <InputField
          label="دپارتمان"
          name="department"
          defaultValue={customer.department || ""}
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
