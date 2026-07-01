// components/charts/ProjectStatusChart.tsx
"use client";

import { FC, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants/chartColors";
import { ProjectStatus, ProjectStatusKey } from "@/types/dashboard";
import ChartContainer from "./ChartContainer";

interface Props {
  data: ProjectStatus;
}

const RADIAN = Math.PI / 180;
const LABEL_DISTANCE_RATIO = 0.3;

const renderLabel = ({ cx, cy, midAngle, outerRadius, percent, fill }: any) => {
  if (!cx || !cy || !midAngle || !outerRadius || percent === undefined || !fill)
    return null;

  const radius = outerRadius * (1 + LABEL_DISTANCE_RATIO);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={16}
      fontWeight={500}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

const ProjectStatusChart: FC<Props> = ({ data }) => {
  const formattedData = useMemo(() => {
    const allData = (Object.keys(STATUS_LABELS) as ProjectStatusKey[])
      .map((key) => ({
        key,
        name: STATUS_LABELS[key],
        value: data[key] ?? 0,
        color: STATUS_COLORS[key],
      }))
      .filter((item) => item.value > 0);

    return allData.sort((a, b) => b.value - a.value).slice(0, 4);
  }, [data]);

  return (
    <ChartContainer height={320}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, right: 12, bottom: 12, left: 12 }}>
          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={95}
            labelLine={false}
            label={renderLabel}
            isAnimationActive
          >
            {formattedData.map((entry) => (
              <Cell key={entry.key} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value ?? 0}`, "تعداد"]} />
          <Legend
            verticalAlign="bottom"
            formatter={(val) => (
              <span className="text-sm font-medium pr-2">{val}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ProjectStatusChart;
