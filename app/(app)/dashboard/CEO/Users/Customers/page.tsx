// app\(app)\dashboard\ceo\users\employees\page.tsx
import { getDB } from "@/lib/data-access/db";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Customers } from "@/types/customers";
import CustomerFilters from "./_components/CustomerFilters";

export const dynamic = "force-dynamic";

export default async function CustomerPage() {
  const db = await getDB();

  const customers = (db.users as any[]).filter(
    (user: any) => user.roleId === "Client",
  ) as Customers[];

  const roles = db.roles;

  const rolesMap = Object.fromEntries(
    (roles as any[]).map((r: any) => [r.id, r.title]),
  ) as Record<string, string>;

  const departments = [
    ...new Set(customers.map((u: any) => u.department)),
  ].sort();

  return (
    <div className="px-6 py-8 lg:px-10">
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 ">
          <div className="">
            <h1 className="text-3xl font-bold tracking-tight">مشتریان</h1>
            <p className="mt-3 text-sm">مدیریت و مشاهده اطلاعات مشتریان شرکت</p>
          </div>
          <div className="md:text-left">
            <Button
              className="gradient-bg-glasses rounded-xl p-2"
              iconPosition="right"
              icon={<PlusCircleIcon className="size-5" />}
            >
              <Link href="/dashboard/ceo/users/customers/new">مشتری جدید</Link>
            </Button>
          </div>
        </div>
      </div>

      <CustomerFilters
        customers={customers}
        rolesMap={rolesMap}
        initialDepartments={departments}
        initialRoles={roles}
      />
    </div>
  );
}
