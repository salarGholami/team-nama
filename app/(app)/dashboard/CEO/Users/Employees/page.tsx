// app\(app)\dashboard\ceo\users\employees\page.tsx
import { getDB } from "@/lib/data-access/db";
import type { Employee } from "@/types/employee";
import EmployeesFilters from "./_components/EmployeesFilters";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PlusIcon } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EmployeesPage() {
  const db = await getDB();

  const employees = db.users.filter(
    (user) => !["Client", "Partner"].includes(user.roleId),
  ) as Employee[];

  const roles = db.roles;

  const rolesMap = Object.fromEntries(
    roles.map((r) => [r.id, r.title]),
  ) as Record<string, string>;

  const departments = [...new Set(employees.map((u) => u.department))].sort();

  return (
    <div className="px-6 py-12 lg:px-10">
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 ">
          <div className="">
            <h1 className="text-3xl font-bold tracking-tight">
              مدیریت کارمندان
            </h1>
            <p className="mt-3 text-sm">
              مشاهده، جستجو و مدیریت تمامی کارمندان شرکت
            </p>
          </div>
          <div className="md:text-left">
            <Button
              className="gradient-bg-glasses rounded-xl p-2"
              iconPosition="right"
              icon={<PlusCircleIcon className="size-5" />}
            >
              <Link href="/dashboard/ceo/users/employees/new">
                افزودن کارمند
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <EmployeesFilters
        employees={employees}
        rolesMap={rolesMap}
        initialDepartments={departments}
        initialRoles={roles}
      />
    </div>
  );
}
