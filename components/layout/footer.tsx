"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const footerSections = [
  { title: "محصول", items: ["داشبورد", "امکانات", "پلن‌ها", "امنیت"] },
  {
    title: "شرکت",
    items: ["درباره ما", "فرصت‌های شغلی", "تماس با ما", "بلاگ"],
  },
  {
    title: "منابع",
    items: ["مستندات", "سوالات متداول", "پشتیبانی", "وضعیت سرویس"],
  },
  { title: "قوانین", items: ["قوانین استفاده", "حریم خصوصی", "کوکی‌ها"] },
];

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // فقط بعد از mount لوگو واقعی رو رندر کن
  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted
    ? resolvedTheme === "dark"
      ? "/logos/logo-light.png"
      : "/logos/logo-dark.png"
    : "/logos/logo-dark.png"; // placeholder اولیه

  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-3 text-xl font-semibold">
              <Link href="/" className="flex items-center">
                <Image
                  src={logoSrc}
                  alt="تیم نما"
                  width={120}
                  height={40}
                  className="w-28 h-auto transition-all"
                  priority
                />
              </Link>
            </div>

            <p className="text-sm text-primary-400 text-muted-foreground leading-7 max-w-md">
              پلتفرمی مدرن برای مدیریت کاربران، نقش‌ها و فرآیندهای سازمانی با
              تمرکز بر امنیت، سرعت و تجربه کاربری.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <FooterColumn
                key={section.title}
                title={section.title}
                items={section.items}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-semibold text-xl">{title}</span>
      <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li
            key={item}
            className="hover:text-primary-200 text-primary-400 transition-colors cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
