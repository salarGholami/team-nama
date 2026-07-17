// app/dashboard/FrontendDeveloper/_components/ProjectStatusPanels.tsx

import React from "react";
import { FileText } from "lucide-react";
import db from "@/data/db.json";
import { Button } from "@/components/ui/button";

const ProjectStatusPanels = () => {
  const { frontendDashboard } = db;
  const { projectProgress, recentFiles, announcements } = frontendDashboard;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      {/* پیشرفت پروژه */}
      <div className="border-primary-600/30 bg-primary-700/30 border rounded-lg p-5 lg:p-8 shadow-xl hover:shadow-emerald-500/10">
        <h3 className="text-sm lg:text-lg font-semibold mb-6">پیشرفت پروژه</h3>

        <div className="flex justify-center mb-6 lg:mb-8">
          <div className="relative w-40 h-40 lg:w-44 lg:h-44">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#333"
                strokeWidth="7"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#34d399"
                strokeWidth="7"
                strokeDasharray={`${projectProgress.percentage * 3.27} 327`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl lg:text-5xl font-bold text-emerald-400">
                {projectProgress.percentage}%
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {[
            { label: "طراحی", value: projectProgress.design },
            { label: "توسعه", value: projectProgress.development },
            { label: "تست", value: projectProgress.testing },
          ].map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-primary-300">{item.label}</span>
                <span className="font-medium text-emerald-400">
                  {item.value}%
                </span>
              </div>
              <div className="h-2 bg-primary-700 rounded-full overflow-hidden">
                <div
                  className="h-full gradient-bg"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* فایل‌های اخیر */}
      <div className="border-primary-600/30 bg-primary-700/30 border rounded-lg p-5 lg:p-8 shadow-xl hover:shadow-emerald-500/10 ">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm lg:text-lg font-semibold">فایل‌های اخیر</h3>

          <Button className="flex items-center gap-1 text-sm text-primary-400 transition-colors hover:text-primary-100 border border-primary-700 hover:border-primary-500 rounded-lg">
            مشاهده همه
          </Button>
        </div>

        <div className="space-y-3">
          {recentFiles?.slice(0, 4).map((file: any, i: number) => (
            <div
              key={i}
              className="flex items-center  gap-3 border-primary-600/30 hover:bg-primary-700/60 bg-primary-800/50  p-4 rounded-2xl transition-colors shadow-2xl"
            >
              <div className="flex-1 flex justify-between items-center min-w-0">
                <p className="text-xs text-primary-500 mt-0.5">
                  {file.updatedAt}
                </p>
              </div>
              <div className="">
                <p className="font-medium text-sm truncate">{file.name}</p>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* اعلان‌ها */}
      <div className="border-primary-600/30 bg-primary-700/30  border rounded-lg p-5 lg:p-8 shadow-xl hover:shadow-emerald-500/10 ">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm lg:text-lg font-semibold">اعلان‌ها</h3>

          <Button className="flex items-center justify-center gap-1 text-sm text-primary-400 transition-colors hover:text-primary-100 border border-primary-700 hover:border-primary-500 rounded-lg">
            مشاهده همه
          </Button>
        </div>

        <div className="space-y-4">
          {announcements?.map((ann: any, i: number) => (
            <div
              key={i}
              className="bg-primary-800/50 hover:bg-primary-700/60 p-4 rounded-2xl border-r-4 border-emerald-500 shadow-2xl"
            >
              <div className="font-medium text-sm line-clamp-1">
                {ann.title}
              </div>
              <div className="text-primary-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                {ann.description}
              </div>
              <div className="text-[10px] text-primary-500 mt-3">
                {ann.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusPanels;
