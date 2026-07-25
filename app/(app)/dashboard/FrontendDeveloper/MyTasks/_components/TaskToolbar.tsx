"use client";

import { Filter, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/Select";

type TaskStatus = "all" | "pending" | "in-progress" | "completed";

type TaskPriority = "all" | "urgent" | "high" | "medium" | "low";

type TaskSort = "newest" | "oldest" | "deadline-asc" | "deadline-desc";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  status: TaskStatus;
  setStatus: (value: TaskStatus) => void;

  priority: TaskPriority;
  setPriority: (value: TaskPriority) => void;

  sort: TaskSort;
  setSort: (value: TaskSort) => void;

  onFilter: () => void;
};

export default function TaskToolbar({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  sort,
  setSort,
  onFilter,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onFilter();
      }}
      className="flex flex-col gap-4 lg:flex-row lg:items-center"
    >
      <div className="flex-[2]">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<SearchIcon className="size-5" />}
          placeholder="جستجو وظیفه..."
        />
      </div>

      <div className="grid grid-cols-3 gap-3 flex-[3]">
        <Select
          label=""
          value={status}
          options={[
            {
              label: "همه وضعیت‌ها",
              value: "all",
            },
            {
              label: "در انتظار",
              value: "pending",
            },
            {
              label: "در حال انجام",
              value: "in-progress",
            },
            {
              label: "انجام شده",
              value: "completed",
            },
          ]}
          onChange={(v) => setStatus(v as TaskStatus)}
        />

        <Select
          label=""
          value={sort}
          options={[
            {
              label: "جدیدترین",
              value: "newest",
            },
            {
              label: "قدیمی‌ترین",
              value: "oldest",
            },
            {
              label: "نزدیک‌ترین ددلاین",
              value: "deadline-asc",
            },
            {
              label: "دورترین ددلاین",
              value: "deadline-desc",
            },
          ]}
          onChange={(v) => setSort(v as TaskSort)}
        />

        <Select
          label=""
          value={priority}
          options={[
            {
              label: "همه اولویت‌ها",
              value: "all",
            },
            {
              label: "فوری",
              value: "urgent",
            },
            {
              label: "زیاد",
              value: "high",
            },
            {
              label: "متوسط",
              value: "medium",
            },
            {
              label: "کم",
              value: "low",
            },
          ]}
          onChange={(v) => setPriority(v as TaskPriority)}
        />
      </div>

      <Button
        type="submit"
        className="rounded-xl gradient-bg-glasses"
        icon={<Filter className="size-5" />}
      >
        اعمال فیلتر
      </Button>
    </form>
  );
}
