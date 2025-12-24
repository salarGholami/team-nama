"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره ما" },
  { href: "/comments", label: "نظرات" },
  { href: "/features", label: "ویژگی ها" },
  { href: "/services", label: "سرویس ها" },
];

export default function Navbar() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // جلوگیری از اسکرول صفحه وقتی منو باز است
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  const isDark = (resolvedTheme ?? theme) === "dark";

  // بک‌گراند نوار بالا بر اساس اسکرول و تم
  const bgClass = scrolled
    ? isDark
      ? "bg-primary-900/35 shadow-xl"
      : "bg-primary/35 shadow-xl"
    : "bg-transparent";

  return (
    <>
      {/* نوار بالا - حالت شناور روی صفحه */}
      <header
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${bgClass}`}
      >
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-4 py-4">
          {/* لوگو و لینک‌های دسکتاپ */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center">
              <Image
                src={isDark ? "/logos/logo-light.png" : "/logos/logo-dark.png"}
                alt="تیم نما"
                width={120}
                height={40}
                className="w-28 h-auto transition-all"
                priority
              />
            </Link>

            {/* لینک‌های دسکتاپ */}
            <div className="hidden md:flex items-center gap-8 font-semibold">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* دکمه‌های چپ در دسکتاپ */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="px-5 py-2 btn rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition"
            >
              ورود / ثبت‌نام
            </Link>
            <ThemeToggle />
          </div>

          {/* منوی موبایل */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition"
            aria-label="باز کردن منو"
          >
            <Menu size={28} />
          </button>
        </nav>
      </header>

      {/* منوی موبایل */}
      <AnimatePresence>
        {open && (
          <>
            {/* اوورلی */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-20  backdrop-blur-md"
              onClick={() => setOpen(false)}
            />

            {/* پنل منو */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm shadow-2xl"
            >
              <div className="h-full flex flex-col bg-background border-l border-border">
                {/* هدر منو */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                  <Link href="/" onClick={() => setOpen(false)}>
                    <Image
                      src={
                        isDark
                          ? "/logos/logo-light.png"
                          : "/logos/logo-dark.png"
                      }
                      alt="تیم نما"
                      width={130}
                      height={44}
                      className="h-11 w-auto"
                      priority
                    />
                  </Link>

                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg hover:bg-accent transition"
                    aria-label="بستن منو"
                  >
                    <X size={28} className="text-foreground/70" />
                  </button>
                </div>

                {/* لینک‌ها */}
                <div className="flex-1 flex flex-col px-8 py-12 gap-6 overflow-y-auto">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block text-xl font-semibold text-foreground hover:text-primary transition-colors duration-200 py-2"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* دکمه ورود + تم */}
                  <motion.div
                    className="mt-auto w-full space-y-6 border-t border-border pt-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="block btn w-full text-center px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition shadow-lg"
                    >
                      ورود / ثبت‌ نام
                    </Link>

                    <div className="flex justify-center">
                      <ThemeToggle />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
