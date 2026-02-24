"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  FileText,
  TrendingUp,
  User,
} from "lucide-react";

export type Service = {
  id: number;
  title: string;
  icon: "users" | "dollarSign" | "trendingUp" | "fileText";
  changePercent?: number; // درصد تغییر مثبت یا منفی
  length?: number;
  money?: number;
  activeProjects?: number;
  pendingRequests?: number;
};

type Props = {
  services: readonly Service[];
};

type MetricKey = "length" | "money" | "activeProjects" | "pendingRequests";

const iconMap = {
  users: User,
  dollarSign: DollarSign,
  trendingUp: TrendingUp,
  fileText: FileText,
};

const metricConfig: Record<
  MetricKey,
  {
    label: string;
    format: (value: number) => string;
  }
> = {
  length: { label: "تعداد", format: (v) => v.toLocaleString("fa-IR") },
  money: {
    label: "درآمد",
    format: (v) => v.toLocaleString("fa-IR") + " تومان",
  },
  activeProjects: {
    label: "پروژه فعال",
    format: (v) => v.toLocaleString("fa-IR"),
  },
  pendingRequests: {
    label: "درخواست معلق",
    format: (v) => v.toLocaleString("fa-IR"),
  },
};

function getServiceMetrics(service: Service) {
  return Object.entries(service).filter(([key, value]) => {
    return key in metricConfig && typeof value === "number";
  }) as [MetricKey, number][];
}

function formatPercent(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}%`;
}

function getPercentColor(value: number) {
  if (value > 0) return "text-emerald-400";
  if (value < 0) return "text-red-400";
  return "text-gray-400";
}

export default function ServicesGrid({ services }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {services.map((s) => {
        const Icon = iconMap[s.icon];
        const metrics = getServiceMetrics(s);

        return (
          <motion.div
            key={s.id}
            className="flex flex-col items-start gap-3 p-4 rounded-xl cursor-pointer transition-all border border-white/10 bg-primary-700/50"
          >
            {/* آیکون + درصد تغییر در یک ردیف */}
            <div className="flex items-center justify-between w-full">
              {/* آیکون سمت چپ */}
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-lg icon-gradient-${s.id}`}
              >
                <Icon size={30} />
              </div>

              {/* درصد تغییر سمت راست */}
              {typeof s.changePercent === "number" && (
                <span
                  className={`text-sm font-medium ${getPercentColor(s.changePercent)}`}
                >
                  {formatPercent(s.changePercent)}
                </span>
              )}
            </div>

            {/* عنوان */}
            <p className="text-xl font-bold">{s.title}</p>

            {/* metrics */}
            {metrics.length > 0 && (
              <div className="flex flex-col gap-1 w-full">
                {metrics.map(([key, value]) => {
                  const config = metricConfig[key];
                  return (
                    <div
                      key={key}
                      className="flex justify-between text-sm text-primary-200"
                    >
                      <span>{config.label}</span>
                      <span className="font-semibold ">
                        {config.format(value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
