"use client";

import {
  MoreHorizontal,
  AlertTriangle,
  Info,
  CheckCircle2,
  Code2,
  Settings,
  MessageCircle,
  MoreVertical,
} from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  description: string;
  time: string;
  type: string;
}

const typeConfig: Record<
  string,
  {
    icon: typeof Info;
    dotColor: string;
    iconColor: string;
  }
> = {
  warning: {
    icon: AlertTriangle,
    dotColor: "bg-amber-400",
    iconColor: "text-amber-400",
  },
  info: {
    icon: Info,
    dotColor: "bg-sky-400",
    iconColor: "text-sky-400",
  },
  success: {
    icon: CheckCircle2,
    dotColor: "bg-emerald-400",
    iconColor: "text-emerald-400",
  },
  code: {
    icon: Code2,
    dotColor: "bg-blue-400",
    iconColor: "text-blue-400",
  },
  system: {
    icon: Settings,
    dotColor: "bg-violet-400",
    iconColor: "text-violet-400",
  },
  comment: {
    icon: MessageCircle,
    dotColor: "bg-indigo-400",
    iconColor: "text-indigo-400",
  },
};

export function RecentActivity({
  announcements,
}: {
  announcements: Announcement[];
}) {
  return (
    <div
      dir="rtl"
      className="
      h-full rounded-2xl border border-primary-600/30 bg-primary-700/30 p-4 shadow-xl hover:shadow-emerald-500/10   "
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold">فعالیت‌های اخیر</h3>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* خط عمودی تایم‌لاین (از سمت راست) */}
        <div
          className="
            absolute
            right-[84px]
            top-4
            bottom-4
            w-px
            bg-primary-700
          "
        />

        <div className="space-y-5">
          {announcements.length === 0 ? (
            <div className="py-10 text-center text-sm text-primary-500">
              فعالیتی ثبت نشده است.
            </div>
          ) : (
            announcements.map((ann) => {
              const conf = typeConfig[ann.type] ?? typeConfig.info;
              const Icon = conf.icon;

              return (
                <div
                  key={ann.id}
                  className="
                    grid
                    grid-cols-[56px_24px_1fr_34px]
                    items-center
                    gap-4
                    min-h-[46px]
                  "
                >
                  {/* زمان */}
                  <div className="text-right">
                    <span className="text-[12px] font-medium tracking-wide text-primary-400">
                      {ann.time}
                    </span>
                  </div>

                  {/* نقطه تایم‌لاین */}
                  <div className="relative flex justify-center">
                    <span
                      className={`
                        relative
                        z-10
                        h-3
                        w-3
                        rounded-full
                        ring-[2px]
                        ring-primary-700
                        shadow-[0_0_12px_rgba(255,255,255,.18)]
                        ${conf.dotColor}
                      `}
                    />
                  </div>

                  {/* عنوان + توضیحات */}
                  <div className="min-w-0">
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      <span className="truncate text-[13px] font-medium">
                        {ann.title}
                      </span>
                      <span className="truncate text-[12px] text-primary-400">
                        {ann.description}
                      </span>
                    </div>
                  </div>

                  {/* آیکون */}
                  <div
                    className={`
                      flex
                      items-center
                      justify-center
                      ${conf.iconColor}
                    `}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
