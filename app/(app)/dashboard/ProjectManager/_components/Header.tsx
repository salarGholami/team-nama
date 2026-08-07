"use client";

import { useMemo } from "react";
import { Calendar, Folder, Users, Filter } from "lucide-react";
import Select from "@/components/ui/Select";
import db from "@/data/db.json";

interface Filters {
  dateRange: string;
  project: string;
  member: string;
  status: string;
}

interface HeaderProps {
  userName: string;
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
}

export function Header({ userName, filters, onFilterChange }: HeaderProps) {
  const projectOptions = useMemo(() => {
    const options = [{ label: "همه پروژه‌ها", value: "all" }];
    db.projects.forEach((p) => {
      options.push({ label: p.title, value: String(p.id) });
    });
    return options;
  }, []);

  const memberOptions = useMemo(() => {
    const options = [{ label: "همه اعضا", value: "all" }];
    (db.projectManagerDashboard?.teamProgress || []).forEach((m) => {
      options.push({ label: m.name, value: String(m.userId) });
    });
    return options;
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="text-right order-1">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">👋</span>
          سلام {userName}
        </h1>
        <p className="text-sm text-primary-400 mt-0.5">
          خلاصه وضعیت پروژه‌های شما
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 order-2 lg:order-1">
        <div className="">
          <Select
            label=""
            value={filters.dateRange}
            onChange={(v) => onFilterChange("dateRange", v)}
            icon={Calendar}
            options={[
              { label: "هفته جاری", value: "this-week" },
              { label: "ماه جاری", value: "this-month" },
              { label: "۳ ماه اخیر", value: "last-3-months" },
              { label: "همه زمان‌ها", value: "all-time" },
            ]}
          />
        </div>

        <div className="">
          <Select
            label=""
            value={filters.project}
            onChange={(v) => onFilterChange("project", v)}
            icon={Folder}
            options={projectOptions}
          />
        </div>

        <div className="">
          <Select
            label=""
            value={filters.member}
            onChange={(v) => onFilterChange("member", v)}
            icon={Users}
            options={memberOptions}
          />
        </div>

        <div className="">
          <Select
            label=""
            value={filters.status}
            onChange={(v) => onFilterChange("status", v)}
            icon={Filter}
            options={[
              { label: "همه وضعیت‌ها", value: "all" },
              { label: "در حال انجام", value: "in-progress" },
              { label: "متوقف", value: "on-hold" },
              { label: "تکمیل‌شده", value: "completed" },
              { label: "لغو شده", value: "cancelled" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
