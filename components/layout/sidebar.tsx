// components/layout/Sidebar.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  User,
  ChevronDown,
  BarChart3,
  DollarSign,
  Clock,
  Calendar,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MenuItem = {
  title: string;
  icon: any;
  href?: string;
  children?: { title: string; href: string }[];
};

const sidebarMenu: Record<string, MenuItem[]> = {
  admin: [
    { title: "داشبورد اصلی", icon: LayoutDashboard, href: "/dashboard" },
    { title: "کاربران", icon: Users, href: "/dashboard/users" },
    { title: "پروژه‌ها", icon: Briefcase, href: "/dashboard/projects" },
    { title: "تحلیل‌ها", icon: BarChart3, href: "/dashboard/analytics" },
    {
      title: "تنظیمات",
      icon: Settings,
      children: [
        { title: "پروفایل", href: "/dashboard/settings/profile" },
        { title: "امنیت", href: "/dashboard/settings/security" },
        { title: "سطوح دسترسی", href: "/dashboard/settings/roles" },
      ],
    },
  ],
  "admin-manager": [
    { title: "داشبورد فروش", icon: LayoutDashboard, href: "/dashboard" },
    { title: "فروش ماهانه", icon: DollarSign, href: "/dashboard/sales" },
    { title: "مشتریان", icon: Users, href: "/dashboard/customers" },
    { title: "سفارش‌ها", icon: FileText, href: "/dashboard/orders" },
    { title: "گزارش عملکرد", icon: TrendingUp, href: "/dashboard/reports" },
  ],
  employee: [
    { title: "داشبورد من", icon: LayoutDashboard, href: "/dashboard" },
    { title: "وظایف من", icon: FileText, href: "/dashboard/tasks" },
    { title: "گزارش روزانه", icon: BarChart3, href: "/dashboard/reports" },
    { title: "تقویم", icon: Calendar, href: "/dashboard/calendar" },
    { title: "پروفایل", icon: Settings, href: "/dashboard/settings/profile" },
  ],
  hr: [
    {
      title: "داشبورد منابع انسانی",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    { title: "کارمندان", icon: Users, href: "/dashboard/employees" },
    { title: "حقوق و دستمزد", icon: DollarSign, href: "/dashboard/payroll" },
    { title: "مرخصی‌ها", icon: Clock, href: "/dashboard/leaves" },
    { title: "گزارش‌ها", icon: BarChart3, href: "/dashboard/hr/reports" },
  ],
  client: [
    { title: "داشبورد مشتری", icon: LayoutDashboard, href: "/dashboard" },
    { title: "سفارش‌های من", icon: FileText, href: "/dashboard/orders" },
    { title: "فاکتورها", icon: DollarSign, href: "/dashboard/invoices" },
    { title: "پشتیبانی", icon: Clock, href: "/dashboard/support" },
  ],
  frontend: [
    { title: "داشبورد توسعه‌دهنده", icon: LayoutDashboard, href: "/dashboard" },
    { title: "پروژه‌های من", icon: Briefcase, href: "/dashboard/projects" },
    { title: "وظایف UI", icon: FileText, href: "/dashboard/tasks" },
    { title: "کامپوننت‌ها", icon: BarChart3, href: "/dashboard/components" },
  ],
  backend: [
    { title: "داشبورد بک‌اند", icon: LayoutDashboard, href: "/dashboard" },
    { title: "API ها", icon: BarChart3, href: "/dashboard/api" },
    { title: "لاگ سرور", icon: Clock, href: "/dashboard/logs" },
    { title: "دیتابیس", icon: FileText, href: "/dashboard/database" },
  ],
};

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{ name: string; role: string }>({
    name: "کاربر",
    role: "employee",
  });

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      try {
        const payload = JSON.parse(atob(token));
        setUserInfo({
          name: payload.name || payload.email?.split("@")[0] || "کاربر",
          role: payload.role || "employee",
        });
      } catch {
        setUserInfo({ name: "کاربر", role: "employee" });
      }
    }
  }, []);

  const currentMenu = sidebarMenu[userInfo.role] || sidebarMenu.employee;

  return (
    <div className="h-full flex flex-col justify-between rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-4">
      <div className="space-y-2">
        {currentMenu.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href &&
            (pathname === item.href || pathname.startsWith(item.href));

          if (!item.children) {
            return (
              <Link
                key={item.title}
                href={item.href!}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-primary/20 text-primary shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          }

          const opened = open === item.title;

          return (
            <div key={item.title}>
              <button
                onClick={() => setOpen(opened ? null : item.title)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span>{item.title}</span>
                </div>
                <ChevronDown
                  className={`transition ${opened ? "rotate-180" : ""}`}
                  size={18}
                />
              </button>

              <AnimatePresence>
                {opened && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-8 mt-2 space-y-1 overflow-hidden"
                  >
                    {item.children.map((c) => {
                      const active =
                        pathname === c.href ||
                        pathname.startsWith(c.href + "/");
                      return (
                        <Link
                          key={c.href}
                          href={c.href}
                          className={`block px-3 py-2 rounded-lg text-sm transition
                          ${
                            active
                              ? "bg-primary/20 text-primary"
                              : "text-white/50 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {c.title}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
          <div>
            {/* فقط نام کاربر نمایش داده میشه */}
            <p className="text-sm font-semibold text-white">{userInfo.name}</p>
          </div>
        </div>

        <Link
          href="/logout"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition font-medium"
        >
          <LogOut size={18} />
          خروج
        </Link>
      </div>
    </div>
  );
}
