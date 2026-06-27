// app\(app)\dashboard\ceo\users\employees\[employeeId]\page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {  Pencil } from "lucide-react";
import { getEmployeeById } from "@/lib/employees";

interface Props {
  params: Promise<{ employeeId: string }>;
}

export default async function EmployeeProfilePage({ params }: Props) {
  const { employeeId } = await params;
  const employee = await getEmployeeById(employeeId);

  if (!employee) {
    notFound();
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{employee.name}</h1>

        <Link href={`/dashboard/ceo/users/employees/${employeeId}/edit`}>
          <Button>
            <Pencil className="mr-2 h-4 w-4" />
            ویرایش پروفایل
          </Button>
        </Link>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-8">
        <div className="flex items-center gap-6">
          <img
            src={employee.avatar ?? "/images/default-avatar.png"}
            alt={employee.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-primary-500/30"
          />
          <div>
            <h2 className="text-2xl font-semibold">{employee.name}</h2>
            <p className="text-primary-300">{employee.roleId || "کارمند"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-400">ایمیل</label>
            <p className="text-lg mt-1">{employee.email}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400">تلفن</label>
            <p className="text-lg mt-1">{employee.phone || "ثبت نشده"}</p>
          </div>

          {/* فیلدهای بیشتر اگر داری اضافه کن */}
          <div>
            <label className="text-sm text-gray-400">دپارتمان</label>
            <p className="text-lg mt-1">{employee.department || "—"}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400">تاریخ استخدام</label>
            <p className="text-lg mt-1">{employee.joinDate || "—"}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400">وضعیت کاری</label>
            <div className="flex items-center gap-1 mt-1">
              {employee.workStatus === "active" && (
                <span className="text-green-500 font-medium">فعال</span>
              )}
              {employee.workStatus === "on-leave" && (
                <span className="text-yellow-500 font-medium">مرخصی</span>
              )}
              {employee.workStatus === "Fired" && (
                <span className="text-red-500 font-medium">اخراج شده</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
