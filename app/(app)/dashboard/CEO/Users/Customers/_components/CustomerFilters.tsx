"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, RotateCcw, ArrowUpDown } from "lucide-react";
import CustomerTable from "./CustomerTable";
import Pagination from "@/components/ui/Pagination";
import { Customers } from "@/types/customers";

interface Props {
  customers: Customers[];
  rolesMap: Record<string, string>;
  initialDepartments?: string[];
  initialRoles?: { id: string; title: string }[];
}

const PAGE_SIZE = 5;

export default function CustomerFilters({ customers, rolesMap }: Props) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

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

    result.sort((a, b) =>
      sortAsc
        ? a.name.localeCompare(b.name, "fa")
        : b.name.localeCompare(a.name, "fa"),
    );

    return result;
  }, [customers, search, department, role, sortAsc]);

  useEffect(() => {
    setPage(1);
  }, [search, department, role, sortAsc]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / PAGE_SIZE),
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedCustomers = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredCustomers.slice(start, start + PAGE_SIZE);
  }, [filteredCustomers, page]);

  const from = filteredCustomers.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, filteredCustomers.length);

  const resetFilters = () => {
    setSearch("");
    setDepartment("");
    setRole("");
    setSortAsc(true);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-6 rounded-3xl border border-primary-700 bg-linear-to-b from-white/5 to-white/2 p-8 shadow-xl backdrop-blur-2xl lg:flex-row lg:items-end lg:justify-between">
        <div className="grid w-full gap-5 md:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-primary-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو در مشتریان ..."
              className="w-full rounded-2xl bg-primary-600/30 px-5 py-3 pr-12 text-sm placeholder-primary-500 ring-1 ring-white/10 transition focus:ring-2 focus:ring-primary-700"
            />
          </div>

          <button
            type="button"
            onClick={() => setSortAsc((prev) => !prev)}
            className="flex items-center justify-center gap-2 rounded-2xl gradient-bg-glasses px-5 py-3 text-sm text-primary-100 ring-1 ring-white/10 transition hover:bg-primary-500/40"
          >
            <ArrowUpDown size={16} />
            {sortAsc ? "مرتب‌سازی صعودی" : "مرتب‌سازی نزولی"}
          </button>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-primary-100/30 px-6 py-3 text-sm text-primary-300 transition hover:bg-white/5 lg:w-auto"
        >
          <RotateCcw size={16} />
          ریست
        </button>
      </div>

      {/* Table + Pagination */}
      {filteredCustomers.length === 0 ? (
        <div className="rounded-2xl bg-primary-600/30 py-16 text-center text-zinc-500 ring-1 ring-white/10">
          هیچ مشتری یافت نشد
        </div>
      ) : (
        <>
          <div>
            <CustomerTable customers={paginatedCustomers} rolesMap={rolesMap} />
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-primary-600/20 pt-6 sm:flex-row">
            <p className="text-sm text-primary-400">
              نمایش{" "}
              <span className="font-medium text-primary-300">
                {from}–{to}
              </span>{" "}
              از{" "}
              <span className="font-medium text-primary-300">
                {filteredCustomers.length}
              </span>{" "}
              مشتری
            </p>

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
