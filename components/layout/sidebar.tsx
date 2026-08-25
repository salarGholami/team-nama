"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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

type IconComponent = React.ComponentType<{
  size?: number;
  className?: string;
}>;

const LOGO_DARK = "/logos/logo-dark.png";
const LOGO_LIGHT = "/logos/logo-light.png";

const SIDEBAR_WIDTH = {
  expanded: 256,
  collapsed: 80,
} as const;

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo<NavItem[]>(
    () => (db.links as Record<string, NavItem[]>)[role] ?? [],
    [role],
  );

  /**
   * Normalize route
   */
  const normalize = (path: string): string => {
    const normalized = path.replace(/\/+$/, "").toLowerCase();

    return normalized || "/";
  };

  /**
   * Toggle nested navigation
   */
  const toggleMenu = (label: string): void => {
    setOpenMenus((previous) => ({
      ...previous,
      [label]: !previous[label],
    }));
  };

  /**
   * Collect all navigation hrefs.
   */
  const getAllHrefs = (items: NavItem[]): string[] => {
    const result: string[] = [];

    for (const item of items) {
      if (item.href) {
        result.push(normalize(item.href));
      }

      if (item.children?.length) {
        result.push(...getAllHrefs(item.children));
      }
    }

    return result;
  };

  const allHrefs = useMemo(() => getAllHrefs(navItems), [navItems]);

  /**
   * Detect active route.
   */
  const isItemActive = (item: NavItem): boolean => {
    const current = normalize(pathname);

    /**
     * Parent item
     */
    if (item.children?.length) {
      return item.children.some(isItemActive);
    }

    if (!item.href) {
      return false;
    }

    const href = normalize(item.href);

    /**
     * Exact match
     */
    if (current === href) {
      return true;
    }

    /**
     * Nested route match
     */
    if (current.startsWith(`${href}/`)) {
      const hasMoreSpecificRoute = allHrefs.some(
        (candidate) =>
          candidate !== href &&
          candidate.startsWith(`${href}/`) &&
          (current === candidate || current.startsWith(`${candidate}/`)),
      );

      return !hasMoreSpecificRoute;
    }

    return false;
  };

  /**
   * Automatically expand active parent menus.
   */
  useEffect(() => {
    const collectActiveParents = (
      items: NavItem[],
      accumulator: Record<string, boolean>,
    ): void => {
      for (const item of items) {
        if (!item.children?.length) {
          continue;
        }

        if (item.children.some(isItemActive)) {
          accumulator[item.label] = true;
        }

        collectActiveParents(item.children, accumulator);
      }
    };

    const expandedMenus: Record<string, boolean> = {};

    collectActiveParents(navItems, expandedMenus);

    setOpenMenus((previous) => ({
      ...expandedMenus,
      ...previous,
    }));
  }, [pathname, role, navItems]);

  /**
   * Safely resolve Lucide icon.
   */
  const getIcon = (iconName: string): IconComponent | null => {
    const icon = (
      Icons as unknown as Record<string, IconComponent | undefined>
    )[iconName];

    return icon ?? null;
  };

  /**
   * Render navigation item recursively.
   */
  const renderNavItem = (item: NavItem): React.ReactNode => {
    const Icon = getIcon(item.icon);
    const active = isItemActive(item);

    /**
     * Nested navigation item.
     */
    if (item.children?.length) {
      const isOpen = openMenus[item.label] ?? false;

      return (
        <div key={item.label} className="flex flex-col">
          <button
            type="button"
            onClick={() => toggleMenu(item.label)}
            aria-expanded={isOpen}
            className={clsx(
              "flex w-full items-center justify-between gap-2 rounded-lg px-4 py-2 transition-colors",
              active
                ? "bg-primary-700 text-primary-300"
                : "text-primary-300 hover:bg-primary-700",
            )}
          >
            <div className="flex min-w-0 items-center gap-2">
              {Icon && <Icon size={20} className="shrink-0" />}

              {!collapsed && (
                <span className="truncate whitespace-nowrap">{item.label}</span>
              )}
            </div>

            {!collapsed &&
              (isOpen ? (
                <ChevronUp size={16} className="shrink-0" />
              ) : (
                <ChevronDown size={16} className="shrink-0" />
              ))}
          </button>

          <AnimatePresence initial={false}>
            {isOpen && !collapsed && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="ml-6 mt-1 flex flex-col space-y-1 overflow-hidden"
              >
                {item.children.map(renderNavItem)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    /**
     * Navigation item without href.
     */
    if (!item.href) {
      return null;
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className="relative block"
      >
        <motion.div
          layout
          className={clsx(
            "relative flex items-center gap-2 rounded-lg px-4 py-2 transition-colors",
            active
              ? "bg-primary-700 text-primary-300"
              : "text-primary-300 hover:bg-primary-700",
          )}
        >
          {Icon && <Icon size={20} className="shrink-0" />}

          {!collapsed && (
            <span className="truncate whitespace-nowrap">{item.label}</span>
          )}

          {active && (
            <motion.div
              layoutId="sidebar-active-indicator"
              className="absolute left-0 top-0 h-full w-1 rounded-r bg-primary-600"
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

  /**
   * Shared Logo component.
   *
   * Dark theme:
   * logo-light.png
   *
   * Light theme:
   * logo-dark.png
   */
  const Logo = ({ mobile = false }: { mobile?: boolean }) => {
    return (
      <Link
        href="/dashboard"
        onClick={mobile ? () => setMobileOpen(false) : undefined}
        aria-label="Team Nama Dashboard"
        className={clsx(
          "group flex min-w-0 items-center",
          collapsed && !mobile ? "justify-center" : "gap-3",
        )}
      >
        <div
          className={clsx(
            "relative shrink-0 overflow-hidden",
            mobile ? "h-10 w-10" : "h-10 w-10",
          )}
        >
          {/* Light Theme */}
          <Image
            src={LOGO_DARK}
            alt="Team Nama"
            fill
            priority
            sizes="40px"
            className="object-contain transition-transform duration-200 group-hover:scale-105 dark:hidden"
          />

          {/* Dark Theme */}
          <Image
            src={LOGO_LIGHT}
            alt=""
            fill
            priority
            sizes="40px"
            aria-hidden="true"
            className="hidden object-contain transition-transform duration-200 group-hover:scale-105 dark:block"
          />
        </div>

        {(!collapsed || mobile) && (
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-bold leading-tight text-primary-900 dark:text-white">
              Team Nama
            </span>

            <span className="truncate text-[11px] leading-tight text-primary-500 dark:text-primary-400">
              {role}
            </span>
          </div>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <motion.aside
        initial={false}
        animate={{
          width: collapsed ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.expanded,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="hidden h-screen shrink-0 flex-col border-l border-primary-800 bg-primary-900 text-primary-300 lg:flex dark:bg-primary-900"
      >
        {/* =================================================
            DESKTOP HEADER
        ================================================== */}
        <div
          className={clsx(
            "flex min-h-16 shrink-0 items-center border-b border-primary-800",
            collapsed ? "justify-center px-2" : "justify-between px-3",
          )}
        >
          <Logo />

          <button
            type="button"
            onClick={() => setCollapsed((previous) => !previous)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="shrink-0 rounded-md px-2 py-2 transition-colors hover:bg-primary-800"
          >
            {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================== */}
        <nav
          aria-label="Main navigation"
          className="flex-1 overflow-y-auto p-2"
        >
          <div className="space-y-2">
            {navItems.length > 0 ? (
              navItems.map(renderNavItem)
            ) : (
              <span className="block px-2 text-sm text-primary-400">
                No navigation available for this role.
              </span>
            )}
          </div>
        </nav>
      </motion.aside>

      {/* =====================================================
          MOBILE / TABLET
      ====================================================== */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 0.5,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black lg:hidden"
            />

            {/* Mobile Sidebar */}
            <motion.aside
              initial={{
                x: "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{
                type: "tween",
                duration: 0.25,
              }}
              className="fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col bg-primary-900 text-primary-300 lg:hidden"
            >
              {/* Mobile Header */}
              <div className="flex min-h-16 shrink-0 items-center justify-between border-b border-primary-800 px-3">
                <Logo mobile />

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close sidebar"
                  className="rounded-md px-3 py-2 transition-colors hover:bg-primary-800"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav
                aria-label="Mobile navigation"
                className="flex-1 overflow-y-auto p-2"
              >
                <div className="space-y-2">
                  {navItems.length > 0 ? (
                    navItems.map(renderNavItem)
                  ) : (
                    <span className="block px-2 text-sm text-primary-400">
                      No navigation available for this role.
                    </span>
                  )}
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================
          MOBILE MENU BUTTON
      ====================================================== */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
        className="fixed left-4 top-4 z-50 rounded-md bg-primary-900 p-2 text-primary-300 shadow-lg transition-colors hover:bg-primary-800 lg:hidden"
      >
        <Menu size={20} />
      </button>
    </>
  );
}
