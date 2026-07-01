// components/charts/FinancialChart.tsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FC, useEffect, useMemo, useState } from "react";
import ChartContainer from "./ChartContainer";

interface FinancialData {
  month: string;
  income: number;
  expense: number;
}

interface Props {
  data: FinancialData[];
}

type Breakpoint = "mobile" | "tablet" | "desktop";

const POINTS: Record<Breakpoint, number> = {
  mobile: 2,
  tablet: 4,
  desktop: 6,
};

function detectBreakpoint(): Breakpoint {
  if (window.matchMedia("(max-width: 767px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1023px)").matches) return "tablet";
  return "desktop";
}

const FinancialChart: FC<Props> = ({ data }) => {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const update = () => setBp(detectBreakpoint());
    update();

    const m1 = window.matchMedia("(max-width: 767px)");
    const m2 = window.matchMedia("(max-width: 1023px)");

    m1.addEventListener("change", update);
    m2.addEventListener("change", update);

    return () => {
      m1.removeEventListener("change", update);
      m2.removeEventListener("change", update);
    };
  }, []);

  const visibleData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.slice(-POINTS[bp]);
  }, [data, bp]);

  if (!data || data.length === 0) return null;

  return (
    <ChartContainer height={320}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={visibleData}
          margin={{ top: 20, right: 26, left: 25, bottom: 12 }}
        >
          <XAxis
            dataKey="month"
            reversed
            stroke="#888888"
            tickMargin={18}
            minTickGap={20}
          />
          <YAxis orientation="right" stroke="#888888" tickMargin={52} />
          <Tooltip
            contentStyle={{
              direction: "rtl",
              backgroundColor: "var(--tooltip-bg)",
              border: "none",
              borderRadius: 8,
              padding: "8px 12px",
            }}
            labelStyle={{ color: "var(--tooltip-text)", fontWeight: 600 }}
            formatter={(v: number | undefined) => v?.toLocaleString() ?? ""}
          />
          <Legend
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: 20, paddingBottom: 0 }}
            formatter={(val) => (
              <span className="text-sm font-medium pr-1">{val}</span>
            )}
          />
          <Line
            type="monotone"
            dataKey="income"
            name="درآمد"
            stroke="#00FF99"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            name="هزینه"
            stroke="#FF4D4F"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default FinancialChart;
