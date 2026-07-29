"use client";

import { useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import clsx from "clsx";

type PaginationProps = {
  /** صفحه فعلی — از ۱ شروع می‌شود */
  currentPage: number;
  /** تعداد کل صفحات */
  totalPages: number;
  /** callback تغییر صفحه */
  onPageChange: (page: number) => void;
  /**
   * حداکثر تعداد دکمه‌های عددی قابل‌نمایش
   * @default 7
   */
  siblingCount?: number;
  /** کلاس اضافی برای کانتینر */
  className?: string;
  /** غیرفعال کردن کل کامپوننت */
  disabled?: boolean;
  /** نمایش دکمه‌های اول / آخر */
  showEdges?: boolean;
  /** اندازه دکمه‌ها */
  size?: "sm" | "md" | "lg";
};

type PageItem = number | "start-ellipsis" | "end-ellipsis";

function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

/**
 * الگوریتم ساخت لیست صفحات با ellipsis هوشمند
 * مثال خروجی: [1, 'start-ellipsis', 4, 5, 6, 'end-ellipsis', 20]
 */
function buildPageItems(
  current: number,
  total: number,
  siblingCount: number,
): PageItem[] {
  // تعداد کل اسلات‌ها: siblings دو طرف + current + 2 لبه + 2 ellipsis
  const totalSlots = siblingCount * 2 + 5;

  if (total <= totalSlots) {
    return range(1, total);
  }

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  // بدون ellipsis چپ
  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    return [...range(1, leftItemCount), "end-ellipsis", total];
  }

  // بدون ellipsis راست
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    return [1, "start-ellipsis", ...range(total - rightItemCount + 1, total)];
  }

  // هر دو ellipsis
  return [
    1,
    "start-ellipsis",
    ...range(leftSibling, rightSibling),
    "end-ellipsis",
    total,
  ];
}

const SIZE_STYLES = {
  sm: "h-8 min-w-8 text-xs rounded-lg",
  md: "h-10 min-w-10 text-sm rounded-xl",
  lg: "h-11 min-w-11 text-sm rounded-xl",
} as const;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  disabled = false,
  showEdges = false,
  size = "md",
}: PaginationProps) {
  const pages = useMemo(
    () => buildPageItems(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount],
  );

  const goTo = useCallback(
    (page: number) => {
      if (disabled) return;
      if (page < 1 || page > totalPages || page === currentPage) return;
      onPageChange(page);
    },
    [disabled, totalPages, currentPage, onPageChange],
  );

  if (totalPages <= 1) return null;

  const sizeClass = SIZE_STYLES[size];

  const btnBase = clsx(
    "inline-flex items-center justify-center font-medium transition-all duration-200 select-none",
    "border outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900",
    sizeClass,
  );

  const btnIdle = clsx(
    "border-primary-600/30 bg-primary-800/40 text-primary-300",
    "hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300",
    "active:scale-95",
  );

  const btnActive = clsx(
    "border-emerald-500/50 bg-emerald-500/15 text-emerald-300",
    "shadow-[0_0_20px_rgba(52,211,153,0.18)]",
    "pointer-events-none",
  );

  const btnDisabled = clsx(
    "cursor-not-allowed opacity-35",
    "hover:border-primary-600/30 hover:bg-primary-800/40 hover:text-primary-300",
    "active:scale-100",
  );

  return (
    <nav
      dir="rtl"
      role="navigation"
      aria-label="صفحه‌بندی"
      className={clsx(
        "flex flex-wrap items-center justify-center gap-1.5",
        className,
      )}
    >
      {/* اول */}
      {showEdges && (
        <button
          type="button"
          onClick={() => goTo(1)}
          disabled={disabled || currentPage <= 1}
          aria-label="صفحه اول"
          className={clsx(
            btnBase,
            "px-2.5",
            disabled || currentPage <= 1 ? btnDisabled : btnIdle,
          )}
        >
          اول
        </button>
      )}

      {/* قبلی */}
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={disabled || currentPage <= 1}
        aria-label="صفحه قبلی"
        className={clsx(
          btnBase,
          "w-10",
          disabled || currentPage <= 1 ? btnDisabled : btnIdle,
        )}
      >
        <ChevronRight className="size-4" strokeWidth={2.25} />
      </button>

      {/* شماره صفحات */}
      {pages.map((item, index) => {
        if (item === "start-ellipsis" || item === "end-ellipsis") {
          return (
            <span
              key={item + index}
              className={clsx(
                "inline-flex items-center justify-center text-primary-500",
                sizeClass,
              )}
              aria-hidden
            >
              <MoreHorizontal className="size-4" />
            </span>
          );
        }

        const isActive = item === currentPage;

        return (
          <button
            type="button"
            key={item}
            onClick={() => goTo(item)}
            disabled={disabled || isActive}
            aria-label={`صفحه ${item}`}
            aria-current={isActive ? "page" : undefined}
            className={clsx(
              btnBase,
              "px-3 tabular-nums",
              isActive ? btnActive : disabled ? btnDisabled : btnIdle,
            )}
          >
            {item}
          </button>
        );
      })}

      {/* بعدی */}
      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={disabled || currentPage >= totalPages}
        aria-label="صفحه بعدی"
        className={clsx(
          btnBase,
          "w-10",
          disabled || currentPage >= totalPages ? btnDisabled : btnIdle,
        )}
      >
        <ChevronLeft className="size-4" strokeWidth={2.25} />
      </button>

      {/* آخر */}
      {showEdges && (
        <button
          type="button"
          onClick={() => goTo(totalPages)}
          disabled={disabled || currentPage >= totalPages}
          aria-label="صفحه آخر"
          className={clsx(
            btnBase,
            "px-2.5",
            disabled || currentPage >= totalPages ? btnDisabled : btnIdle,
          )}
        >
          آخر
        </button>
      )}
    </nav>
  );
}
