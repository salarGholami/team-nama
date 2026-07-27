"use client";

import { MessageSquare } from "lucide-react";
import type { Commit } from "../page";

type Props = {
  commits: Commit[];
  selectedId: number | null;
  activeId: number | null;
  onSelect: (id: number) => void;
};

const typeColors: Record<string, string> = {
  feat: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  fix: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  refactor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  style: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  chore: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

export default function CommitList({
  commits,
  selectedId,
  activeId,
  onSelect,
}: Props) {
  const grouped = commits.reduce(
    (acc, commit) => {
      const day = commit.date.includes("امروز")
        ? "امروز"
        : commit.date.includes("دیروز")
          ? "دیروز"
          : commit.date;
      if (!acc[day]) acc[day] = [];
      acc[day].push(commit);
      return acc;
    },
    {} as Record<string, Commit[]>,
  );

  if (commits.length === 0) {
    return (
      <div className="h-full rounded-2xl border border-primary-600/30 bg-primary-800/30 flex items-center justify-center text-muted-foreground">
        هیچ کامیتی پیدا نشد
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto space-y-6 pr-1 scrollbar-none">
      {Object.entries(grouped).map(([day, list]) => (
        <div key={day}>
          <div className="sticky top-0 z-10 bg-background/80 backdrop-blur py-1 mb-3">
            <span className="text-xs font-medium text-muted-foreground px-2">
              {day}
            </span>
          </div>

          <div className="space-y-2 shadow-2xl">
            {list.map((commit) => {
              const isSelected = selectedId === commit.id;
              const isActive = activeId === commit.id;

              return (
                <div
                  key={commit.id}
                  data-commit-id={commit.id}
                  onClick={() => onSelect(commit.id)}
                  className={`
                    group relative rounded-2xl border p-4 cursor-pointer transition-all duration-200
                    ${
                      isSelected
                        ? "border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                        : isActive
                          ? "border-primary-500/60 bg-primary-700/50"
                          : "border-primary-600/30 bg-primary-800/40 hover:border-primary-500/50 hover:bg-primary-700/40"
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-md border font-medium ${typeColors[commit.type]}`}
                        >
                          {commit.type}
                        </span>
                        <h3 className="font-medium text-sm truncate">
                          {commit.message.replace(
                            /^(feat|fix|refactor|style|chore):\s*/i,
                            "",
                          )}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-mono truncate max-w-[140px]">
                          {commit.branch}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <img
                            src={commit.author.avatar}
                            alt={commit.author.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span>{commit.author.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="text-xs text-muted-foreground font-mono">
                        {commit.time}
                      </span>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-emerald-400">
                          +{commit.additions}
                        </span>
                        <span className="text-red-400">
                          -{commit.deletions}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare className="size-3.5" />
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
