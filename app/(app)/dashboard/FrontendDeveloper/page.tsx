"use client";

import { useState, useEffect } from "react";
import {
  CalendarDays,
  CircleCheckBig,
  Sparkles,
  Component as ComponentIcon,
  PencilIcon,
  Clock,
  Eye,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import db from "@/data/db.json";

import StatCard from "./_components/StatCard";
import ActivityChart from "./_components/ActivityChart";
import RecentTasks from "./_components/RecentTasks";
import ProjectStatusPanels from "./_components/ProjectStatusPanels";

const waveData1 = [
  { v: 25 },
  { v: 18 },
  { v: 22 },
  { v: 35 },
  { v: 28 },
  { v: 32 },
];

const barData = [
  { v: 8 },
  { v: 12 },
  { v: 18 },
  { v: 15 },
  { v: 22 },
  { v: 19 },
];

const waveData2 = [
  { v: 12 },
  { v: 20 },
  { v: 15 },
  { v: 25 },
  { v: 18 },
  { v: 22 },
];

const waveData3 = [
  { v: 20 },
  { v: 28 },
  { v: 35 },
  { v: 42 },
  { v: 38 },
  { v: 45 },
];

export default function FrontendDeveloperDashboard() {
  const [currentPersianDate, setCurrentPersianDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const persianDate = now.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      setCurrentPersianDate(persianDate);
    };

    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  const frontendData = db.frontendDashboard;

  const recentTasks = frontendData.recentTasks?.slice(0, 3) || [];

  return (
    <div className="pb-12 px-4 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-between py-6 mb-8"
      >
        <div>
          <h1 className="font-bold text-lg lg:text-2xl">داشبورد توسعه‌دهنده</h1>
          <p className="text-primary-300 text-xs lg:text-sm">
            خلاصه‌ای از فعالیت‌ها و وضعیت پروژه
          </p>
        </div>

        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-primary-600/30 bg-primary-700/30">
          <span className="svg-gradient">
            <CalendarDays />
          </span>
          <span className="text-xs lg:text-sm">{currentPersianDate}</span>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 lg:mb-6">
        <StatCard
          title="تسک‌های در حال انجام"
          value={frontendData.stats.tasksInProgress}
          label="نسبت به دیروز"
          icon={Sparkles}
          chartData={waveData1}
          chartType="area"
        />
        <StatCard
          title="کامپوننت‌ها"
          value={frontendData.stats.components}
          label="این هفته"
          icon={ComponentIcon}
          chartData={barData}
          chartType="bar"
        />
        <StatCard
          title="فایل‌های طراحی شده"
          value={frontendData.stats.designFiles}
          label="این هفته"
          icon={PencilIcon}
          chartData={waveData2}
          chartType="area"
        />
        <StatCard
          title="تسک‌های تکمیل شده"
          value={frontendData.stats.completedTasks}
          label="این هفته"
          icon={CircleCheckBig}
          chartData={waveData3}
          chartType="area"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* نمودار فعالیت */}
        <div className="lg:col-span-7">
          <ActivityChart activityData={frontendData.activity} />
        </div>
        <RecentTasks tasks={recentTasks} />
      </div>

      <ProjectStatusPanels />
    </div>
  );
}
