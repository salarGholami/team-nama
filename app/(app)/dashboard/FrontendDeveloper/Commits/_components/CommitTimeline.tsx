"use client";

import type { Commit } from "../page";

type Props = {
  commits: Commit[];
  activeId: number | null;
  onSelect: (id: number) => void;
};

function getRelativeLabel(index: number): string {
  if (index === 0) return "امروز";
  if (index === 1) return "دیروز";
  if (index === 2) return "۳ روز پیش";
  if (index === 3) return "۴ روز پیش";
  if (index === 4) return "۵ روز پیش";
  if (index === 5) return "۶ روز پیش";
  if (index === 6) return "۱ هفته پیش";
  if (index <= 13) return "۲ هفته پیش";
  if (index <= 20) return "۳ هفته پیش";
  if (index <= 30) return "۱ ماه پیش";
  if (index <= 60) return "۲ ماه پیش";
  if (index <= 90) return "۳ ماه پیش";
  return "چند ماه پیش";
}

export default function CommitTimeline({ commits, activeId, onSelect }: Props) {
  // فقط اولین کامیت هر گروه تاریخ رو نشون بده
  const seenDates = new Set<string>();

return (
  <div className="relative h-full overflow-y-auto scrollbar-none">
    <div className=" top-0 bottom-0 right-6 w-px bg-primary-600/40" />

    <div className="relative z-10 flex flex-col gap-6 py-4 pr-5">
      {commits.map((commit, index) => {
        const isActive = activeId === commit.id;
        const label = getRelativeLabel(index);

        const showLabel = !seenDates.has(commit.date);
        if (showLabel) seenDates.add(commit.date);

        return (
          <div
            key={commit.id}
            onClick={() => onSelect(commit.id)}
            className="relative flex items-center justify-end cursor-pointer group"
          >
            <div
              className={`
                h-3 w-3 rounded-full border-2 transition-all duration-300
                ${
                  isActive
                    ? "scale-125 border-emerald-300 bg-emerald-400 shadow-lg shadow-emerald-400/50"
                    : "border-primary-500 bg-primary-700 group-hover:border-primary-400"
                }
              `}
            />

            {showLabel && (
              <span
                className={`
                  absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px]
                  ${
                    isActive
                      ? "font-medium text-emerald-400"
                      : "text-muted-foreground"
                  }
                `}
              >
                {label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  </div>
);
}
