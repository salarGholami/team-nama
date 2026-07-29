// app/(app)/dashboard/FrontendDeveloper/DesignFiles/_components/DesignFilesToolbar.tsx

"use client";

import { ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import Select from "@/components/ui/Select";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  sort: string;
  onSortChange: (value: string) => void;
};

export default function DesignFilesToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
}: Props) {
  return (
    <section className="flex flex-col gap-4 backdrop-blur-xl lg:flex-row lg:items-center">
      <div className="flex-1">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="جستجو در فایل‌های طراحی..."
          icon={<Search className="size-4" />}
          iconPosition="right"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:w-auto">
        <Select
          label=""
          value={status}
          onChange={onStatusChange}
          icon={SlidersHorizontal}
          options={[
            {
              label: "همه وضعیت‌ها",
              value: "all",
            },
            {
              label: "آماده توسعه",
              value: "ready",
            },
            {
              label: "نیاز به بررسی",
              value: "review",
            },
            {
              label: "در حال طراحی",
              value: "draft",
            },
            {
              label: "آرشیو شده",
              value: "archived",
            },
          ]}
        />

        <Select
          label=""
          value={sort}
          onChange={onSortChange}
          icon={ArrowUpDown}
          options={[
            {
              label: "جدیدترین",
              value: "latest",
            },
            {
              label: "قدیمی‌ترین",
              value: "oldest",
            },
            {
              label: "نام فایل",
              value: "name",
            },
            {
              label: "بیشترین نظر",
              value: "comments",
            },
          ]}
        />
      </div>
    </section>
  );
}
