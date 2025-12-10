"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-10 h-10 rounded-full bg-muted" />;

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-14 h-8 rounded-full flex items-center cursor-pointer py-1 px-8"
      animate={{
        backgroundColor: isDark ? "#1f2937" : "#d1d5db", // بک‌گراند دکمه
      }}
      transition={{ type: "spring", stiffness: 700, damping: 30 }}
    >
      {/* Track / Knob با رنگ متحرک */}
      <motion.div
        className="absolute top-1 left-1 w-6 h-6 rounded-full shadow-md"
        animate={{ 
          x: isDark ? 32 : 0,
          backgroundColor: isDark ? "#000000" : "#ffffff", // رنگ توپ
        }}
        transition={{ type: "spring", stiffness: 1700, damping: 200 }}
      />

      {/* آیکون‌ها */}
      <div className="absolute left-1 top-1 w-6 h-6 flex items-center justify-center pointer-events-none">
        <Sun className="w-4 h-4 text-yellow-400" />
      </div>
      <div className="absolute right-1 top-1 w-6 h-6 flex items-center justify-center pointer-events-none">
        <Moon className="w-4 h-4 text-blue-400" />
      </div>
    </motion.button>
  );
}
