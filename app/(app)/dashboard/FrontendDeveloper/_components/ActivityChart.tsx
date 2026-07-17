// components/dashboard/_components/ActivityChart.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Select from "@/components/ui/Select";

type PeriodKey =
  | "currentWeek"
  | "lastWeek"
  | "twoWeeksAgo"
  | "currentMonth"
  | "lastMonth";

type ActivityChartProps = {
  activityData: any;
};

export default function ActivityChart({ activityData }: ActivityChartProps) {
  const [selectedPeriod, setSelectedPeriod] =
    useState<PeriodKey>("currentWeek");

  const periods = activityData?.periods || {};

  let currentData = periods[selectedPeriod] || [];

  if (
    currentData.length > 0 &&
    ["currentWeek", "lastWeek", "twoWeeksAgo"].includes(selectedPeriod)
  ) {
    currentData = [...currentData].reverse();
  }

  const periodLabels: Record<PeriodKey, string> = {
    currentWeek: "هفته جاری",
    lastWeek: "هفته قبل",
    twoWeeksAgo: "دو هفته قبل",
    currentMonth: "ماه جاری",
    lastMonth: "ماه قبل",
  };

  const currentLabel = periodLabels[selectedPeriod];

  const maxValue = currentData.length
    ? Math.max(...currentData.map((d: any) => d.value))
    : 50;

  const periodOptions = [
    { label: "هفته جاری", value: "currentWeek" },
    { label: "هفته قبل", value: "lastWeek" },
    { label: "دو هفته قبل", value: "twoWeeksAgo" },
    { label: "ماه جاری", value: "currentMonth" },
    { label: "ماه قبل", value: "lastMonth" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="lg:col-span-7 border-primary-600/30 border bg-primary-700/30 rounded-lg p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-emerald-500/10"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">{currentLabel}</h3>
          <p className="text-primary-300 text-xs lg:text-sm">
            تعداد کامیت و تسک‌های انجام شده
          </p>
        </div>

        <div>
          <Select
            label=""
            value={selectedPeriod}
            onChange={(value) => setSelectedPeriod(value as PeriodKey)}
            options={periodOptions}
          />
        </div>
      </div>

      <div className="h-[220px] min-h-[180px] lg:h-[250px] xl:h-[208px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={currentData}
            margin={{ top: 15, right: 0, left: 28, bottom: 20 }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0.03} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              interval={0}
              tickLine={false}
              axisLine={false}
              stroke="#71717a"
              fontSize={10}
              tickMargin={12}
              padding={{ left: 10, right: 10 }}
              tick={{ fill: "#a1a1aa" }}
            />

            <YAxis
              orientation="right"
              domain={[0, Math.ceil(maxValue * 1.1)]}
              tickLine={false}
              axisLine={false}
              stroke="#71717a"
              fontSize={10}
              width={45}
              tick={{ fill: "#a1a1aa" }}
            />

            <Tooltip
              cursor={{
                stroke: "#34d399",
                strokeWidth: 1,
                strokeDasharray: "5 5",
              }}
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid rgba(52,211,153,.2)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Area
              type="natural"
              dataKey="value"
              stroke="#34d399"
              strokeWidth={2.8}
              fill="url(#chartGradient)"
              dot={{
                r: 3.5,
                fill: "#34d399",
                stroke: "#111827",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: "#34d399",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
