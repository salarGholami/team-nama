// app\(app)\dashboard\ceo\users\employees\_components\EmployeesTable.tsx
"use client";

import Avatar from "@/components/ui/avatar/Avatar";
import { Briefcase, Phone, Calendar, User, Dot, Settings2, Eye } from "lucide-react";
import Link from "next/link";

interface Employee {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  roleId: string;
  department: string;
  phone: string;
  joinDate: string;
  onlineStatus: boolean;
  workStatus: "active" | "on-leave" | "Fired";
}

interface Props {
  employees: Employee[];
  rolesMap: Record<string, string>;
}

export default function EmployeesTable({ employees, rolesMap }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-primary-300/20 bg-gradient-to-b from-white/[0.04] to-white/[0.02] shadow-xl backdrop-blur-2xl">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b border-primary-300/15 bg-white/[0.02] text-xs uppercase tracking-wider text-primary-400">
            <tr>
              <th className="px-8 py-5 text-right font-medium">کارمند</th>
              <th className="px-8 py-5 text-right font-medium">نقش</th>
              <th className="px-8 py-5 text-right font-medium">دپارتمان</th>
              <th className="px-8 py-5 text-right font-medium">شماره تماس</th>
              <th className="px-8 py-5 text-right font-medium">وضعیت فعالیت</th>
              <th className="px-8 py-5 text-right font-medium">
                تاریخ استخدام
              </th>
              <th className="px-8 py-5 text-right font-medium">وضعیت</th>
              <th className="px-8 py-5 text-right font-medium">عملیات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-primary-300/10">
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="group transition duration-300 hover:shadow-2xl hover:backdrop-blur-md hover:scale-98 rounded-4xl"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <Avatar
                      src={emp.avatar}
                      alt={emp.name}
                      size="mdPlus"
                      className="group-hover:ring-primary-500/50"
                    />
                    <div>
                      <div className="font-medium ">{emp.name}</div>
                      <div className="text-xs text-zinc-500">{emp.email}</div>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-6 text-primary-300">
                  <div className="flex items-center gap-2">
                    <Briefcase size={15} className="text-primary-300" />
                    {rolesMap[emp.roleId] ?? "−"}
                  </div>
                </td>

                <td className="px-8 py-6 text-primary-300">
                  <div className="flex items-center gap-2">
                    <User size={15} className="text-primary-300" />
                    {emp.department}
                  </div>
                </td>

                <td className="px-8 py-6 text-primary-300">
                  <div className="flex items-center gap-2">
                    <Phone size={15} className="text-primary-300" />
                    {emp.phone}
                  </div>
                </td>

                <td className="px-8 py-6 text-primary-300">
                  {emp.onlineStatus ? (
                    <span className="text-green-500 flex items-center gap-1 text-sm font-medium">
                      <Dot size={20} className="text-green-500" />
                      آنلاین
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1 text-sm font-medium">
                      <Dot size={20} className="text-red-500" />
                      آفلاین
                    </span>
                  )}
                </td>

                <td className="px-8 py-6 text-primary-300">
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-primary-300" />
                    {emp.joinDate}
                  </div>
                </td>

                <td className="px-8 py-6 text-primary-300">
                  {emp.workStatus === "active" && (
                    <span className="text-green-500 flex items-center gap-1 text-sm font-medium">
                      فعال
                    </span>
                  )}
                  {emp.workStatus === "on-leave" && (
                    <span className="text-yellow-500 flex items-center gap-1 text-sm font-medium">
                      مرخصی
                    </span>
                  )}
                  {emp.workStatus === "Fired" && (
                    <span className="text-red-500 flex items-center gap-1 text-sm font-medium">
                      اخراج شده
                    </span>
                  )}
                </td>

                <td className="px-4 py-6 text-primary-300 flex">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/ceo/users/employees/${emp.id}/edit`}
                      title="ویرایش کارمند"
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Settings2
                        size={18}
                        className="text-primary-400 hover:text-primary-300"
                      />
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/ceo/users/employees/${emp.id}`}
                      title="اطلاعات کارمند"
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Eye
                        size={18}
                        className="text-primary-400 hover:text-primary-300"
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden flex flex-col gap-4 p-4">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="flex flex-col gap-2 p-4 rounded-2xl bg-white/[0.04] border border-primary-300/10 shadow backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar src={emp.avatar} alt={emp.name} size="md" />
                <div>
                  <div className="font-medium text-white">{emp.name}</div>
                  <div className="text-xs text-zinc-500">{emp.email}</div>
                </div>
              </div>
              <Settings2 className="text-primary-500 cursor-pointer" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-primary-300 mt-2">
              <div className="flex items-center gap-1">
                <Briefcase size={14} className="text-primary-500" />
                {rolesMap[emp.roleId] ?? "−"}
              </div>
              <div className="flex items-center gap-1">
                <User size={14} className="text-primary-500" />
                {emp.department}
              </div>
              <div className="flex items-center gap-1">
                <Phone size={14} className="text-primary-500" />
                {emp.phone}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} className="text-primary-500" />
                {emp.joinDate}
              </div>
              <div className="flex items-center gap-1">
                <Dot
                  size={14}
                  className={
                    emp.onlineStatus ? "text-green-500" : "text-red-500"
                  }
                />
                {emp.onlineStatus ? "آنلاین" : "آفلاین"}
              </div>
              <div className="flex items-center gap-1">
                {emp.workStatus === "active" && (
                  <span className="text-green-500 font-medium">فعال</span>
                )}
                {emp.workStatus === "on-leave" && (
                  <span className="text-yellow-500 font-medium">مرخصی</span>
                )}
                {emp.workStatus === "Fired" && (
                  <span className="text-red-500 font-medium">اخراج شده</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
