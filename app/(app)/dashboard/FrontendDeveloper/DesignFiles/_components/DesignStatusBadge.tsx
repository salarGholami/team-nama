// app/(app)/dashboard/FrontendDeveloper/DesignFiles/_components/DesignStatusBadge.tsx

import { CheckCircle2, Clock3, CircleDashed, Archive } from "lucide-react";

type Props = {
  status: "ready" | "review" | "draft" | "archived";
};

const STATUS = {
  ready: {
    label: "آماده توسعه",
    icon: CheckCircle2,
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },

  review: {
    label: "نیاز به بررسی",
    icon: Clock3,
    className: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  },

  draft: {
    label: "در حال طراحی",
    icon: CircleDashed,
    className: "border-sky-500/20 bg-sky-500/10 text-sky-400",
  },

  archived: {
    label: "آرشیو شده",
    icon: Archive,
    className: "border-zinc-500/20 bg-zinc-500/10 text-zinc-400",
  },
} satisfies Record<
  Props["status"],
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
>;

export default function DesignStatusBadge({ status }: Props) {
  const item = STATUS[status];

  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${item.className}`}
    >
      <Icon className="size-3.5" />

      {item.label}
    </span>
  );
}
