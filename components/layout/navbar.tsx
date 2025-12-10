"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره ما" },
  { href: "/comments", label: " نظرات" },
  { href: "/features", label: " ویژگی ها" },
  { href: "/services", label: "سرویس ها" },
];

export default function Navbar() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted) return null;

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b shadow-2xl backdrop-blur">
        <nav className="mx-auto max-w-7xl flex items-center px-4 py-3">
          {/* Left: Logo + Menu */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src={isDark ? "/logos/logo-light.png" : "/logos/logo-dark.png"}
                alt="Logo"
                width={120}
                height={40}
                className="w-24 h-auto"
                priority
              />
            </Link>

            {/* Desktop menu (بغل لوگو) */}
            <nav className="hidden md:flex items-center gap-6 font-bold">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="btn px-4 py-1 rounded-lg font-bold whitespace-nowrap"
            >
              ورود / ثبت‌نام
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </nav>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      {open && (
        <div className="fixed inset-0 z-[999] flex flex-col">
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <Link href="/" className="flex items-center">
              <Image
                src={isDark ? "/logos/logo-light.png" : "/logos/logo-dark.png"}
                alt="Logo"
                width={120}
                height={40}
                className="w-24 h-auto"
              />
            </Link>

            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={28} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-8 text-xl font-bold">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-primary transition"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="btn px-6 py-2 rounded-xl"
            >
              ورود / ثبت‌نام
            </Link>

            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}
