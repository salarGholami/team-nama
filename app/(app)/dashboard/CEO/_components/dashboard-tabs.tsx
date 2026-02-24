"use client";

import { useState, ReactNode } from "react";
import clsx from "clsx";

type TabKey = "overview" | "users" | "requests";

interface DashboardTabsProps {
  overview: ReactNode;
  users: ReactNode;
  requests: ReactNode;
}

const tabs: { key: TabKey; label: string }[] = [
  { key: "overview", label: "نمای کلی" },
  { key: "users", label: "مدیریت کاربران" },
  { key: "requests", label: "درخواست‌ها" },
];

export default function DashboardTabs({
  overview,
  users,
  requests,
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <section className="rounded-4xl shadow ">
      {/* Tabs Header */}
      <div className="flex gap-2 border-b border-primary-700">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={clsx(
              "px-4 py-2 text-sm font-medium transition",
              activeTab === tab.key
                ? "border-b-2 border-primary-500 text-primary-300"
                : "text-primary-400 hover:text-primary-500",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div>
        {activeTab === "overview" && overview}
        {activeTab === "users" && users}
        {activeTab === "requests" && requests}
      </div>
    </section>
  );
}
