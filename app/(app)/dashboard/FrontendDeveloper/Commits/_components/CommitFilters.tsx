// _components/CommitFilters.tsx
"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/Select";

type Props = {
  search: string;
  setSearch: (v: string) => void;
  branch: string;
  setBranch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  author: string;
  setAuthor: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  branches: string[];
};

export default function CommitFilters({
  search,
  setSearch,
  branch,
  setBranch,
  status,
  setStatus,
  author,
  setAuthor,
  type,
  setType,
  branches,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-2 w-full">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="size-4" />
        فیلترها
      </div>

      <div className="min-w-xl">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="size-4" />}
          placeholder="جستجو در کامیت‌ها ..."
          className="w-full appearance-none rounded-md border px-4 border-primary-600/30 bg-primary-700/30 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <Select
        label=""
        value={branch}
        options={[
          { label: "همه", value: "all" },
          ...branches.map((b) => ({ label: b, value: b })),
        ]}
        onChange={setBranch}
      />

      <Select
        label=""
        value={status}
        options={[
          { label: "وضعیت کل", value: "all" },
          { label: "مرج شده", value: "merged" },
          { label: "باز", value: "open" },
          { label: "بسته", value: "closed" },
        ]}
        onChange={setStatus}
      />

      <Select
        label=""
        value={type}
        options={[
          { label: "نوع همه", value: "all" },
          { label: "feat", value: "feat" },
          { label: "fix", value: "fix" },
          { label: "refactor", value: "refactor" },
          { label: "style", value: "style" },
        ]}
        onChange={setType}
      />
    </div>
  );
}
