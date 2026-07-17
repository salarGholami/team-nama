// components/StatCard.tsx
"use client";

import { ArrowUp, Plus } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, AreaChart, Area } from "recharts";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number;
  label: string;
  icon: React.ElementType;
  chartData: { v: number }[];
  chartType: "area" | "bar";
  className?: string;
}

export default function StatCard({
  title,
  value,
  label,
  icon: Icon,
  chartData,
  chartType,
  className = "",
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      whileHover={{ transition: { duration: 0.3 } }}
      className={` border border-primary-600/30 bg-primary-700/30 rounded-lg p-4 shadow-xl hover:shadow-emerald-500/10 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 lg:gap-3">
          <motion.div
            whileHover={{ rotate: 20 }}
            transition={{ duration: 0.4 }}
            className="w-4 lg:w-6 h-4 lg:h-6 rounded-lg flex items-center justify-center svg-gradient"
          >
            <Icon className="w-5 lg:w-6 h-5 lg:h-6" />
          </motion.div>
          <p className="text-xs lg:text-base">{title}</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-4xl lg:text-5xl  mb-2"
      >
        {value}
      </motion.div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="text-emerald-500 flex items-center"
          >
            <ArrowUp className="w-4 lg:w-6 h-4 lg:h-6" />
            <Plus className="w-3 lg:w-4 h-3 lg:h-4" />
          </motion.span>
          <span className="text-[10px] lg:text-sm">{label}</span>
        </div>

        <div className="w-10 lg:w-28 h-6 lg:h-12">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart data={chartData}>
                <Area
                  type="natural"
                  dataKey="v"
                  stroke="#34d399"
                  strokeWidth={2.5}
                  fill="#34d399"
                  fillOpacity={0.15}
                />
              </AreaChart>
            ) : (
              <BarChart data={chartData}>
                <Bar dataKey="v" fill="#34d399" radius={4} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
