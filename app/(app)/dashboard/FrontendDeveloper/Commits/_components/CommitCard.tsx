// app/(app)/dashboard/FrontendDeveloper/Commits/_components/CommitCard.tsx
"use client";

import { GitCommit, GitBranch, FileCode2 } from "lucide-react";
import type { Commit } from "../page";

type Props = {
  commit: Commit;
  onClick: () => void;
};

export default function CommitCard({ commit, onClick }: Props) {
  const statusColor =
    commit.status === "merged"
      ? "bg-emerald-500/10 text-emerald-500"
      : commit.status === "open"
        ? "bg-blue-500/10 text-blue-500"
        : "bg-red-500/10 text-red-500";

  const statusText =
    commit.status === "merged"
      ? "مرج شده"
      : commit.status === "open"
        ? "باز"
        : "بسته";

  return (
    <div
      onClick={onClick}
      className="border-primary-600/30 bg-primary-700/30 border shadow-xl hover:shadow-emerald-500/10 rounded-3xl p-5 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
    >
      {/* هش و وضعیت */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <GitCommit className="size-4 text-muted-foreground" />
          <code className="text-sm font-mono text-primary-300">
            {commit.hash}
          </code>
        </div>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor}`}
        >
          {statusText}
        </span>
      </div>

      {/* پیام کامیت */}
      <h3 className="font-semibold text-[16px] leading-snug mb-3 line-clamp-2 group-hover:text-emerald-400 transition">
        {commit.message}
      </h3>

      {/* برنچ */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <GitBranch className="size-4" />
        <span className="truncate">{commit.branch}</span>
      </div>

      {/* آمار فایل‌ها */}
      <div className="flex items-center gap-4 text-sm mb-5">
        <div className="flex items-center gap-1.5">
          <FileCode2 className="size-4 text-muted-foreground" />
          <span>{commit.filesChanged} فایل</span>
        </div>
        <span className="text-emerald-500 font-medium">
          +{commit.additions}
        </span>
        <span className="text-red-400 font-medium">-{commit.deletions}</span>
      </div>

      {/* نویسنده و تاریخ */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <img
            src={commit.author.avatar}
            alt={commit.author.name}
            className="w-8 h-8 rounded-full ring-2 ring-background object-cover"
          />
          <span className="text-sm font-medium">{commit.author.name}</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {commit.date}
        </span>
      </div>
    </div>
  );
}
