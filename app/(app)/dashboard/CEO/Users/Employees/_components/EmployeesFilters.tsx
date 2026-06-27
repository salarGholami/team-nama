// app\(app)\dashboard\ceo\users\employees\_components\EmployeesFilters.tsx
"use client";

import { useMemo, useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import EmployeeCard from "./EmployeeCard";
import EmployeesTable from "./EmployeesTable";
import type { Employee } from "@/types/employee";

interface Props {
  employees: Employee[];
  rolesMap: Record<string, string>;
  initialDepartments: string[];
  initialRoles: { id: string; title: string }[];
}

export default function EmployeesFilters({
  employees,
  rolesMap,
  initialDepartments,
  initialRoles,
}: Props) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredEmployees = useMemo(() => {
    let result = [...employees];

    if (search.trim()) {
      const term = search.toLowerCase().trim();
      result = result.filter(
        (emp) =>
          emp.name.toLowerCase().includes(term) ||
          emp.email.toLowerCase().includes(term),
      );
    }

    if (department) {
      result = result.filter((emp) => emp.department === department);
    }

    if (role) {
      result = result.filter((emp) => emp.roleId === role);
    }

    const isFiltered =
      search.trim() !== "" ||
      department !== "" ||
      role !== "" ||
      sortAsc === false;

    if (isFiltered) {
      result.sort((a, b) =>
        sortAsc
          ? a.name.localeCompare(b.name, "fa")
          : b.name.localeCompare(a.name, "fa"),
      );
    }

    return result;
  }, [employees, search, department, role, sortAsc]);

  const resetFilters = () => {
    setSearch("");
    setDepartment("");
    setRole("");
    setSortAsc(true);
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col gap-6 rounded-3xl border border-primary-700 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 shadow-xl backdrop-blur-2xl lg:flex-row lg:items-end lg:justify-between">
        <div className="grid w-full gap-5 md:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-primary-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو..."
              className="w-full rounded-2xl bg-primary-600/30 px-5 py-3 pr-12 text-sm  placeholder-primary-500 ring-1 ring-white/10 transition focus:ring-2 focus:ring-primary-700"
            />
          </div>

          {/* Department */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="rounded-2xl bg-primary-600/30 px-5 py-3 text-sm ring-1 ring-white/10 transition focus:ring-2 focus:ring-primary-500"
          >
            <option className="bg-primary-700" value="">
              همه دپارتمان‌ها
            </option>
            {initialDepartments.map((dep) => (
              <option className="bg-primary-700" key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>

          {/* Role */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-2xl bg-primary-600/30 px-5 py-3 text-sm ring-1 ring-white/10 transition focus:ring-2 focus:ring-primary-500"
          >
            <option value="">همه نقش‌ها</option>
            {initialRoles.map((r) => (
              <option className="bg-primary-700" key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>

          {/* Sort */}
          <button
            onClick={() => setSortAsc((prev) => !prev)}
            className="rounded-2xl gradient-bg-glasses px-5 py-3 text-sm font-bold transition hover:bg-primary-500 active:scale-[0.98]"
          >
            {sortAsc ? "مرتب‌سازی صعودی" : "مرتب‌سازی نزولی"}
          </button>
        </div>

        <button
          onClick={resetFilters}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-primary-100/30 px-6 py-3 text-sm text-primary-300 transition hover:bg-white/[0.05] lg:w-auto"
        >
          <RotateCcw size={16} />
          ریست
        </button>
      </div>

      {/* Desktop Table */}
      <div className="">
        <EmployeesTable employees={filteredEmployees} rolesMap={rolesMap} />
      </div>

      {filteredEmployees.length === 0 && (
        <div className="rounded-2xl bg-primary-600/30 py-16 text-center text-zinc-500 ring-1 ring-white/10">
          هیچ کارمندی یافت نشد
        </div>
      )}
    </div>
  );
}
