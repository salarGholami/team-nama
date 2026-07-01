import { ProjectStatusKey } from "@/types/dashboard";

export const STATUS_LABELS: Record<ProjectStatusKey, string> = {
  "in-progress": "در حال انجام",
  completed: "تکمیل شده",
  "on-hold": "در انتظار",
  cancelled: "لغو شده",
};

export const STATUS_COLORS: Record<ProjectStatusKey, string> = {
  "in-progress": "#6355FF",
  completed: "#00C49F",
  "on-hold": "#FFA500",
  cancelled: "#FF4D4F",
};
