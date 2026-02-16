"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import * as Icons from "lucide-react";
import db from "@/data/db.json";

type NavItem = {
  label: string;
  href?: string;
  icon: string;
  children?: NavItem[];
};

type SidebarProps = {
  role: string;
};

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const navItems: NavItem[] =
    (db.links as Record<string, NavItem[]>)[role] ?? [];

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // ---------------------------
  // PATH NORMALIZER
  // ---------------------------
  const normalize = (path: string) => path.replace(/\/+$/, "").toLowerCase();

  // ---------------------------
  // ACTIVE DETECTION (CORRECT)
  // ---------------------------
  const isItemActive = (item: NavItem): boolean => {
    const current = normalize(pathname);

    // اگر group است → بررسی children
    if (item.children?.length) {
      return item.children.some(isItemActive);
    }

    // اگر لینک ساده است → فقط exact match
    if (item.href) {
      return current === normalize(item.href);
    }

    return false;
  };

  // ---------------------------
  // AUTO EXPAND ACTIVE PARENTS
  // ---------------------------
  useEffect(() => {
    const collectActiveParents = (
      items: NavItem[],
      acc: Record<string, boolean>,
    ) => {
      for (const item of items) {
        if (item.children?.length) {
          if (item.children.some(isItemActive)) {
            acc[item.label] = true;
          }
          collectActiveParents(item.children, acc);
        }
      }
    };

    const expanded: Record<string, boolean> = {};
    collectActiveParents(navItems, expanded);
    setOpenMenus((prev) => ({ ...expanded, ...prev }));
  }, [pathname, role]);

  // ---------------------------
  // RENDER
  // ---------------------------
  const renderNavItem = (item: NavItem) => {
    const Icon = (Icons as Record<string, any>)[item.icon];
    const active = isItemActive(item);

    // ---------- GROUP ----------
    if (item.children?.length) {
      const isOpen = openMenus[item.label] || false;

      return (
        <div key={item.label} className="flex flex-col">
          <button
            type="button"
            onClick={() => toggleMenu(item.label)}
            className={clsx(
              "flex items-center justify-between gap-2 rounded-lg px-4 py-2 w-full transition-colors",
              active
                ? "bg-primary-700 text-white"
                : "text-primary-300 hover:bg-primary-800",
            )}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon size={20} />}
              {!collapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </div>

            {!collapsed &&
              (isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
          </button>

          <AnimatePresence initial={false}>
            {isOpen && !collapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col ml-6 mt-1 space-y-1 overflow-hidden"
              >
                {item.children.map(renderNavItem)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // ---------- LINK ----------
    return (
      <Link key={item.href} href={item.href!} className="relative block">
        <motion.div
          layout
          className={clsx(
            "flex items-center gap-2 rounded-lg px-4 py-2 transition-colors relative",
            active
              ? "bg-primary-700 text-white"
              : "text-primary-300 hover:bg-primary-800",
          )}
        >
          {Icon && <Icon size={20} />}
          {!collapsed && (
            <span className="whitespace-nowrap">{item.label}</span>
          )}

          {active && (
            <motion.div
              layoutId="active-indicator"
              className="absolute left-0 top-0 h-full w-1 bg-white rounded-r"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />
          )}
        </motion.div>
      </Link>
    );
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="h-screen bg-primary-900 text-white flex flex-col border-l border-primary-800"
    >
      {/* Header */}
      <div className="flex items-center justify-between py-2 px-2 border-b border-primary-800">
        {!collapsed && (
          <span className="text-lg font-bold capitalize whitespace-nowrap">
            {role}
          </span>
        )}

        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className="px-4 py-2 rounded-md hover:bg-primary-800 transition"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-2 overflow-y-auto">
        {navItems.length ? (
          navItems.map(renderNavItem)
        ) : (
          <span className="text-primary-400 text-sm">
            No navigation available for this role.
          </span>
        )}
      </nav>
    </motion.aside>
  );
}
